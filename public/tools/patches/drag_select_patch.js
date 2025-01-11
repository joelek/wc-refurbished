module.exports = {
	slices: [
		{
			description: "Remove requirement of holding left or right control.",
			addresses: [
				0x0001A2C4,
				0x0001A2C4
			],
			assembly:
			`
				.byte 0xEB, 0x0A                                               # encoding of short jump +12
			`,
			relocations: []
		},
		{
			description: "Set handler.",
			addresses: [
				0x0001A2DF,
				0x0001A2DF
			],
			assembly:
			`
				.byte 0xEB, 0xD4                                               # encoding of short jump -42
			`,
			relocations: []
		}
	]
};
