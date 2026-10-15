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

// 1번: 000.jpg, 2번: vadsc.jpg (배경 이미지), 3번 이후: 사진/디자인 교차 및 재배치
const rawImageList: { filename?: string; series?: string[]; category: Category }[] = [
  // 01번: 디자인 000.jpg
  { filename: '000.jpg', category: 'design' },
  // 02번: 홈페이지 메인 배경 이미지 vadsc.jpg
  { filename: 'vadsc.jpg', category: 'photography' },

  // --- 03번 이후: 자유롭게 섞은 배치 ---
  { filename: '005.jpg', category: 'design' },
  { filename: '3f.jpg', category: 'photography' },
  { series: ['008_1.jpg', '008_2.jpg'], category: 'design' },
  { filename: '666.jpg', category: 'photography' },
  { filename: '001.jpg', category: 'design' },
  { filename: '1.jpg', category: 'photography' },
  { series: ['004_1.jpg', '004_2.jpg'], category: 'design' },
  { filename: 'vdvs.jpg', category: 'photography' },
  { filename: '007.jpg', category: 'design' },
  { filename: 'ccc.jpg', category: 'photography' },
  { filename: '002.jpg', category: 'design' },
  { filename: '_5.jpg', category: 'photography' },
  { series: ['0010_1.jpg', '0010_2.jpg'], category: 'design' },
  { filename: 'gd.jpg', category: 'photography' },
  { filename: '009.jpg', category: 'design' },
  { filename: 'vscd.jpg', category: 'photography' },
  { filename: '0011.jpg', category: 'design' },
  { filename: '3.jpg', category: 'photography' },
  { filename: '006.jpg', category: 'design' },
  { filename: 'cvdccc.jpg', category: 'photography' },
  { filename: '0012.jpg', category: 'design' },
  { filename: '2.jpg', category: 'photography' },
  { filename: '0016.jpg', category: 'design' },
  { filename: 'f.jpg', category: 'photography' },
  { filename: 'v.jpg', category: 'photography' },
  { filename: '6.jpg', category: 'photography' },
  { filename: 'dds.jpg', category: 'photography' },
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