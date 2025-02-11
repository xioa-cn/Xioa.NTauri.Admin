import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userstore'
export function useLoginout() {
    const router = useRouter()
    const userStore = useUserStore()
    const loginout = () => {
        userStore.setNowUser({})
        router.push('/')
    }

    return {
        loginout
    }
}
