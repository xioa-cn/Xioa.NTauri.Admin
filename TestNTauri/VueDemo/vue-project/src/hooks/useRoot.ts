import { ref, onMounted } from 'vue';

export function useRoot() {
    const root = ref<boolean>(getRoot())
    function getRoot(): boolean {
        if (window.chrome.webview) {
            return true;
        } else {
            return false;
        }
    }
    return root;
}
