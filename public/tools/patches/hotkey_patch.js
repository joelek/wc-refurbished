module.exports = {
	slices: [
		{
			description: "Move C hotkey behaviour to SPACE.",
			addresses: [
				0x0001A09A,
				0x0001A09A
			],
			assembly:
			`
				cmp eax, 0x39
			`,
			relocations: []
		},
		{
			description: "Move G hotkey behaviour to TAB.",
			addresses: [
				0x0001A175,
				0x0001A175
			],
			assembly:
			`
				cmp	word ptr [0x0005AA32], 0
			`,
			relocations: [
				0x0005AA32
			]
		},
		{
			description: "Remove N hotkey behaviour.",
			addresses: [
				0x00025A4E,
				0x0002591E
			],
			assembly:
			`
				.byte 0xEB, 0x45                                               # encoding of short jump +71
			`,
			relocations: []
		},
		{
			description: "Update tooltip text.",
			addresses: [
				0x0005359C,
				0x0005359C
			],
			assembly:
			`
				.string "cancel\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0"
			`,
			relocations: []
		},
		{
			description: "Update tooltip text.",
			addresses: [
				0x000536FA,
				0x000536FA
			],
			assembly:
			`
				.string "build @1c@2hurch"
			`,
			relocations: []
		},
		{
			description: "Update tooltip text.",
			addresses: [
				0x0005370B,
				0x0005370B
			],
			assembly:
			`
				.string "build @1a@2ltar\\0"
			`,
			relocations: []
		},
		{
			description: "Update tooltip text.",
			addresses: [
				0x00053758,
				0x00053758
			],
			assembly:
			`
				.string "summon scorpions\\0\\0\\0\\0"
			`,
			relocations: []
		},
		{
			description: "Update tooltip text.",
			addresses: [
				0x00053799,
				0x00053799
			],
			assembly:
			`
				.string "summon spiders\\0\\0\\0\\0"
			`,
			relocations: []
		},
		{
			description: "Update tooltip text.",
			addresses: [
				0x0005382E,
				0x0005382E
			],
			assembly:
			`
				.string "build @1c@2atapult"
			`,
			relocations: []
		},
		{
			description: "Update tooltip text.",
			addresses: [
				0x000538A8,
				0x000538A8
			],
			assembly:
			`
				.string "train @1w@2arlock"
			`,
			relocations: []
		},
		{
			description: "Update tooltip text.",
			addresses: [
				0x000538BA,
				0x000538BA
			],
			assembly:
			`
				.string "train @1c@2leric"
			`,
			relocations: []
		},
		{
			description: "Update tooltip text.",
			addresses: [
				0x000538CB,
				0x000538CB
			],
			assembly:
			`
				.string "train @1n@2ecrolyte"
			`,
			relocations: []
		},
		{
			description: "Update tooltip text.",
			addresses: [
				0x000538DF,
				0x000538DF
			],
			assembly:
			`
				.string "train @1c@2onjurer"
			`,
			relocations: []
		},
		{
			description: "Update tooltip text.",
			addresses: [
				0x000538F2,
				0x000538F2
			],
			assembly:
			`
				.string "train @1g@2runt"
			`,
			relocations: []
		},
		{
			description: "Update tooltip text.",
			addresses: [
				0x00053914,
				0x00053914
			],
			assembly:
			`
				.string "breed faster @1h@2orses"
			`,
			relocations: []
		},
		{
			description: "Update tooltip text.",
			addresses: [
				0x0005392C,
				0x0005392C
			],
			assembly:
			`
				.string "breed faster @1w@2olves"
			`,
			relocations: []
		},
		{
			description: "Update tooltip text.",
			addresses: [
				0x00053944,
				0x00053944
			],
			assembly:
			`
				.string "upgrade sword @1d@2amage\\0\\0"
			`,
			relocations: []
		},
		{
			description: "Update tooltip text.",
			addresses: [
				0x0005395F,
				0x0005395F
			],
			assembly:
			`
				.string "upgrade spear @1d@2amage\\0\\0"
			`,
			relocations: []
		},
		{
			description: "Update tooltip text.",
			addresses: [
				0x0005397A,
				0x0005397A
			],
			assembly:
			`
				.string "upgrade axe @1d@2amage\\0\\0"
			`,
			relocations: []
		},
		{
			description: "Update tooltip text.",
			addresses: [
				0x00053993,
				0x00053993
			],
			assembly:
			`
				.string "upgrade arrow @1d@2amage\\0\\0"
			`,
			relocations: []
		},
		{
			description: "Update tooltip text.",
			addresses: [
				0x000539AE,
				0x000539AE
			],
			assembly:
			`
				.string "upgrade shield @1a@2rmor\\0\\0\\0"
			`,
			relocations: []
		},
		{
			description: "Update tooltip text.",
			addresses: [
				0x000539CA,
				0x000539CA
			],
			assembly:
			`
				.string "upgrade shield @1a@2rmor\\0\\0\\0"
			`,
			relocations: []
		},
		{
			description: "Update tooltip text.",
			addresses: [
				0x00053A57,
				0x00053A57
			],
			assembly:
			`
				.string "research @1r@2aise dead\\0\\0"
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00053FD0,
				0x00053FD0
			],
			assembly:
			`
				.byte 0x2E
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054048,
				0x00054048
			],
			assembly:
			`
				.byte 0x1E
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x000540E8,
				0x000540E8
			],
			assembly:
			`
				.byte 0x26
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054160,
				0x00054160
			],
			assembly:
			`
				.byte 0x26
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x0005428C,
				0x0005428C
			],
			assembly:
			`
				.byte 0x20
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x000542A0,
				0x000542A0
			],
			assembly:
			`
				.byte 0x20
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x000542B4,
				0x000542B4
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x000542C8,
				0x000542C8
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x000542DC,
				0x000542DC
			],
			assembly:
			`
				.byte 0x20
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x000542F0,
				0x000542F0
			],
			assembly:
			`
				.byte 0x20
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054304,
				0x00054304
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054318,
				0x00054318
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x0005432C,
				0x0005432C
			],
			assembly:
			`
				.byte 0x20
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054340,
				0x00054340
			],
			assembly:
			`
				.byte 0x20
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054354,
				0x00054354
			],
			assembly:
			`
				.byte 0x1E
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054368,
				0x00054368
			],
			assembly:
			`
				.byte 0x1E
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x0005437C,
				0x0005437C
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054390,
				0x00054390
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x000543A4,
				0x000543A4
			],
			assembly:
			`
				.byte 0x20
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x000543B8,
				0x000543B8
			],
			assembly:
			`
				.byte 0x20
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x000543CC,
				0x000543CC
			],
			assembly:
			`
				.byte 0x1E
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x000543E0,
				0x000543E0
			],
			assembly:
			`
				.byte 0x1E
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x000543F4,
				0x000543F4
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054408,
				0x00054408
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054458,
				0x00054458
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x0005446C,
				0x0005446C
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054480,
				0x00054480
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x000544D0,
				0x000544D0
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x000544E4,
				0x000544E4
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x000544F8,
				0x000544F8
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x0005450C,
				0x0005450C
			],
			assembly:
			`
				.byte 0x23
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054520,
				0x00054520
			],
			assembly:
			`
				.byte 0x23
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054534,
				0x00054534
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054548,
				0x00054548
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x0005455C,
				0x0005455C
			],
			assembly:
			`
				.byte 0x11
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054570,
				0x00054570
			],
			assembly:
			`
				.byte 0x11
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054584,
				0x00054584
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054598,
				0x00054598
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x000545D4,
				0x000545D4
			],
			assembly:
			`
				.byte 0x2E
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x000545FC,
				0x000545FC
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054610,
				0x00054610
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054624,
				0x00054624
			],
			assembly:
			`
				.byte 0x22
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x0005464C,
				0x0005464C
			],
			assembly:
			`
				.byte 0x2E
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054674,
				0x00054674
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054688,
				0x00054688
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x0005469C,
				0x0005469C
			],
			assembly:
			`
				.byte 0x2E
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x000546EC,
				0x000546EC
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054700,
				0x00054700
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054714,
				0x00054714
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054728,
				0x00054728
			],
			assembly:
			`
				.byte 0x11
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054778,
				0x00054778
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x0005478C,
				0x0005478C
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x000547A0,
				0x000547A0
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x000547B4,
				0x000547B4
			],
			assembly:
			`
				.byte 0x2E
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054804,
				0x00054804
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054818,
				0x00054818
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x0005482C,
				0x0005482C
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054840,
				0x00054840
			],
			assembly:
			`
				.byte 0x31
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x00054890,
				0x00054890
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x000548A4,
				0x000548A4
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x000548B8,
				0x000548B8
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update hotkey.",
			addresses: [
				0x000548CC,
				0x000548CC
			],
			assembly:
			`
				.byte 0x01
			`,
			relocations: []
		},
		{
			description: "Update building name.",
			addresses: [
				0x00054D92,
				0x00054D92
			],
			assembly:
			`
				.string "Altar\\0"
			`,
			relocations: []
		}
	]
};
