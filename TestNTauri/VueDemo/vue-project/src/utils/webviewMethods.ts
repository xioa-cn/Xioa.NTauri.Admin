import { useRoot } from '@/hooks/useRoot';

const root = useRoot();

export function webviewInvoke<TResult>(className: string, methodName: string, params: any): TResult {
    if (root.value) {
        return window.chrome.webview.hostObjects.sync[className][methodName]
            (JSON.stringify(params)) as TResult;
    } else {
        return ({
            success: true,
            message: '请在主应用中使用',
            data: null
        } as TResult);
    }
}
