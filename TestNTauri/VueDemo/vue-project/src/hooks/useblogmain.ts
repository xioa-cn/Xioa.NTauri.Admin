import { ref, watch } from 'vue'
import { useMessage } from 'naive-ui'
import type { BlogPost } from '@/types/blogfastpost'
import { blogposts } from '@/utils/testblogmainposts'

export function useBlogMain() {
    const searchText = ref('')
    const message = useMessage()
    const serposts = ref<BlogPost[]>([])
    // 显示标签
    const blogtags = ref<string>('推荐')

    // 随机获取6条数据
    const getserposts = () => {
        // 复制原数组，避免修改原数据
        const tempPosts = [...blogposts]
        // Fisher-Yates 洗牌算法
        for (let i = tempPosts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tempPosts[i], tempPosts[j]] = [tempPosts[j], tempPosts[i]]
        }
        // 取前6条数据
        serposts.value = tempPosts.slice(0, 6)
    }

    // 搜索
    const handleSearch = () => {
        if (searchText.value) {
            blogtags.value = '搜索:' + searchText.value
            // 根据标题和副标题搜索
            serposts.value = blogposts
                .filter(post => 
                    post.title.toLowerCase().includes(searchText.value.toLowerCase()) ||
                    post.subtitle.toLowerCase().includes(searchText.value.toLowerCase())
                )
                .slice(0, 6)
        } else {
            message.error('请输入搜索内容')
        }
    }

    // 博客标签点击
    const handleClick = (type: string) => {
        blogtags.value = type
        getserposts();
    }
    getserposts();
    return {
        blogtags,
        searchText,
        handleSearch,
        handleClick,
        serposts
    }
}
