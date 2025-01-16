#!/usr/bin/env node

const cp = require("child_process");
const fs = require("fs");
const patches = require("./patches.js");
const warapi = require("./warapi.js");
const wcrapi = require("./wcrapi.js");

function convertData(buffer) {
	return Array.from(buffer)
		.map((byte) => {
			let hex = byte.toString(16).toUpperCase().padStart(2, "0");
			return `\\x${hex}`;
		})
		.join("");
}

function listOccurrences(haystack, needle) {
	let occurences = [];
	outer: for (let i = 0; i < haystack.length; i += 1) {
		inner: for (let j = 0; j < needle.length; j += 1) {
			if (haystack[i+j] !== needle[j]) {
				continue outer;
			}
		}
		occurences.push(i);
		i += needle.length - 1;
	}
	return occurences;
}

let executables = [
	{
		name: "V121",
		source: "./private/v121/WAR121.EXE",
		target: "./private/v121/WAR.EXE",
		c: "v121.c",
		h: "v121.h",
		address_index: 0
	},
	{
		name: "V122H",
		source: "./private/v122h/WAR122H.EXE",
		target: "./private/v122h/WAR.EXE",
		c: "v122h.c",
		h: "v122h.h",
		address_index: 1
	}
];

for (let executable of executables) {
	let buffer = fs.readFileSync(executable.source);
	let offset_of_le_header = buffer.readUint32LE(60);
	let page_count = buffer.readUint32LE(offset_of_le_header + 20);
	let page_size = buffer.readUint32LE(offset_of_le_header + 40);
	let offset_of_object_table = offset_of_le_header + buffer.readUint32LE(offset_of_le_header + 64);
	let object_count = buffer.readUint32LE(offset_of_le_header + 68);
	let offset_of_relocation_page_table = offset_of_le_header + buffer.readUint32LE(offset_of_le_header + 104);
	let offset_of_relocation_record_table = offset_of_le_header + buffer.readUint32LE(offset_of_le_header + 108);
	let page_data_absolute_offset = buffer.readUint32LE(offset_of_le_header + 128);
	let bytes_offset = page_data_absolute_offset;
	let objects = [];
	for (let i = 0; i < object_count; i += 1) {
		let virtual_segment_size = buffer.readUint32LE(offset_of_object_table + i * 24 + 0);
		let relocation_base_address = buffer.readUint32LE(offset_of_object_table + i * 24 + 4);
		let object_flags = buffer.readUint32LE(offset_of_object_table + i * 24 + 8);
		let page_map_number = buffer.readUint32LE(offset_of_object_table + i * 24 + 12);
		let page_map_records =buffer.readUint32LE(offset_of_object_table + i * 24 + 16);
		let unknown = buffer.readUint32LE(offset_of_object_table + i * 24 + 20);
		let paged_length = page_map_records * page_size;
		let bytes = buffer.subarray(bytes_offset, bytes_offset + paged_length); bytes_offset += paged_length;
		objects.push({
			virtual_segment_size,
			relocation_base_address,
			object_flags,
			page_map_number,
			page_map_records,
			unknown,
			bytes
		});
	}
	let relocation_pages = [];
	for (let i = 0; i < page_count; i += 1) {
		let offset_start = offset_of_relocation_record_table + buffer.readUint32LE(offset_of_relocation_page_table + i * 4 + 0);
		let offset_end = offset_of_relocation_record_table + buffer.readUint32LE(offset_of_relocation_page_table + i * 4 + 4);
		let relocations = buffer.subarray(offset_start, offset_end);
		let records = [];
		let offset = 0;
		while (offset < relocations.length) {
			let address_type = relocations.readUint8(offset); offset += 1;
			let relocation_type = relocations.readUint8(offset); offset += 1;
			if (address_type === 7 && relocation_type === 0) {
				let relative_offset_within_page = relocations.readUint16LE(offset); offset += 2;
				let target_segment_number = relocations.readUint8(offset); offset += 1;
				let bytes_at_offset = relocations.subarray(offset, offset + 2); offset += 2;
				records.push({
					relative_offset_within_page,
					target_segment_number,
					bytes_at_offset
				});
				continue;
			}
			if (address_type === 7 && relocation_type === 16) {
				let relative_offset_within_page = relocations.readUint16LE(offset); offset += 2;
				let target_segment_number = relocations.readUint8(offset); offset += 1;
				let bytes_at_offset = relocations.subarray(offset, offset + 4); offset += 4;
				records.push({
					relative_offset_within_page,
					target_segment_number,
					bytes_at_offset
				});
				continue;
			}
			throw new Error(`Expected relocation type to be known!`);
		}
		relocation_pages.push({
			records
		});
	}
	let references = {};
	for (let entry of warapi.code) {
		references[entry.addresses[0]] = entry.addresses[executable.address_index];
	}
	for (let entry of warapi.data) {
		references[entry.addresses[0]] = entry.addresses[executable.address_index];
	}
	for (let entry of wcrapi.code) {
		references[entry.addresses[0]] = entry.addresses[executable.address_index];
	}
	for (let entry of wcrapi.data) {
		references[entry.addresses[0]] = entry.addresses[executable.address_index];
	}
	let extra_references = [
		{
			description: "Callee used to get relocated code segment offset.",
			addresses: [
				0x0002B814,
				0x0002B6E4
			]
		}
	];
	for (let entry of extra_references) {
		references[entry.addresses[0]] = entry.addresses[executable.address_index];
	}
	let wcr_patches = [];
	for (let patch of patches) {
		let slices = [];
		for (let slice of patch.slices) {
			let address = slice.addresses[executable.address_index];
			let assembly = slice.assembly.replaceAll(/(0x[0-9A-F]{8})/gi, (match) => {
				let replacement = references[Number.parseInt(match, 16)];
				if (replacement == null) {
					throw new Error(`Expected reference "${match}" to exist in reference map!`);
				}
				return "0x" + replacement.toString(16).toUpperCase().padStart(8, "0");
			});
			let result = cp.spawnSync("kstool", [
				"x32",
				assembly,
				"0x" + address.toString(16).toUpperCase().padStart(8, "0")
			], { encoding: "utf8" });
			if (result.status !== 0 || result.stdout.startsWith("ERROR:")) {
				throw new Error(result.stdout);
			}
			let parts = /\[\s*([0-9A-F]{2}(?:\s*[0-9A-F]{2})*)\s*\]/ui.exec(result.stdout);
			if (parts == null) {
				throw new Error(`Expected a valid result from kstool!`);
			}
			let bytes_patched = Buffer.from(parts[1].trim().split(/\s+/).map((part) => Number.parseInt(part, 16)));
			let object_index = objects.findIndex((object) => {
				if (address >= object.relocation_base_address) {
					if (address - object.relocation_base_address < object.page_map_records * page_size) {
						return true;
					}
				}
				return false;
			});
			if (object_index < 0) {
				throw new Error(`Expected slice address ${address} to belong to an object!`);
			}
			let object = objects[object_index];
			let object_offset = address - object.relocation_base_address;
			let bytes_restore = object.bytes.subarray(object_offset, object_offset + bytes_patched.length);
			for (let relocation of slice.relocations) {
				let bytes = Buffer.alloc(4);
				let replacement = references[relocation];
				if (replacement == null) {
					throw new Error(`Expected reference "0x${relocation.toString(16).toUpperCase().padStart(8, "0")}" to exist in reference map!`);
				}
				bytes.writeUint32LE(replacement, 0);
				let occurences = listOccurrences(bytes_patched, bytes);
				for (let occurence of occurences) {
					let relocation_offset = address + occurence;
					let relocation_offset_within_object = relocation_offset - object.relocation_base_address;
					let relocation_page_within_object = Math.floor(relocation_offset_within_object / page_size);
					let relocation_offset_within_page = relocation_offset_within_object % page_size;
					let relocation_page = relocation_pages[object.page_map_number - 1 + relocation_page_within_object];
					let record = relocation_page.records.find((record) => {
						return record.relative_offset_within_page === relocation_offset_within_page;
					});
					if (record == null) {
						throw new Error(`Expected to find a relocation record!`);
					}
					let replacement_object = objects[record.target_segment_number - 1];
					if (replacement_object == null) {
						throw new Error(`Expected replacement record to belong to an object!`);
					}
					replacement = replacement - replacement_object.relocation_base_address;
					bytes_patched.writeUint32LE(replacement, occurence);
					let reloc_restore = record.bytes_at_offset;
					let reloc_patched = Buffer.alloc(reloc_restore.length);
					if (reloc_patched.length === 2) {
						reloc_patched.writeUint16LE(replacement);
					} else if (reloc_patched.length === 4) {
						reloc_patched.writeUint32LE(replacement);
					}
					slices.push({
						offset: reloc_restore.byteOffset,
						length: reloc_restore.length,
						restore_data: convertData(reloc_restore),
						patched_data: convertData(reloc_patched),
					});
					reloc_restore.set(reloc_patched);
				}
			}
			slices.push({
				offset: bytes_restore.byteOffset,
				length: bytes_restore.length,
				restore_data: convertData(bytes_restore),
				patched_data: convertData(bytes_patched),
			});
			bytes_restore.set(bytes_patched);
		}
		wcr_patches.push({
			name: patch.name,
			slices: slices,
		});
	}
	let lines = [];
	lines.push(`#include "${executable.h}"`);
	lines.push(``);
	for (let wcr_patch of wcr_patches) {
		lines.push(`const slice_t ${executable.name}_${wcr_patch.name}_SLICES[] = {`);
		lines.push(wcr_patch.slices.map((slice) => [
			`\t{`,
			`\t\t${slice.offset},`,
			`\t\t${slice.length},`,
			`\t\t"${slice.restore_data}",`,
			`\t\t"${slice.patched_data}"`,
			`\t}`
		].join("\r\n")).join(",\r\n"));
		lines.push(`};`);
		lines.push(``);
		lines.push(`const patch_t ${executable.name}_${wcr_patch.name}_PATCH = {`);
		lines.push(`\t"${executable.name}_${wcr_patch.name}",`);
		lines.push(`\t${executable.name}_${wcr_patch.name}_SLICES,`);
		lines.push(`\tsizeof(${executable.name}_${wcr_patch.name}_SLICES) / sizeof(*${executable.name}_${wcr_patch.name}_SLICES)`);
		lines.push(`};`);
		lines.push(``);
	}
	lines.push(`const patch_t* ${executable.name}_PATCHES[] = {`);
	lines.push(wcr_patches.map((wcr_patch) => [
		`\t&${executable.name}_${wcr_patch.name}_PATCH`
	].join("\r\n")).join(",\r\n"));
	lines.push(`};`);
	lines.push(``);
	lines.push(`const group_t ${executable.name}_GROUP = {`);
	lines.push(`\t${executable.name}_PATCHES,`);
	lines.push(`\tsizeof(${executable.name}_PATCHES) / sizeof(*${executable.name}_PATCHES)`);
	lines.push(`};`);
	lines.push(``);
	fs.writeFileSync(`./source/${executable.c}`, lines.join("\r\n"));
	fs.writeFileSync(executable.target, buffer);
}
