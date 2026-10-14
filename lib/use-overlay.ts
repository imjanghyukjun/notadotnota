'use client'

import { useEffect, type RefObject } from 'react'

export function useOverlay(
  open: boolean,
  onClose: () => void,
  focusRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!open) return
    focusRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose, focusRef])
}
