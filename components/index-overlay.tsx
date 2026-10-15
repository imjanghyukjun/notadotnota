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
      /* ⚠️ 기존 duration-500을 duration-150으로 대폭 줄여서 닫힐 때 잔상과 버벅임(번쩍임)을 없앰 */
      className={`fixed inset-0 z-40 overflow-y-auto bg-white/95 px-2 md:px-4 pb-16 text-[15px] leading-snug transition-opacity duration-150 ease-out ${
        open ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      {/* 상단 고정(Sticky) 헤더 */}
      <header className="sticky top-0 z-30 flex items-center justify-between py-3 bg-transparent">
        {/* 좌측 상단 헤더 타이틀: 장혁준 Jang Hyukjun ( 카테고리 형태 */}
        <h2 id="index-title" className="text-[15px] font-normal tracking-tight">
          <span lang="ko">장혁준</span> Jang Hyukjun ( <span lang="ko">{title?.ko || '찾아보기'}</span> {title?.en || 'Index'}
        </h2>

        {/* 우측 상단 (Close) 닫기 버튼 */}
        <button
          type="button"
          onClick={onClose}
          className="hover:opacity-50 ml-auto cursor-pointer"
        >
          (Close)
        </button>
      </header>

      {/* 썸네일 그리드 */}
      <div className="grid grid-cols-2 gap-x-0 gap-y-12 md:grid-cols-4 lg:grid-cols-7 md:gap-x-0 md:gap-y-16 pt-8 items-end">
        {projects.map((project, i) => {
          // 연계 이미지 전환 기능 제거, 대표 이미지만 단일 사용
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
              {/* 이미지 영역: 기본 흑백(grayscale), 호버 시 컬러(group-hover:grayscale-0) */}
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
              <div className="mt-1 text-xs text-left">
                <span>{String(i + 1).padStart(2, '0')}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}