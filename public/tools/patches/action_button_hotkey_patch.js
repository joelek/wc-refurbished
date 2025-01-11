module.exports = {
	slices: [
		{
			description: "Caller.",
			addresses: [
				0x000286A3,
				0x00028573
			],
			assembly:
			`
					call 0x000421A0                                            # call wc_refurbished_draw_action_button_hotkey
			`,
			relocations: []
		},
		{
			description: "Callee.",
			addresses: [
				0x000421A0,
				0x000421A0
			],
			assembly:
			`
				.label_begin:

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

					mov eax, dword ptr [esp+28]			# get return address from stack
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
			`,
			relocations: []
		}
	]
};
