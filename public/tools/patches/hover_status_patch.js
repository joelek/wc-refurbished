module.exports = {
	slices: [
		{
			description: "Caller.",
			addresses: [
				0x0002B814,
				0x0002B6E4
			],
			assembly:
			`
					call 0x000428F0                                            # call wc_refurbished_draw_hover_status
			`,
			relocations: []
		},
		{
			description: "Callee.",
			addresses: [
				0x000428F0,
				0x000428F0
			],
			assembly:
			`
				.label_start:

					call 0x00033AF0						# call wc_ui_draw_image
					cmp ecx, 0							# check ptr for null
					je .label_begin						# jump if equal
					cmp byte ptr [ecx], 0				# check if the status text starts with a zero terminator
					je .label_begin						# jump if equal
					ret									# return

				.label_begin:

					pushad								# save registers on stack
					sub esp, 64							# borrow stack space

				.label_initialize:

					mov ecx, dword ptr [esp+64+32]		# get return address from stack
					add ecx, 2							# adjust address to address containing relocated offset in data segment
					mov ecx, dword ptr [ecx]			# load relocated offset
					sub ecx, 0x00055438					# adjust relocated offset by unrelocated value to get relocated_data_segment_offset
					mov dword ptr [esp+0], ecx			# save relocated_data_segment_offset

					mov ecx, dword ptr [esp+64+32]		# get return address from stack
					sub ecx, 0x0002B814+5				# adjust relocated offset by unrelocated value to get relocated_code_segment_offset
					mov dword ptr [esp+4], ecx			# save relocated_code_segment_offset

					lea ecx, dword ptr [esp+36]			# load address of null_string
					mov byte ptr [ecx], 0				# write null terminator to null_string
					mov dword ptr [esp+28], ecx			# set return value to address of null_string

				.label_check:

					mov eax, 0x0005A8FC					# load address for for wc_ui_entity_at_cursor_pointer
					add eax, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
					mov eax, dword ptr [eax]			# read value at address
					test eax, eax						# compare wc_ui_entity_at_cursor_pointer to null
					jz .label_end						# jump if zero
					xor ebx, ebx						# clear
					mov bl, byte ptr [eax+0x1B]			# load wc_ui_entity_below_cursor.type
					mov dword ptr [esp+32], ebx			# save type
					xor edx, edx						# clear
					mov dl, byte ptr [eax+0x1E]			# load wc_ui_entity_below_cursor.player
					mov dword ptr [esp+40], edx			# save player

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

					mov eax, 0x00054E54					# load offset for wc_ui_entity_panel_specs
					add eax, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
					mov ecx, dword ptr [eax+ebx*8+4]	# load value
					mov dword ptr [esp+28], ecx			# save entity.name

				.label_entity_armor_upgrades:

					mov eax, 0x00050035					# load offset for wc_upgrade_armor
					add eax, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
					add eax, edx						# add player number
					xor ecx, ecx						# clear
					mov cl, byte ptr [eax]				# load value
					and cl, 0x3F						# clear high bit (upgrade in progress)
					shl ecx, 1							# multiply by 2
					add dword ptr [esp+12], ecx			# add to entity.armor

				.label_base_damage_upgrades:

					cmp bl, 8							# compare entity.type to 8 (human archer)
					jl .label_base_damage_upgrades_end	# jump if lower
					cmp bl, 9							# compare entity.type to 9 (orc spearman)
					jg .label_base_damage_upgrades_end	# jump if greater
					mov eax, 0x00050008					# load offset for wc_upgrade_base_damage
					add eax, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
					add eax, edx						# add player number
					xor ecx, ecx						# clear
					mov cl, byte ptr [eax]				# load value
					and cl, 0x3F						# clear high bit (upgrade in progress)
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
					add eax, edx						# add player number
					add eax, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
					xor ecx, ecx						# clear
					mov cl, byte ptr [eax]				# load value
					and cl, 0x3F						# clear high bit (upgrade in progress)
					shl ecx, 1							# multiply by 2
					add dword ptr [esp+20], ecx			# add to entity.damage

					.label_damage_upgrades_end:

				.label_check_building:

					cmp byte ptr [esp+32], 31			# compare entity.type to 31 (last unit)
					jg .label_end						# jump if greater

				.label_render_damage_icon:

					xor eax, eax						# clear
					mov al, 1							# damage icon
					call .get_icon_pointer				# load address of icon_pointer
					add eax, dword ptr [esp+4]			# adjust by relocated_code_segment_offset
					xor ebx, ebx						# set x argument
					add bl, 195							# set x argument
					xor ecx, ecx						# set y argument
					add cl, 4							# set y argument
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
					lea edx, dword ptr [esp+44]			# load target_buffer* argument
					push eax							# push argument to stack
					push ebx							# push argument to stack
					push ecx							# push argument to stack
					push edx							# push argument to stack
					call 0x00031D02						# call c_sprintf(target_buffer* [esp+0], format_string* [esp+4], ...args [esp+8]:[esp+N])
					add esp, 16							# restore stack

				.label_render_damage_string:

					mov eax, 208					# set x argument
					mov edx, 5						# set y argument
					lea ebx, dword ptr [esp+44]			# set string* argument
					call 0x00031EDC						# call wc_ui_draw_text(x eax, y edx, string* ebx)

				.label_render_armor_icon:

					xor eax, eax						# clear
					mov al, 2							# armor icon
					call .get_icon_pointer				# load address of icon_pointer
					add eax, dword ptr [esp+4]			# adjust by relocated_code_segment_offset
					xor ebx, ebx						# set x argument
					add bl, 165							# set x argument
					xor ecx, ecx						# set y argument
					add cl, 4							# set y argument
					mov edx, 0x00055438					# load offset for wc_ui_draw_region_pointer
					add edx, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
					mov edx, dword ptr [edx]
					call .draw_icon						# call

				.label_prepare_armor_string:

					mov ebx, dword ptr [esp+12]			# load entity.armor
					mov ecx, .get_value_string_pointer	# load address of value_string
					add ecx, dword ptr [esp+4]			# adjust by relocated_code_segment_offset
					lea edx, dword ptr [esp+44]			# load target_buffer* argument
					push ebx							# push argument to stack
					push ecx							# push argument to stack
					push edx							# push argument to stack
					call 0x00031D02						# call c_sprintf(target_buffer* [esp+0], format_string* [esp+4], ...args [esp+8]:[esp+N])
					add esp, 12							# restore stack

				.label_render_armor_string:

					mov eax, 178					# set x argument
					mov edx, 5						# set y argument
					lea ebx, dword ptr [esp+44]			# set string* argument
					call 0x00031EDC						# call wc_ui_draw_text(x eax, y edx, string* ebx)

				.label_render_range_icon:

					xor eax, eax						# clear
					mov al, 3							# range icon
					call .get_icon_pointer				# load address of icon_pointer
					add eax, dword ptr [esp+4]			# adjust by relocated_code_segment_offset
					xor ebx, ebx						# set x argument
					add bl, 135							# set x argument
					xor ecx, ecx						# set y argument
					add cl, 4							# set y argument
					mov edx, 0x00055438					# load offset for wc_ui_draw_region_pointer
					add edx, dword ptr [esp+0]			# adjust by relocated_data_segment_offset
					mov edx, dword ptr [edx]
					call .draw_icon						# call

				.label_prepare_range_string:

					mov ebx, dword ptr [esp+24]			# load entity.range
					mov ecx, .get_value_string_pointer	# load address of value_string
					add ecx, dword ptr [esp+4]			# adjust by relocated_code_segment_offset
					lea edx, dword ptr [esp+44]			# load target_buffer* argument
					push ebx							# push argument to stack
					push ecx							# push argument to stack
					push edx							# push argument to stack
					call 0x00031D02						# call c_sprintf(target_buffer* [esp+0], format_string* [esp+4], ...args [esp+8]:[esp+N])
					add esp, 12							# restore stack

				.label_render_range_string:

					mov eax, 148					# set x argument
					mov edx, 5						# set y argument
					lea ebx, dword ptr [esp+44]			# set string* argument
					call 0x00031EDC						# call wc_ui_draw_text(x eax, y edx, string* ebx)

				.label_end:

					add esp, 64							# return stack space
					popad								# restore registers
					mov ecx, dword ptr [esp+28-32-64]	# overwrite string
					ret									# return

				.draw_icon:

					mov edi, dword ptr [edx+4]
					mov esi, eax						# copy icon_pointer to esi
					xor eax, eax
					mov ax, word ptr [edx+0]			# load framebuffer width 320/72
					push edx
					mul ecx								# multiply y by width
					pop edx
					add eax, ebx						# add x to get pixel offset
					add edi, eax						# adjust pixel offset in framebuffer
					mov ebp, .get_palette_pointer		# load address of palette_pointer
					add ebp, dword ptr [esp+4+4]		# adjust by relocated_code_segment_offset

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
					add eax, 0x00042F90					# load address for wc_refurbished_4bit_icon_atlas
					pop ebx								# restore register
					ret									# return

				.get_value_string_pointer:

					.string "%d"

				.get_range_string_pointer:

					.string "%d-%d"

				.get_palette_pointer:

					.byte 0 # transparent black
					.byte 163 # dark brown
					.byte 186 # dark gray
					.byte 162 # brown
					.byte 179 # dark red
					.byte 161 # light brown
					.byte 181 # red
					.byte 183 # light red
					.byte 189 # gray
					.byte 191 # light gray
					.byte 217 # white
			`,
			relocations: []
		},
		{
			description: "Remove render skip optimization.",
			addresses: [
				0x0002B7E9,
				0x0002B6B9
			],
			assembly:
			`
					nop
					nop
					nop
					nop
					nop
					nop
			`,
			relocations: []
		},
		{
			description: "Add 4bit icon atlas.",
			addresses: [
				0x00042F90,
				0x00042F90
			],
			assembly:
			`
					.byte 0x04, 0x40, 0x44, 0x00
					.byte 0x47, 0x66, 0x66, 0x40
					.byte 0x76, 0x66, 0x66, 0x60
					.byte 0x46, 0x66, 0x66, 0x40
					.byte 0x04, 0x66, 0x64, 0x00
					.byte 0x00, 0x46, 0x40, 0x00
					.byte 0x00, 0x04, 0x00, 0x00

					.byte 0x00, 0x00, 0x2A, 0x90
					.byte 0x02, 0x02, 0x98, 0x80
					.byte 0x08, 0x29, 0x88, 0x20
					.byte 0x02, 0x88, 0x82, 0x00
					.byte 0x01, 0x58, 0x20, 0x00
					.byte 0x15, 0x12, 0x82, 0x00
					.byte 0x11, 0x00, 0x00, 0x00

					.byte 0x02, 0x99, 0x82, 0x00
					.byte 0x2A, 0x33, 0x38, 0x20
					.byte 0x93, 0x53, 0x53, 0x80
					.byte 0x93, 0x53, 0x53, 0x80
					.byte 0x83, 0x53, 0x53, 0x80
					.byte 0x28, 0x33, 0x38, 0x20
					.byte 0x02, 0x88, 0x82, 0x00

					.byte 0x00, 0x02, 0x99, 0x90
					.byte 0x00, 0x00, 0x28, 0x90
					.byte 0x00, 0x02, 0x82, 0x90
					.byte 0x20, 0x28, 0x20, 0x20
					.byte 0x92, 0x82, 0x00, 0x00
					.byte 0x98, 0x20, 0x00, 0x00
					.byte 0x99, 0x92, 0x00, 0x00
			`,
			relocations: []
		}
	]
};
