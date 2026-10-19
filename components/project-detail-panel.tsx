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
    <div className="w-full min-h-screen bg-white text-black select-none text-[15px] leading-snug relative">
      {/* pt-3 패딩으로 이미지 맨 위 상단선이 좌측 텍스트 및 (Close) 버튼 상단선과 완벽 수평 정렬 */}
      <div className="w-full flex flex-col gap-3 px-2 md:px-4 pt-3 pb-16">
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