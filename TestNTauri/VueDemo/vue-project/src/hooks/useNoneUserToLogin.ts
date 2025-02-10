import { useUserStore } from '@/stores/userstore.ts'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
export function useNoneUserToLogin() {
    const userStore = useUserStore()
    const router = useRouter()
    const message = useMessage()
    const isCanReader = () => {
        if (!userStore.getNowUserState()) {
            router.push('/')
            message.error('请先登录')
        }
    }

    return {
        isCanReader,
    }

}