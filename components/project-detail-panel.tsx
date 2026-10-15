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
      {/* 이미지만 나열하며, 옆이나 아래에 절대 다른 번호가 붙지 않도록 정리 */}
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

      {/* 하단 바: 좌측은 빈 상태로 두어 이미지 하단 좌측에 숫자가 생기지 않게 하고, 우측에만 projectNumber(d.02 등) 배치 */}
      <div className="px-2 md:px-4 pb-16 flex items-center justify-between text-[15px] leading-relaxed bg-white">
        <div>
          {/* 좌측 하단은 아무 텍스트도 넣지 않고 비워둡니다 */}
        </div>
        <div>
          {projectNumber && <p className="font-normal text-black">{projectNumber}</p>}
        </div>
      </div>
    </div>
  )
}