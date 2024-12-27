# Patch

## Code Segment

Delta: +0x2E00

### WarCraft

```
	0x0001B057: (wc_ui_draw_game_window) [file offset 0x1DE57]

			call 0x00042240						# call wc_refurbished_draw_health_bars instead of wc_ui_draw_game_window_entities

	0x0001B11C: wc_ui_center_game_window_on_coordinates(???) [file offset 0x1DF1C]

	0x0001B48C: wc_ui_select_target_click_handler(x [eax+4], y [eax+6]) [file offset 0x1E28C]

	0x0001B5D0: wc_ui_center_game_window_on_entity(entity* eax) [file offset 0x1E3D0]

	0x00025D80: wc_ui_get_next_selected_entity(__writes entity* eax) [file offset 0x28B80]

	0x00025DF4: wc_ui_get_first_selected_entity(__writes entity* eax) [file offset 0x28BF4]

	0x000263D0: wc_selection_update(entity_pointer_count eax, entity_pointers** edx) [file offset 0x291D0]

	0x000286A3: (wc_ui_draw_action_button) [file offset 0x2B4A3]

			call 0x000421A0						# call wc_refurbished_draw_action_button_hotkey instead of wc_ui_draw_image

	0x0002D9F8: wc_ui_draw_game_window_entities(???)

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
			dec edx								# decrease to get normal box w
			neg edx								# negate normal box w
			add edx, dword ptr [esp+108]		# add entity box w
			shr edx, 1							# divide by two
			mov dword ptr [esp+120], edx		# save entity grid delta x
			xor edx, edx						# clear
			mov dx, word ptr [ecx+2]			# load entity size h
			shl edx, 4							# multiply by 16
			mov dword ptr [esp+124], edx		# save entity size h
			dec edx								# decrease to get normal box h
			neg edx								# negate normal box h
			add edx, dword ptr [esp+112]		# add entity box h
			shr edx, 1							# divide by two
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

	0x00042700: wc_refurbished_draw_entity_flags(scroll_offset_x eax, scroll_offset_y ebx, entity* esi) [file offset 0x45500]

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
