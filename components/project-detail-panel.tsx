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
  title = "",
  year = "",
  spec = "",
  client = "",
  description = "",
  images = [],
}: ProjectDetailProps) {
  return (
    <div className="w-full min-h-screen bg-white text-black flex flex-col justify-between select-none text-[15px] leading-snug relative">
      {/* 모바일에서는 상단을 바짝 올리고(pt-16), PC에서는 기존 라인 유지(md:pt-28) */}
      <div className="flex-1 flex flex-col gap-3 px-2 md:px-4 pt-16 md:pt-28">
        {images.map((imgSrc, idx) => (
          <div key={idx} className="w-full relative overflow-hidden flex items-center justify-center">
            <img
              src={imgSrc}
              alt={`${title} image ${idx + 1}`}
              className="w-full h-auto block object-cover mx-auto"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* 하단 정보 영역 */}
      <div className="px-2 md:px-4 pt-10 pb-16 flex flex-col justify-between text-[15px] leading-relaxed gap-10 bg-white">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              {title && <p className="font-medium text-black">{title}</p>}
            </div>
            <div className="text-gray-600 space-y-0.5">
              {year && <p>{year}</p>}
              {spec && <p>{spec}</p>}
              {client && <p>{client}</p>}
            </div>
          </div>

          <div className="text-gray-800 leading-normal">
            {description && <p className="whitespace-pre-line">{description}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}