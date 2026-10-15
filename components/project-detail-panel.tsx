'use client'

import React from 'react'

export interface ProjectDetailProps {
  title?: string
  year?: string
  spec?: string
  client?: string
  description?: string
  images?: string[]
  onClose?: () => void
}

export default function ProjectDetailPanel({
  title = "간바레 Ganbare ガンバレ !",
  year = "2026",
  spec = "120×155mm, 148p, 무선제본",
  client = "Client Name / Publisher",
  description = "2026년 교토 마라톤. 달리며 응원을 모았다. 간바레-콜렉션이다. 군산북페어, 서울퍼블리셔스테이블에서 판매한다.",
  images = [],
}: ProjectDetailProps) {
  return (
    <div className="w-full min-h-screen bg-white text-black flex flex-col justify-between select-none text-[15px] leading-snug relative">
      {/* 이미지 영역: 홈 화면 좌우 여백과 일치 (px-2 md:px-4) */}
      <div className="flex-1 flex flex-col gap-3 px-2 md:px-4 pt-24 md:pt-20">
        {images.map((imgSrc, idx) => (
          <div key={idx} className="w-full relative overflow-hidden">
            <img
              src={imgSrc}
              alt={`${title} image ${idx + 1}`}
              className="w-full h-auto block object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* 하단 정보 영역: 이미지와 양 끝 라인이 정확히 일치하도록 px-2 md:px-4 적용 */}
      <div className="px-2 md:px-4 pt-10 pb-16 flex flex-col justify-between text-[15px] leading-relaxed gap-10 bg-white">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <p className="font-medium text-black">{title}</p>
            </div>
            
            <div className="text-gray-600 space-y-0.5">
              {year && <p>{year}</p>}
              {spec && <p>{spec}</p>}
              {client && <p>{client}</p>}
            </div>

            <div className="pt-2 text-gray-500 text-[13px]">
              <p>Printed by Digid Web Sit Inc.</p>
              <p>Typeset in Diatype</p>
            </div>
          </div>

          <div className="text-gray-800 leading-normal">
            <p className="whitespace-pre-line">{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}