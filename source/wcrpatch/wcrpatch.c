#include <conio.h>
#include <stdio.h>
#include <string.h>
#include "group.h"
#include "patch.h"
#include "slice.h"
#include "v121.h"
#include "v122h.h"

int copy_file(FILE* source_handle, FILE* target_handle) {
	unsigned char buffer[512];
	fseek(source_handle, 0, SEEK_SET);
	fseek(target_handle, 0, SEEK_SET);
	while (1) {
		int bytes_read = fread(buffer, 1, sizeof(buffer), source_handle);
		if (bytes_read > 0) {
			if (fwrite(buffer, 1, bytes_read, target_handle) != bytes_read) {
				return 0;
			}
		} else {
			break;
		}
	}
	return 1;
}

#ifndef APP_VERSION
	#define APP_VERSION "?.?.?"
#endif

const int ASCII_ESCAPE = 0x1B;

int is_slice_applied(FILE* handle, const slice_t* slice, int* is_active) {
	unsigned char buffer[512];
	fseek(handle, slice->offset, SEEK_SET);
	int offset = 0;
	while (offset < slice->length) {
		int bytes_left = slice->length - offset;
		int bytes_expected = bytes_left < sizeof(buffer) ? bytes_left : sizeof(buffer);
		int bytes_read = fread(buffer, 1, bytes_expected, handle);
		if (bytes_read != bytes_expected) {
			return 0;
		}
		if (memcmp(buffer, slice->patched_data + offset, bytes_read) != 0) {
			*is_active = 0;
			return 1;
		}
		offset += bytes_read;
	}
	return 1;
}

int is_patch_applied(FILE* handle, const patch_t* patch, int* is_active) {
	int result = 1;
	for (int slice_index = 0; slice_index < patch->slice_count; slice_index += 1) {
		result &= is_slice_applied(handle, &patch->slices[slice_index], is_active);
	}
	return result;
}

int list_patches_with_status(FILE* handle, const group_t* group) {
	int result = 1;
	printf("Patches active:\n");
	for (int patch_index = 0; patch_index < group->patch_count; patch_index += 1) {
		const patch_t* patch = group->patches[patch_index];
		int is_active = 1;
		result &= is_patch_applied(handle, patch, &is_active);
		printf("%s \"%s\"\n", is_active ? "\x1B[32mY\x1B[0m" : "\x1B[31mN\x1B[0m", patch->name);
	}
	return result;
}

int apply_slice(FILE* handle, const slice_t* slice) {
	fseek(handle, slice->offset, SEEK_SET);
	if (fwrite(slice->patched_data, slice->length, 1, handle) != 1) {
		printf("Applying failed!\n");
		return 0;
	}
	return 1;
}

int apply_slices(FILE* handle, const slice_t* slices, int slice_count) {
	int result = 1;
	for (int slice_index = 0; slice_index < slice_count; slice_index += 1) {
		result &= apply_slice(handle, &slices[slice_index]);
	}
	return result;
}

int restore_slice(FILE* handle, const slice_t* slice) {
	fseek(handle, slice->offset, SEEK_SET);
	if (fwrite(slice->restore_data, slice->length, 1, handle) != 1) {
		printf("Restoring failed!\n");
		return 0;
	}
	return 1;
}

int restore_slices(FILE* handle, const slice_t* slices, int slice_count) {
	int result = 1;
	for (int slice_index = 0; slice_index < slice_count; slice_index += 1) {
		result &= restore_slice(handle, &slices[slice_index]);
	}
	return result;
}

int apply_patch(FILE* handle, const patch_t* patch) {
	int result = 1;
	result &= apply_slices(handle, patch->slices, patch->slice_count);
	return result;
}

int restore_patch(FILE* handle, const patch_t* patch) {
	int result = 1;
	result &= restore_slices(handle, patch->slices, patch->slice_count);
	return result;
}

int create_backup(FILE* handle, FILE* backup_handle) {
	printf("Creating backup...\n");
	if (!copy_file(handle, backup_handle)) {
		printf("Backup failed!\n");
		return 0;
	}
	return 1;
}

int restore_backup(FILE* handle, FILE* backup_handle) {
	printf("Restoring backup...\n");
	if (!copy_file(backup_handle, handle)) {
		printf("Restore failed!\n");
		return 0;
	}
	return 1;
}

int apply_all_patches(FILE* handle, const group_t* group) {
	int result = 1;
	for (int patch_index = 0; patch_index < group->patch_count; patch_index += 1) {
		const patch_t* patch = group->patches[patch_index];
		result &= apply_patch(handle, patch);
	}
	return result;
}

int apply_patches_selectively(FILE* handle, const group_t* group) {
	int result = 1;
	for (int patch_index = 0; patch_index < group->patch_count; patch_index += 1) {
		const patch_t* patch = group->patches[patch_index];
		printf("Apply \"%s\"? (Y/N)\n", patch->name);
		while (1) {
			int option = getch();
			if (option == ASCII_ESCAPE) {
				return result;
			}
			if (option == 'y') {
				result &= apply_patch(handle, patch);
				break;
			}
			if (option == 'n') {
				result &= restore_patch(handle, patch);
				break;
			}
		}
	}
	return result;
}

int run_with_group(FILE* handle, const group_t* group) {
	int result = 1;
	printf("Apply all patches? (Y/N)\n");
	while (1) {
		int option = getch();
		if (option == ASCII_ESCAPE) {
			break;
		}
		if (option == 'y') {
			result &= apply_all_patches(handle, group);
			break;
		}
		if (option == 'n') {
			result &= apply_patches_selectively(handle, group);
			break;
		}
	}
	list_patches_with_status(handle, group);
	return result;
}

int run(int argc, char** argv) {
	printf("WarCraft: Refurbished v%s\n", APP_VERSION);
	FILE* handle = fopen("WAR.EXE", "rb+");
	if (handle == NULL) {
		printf("Expected to be able to open file \"WAR.EXE\" for reading and writing!\n");
		return 0;
	}
	FILE* backup_handle = fopen("WAR.BAK", "ab+");
	if (backup_handle == NULL) {
		printf("Expected to be able to create file \"WAR.BAK\" for reading and writing!\n");
		fclose(handle);
		return 0;
	}
	fseek(backup_handle, 0, SEEK_END);
	int backup_file_size = ftell(backup_handle);
	fseek(backup_handle, 0, SEEK_SET);
	if (backup_file_size == 0) {
		if (!create_backup(handle, backup_handle)) {
			fclose(handle);
			fclose(backup_handle);
			return 0;
		}
	} else {
		if (!restore_backup(handle, backup_handle)) {
			fclose(handle);
			fclose(backup_handle);
			return 0;
		}
	}
	fclose(backup_handle);
	fseek(handle, 0, SEEK_END);
	int file_size = ftell(handle);
	fseek(handle, 0, SEEK_SET);
	if (file_size == V121_EXPECTED_SIZE) {
		printf("Detected WarCraft: Orcs & Humans v1.21\n");
		int result = run_with_group(handle, &V121_GROUP);
		fclose(handle);
		return result;
	} else if (file_size == V122H_EXPECTED_SIZE) {
		printf("Detected WarCraft: Orcs & Humans v1.22h\n");
		int result = run_with_group(handle, &V122H_GROUP);
		fclose(handle);
		return result;
	} else {
		printf("Expected to find a supported version of WarCraft: Orcs & Humans!\n");
		fclose(handle);
		return 0;
	}
}

int main(int argc, char** argv) {
	int result = run(argc, argv);
	if (result) {
		printf("Program completed successfully.\n");
		return 0;
	} else {
		printf("Program did not complete successfully!\n");
		return 1;
	}
}
