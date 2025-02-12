
export interface Block {
    id: string
    type: 'text' | 'code' | 'image' | 'warning' | 'info' | 'link' | 'list'
    content: string
    url?: string
    alt?: string
    items?: string[]
}