'use client'

import { useCallback, useState, useEffect } from 'react'
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

  // 순차적 색상 변화 애니메이션 상태 (0: 이름, 1: 사진, 2: 그래픽디자인, 3: 전체 5초 휴식 중)
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0)
  const [blinkCount, setBlinkCount] = useState<number>(0)
  const [isBlinking, setIsBlinking] = useState<boolean>(true)
  const [isWaitingBetweenItems, setIsWaitingBetweenItems] = useState<boolean>(false)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (panel === 'none' && !selectedProject) {
      if (isBlinking) {
        if (isWaitingBetweenItems) {
          // 항목과 항목 사이의 2초 휴식
          timer = setTimeout(() => {
            setIsWaitingBetweenItems(false)
          }, 2000)
        } else {
          timer = setTimeout(() => {
            // 각 항목별로 정확히 3번 깜빡이도록 설정 (0, 1, 2 총 3회)
            if (blinkCount < 2) {
              setBlinkCount(prev => prev + 1)
            } else {
              setBlinkCount(0)
              if (activeItemIndex < 2) {
                // 다음 항목으로 넘어가기 전 2초간 대기 상태로 진입
                setActiveItemIndex(prev => prev + 1)
                setIsWaitingBetweenItems(true)
              } else {
                // 모든 항목(이름, 사진, 그래픽디자인)이 끝났으면 5초 휴식 모드로 진입
                setIsBlinking(false)
              }
            }
          }, 700)
        }
      } else {
        // 모든 세트 종료 후 5초 휴식 후 처음(이름)부터 다시 재시작
        timer = setTimeout(() => {
          setActiveItemIndex(0)
          setBlinkCount(0)
          setIsWaitingBetweenItems(false)
          setIsBlinking(true)
        }, 5000)
      }
    }

    return () => clearTimeout(timer)
  }, [activeItemIndex, blinkCount, isBlinking, isWaitingBetweenItems, panel, selectedProject])

  const closeAll = useCallback(() => {
    setPanel('none')
    setSelectedProject(null)
  }, [])

  const closeDetail = useCallback(() => {
    setSelectedProject(null)
  }, [])

  const selectProject = useCallback((slug: string) => {
    const found = projects.find((p) => p.slug === slug)
    if (found) {
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

  const detailCategoryLabel =
    selectedProject?.category === 'photography' || panel === 'photography'
      ? { ko: '사진', en: 'Photography' }
      : { ko: '그래픽 디자인', en: 'Graphic Design' }

  // 녹색(rgb(0, 255, 0))과 기본 검정색이 번갈아 바뀌도록 스타일 및 클래스 부여
  const getBlinkStyle = (itemIdx: number) => {
    const isCurrentActive = isBlinking && !isWaitingBetweenItems && activeItemIndex === itemIdx
    // 짝수 타이밍일 때 녹색, 홀수일 때 검은색(기본)
    const isGreen = isCurrentActive && (blinkCount % 2 === 0)

    return {
      color: isGreen ? 'rgb(0, 255, 0)' : 'inherit',
      transition: 'color 0.5s ease',
    }
  }

  return (
    <>
      <main className="h-svh w-full overflow-hidden md:h-screen relative">
        <h1 className="sr-only">장혁준 Jang Hyukjun</h1>
        <HomeCarousel paused={panel !== 'none' || isDetailView} />

        {/* 1. 홈 화면 좌상단 고정 헤더 (PC 전용) */}
        {!isDetailView && panel === 'none' && (
          <header className="fixed inset-x-0 top-0 z-30 hidden md:flex items-start justify-between py-3 px-2 md:px-4 bg-transparent mix-blend-difference text-white leading-snug pointer-events-none">
            <h2 className="text-[15px] font-normal tracking-normal pointer-events-auto pr-2">
              <button
                type="button"
                onClick={() => setPanel('about')}
                className="hover:opacity-50 transition-opacity cursor-pointer inline text-white font-normal"
              >
                <span lang="ko">장혁준</span> Jang Hyukjun
              </button>
              {' ( '}
              <button
                type="button"
                onClick={() => setPanel('photography')}
                className="hover:opacity-50 transition-opacity cursor-pointer inline text-white font-normal"
              >
                <span lang="ko">사진</span> Photography
              </button>
              {' ( '}
              <button
                type="button"
                onClick={() => setPanel('design')}
                className="hover:opacity-50 transition-opacity cursor-pointer inline text-white font-normal"
              >
                <span lang="ko">그래픽 디자인</span> Graphic Design
              </button>
              {' ( '}
              <a href={`mailto:${EMAIL}`} className="hover:opacity-50 transition-opacity text-white font-normal">
                {EMAIL}
              </a>
              {' ( '}
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity text-white font-normal">
                instagram@{INSTAGRAM_HANDLE}
              </a>
            </h2>
          </header>
        )}

        {/* 2. 사진/그래픽 디자인 인덱스 오버레이 */}
        <IndexOverlay
          open={panel === 'photography' || panel === 'design'}
          projects={filteredProjects}
          title={overlayTitle}
          onClose={closeAll}
          onSelect={selectProject}
        />

        {/* 3. 50:50 분할 디테일 오버레이 패널 */}
        <div
          className={`fixed inset-0 z-50 bg-white/97 transition-opacity duration-300 ease-out ${
            isDetailView ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden={!isDetailView}
        >
          {isDetailView && (
            <>
              <header className="fixed inset-x-0 top-0 z-50 flex items-start justify-between py-3 px-2 md:px-4 bg-transparent mix-blend-difference text-white leading-snug pointer-events-none">
                <h2 className="text-[15px] font-normal tracking-normal pointer-events-auto pr-2">
                  <button 
                    type="button" 
                    onClick={closeAll}
                    className="hover:opacity-50 transition-opacity cursor-pointer inline text-white font-normal"
                  >
                    <span lang="ko">장혁준</span> Jang Hyukjun
                  </button>
                  {' ( '}
                  <button
                    type="button"
                    onClick={() => {
                      const targetCategory = selectedProject?.category || (panel === 'photography' ? 'photography' : 'design')
                      setSelectedProject(null)
                      setPanel(targetCategory)
                    }}
                    className="hover:opacity-50 transition-opacity cursor-pointer inline text-white font-normal"
                  >
                    <span lang="ko">{detailCategoryLabel.ko}</span> {detailCategoryLabel.en}
                  </button>
                  {' ( '}
                  <span>{selectedProject.titleKo || selectedProject.title}</span>
                </h2>
                <button 
                  type="button"
                  onClick={closeDetail}
                  className="hover:opacity-50 ml-auto cursor-pointer text-[15px] font-normal leading-snug text-white pointer-events-auto shrink-0"
                >
                  (Close)
                </button>
              </header>

              <div className="w-full h-full grid grid-cols-1 md:grid-cols-2">
                <div 
                  className="hidden md:block w-full h-full bg-white/97 cursor-pointer"
                  onClick={closeDetail}
                />
                <div className="w-full h-full overflow-y-auto bg-white/97 border-l border-gray-100/50 pt-0">
                  <ProjectDetailPanel
                    title={selectedProject.titleKo || selectedProject.title}
                    year={selectedProject.year || "2026"}
                    spec="120×155mm, 148p, 무선제본"
                    client="Client Name / Publisher"
                    description={selectedProject.descriptionKo || selectedProject.description || "2026년 프로젝트 상세 설명 및 더미 텍스트입니다. 달리며 응원을 모았다."}
                    images={selectedProject.series && selectedProject.series.length > 0 ? selectedProject.series : [selectedProject.image]}
                    onClose={closeDetail}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* 4. 홈 화면 중앙 메인 메뉴 바 */}
      {!isDetailView && panel === 'none' && (
        <div className="pointer-events-none fixed inset-x-0 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center px-4 text-center text-[15px] leading-snug">
          {/* 데스크톱(PC) 레이아웃 */}
          <div className="pointer-events-auto hidden bg-background px-0.5 text-balance md:block font-normal">
            <button 
              type="button" 
              onClick={() => { setSelectedProject(null); setPanel('about'); }} 
              style={getBlinkStyle(0)}
              className="cursor-pointer underline underline-offset-4 decoration-1 decoration-transparent hover:decoration-current hover:opacity-70"
            >
              <span lang="ko">장혁준</span> Jang Hyukjun
            </button>{' '}
            ({' '}
            <button 
              type="button" 
              onClick={() => { setSelectedProject(null); setPanel('photography'); }} 
              style={getBlinkStyle(1)}
              className="cursor-pointer underline underline-offset-4 decoration-1 decoration-transparent hover:decoration-current hover:opacity-70"
            >
              <span lang="ko">사진</span> Photography
            </button>{' '}
            ({' '}
            <button 
              type="button" 
              onClick={() => { setSelectedProject(null); setPanel('design'); }} 
              style={getBlinkStyle(2)}
              className="cursor-pointer underline underline-offset-4 decoration-1 decoration-transparent hover:decoration-current hover:opacity-70"
            >
              <span lang="ko">그래픽 디자인</span> Graphic Design
            </button>{' '}
            ({' '}
            <a href={`mailto:${EMAIL}`} className="hover:opacity-50 transition-opacity underline underline-offset-4 decoration-transparent hover:decoration-current">
              {EMAIL}
            </a>{' '}
            ({' '}
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity underline underline-offset-4 decoration-transparent hover:decoration-current">
              instagram@{INSTAGRAM_HANDLE}
            </a>
          </div>

          {/* 모바일 레이아웃 */}
          <div className="pointer-events-auto flex items-center justify-center text-[12px] leading-none md:hidden">
            <div className="inline-block bg-background px-0.5 py-0.5 whitespace-nowrap leading-none">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedProject(null)
                  setPanel('about')
                }}
                style={getBlinkStyle(0)}
                className="inline cursor-pointer underline underline-offset-4 decoration-1 decoration-transparent hover:decoration-current"
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
                style={getBlinkStyle(1)}
                className="inline cursor-pointer underline underline-offset-4 decoration-1 decoration-transparent hover:decoration-current"
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
                style={getBlinkStyle(2)}
                className="inline cursor-pointer underline underline-offset-4 decoration-1 decoration-transparent hover:decoration-current"
              >
                <span lang="ko">그래픽 디자인</span> Graphic Design
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 어바웃 오버레이 */}
      <AboutOverlay open={panel === 'about'} onClose={closeAll} />
    </>
  )
}