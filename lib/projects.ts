export type Category = 'design' | 'photography'

export const categoryLabels: Record<Category, { ko: string; en: string }> = {
  design: { ko: '그래픽 디자인', en: 'Graphic Design' },
  photography: { ko: '사진', en: 'Photography' },
}

export type Project = {
  slug: string
  title: string
  titleKo: string
  number: string
  category: Category
  year: string
  description: string
  descriptionKo: string
  image: string
  series?: string[]
  alt: string
  maxWidth: number
  aspectRatio: string
}

const LAYOUTS: Pick<Project, 'maxWidth' | 'aspectRatio'>[] = [
  { maxWidth: 1120, aspectRatio: '4 / 5' },
  { maxWidth: 1240, aspectRatio: '3 / 2' },
  { maxWidth: 1040, aspectRatio: '1 / 1' },
  { maxWidth: 1180, aspectRatio: '16 / 10' },
]

type RawItem = {
  filename?: string
  series?: string[]
  category: Category
}

const rawImageList: RawItem[] = [
  // --- 그래픽 디자인 (d.0 ~ d.12) ---
  { series: ['Graphic Design/d.0.jpg', 'Graphic Design/d.0a.jpg'], category: 'design' },
  { series: ['Graphic Design/d.1.jpg', 'Graphic Design/d.1a.jpg'], category: 'design' },
  { series: ['Graphic Design/d.2.jpg', 'Graphic Design/d.2a.jpg', 'Graphic Design/d.2b.mp4'], category: 'design' },
  { series: ['Graphic Design/d.3.jpg', 'Graphic Design/d.3a.jpg'], category: 'design' },
  { filename: 'Graphic Design/d.4.jpg', category: 'design' },
  { filename: 'Graphic Design/d.5.jpg', category: 'design' },
  { filename: 'Graphic Design/d.6.jpg', category: 'design' },
  { filename: 'Graphic Design/d.7.jpg', category: 'design' },
  { filename: 'Graphic Design/d.8.jpg', category: 'design' },
  { series: ['Graphic Design/d.9.jpg', 'Graphic Design/d.9a.jpg'], category: 'design' },
  { filename: 'Graphic Design/d.10.jpg', category: 'design' },
  { filename: 'Graphic Design/d.11.jpg', category: 'design' },
  { filename: 'Graphic Design/d.12.jpg', category: 'design' },

  // --- 사진 (Photography) ---
  { filename: 'vadsc.jpg', category: 'photography' },
  { filename: '3f.jpg', category: 'photography' },
  { filename: '1.jpg', category: 'photography' },
  { filename: '666.jpg', category: 'photography' },
  { filename: 'vdvs.jpg', category: 'photography' },
  { filename: '_5.jpg', category: 'photography' },
  { filename: 'ccc.jpg', category: 'photography' },
  { filename: 'vscd.jpg', category: 'photography' },
  { filename: '3.jpg', category: 'photography' },
  { filename: 'cvdccc.jpg', category: 'photography' },
  { filename: '2.jpg', category: 'photography' },
  { filename: 'f.jpg', category: 'photography' },
  { filename: '6.jpg', category: 'photography' },
  { filename: 'v.jpg', category: 'photography' },
  { filename: 'vddd.jpg', category: 'photography' },
  { series: ['fdsv.jpg', 'vdsdcsa.jpg'], category: 'photography' },
]

// 카테고리별 인덱스 카운터
let designCount = 0
let photoCount = 0

const projectData: Omit<Project, 'maxWidth' | 'aspectRatio'>[] = rawImageList.map((item, idx) => {
  const isSeries = Boolean(item.series && item.series.length > 0)
  const firstPath = isSeries ? item.series![0] : item.filename!

  // 파일 경로에서 파일명 추출 (예: 'Graphic Design/d.0.jpg' -> 'd.0.jpg')
  const fileNameOnly = firstPath.split('/').pop() || ''
  
  // 파일명에서 숫자 부분 추출 (예: 'd.0.jpg' -> '0', 'd.10.jpg' -> '10')
  const match = fileNameOnly.match(/d\.(\d+)/)

  let numStr = ''
  if (item.category === 'design' && match) {
    // 파일명에 d.0, d.1 등이 있으면 해당 숫자를 두 자리 포맷(00, 01, 02)으로 사용
    numStr = String(match[1]).padStart(2, '0')
  } else {
    // 그 외 파일명은 카테고리 순서대로 00, 01, 02 순번 부여
    const currentCount = item.category === 'design' ? designCount++ : photoCount++
    numStr = String(currentCount).padStart(2, '0')
  }

  const mainImage = `/projects/img/${firstPath}`
  const seriesImages = isSeries ? item.series!.map((f) => `/projects/img/${f}`) : undefined

  return {
    slug: `project-${idx}`,
    title: '(제목)',
    titleKo: '(제목)',
    number: numStr,
    category: item.category,
    year: '(연도)',
    description: '(설명)',
    descriptionKo: '(설명)',
    image: mainImage,
    series: seriesImages,
    alt: `Project ${numStr}`,
  }
})

export const projects: Project[] = projectData.map((project, i) => ({
  ...project,
  ...LAYOUTS[i % LAYOUTS.length],
}))

export const homeSlides: Project[] = [...projects, ...projects].slice(0, 8)