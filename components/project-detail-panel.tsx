'use client'

import React from 'react'

export interface ProjectDetailProps {
  title?: string
  year?: string
  spec?: string
  client?: string
  description?: string
  images?: string[] // 단일 이미지일 경우 요소 1개, 연계 이미지일 경우 여러 개
  onClose?: () => void
}

export default function ProjectDetailPanel({
  title = "간바레 Ganbare ガンバレ !",
  year = "2026",
  spec = "120×155mm, 148p, 무선제본",
  client = "Client Name / Publisher",
  description = "2026년 교토 마라톤. 달리며 응원을 모았다. 간바레-콜렉션이다. 군산북페어, 서울퍼블리셔스테이블에서 판매한다. Integer et placerat est, eu imperdiet neque. Proin sit amet purus metus.",
  images = [
    "/placeholder1.jpg",
    "/placeholder2.jpg"
  ],
  onClose,
}: ProjectDetailProps) {
  return (
    <div className="w-full min-h-screen bg-white text-black flex flex-col justify-between select-none">
      {/* 1. 상단 Sticky Header (Close 버튼) */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm px-4 py-3 flex justify-between items-center border-b border-gray-100 text-xs">
        <span className="font-medium">{title}</span>
        {onClose && (
          <button 
            onClick={onClose}
            className="hover:opacity-50 transition-opacity"
          >
            (Close)
          </button>
        )}
      </div>

      {/* 2. 메인 수직 스크롤 이미지 세트 (우측 50% 영역 전체 풀차게) */}
      <div className="flex-1 flex flex-col gap-3 p-0">
        {images.map((imgSrc, idx) => (
          <div key={idx} className="w-full relative bg-gray-100 overflow-hidden">
            <img
              src={imgSrc}
              alt={`${title} - image ${idx + 1}`}
              className="w-full h-auto block object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* 3. 하단 2컬럼 정보 영역 (Cargo 스타일) */}
      <div className="p-4 pt-8 border-t border-gray-100 flex flex-col justify-between text-[11px] leading-relaxed gap-8">
        <div className="grid grid-cols-2 gap-6">
          {/* 좌측 컬럼: Details */}
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-black">{title}</p>
            </div>
            
            <div className="text-gray-600 space-y-0.5">
              {year && <p>{year}</p>}
              {spec && <p>{spec}</p>}
              {client && <p>{client}</p>}
            </div>

            <div className="pt-2 text-gray-500">
              <p>Printed by Digid Web Sit Inc.</p>
              <p>Typeset in Diatype</p>
            </div>
          </div>

          {/* 우측 컬럼: Description */}
          <div className="text-gray-700 leading-normal">
            <p className="whitespace-pre-line">{description}</p>
          </div>
        </div>

        {/* 4. 하단 풋터 링크 & 시간 */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 text-[10px] text-gray-500">
          <button 
            onClick={onClose}
            className="underline underline-offset-2 hover:text-black transition-colors"
          >
            (Return to Projects)
          </button>
          <span>Jan 01 '46</span>
        </div>
      </div>
    </div>
  )
}