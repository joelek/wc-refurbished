module.exports = {
	slices: [
		{
			description: "Remove requirement of clicking to trigger border scroller.",
			addresses: [
				0x00025ACA,
				0x0002599A
			],
			assembly:
			`
				nop
				nop
			`,
			relocations: []
		},
		{
			description: "Decrease border scroller min x.",
			addresses: [
				0x00025BE8,
				0x00025AB8
			],
			assembly:
			`
				cmp ebx, 0
			`,
			relocations: []
		},
		{
			description: "Increase border scroller max x.",
			addresses: [
				0x00025BFF,
				0x00025ACF
			],
			assembly:
			`
				cmp eax, 319
			`,
			relocations: []
		},
		{
			description: "Decrease border scroller min y.",
			addresses: [
				0x00025C27,
				0x00025AF7
			],
			assembly:
			`
				cmp ebx, 0
			`,
			relocations: []
		},
		{
			description: "Increase border scroller max y.",
			addresses: [
				0x00025C3E,
				0x00025B0E
			],
			assembly:
			`
				cmp eax, 199
			`,
			relocations: []
		},
		{
			description: "Reduce scroll speeds in mouse scroll speed table.",
			addresses: [
				0x00053266,
				0x00053266
			],
			assembly:
			`
				.byte 0x1E, 0x00
				.byte 0x14, 0x00
				.byte 0x0A, 0x00
				.byte 0x05, 0x00
				.byte 0x02, 0x00
			`,
			relocations: []
		},
		{
			description: "Reduce scroll speeds in keyboard scroll speed table.",
			addresses: [
				0x00053270,
				0x00053270
			],
			assembly:
			`
				.byte 0x1E, 0x00
				.byte 0x14, 0x00
				.byte 0x0A, 0x00
				.byte 0x05, 0x00
				.byte 0x02, 0x00
			`,
			relocations: []
		}
	]
};
