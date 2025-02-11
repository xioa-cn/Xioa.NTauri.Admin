
import {ref} from 'vue';
import {webviewInvoke} from "@/utils/webviewMethods.ts";
export function useWPFHeader() {
    const header = ref<string>('')
    header.value = webviewInvoke<string>("HeaderService","GetHeader",null)
    
    return {
        header,
    }
}