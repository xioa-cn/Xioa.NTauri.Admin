import { ref } from 'vue'
import type { BlogPost } from '@/types/blogPosttype'

export function useRecommend() {
    const recommendList = ref<BlogPost[]>([
        {
            id: '1',
            title: 'XIOA - 文档导航与网站美化',
            date: '2025-02-08 08:36:03',
            image: '/rem.jpg'
        },
        {
            id: '2',
            title: 'XIOA - 部署文档和资源',
            date: '2025-02-08 09:52:41',
            image: '/rem.jpg'
        },
        {
            id: '3',
            title: 'XIOA - 完整版',
            date: '2025-02-08 13:48:56',
            image: '/rem.jpg'
        }
    ])
    return {
        recommendList
    }
}
