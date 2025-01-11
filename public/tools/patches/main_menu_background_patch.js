module.exports = {
	slices: [
		{
			description: "Caller.",
			addresses: [
				0x000324D4,
				0x000323F7
			],
			assembly:
			`
					call 0x00042710                                            # call wc_refurbished_load_bitmap
			`,
			relocations: []
		},
		{
			description: "Callee.",
			addresses: [
				0x00042710,
				0x00042710
			],
			assembly:
			`
				.label_start:

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
			`,
			relocations: []
		}
	]
};
