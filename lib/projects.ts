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
  titleKo?: string
  year?: string
  descriptionKo?: string
}

const rawImageList: RawItem[] = [
  // --- d.01 (d.0) ---
  { 
    series: ['Graphic Design/d.0.jpg', 'Graphic Design/d.0a.jpg'], 
    category: 'design',
    titleKo: '(제목)',
    year: '(연도)',
    descriptionKo: '(설명)'
  },

  // --- d.02 (d.1) ---
  { 
    series: ['Graphic Design/d.1.jpg', 'Graphic Design/d.1a.jpg'], 
    category: 'design',
    titleKo: '(제목)',
    year: '(연도)',
    descriptionKo: '(설명)'
  },

  // --- d.03 (d.2) : 작성해주신 상세 설명 적용 ---
  { 
    series: ['Graphic Design/d.2.jpg', 'Graphic Design/d.2a.jpg', 'Graphic Design/d.2b.mp4'], 
    category: 'design',
    titleKo: '간바테 ~ (여기 제목) (섭제목)',
    year: '2026 (작업 연도)',
    descriptionKo: '(매체) 책, 디지털 프린팅, 무선제본, 120×155mm, 148p.\n\n(작업설명) 2026년 군산 북페어, 달리며 응원을 모았다. 간바리ㅡ휴릭년이다.'
  },

  // --- d.04 ~ d.13 ---
  { series: ['Graphic Design/d.3.jpg', 'Graphic Design/d.3a.jpg'], category: 'design', titleKo: '(제목)', year: '(연도)', descriptionKo: '(설명)' },
  { filename: 'Graphic Design/d.4.jpg', category: 'design', titleKo: '(제목)', year: '(연도)', descriptionKo: '(설명)' },
  { filename: 'Graphic Design/d.5.jpg', category: 'design', titleKo: '(제목)', year: '(연도)', descriptionKo: '(설명)' },
  { filename: 'Graphic Design/d.6.jpg', category: 'design', titleKo: '(제목)', year: '(연도)', descriptionKo: '(설명)' },
  { filename: 'Graphic Design/d.7.jpg', category: 'design', titleKo: '(제목)', year: '(연도)', descriptionKo: '(설명)' },
  { filename: 'Graphic Design/d.8.jpg', category: 'design', titleKo: '(제목)', year: '(연도)', descriptionKo: '(설명)' },
  { series: ['Graphic Design/d.9.jpg', 'Graphic Design/d.9a.jpg'], category: 'design', titleKo: '(제목)', year: '(연도)', descriptionKo: '(설명)' },
  { filename: 'Graphic Design/d.10.jpg', category: 'design', titleKo: '(제목)', year: '(연도)', descriptionKo: '(설명)' },
  { filename: 'Graphic Design/d.11.jpg', category: 'design', titleKo: '(제목)', year: '(연도)', descriptionKo: '(설명)' },
  { filename: 'Graphic Design/d.12.jpg', category: 'design', titleKo: '(제목)', year: '(연도)', descriptionKo: '(설명)' },

  // --- 사진(Photography) 카테고리 ---
  { filename: 'vadsc.jpg', category: 'photography', titleKo: '(제목)', year: '(연도)', descriptionKo: '(설명)' },
  { filename: '3f.jpg', category: 'photography', titleKo: '(제목)', year: '(연도)', descriptionKo: '(설명)' },
  { filename: '1.jpg', category: 'photography', titleKo: '(제목)', year: '(연도)', descriptionKo: '(설명)' },
  { filename: '666.jpg', category: 'photography', titleKo: '(제목)', year: '(연도)', descriptionKo: '(설명)' },
  { filename: 'vdvs.jpg', category: 'photography', titleKo: '(제목)', year: '(연도)', descriptionKo: '(설명)' },
  { filename: '_5.jpg', category: 'photography', titleKo: '(제목)', year: '(연도)', descriptionKo: '(설명)' },
  { filename: 'ccc.jpg', category: 'photography', titleKo: '(제목)', year: '(연도)', descriptionKo: '(설명)' },
  { filename: 'vscd.jpg', category: 'photography', titleKo: '(제목)', year: '(연도)', descriptionKo: '(설명)' },
  { filename: '3.jpg', category: 'photography', titleKo: '(제목)', year: '(연도)', descriptionKo: '(설명)' },
  { filename: 'cvdccc.jpg', category: 'photography', titleKo: '(제목)', year: '(연도)', descriptionKo: '(설명)' },
  { filename: '2.jpg', category: 'photography', titleKo: '(제목)', year: '(연도)', descriptionKo: '(설명)' },
  { filename: 'f.jpg', category: 'photography', titleKo: '(제목)', year: '(연도)', descriptionKo: '(설명)' },
  { filename: '6.jpg', category: 'photography', titleKo: '(제목)', year: '(연도)', descriptionKo: '(설명)' },
  { filename: 'v.jpg', category: 'photography', titleKo: '(제목)', year: '(연도)', descriptionKo: '(설명)' },
  { filename: 'vddd.jpg', category: 'photography', titleKo: '(제목)', year: '(연도)', descriptionKo: '(설명)' },
  { series: ['fdsv.jpg', 'vdsdcsa.jpg'], category: 'photography', titleKo: '(제목)', year: '(연도)', descriptionKo: '(설명)' },
]

const projectData: Omit<Project, 'maxWidth' | 'aspectRatio'>[] = rawImageList.map((item, idx) => {
  const numStr = String(idx + 1).padStart(2, '0')
  const isSeries = Boolean(item.series && item.series.length > 0)
  const mainImage = isSeries ? `/projects/img/${item.series![0]}` : `/projects/img/${item.filename}`
  const seriesImages = isSeries ? item.series!.map((f) => `/projects/img/${f}`) : undefined

  return {
    slug: `project-${numStr}`,
    title: item.titleKo || numStr,
    titleKo: item.titleKo || numStr,
    number: numStr,
    category: item.category,
    year: item.year || '2026',
    description: item.descriptionKo || '(설명)',
    descriptionKo: item.descriptionKo || '(설명)',
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