import { useRouter } from 'vue-router'

export function useLookBlog() {
    const router = useRouter()
    const goBlogContent = (blogId: number) => {
        router.push(`/blog/content?id=${blogId}`)
    }


    return {
        goBlogContent
    }
}

