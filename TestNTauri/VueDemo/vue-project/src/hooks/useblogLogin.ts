import { useRouter } from "vue-router"

export function useblogLogin() {
    const router = useRouter()

    const gologin = () => {
        router.push('/')
    }

    return {
        gologin
    }
}