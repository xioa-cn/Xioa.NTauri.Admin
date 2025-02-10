import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMessage } from 'naive-ui';
import type { LoginParams, LoginClass, LoginResult } from '@/types/logintypes';
import { webviewInvoke } from '@/utils/webviewMethods';
import { getLoginSwitch } from '@/utils/loginswitch';
import { useUserStore } from "@/stores/userstore.ts";

export default function useLogin() {
    const message = useMessage();
    const router = useRouter();
    const loginParams = ref<LoginParams>({
        username: '',
        password: ''
    });
    const userStore = useUserStore();

    const login = () => {
        var result = webviewInvoke<LoginResult>("loginService", "Login", loginParams.value);
        userStore.setNowUser({
            account: 'xioa',
            name: 'xioa',
            auth: 'SVIP',
        })
        if (result?.success) {
            router.push(getLoginSwitch() as string);
        } else {
            message.error(result?.message);
        }
        message.success('登录成功');
    }


    const isLogin = ref(true);

    return {
        loginParams,
        login,
        isLogin,
    }
}
