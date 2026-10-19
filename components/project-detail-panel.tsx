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
      {/* 상단 패딩을 pt-3 md:pt-16 으로 줄여 이미지를 상단으로 바짝 끌어올림 */}
      <div className="flex-1 flex flex-col gap-3 px-2 md:px-4 pt-3 md:pt-16 pb-10">
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