interface IMesssage {
    message: string;
    type: string;
}

export default function usePostMessage(type: string, message: any): void {
    const data: IMesssage = { message: JSON.stringify(message), type };

    var chrome = (window as any).chrome;
    if (chrome && chrome.webview) {
        chrome.webview.postMessage(JSON.stringify(data));
    }
}