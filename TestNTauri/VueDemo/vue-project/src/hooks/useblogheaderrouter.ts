import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'

export function useBlogHeaderRouter() {
    const router = useRouter()
    const message = useMessage()

    const goRouter = (path: string) => {
        router.push(path)
    }

    return {
        goRouter
    }
}