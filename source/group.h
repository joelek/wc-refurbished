#ifndef WCRPATCH_GROUP_H
#define WCRPATCH_GROUP_H

#include "patch.h"

struct group_t {
	const patch_t** patches;
	int patch_count;
};

typedef struct group_t group_t;

#endif
