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
  series?: string[] // 시리즈 이미지 목록 지원
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

// 기존 이미지들: 'photography', 스크린샷 속 파일들: 'design'
const rawImageList: { filename?: string; series?: string[]; category: Category }[] = [
  // --- 기존에 있던 이미지들 (사진 photography) ---
  { filename: 'vadsc.jpg', category: 'photography' },
  { filename: '666.jpg', category: 'photography' },
  { filename: '3f.jpg', category: 'photography' },
  { filename: 'vdvs.jpg', category: 'photography' },
  { filename: '1.jpg', category: 'photography' },
  { filename: 'ccc.jpg', category: 'photography' },
  { filename: '4.jpg', category: 'photography' },
  { filename: '_5.jpg', category: 'photography' },
  { filename: 'gd.jpg', category: 'photography' },
  { filename: 'vscd.jpg', category: 'photography' },
  { filename: '3.jpg', category: 'photography' },
  { filename: 'cvdccc.jpg', category: 'photography' },
  { filename: '2.jpg', category: 'photography' },
  { filename: 'f.jpg', category: 'photography' },
  { filename: 'v.jpg', category: 'photography' },
  { filename: '6.jpg', category: 'photography' },
  { filename: 'dds.jpg', category: 'photography' },
  { filename: 'vddd.jpg', category: 'photography' },
  { series: ['fdsv.jpg', 'vdsdcsa.jpg'], category: 'photography' },

  // --- 스크린샷 속 파일들 (그래픽 디자인 design) ---
  { filename: '000.jpg', category: 'design' },
  { filename: '001.jpg', category: 'design' },
  { filename: '002.jpg', category: 'design' },
  { series: ['004_1.jpg', '004_2.jpg'], category: 'design' },
  { filename: '005.jpg', category: 'design' },
  { filename: '006.jpg', category: 'design' },
  { filename: '007.jpg', category: 'design' },
  { series: ['008_1.jpg', '008_2.jpg'], category: 'design' },
  { filename: '009.jpg', category: 'design' },
  { series: ['0010_1.jpg', '0010_2.jpg'], category: 'design' },
  { filename: '0011.jpg', category: 'design' },
  { filename: '0012.jpg', category: 'design' },
  { filename: '0016.jpg', category: 'design' },
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