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
  projectNumber?: string // 상단과 동일한 형식의 번호 (예: d.02) 전달용
}

export default function ProjectDetailPanel({
  title = "",
  images = [],
  projectNumber = "",
}: ProjectDetailProps) {
  return (
    <div className="w-full min-h-screen bg-white text-black flex flex-col justify-between select-none text-[15px] leading-snug relative">
      {/* 모바일에서는 상단을 바짝 올리고(pt-16), PC에서는 기존 라인 유지(md:pt-28) */}
      <div className="flex-1 flex flex-col gap-3 px-2 md:px-4 pt-16 md:pt-28 pb-10">
        {images.map((imgSrc, idx) => (
          <div key={idx} className="w-full relative overflow-hidden flex items-center justify-center">
            <img
              src={imgSrc}
              alt={`project image ${idx + 1}`}
              className="w-full h-auto block object-cover mx-auto"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* 하단 정보 영역: 제목과 매칭된 번호(d.02 등)만 표시하고 연도/기타 텍스트는 비움 */}
      <div className="px-2 md:px-4 pb-16 flex items-center justify-between text-[15px] leading-relaxed bg-white">
        <div>
          {title && <p className="font-normal text-black">{title}</p>}
        </div>
        <div>
          {projectNumber && <p className="font-normal text-black">{projectNumber}</p>}
        </div>
      </div>
    </div>
  )
}