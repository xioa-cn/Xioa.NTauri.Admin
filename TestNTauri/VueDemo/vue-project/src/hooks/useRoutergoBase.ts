import { useRouter } from 'vue-router'

export function useRoutergoBase() {
    const router = useRouter()

    // 返回上一个路由
    const goBack = () => {
        router.back()
    }

    // 如果需要返回指定步数
    const goBackStep = (step: number = -1) => {
        router.go(step)
    }

    return {
        goBack,
        goBackStep
    }
}
