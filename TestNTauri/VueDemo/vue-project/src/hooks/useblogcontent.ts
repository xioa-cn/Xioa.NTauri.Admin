import type { BlogContentTitle } from '@/types/blogcontenttitletype'
import { ref } from 'vue'

export function useBlogContent() {
    const blogContentTitle = ref<BlogContentTitle>({
        title: '',
        author: '',
        date: '',
        views: 0,
        likes: 0,
        comments: 0
    });

    const getBlogContentTitle = async (blogId: string) => {
        blogContentTitle.value = {
            title: 'XIOA - 文档',
            author: 'XIOA',
            date: '2024-06-04 08:36:03',
            views: 1387,
            likes: 102,
            comments: 4
        }
    }


    return {
        blogContentTitle,
        getBlogContentTitle
    }

}
