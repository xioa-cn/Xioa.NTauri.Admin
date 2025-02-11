import { type RouteLocationNormalizedLoaded } from 'vue-router';
import { ref } from 'vue';

export function useBlogShowHb() {
    const localBanner = ref<boolean>(true)
    const localFooter = ref<boolean>(true)
    function shouldAnimate(route: RouteLocationNormalizedLoaded) {
        console.log(route.path)
        if (route.path === '/blog' || route.path.includes('/blog/content')
            || route.path.includes('/blog/ha-')) {
            localBanner.value = true
            localFooter.value = true

            return true
        } else {
            localBanner.value = false
            localFooter.value = false
            if (route.path === "/blog/main") {
                localFooter.value = true
            }
            return true
        }
    }

    return {
        localBanner,
        localFooter,
        shouldAnimate
    }
}
