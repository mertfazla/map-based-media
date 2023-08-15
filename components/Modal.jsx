"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

export default function Modal({ children }) {
	const overlay = useRef(null);
	const wrapper = useRef(null);
	const router = useRouter();

	const onDismiss = useCallback(() => {
		router.back();
	}, [router])

	const onClick = useCallback((e) => {
		if (e.target === overlay.current || e.target === wrapper.current) {
			if (onDismiss) onDismiss();
		}
	}, [onDismiss, overlay, wrapper])

	const onClose = useCallback(() => {
		if (onDismiss) onDismiss();
	}, [onDismiss])

	const onKeyDown = useCallback((e) => {
		if (e.key === 'Escape') onDismiss();
	}, [onDismiss])

	useEffect(() => {
		document.addEventListener('keydown', onKeyDown)
		return () => document.removeEventListener('keydown', onKeyDown)
	}, [onKeyDown])
	return (
		<div
			ref={overlay}
			className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto backdrop-filter backdrop-blur-xl bg-opacity-10 bg-black"
			onClick={onClick}
		>
			<div
				ref={wrapper}
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-10/12 md:w-9/12 lg:w-8/12 p-6 rounded-b-xl rounded-tl-xl bg-cyan-100/80 border border-black"
				style={{ maxHeight: '100vh' }}
			>
				<div className="flex justify-end">
					<button onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none">
						X
					</button>
				</div>
				<div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 6rem)' }}>
					<div className="p-4">{children}</div>
				</div>
			</div>
		</div>
	);
}