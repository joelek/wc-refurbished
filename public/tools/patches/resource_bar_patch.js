module.exports = {
	slices: [
		{
			description: "Caller.",
			addresses: [
				0x0002B6C2,
				0x0002B592
			],
			assembly:
			`
					call 0x00042D60                                            # call wc_refurbished_inject_top_frame_graphic
			`,
			relocations: []
		},
		{
			description: "Callee.",
			addresses: [
				0x00042D60,
				0x00042D60
			],
			assembly:
			`
				.label_start:

					call 0x000254C0						# call wc_archive_copy_bitmap

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
			`,
			relocations: []
		},
		{
			description: "Caller.",
			addresses: [
				0x0002B9F7,
				0x0002B8C7
			],
			assembly:
			`
					call 0x00042F00                                            # call wc_refurbished_draw_farm_info
			`,
			relocations: []
		},
		{
			description: "Callee.",
			addresses: [
				0x00042F00,
				0x00042F00
			],
			assembly:
			`
				.label_start:

					call 0x00034A80						# call wc_vga_update_dirty_region

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

					mov ecx, 0x00058F22					# load address of wc_food_grown
					add ecx, dword ptr [esp+0]
					xor eax, eax
					mov ax, word ptr [ecx]
					mov ecx, 0x00058F68					# load address of wc_food_used_add
					add ecx, dword ptr [esp+0]
					xor ebx, ebx
					mov bx, word ptr [ecx]
					mov ecx, 0x00058F0E					# load address of wc_food_used_sub
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
			`,
			relocations: []
		},
		{
			description: "Remove render skip optimization.",
			addresses: [
				0x0002B97E,
				0x0002B84E
			],
			assembly:
			`
					nop
					nop
			`,
			relocations: []
		},
		{
			description: "Change lumber text position.",
			addresses: [
				0x0002B9C4,
				0x0002B894
			],
			assembly:
			`
					mov edx, 135
			`,
			relocations: []
		},
		{
			description: "Change gold text position.",
			addresses: [
				0x0002B9E3,
				0x0002B8B3
			],
			assembly:
			`
					mov edx, 199
			`,
			relocations: []
		},
		{
			description: "Change lumber format string.",
			addresses: [
				0x00057F40,
				0x00057DFC
			],
			assembly:
			`

					.string "%ld\\0\\0\\0\\0\\0\\0\\0\\0\\0"
			`,
			relocations: []
		},
		{
			description: "Change gold format string.",
			addresses: [
				0x00057F50,
				0x00057E0C
			],
			assembly:
			`
					.string "%ld\\0\\0\\0\\0\\0\\0\\0"
			`,
			relocations: []
		}
	]
};
