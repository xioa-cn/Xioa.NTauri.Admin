import { ref } from 'vue'
import usePostMessage from '@/ntauri/usePostMessage'

export function useWebViewWindow() {
    const isMaximized = ref(false)

    // 最小化窗口
    const handleMinimize = async () => {
        usePostMessage("minWindow", null);
    }



    // 最大化/还原窗口
    const handleMaximize = async () => {
        if (isMaximized.value) {
            usePostMessage("normalWindow", null);
        } else {
            usePostMessage("maxWindow", null);
        }
        isMaximized.value = !isMaximized.value;


    }

    // 关闭窗口
    const handleClose = async () => {
        usePostMessage("closeWindow", null);
    }

    return {
        isMaximized,
        handleMinimize,
        handleMaximize,
        handleClose
    }
}
