import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMessage } from 'naive-ui';
import type { LoginParams, LoginClass, LoginResult } from '@/types/logintypes';
import { webviewInvoke } from '@/utils/webviewMethods';
import { getLoginSwitch } from '@/utils/loginswitch';

export default function useLogin() {
    const message = useMessage();
    const router = useRouter();
    const loginParams = ref<LoginParams>({
        username: '',
        password: ''
    });

    const login = () => {
        message.success('登录成功');

        var result = webviewInvoke<LoginResult>("loginService", "Login", loginParams.value);
        if (result?.success) {
            router.push(getLoginSwitch() as string);
        } else {
            message.error(result?.message);
        }


    }


    const isLogin = ref(true);

    return {
        loginParams,
        login,
        isLogin,
    }
}
