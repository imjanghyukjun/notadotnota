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
      {/* 홈 화면 메인 이미지의 좌우 여백 규격과 동일하게 패딩 조정 */}
      <div className="w-full flex flex-col gap-3 px-4 md:px-12 pb-16">
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