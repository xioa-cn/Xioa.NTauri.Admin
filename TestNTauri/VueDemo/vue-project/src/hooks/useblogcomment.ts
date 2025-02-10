import { ref } from 'vue'
import type { Comment } from '@/types/blogcommentareatype'
import { commentsdata } from '@/utils/blogcontentcomment'
export function useBlogComment() {
    const comments = ref<Comment[]>(commentsdata)
    const loading = ref(false)

    const handleSubmitComment = (content: string) => {
        console.log(content)
    }

    return {
        comments,
        loading,
        handleSubmitComment
    }
}
