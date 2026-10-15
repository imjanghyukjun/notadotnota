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

  // 인덱스에서 프로젝트를 클릭했을 때: 오버레이를 닫고 선택된 프로젝트 패널을 염
  const selectProject = useCallback((slug: string) => {
    const found = projects.find((p) => p.slug === slug)
    if (found) {
      setPanel('none')
      setSelectedProject(found)
    }
  }, [])

  // 패널 상태에 따른 프로젝트 필터링
  const filteredProjects =
    panel === 'photography'
      ? projects.filter((p) => p.category === 'photography')
      : panel === 'design'
      ? projects.filter((p) => p.category === 'design')
      : projects

  // 패널 상태에 따른 오버레이 타이틀
  const overlayTitle =
    panel === 'photography'
      ? { ko: '사진', en: 'Photography' }
      : { ko: '그래픽 디자인', en: 'Graphic Design' }

  // Cargo 스타일 50:50 분할 모드인지 여부 (프로젝트가 선택되었을 때)
  const isDetailView = selectedProject !== null

  return (
    <>
      {/* PC 화면 50:50 분할 레이아웃 적용 */}
      <main className={`h-svh w-full overflow-hidden md:h-screen grid ${isDetailView ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
        {/* 좌측 영역 (50%): 메인 홈 슬라이드 또는 고정 화면 */}
        <div className="w-full h-full overflow-hidden relative">
          <h1 className="sr-only">장혁준 Jang Hyukjun</h1>
          <HomeCarousel paused={panel !== 'none' || isDetailView} />
        </div>

        {/* 우측 영역 (50%): Cargo 스타일 프로젝트 상세 패널 (선택되었을 때만 노출) */}
        {isDetailView && (
          <div className="w-full h-full overflow-y-auto border-l border-gray-100 bg-white">
            <ProjectDetailPanel
              title={selectedProject.titleKo || selectedProject.title}
              year={selectedProject.year || "2026"}
              spec="120×155mm, 148p, 무선제본"
              client="Client Name / Publisher"
              description={selectedProject.descriptionKo || selectedProject.description || "2026년 프로젝트 상세 설명 및 더미 텍스트입니다. 달리며 응원을 모았다. 콜렉션 아카이브."}
              images={selectedProject.series ? selectedProject.series : [selectedProject.image]}
              onClose={() => setSelectedProject(null)}
            />
          </div>
        )}
      </main>

      {/* 중앙 메인 메뉴 바 */}
      <div className="pointer-events-none fixed inset-x-0 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center px-4 text-center text-[15px] leading-snug">
        {/* 데스크톱(PC) 레이아웃 */}
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

        {/* 모바일/좁은 화면 레이아웃 */}
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