module.exports = {
	code: [
		{
			description: "wc_ui_select_target_click_handler(x [eax+4], y [eax+6])",
			addresses: [
				0x0001B48C,
				0x0001B48C
			]
		},
		{
			description: "wc_ui_handle_message_input(scan_code_with_modifiers bx, __writes input_was_handled ax)",
			addresses: [
				0x0001B690,
				0x0001B690
			]
		},
		{
			description: "wc_fow_reveal_7x7(???)",
			addresses: [
				0x0001EBC8,
				0x0001EA98
			]
		},
		{
			description: "wc_archive_copy_bitmap(???)",
			addresses: [
				0x000254C0,
				0x00025390
			]
		},
		{
			description: "wc_ui_get_next_selected_entity(__writes entity* eax)",
			addresses: [
				0x00025D80,
				0x00025C50
			]
		},
		{
			description: "wc_ui_get_first_selected_entity(__writes entity* eax)",
			addresses: [
				0x00025DF4,
				0x00025CC4
			]
		},
		{
			description: "wc_ui_select_entities(entity_pointer_count eax, entity_pointers** edx)",
			addresses: [
				0x000263D0,
				0x000262A0
			]
		},
		{
			description: "wc_ui_draw_directional_sprite(???)",
			addresses: [
				0x0002D834,
				0x0002D704
			]
		},
		{
			description: "wc_ui_draw_game_window_entities(???)",
			addresses: [
				0x0002D9F8,
				0x0002D8C8
			]
		},
		{
			description: "c_sprintf(target_buffer* [esp+0], format_string* [esp+4], ...args [esp+8]:[esp+N])",
			addresses: [
				0x00031D02,
				0x00031BE2
			]
		},
		{
			description: "wc_ui_draw_text(x eax, y edx, string* ebx)",
			addresses: [
				0x00031EDC,
				0x00031DCC
			]
		},
		{
			description: "wc_ui_set_text_colors(color al)",
			addresses: [
				0x00032120,
				0x00032030
			]
		},
		{
			description: "wc_ui_fill_rect(x eax, y edx, w ebx, h ecx)",
			addresses: [
				0x00032780,
				0x000326A0
			]
		},
		{
			description: "wc_archive_read(???)",
			addresses: [
				0x00032810,
				0x00032740
			]
		},
		{
			description: "wc_ui_draw_image(???)",
			addresses: [
				0x00033AF0,
				0x00033B00
			]
		},
		{
			description: "wc_vga_update_dirty_region(???)",
			addresses: [
				0x00034A80,
				0x000349F0
			]
		}
	],
	data: [
		{
			description: "wc_core_base_damage_upgrades_per_player[5*1]",
			addresses: [
				0x00050008,
				0x00050008
			]
		},
		{
			description: "wc_core_damage_upgrades_per_player[5*1]",
			addresses: [
				0x0005000D,
				0x0005000D
			]
		},
		{
			description: "wc_core_armor_upgrades_per_player[5*1]",
			addresses: [
				0x00050035,
				0x00050035
			]
		},
		{
			description: "wc_ui_scroll_offset_tiles[2*2]",
			addresses: [
				0x000500D0,
				0x000500D0
			]
		},
		{
			description: "wc_ui_button_slots[6*12]",
			addresses: [
				0x000514E4,
				0x000514E4
			]
		},
		{
			description: "wc_ui_some_boolean_state[2]",
			addresses: [
				0x0005152C,
				0x0005152C
			]
		},
		{
			description: "wc_core_entity_hitpoints[52*2]",
			addresses: [
				0x00051978,
				0x00051978
			]
		},
		{
			description: "wc_core_entity_size[52*4]",
			addresses: [
				0x00051ABC,
				0x00051ABC
			]
		},
		{
			description: "wc_core_entity_box[52*4]",
			addresses: [
				0x00051B9C,
				0x00051B9C
			]
		},
		{
			description: "wc_core_entity_range[32*1]",
			addresses: [
				0x00051C6C,
				0x00051C6C
			]
		},
		{
			description: "wc_core_entity_armor[52*1]",
			addresses: [
				0x00051C8C,
				0x00051C8C
			]
		},
		{
			description: "wc_core_entity_damage[32*1]",
			addresses: [
				0x00051D5C,
				0x00051D5C
			]
		},
		{
			description: "wc_core_entity_base_damage[32*1]",
			addresses: [
				0x00051D7C,
				0x00051D7C
			]
		},
		{
			description: "wc_ui_health_bar_color_table[3*2]",
			addresses: [
				0x0005357C,
				0x0005357C
			]
		},
		{
			description: "wc_ui_entity_panel_specs[52*8]",
			addresses: [
				0x00054E54,
				0x00054E54
			]
		},
		{
			description: "wc_ui_draw_region_pointer[4]",
			addresses: [
				0x00055438,
				0x00055438
			]
		},
		{
			description: "wc_io_keyboard_character_from_scan_code[256]",
			addresses: [
				0x00055448,
				0x00055448
			]
		},
		{
			description: "wc_ui_gold_string[10+1]",
			addresses: [
				0x00057F50,
				0x00057E0C
			]
		},
		{
			description: "wc_core_map_tile_flags_pointer[4]",
			addresses: [
				0x000586BC,
				0x0005857C
			]
		},
		{
			description: "wc_food_used_sub[2]",
			addresses: [
				0x00058F0E,
				0x00058DCE
			]
		},
		{
			description: "wc_food_grown[2]",
			addresses: [
				0x00058F22,
				0x00058DE2
			]
		},
		{
			description: "wc_food_used_add[2]",
			addresses: [
				0x00058F68,
				0x00058E28
			]
		},
		{
			description: "wc_core_entity_pointers[201*4]",
			addresses: [
				0x0005A5D0,
				0x0005A490
			]
		},
		{
			description: "wc_ui_entity_at_cursor_pointer[4]",
			addresses: [
				0x0005A8FC,
				0x0005A7BC
			]
		},
		{
			description: "wc_ui_selected_action_type[2]",
			addresses: [
				0x0005A904,
				0x0005A7C4
			]
		},
		{
			description: "wc_vga_framebuffer_bitmap[8]",
			addresses: [
				0x0005A9B0,
				0x0005A870
			]
		},
		{
			description: "wc_io_mouse_coordinates[2*2]",
			addresses: [
				0x0005A9F0,
				0x0005A8B0
			]
		},
		{
			description: "wc_io_keyboard_pressing_tab[2]",
			addresses: [
				0x0005AA32,
				0x0005A8F2
			]
		},
		{
			description: "wc_ui_fill_color[1]",
			addresses: [
				0x0005AE70,
				0x0005AD30
			]
		}
	]
};
