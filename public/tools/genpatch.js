const fs = require("fs");

const MERGE_PATCH_DISTANCE = 3;

function convertData(buffer) {
	return Array.from(buffer)
		.map((byte) => {
			let hex = byte.toString(16).toUpperCase().padStart(2, "0");
			return `\\x${hex}`;
		})
		.join("");
}

let original = fs.readFileSync(process.argv[2]);
let patched = fs.readFileSync(process.argv[3]);
if (original.length !== patched.length) {
	throw new Error("Expected lengths to be equal!");
}
let patches = [];
let start = null;
for (let byte_index = 0; byte_index < original.length; byte_index += 1) {
	if (original[byte_index] === patched[byte_index]) {
		if (start != null) {
			let end = byte_index;
			patches.push({
				start,
				end
			});
			start = null;
		}
	} else {
		if (start == null) {
			start = byte_index;
		}
	}
}
if (start != null) {
	end = original.length;
	patches.push({
		start,
		end
	});
	start = null;
}
let merged_patches = [];
for (let patch of patches) {
	if (merged_patches.length > 0) {
		let last_merged_patch = merged_patches[merged_patches.length - 1];
		if (last_merged_patch.end + MERGE_PATCH_DISTANCE >= patch.start) {
			last_merged_patch.end = patch.end;
			continue;
		}
	}
	merged_patches.push(patch);
}
for (let merged_patch of merged_patches) {
	let offset = merged_patch.start;
	let length = merged_patch.end - merged_patch.start;
	let original_data = convertData(original.subarray(merged_patch.start, merged_patch.end));
	let patched_data = convertData(patched.subarray(merged_patch.start, merged_patch.end));
	console.log(`{`);
	console.log(`\t${offset},`);
	console.log(`\t${length},`);
	console.log(`\t\"${original_data}\",`);
	console.log(`\t\"${patched_data}\"`);
	console.log(`},`);
}
