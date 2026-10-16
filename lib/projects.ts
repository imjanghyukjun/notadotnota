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

const rawImageList: { filename?: string; series?: string[]; category: Category }[] = [
  // --- d.0.jpg를 첫 번째로 두어 홈 화면 배경 대표 이미지로 고정 (---.jpg 삭제) ---
  { filename: 'Graphic Design/d.0.jpg', category: 'design' },
  { series: ['Graphic Design/d.1.jpg', 'Graphic Design/d.1a.jpg'], category: 'design' },
  { series: ['Graphic Design/d.2.jpg', 'Graphic Design/d.2a.jpg'], category: 'design' },
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

  // --- 기존 사진(Photography) 항목들 유지 ---
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

const projectData: Omit<Project, 'maxWidth' | 'aspectRatio'>[] = rawImageList.map((item, idx) => {
  const numStr = String(idx + 1).padStart(2, '0')
  const isSeries = Boolean(item.series && item.series.length > 0)
  const mainImage = isSeries ? `/projects/img/${item.series![0]}` : `/projects/img/${item.filename}`
  const seriesImages = isSeries ? item.series!.map((f) => `/projects/img/${f}`) : undefined

  return {
    slug: `project-${numStr}`,
    title: numStr,
    titleKo: numStr,
    number: numStr,
    category: item.category,
    year: '2026',
    description: '',
    descriptionKo: '',
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