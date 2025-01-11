module.exports = {
	slices: [
		{
			description: "Caller.",
			addresses: [
				0x0001B057,
				0x0001B057
			],
			assembly:
			`
					call 0x00042240                                            # call wc_refurbished_draw_health_bars
			`,
			relocations: []
		},
		{
			description: "Callee.",
			addresses: [
				0x00042240,
				0x00042240
			],
			assembly:
			`
				.label_begin:

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

					mov eax, dword ptr [esp+268]		# get return address from stack
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

					lea edi, [0x0005A5D0]				# load offset for wc_core_entity_pointers
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
			`,
			relocations: []
		},
	]
};
