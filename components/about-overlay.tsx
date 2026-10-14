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
      <header className="flex items-baseline justify-between py-3">
        {/* 모바일 및 PC 통틀어 좌상단에 단 1개만 노출 */}
        <h2 id="about-title" className="text-[15px] font-normal">
          <span lang="ko">장혁준</span> Jang Hyukjun
        </h2>
        {/* 모바일 화면에서만 우측 상단에 보이는 (Close) 버튼 */}
        <button
          type="button"
          onClick={onClose}
          className="hover:opacity-50 md:hidden ml-auto"
        >
          (Close)
        </button>
      </header>

      <div className="flex flex-col md:mt-0 md:grid md:grid-cols-4 md:gap-5 pt-4 md:pt-0">
        <div>
          <p lang="ko">프리랜서 그래픽 디자이너, 사진가.</p>
        </div>

        <address className="not-italic mt-6 md:mt-0">
          <p>
            <a href={`mailto:${EMAIL}`} className="hover:opacity-50">
              {EMAIL}
            </a>
            <br />
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:opacity-50">
              @{INSTAGRAM_HANDLE}
            </a>
          </p>
          <p className="mt-6">
            <a href="tel:+821033152384" className="hover:opacity-50">
              (+82) 10-3315-2384
            </a>
            <br />
            <span className="tabular-nums">309-54-77132</span>
            <br />
            <span lang="ko">
              서울 종로구 종로 54길 29-4
              <br />
              503, 504
            </span>
          </p>
        </address>
      </div>
    </div>
  )
}