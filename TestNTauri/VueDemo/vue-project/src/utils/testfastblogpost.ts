import type { BlogPost } from '@/types/blogfastpost'
import { ref } from 'vue'

export const posts = ref<BlogPost[]>([
    {
        id: 1,
        date: '2025-02-09',
        title: 'Vue 3.5 新特性',
        subtitle: '全新版本 VUE 使用',
        viewCount: 3,
        category: '技术博客',
        coverImage: '/2.jpg'
    },
    {
        id: 2,
        date: '2025-01-05',
        title: 'WPF + NTauri 开发',
        subtitle: 'NTauri 初体验',
        viewCount: 53,
        category: '技术博客',
        coverImage: '/0.jpg'
    },
    {
        id: 2,
        date: '2025-01-05',
        title: '如何优雅导入TS',
        subtitle: 'Typescript 使用',
        viewCount: 53,
        category: '技术博客',
        coverImage: '/6.jpg'
    },
    {
        id: 2,
        date: '2025-01-05',
        title: 'C# 13 版本',
        subtitle: '新增特性记录',
        viewCount: 53,
        category: '技术博客',
        coverImage: '/9.jpg'
    }
])