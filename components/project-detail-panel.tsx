'use client'

import React from 'react'

export interface ProjectDetailProps {
  title?: string
  images?: string[]
  onClose?: () => void
  projectNumber?: string
}

export default function ProjectDetailPanel({
  title = "",
  images = [],
  projectNumber = "",
}: ProjectDetailProps) {
  return (
    <div className="w-full min-h-screen bg-white text-black flex flex-col justify-between select-none text-[15px] leading-snug relative">
      {/* 이미지만 깔끔하게 나열 (불필요한 숫자 렌더링 제거) */}
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

      {/* 하단 정보 영역: 좌측에는 제목, 우측에는 d.05 같은 형식의 정확한 라벨 배치 */}
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