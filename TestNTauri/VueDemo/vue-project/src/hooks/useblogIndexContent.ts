
import { ref } from 'vue'
import type { BlogPost } from '@/types/blogPosttype'
import { blogIndexData } from '@/utils/blogIndexData'

export function useBlogIndexContent() {
    const blogPosts = ref<BlogPost[]>(blogIndexData)

    const getBlogPosts = (): void => {
        // 获取首页推荐博客列表
        console.log('获取首页推荐博客列表')
    };



    return {
        blogPosts,
        getBlogPosts
    }
}
