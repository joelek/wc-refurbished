module.exports = {
	slices: [
		{
			description: "Caller.",
			addresses: [
				0x0001B5C5,
				0x0001B5C5
			],
			assembly:
			`
					call 0x000424C0                                            # call wc_refurbished_dispatch_contextual_command
			`,
			relocations: []
		},
		{
			description: "Callee.",
			addresses: [
				0x000424C0,
				0x000424C0
			],
			assembly:
			`
				.label_begin:

					pushad								# save 8 registers on stack
					sub esp, 64							# borrow stack space

				.label_initialize:

					mov ebx, dword ptr [esp+32+64]		# get return address from stack
					sub ebx, 13							# adjust address to address containing relocated offset in data segment
					mov ebx, dword ptr [ebx]			# load relocated offset
					sub ebx, 0x000500D0+2					# adjust relocated offset by unrelocated value to get relocated_data_segment_offset
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

					mov eax, 0x0005A8FC					# load offset for wc_ui_entity_at_cursor_pointer
					add eax, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
					mov dword ptr [esp+16], eax			# save wc_ui_entity_at_cursor_pointer

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
					jne .label_entity_worker_1			# jump if not equal (breaks here)
					mov ebx, 0x0A						# set action to harvest (breaks here)
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
					jne .label_entity_worker_2			# jump if not equal (breaks here)
					mov ebx, 0x0A						# set action to harvest (breaks here)
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

					mov eax, 0x0005A904					# load offset for wc_ui_selected_action_type
					add eax, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
					mov word ptr [eax], bx				# set wc_ui_selected_action_type
					mov eax, 0x0005A9F0					# load offset for wc_io_mouse_coordinates
					add eax, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
					mov bx, word ptr [eax+0x00]			# load coordinate x
					mov word ptr [esp+36+4], bx			# write coordinate x to mouse event buffer
					mov bx, word ptr [eax+0x02]			# load coordinate y
					mov word ptr [esp+36+6], bx			# write coordinate y to mouse event buffer
					lea eax, [esp+36]					# set pointer to mouse event buffer
					call 0x0001B48C						# call wc_ui_select_target_click_handler(x [eax+4], y [eax+6])

				.label_end:

					add esp, 64							# return stack space
					popad								# restore registers
					ret									# return
			`,
			relocations: []
		}
	]
};
