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
  alt?: string
}

type IndexOverlayProps = {
  open: boolean
  projects: Project[]
  onClose: () => void
  onSelect: (slug: string) => void
}

export function IndexOverlay({ open, projects, onClose, onSelect }: IndexOverlayProps) {
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
      className={`fixed inset-0 z-40 overflow-y-auto bg-white/90 px-4 pb-16 text-[15px] leading-snug transition-opacity duration-500 ease-out ${
        open ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <header className="flex items-center justify-between py-3">
        {/* 좌측 상단: 정보창과 동일한 타이틀 스타일 적용 */}
        <h2 id="index-title" className="text-[15px] font-normal tracking-tight">
          장혁준 Jang Hyukjun <span className="text-neutral-400">/</span> <span lang="ko">찾아보기</span> Index
        </h2>
        {/* PC와 모바일 모두 우측 상단에 노출되는 (Close) 버튼 */}
        <button
          type="button"
          onClick={onClose}
          className="hover:opacity-50 ml-auto cursor-pointer"
        >
          (Close)
        </button>
      </header>

      {/* 썸네일 그리드: 가로 폭 100% 채움, 원본 비율 그대로 자동 높이 조절 및 하단 정렬 */}
      <div className="grid grid-cols-2 gap-x-0 gap-y-12 md:grid-cols-4 lg:grid-cols-7 md:gap-x-0 md:gap-y-16 pt-8 items-end">
        {projects.map((project, i) => (
          <button
            key={project.slug}
            type="button"
            onClick={() => onSelect(project.slug)}
            className="group flex flex-col justify-end text-left w-full cursor-pointer"
          >
            {/* 잘림 없이 가로 폭을 채우고 원본 높이를 자동으로 유지 */}
            <div className="relative w-full overflow-hidden">
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.alt || project.title}
                  width={800}
                  height={1000}
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
                  className="h-auto w-full object-contain grayscale transition-all duration-500 ease-in-out group-hover:grayscale-0"
                />
              )}
            </div>
            {/* 하단 텍스트: 번호만 표시 및 좌측 정렬 */}
            <div className="mt-1 text-xs text-left">
              <span>{String(i + 1).padStart(2, '0')}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}