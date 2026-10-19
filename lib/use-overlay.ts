'use client'

import { useEffect, type RefObject } from 'react'

export function useOverlay(
  open: boolean,
  onClose: () => void,
  focusRef?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!open) return

    focusRef?.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // 1. 패널이 열릴 때 브라우저 히스토리 스택에 현재 상태를 하나 쌓음 (뒤로 가기 방어용)
    window.history.pushState({ overlayOpen: true }, '', window.location.href)

    // 2. 사용자가 키보드 ESC를 누를 때 실행되는 함수
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        window.history.back() // 히스토리를 뒤로 돌려 쌓인 상태를 해제
      }
    }

    // 3. 사용자가 브라우저 '뒤로 가기' 버튼을 눌렀을 때 발생하는 이벤트 감지
    const onPopState = () => {
      onClose() // 다른 사이트로 안 가고 패널만 닫음
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('popstate', onPopState)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('popstate', onPopState)
    }
  }, [open, onClose, focusRef])
}