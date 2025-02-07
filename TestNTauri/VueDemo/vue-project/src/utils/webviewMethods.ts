


export function webviewInvoke<TResult>(className: string, methodName: string, params: any): TResult  {
    return (window as any).chrome.webview.hostObjects.sync[className][methodName]
    (JSON.stringify(params)) as TResult;
}
