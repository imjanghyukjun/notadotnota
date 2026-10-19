'use client'

import React from 'react'

export interface ProjectDetailProps {
  images?: string[]
  onClose?: () => void
}

export default function ProjectDetailPanel({
  images = [],
}: ProjectDetailProps) {
  return (
    <div className="w-full bg-white text-black select-none text-[15px] leading-snug relative">
      {/* 불필요한 패딩을 제거하여 상단 헤더/클로즈 버튼의 px-2 라인과 완벽 일치 */}
      <div className="w-full flex flex-col gap-3 px-0 pb-16">
        {images.map((src, idx) => {
          const isVideo = src.toLowerCase().endsWith('.mp4')

          return (
            <div key={idx} className="w-full relative overflow-hidden flex items-start justify-center">
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
    </div>
  )
}