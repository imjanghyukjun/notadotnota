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
  mediaKo?: string
  descriptionKo?: string
}

const rawImageList: RawItem[] = [
  // --- 그래픽 디자인 (d.0 ~ d.6) ---
  { 
    series: ['Graphic Design/d.0.jpg', 'Graphic Design/d.0a.jpg'], 
    category: 'design',
    titleKo: '명함',
    year: '2026',
    descriptionKo: ''
  },
  { 
    series: ['Graphic Design/d.1.jpg', 'Graphic Design/d.1a.jpg'], 
    category: 'design',
    titleKo: '간바레 Ganbare ガンバレ！',
    year: '2026',
    mediaKo: '책, 디지털 프린팅, 무선제본, 120×155mm, 148p.',
    descriptionKo: '2026년 교토 마라톤을 달리며 응원을 모았다. 간바레-콜렉션이다.'
  },
  { 
    series: ['Graphic Design/d.2.jpg', 'Graphic Design/d.2a.jpg', 'Graphic Design/d.2b.mp4'], 
    category: 'design',
    titleKo: '몸을 건너는 몸 Crossing Bodies',
    year: '2026',
    mediaKo: '책, 디지털 프린팅, 무선제본, 135x210mm, 292p.',
    descriptionKo: '콜렉티브 매듭 Collective Maedeup의 전시 《몸을 건너는 몸 Crossing Bodies》과 연계하여 출판되었다.'
  },
  { 
    series: ['Graphic Design/d.3.jpg', 'Graphic Design/d.3a.jpg'], 
    category: 'design',
    titleKo: '몸을 건너는 몸 Crossing Bodies',
    year: '2026',
    mediaKo: '리플렛, 디지털 프린팅, 3단 접지, 140x297mm.',
    descriptionKo: '전시 《몸을 건너는 몸 Crossing Bodies》의 리플렛이다.'
  },
  { 
    filename: 'Graphic Design/d.4.jpg', 
    category: 'design',
    titleKo: '몸을 건너는 몸 Crossing Bodies',
    year: '2026',
    mediaKo: '포스터, 디지털 프린팅, 420x594mm.',
    descriptionKo: '전시 《몸을 건너는 몸 Crossing Bodies》의 포스터이다.'
  },
  { 
    filename: 'Graphic Design/d.5.jpg', 
    category: 'design',
    titleKo: '리핏 데님 Refit Denim',
    year: '2026',
    mediaKo: '포스터, fluo print(UV10), 420x594mm.',
    descriptionKo: '파쇄된 원단 조각이 투입되어 실로 짜이기 전까지의 재생 공정 도면. [1]: 원단 조각(‘리핏 데님’에는 데님 폐기물 40%가 포함된다)을 투입한다. [2]~[9]: 낙면(솜 부스러기, 리핏의 재료로서 질감을 형성한다)이 발생한다. [리핏 데님]: 섬유 가공 부산물로 만들어진 재생지, 비목재지다.\n\n《페이퍼 바이 페이퍼 2026》는 두성종이와 바인엑스트라칼라, 그리고 16명의 참여 디자이너가 함께하는 전시입니다. 참여 디자이너는 두성종이 인더페이퍼의 종이를 탐색하고 선정한 뒤, 참여자 간 공유의 과정을 통해 새 종이를 부여받아 관련 정서와 정보를 차용해 하나의 포스터를 완성하게 됩니다.'
  },
  { 
    filename: 'Graphic Design/d.6.jpg', 
    category: 'design',
    titleKo: '문단',
    year: '2026',
    mediaKo: '포스터',
    descriptionKo: '문단과 포스터는 대체로 어려움 없이 읽히기 위해 설계된다는 점에서, 또 저마다 다른 내용과 모양을 갖는다는 점에서 상당 부분 서로 닮아 있다. 문단 하나는 그 자체로 한 장의 포스터가 될 수 있다.\n\n《책으로부터》는 《책의 자리》의 연계 프로그램으로, 책의 형태를 고민해 온 26인의 그래픽 디자이너가 ‘책을 이루는 것은 무엇인가’라는 질문에 답하는 포스터 전시다. 디자이너들은 표지, 여백, 본문 등 책을 이루는 요소를 각자의 경험으로 바라보고 저마다의 시각 언어로 다시 해석한다. 책을 만드는 이들의 시선을 따라, 우리는 익숙했던 책의 모습을 다시 들여다본다.'
  },

  // --- 그래픽 디자인 (d.7 ~ d.12) ---
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

let designCount = 0
let photoCount = 0

const projectData: Omit<Project, 'maxWidth' | 'aspectRatio'>[] = rawImageList.map((item, idx) => {
  const isSeries = Boolean(item.series && item.series.length > 0)
  const firstPath = isSeries ? item.series![0] : item.filename!

  const fileNameOnly = firstPath.split('/').pop() || ''
  const match = fileNameOnly.match(/d\.(\d+)/)

  let numStr = ''
  if (item.category === 'design' && match) {
    numStr = String(match[1]).padStart(2, '0')
  } else {
    const currentCount = item.category === 'design' ? designCount++ : photoCount++
    numStr = String(currentCount).padStart(2, '0')
  }

  const mainImage = `/projects/img/${firstPath}`
  const seriesImages = isSeries ? item.series!.map((f) => `/projects/img/${f}`) : undefined

  // mediaKo와 descriptionKo를 순수하게 연결 (템플릿 문자열 원천 차단)
  const fullDescription = [
    item.mediaKo,
    item.descriptionKo
  ].filter(Boolean).join('\n\n')

  return {
    slug: `project-${idx}`,
    title: item.titleKo || '',
    titleKo: item.titleKo || '',
    number: numStr,
    category: item.category,
    year: item.year || '',
    description: fullDescription,
    descriptionKo: fullDescription,
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