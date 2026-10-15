'use client'

import { useCallback, useState } from 'react'
import { projects } from '@/lib/projects'
import { EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/lib/contact'
import { IndexOverlay } from '@/components/index-overlay'
import { AboutOverlay } from '@/components/about-overlay'
import { HomeCarousel } from '@/components/home-carousel'

type Panel = 'none' | 'photography' | 'design' | 'about'

export function Site() {
  const [panel, setPanel] = useState<Panel>('none')
  const closePanel = useCallback(() => setPanel('none'), [])

  const selectProject = useCallback((slug: string) => {
    setPanel('none')
    requestAnimationFrame(() => {
      document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
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

  return (
    <>
      <main className="h-svh w-full overflow-hidden md:h-screen">
        <h1 className="sr-only">장혁준 Jang Hyukjun</h1>
        <HomeCarousel paused={panel !== 'none'} />
      </main>

      <div className="pointer-events-none fixed inset-x-0 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center px-4 text-center text-[15px] leading-snug">
        {/* 데스크톱(PC) 레이아웃 */}
        <div className="pointer-events-auto hidden bg-background px-0.5 text-balance md:block font-normal">
          <button type="button" onClick={() => setPanel('about')} className="hover:opacity-50">
            <span lang="ko">장혁준</span> Jang Hyukjun
          </button>{' '}
          ({' '}
          <button type="button" onClick={() => setPanel('photography')} className="hover:opacity-50">
            <span lang="ko">사진</span> Photography
          </button>{' '}
          ({' '}
          <button type="button" onClick={() => setPanel('design')} className="hover:opacity-50">
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
        <div className="pointer-events-auto flex flex-col items-center gap-1.5 text-[12px] leading-none md:hidden">
          {/* 1줄: 장혁준 Jang Hyukjun ( 사진 Photography */}
          <div className="inline-block bg-background px-0.5 py-0.5 whitespace-nowrap leading-none">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
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
                setPanel('photography')
              }}
              className="hover:opacity-50 inline"
            >
              <span lang="ko">사진</span> Photography
            </button>
          </div>

          {/* 2줄: ( 그래픽 디자인 Graphic Design ( 메일 ( 인스타그램 ) */}
          <div className="inline-block bg-background px-0.5 py-0.5 whitespace-nowrap leading-none">
            ({' '}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setPanel('design')
              }}
              className="hover:opacity-50 inline"
            >
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