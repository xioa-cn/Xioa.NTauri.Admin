// bridge.ts
class WebViewBridge {
    private static instance: WebViewBridge;
    private callbacks: Map<string, (data: any) => void>;
  
    private constructor() {
      this.callbacks = new Map();
      this.initMessageListener();
    }
  
    static getInstance(): WebViewBridge {
      if (!WebViewBridge.instance) {
        WebViewBridge.instance = new WebViewBridge();
      }
      return WebViewBridge.instance;
    }
  
    private initMessageListener() {
      var chrome = (window as any).chrome;
      chrome.webview.addEventListener('message', (event: any) => {
        const { type, data, callbackId } = event.data;
        if (callbackId && this.callbacks.has(callbackId)) {
          this.callbacks.get(callbackId)!(data);
          this.callbacks.delete(callbackId);
        }
      });
    }
  
    async invoke<T>(methodName: string, params?: any): Promise<T> {
      return new Promise((resolve, reject) => {
        const callbackId = Date.now().toString();
        
        this.callbacks.set(callbackId, resolve);
        
        var chrome = (window as any).chrome;
        chrome.webview.postMessage({
          type: methodName,
          params,
          callbackId
        });
  
        // 设置超时
        setTimeout(() => {
          if (this.callbacks.has(callbackId)) {
            this.callbacks.delete(callbackId);
            reject(new Error('调用超时'));
          }
        }, 5000);
      });
    }
  }
  export default WebViewBridge;
 
  