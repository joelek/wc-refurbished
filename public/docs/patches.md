# Patch

## Code Segment

Delta: +0x2E00

### WarCraft

```
	0x00010010: call wc_ui_draw_game_window_background(???) [file offset 0x12E10]

	0x00016920: (wc_load_main_menu_bg_bottom) [file offset 0x19720]

			call 0x00042C00						# call wc_refurbished_inject_main_menu_graphic instead of c_memcpy

	0x0001A00E: (wc_io_keyboard_input_handler) [file offset 0x1CE0E]

			call 0x00042800						# call wc_refurbished_keyboard_input_handler instead of wc_ui_handle_message_input

	0x0001B057: (wc_ui_draw_game_window) [file offset 0x1DE57]

			call 0x00042240						# call wc_refurbished_draw_health_bars instead of wc_ui_draw_game_window_entities

	0x0001B11C: wc_ui_center_game_window_on_coordinates(???) [file offset 0x1DF1C]

	0x0001B48C: wc_ui_select_target_click_handler(x [eax+4], y [eax+6]) [file offset 0x1E28C]

	0x0001B5C5: (wc_io_mouse_handler_default_game_window_right) [file offset 0x1E3C5]

			call 0x00042560						# call wc_refurbished_dispatch_contextual_command instead of wc_ui_center_game_window_on_coordinates

	0x0001B5D0: wc_ui_center_game_window_on_entity(entity* eax) [file offset 0x1E3D0]

	0x0001B690: call wc_ui_handle_message_input(scan_code_with_modifiers bx, __writes input_was_handled ax) [file offset 0x1E490]

	0x000254C0: wc_archive_copy_bitmap() [file offset 0x282C0]

	0x00025D80: wc_ui_get_next_selected_entity(__writes entity* eax) [file offset 0x28B80]

	0x00025DF4: wc_ui_get_first_selected_entity(__writes entity* eax) [file offset 0x28BF4]

	0x000263D0: wc_selection_update(entity_pointer_count eax, entity_pointers** edx) [file offset 0x291D0]

	0x000286A3: (wc_ui_draw_action_button) [file offset 0x2B4A3]

			call 0x000421A0						# call wc_refurbished_draw_action_button_hotkey instead of wc_ui_draw_image

	0x0002B6C2: (wc_ui_load_resources) [file offset 0x2E4C2]

			call 0x00042D00						# call wc_refurbished_inject_top_frame_graphic instead of wc_archive_copy_bitmap

	0x0002B9F7: (wc_ui_render_resource_bar) [file offset 0x2E7F7]

			call 0x00042F00						# call wc_refurbished_render_farm_info instead of wc_io_mouse_update_drag_rect

	0x0002D9F8: wc_ui_draw_game_window_entities(???) [file offset 0x307F8]

	0x0002DD2E: (wc_ui_draw_game_window_entities) [file offset 0x30B2E]

		call 0x00042A00							# call wc_refurbished_draw_entity_info instead of wc_ui_draw_particle_or_burning_building

	0x000318B9: c_memcpy(target* eax, source* edx, size ebx) [file offset 0x346B9]

	0x00031D02: c_sprintf(target_buffer* [esp+0], format_string* [esp+4], ...args [esp+8]:[esp+N]) [file offset 0x34B02]

	0x00031EDC: wc_ui_draw_text(x eax, y edx, string* ebx) [file offset 0x34CDC]

	0x00032120: wc_ui_set_text_colors(color al) [file offset 0x34F20]

	0x000324D4: (wc_core_load_bitmap) [file offset 0x352C0]

			call 0x00042C00						# call wc_refurbished_load_bitmap instead of wc_archive_read

	0x00032780: wc_ui_fill_rect(x eax, y edx, w ebx, h ecx) [file offset 0x35580]

	0x000331A0: wc_ui_load_image(resource_pointer* eax, frame_index edx, frame_pointer* ebx) [file offset 0x35FA0]

	0x00033AF0: wc_ui_draw_image(x eax, y edx, frame_pointer* ebx) [file offset 0x368F0]
```

### WarCraft: Refurbished

```
	0x000421A0: wc_refurbished_draw_action_button_hotkey(wc_action_button* ecx, button_press_state esi) [file offset 0x44FA0]

			call 0x00033AF0						# call wc_ui_draw_image

			push eax
			push ebx
			push ecx
			push edx

			sub esp, 12							# borrow stack space

			# [esp+0]: relocated data segment offset
			# [esp+4]: hotkey characters
			# [esp+8]: button press state

			mov dword ptr [esp+8], esi			# save button press state

			mov eax, dword ptr [esp+28]			# get return address from stack (relocated value for 0x0002B4A8)
			add eax, 13							# adjust offset to known relocated value from data segment
			mov eax, dword ptr [eax]			# load value
			sub eax, 0x00055438					# adjust by expected value
			mov dword ptr [esp+0], eax			# save relocated data segment offset

			mov bl, byte ptr [ecx+0x0C]			# load scan code for hotkey
			cmp bl, 1							# compare to scan code for escape
			je .label_esc						# jump

		.label_nonesc:

			mov eax, dword ptr [esp+0]			# load relocated data segment offset
			add eax, 0x00055448					# adjust with offset for wc_io_keyboard_character_from_scan_code
			mov al, byte ptr [eax+bl]			# translate scan code
			mov byte ptr [esp+4], al			# write character to buffer
			mov byte ptr [esp+5], 0				# write null terminator to buffer
			jmp .label_draw						# jump

		.label_esc:

			mov byte ptr [esp+4], 'E'			# write character to buffer
			mov byte ptr [esp+5], 'S'			# write character to buffer
			mov byte ptr [esp+6], 'C'			# write character to buffer
			mov byte ptr [esp+7], 0				# write null terminator to buffer

		.label_draw:

			mov eax, 243						# white color
			call 0x00032120						# call wc_ui_set_text_colors

			mov ebx, dword ptr [esp+0]			# load relocated data segment offset
			add ebx, 0x000514E4					# adjust with offset for wc_ui_button_slots
			xor eax, eax						# zero
			mov ax, word ptr [ecx+0x00]			# load slot number for button
			mov edx, eax						# make copy of slot number
			shl edx, 4							# edx is 16 * slot number
			shl eax, 2							# ebx is 4 * slot number
			sub edx, eax						# edx is 12 * slot number
			add ebx, edx						# ebx is now offset of button slot

			xor eax, eax						# zero
			mov ax, word ptr [ebx+0x00]			# load min_x from button slot
			add eax, 3							# add text x offset
			xor edx, edx						# zero
			mov dl, byte ptr [esp+8]			# adjust by button press
			add dx, word ptr [ebx+0x02]			# load min_y from button slot
			add edx, 3							# add text y offset
			sub edx, 72							# adjust to action panel
			lea ebx, dword ptr [esp+4]			# set string argument
			call 0x00031EDC						# call wc_ui_draw_text

			add esp, 12							# return stack space

			pop edx
			pop ecx
			pop ebx
			pop eax

			ret

	0x00042240 wc_refurbished_draw_health_bars() [file offset 0x45040]

			call 0x0002D9F8						# call wc_ui_draw_game_window_entities

			push eax
			push ebx
			push ecx
			push edx
			push esi
			push edi

			sub esp, 244						# borrow stack space

			# [esp+0]: relocated data segment offset
			# [esp+8]: string buffer
			# [esp+20]: scroll offset x
			# [esp+24]: scroll offset y

			mov eax, dword ptr [esp+268]		# get return address from stack (relocated value for 0x0001B05C)
			sub eax, 14							# adjust offset to known relocated value from data segment
			mov eax, dword ptr [eax]			# load value
			sub eax, 0x0005A9B0					# adjust by expected value
			mov dword ptr [esp+0], eax			# save relocated data segment offset

			lea eax, [0x000500D0]				# load offset for wc_ui_scroll_offset_tiles
			add eax, dword ptr [esp+0]			# adjust by relocated data segment offset
			xor ebx, ebx						# clear
			mov bx, word ptr [eax+0]			# load scroll offset x
			shl ebx, 4							# multiply by 16
			mov dword ptr [esp+20], ebx			# save scoll offset x
			xor ebx, ebx						# clear
			mov bx, word ptr [eax+2]			# load scroll offset y
			shl ebx, 4							# multiply by 16
			mov dword ptr [esp+24], ebx			# save scoll offset y

		.label_prepare_loop:

			lea edi, [0x0005A5D0]				# load offset for wc_core_pointer_to_all_entities
			add edi, dword ptr [esp+0]			# adjust by relocated data segment offset
			cmp dword ptr [edi], 0				# check for null
			je .label_end						# jump if null

		.label_for_each_entity:

			mov esi, dword ptr [edi]			# esi is now offset of current entity

		.label_load_entity_values:

			xor eax, eax						# clear
			mov al, byte ptr [esi+0x10]			# load entity flags

			test eax, 2							# check if dead
			jnz .label_next						# jump
			test eax, 20						# check if razed
			jnz .label_next						# jump

			xor eax, eax						# clear
			mov al, byte ptr [esi+0x1B]			# load entity id

			xor ebx, ebx						# clear
			mov bx, word ptr [esi+0x16]			# load entity health
			mov dword ptr [esp+100], ebx		# save entity health
			cmp ebx, 0							# compare entity health to 0
			jle .label_next						# jump if lower than or equal
			lea ecx, [0x00051978+2*eax]			# load offset for entity max health
			add ecx, dword ptr [esp+0]			# adjust by relocated data segment offset
			xor edx, edx						# clear
			mov dx, word ptr [ecx]				# load entity max health
			mov dword ptr [esp+104], edx		# save entity max health
			cmp ebx, edx						# compare entity health to entity max health
			jge .label_next						# jump if greater than or equal

			lea ecx, [0x00051B9C+4*eax]			# load offset for entity box
			add ecx, dword ptr [esp+0]			# adjust by relocated data segment offset
			xor edx, edx						# clear
			mov dx, word ptr [ecx+0]			# load entity box w
			mov dword ptr [esp+108], edx		# save entity box w
			xor edx, edx						# clear
			mov dx, word ptr [ecx+2]			# load entity box h
			mov dword ptr [esp+112], edx		# save entity box h

			lea ecx, [0x00051ABC+4*eax]			# load offset for entity size
			add ecx, dword ptr [esp+0]			# adjust by relocated data segment offset
			xor edx, edx						# clear
			mov dx, word ptr [ecx+0]			# load entity size w
			shl edx, 4							# multiply by 16
			mov dword ptr [esp+116], edx		# save entity size w
			neg edx								# negate normal box w
			add edx, dword ptr [esp+108]		# add entity box w
			sar edx, 1							# divide by two
			inc edx								# increase by one to get correct delta
			mov dword ptr [esp+120], edx		# save entity grid delta x
			xor edx, edx						# clear
			mov dx, word ptr [ecx+2]			# load entity size h
			shl edx, 4							# multiply by 16
			mov dword ptr [esp+124], edx		# save entity size h
			neg edx								# negate normal box h
			add edx, dword ptr [esp+112]		# add entity box h
			sar edx, 1							# divide by two
			inc edx								# increase by one to get correct delta
			mov dword ptr [esp+128], edx		# save entity grid delta y

			xor ecx, ecx						# clear
			mov cx, word ptr [esi+0x00]			# load entity map position x
			sub ecx, dword ptr [esp+120]		# subtract entity grid delta x
			sub ecx, dword ptr [esp+20]			# subtract scroll offset x
			cmp ecx, 240						# compare entity min x to 240
			jge .label_next						# jump if greater than or equal
			mov dword ptr [esp+132], ecx		# save entity min x
			add ecx, dword ptr [esp+108]		# add entity box w
			cmp	ecx, 0							# compare entity max x to 0
			jl .label_next						# jump if lower
			mov dword ptr [esp+136], ecx		# save entity max x

			xor ecx, ecx						# clear
			mov cx, word ptr [esi+0x02]			# load entity map position y
			sub ecx, dword ptr [esp+128]		# subtract entity grid delta y
			sub ecx, dword ptr [esp+24]			# subtract scroll offset y
			cmp ecx, 176						# compare entity min y to 176
			jge .label_next						# jump if greater than or equal
			mov dword ptr [esp+140], ecx		# save entity min y
			add ecx, dword ptr [esp+112]		# add entity box h
			cmp	ecx, 0							# compare entity max y to 0
			jl .label_next						# jump if lower
			mov dword ptr [esp+144], ecx		# save entity max y

		.label_compute_health_bar_rect:

			mov ecx, dword ptr [esp+108]		# load entity box w
			sub ecx, 2							# decrease by two to get max health bar width
			mov eax, dword ptr [esp+100]		# load entity health
			mul ecx								# multiply entity health with max health bar width
			xor edx, edx						# clear for division
			div dword ptr [esp+104]				# divide by entity max health
			inc eax								# adjust rounding

			mov ebx, dword ptr [esp+132]		# load entity min x
			inc ebx								# adjust for padding
			mov ecx, ebx						# copy health bar min x
			mov edx, 0							# set min value
			cmp ebx, edx						# compare health bar min x to min value
			jge .label_0						# jump if greater or equal
			mov ebx, edx						# set health bar min x to min value
			.label_0:
			mov dword ptr [esp+148], ebx		# save health bar x
			add ecx, eax						# add health bar width
			cmp ecx, edx						# compare health bar max x to min value
			jge .label_1						# jump if greater or equal
			mov ecx, edx						# set health bar max x to min value
			.label_1:
			mov edx, 240						# set max value
			cmp ecx, edx						# compare health bar max x to max value
			jle .label_2						# jump if lower or equal
			mov ecx, edx						# set health bar max x to max value
			.label_2:
			sub ecx, ebx						# compute health bar w
			mov dword ptr [esp+152], ecx		# save health bar w

			mov ebx, dword ptr [esp+144]		# load entity max y
			sub ebx, 2							# adjust for health bar height
			mov ecx, ebx						# copy health bar min y
			mov edx, 0							# set min value
			cmp ebx, edx						# compare health bar min y to min value
			jge .label_3						# jump if greater or equal
			mov ebx, edx						# set health bar min y to min value
			.label_3:
			mov edx, 176						# set max value
			cmp ebx, edx
			jle .label_33
			mov ebx, edx
			.label_33:
			mov dword ptr [esp+156], ebx		# save health bar min y

			add ecx, 2							# add health bar height
			mov edx, 0							# set min value
			cmp ecx, edx						# compare health bar max y to min value
			jge .label_4						# jump if greater or equal
			mov ecx, edx						# set health bar max y to min value
			.label_4:
			mov edx, 176						# set max value
			cmp ecx, edx						# compare health bar max y to max value
			jle .label_5						# jump if lower or equal
			mov ecx, edx						# set health bar max y to max value
			.label_5:
			sub ecx, ebx						# compute health bar h
			mov dword ptr [esp+160], ecx		# save health bar h

		.label_get_color:

			mov ecx, 100						# load max percentage
			mov eax, dword ptr [esp+100]		# load entity health
			mul ecx								# multiply entity health with max percentage
			xor edx, edx						# clear for division
			div dword ptr [esp+104]				# divide by entity max health

			lea ebx, [0x0005357C]				# load offset for wc_ui_health_bar_color_table
			add ebx, dword ptr [esp+0]			# adjust by relocated data segment offset

		.label_next_color:

			xor ecx, ecx						# clear
			mov cl, byte ptr [ebx+0]			# load percentage limit
			xor edx, edx						# clear
			mov dl, byte ptr [ebx+1]			# load color
			cmp eax, ecx						# compare health percentage to percentage limit
			jge .label_set_color				# jump if greater than or equal
			add ebx, 2							# next color
			jmp .label_next_color				# jump

		.label_set_color:

			lea eax, [0x0005AE70]				# load offset for wc_ui_fill_color
			add eax, dword ptr [esp+0]			# adjust by relocated data segment offset
			mov byte ptr [eax], dl				# set color

		.label_draw_health_bar:

			mov eax, dword ptr [esp+148]		# load health bar x
			add eax, 72							# adjust to game window
			mov edx, dword ptr [esp+156]		# load health bar y
			add edx, 12							# adjust to game window
			mov ebx, dword ptr [esp+152]		# load health bar w
			mov ecx, dword ptr [esp+160]		# load health bar h
			call 0x00032780						# call wc_ui_fill_rect

		.label_next:

			add edi, 4							# go to next pointer
			cmp dword ptr [edi], 0				# check for null
			jne .label_for_each_entity			# jump if not null

		.label_end:

			add esp, 244						# return stack space

			pop edi
			pop esi
			pop edx
			pop ecx
			pop ebx
			pop eax

			ret

	0x00042560: wc_refurbished_dispatch_contextual_command(map_tile_x eax, map_tile_y edx) [file offset 0x45360]

			pushad								# save 8 registers on stack
			sub esp, 64							# borrow stack space

		.label_initialize:

			mov ebx, dword ptr [esp+32+64]		# get return address from stack
			sub ebx, 13							# adjust address to address containing relocated offset in data segment
			mov ebx, dword ptr [ebx]			# load relocated offset
			sub ebx, 0x000500D2					# adjust relocated offset by unrelocated value to get relocated_data_segment_offset

			mov dword ptr [esp+0], ebx			# save relocated_data_segment_offset
			mov dword ptr [esp+4], eax			# save map_tile_x
			mov dword ptr [esp+8], edx			# save map_tile_y
			mov dword ptr [esp+20], 0			# initialize number_of_selected_entities
			mov dword ptr [esp+24], -1			# initialize common_entity_type
			mov dword ptr [esp+28], 1			# initialize entities_are_units
			mov dword ptr [esp+32], 1			# initialize entities_are_human_controlled
			mov dword ptr [esp+44], 0			# initialize number_of_entities_carrying_goods

		.label_get_terrain_flags:

			mov eax, 0x000586BC					# load offset for wc_core_map_tile_flags**
			add eax, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
			mov eax, dword ptr [eax]			# get wc_core_map_tile_flags*
			mov ecx, dword ptr [esp+8]			# load map_tile_y
			shl ecx, 6							# multiply by 64 (map tile width)
			mov ebx, dword ptr [esp+4]			# load map_tile_x
			add ecx, ebx						# add map_tile_x to get map_tile_index
			xor edx, edx						# clear
			mov dx, word ptr [eax+ecx*2]		# read wc_core_map_tile_flags[map_tile_index]
			mov dword ptr [esp+12], edx			# save tile_flags

		.label_get_entity_below_cursor:

			mov eax, 0x0005A8FC					# load offset for wc_ui_entity_below_cursor*
			add eax, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
			mov dword ptr [esp+16], eax			# save entity_below_cursor*

		.label_prepare_loop:

			call 0x00025DF4						# call wc_ui_get_first_selected_entity
			cmp eax, 0							# check if entity* is null
			je .label_end						# skip loop if nothing is selected

		.label_loop:

			xor ebx, ebx						# clear
			mov bl, byte ptr [eax+0x1B]			# load entity.type
			xor ecx, ecx						# clear
			mov cl, byte ptr [eax+0x1E]			# load entity.player
			xor edx, edx						# clear
			mov dl, byte ptr [eax+0x49]			# load entity.carry_flags

			.label_loop_0:

			cmp dword ptr [esp+20], 0			# compare number_of_selected_entities to 0
			jg .label_loop_1					# jump if greater
			mov dword ptr [esp+24], ebx			# save common_entity_type
			jmp .label_loop_2					# jump

			.label_loop_1:

			cmp ebx, dword ptr [esp+24]			# compare entity.type to common_entity_type
			je .label_loop_2					# jump if equal
			mov dword ptr [esp+24], -1			# clear common_entity_type

			.label_loop_2:

			cmp ebx, 31							# compare entity.type to 31 (last unit type)
			jle .label_loop_3					# jump if lower or equal
			mov dword ptr [esp+28], 0			# clear entities_are_units

			.label_loop_3:

			cmp ecx, 0							# compare entity.player to 0 (human-controlled player)
			je .label_loop_4					# jump if equal
			mov dword ptr [esp+32], 0			# clear entities_are_human_controlled

			.label_loop_4:

			test edx, 0x20						# check if entity.carry_flags has bit 5 (carrying goods) set
			jz .label_loop_5					# jump if zero
			inc dword ptr [esp+44]				# increase number_of_entities_carrying_goods

			.label_loop_5:

			inc dword ptr [esp+20]				# increase number_of_selected_entities
			call 0x00025D80						# call wc_ui_get_next_selected_entity
			cmp eax, 0							# check if entity is null
			jne .label_loop						# continue if entity is not null

		.label_check_conditions:

			cmp dword ptr [esp+28], 1			# check if all selected entities are units
			jne .label_end						# jump if false
			cmp dword ptr [esp+32], 1			# check if all selected entities are human controlled
			jne .label_end						# jump if false

		.label_entity_worker:

			cmp dword ptr [esp+24], 2			# compare common_entity_type to 2 (human peasant)
			jl .label_entity_worker_end			# jump if lower
			cmp dword ptr [esp+24], 3			# compare common_entity_type to 3 (orc peon)
			jg .label_entity_worker_end			# jump if greater

			.label_entity_worker_0:

			cmp dword ptr [esp+44], 0			# compare number_of_entities_carrying_goods to 0
			jne .label_entity_worker_1			# jump if not equal
			cmp dword ptr [esp+12], 0x80		# compare tile_flags to 0x80 (forest)
			jne .label_entity_worker_1			# jump if not equal
			mov ebx, 0x0A						# set action to harvest
			jmp .dispatch_action				# jump to dispatch action

			.label_entity_worker_1:

			cmp dword ptr [esp+44], 0			# compare number_of_entities_carrying_goods to 0
			jne .label_entity_worker_2			# jump if not equal
			mov eax, dword ptr [esp+16]			# load entity_below_cursor*
			mov eax, dword ptr [eax]			# dereference pointer
			cmp eax, 0							# check if null
			je .label_entity_worker_2			# jump if null
			cmp byte ptr [eax+0x1E], 4			# check if entity_below_cursor.player is player 4 (neutral)
			jne .label_entity_worker_2			# jump if not equal
			cmp byte ptr [eax+0x1B], 50			# check if entity_below_cursor.type is 50 (gold mine)
			jne .label_entity_worker_2			# jump if not equal
			mov ebx, 0x0A						# set action to harvest
			jmp .dispatch_action				# jump to dispatch action

			.label_entity_worker_2:

			mov eax, dword ptr [esp+44]			# load number_of_entities_carrying_goods
			cmp eax, dword ptr [esp+20]			# compare number_of_entities_carrying_goods to number_of_selected_entities
			jne .label_entity_worker_3			# jump if not equal
			mov eax, dword ptr [esp+16]			# load entity_below_cursor*
			mov eax, dword ptr [eax]			# dereference pointer
			cmp eax, 0							# check if null
			je .label_entity_worker_3			# jump if null
			cmp byte ptr [eax+0x1E], 0			# check if entity_below_cursor.player is player 0
			jne .label_entity_worker_3			# jump if not equal
			cmp byte ptr [eax+0x1B], 40			# check if entity_below_cursor.type is 40 (human town hall)
			jl .label_entity_worker_3			# jump if lower
			cmp byte ptr [eax+0x1B], 41			# check if entity_below_cursor.type is 41 (orc town hall)
			jg .label_entity_worker_3			# jump if greater
			mov ebx, 0x0B						# set action to return goods
			jmp .dispatch_action				# jump to dispatch action

			.label_entity_worker_3:

			mov eax, dword ptr [esp+16]			# load entity_below_cursor*
			mov eax, dword ptr [eax]			# dereference pointer
			cmp eax, 0							# check if null
			je .label_entity_worker_4			# jump if null
			cmp byte ptr [eax+0x1E], 0			# check if entity_below_cursor.player is player 0
			jne .label_entity_worker_4			# jump if not equal
			cmp byte ptr [eax+0x1B], 32			# check if entity_below_cursor.type is 32 (first building)
			jl .label_entity_worker_4			# jump if lower
			cmp byte ptr [eax+0x1B], 49			# check if entity_below_cursor.type is 49 (last building)
			jg .label_entity_worker_4			# jump if greater
			mov ebx, 0x0E						# set action to repair
			jmp .dispatch_action				# jump to dispatch action

			.label_entity_worker_4:

			mov eax, dword ptr [esp+16]			# load entity_below_cursor*
			mov eax, dword ptr [eax]			# dereference pointer
			cmp eax, 0							# check if null
			je .label_entity_worker_5			# jump if null
			cmp byte ptr [eax+0x1E], 0			# check if entity_below_cursor.player is player 0
			je .label_entity_worker_5			# jump if equal
			cmp byte ptr [eax+0x1E], 4			# check if entity_below_cursor.player is player 4 (neutral)
			je .label_entity_worker_5			# jump if equal
			mov ebx, 0x04						# set action to attack
			jmp .dispatch_action				# jump to dispatch action

			.label_entity_worker_5:

			mov ebx, 0x03						# set action to move
			jmp .dispatch_action				# jump to dispatch action

			.label_entity_worker_end:

		.label_entity_cleric:

			cmp dword ptr [esp+24], 12			# compare common_entity_type to 12 (human cleric)
			jne .label_entity_cleric_end		# jump if not equal
			cmp dword ptr [esp+20], 1			# compare number of selected entities to 1
			jne .label_entity_cleric_end		# jump if not equal

			.label_entity_cleric_0:

			mov eax, dword ptr [esp+16]			# load entity_below_cursor*
			mov eax, dword ptr [eax]			# dereference pointer
			cmp eax, 0							# check if null
			je .label_entity_cleric_1			# jump if null
			cmp byte ptr [eax+0x1E], 0			# check if entity_below_cursor.player is player 0
			jne .label_entity_cleric_1			# jump if not equal
			cmp byte ptr [eax+0x1B], 31			# check if entity_below_cursor.type is 31 (last unit)
			jg .label_entity_cleric_1			# jump if greater
			mov ebx, 0x11						# set action to cast heal spell
			jmp .dispatch_action				# jump to dispatch action

			.label_entity_cleric_1:

			.label_entity_cleric_end:

		.label_entity_mixed:

			mov eax, dword ptr [esp+16]			# load entity_below_cursor*
			mov eax, dword ptr [eax]			# dereference pointer
			cmp eax, 0							# check if null
			je .label_entity_mixed_1			# jump if null
			cmp byte ptr [eax+0x1E], 0			# check if entity_below_cursor.player is player 0
			je .label_entity_mixed_1			# jump if equal
			cmp byte ptr [eax+0x1E], 4			# check if entity_below_cursor.player is player 4 (neutral)
			je .label_entity_mixed_1			# jump if equal
			mov ebx, 0x04						# set action to attack
			jmp .dispatch_action				# jump to dispatch action

			.label_entity_mixed_1:

			mov ebx, 0x03						# set action to move
			jmp .dispatch_action				# jump to dispatch action

			.label_entity_mixed_end:

		.label_entity_end:

			jmp .label_end						# skip dispatch action

		.dispatch_action:

			mov eax, 0x0005A904					# load offset for wc_core_action_type
			add eax, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
			mov word ptr [eax], bx				# set wc_core_action_type
			mov eax, 0x0005A9F0					# load offset for wc_io_mouse_coordinates
			add eax, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
			mov bx, word ptr [eax+0x00]			# load coordinate x
			mov word ptr [esp+36+4], bx			# write coordinate x to mouse event buffer
			mov bx, word ptr [eax+0x02]			# load coordinate y
			mov word ptr [esp+36+6], bx			# write coordinate y to mouse event buffer
			lea eax, [esp+36]					# set pointer to mouse event buffer
			call 0x0001B48C						# call wc_ui_select_target_click_handler

		.label_end:

			add esp, 64							# return stack space
			popad								# restore registers
			ret									# return

	0x00042800: wc_refurbished_keyboard_input_handler(scan_code_with_modifiers bx, __writes input_was_handled ax) [file offset 0x45600]

			call 0x0001B690						# call wc_ui_handle_message_input
			test ax, ax							# check if handled
			jz .label_begin						# jump if zero
			ret

		.label_begin:

			push ebx							# save register on stack
			push ecx							# save register on stack
			push edx							# save register on stack
			sub esp, 64							# borrow stack space

		.label_initialize:

			mov eax, dword ptr [esp+64+4+4+4]	# get return address from stack
			sub eax, 24							# adjust address to address containing relocated offset in data segment
			mov eax, dword ptr [eax]			# load relocated offset
			sub eax, 0x0005152C					# adjust relocated offset by unrelocated value to get relocated_data_segment_offset
			mov dword ptr [esp+0], eax			# save relocated_data_segment_offset

			xor eax, eax						# clear
			mov ax, bx							# copy scan_code_with_modifiers
			mov dword ptr [esp+4], eax			# save scan_code_with_modifiers

			mov dword ptr [esp+8], 0			# clear input_was_handled

		.label_grouping:

			xor edx, edx						# clear
			mov dl, bl							# copy scan_code
			mov ebx, dword ptr [esp+4]			# load scan_code_with_modifiers
			cmp bl, 2							# compare scan_code to 2 (key 1)
			jl .label_grouping_end				# jump if lower
			cmp bl, 11							# compare scan_code to 11 (key 0)
			jg .label_grouping_end				# jump if greater
			mov dword ptr [esp+8], 1			# set input_was_handled
			test bh, 0x0C						# test if bits 2 or 3 are set (left and right control)
			jnz .label_grouping_set				# jump if pressing control

			.label_grouping_get:

				xor ecx, ecx					# clear entity_pointer_count
				mov ebx, 0x0005A5D0				# load offset for wc_core_pointer_to_all_entities
				add ebx, dword ptr [esp+0]		# adjust by relocated data segment offset

				.label_grouping_get_0:

				mov eax, dword ptr [ebx]		# dereference pointer
				cmp eax, 0						# check for null
				je .label_grouping_get_3		# jump if equal

				.label_grouping_get_1:

				test word ptr [eax+0x0E], 0x0100	# check if bit 8 (entity inside building) is set
				jnz .label_grouping_get_2		# jump if non-zero
				test word ptr [eax+0x10], 0x0002	# check if bit 1 (entity killed) is set
				jnz .label_grouping_get_2		# jump if non-zero
				cmp byte ptr [eax+0x1B], 50		# compare entity.type to 50 (last building type)
				jg .label_grouping_get_2		# jump if greater
				cmp byte ptr [eax+0x13], dl		# compare entity.??? to scan_code
				jne .label_grouping_get_2		# jump if not equal
				mov dword ptr [esp+12+ecx*4], eax	# write pointer
				inc ecx							# increase entity_pointer_count

				.label_grouping_get_2:

				add ebx, 4						# go to next pointer
				jmp .label_grouping_get_0		# jump

				.label_grouping_get_3:

				mov eax, ecx					# set entity_pointer_count argument
				lea edx, dword ptr [esp+12]		# set entity_pointers argument
				call 0x000263D0					# call wc_selection_update(entity_pointer_count eax, entity_pointers** edx)
				jmp .label_grouping_end			# jump

			.label_grouping_set:

				mov ebx, 0x0005A5D0				# load offset for wc_core_pointer_to_all_entities
				add ebx, dword ptr [esp+0]		# adjust by relocated data segment offset

				.label_grouping_set_0:

				mov eax, dword ptr [ebx]		# dereference pointer
				cmp eax, 0						# check for null
				je .label_grouping_set_3		# jump if null

				.label_grouping_set_1:

				cmp byte ptr [eax+0x1B], 50		# compare entity.type to 50 (last building type)
				jg .label_grouping_set_2		# jump if greater
				cmp byte ptr [eax+0x13], dl		# compare entity.??? to scan_code
				jne .label_grouping_set_2		# jump if not equal
				mov byte ptr [eax+0x13], 0		# clear entity.???

				.label_grouping_set_2:

				add ebx, 4						# go to next pointer
				jmp .label_grouping_set_0		# jump

				.label_grouping_set_3:

				call 0x00025DF4					# call wc_ui_get_first_selected_entity

				.label_grouping_set_4:

				cmp eax, 0						# check if entity* is null
				je .label_grouping_end			# jump if equal

				cmp byte ptr [eax+0x1B], 50		# compare entity.type to 50 (last building type)
				jg .label_grouping_set_5		# jump if greater
				mov byte ptr [eax+0x13], dl		# overwrite entity.??? with scan_code

				.label_grouping_set_5:

				call 0x00025D80					# call wc_ui_get_next_selected_entity
				jmp .label_grouping_set_4		# jump

		.label_grouping_end:

		.label_end:

			mov eax, dword ptr [esp+8]			# set input_was_handled
			add esp, 64							# return stack space
			pop edx								# restore register
			pop ecx								# restore register
			pop ebx								# restore register
			ret									# return

	0x00042A00: wc_refurbished_draw_entity_info() [file offset 0x45800]

			call 0x0002D834						# call wc_ui_draw_particle_or_burning_building
			cmp esi, 0							# check if final particle
			je .label_begin						# jump if equal
			ret									# return

		.label_begin:

			pushad								# save registers on stack
			sub esp, 64							# borrow stack space

		.label_initialize:

			mov eax, dword ptr [esp+64+32]		# get return address from stack
			add eax, 11							# adjust address to address containing relocated offset in data segment
			mov eax, dword ptr [eax]			# load relocated offset
			sub eax, 0x0005A5D0					# adjust relocated offset by unrelocated value to get relocated_data_segment_offset
			mov dword ptr [esp+0], eax			# save relocated_data_segment_offset

			mov eax, 0x000500D0					# load offset for wc_ui_scroll_offset_tiles
			add eax, dword ptr [esp+0]			# adjust by relocated data segment offset
			xor ebx, ebx						# clear
			mov bx, word ptr [eax+0]			# load scroll offset x
			shl ebx, 4							# multiply by 16
			mov dword ptr [esp+4], ebx			# save scoll offset x
			xor ebx, ebx						# clear
			mov bx, word ptr [eax+2]			# load scroll offset y
			shl ebx, 4							# multiply by 16
			mov dword ptr [esp+8], ebx			# save scoll offset y

		.label_loop:

			mov edi, 0x0005A5D0					# load offset for wc_core_pointer_to_all_entities
			add edi, dword ptr [esp+0]			# adjust by relocated data segment offset

			.label_loop_0:

			mov esi, dword ptr [edi]			# dereference pointer
			cmp esi, 0							# check for null
			je .label_loop_break				# jump if null
			test word ptr [esi+0x0E], 0x0100	# check if bit 8 (entity inside building) is set
			jnz .label_loop_continue			# jump if non-zero
			test word ptr [esi+0x10], 0x0002	# check if bit 1 (entity killed) is set
			jnz .label_loop_continue			# jump if non-zero

			.label_loop_1:

			xor eax, eax						# clear
			mov al, byte ptr [esi+0x1B]			# load entity.type
			mov ebp, eax						# copy entity.type to ebp

			.label_loop_2:

			push ebp							# save ebp
			lea ebp, [0x00051B9C+4*ebp]			# load offset for entity box
			add ebp, dword ptr [esp+4+0]		# adjust by relocated data segment offset
			xor ebx, ebx						# clear
			mov bx, word ptr [ebp+0]			# load entity box w
			xor edx, edx						# clear
			mov dx, word ptr [ebp+2]			# load entity box h
			pop ebp								# restore ebp

			.label_loop_3:

			push ebp							# save ebp
			lea ebp, [0x00051ABC+4*ebp]			# load offset for entity size
			add ebp, dword ptr [esp+4+0]		# adjust by relocated data segment offset
			xor eax, eax						# clear
			mov ax, word ptr [ebp+0]			# load entity size w
			xor ecx, ecx						# clear
			mov cx, word ptr [ebp+2]			# load entity size h
			pop ebp								# restore ebp

			.label_loop_4:

			shl eax, 4							# multiply entity size w by 16
			neg eax								# negate grid aligned box w
			add eax, ebx						# add entity box w
			sar eax, 1							# divide by two
			inc eax								# increase by one to get correct delta x
			shl ecx, 4							# multiply entity size h by 16
			neg ecx								# negate grid aligned box h
			add ecx, edx						# add entity box h
			sar ecx, 1							# divide by two
			inc ecx								# increase by one to get correct delta y

			.label_loop_5:

			neg eax								# negate delta x
			add ax, word ptr [esi+0x00]			# add entity.x to get entity min x
			and eax, 0xFFFF						# clear upper 16 bits
			sub eax, dword ptr [esp+4]			# subtract scroll offset x
			add ebx, eax						# add entity box width to get entity max x
			neg ecx								# negate delta y
			add cx, word ptr [esi+0x02]			# add entity.y to get entity min y
			and ecx, 0xFFFF						# clear upper 16 bits
			sub ecx, dword ptr [esp+8]			# subtract scroll offset y
			add edx, ecx						# add entity box height to get entity max y

			.label_loop_6:

			cmp eax, 240						# compare entity min x to 240
			jge .label_loop_continue			# jump if greater than or equal
			cmp	ebx, 0							# compare entity max x to 0
			jl .label_loop_continue				# jump if lower
			cmp ecx, 176						# compare entity min y to 176
			jge .label_loop_continue			# jump if greater than or equal
			cmp	edx, 0							# compare entity max y to 0
			jl .label_loop_continue				# jump if lower

			.label_loop_7:

			cmp byte ptr [esi+0x13], 2			# compare entity.group to 2 (first group scan code)
			jl .label_loop_continue				# jump if lower
			cmp byte ptr [esi+0x13], 11			# compare entity.group to 11 (last group scan code)
			jg .label_loop_continue				# jump if lower

			.label_loop_8:

			push eax							# save eax
			xor eax, eax						# clear
			mov al, byte ptr [esi+0x13]			# load entity.group
			mov ebp, 0x00055448					# load offset for wc_io_keyboard_character_from_scan_code
			add ebp, dword ptr [esp+4+0]		# adjust by relocated data segment offset
			mov al, byte ptr [ebp+eax]			# translate scan code
			mov byte ptr [esp+4+12], al			# write character to buffer
			mov byte ptr [esp+4+13], 0			# write null terminator to buffer
			pop eax								# restore eax

			.label_loop_9:

			push eax							# save register
			push edx							# save register
			push ebx							# save register
			add eax, 1							# add text x offset
			add eax, 72							# adjust to game window x
			cmp eax, 0							# compare x to 0
			jl .label_loop_10					# jump if lower
			add ecx, 1							# add text y offset
			add ecx, 12							# adjust to game window y
			cmp ecx, 0							# compare y to 0
			jl .label_loop_10					# jump if lower
			mov edx, ecx						# set y argument
			lea ebx, dword ptr [esp+12+12]		# set string argument
			call 0x00031EDC						# call wc_ui_draw_text

			.label_loop_10:

			pop ebx								# restore register
			pop edx								# restore register
			pop eax								# restore register

			.label_loop_continue:

			add edi, 4							# go to next pointer
			jmp .label_loop_0					# jump

			.label_loop_break:

		.label_end:

			add esp, 64							# return stack space
			popad								# restore registers
			ret									# return

	0x00042C00: wc_refurbished_load_bitmap(wc_bitmap_t* ebx, target* eax) [file offset 0x45A00]

			call 0x00032810						# call wc_archive_read

		.label_begin:

			pushad								# save registers on stack
			sub esp, 64							# borrow stack space

		.label_initialize:

			mov ecx, dword ptr [esp+64+32]		# get return address from stack
			sub ecx, 36							# adjust address to address containing relocated offset in data segment
			mov ecx, dword ptr [ecx]			# load relocated offset
			sub ecx, 0x00055438					# adjust relocated offset by unrelocated value to get relocated_data_segment_offset
			mov dword ptr [esp+0], ecx			# save relocated_data_segment_offset

			mov dword ptr [esp+4], ebx			# save wc_bitmap_t*
			mov dword ptr [esp+8], eax			# save target*

			call .get_data_pointer				# get data_pointer
			mov dword ptr [esp+12], eax			# save data_pointer

		.label_copy_data:

			mov ebx, dword ptr [esp+4]
			cmp word ptr [ebx+0x00], 320
			jne .label_copy_data_end
			cmp word ptr [ebx+0x02], 130
			jne .label_copy_data_end

			mov eax, 130-4-5					# load start y
			mov ebx, 320						# load width
			mul ebx								# multiply y by width
			add eax, 320-4-64					# add start x to get byte_index

			mov edi, dword ptr [esp+8]			# load target*
			add edi, eax						# adjust to byte_index
			mov esi, dword ptr [esp+12]			# load data_pointer
			mov edx, 128						# initialize bit mask

			.label_copy_data_y:

				xor ebx, ebx					# clear

				.label_copy_data_y_0:

					.label_copy_data_x:

						.label_copy_data_x_0:

							xor ecx, ecx					# clear

						.label_copy_data_x_1:

							test byte ptr [esi], dl
							jz .label_copy_data_x_end
							mov byte ptr [edi], 97

						.label_copy_data_x_end:

							shr edx, 1						# shift bit mask
							cmp edx, 0
							jg .label_copy_data_x_end_0
							mov edx, 128
							inc esi

							.label_copy_data_x_end_0:

							inc edi							# go to next byte
							inc ecx							# increase x counter
							cmp ecx, 64						# compare to width of image
							jl	.label_copy_data_x_1		# jump if less

				.label_copy_data_y_1:

					add edi, 320					# adjust
					sub edi, 64						# subtract width

				.label_copy_data_y_end:

					inc ebx							# increase y counter
					cmp ebx, 5						# compare to height of image
					jl .label_copy_data_y_0			# jump if less
					jmp .label_end

			.get_data_pointer:

					jmp .get_data_pointer_1

				.get_data_pointer_0:

					jmp .get_data_pointer_2

				.get_data_pointer_1:

					call .get_data_pointer_0

				.get_data_pointer_2:

					pop eax
					sub eax, dword ptr .get_data_pointer_2
					add eax, dword ptr .get_data_pointer_3
					ret

				.get_data_pointer_3:

				.byte 0xCD, 0xAB, 0x32, 0x6A, 0xD8, 0x6C, 0xBA, 0x49
				.byte 0xA9, 0x2A, 0xAA, 0x8A, 0x94, 0x4A, 0x92, 0xAD
				.byte 0xCD, 0xAB, 0x32, 0x4E, 0xD4, 0x6A, 0x92, 0xAB
				.byte 0xA9, 0x2A, 0xAA, 0x2A, 0x94, 0x4A, 0x92, 0xAB
				.byte 0xAD, 0x3A, 0xB2, 0xCA, 0xD8, 0x6C, 0x92, 0x49

		.label_copy_data_end:

		.label_end:

			add esp, 64							# return stack space
			popad								# restore registers
			ret									# return

	0x00042D00: wc_refurbished_inject_top_frame_graphic(target* eax, region* edx) [file offset 0x45B00]

			call 0x000254C0				# call wc_archive_copy_bitmap

		.label_begin:

			pushad								# save registers on stack
			sub esp, 64							# borrow stack space

		.label_initialize:

			mov dword ptr [esp+0], eax			# save target*

		.label_move_lumber_icon:

			mov eax, 0							# load source.y
			mov ebx, 240						# load width
			mul ebx								# multiply source.y by width
			add eax, 102						# add source.x to get source_byte_index
			mov esi, dword ptr [esp+0]			# load target*
			add esi, eax						# adjust to source_byte_index

			mov eax, 0							# load target.y
			mov ebx, 240						# load width
			mul ebx								# multiply target.y by width
			add eax, 120						# add target.x to get target_byte_index
			mov edi, dword ptr [esp+0]			# load target*
			add edi, eax						# adjust to target_byte_index

			.label_move_lumber_y:

				xor ebx, ebx					# clear

				.label_move_lumber_y_0:

					.label_move_lumber_x:

						.label_move_lumber_x_0:

							xor ecx, ecx					# clear

						.label_move_lumber_x_1:

							mov al, byte ptr [esi]
							mov dl, byte ptr [edi]
							mov byte ptr [esi], dl
							mov byte ptr [edi], al

						.label_move_lumber_x_end:

							inc esi
							inc edi							# go to next byte
							inc ecx							# increase x counter
							cmp ecx, 9						# compare to width of image
							jl	.label_move_lumber_x_1		# jump if less

				.label_move_lumber_y_1:

					add esi, 240					# adjust
					sub esi, 9						# subtract width
					add edi, 240					# adjust
					sub edi, 9						# subtract width

				.label_move_lumber_y_end:

					inc ebx							# increase y counter
					cmp ebx, 9						# compare to height of image
					jl .label_move_lumber_y_0			# jump if less

		.label_move_gold_icon:

			mov eax, 1							# load source.y
			mov ebx, 240						# load width
			mul ebx								# multiply source.y by width
			add eax, 201						# add source.x to get source_byte_index
			mov esi, dword ptr [esp+0]			# load target*
			add esi, eax						# adjust to source_byte_index

			mov eax, 1							# load target.y
			mov ebx, 240						# load width
			mul ebx								# multiply target.y by width
			add eax, 180						# add target.x to get target_byte_index
			mov edi, dword ptr [esp+0]			# load target*
			add edi, eax						# adjust to target_byte_index

			.label_move_gold_y:

				xor ebx, ebx					# clear

				.label_move_gold_y_0:

					.label_move_gold_x:

						.label_move_gold_x_0:

							xor ecx, ecx					# clear

						.label_move_gold_x_1:

							mov al, byte ptr [esi]
							mov dl, byte ptr [edi]
							mov byte ptr [esi], dl
							mov byte ptr [edi], al

						.label_move_gold_x_end:

							inc esi
							inc edi							# go to next byte
							inc ecx							# increase x counter
							cmp ecx, 13						# compare to width of image
							jl	.label_move_gold_x_1		# jump if less

				.label_move_gold_y_1:

					add esi, 240					# adjust
					sub esi, 13						# subtract width
					add edi, 240					# adjust
					sub edi, 13						# subtract width

				.label_move_gold_y_end:

					inc ebx							# increase y counter
					cmp ebx, 6						# compare to height of image
					jl .label_move_gold_y_0			# jump if less

		.label_draw_food:

			call .get_data_pointer				# get source*
			mov esi, eax						# save in esi

			mov eax, 0							# load target.y
			mov ebx, 240						# load width
			mul ebx								# multiply target.y by width
			add eax, 20							# add target.x to get target_byte_index
			mov edi, dword ptr [esp+0]			# load target*
			add edi, eax						# adjust to target_byte_index

			.label_draw_food_y:

				xor ebx, ebx					# clear

				.label_draw_food_y_0:

					.label_draw_food_x:

						.label_draw_food_x_0:

							xor ecx, ecx					# clear

						.label_draw_food_x_1:

							mov al, byte ptr [esi]
							cmp al, 0
							je .label_draw_food_x_end
							mov byte ptr [edi], al

						.label_draw_food_x_end:

							inc esi
							inc edi							# go to next byte
							inc ecx							# increase x counter
							cmp ecx, 15						# compare to width of image
							jl	.label_draw_food_x_1		# jump if less

				.label_draw_food_y_1:

					add edi, 240					# adjust
					sub edi, 15						# subtract width

				.label_draw_food_y_end:

					inc ebx							# increase y counter
					cmp ebx, 9						# compare to height of image
					jl .label_draw_food_y_0			# jump if less

		.label_end:

			add esp, 64							# return stack space
			popad								# restore registers
			ret									# return

		.get_data_pointer:

				jmp .get_data_pointer_1

			.get_data_pointer_0:

				jmp .get_data_pointer_2

			.get_data_pointer_1:

				call .get_data_pointer_0

			.get_data_pointer_2:

				pop eax
				sub eax, dword ptr .get_data_pointer_2
				add eax, dword ptr .get_data_pointer_3
				ret

			.get_data_pointer_3:

			.byte 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xC7, 0xC7, 0xC7, 0xC2, 0xC2, 0xC5, 0x00
			.byte 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xC7, 0xC6, 0xC6, 0xC2, 0xC1, 0xC1, 0xC7, 0xC5
			.byte 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xC7, 0xC6, 0xC7, 0xC7, 0xC2, 0xC1, 0xC1, 0xC1, 0xC5
			.byte 0xF9, 0xBF, 0x00, 0x00, 0x00, 0xC7, 0xC6, 0xC7, 0xC7, 0xC2, 0xC1, 0xC1, 0xBF, 0xC1, 0xC7
			.byte 0x00, 0xF9, 0xBF, 0xBF, 0xC7, 0xC6, 0xC7, 0xC7, 0xC7, 0xC2, 0xC1, 0xC1, 0xBF, 0xC1, 0xC7
			.byte 0xF9, 0xBF, 0x00, 0x00, 0x00, 0xC5, 0xC5, 0xC7, 0xC7, 0xC2, 0xC1, 0xC1, 0xBF, 0xC1, 0xC7
			.byte 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xC5, 0xC5, 0xC7, 0xC7, 0xC2, 0xC1, 0xC1, 0xC1, 0xC5
			.byte 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xC5, 0xC5, 0xC5, 0xC2, 0xC1, 0xC1, 0xC7, 0xC5
			.byte 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xC5, 0xC5, 0xC5, 0xC2, 0xC2, 0xC5, 0x00

	0x00042F00: wc_refurbished_render_farm_info() [file offset 0x45D00]

			call 0x00034A80						# call wc_io_mouse_update_drag_rect

		.label_begin:

			pushad								# save registers on stack
			sub esp, 64							# borrow stack space

		.label_initialize:

			mov ecx, dword ptr [esp+64+32]		# get return address from stack
			sub ecx, 19							# adjust address to address containing relocated offset in data segment
			mov ecx, dword ptr [ecx]			# load relocated offset
			sub ecx, 0x00057F50					# adjust relocated offset by unrelocated value to get relocated_data_segment_offset
			mov dword ptr [esp+0], ecx			# save relocated_data_segment_offset

			mov byte ptr [esp+4], '%'
			mov byte ptr [esp+5], 'd'
			mov byte ptr [esp+6], '/'
			mov byte ptr [esp+7], '%'
			mov byte ptr [esp+8], 'd'
			mov byte ptr [esp+9], 0

		.label_printf:

			mov ecx, 0x00058F22					# food grown
			add ecx, dword ptr [esp+0]
			xor eax, eax
			mov ax, word ptr [ecx]
			mov ecx, 0x00058F68					# food used add
			add ecx, dword ptr [esp+0]
			xor ebx, ebx
			mov bx, word ptr [ecx]
			mov ecx, 0x00058F0E					# food used sub
			add ecx, dword ptr [esp+0]
			sub bx, word ptr [ecx]
			lea ecx, dword ptr [esp+4]
			lea edx, dword ptr [esp+12]

			push eax
			push ebx
			push ecx
			push edx
			call 0x00031D02						# call c_sprintf(target_buffer* [esp+0], format_string* [esp+4], ...args [esp+8]:[esp+N])
			add esp, 16

		.label_draw_text:

			mov eax, 41							# set x argument
			mov edx, 2							# set y argument
			lea ebx, dword ptr [esp+12]			# set string* argument
			call 0x00031EDC						# call wc_ui_draw_text(x eax, y edx, string* ebx)

		.label_end:

			add esp, 64							# return stack space
			popad								# restore registers
			ret									# return

	0x0001EFE3: [file offset 0x21DE3]

		call 0x000428F0							# call wc_refurbished_draw_minimap_overlay()

	0x000428F0: wc_refurbished_draw_minimap_overlay() [file offset 0x456F0]

			call 0x00034950						# call wc_ui_draw_rect_outline

		.label_begin:

			pushad								# save registers on stack
			sub esp, 64							# borrow stack space

		.label_initialize:

			mov ecx, dword ptr [esp+64+32]		# get return address from stack
			sub ecx, 20							# adjust address to address containing relocated offset in data segment
			mov ecx, dword ptr [ecx]			# load relocated offset
			sub ecx, 0x00059B20					# adjust relocated offset by unrelocated value to get relocated_data_segment_offset
			mov dword ptr [esp+0], ecx			# save relocated_data_segment_offset

			mov ecx, dword ptr [esp+64+32]		# get return address from stack
			sub ecx, 0x0001EFE8					# adjust relocated offset by unrelocated value to get relocated_code_segment_offset
			mov dword ptr [esp+4], ecx			# save relocated_code_segment_offset

		.label_check:

			mov eax, 0x0005A8FC					# load address for for wc_ui_entity_below_cursor*
			add eax, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
			mov eax, dword ptr [eax]			# read value at address
			test eax, eax						# compare wc_ui_entity_below_cursor* to null
			jz .label_end						# jump if zero
			xor ebx, ebx						# clear
			mov bl, byte ptr [eax+0x1B]			# load wc_ui_entity_below_cursor.type

		.label_entity_hit_points:

			mov eax, 0x00051978					# load offset for wc_unit_hit_points
			add eax, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
			xor ecx, ecx						# clear
			mov cx, word ptr [eax+ebx*2]		# load value
			mov dword ptr [esp+8], ecx			# save entity.hit_points

		.label_entity_armor:

			mov eax, 0x00051C8C					# load offset for wc_unit_armor
			add eax, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
			xor ecx, ecx						# clear
			mov cl, byte ptr [eax+ebx]			# load value
			mov dword ptr [esp+12], ecx			# save entity.armor

		.label_entity_base_damage:

			mov eax, 0x00051D7C					# load offset for wc_unit_base_damage
			add eax, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
			xor ecx, ecx						# clear
			mov cl, byte ptr [eax+ebx]			# load value
			mov dword ptr [esp+16], ecx			# save entity.base_damage

		.label_entity_damage:

			mov eax, 0x00051D5C					# load offset for wc_unit_damage
			add eax, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
			xor ecx, ecx						# clear
			mov cl, byte ptr [eax+ebx]			# load value
			mov dword ptr [esp+20], ecx			# save entity.damage

		.label_entity_range:

			mov eax, 0x00051C6C					# load offset for wc_unit_range
			add eax, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
			xor ecx, ecx						# clear
			mov cl, byte ptr [eax+ebx]			# load value
			mov dword ptr [esp+24], ecx			# save entity.range

		.label_entity_name:

			mov eax, 0x00054E54					# load offset for wc_unit_specs
			add eax, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
			mov ecx, dword ptr [eax+ebx*8+4]	# load value
			mov dword ptr [esp+28], ecx			# save entity.hit_points

		.label_entity_armor_upgrades:

			mov eax, 0x00050035					# load offset for wc_upgrade_armor
			add eax, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
			xor ecx, ecx						# clear
			mov cl, byte ptr [eax]				# load value
			shl ecx, 1							# multiply by 2
			add dword ptr [esp+12], ecx			# add to entity.armor

		.label_base_damage_upgrades:

			cmp bl, 8							# compare entity.type to 8 (human archer)
			jl .label_base_damage_upgrades_end	# jump if lower
			cmp bl, 9							# compare entity.type to 9 (orc spearman)
			jg .label_base_damage_upgrades_end	# jump if greater
			mov eax, 0x00050008					# load offset for wc_upgrade_base_damage
			add eax, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
			xor ecx, ecx						# clear
			mov cl, byte ptr [eax]				# load value
			shl ecx, 1							# multiply by 2
			add dword ptr [esp+16], ecx			# add to entity.base_damage

			.label_base_damage_upgrades_end:

		.label_damage_upgrades:

			cmp bl, 4							# compare entity.type to 4 (human catapult)
			je .label_damage_upgrades_end		# jump if equal
			cmp bl, 5							# compare entity.type to 5 (orc catapult)
			je .label_damage_upgrades_end		# jump if equal
			cmp bl, 8							# compare entity.type to 8 (human archer)
			je .label_damage_upgrades_end		# jump if equal
			cmp bl, 9							# compare entity.type to 9 (orc spearman)
			je .label_damage_upgrades_end		# jump if equal
			mov eax, 0x0005000D					# load offset for wc_upgrade_damage
			add eax, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
			xor ecx, ecx						# clear
			mov cl, byte ptr [eax]				# load value
			shl ecx, 1							# multiply by 2
			add dword ptr [esp+20], ecx			# add to entity.damage

			.label_damage_upgrades_end:

		.label_clear_bg:

			mov eax, 0x0005AE70					# load wc_ui_fill_color
			add eax, dword ptr [esp+0]			# adjust
			mov byte ptr [eax], 0
			xor eax, eax
			mov al, 3
			xor edx, edx
			mov dl, 6
			xor ebx, ebx
			mov bl, 64
			xor ecx, ecx
			mov cl, 64
			call 0x00032780						# call wc_ui_fill_rect(x eax, y edx, w ebx, h ecx)

		.label_render_name:

			mov eax, 3+2						# set x argument
			mov edx, 6+3						# set y argument
			mov ebx, dword ptr [esp+28]			# set string* argument
			call 0x00031EDC						# call wc_ui_draw_text(x eax, y edx, string* ebx)

		.label_render_health_icon:

			xor eax, eax						# clear
			mov al, 0							# health icon
			call .get_icon_pointer				# load address of icon_pointer
			add eax, dword ptr [esp+4]			# adjust by relocated_code_segment_offset
			xor ebx, ebx						# set x argument
			add bl, 3+2							# set x argument
			xor ecx, ecx						# set y argument
			add cl, 6+2+10						# set y argument
			mov edx, 0x00055438					# load offset for wc_ui_draw_region_pointer
			add edx, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
			mov edx, dword ptr [edx]
			call .draw_icon						# call

		.label_prepare_health_string:

			mov ebx, dword ptr [esp+8]			# load entity.hit_points
			mov ecx, .get_value_string_pointer	# load address of value_string
			add ecx, dword ptr [esp+4]			# adjust by relocated_code_segment_offset
			lea edx, dword ptr [esp+32]			# load target_buffer* argument
			push ebx							# push argument to stack
			push ecx							# push argument to stack
			push edx							# push argument to stack
			call 0x00031D02						# call c_sprintf(target_buffer* [esp+0], format_string* [esp+4], ...args [esp+8]:[esp+N])
			add esp, 12							# restore stack

		.label_render_health_string:

			mov eax, 3+15						# set x argument
			mov edx, 6+3+10						# set y argument
			lea ebx, dword ptr [esp+32]			# set string* argument
			call 0x00031EDC						# call wc_ui_draw_text(x eax, y edx, string* ebx)

		.label_render_damage_icon:

			xor eax, eax						# clear
			mov al, 1							# damage icon
			call .get_icon_pointer				# load address of icon_pointer
			add eax, dword ptr [esp+4]			# adjust by relocated_code_segment_offset
			xor ebx, ebx						# set x argument
			add bl, 3+2							# set x argument
			xor ecx, ecx						# set y argument
			add cl, 6+2+20						# set y argument
			mov edx, 0x00055438					# load address for wc_ui_draw_region_pointer
			add edx, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
			mov edx, dword ptr [edx]			# read value
			call .draw_icon						# call

		.label_prepare_damage_string:

			mov eax, dword ptr [esp+20]			# load entity.damage
			mov ebx, dword ptr [esp+16]			# load entity.base_damage
			add eax, ebx						# add base_damage to damage
			mov ecx, .get_range_string_pointer	# load address of range_string
			add ecx, dword ptr [esp+4]			# adjust by relocated_code_segment_offset
			lea edx, dword ptr [esp+32]			# load target_buffer* argument
			push eax							# push argument to stack
			push ebx							# push argument to stack
			push ecx							# push argument to stack
			push edx							# push argument to stack
			call 0x00031D02						# call c_sprintf(target_buffer* [esp+0], format_string* [esp+4], ...args [esp+8]:[esp+N])
			add esp, 16							# restore stack

		.label_render_damage_string:

			mov eax, 3+15						# set x argument
			mov edx, 6+3+20						# set y argument
			lea ebx, dword ptr [esp+32]			# set string* argument
			call 0x00031EDC						# call wc_ui_draw_text(x eax, y edx, string* ebx)

		.label_render_armor_icon:

			xor eax, eax						# clear
			mov al, 2							# armor icon
			call .get_icon_pointer				# load address of icon_pointer
			add eax, dword ptr [esp+4]			# adjust by relocated_code_segment_offset
			xor ebx, ebx						# set x argument
			add bl, 3+2							# set x argument
			xor ecx, ecx						# set y argument
			add cl, 6+2+30						# set y argument
			mov edx, 0x00055438					# load offset for wc_ui_draw_region_pointer
			add edx, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
			mov edx, dword ptr [edx]
			call .draw_icon						# call

		.label_prepare_armor_string:

			mov ebx, dword ptr [esp+12]			# load entity.armor
			mov ecx, .get_value_string_pointer	# load address of value_string
			add ecx, dword ptr [esp+4]			# adjust by relocated_code_segment_offset
			lea edx, dword ptr [esp+32]			# load target_buffer* argument
			push ebx							# push argument to stack
			push ecx							# push argument to stack
			push edx							# push argument to stack
			call 0x00031D02						# call c_sprintf(target_buffer* [esp+0], format_string* [esp+4], ...args [esp+8]:[esp+N])
			add esp, 12							# restore stack

		.label_render_armor_string:

			mov eax, 3+15						# set x argument
			mov edx, 6+3+30						# set y argument
			lea ebx, dword ptr [esp+32]			# set string* argument
			call 0x00031EDC						# call wc_ui_draw_text(x eax, y edx, string* ebx)

		.label_render_range_icon:

			xor eax, eax						# clear
			mov al, 3							# range icon
			call .get_icon_pointer				# load address of icon_pointer
			add eax, dword ptr [esp+4]			# adjust by relocated_code_segment_offset
			xor ebx, ebx						# set x argument
			add bl, 3+2							# set x argument
			xor ecx, ecx						# set y argument
			add cl, 6+2+40						# set y argument
			mov edx, 0x00055438					# load offset for wc_ui_draw_region_pointer
			add edx, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
			mov edx, dword ptr [edx]
			call .draw_icon						# call

		.label_prepare_range_string:

			mov ebx, dword ptr [esp+24]			# load entity.range
			mov ecx, .get_value_string_pointer	# load address of value_string
			add ecx, dword ptr [esp+4]			# adjust by relocated_code_segment_offset
			lea edx, dword ptr [esp+32]			# load target_buffer* argument
			push ebx							# push argument to stack
			push ecx							# push argument to stack
			push edx							# push argument to stack
			call 0x00031D02						# call c_sprintf(target_buffer* [esp+0], format_string* [esp+4], ...args [esp+8]:[esp+N])
			add esp, 12							# restore stack

		.label_render_range_string:

			mov eax, 3+15						# set x argument
			mov edx, 6+3+40						# set y argument
			lea ebx, dword ptr [esp+32]			# set string* argument
			call 0x00031EDC						# call wc_ui_draw_text(x eax, y edx, string* ebx)

		.label_end:

			add esp, 64							# return stack space
			popad								# restore registers
			ret									# return

		.draw_icon:

			mov edi, dword ptr [edx+4]
			mov esi, eax						# copy icon_pointer to esi
			xor eax, eax
			mov ax, word ptr [edx+0]			  # load framebuffer width 320/72
			push edx
			mul ecx								# multiply y by width
			pop edx
			add eax, ebx						# add x to get pixel offset
			add edi, eax						# adjust pixel offset in framebuffer
			call .get_palette_pointer

			.label_draw_icon_y:

				xor ebx, ebx					# clear

				.label_draw_icon_y_0:

					.label_draw_icon_x:

						.label_draw_icon_x_0:

							xor ecx, ecx					# clear

						.label_draw_icon_x_1:

							xor eax, eax					# clear
							mov al, byte ptr [esi]			# read byte from source
							test cl, 1						# check if odd x
							jnz .label_draw_icon_x_2		# jump if odd x
							shr al, 4						# shift down upper 4 bits for

						.label_draw_icon_x_2:

							and al, 0x0F					# keep lower 4 bits
							cmp al, 0						# check if transparent black
							je .label_draw_icon_x_end		# jump if equal
							mov al, byte ptr [ebp+eax]		# lookup palette index in table
							mov byte ptr [edi], al			# write byte to target

						.label_draw_icon_x_end:

							test cl, 1						# check if odd x
							jz .label_draw_icon_x_end_1		# jump if even x
							inc esi							# go to next source byte

							.label_draw_icon_x_end_1:

							inc edi							# go to next byte
							inc ecx							# increase x counter
							cmp ecx, 8						# compare to width of image
							jl	.label_draw_icon_x_1		# jump if less

				.label_draw_icon_y_1:

                    xor eax, eax
                    mov ax, word ptr [edx+0]
                    add edi, eax
					sub edi, 8					# adjust by stride

				.label_draw_icon_y_end:

					inc ebx							# increase y counter
					cmp ebx, 7						# compare to height of image
					jl .label_draw_icon_y_0			# jump if less

			ret

		.get_icon_pointer:

			push ebx							# save register
			xor ebx, ebx						# clear
			mov bl, 28							# load bytes_per_icon
			mul ebx								# multiply icon_index by bytes_per_icon
			add eax, 0x00042F90					# load offset for icons
			pop ebx								# restore register
			ret									# return

		.get_value_string_pointer:

			.string "%d"

		.get_range_string_pointer:

			.string "%d-%d"

		.get_palette_pointer:

				jmp .get_palette_pointer_1

			.get_palette_pointer_0:

				jmp .get_palette_pointer_2

			.get_palette_pointer_1:

				call .get_palette_pointer_0

			.get_palette_pointer_2:

				pop ebp
				sub ebp, dword ptr .get_palette_pointer_2
				add ebp, dword ptr .get_palette_pointer_3
				ret

			.get_palette_pointer_3:

			.byte 0 # transparent black
			.byte 163 # dark brown
			.byte 186 # dark gray
			.byte 162 # brown
			.byte 179 # dark red
			.byte 161 # light brown
			.byte 210 # dark green
			.byte 181 # red
			.byte 183 # light red
			.byte 189 # gray
			.byte 212 # green
			.byte 191 # light gray
			.byte 214 # light green
			.byte 217 # white
			.byte 0
			.byte 0
```

## Data Segment

Delta: -0xA200

### WarCraft

```
	0x000500D0: wc_ui_scroll_offset_tiles[2*2] [file offset 0x45ED0]

		00 00 00 00

	0x000514E4: wc_ui_button_slots[6*12] [file offset 0x472E4]

		02 00 74 00 21 00 8A 00 20 00 17 00
		...

	0x00051978: wc_core_entity_hitpoints[52*2] [file offset 0x47778]

		3C 00
		...

	0x00051ABC: wc_core_entity_sizes[52*4] [file offset 0x478BC]

		01 00 01 00
		...

	0x00051B9C: wc_core_entity_boxes[52*4] [file offset 0x4799C]

		0F 00 0F 00
		...

	0x0005357C: wc_ui_health_bar_color_table[3*2] [file offset 0x4937C]

		4B DF
		...

	0x00055448: wc_io_keyboard_character_from_scan_code[256] [file offset 0x4B248]

		00 1B 31 32 33 34 35 36 37 38 39 30 2D 3D 08 09
		...

	0x000586BC: wc_core_map_tile_flags_pointer[4] [file offset 0x4E4BC]

		00 00 00 00

	0x000586C4: wc_core_map_tile_types_pointer[4] [file offset 0x4E4C4]

		00 00 00 00

	0x0005A230: wc_core_selected_unit_pointers[8*4] [virtual file offset 0x50030]

		?? ?? ?? ??

	0x0005A5D0: wc_core_entity_pointers[201*4] [virtual file offset 0x503D0]

		?? ?? ?? ??
		...

	0x0005A8FC: wc_ui_entity_at_cursor_pointer[4] [virtual file offset 0x506FC]

		?? ?? ?? ??

	0x0005A904: wc_ui_selected_action_type [2] [virtual file offset 0x50704]

		?? ??

	0x0005A9F0: wc_io_mouse_coordinates [2*2] [virtual file offset 0x507F0]

		?? ??
		...

	0x0005AE70: wc_ui_fill_color[1] [virtual file_offset 0x50C70]

		??
```

### WarCraft: Refurbished

```
```

## References

* https://stanislavs.org/helppc/int_21-25.html
* https://wiki.osdev.org/PS/2_Keyboard#Scan_Code_Sets
* https://open-watcom.github.io/open-watcom-1.9/pguide.html#DOSD4GW__Int31H_Function_Calls
* https://grandidierite.github.io/dos-interrupts/
* https://dosgraphicseditor.blogspot.com/p/mouse-events-tutorial.html
* https://en.wikipedia.org/wiki/INT_13H
* https://wiki.archlinux.org/title/Open_Watcom
