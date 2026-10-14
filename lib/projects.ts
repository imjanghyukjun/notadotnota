export type Category = 'design' | 'photography'

export const categoryLabels: Record<Category, { ko: string; en: string }> = {
  design: { ko: '그래픽 디자인', en: 'Graphic Design' },
  photography: { ko: '사진', en: 'Photography' },
}

export type Project = {
  slug: string
  title: string
  titleKo: string
  category: Category
  year: string
  description: string
  descriptionKo: string
  image: string
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

const projectData: Omit<Project, 'maxWidth' | 'aspectRatio'>[] = [
  {
    slug: 'project-01',
    title: 'Project 01',
    titleKo: '작업물 01',
    category: 'design',
    year: '2026',
    description: 'Graphic design and visual identity work.',
    descriptionKo: '그래픽 디자인 및 시각 아이덴티티 작업.',
    image: '/projects/6-3613.jpg',
    alt: 'Project 01 image',
  },
  {
    slug: 'project-02',
    title: 'Project 02',
    titleKo: '작업물 02',
    category: 'photography',
    year: '2026',
    description: 'Photography archive.',
    descriptionKo: '사진 아카이브 작업.',
    image: '/projects/A7400401.jpg',
    alt: 'Project 02 image',
  },
  {
    slug: 'project-03',
    title: 'Project 03',
    titleKo: '작업물 03',
    category: 'photography',
    year: '2026',
    description: 'Photography archive.',
    descriptionKo: '사진 아카이브 작업.',
    image: '/projects/A7403978.jpg',
    alt: 'Project 03 image',
  },
  {
    slug: 'project-04',
    title: 'Project 04',
    titleKo: '작업물 04',
    category: 'design',
    year: '2026',
    description: 'Editorial and graphic design work.',
    descriptionKo: '편집 및 그래픽 디자인 작업.',
    image: '/projects/On-428.jpg',
    alt: 'Project 04 image',
  },
]

export const projects: Project[] = projectData.map((project, i) => ({
  ...project,
  ...LAYOUTS[i % LAYOUTS.length],
}))

/** Eight-home-slide loop for the narrow-width carousel. */
export const homeSlides: Project[] = [...projects, ...projects].slice(0, 8)