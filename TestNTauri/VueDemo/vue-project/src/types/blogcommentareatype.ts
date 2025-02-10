

export type Tags = 'VIP' | 'NOR' | 'SVIP' | 'NL'


export interface Comment {
    id: number
    avatar: string
    username: string
    date: string
    content: string
    tags: Tags[]
  }