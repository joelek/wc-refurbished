module.exports = {
	name: "ENTITY_GROUP_PATCH",
	slices: [
		{
			description: "Caller.",
			addresses: [
				0x0001A00E,
				0x0001A00E
			],
			assembly:
			`
					call 0x00042800                                            # call wc_refurbished_keyboard_input_handler
			`,
			relocations: []
		},
		{
			description: "Callee.",
			addresses: [
				0x00042800,
				0x00042800
			],
			assembly:
			`
				.label_start:

					call 0x0001B690						# call wc_ui_handle_message_input(scan_code_with_modifiers bx, __writes input_was_handled ax)
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
			`,
			relocations: []
		}
	]
};
