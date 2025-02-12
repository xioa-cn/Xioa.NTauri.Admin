interface BlogSection {
    type: 'section'
    title: string
    content: BlogContent[]
}

interface BlogContent {
    type: 'image-grid' | 'warning' | 'link' | 'list' | 'info' | 'text' | 'code'
    title?: string
    image?: string
    content?: string
    text?: string
    url?: string
    description?: string
    items?: string[]
}

import type { Block } from "@/types/Blocktype"

export function useblogwritetocontentdata() {
    function todata(blocks: Block[],title:string ): BlogSection[] {
        // 创建默认的 section
        const defaultSection: BlogSection = {
            type: 'section',
            title: title,
            content: []
        }

        // 转换每个块
        blocks.forEach(block => {
            switch (block.type) {
                case 'image':
                    defaultSection.content.push({
                        type: 'image-grid',
                        title: block.alt || '',
                        image: block.content
                    })
                    break
                
                case 'warning':
                    defaultSection.content.push({
                        type: 'warning',
                        content: block.content
                    })
                    break
                
                case 'link':
                    defaultSection.content.push({
                        type: 'link',
                        text: block.content,
                        url: block.url || '#'
                    })
                    break
                
                case 'list':
                    defaultSection.content.push({
                        type: 'list',
                        description: block.content,
                        items: block.items || []
                    })
                    break
                
                case 'info':
                    defaultSection.content.push({
                        type: 'info',
                        content: block.content
                    })
                    break
                
                case 'text':
                    defaultSection.content.push({
                        type: 'text',
                        content: block.content
                    })
                    break
                
                case 'code':
                    defaultSection.content.push({
                        type: 'code',
                        content: block.content
                    })
                    break
            }
        })

        return [defaultSection]
    }

    return {
        todata
    }
}