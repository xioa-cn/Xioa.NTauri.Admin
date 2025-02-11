import { useRoot } from '@/hooks/useRoot';

const root = useRoot();

let isOpenWeb: boolean | undefined = true

function nonewebViewInovke<TResult>(className: string, methodName: string, params: any): TResult {
    if (isOpenWeb) {
        if (methodName === "GetHeader") {
            return "NTAURI*WEB" as TResult
        }
    }
    return ({
        success: isOpenWeb,
        message: '请在主应用中使用',
        data: null
    } as TResult);
}

export function webviewInvoke<TResult>(className: string, methodName: string, params: any): TResult {
    if (root.value) {
        if (params === null || typeof params === undefined) {
            return window.chrome.webview.hostObjects.sync[className][methodName]
                () as TResult;
        }

        return window.chrome.webview.hostObjects.sync[className][methodName]
            (JSON.stringify(params)) as TResult;
    } else {
        return nonewebViewInovke<TResult>(className, methodName, params);
    }
}
