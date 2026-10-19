'use client'

import React from 'react'
import { Project } from '@/lib/projects'

interface IndexOverlayProps {
  open: boolean
  projects: Project[]
  title: { ko: string; en: string }
  onClose: () => void
  onSelect: (slug: string) => void
}

export function IndexOverlay({
  open,
  projects,
  title,
  onClose,
  onSelect,
}: IndexOverlayProps) {
  return (
    <div
      className={`fixed inset-0 z-50 bg-white/97 transition-opacity duration-300 ease-out ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!open}
    >
      {open && (
        <>
          {/* 최상단 헤더 영역에 mix-blend-difference 적용 */}
          <header className="fixed inset-x-0 top-0 z-50 flex items-start justify-between py-3 px-2 md:px-4 bg-transparent mix-blend-difference text-white leading-snug pointer-events-none">
            <h2 className="text-[15px] font-normal tracking-normal pointer-events-auto pr-2">
              <button 
                type="button" 
                onClick={onClose}
                className="hover:opacity-50 transition-opacity cursor-pointer inline text-white font-normal"
              >
                <span lang="ko">장혁준</span> Jang Hyukjun
              </button>
              {' ( '}
              <span className="inline text-white font-normal">
                <span lang="ko">{title.ko}</span> {title.en}
              </span>
            </h2>
            <button 
              type="button"
              onClick={onClose}
              className="hover:opacity-50 ml-auto cursor-pointer text-[15px] font-normal leading-snug text-white pointer-events-auto shrink-0"
            >
              (Close)
            </button>
          </header>

          {/* 인덱스 목록 영역 */}
          <div className="w-full h-full overflow-y-auto pt-16 pb-12 px-2 md:px-4 cursor-default">
            <div className="flex flex-col space-y-2">
              {projects.map((project, idx) => {
                const projectPrefix = project.category === 'photography' ? 'p' : 'd'
                const displayNum = `${projectPrefix}.${project.number}`
                
                return (
                  <button
                    key={project.slug}
                    type="button"
                    onClick={() => onSelect(project.slug)}
                    className="flex items-baseline justify-between text-left hover:opacity-50 transition-opacity cursor-pointer text-[15px] leading-snug text-black"
                  >
                    <span>
                      {project.titleKo || project.title}
                      {project.year ? ` (${project.year})` : ''}
                    </span>
                    <span className="shrink-0 ml-4">{displayNum}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}