# at&t syntax generated without any flags (clang -0g -S) mstore.c

	.section	__TEXT,__text,regular,pure_instructions
	.build_version macos, 14, 0	sdk_version 14, 2
	.intel_syntax noprefix
	.globl	_multstore                      ## -- Begin function multstore
	.p2align	4, 0x90
_multstore:                             ## @multstore
	.cfi_startproc
## %bb.0:
	push	rbp
	.cfi_def_cfa_offset 16
	.cfi_offset rbp, -16
	mov	rbp, rsp
	.cfi_def_cfa_register rbp
	push	rbx
	push	rax
	.cfi_offset rbx, -24
	mov	rbx, rdx
	call	_mult2
	mov	qword ptr [rbx], rax
	add	rsp, 8
	pop	rbx
	pop	rbp
	ret
	.cfi_endproc
                                        ## -- End function
.subsections_via_symbols
