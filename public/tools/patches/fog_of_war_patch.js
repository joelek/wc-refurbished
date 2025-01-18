module.exports = {
	name: "FOG_OF_WAR_PATCH",
	slices: [
		{
			description: "Increase far sight/dark vision reveal diameter to 7x7.",
			addresses: [
				0x0002EAFE,
				0x0002E9CE
			],
			assembly:
			`
				jmp 0x0001EBC8
			`,
			relocations: []
		},
		{
			description: "Increase far sight/dark vision reveal diameter to 7x7.",
			addresses: [
				0x0002EB1C,
				0x0002E9EC
			],
			assembly:
			`
				jmp 0x0001EBC8
			`,
			relocations: []
		},
		{
			description: "Increase reveal diameter to 7x7 for walking units.",
			addresses: [
				0x0002EBCF,
				0x0002EA9F
			],
			assembly:
			`
				mov dword ptr [esp+4], 0x0001EBC8
			`,
			relocations: [
				0x0001EBC8
			]
		},
		{
			description: "Increase reveal diameter to 7x7 for walking units.",
			addresses: [
				0x0002EBE9,
				0x0002EAB9
			],
			assembly:
			`
				mov dword ptr [esp+0], 0x0001EBC8
			`,
			relocations: [
				0x0001EBC8
			]
		},
		{
			description: "Increase reveal diameter to 7x7 for walking units.",
			addresses: [
				0x0002EC21,
				0x0002EAF1
			],
			assembly:
			`
				mov dword ptr [esp+4], 0x0001EBC8
			`,
			relocations: [
				0x0001EBC8
			]
		},
		{
			description: "Increase reveal diameter to 7x7 for walking units.",
			addresses: [
				0x0002ECD6,
				0x0002EBA6
			],
			assembly:
			`
				mov dword ptr [esp+4], 0x0001EBC8
			`,
			relocations: [
				0x0001EBC8
			]
		},
		{
			description: "Increase reveal diameter to 7x7 for walking units.",
			addresses: [
				0x0002EC83,
				0x0002EB53
			],
			assembly:
			`
				mov dword ptr [esp+0], 0x0001EBC8
			`,
			relocations: [
				0x0001EBC8
			]
		}
	]
};
