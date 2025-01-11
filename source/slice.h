#ifndef WCRPATCH_SLICE_H
#define WCRPATCH_SLICE_H

struct slice_t {
	int offset;
	int length;
	const char* restore_data;
	const char* patched_data;
};

typedef struct slice_t slice_t;

#endif
