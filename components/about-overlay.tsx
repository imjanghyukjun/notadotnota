'use client'

import { useRef } from 'react'
import { useOverlay } from '@/lib/use-overlay'
import { EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/lib/contact'

type AboutOverlayProps = {
  open: boolean
  onClose: () => void
}

export function AboutOverlay({ open, onClose }: AboutOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  useOverlay(open, onClose)

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        // 배경(바깥쪽 여백)을 클릭했을 때만 닫히도록 설정
        if (e.target === overlayRef.current) {
          onClose()
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-title"
      inert={!open}
      aria-hidden={!open}
      className={`fixed inset-0 z-40 overflow-y-auto bg-white/75 px-4 pb-16 text-[15px] leading-snug transition-opacity duration-500 ease-out ${
        open ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <header className="flex items-baseline justify-between py-3 md:block">
        <h2 id="about-title" className="sr-only">
          <span lang="ko">장혁준</span> Jang Hyukjun
        </h2>
      </header>

      <div className="flex flex-col md:mt-0 md:grid md:grid-cols-4 md:gap-5">
        <div>
          <h2 className="hidden md:block">
            <span lang="ko">장혁준</span> Jang Hyukjun
          </h2>
          <p lang="ko">프리랜서 그래픽 디자이너, 사진가.</p>
        </div>

        <address className="not-italic">
          <p lang="ko">
            서울 종로구 종로 54길 29-4
            <br />
            503, 504
          </p>
          <p className="mt-6">
            <a href={`mailto:${EMAIL}`} className="hover:opacity-50">
              {EMAIL}
            </a>
            <br />
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:opacity-50">
              @{INSTAGRAM_HANDLE}
            </a>
            <br />
            <a href="tel:+821033152384" className="hover:opacity-50">
              (+82) 10-3315-2384
            </a>
            <br />
            <span className="tabular-nums">309-54-77132</span>
          </p>
        </address>
      </div>
    </div>
  )
}