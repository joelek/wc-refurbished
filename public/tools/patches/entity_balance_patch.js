module.exports = {
	name: "ENTITY_BALANCE_PATCH",
	slices: [
		{
			description: "Set range for spearman.",
			addresses: [
				0x00051C75,
				0x00051C75
			],
			assembly:
			`
				.byte 0x05
			`,
			relocations: []
		},
		{
			description: "Sets damage for peasant.",
			addresses: [
				0x00051D5E,
				0x00051D5E
			],
			assembly:
			`
				.byte 0x02
			`,
			relocations: []
		},
		{
			description: "Set damage for peon.",
			addresses: [
				0x00051D5F,
				0x00051D5F
			],
			assembly:
			`
				.byte 0x02
			`,
			relocations: []
		},
		{
			description: "Ses damage for spearman.",
			addresses: [
				0x00051D85,
				0x00051D85
			],
			assembly:
			`
				.byte 0x04
			`,
			relocations: []
		}
	]
};
