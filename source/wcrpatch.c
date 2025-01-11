#include <stdio.h>
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

int apply_patches(FILE* handle, const patch_t* patches, int patch_count) {
	printf("Applying patches...\n");
	int result = 1;
	for (int patch_index = 0; patch_index < patch_count; patch_index += 1) {
		const patch_t* patch = &patches[patch_index];
		result &= apply_slices(handle, patch->slices, patch->slice_count);
	}
	return result;
}

int restore_patches(FILE* handle, const patch_t* patches, int patch_count) {
	printf("Restoring patches...\n");
	int result = 1;
	for (int patch_index = 0; patch_index < patch_count; patch_index += 1) {
		const patch_t* patch = &patches[patch_index];
		result &= restore_slices(handle, patch->slices, patch->slice_count);
	}
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
		int result = apply_patches(handle, &V1_21_PATCH, 1);
		fclose(handle);
		return result;
	} else if (file_size == V122H_EXPECTED_SIZE) {
		printf("Detected WarCraft: Orcs & Humans v1.22H\n");
		int result = apply_patches(handle, &V1_22H_PATCH, 1);
		fclose(handle);
		return result;
	} else {
		printf("Expected to find a supported version of WarCraft: Orcs & Humans!");
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
