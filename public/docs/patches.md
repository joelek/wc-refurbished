# Patch

## Code Segment

Delta: +0x2E00

### WarCraft

```
	0x00010010: call wc_ui_draw_game_window_background(???) [file offset 0x12E10]

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

	0x00025D80: wc_ui_get_next_selected_entity(__writes entity* eax) [file offset 0x28B80]

	0x00025DF4: wc_ui_get_first_selected_entity(__writes entity* eax) [file offset 0x28BF4]

	0x000263D0: wc_selection_update(entity_pointer_count eax, entity_pointers** edx) [file offset 0x291D0]

	0x000286A3: (wc_ui_draw_action_button) [file offset 0x2B4A3]

			call 0x000421A0						# call wc_refurbished_draw_action_button_hotkey instead of wc_ui_draw_image

	0x0002D9F8: wc_ui_draw_game_window_entities(???) [file offset 0x307F8]

	0x0002DD2E: (wc_ui_draw_game_window_entities) [file offset 0x30B2E]

		call 0x00042A00							# call wc_refurbished_draw_entity_info instead of wc_ui_draw_particle_or_burning_building

	0x00031D02: c_sprintf(target_buffer* [esp+0], format_string* [esp+4], ...args [esp+8]:[esp+N]) [file offset 0x34B02]

	0x00031EDC: wc_ui_draw_text(x eax, y edx, string* ebx) [file offset 0x34CDC]

	0x00032120: wc_ui_set_text_colors(color al) [file offset 0x34F20]

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
			cmp eax, 0							# check if null
			je .label_entity_worker_2			# jump if null
			mov eax, dword ptr [eax]			# dereference pointer
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
			cmp eax, 0							# check if null
			je .label_entity_worker_3			# jump if null
			mov eax, dword ptr [eax]			# dereference pointer
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
			cmp eax, 0							# check if null
			je .label_entity_worker_4			# jump if null
			mov eax, dword ptr [eax]			# dereference pointer
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
			cmp eax, 0							# check if null
			je .label_entity_worker_4			# jump if null
			mov eax, dword ptr [eax]			# dereference pointer
			cmp byte ptr [eax+0x1E], 0			# check if entity_below_cursor.player is player 0
			je .label_entity_worker_4			# jump if equal
			cmp byte ptr [eax+0x1E], 4			# check if entity_below_cursor.player is player 4 (neutral)
			je .label_entity_worker_4			# jump if equal
			mov ebx, 0x04						# set action to attack
			jmp .dispatch_action				# jump to dispatch action

			.label_entity_worker_4:

			mov ebx, 0x03						# set action to move
			jmp .dispatch_action				# jump to dispatch action

			.label_entity_worker_end:

		.label_entity_mixed:

			mov eax, dword ptr [esp+16]			# load entity_below_cursor*
			cmp eax, 0							# check if null
			je .label_entity_mixed_1			# jump if null
			mov eax, dword ptr [eax]			# dereference pointer
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
			je .label_initialize				# jump if equal
			ret									# return

		.label_initialize:

			ret									# return

	0x000: wc_refurbished_draw_entity_flags(scroll_offset_x eax, scroll_offset_y ebx, entity* esi) [file offset 0x]

			push eax
			push ebx
			push ecx
			push edx

			sub esp, 28							# borrow stack space

			# [esp+0]: format string
			# [esp+4]: string buffer
			# [esp+20]: scroll offset x
			# [esp+24]: scroll offset y

		.label_initialize:

			mov byte ptr [esp+0], '%'			# write character to buffer
			mov byte ptr [esp+1], 'd'			# write character to buffer
			mov byte ptr [esp+2], 0				# write null terminator to buffer

			mov dword ptr [esp+20], eax			# save scroll offset x
			mov dword ptr [esp+24], ebx			# save scroll offset y

		.label_write_string_buffer:

			xor eax, eax						# clear
			mov al, byte ptr [esi+0x10]			# load entity flags

			lea ebx, dword ptr [esp+0]			# load pointer to format string
			lea ecx, dword ptr [esp+4]			# load pointer to string buffer

			push eax							# push value
			push ebx							# push format string
			push ecx							# push string buffer

			call 0x00031D02						# call c_sprintf

			pop ecx								# restore stack
			pop ebx								# restore stack
			pop eax								# restore stack

		.label_draw_text:

			xor eax, eax						# clear
			mov ax, word ptr [esi+0x00]			# load entity x
			sub eax, dword ptr [esp+20]			# adjust by scroll offset x
			cmp eax, 0							# check if left of screen
			jl .label_end						# skip rendering if so
			cmp eax, 240						# check if right of screen
			jge .label_end						# skip rendering if so
			add eax, 72							# adjust to game window

			xor edx, edx						# clear
			mov dx, word ptr [esi+0x02]			# load entity y
			sub edx, dword ptr [esp+24]			# adjust by scroll offset y
			cmp edx, 0							# check if above screen
			jl .label_end						# skip rendering if so
			cmp edx, 176						# check below screen
			jge .label_end						# skip rendering if so
			add edx, 12							# adjust to game window

			lea ebx, dword ptr [esp+4]			# load pointer to string buffer

			call 0x00031EDC						# call wc_ui_draw_text

		.label_end:

			add esp, 28							# return stack space

			pop edx
			pop ecx
			pop ebx
			pop eax

			ret
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

	0x0005A5D0: wc_core_entity_pointers[200*4] [virtual file offset 0x503D0]

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
