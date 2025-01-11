#ifndef WCRPATCH_PATCH_H
#define WCRPATCH_PATCH_H

#include "slice.h"

struct patch_t {
	const slice_t* slices;
	int slice_count;
};

typedef struct patch_t patch_t;

#endif
