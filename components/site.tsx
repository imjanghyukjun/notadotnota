'use client'

import { useCallback, useState } from 'react'
import { projects, Project } from '@/lib/projects'
import { EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/lib/contact'
import { IndexOverlay } from '@/components/index-overlay'
import { AboutOverlay } from '@/components/about-overlay'
import { HomeCarousel } from '@/components/home-carousel'
import ProjectDetailPanel from '@/components/project-detail-panel'

type Panel = 'none' | 'photography' | 'design' | 'about'

export function Site() {
  const [panel, setPanel] = useState<Panel>('none')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const closePanel = useCallback(() => {
    setPanel('none')
    setSelectedProject(null)
  }, [])

  const selectProject = useCallback((slug: string) => {
    const found = projects.find((p) => p.slug === slug)
    if (found) {
      setPanel('none')
      setSelectedProject(found)
    }
  }, [])

  const filteredProjects =
    panel === 'photography'
      ? projects.filter((p) => p.category === 'photography')
      : panel === 'design'
      ? projects.filter((p) => p.category === 'design')
      : projects

  const overlayTitle =
    panel === 'photography'
      ? { ko: '사진', en: 'Photography' }
      : { ko: '그래픽 디자인', en: 'Graphic Design' }

  const isDetailView = selectedProject !== null

  return (
    <>
      <main className={`h-svh w-full overflow-hidden md:h-screen grid ${isDetailView ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
        {/* 좌측 영역 (50%): 상세 패널이 열려있을 땐 여백용 흰색 배경, 평소엔 메인 캐러셀 */}
        <div className="w-full h-full overflow-hidden relative bg-white">
          <h1 className="sr-only">장혁준 Jang Hyukjun</h1>
          {!isDetailView && (
            <HomeCarousel paused={panel !== 'none'} />
          )}
        </div>

        {/* 우측 영역 (50%): 프로젝트 상세 패널 */}
        {isDetailView && (
          <div className="w-full h-full overflow-y-auto bg-white">
            <ProjectDetailPanel
              title={selectedProject.titleKo || selectedProject.title}
              year={selectedProject.year || "2026"}
              spec="120×155mm, 148p, 무선제본"
              client="Client Name / Publisher"
              description={selectedProject.descriptionKo || selectedProject.description || "2026년 프로젝트 상세 설명 및 더미 텍스트입니다. 달리며 응원을 모았다."}
              images={selectedProject.series && selectedProject.series.length > 0 ? selectedProject.series : [selectedProject.image]}
              onClose={() => setSelectedProject(null)}
            />
          </div>
        )}
      </main>

      {/* 중앙 메인 메뉴 바 */}
      <div className="pointer-events-none fixed inset-x-0 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center px-4 text-center text-[15px] leading-snug">
        <div className="pointer-events-auto hidden bg-background px-0.5 text-balance md:block font-normal">
          <button type="button" onClick={() => { setSelectedProject(null); setPanel('about'); }} className="hover:opacity-50">
            <span lang="ko">장혁준</span> Jang Hyukjun
          </button>{' '}
          ({' '}
          <button type="button" onClick={() => { setSelectedProject(null); setPanel('photography'); }} className="hover:opacity-50">
            <span lang="ko">사진</span> Photography
          </button>{' '}
          ({' '}
          <button type="button" onClick={() => { setSelectedProject(null); setPanel('design'); }} className="hover:opacity-50">
            <span lang="ko">그래픽 디자인</span> Graphic Design
          </button>{' '}
          ({' '}
          <a href={`mailto:${EMAIL}`} className="hover:opacity-50">
            {EMAIL}
          </a>{' '}
          ({' '}
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:opacity-50">
            instagram@{INSTAGRAM_HANDLE}
          </a>
        </div>

        <div className="pointer-events-auto flex items-center justify-center text-[12px] leading-none md:hidden">
          <div className="inline-block bg-background px-0.5 py-0.5 whitespace-nowrap leading-none">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedProject(null)
                setPanel('about')
              }}
              className="hover:opacity-50 inline"
            >
              <span lang="ko">장혁준</span> Jang Hyukjun
            </button>{' '}
            ({' '}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedProject(null)
                setPanel('photography')
              }}
              className="hover:opacity-50 inline"
            >
              <span lang="ko">사진</span> Photography
            </button>{' '}
            ({' '}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedProject(null)
                setPanel('design')
              }}
              className="hover:opacity-50 inline"
            >
              <span lang="ko">그래픽 디자인</span> Graphic Design
            </button>
          </div>
        </div>
      </div>

      <footer className="fixed bottom-3 left-4 z-50 hidden text-xs leading-tight md:block">
        <p>
          <span lang="ko">장혁준</span> Jang Hyukjun
        </p>
        <p className="text-muted-foreground">All Rights Reserved {'©'} 2026</p>
      </footer>

      <IndexOverlay
        open={panel === 'photography' || panel === 'design'}
        projects={filteredProjects}
        title={overlayTitle}
        onClose={closePanel}
        onSelect={selectProject}
      />
      <AboutOverlay open={panel === 'about'} onClose={closePanel} />
    </>
  )
}