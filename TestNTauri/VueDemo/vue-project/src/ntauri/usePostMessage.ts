interface IMesssage {
    message: string;
    type: string;
}

export default function usePostMessage(type: string, message: any): void {
    const data: IMesssage = {message : JSON.stringify(message), type};
    (window as any).chrome.webview.postMessage(JSON.stringify(data));
}