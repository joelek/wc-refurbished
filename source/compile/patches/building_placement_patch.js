module.exports = {
	name: "BUILDING_PLACEMENT_PATCH",
	slices: [
		{
			description: "Remove requirement of building near other buildings.",
			addresses: [
				0x0001375F,
				0x0001375F
			],
			assembly:
			`
				mov eax, 0
			`,
			relocations: []
		},
		{
			description: "Remove requirement of building near roads.",
			addresses: [
				0x00013784,
				0x00013784
			],
			assembly:
			`
				mov eax, 0
			`,
			relocations: []
		}
	]
};
