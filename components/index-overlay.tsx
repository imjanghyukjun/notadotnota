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
        // 여백(배경 영역)을 클릭했을 때만 닫기(뒤로가기) 실행
        if (e.target === overlayRef.current) {
          onClose()
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="index-title"
      inert={!open}
      aria-hidden={!open}
      className={`fixed inset-0 z-40 bg-white/97 text-[15px] leading-snug transition-opacity duration-300 ease-out ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <header className="fixed inset-x-0 top-0 z-50 flex items-start justify-between py-3 px-2 md:px-4 bg-transparent text-black leading-snug pointer-events-none">
        <h2 id="index-title" className="text-[15px] font-normal tracking-normal pointer-events-auto pr-2">
          <button 
            type="button" 
            onClick={onClose}
            className="hover:opacity-50 transition-opacity cursor-pointer inline text-black font-normal"
          >
            <span lang="ko">장혁준</span> Jang Hyukjun
          </button>
          {' ( '}
          <span lang="ko">{title?.ko || '찾아보기'}</span> {title?.en || 'Index'}
        </h2>

        <button
          type="button"
          onClick={onClose}
          className="hover:opacity-50 ml-auto cursor-pointer text-black pointer-events-auto shrink-0 font-normal"
        >
          (Close)
        </button>
      </header>

      {/* 내부 스크롤 영역에서 이벤트 버블링을 막아 썸네일 클릭 시에는 닫히지 않고 프로젝트 상세로 정상 진입 */}
      <div 
        className="w-full h-full overflow-y-auto px-2 md:px-4 pt-28 md:pt-24 pb-16 pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-2 gap-x-2 gap-y-12 md:grid-cols-4 lg:grid-cols-7 md:gap-x-4 md:gap-y-16 items-end">
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

                <div className="mt-1 text-xs text-left text-black font-normal">
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