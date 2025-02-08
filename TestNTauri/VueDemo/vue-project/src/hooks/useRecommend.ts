import { ref } from 'vue'
import type { RecommendType } from '@/types/recommendtype'

export function useRecommend() {
    const recommendList = ref<RecommendType[]>([
        {
            title: 'POETIZE - 文档导航与网站美化',
            date: '2025-02-08 08:36:03',
            image: '/rem.jpg'
        },
        {
            title: 'POETIZE - 部署文档和资源',
            date: '2025-02-08 09:52:41',
            image: '/rem.jpg'
        },
        {
            title: 'POETIZE - 完整版',
            date: '2025-02-08 13:48:56',
            image: '/rem.jpg'
        }
    ])
    return {
        recommendList
    }
}
