'use client'

import React from 'react'

export interface ProjectDetailProps {
  title?: string
  images?: string[]
  onClose?: () => void
  projectNumber?: string
  year?: string
  description?: string
}

export default function ProjectDetailPanel({
  title = "",
  images = [],
  projectNumber = "",
  year = "",
  description = "",
}: ProjectDetailProps) {
  return (
    <div className="w-full min-h-screen bg-white text-black flex flex-col justify-between select-none text-[15px] leading-snug relative">
      {/* PC 및 모바일 상단 여백을 바짝 올려 최상단에 밀착 (pt-0 md:pt-0) */}
      <div className="flex-1 flex flex-col gap-3 px-2 md:px-4 pt-0 md:pt-0 pb-10">
        {/* 좌측 설명 텍스트가 있을 경우 상단에 선명하게 표시 */}
        {(title || year || description) && (
          <div className="whitespace-pre-wrap text-black leading-relaxed font-normal pt-12 md:pt-4 pb-4">
            {title && <p className="font-bold text-[15px] mb-1">{title}</p>}
            {year && <p className="text-[15px] mb-3">{year}</p>}
            {description && <p className="text-[15px]">{description}</p>}
          </div>
        )}

        {/* 이미지 및 비디오 목록 */}
        {images.map((src, idx) => {
          const isVideo = src.toLowerCase().endsWith('.mp4')

          return (
            <div key={idx} className="w-full relative overflow-hidden flex items-center justify-center">
              {isVideo ? (
                <video
                  src={src}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto block object-cover mx-auto"
                />
              ) : (
                <img
                  src={src}
                  alt={`project content ${idx + 1}`}
                  className="w-full h-auto block object-cover mx-auto"
                  loading={idx === 0 ? "eager" : "lazy"}
                  // @ts-ignore
                  fetchPriority={idx === 0 ? "high" : "auto"}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* 하단 바 */}
      <div className="px-2 md:px-4 pb-16 flex items-center justify-between text-[15px] leading-relaxed bg-white">
        <div></div>
        <div>
          {projectNumber && <p className="font-normal text-black">{projectNumber}</p>}
        </div>
      </div>
    </div>
  )
}