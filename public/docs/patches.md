# Patch

## Code Segment

```
	0x0002B4A3: (wc_ui_draw_action_button) [file offset 0x2E2A3]

		call 0x000421A0						# call wc_refurbished_draw_action_button_hotkey instead of wc_ui_draw_image

	0x00031D02: c_sprintf(target_buffer* [esp+0], format_string* [esp+4], ...args [esp+8]:[esp+N]) [file offset 0x34B02]

	0x00031EDC: wc_ui_draw_text(x eax, y edx, string* ebx) [file offset 0x34CDC]

	0x00032120: wc_ui_set_text_colors(color al) [file offset 0x34F20]

	0x00033AF0: wc_ui_draw_image(???) [file offset 0x368F0]

	0x000421A0: wc_refurbished_draw_action_button_hotkey(wc_action_button* ecx, button_press_state esi) [file offset 0x44FA0]

		call 0x00033AF0						# call wc_ui_draw_image

		push eax
		push ebx
		push ecx
		push edx

		sub esp, 12							# borrow stack space

		# [esp+0]: hotkey characters
		# [esp+4]: relocated data segment offset
		# [esp+8]: button press state

		mov dword ptr [esp+8], esi			# save button press state

		mov eax, [esp+28]					# get return address from stack (relocated value for 0x0002B4A8)
		add eax, 13							# add offset to known relocated value from data segment
		mov eax, dword ptr [eax]			# load value
		sub eax, 0x00055438					# adjust by expected value
		mov [esp+4], eax					# save relocated data segment offset

		mov bl, byte ptr [ecx+0x0C]			# load scan code for hotkey
		cmp bl, 1							# compare to scan code for escape
		je .label_esc						# jump

		.label_nonesc:

		mov eax, dword ptr [esp+4]			# load relocated data segment offset
		add eax, 0x00055448					# adjust with offset for wc_io_keyboard_character_from_scan_code
		mov al, byte ptr [eax+bl]			# translate scan code
		mov byte ptr [esp+0], al			# write character to buffer
		mov byte ptr [esp+1], 0				# write null terminator to buffer
		jmp .label_draw						# jump

		.label_esc:

		mov byte ptr [esp+0], 'E'			# write character to buffer
		mov byte ptr [esp+1], 'S'			# write character to buffer
		mov byte ptr [esp+2], 'C'			# write character to buffer
		mov byte ptr [esp+3], 0				# write null terminator to buffer

		.label_draw:

		mov eax, 243						# white color
		call 0x00032120						# call wc_ui_set_text_colors

		mov ebx, dword ptr [esp+4]			# load relocated data segment offset
		add ebx, 0x000514E4					# adjust with offset for wc_ui_button_slots
		xor eax, eax						# zero eax
		mov ax, word ptr [ecx+0x00]			# load slot number for button
		mov edx, eax						# make copy of slot number
		shl edx, 4							# edx is 16 * slot number
		shl eax, 2							# ebx is 4 * slot number
		sub edx, eax						# edx is 12 * slot number
		add ebx, edx						# ebx is now offset of button slot

		xor eax, eax						# zero eax
		mov ax, word ptr [ebx+0x00]			# load min_x from button slot
		add eax, 3							# add text x offset
		xor edx, edx						# zero edx
		mov dl, byte ptr [esp+8]			# adjust by button press
		add dx, word ptr [ebx+0x02]			# load min_y from button slot
		add edx, 3							# add text y offset
		sub edx, 72							# adjust to action panel
		lea ebx, dword ptr [esp+0]			# set string argument
		call 0x00031EDC						# call wc_ui_draw_text

		add esp, 12							# return stack space

		pop edx
		pop ecx
		pop ebx
		pop eax

		ret
```

## Data Segment

```
	0x000514E4 wc_ui_button_slots[6*12] [file offset 0x472E4]

		02 00 74 00 21 00 8A 00 20 00 17 00
		...

	0x00055448: wc_io_keyboard_character_from_scan_code[256] [file offset 0x4B248]

		00 1B 31 32 33 34 35 36 37 38 39 30 2D 3D 08 09
		...
```

## References

* https://stanislavs.org/helppc/int_21-25.html
* https://wiki.osdev.org/PS/2_Keyboard#Scan_Code_Sets
* https://open-watcom.github.io/open-watcom-1.9/pguide.html#DOSD4GW__Int31H_Function_Calls
* https://grandidierite.github.io/dos-interrupts/
* https://dosgraphicseditor.blogspot.com/p/mouse-events-tutorial.html
* https://en.wikipedia.org/wiki/INT_13H
* https://wiki.archlinux.org/title/Open_Watcom
