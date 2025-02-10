import { useBannerStore } from '@/stores/bannerstore'

export function useChangeBannerStore() {
    const bannerStore = useBannerStore()

    function changeBannerStore(value: boolean) {
        console.log('changeBannerStore', bannerStore.$state.banner)
        bannerStore.setBanner(value)
        console.log('changeBannerStore', bannerStore.$state.banner)
    }


    return {
        changeBannerStore
    }
}
