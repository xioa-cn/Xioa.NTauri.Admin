interface IMesssage {
    message: string;
    type: string;
}

export default function usePostMessage(type: string, message: any): void {
    const data: IMesssage = { message: JSON.stringify(message), type };

    let chrome = window.chrome;
    if (chrome && chrome.webview) {
        chrome.webview.postMessage(JSON.stringify(data));
    }
}