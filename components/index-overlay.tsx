'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useOverlay } from '@/lib/use-overlay'

type Project = {
  slug: string
  titleKo: string
  title: string
  year: string
  aspectRatio?: string | number
  image?: string
  series?: string[]
  alt?: string
  category?: 'design' | 'photography'
}

type IndexOverlayProps = {
  open: boolean
  projects: Project[]
  onClose: () => void
  onSelect?: (slug: string) => void
  title?: { ko: string; en: string }
}

export function IndexOverlay({ open, projects, onClose, onSelect, title }: IndexOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  useOverlay(open, onClose)

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        // 창 바깥쪽 배경 클릭 시 닫기
        if (e.target === overlayRef.current) {
          onClose()
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="index-title"
      inert={!open}
      aria-hidden={!open}
      className={`fixed inset-0 z-40 bg-white/97 text-[15px] leading-snug transition-opacity duration-150 ease-out ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* 1. 화면에 완전히 고정된(fixed) 상단 헤더: 바운스 스크롤 시에도 미동도 하지 않음 */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between py-3 px-2 md:px-4 bg-transparent text-black pointer-events-none">
        <h2 id="index-title" className="text-[15px] font-normal tracking-tight pointer-events-auto">
          <button 
            type="button" 
            onClick={onClose}
            className="hover:opacity-50 transition-opacity cursor-pointer inline text-black"
          >
            <span lang="ko">장혁준</span> Jang Hyukjun
          </button>
          {' ( '}
          <span lang="ko">{title?.ko || '찾아보기'}</span> {title?.en || 'Index'}
        </h2>

        <button
          type="button"
          onClick={onClose}
          className="hover:opacity-50 ml-auto cursor-pointer text-black pointer-events-auto"
        >
          (Close)
        </button>
      </header>

      {/* 2. 실제 스크롤이 일어나는 내부 썸네일 그리드 영역 (상단 헤더 높이만큼 pt-12 여백 지정) */}
      <div className="w-full h-full overflow-y-auto px-2 md:px-4 pt-12 pb-16">
        <div className="grid grid-cols-2 gap-x-0 gap-y-12 md:grid-cols-4 lg:grid-cols-7 md:gap-x-0 md:gap-y-16 pt-4 items-end">
          {projects.map((project, i) => {
            const displayImage = project.image || (project.series && project.series[0])

            return (
              <div
                key={project.slug}
                onClick={() => {
                  if (onSelect) {
                    onSelect(project.slug)
                  }
                }}
                className="group flex flex-col justify-end text-left w-full cursor-pointer"
              >
                {/* 이미지 영역 */}
                <div className="relative w-full overflow-hidden flex items-center justify-center">
                  {displayImage && (
                    <Image
                      src={displayImage}
                      alt={project.alt || project.title}
                      width={800}
                      height={1000}
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
                      className="h-auto w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
                    />
                  )}
                </div>

                {/* 하단 번호 */}
                <div className="mt-1 text-xs text-left text-black">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}