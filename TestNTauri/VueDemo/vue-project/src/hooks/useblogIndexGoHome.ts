import { useRouter } from 'vue-router'

export function useblogIndexGoHome() {
    const router = useRouter()
    const goHome = () => {
        router.push('/blog')
    }

    return {
        goHome
    }
}

