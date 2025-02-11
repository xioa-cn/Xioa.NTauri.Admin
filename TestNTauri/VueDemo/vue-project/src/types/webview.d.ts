// webview.d.ts
import type { LoginClass } from '@/types/logintypes';


declare global {
  interface Window {
    chrome: {
      webview: {
        hostObjects: {
          loginService: LoginClass
          [key: string]: any
        };
        postMessage(message: any): void;
        addEventListener(type: string, listener: (event: any) => void): void;
      };
    };
    PIXI: any;
  }
}
