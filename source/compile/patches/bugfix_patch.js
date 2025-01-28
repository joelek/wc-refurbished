module.exports = {
	name: "BUGFIX_PATCH",
	slices: [
		{
			description: "Change portrait of wounded unit.",
			addresses: [
				0x00054ED4,
				0x00054ED4
			],
			assembly:
			`
				.byte 0x39
			`,
			relocations: []
		}
	]
};
