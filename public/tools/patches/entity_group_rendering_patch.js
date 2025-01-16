module.exports = {
	name: "ENTITY_GROUP_RENDERING_PATCH",
	slices: [
		{
			description: "Caller.",
			addresses: [
				0x0002DD2E,
				0x0002DBFE
			],
			assembly:
			`
					call 0x00042C00                                            # call wc_refurbished_draw_entity_groups
			`,
			relocations: []
		},
		{
			description: "Callee.",
			addresses: [
				0x00042C00,
				0x00042C00
			],
			assembly:
			`
				.label_start:

					call 0x0002D834						# call wc_ui_draw_directional_sprite
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
			`,
			relocations: []
		}
	]
};
