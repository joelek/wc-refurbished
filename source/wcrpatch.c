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
		640,
		"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00",
		"\xE8\xB3\xB7\xFE\xFF\x50\x53\x51\x52\x56\x57\x81\xEC\xF4\x00\x00\x00\x8B\x84\x24\x0C\x01\x00\x00\x83\xE8\x0E\x8B\x00\x2D\xB0\xA9\x05\x00\x89\x04\x24\x8D\x05\xD0\x00\x05\x00\x03\x04\x24\x31\xDB\x66\x8B\x18\xC1\xE3\x04\x89\x5C\x24\x14\x31\xDB\x66\x8B\x58\x02\xC1\xE3\x04\x89\x5C\x24\x18\x8D\x3D\xD0\xA5\x05\x00\x03\x3C\x24\x83\x3F\x00\x0F\x84\x1A\x02\x00\x00\x8B\x37\x31\xC0\x8A\x46\x10\xA9\x02\x00\x00\x00\x0F\x85\xFC\x01\x00\x00\xA9\x14\x00\x00\x00\x0F\x85\xF1\x01\x00\x00\x31\xC0\x8A\x46\x1B\x31\xDB\x66\x8B\x5E\x16\x89\x5C\x24\x64\x83\xFB\x00\x0F\x8E\xD9\x01\x00\x00\x8D\x0C\x45\x78\x19\x05\x00\x03\x0C\x24\x31\xD2\x66\x8B\x11\x89\x54\x24\x68\x39\xD3\x0F\x8D\xBE\x01\x00\x00\x8D\x0C\x85\x9C\x1B\x05\x00\x03\x0C\x24\x31\xD2\x66\x8B\x11\x89\x54\x24\x6C\x31\xD2\x66\x8B\x51\x02\x89\x54\x24\x70\x8D\x0C\x85\xBC\x1A\x05\x00\x03\x0C\x24\x31\xD2\x66\x8B\x11\xC1\xE2\x04\x89\x54\x24\x74\xF7\xDA\x03\x54\x24\x6C\xD1\xFA\x42\x89\x54\x24\x78\x31\xD2\x66\x8B\x51\x02\xC1\xE2\x04\x89\x54\x24\x7C\xF7\xDA\x03\x54\x24\x70\xD1\xFA\x42\x89\x94\x24\x80\x00\x00\x00\x31\xC9\x66\x8B\x0E\x2B\x4C\x24\x78\x2B\x4C\x24\x14\x81\xF9\xF0\x00\x00\x00\x0F\x8D\x48\x01\x00\x00\x89\x8C\x24\x84\x00\x00\x00\x03\x4C\x24\x6C\x83\xF9\x00\x0F\x8C\x34\x01\x00\x00\x89\x8C\x24\x88\x00\x00\x00\x31\xC9\x66\x8B\x4E\x02\x2B\x8C\x24\x80\x00\x00\x00\x2B\x4C\x24\x18\x81\xF9\xB0\x00\x00\x00\x0F\x8D\x10\x01\x00\x00\x89\x8C\x24\x8C\x00\x00\x00\x03\x4C\x24\x70\x83\xF9\x00\x0F\x8C\xFC\x00\x00\x00\x89\x8C\x24\x90\x00\x00\x00\x8B\x4C\x24\x6C\x83\xE9\x02\x8B\x44\x24\x64\xF7\xE1\x31\xD2\xF7\x74\x24\x68\x40\x8B\x9C\x24\x84\x00\x00\x00\x43\x89\xD9\xBA\x00\x00\x00\x00\x39\xD3\x7D\x02\x89\xD3\x89\x9C\x24\x94\x00\x00\x00\x01\xC1\x39\xD1\x7D\x02\x89\xD1\xBA\xF0\x00\x00\x00\x39\xD1\x7E\x02\x89\xD1\x29\xD9\x89\x8C\x24\x98\x00\x00\x00\x8B\x9C\x24\x90\x00\x00\x00\x83\xEB\x02\x89\xD9\xBA\x00\x00\x00\x00\x39\xD3\x7D\x02\x89\xD3\xBA\xB0\x00\x00\x00\x39\xD3\x7E\x02\x89\xD3\x89\x9C\x24\x9C\x00\x00\x00\x83\xC1\x02\xBA\x00\x00\x00\x00\x39\xD1\x7D\x02\x89\xD1\xBA\xB0\x00\x00\x00\x39\xD1\x7E\x02\x89\xD1\x29\xD9\x89\x8C\x24\xA0\x00\x00\x00\xB9\x64\x00\x00\x00\x8B\x44\x24\x64\xF7\xE1\x31\xD2\xF7\x74\x24\x68\x8D\x1D\x7C\x35\x05\x00\x03\x1C\x24\x31\xC9\x8A\x0B\x31\xD2\x8A\x53\x01\x39\xC8\x7D\x05\x83\xC3\x02\xEB\xEE\x8D\x05\x70\xAE\x05\x00\x03\x04\x24\x88\x10\x8B\x84\x24\x94\x00\x00\x00\x83\xC0\x48\x8B\x94\x24\x9C\x00\x00\x00\x83\xC2\x0C\x8B\x9C\x24\x98\x00\x00\x00\x8B\x8C\x24\xA0\x00\x00\x00\xE8\xD9\x02\xFF\xFF\x83\xC7\x04\x83\x3F\x00\x0F\x85\xE6\xFD\xFF\xFF\x81\xC4\xF4\x00\x00\x00\x5F\x5E\x5A\x59\x5B\x58\xC3"
	}
};

// Extends code and data segments.
const slice_t CONTEXTUAL_ACTION_DISPATCH[] = {
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
		123846,
		4,
		"\x52\xFB\xFF\xFF",
		"\x96\x6F\x02\x00"
	},
	{
		283488,
		542,
		"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00",
		"\x60\x83\xEC\x40\x8B\x5C\x24\x60\x83\xEB\x0D\x8B\x1B\x81\xEB\xD2\x00\x05\x00\x89\x1C\x24\x89\x44\x24\x04\x89\x54\x24\x08\xC7\x44\x24\x14\x00\x00\x00\x00\xC7\x44\x24\x18\xFF\xFF\xFF\xFF\xC7\x44\x24\x1C\x01\x00\x00\x00\xC7\x44\x24\x20\x01\x00\x00\x00\xC7\x44\x24\x2C\x00\x00\x00\x00\xB8\xBC\x86\x05\x00\x03\x04\x24\x8B\x00\x8B\x4C\x24\x08\xC1\xE1\x06\x8B\x5C\x24\x04\x01\xD9\x31\xD2\x66\x8B\x14\x48\x89\x54\x24\x0C\xB8\xFC\xA8\x05\x00\x03\x04\x24\x89\x44\x24\x10\xE8\x1C\x38\xFE\xFF\x83\xF8\x00\x0F\x84\x98\x01\x00\x00\x31\xDB\x8A\x58\x1B\x31\xC9\x8A\x48\x1E\x31\xD2\x8A\x50\x49\x83\x7C\x24\x14\x00\x7F\x06\x89\x5C\x24\x18\xEB\x0E\x3B\x5C\x24\x18\x74\x08\xC7\x44\x24\x18\xFF\xFF\xFF\xFF\x83\xFB\x1F\x7E\x08\xC7\x44\x24\x1C\x00\x00\x00\x00\x83\xF9\x00\x74\x08\xC7\x44\x24\x20\x00\x00\x00\x00\xF7\xC2\x20\x00\x00\x00\x74\x04\xFF\x44\x24\x2C\xFF\x44\x24\x14\xE8\x46\x37\xFE\xFF\x83\xF8\x00\x75\xA2\x83\x7C\x24\x1C\x01\x0F\x85\x2F\x01\x00\x00\x83\x7C\x24\x20\x01\x0F\x85\x24\x01\x00\x00\x83\x7C\x24\x18\x02\x0F\x8C\xC5\x00\x00\x00\x83\x7C\x24\x18\x03\x0F\x8F\xBA\x00\x00\x00\x83\x7C\x24\x2C\x00\x75\x14\x81\x7C\x24\x0C\x80\x00\x00\x00\x75\x0A\xBB\x0A\x00\x00\x00\xE9\xC6\x00\x00\x00\x83\x7C\x24\x2C\x00\x75\x21\x8B\x44\x24\x10\x83\xF8\x00\x74\x18\x8B\x00\x80\x78\x1E\x04\x75\x10\x80\x78\x1B\x32\x75\x0A\xBB\x0A\x00\x00\x00\xE9\x9E\x00\x00\x00\x8B\x44\x24\x2C\x3B\x44\x24\x14\x75\x24\x8B\x44\x24\x10\x83\xF8\x00\x74\x1B\x8B\x00\x80\x78\x1E\x00\x75\x13\x80\x78\x1B\x28\x7C\x0D\x80\x78\x1B\x29\x7F\x07\xBB\x0B\x00\x00\x00\xEB\x70\x8B\x44\x24\x10\x83\xF8\x00\x74\x1B\x8B\x00\x80\x78\x1E\x00\x75\x13\x80\x78\x1B\x20\x7C\x0D\x80\x78\x1B\x31\x7F\x07\xBB\x0E\x00\x00\x00\xEB\x4C\x8B\x44\x24\x10\x83\xF8\x00\x74\x15\x8B\x00\x80\x78\x1E\x00\x74\x0D\x80\x78\x1E\x04\x74\x07\xBB\x04\x00\x00\x00\xEB\x2E\xBB\x03\x00\x00\x00\xEB\x27\x8B\x44\x24\x10\x83\xF8\x00\x74\x15\x8B\x00\x80\x78\x1E\x00\x74\x0D\x80\x78\x1E\x04\x74\x07\xBB\x04\x00\x00\x00\xEB\x09\xBB\x03\x00\x00\x00\xEB\x02\xEB\x2D\xB8\x04\xA9\x05\x00\x03\x04\x24\x66\x89\x18\xB8\xF0\xA9\x05\x00\x03\x04\x24\x66\x8B\x18\x66\x89\x5C\x24\x28\x66\x8B\x58\x02\x66\x89\x5C\x24\x2A\x8D\x44\x24\x24\xE8\x13\x8D\xFD\xFF\x83\xC4\x40\x61\xC3"
	}
};

// Extends code and data segments.
const slice_t ENTITY_GROUPING[] = {
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
		118287,
		4,
		"\x7D\x16\x00\x00",
		"\xED\x87\x02\x00"
	},
	{
		284160,
		229,
		"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00",
		"\xE8\x8B\x8E\xFD\xFF\x66\x85\xC0\x74\x01\xC3\x53\x51\x52\x83\xEC\x40\x8B\x44\x24\x4C\x83\xE8\x18\x8B\x00\x2D\x2C\x15\x05\x00\x89\x04\x24\x31\xC0\x66\x89\xD8\x89\x44\x24\x04\xC7\x44\x24\x08\x00\x00\x00\x00\x31\xD2\x88\xDA\x8B\x5C\x24\x04\x80\xFB\x02\x0F\x8C\x96\x00\x00\x00\x80\xFB\x0B\x0F\x8F\x8D\x00\x00\x00\xC7\x44\x24\x08\x01\x00\x00\x00\xF6\xC7\x0C\x75\x43\x31\xC9\xBB\xD0\xA5\x05\x00\x03\x1C\x24\x8B\x03\x83\xF8\x00\x74\x25\x66\xF7\x40\x0E\x00\x01\x75\x18\x66\xF7\x40\x10\x02\x00\x75\x10\x80\x78\x1B\x32\x7F\x0A\x38\x50\x13\x75\x05\x89\x44\x8C\x0C\x41\x83\xC3\x04\xEB\xD4\x89\xC8\x8D\x54\x24\x0C\xE8\x35\x3B\xFE\xFF\xEB\x3D\xBB\xD0\xA5\x05\x00\x03\x1C\x24\x8B\x03\x83\xF8\x00\x74\x14\x80\x78\x1B\x32\x7F\x09\x38\x50\x13\x75\x04\xC6\x40\x13\x00\x83\xC3\x04\xEB\xE5\xE8\x2F\x35\xFE\xFF\x83\xF8\x00\x74\x10\x80\x78\x1B\x32\x7F\x03\x88\x50\x13\xE8\xA8\x34\xFE\xFF\xEB\xEB\x8B\x44\x24\x08\x83\xC4\x40\x5A\x59\x5B\xC3"
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

const slice_t WORKERS_DEAL_DAMAGE[] = {
	{
			293726,
			2,
			"\x00\x00",
			"\x02\x02"
	}
};

const slice_t REDUCED_BORDER_SCROLLER[] = {
	{
		166378,
		1,
		"\x08",
		"\x00"
	},
	{
		166400,
		4,
		"\x37\x01\x00\x00",
		"\x3F\x01\x00\x00"
	},
	{
		166441,
		1,
		"\x08",
		"\x00"
	},
	{
		166463,
		4,
		"\xBF\x00\x00\x00",
		"\xC7\x00\x00\x00"
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
	{ CONTEXTUAL_ACTION_DISPATCH, sizeof(CONTEXTUAL_ACTION_DISPATCH) / sizeof(*CONTEXTUAL_ACTION_DISPATCH) },
	{ ENTITY_GROUPING, sizeof(ENTITY_GROUPING) / sizeof(*ENTITY_GROUPING) },
	{ BETTER_HOTKEYS, sizeof(BETTER_HOTKEYS) / sizeof(*BETTER_HOTKEYS) },
	{ WORKERS_DEAL_DAMAGE, sizeof(WORKERS_DEAL_DAMAGE) / sizeof(*WORKERS_DEAL_DAMAGE) },
	{ REDUCED_BORDER_SCROLLER, sizeof(REDUCED_BORDER_SCROLLER) / sizeof(*REDUCED_BORDER_SCROLLER) }
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
