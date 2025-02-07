import { ref } from 'vue';
import type { RegisterParams, RegisterResult } from '@/types/registertypes';
import { webviewInvoke } from '@/utils/webviewMethods';
import { useMessage } from 'naive-ui';

export function useRegister() {
    const message = useMessage();
    const registerParams = ref<RegisterParams>({
        username: '',
        password: '',
        email: '',
    });
    const registerUser = (): boolean => {
        var result = webviewInvoke<RegisterResult>("loginService", "Register", registerParams.value);
        if (result?.success) {
            message.success('注册成功');
            return true;
        } else {
            message.error('注册失败:' + result?.message);
            return false;
        }
    }
    const code = ref('');
    return {
        registerParams,
        code,
        registerUser
    }
}
