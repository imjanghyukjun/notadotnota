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
  const closeRef = useRef<HTMLButtonElement>(null)
  useOverlay(open, onClose, closeRef)

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        // 배경(바깥 여백) 클릭 시 닫기
        if (e.target === overlayRef.current) {
          onClose()
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-title"
      inert={!open}
      aria-hidden={!open}
      className={`fixed inset-0 z-40 overflow-y-auto bg-white/75 px-2 md:px-4 pb-16 text-[15px] leading-snug transition-opacity duration-500 ease-out cursor-pointer ${
        open ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute right-2 md:right-4 top-3 hover:opacity-50 cursor-pointer"
      >
        (Close)
      </button>

      {/* 내부 콘텐츠 클릭 시 바깥 닫기 이벤트가 작동하지 않도록 stopPropagation 추가 */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="mt-3 flex flex-col gap-8 pr-16 md:grid md:grid-cols-4 md:gap-5 cursor-default"
      >
        <div>
          <h2 id="about-title">
            <span lang="ko">장혁준</span> Jang Hyukjun
          </h2>
          <p lang="ko" className="mt-0">
            프리랜서, 그래픽 디자이너, 사진가
          </p>
          <p lang="ko" className="mt-4">
            촬영 업무를 포함하여 각종 디자인 프로젝트 및 협업 기회를 찾고 있습니다.
          </p>
        </div>

        <address className="not-italic">
          <p>
            <a href={`mailto:${EMAIL}`} className="hover:opacity-50">
              {EMAIL}
            </a>
            <br />
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:opacity-50">
              @{INSTAGRAM_HANDLE}
            </a>
          </p>
          {/* 좌측의 mt-4 간격과 정확히 일치시켜 수평 라인을 맞춤 */}
          <p className="mt-4">
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