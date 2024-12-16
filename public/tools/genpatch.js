#!/usr/bin/env node

const fs = require("fs");

const MERGE_PATCH_DISTANCE = 3;
const MIN_ASCII_STRING_DISTANCE = 3;

function convertData(buffer, is_text) {
	if (is_text) {
		return buffer.toString("ascii")
			.replaceAll("\\", "\\\\")
			.replaceAll("\"", "\\\"")
			.replaceAll("\0", "\\0");
	}
	return Array.from(buffer)
		.map((byte) => {
			let hex = byte.toString(16).toUpperCase().padStart(2, "0");
			return `\\x${hex}`;
		})
		.join("");
}

function isPrintableAscii(byte) {
	if (byte >= 0x20 && byte <= 0x7E) {
		return true;
	}
	return false;
}

function isPrintableAsciiBuffer(buffer) {
	for (let byte of buffer) {
		if (!isPrintableAscii(byte)) {
			return false;
		}
	}
	return true;
}

if (process.argv.length !== 4) {
	throw new Error("Expected two arguments!");
}
let original = fs.readFileSync(process.argv[2]);
let patched = fs.readFileSync(process.argv[3]);
if (original.length !== patched.length) {
	throw new Error("Expected file sizes to be equal!");
}
let patches = [];
function addPatch(start, end) {
	let length = end - start;
	let is_text = length >= MIN_ASCII_STRING_DISTANCE && isPrintableAsciiBuffer(original.subarray(start, end));
	if (is_text) {
		let first_start = patches.length > 0 ? patches[patches.length - 1].end : 0;
		for (let byte_index = start - 1; byte_index >= first_start; byte_index -= 1) {
			if (isPrintableAscii(original[byte_index])) {
				start = byte_index;
			} else {
				break;
			}
		}
		let last_end = original.length;
		for (let byte_index = end; byte_index < last_end; byte_index += 1) {
			if (isPrintableAscii(original[byte_index])) {
				end = byte_index + 1;
			} else {
				break;
			}
		}
	}
	patches.push({
		start,
		end,
		is_text
	});
	return end;
}
let start = null;
for (let byte_index = 0; byte_index < original.length; byte_index += 1) {
	if (original[byte_index] === patched[byte_index]) {
		if (start != null) {
			byte_index = addPatch(start, byte_index);
			start = null;
		}
	} else {
		if (start == null) {
			start = byte_index;
		}
	}
}
if (start != null) {
	addPatch(start, original.end);
	start = null;
}
let merged_patches = [];
for (let patch of patches) {
	if (merged_patches.length > 0) {
		let last_merged_patch = merged_patches[merged_patches.length - 1];
		if (!last_merged_patch.is_text) {
			if (last_merged_patch.end + MERGE_PATCH_DISTANCE >= patch.start) {
				last_merged_patch.end = patch.end;
				continue;
			}
		}
	}
	merged_patches.push(patch);
}
for (let merged_patch of merged_patches) {
	let offset = merged_patch.start;
	let length = merged_patch.end - merged_patch.start;
	let original_data = convertData(original.subarray(merged_patch.start, merged_patch.end), merged_patch.is_text);
	let patched_data = convertData(patched.subarray(merged_patch.start, merged_patch.end), merged_patch.is_text);
	console.log(`{`);
	console.log(`\t${offset},`);
	console.log(`\t${length},`);
	console.log(`\t\"${original_data}\",`);
	console.log(`\t\"${patched_data}\"`);
	console.log(`},`);
}
