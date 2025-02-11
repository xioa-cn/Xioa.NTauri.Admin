import { ref, onMounted } from 'vue'
import { useUserStore } from "@/stores/userstore.ts";

export function useBlogHeaderShow() {
    const isShowAvatar = ref<boolean>(false)

    const userStore = useUserStore()

    onMounted(() => {
        let temp = userStore.getNowUserState();
        if (temp === undefined) {
            isShowAvatar.value = false;
        } else if (temp !== undefined) {
            isShowAvatar.value = temp as boolean;
        }

    })

    return {
        isShowAvatar,
    }

}