#include <stdio.h>

#ifndef APP_VERSION
	#define APP_VERSION "?.?.?"
#endif

struct slice_t {
	int offset;
	int length;
	const char* restore_data;
	const char* patched_data;
};

typedef struct slice_t slice_t;

const int EXPECTED_SIZE = 320639;

const slice_t FREE_BUILDING_PLACEMENT[] = {
	{
		91488,
		1,
		"\x04",
		"\x00"
	},
	{
		91525,
		1,
		"\x03",
		"\x00"
	}
};

const slice_t LEFT_MOUSE_BUTTON_DRAG_SELECT[] = {
	{
		118980,
		1,
		"\x75",
		"\xEB"
	},
	{
		119002,
		7,
		"\xBB\x06\x00\x00\x00\xEB\x20",
		"\xE8\x9D\xB9\x00\x00\xEB\x1E"
	}
};

const slice_t HOVER_BORDER_SCROLL[] = {
	{
		166090,
		2,
		"\x74\x11",
		"\x90\x90"
	}
};

// Updates relocation table.
const slice_t SHOW_BUILDING_GRID_WITH_TAB[] = {
	{
		24973,
		1,
		"\x58",
		"\x32"
	},
	{
		118648,
		1,
		"\x58",
		"\x32"
	}
};

const slice_t NO_C_HOTKEY[] = {
	{
		118429,
		1,
		"\x75",
		"\xEB"
	}
};

const slice_t NO_N_HOTKEY[] = {
	{
		165966,
		1,
		"\x74",
		"\xEB"
	}
};

const slice_t BALANCE_SPEARMAN[] = {
	{
		293493,
		1,
		"\x04",
		"\x05"
	},
	{
		293765,
		1,
		"\x05",
		"\x04"
	}
};

const slice_t CONSISTENT_CANCEL_BUTTONS[] = {
	{
		299932,
		16,
		"@1ESC@2 - cancel",
		"cancel\0\0\0\0\0\0\0\0\0\0"
	},
	{
		303284,
		1,
		"\x0B",
		"\x01"
	},
	{
		303304,
		1,
		"\x0B",
		"\x01"
	},
	{
		303364,
		1,
		"\x0B",
		"\x01"
	},
	{
		303384,
		1,
		"\x0B",
		"\x01"
	},
	{
		303484,
		1,
		"\x0B",
		"\x01"
	},
	{
		303504,
		1,
		"\x0B",
		"\x01"
	},
	{
		303604,
		1,
		"\x0B",
		"\x01"
	},
	{
		303624,
		1,
		"\x0B",
		"\x01"
	},
	{
		303704,
		1,
		"\x0B",
		"\x01"
	},
	{
		303724,
		1,
		"\x0B",
		"\x01"
	},
	{
		303744,
		1,
		"\x0B",
		"\x01"
	},
	{
		303824,
		1,
		"\x0B",
		"\x01"
	},
	{
		303844,
		1,
		"\x0B",
		"\x01"
	},
	{
		303864,
		1,
		"\x0B",
		"\x01"
	},
	{
		303924,
		1,
		"\x0B",
		"\x01"
	},
	{
		303944,
		1,
		"\x0B",
		"\x01"
	},
	{
		304004,
		1,
		"\x0B",
		"\x01"
	},
	{
		304024,
		1,
		"\x0B",
		"\x01"
	},
	{
		304124,
		1,
		"\x0B",
		"\x01"
	},
	{
		304144,
		1,
		"\x0B",
		"\x01"
	},
	{
		304244,
		1,
		"\x0B",
		"\x01"
	},
	{
		304264,
		1,
		"\x0B",
		"\x01"
	},
	{
		304364,
		1,
		"\x0B",
		"\x01"
	},
	{
		304384,
		1,
		"\x0B",
		"\x01"
	},
	{
		304404,
		1,
		"\x0B",
		"\x01"
	},
	{
		304504,
		1,
		"\x0B",
		"\x01"
	},
	{
		304524,
		1,
		"\x0B",
		"\x01"
	},
	{
		304544,
		1,
		"\x0B",
		"\x01"
	},
	{
		304644,
		1,
		"\x0B",
		"\x01"
	},
	{
		304664,
		1,
		"\x0B",
		"\x01"
	},
	{
		304684,
		1,
		"\x0B",
		"\x01"
	},
	{
		304784,
		1,
		"\x0B",
		"\x01"
	},
	{
		304804,
		1,
		"\x0B",
		"\x01"
	},
	{
		304824,
		1,
		"\x0B",
		"\x01"
	},
	{
		304844,
		1,
		"\x0B",
		"\x01"
	}
};

// Extends code and data segments.
const slice_t RENDER_ACTION_BUTTON_HOTKEYS[] = {
	{
		11988,
		2,
		"\x97\x21",
		"\x00\x30"
	},
	{
		12012,
		2,
		"\x30\x57",
		"\x00\x60"
	},
	{
		177316,
		4,
		"\x48\xB4\x00\x00",
		"\xF8\x9A\x01\x00"
	},
	{
		282528,
		160,
		"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00",
		"\xE8\x4B\x19\xFF\xFF\x50\x53\x51\x52\x83\xEC\x0C\x89\x74\x24\x08\x8B\x44\x24\x1C\x83\xC0\x0D\x8B\x00\x2D\x38\x54\x05\x00\x89\x44\x24\x04\x8A\x59\x0C\x80\xFB\x01\x74\x16\x8B\x44\x24\x04\x05\x48\x54\x05\x00\x8A\x04\x18\x88\x04\x24\xC6\x44\x24\x01\x00\xEB\x13\xC6\x04\x24\x45\xC6\x44\x24\x01\x53\xC6\x44\x24\x02\x43\xC6\x44\x24\x03\x00\xB8\xF3\x00\x00\x00\xE8\x23\xFF\xFE\xFF\x8B\x5C\x24\x04\x81\xC3\xE4\x14\x05\x00\x31\xC0\x66\x8B\x01\x89\xC2\xC1\xE2\x04\xC1\xE0\x02\x29\xC2\x01\xD3\x31\xC0\x66\x8B\x03\x83\xC0\x03\x31\xD2\x8A\x54\x24\x08\x66\x03\x53\x02\x83\xC2\x03\x83\xEA\x48\x8D\x1C\x24\xE8\xA4\xFC\xFE\xFF\x83\xC4\x0C\x5A\x59\x5B\x58\xC3"
	}
};

// Extends code and data segments.
const slice_t RENDER_HEALTH_BARS[] = {
	{
		11988,
		2,
		"\x97\x21",
		"\x00\x30"
	},
	{
		12012,
		2,
		"\x30\x57",
		"\x00\x60"
	},
	{
		122456,
		4,
		"\x9C\x29\x01\x00",
		"\xE4\x71\x02\x00"
	},
	{
		282688,
		6,
		"\x00\x00\x00\x00\x00\x00",
		"\xE8\xB3\xB7\xFE\xFF\xC3"
	}
};

const slice_t BETTER_HOTKEYS[] = {
	{
		300282,
		16,
		"build ch@1u@2rch",
		"build @1c@2hurch"
	},
	{
		300299,
		16,
		"build t@1e@2mple",
		"build @1a@2ltar\0"
	},
	{
		300376,
		20,
		"summon sc@1o@2rpions",
		"summon scorpions\0\0\0\0"
	},
	{
		300441,
		18,
		"summon spide@1r@2s",
		"summon spiders\0\0\0\0"
	},
	{
		300590,
		18,
		"build ca@1t@2apult",
		"build @1c@2atapult"
	},
	{
		300712,
		17,
		"@1t@2rain warlock",
		"train @1w@2arlock"
	},
	{
		300730,
		16,
		"@1t@2rain cleric",
		"train @1c@2leric"
	},
	{
		300747,
		19,
		"@1t@2rain necrolyte",
		"train @1n@2ecrolyte"
	},
	{
		300767,
		18,
		"@1t@2rain conjurer",
		"train @1c@2onjurer"
	},
	{
		300786,
		15,
		"train gr@1u@2nt",
		"train @1g@2runt"
	},
	{
		300820,
		23,
		"@1b@2reed faster horses",
		"breed faster @1h@2orses"
	},
	{
		300844,
		23,
		"@1b@2reed faster wolves",
		"breed faster @1w@2olves"
	},
	{
		300868,
		26,
		"upgrade s@1w@2ord strength",
		"upgrade sword @1d@2amage\0\0"
	},
	{
		300895,
		26,
		"@1u@2pgrade spear strength",
		"upgrade spear @1d@2amage\0\0"
	},
	{
		300922,
		24,
		"upgrade @1a@2xe strength",
		"upgrade axe @1d@2amage\0\0"
	},
	{
		300947,
		26,
		"@1u@2pgrade arrow strength",
		"upgrade arrow @1d@2amage\0\0"
	},
	{
		300974,
		27,
		"upgrade s@1h@2ield strength",
		"upgrade shield @1a@2rmor\0\0\0"
	},
	{
		301002,
		27,
		"upgrade @1s@2hield strength",
		"upgrade shield @1a@2rmor\0\0\0"
	},
	{
		301143,
		25,
		"research @1r@2aising dead",
		"research @1r@2aise dead\0\0"
	},
	{
		302544,
		1,
		"\x16",
		"\x2E"
	},
	{
		302664,
		1,
		"\x12",
		"\x1E"
	},
	{
		302824,
		1,
		"\x18",
		"\x26"
	},
	{
		302944,
		1,
		"\x13",
		"\x26"
	},
	{
		303244,
		1,
		"\x16",
		"\x20"
	},
	{
		303264,
		1,
		"\x16",
		"\x20"
	},
	{
		303324,
		1,
		"\x16",
		"\x20"
	},
	{
		303344,
		1,
		"\x16",
		"\x20"
	},
	{
		303404,
		1,
		"\x11",
		"\x20"
	},
	{
		303424,
		1,
		"\x11",
		"\x20"
	},
	{
		303444,
		1,
		"\x23",
		"\x1E"
	},
	{
		303464,
		1,
		"\x23",
		"\x1E"
	},
	{
		303524,
		1,
		"\x1E",
		"\x20"
	},
	{
		303544,
		1,
		"\x1E",
		"\x20"
	},
	{
		303564,
		1,
		"\x1F",
		"\x1E"
	},
	{
		303584,
		1,
		"\x1F",
		"\x1E"
	},
	{
		303884,
		1,
		"\x30",
		"\x23"
	},
	{
		303904,
		1,
		"\x30",
		"\x23"
	},
	{
		303964,
		1,
		"\x30",
		"\x11"
	},
	{
		303984,
		1,
		"\x30",
		"\x11"
	},
	{
		304084,
		1,
		"\x14",
		"\x2E"
	},
	{
		304164,
		1,
		"\x16",
		"\x22"
	},
	{
		304204,
		1,
		"\x14",
		"\x2E"
	},
	{
		304284,
		1,
		"\x14",
		"\x2E"
	},
	{
		304424,
		1,
		"\x14",
		"\x11"
	},
	{
		304564,
		1,
		"\x14",
		"\x2E"
	},
	{
		304704,
		1,
		"\x14",
		"\x31"
	},
	{
		306066,
		6,
		"Temple",
		"Altar\0"
	}
};

struct patch_t {
	const slice_t* slices;
	int slice_count;
};

typedef struct patch_t patch_t;

const patch_t PATCHES[] = {
	{ FREE_BUILDING_PLACEMENT, sizeof(FREE_BUILDING_PLACEMENT) / sizeof(*FREE_BUILDING_PLACEMENT) },
	{ LEFT_MOUSE_BUTTON_DRAG_SELECT, sizeof(LEFT_MOUSE_BUTTON_DRAG_SELECT) / sizeof(*LEFT_MOUSE_BUTTON_DRAG_SELECT) },
	{ HOVER_BORDER_SCROLL, sizeof(HOVER_BORDER_SCROLL) / sizeof(*HOVER_BORDER_SCROLL) },
	{ SHOW_BUILDING_GRID_WITH_TAB, sizeof(SHOW_BUILDING_GRID_WITH_TAB) / sizeof(*SHOW_BUILDING_GRID_WITH_TAB) },
	{ NO_C_HOTKEY, sizeof(NO_C_HOTKEY) / sizeof(*NO_C_HOTKEY) },
	{ NO_N_HOTKEY, sizeof(NO_N_HOTKEY) / sizeof(*NO_N_HOTKEY) },
	{ BALANCE_SPEARMAN, sizeof(BALANCE_SPEARMAN) / sizeof(*BALANCE_SPEARMAN) },
	{ CONSISTENT_CANCEL_BUTTONS, sizeof(CONSISTENT_CANCEL_BUTTONS) / sizeof(*CONSISTENT_CANCEL_BUTTONS) },
	{ RENDER_ACTION_BUTTON_HOTKEYS, sizeof(RENDER_ACTION_BUTTON_HOTKEYS) / sizeof(*RENDER_ACTION_BUTTON_HOTKEYS) },
	{ RENDER_HEALTH_BARS, sizeof(RENDER_HEALTH_BARS) / sizeof(*RENDER_HEALTH_BARS) },
	{ BETTER_HOTKEYS, sizeof(BETTER_HOTKEYS) / sizeof(*BETTER_HOTKEYS) },
};

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

int run(int argc, char** argv) {
	printf("WarCraft: Refurbished v%s\n", APP_VERSION);
	FILE* handle = fopen("WAR.EXE", "rb+");
	if (handle == NULL) {
		printf("Expected to be able to open file \"WAR.EXE\" for reading and writing!\n");
		return 0;
	}
	fseek(handle, 0, SEEK_END);
	int file_size = ftell(handle);
	fseek(handle, 0, SEEK_SET);
	if (file_size != EXPECTED_SIZE) {
		printf("Expected \"WAR.EXE\" to have size %i!\n", EXPECTED_SIZE);
		fclose(handle);
		return 0;
	}
	printf("Applying patches...\n");
	int result = 1;
	for (int patch_index = 0; patch_index < sizeof(PATCHES) / sizeof(*PATCHES); patch_index += 1) {
		const patch_t* patch = &PATCHES[patch_index];
		result &= apply_slices(handle, patch->slices, patch->slice_count);
	}
	fclose(handle);
	return result;
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
