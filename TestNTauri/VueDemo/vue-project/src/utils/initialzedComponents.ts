import type { App } from "vue";
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
import { createPinia } from 'pinia'
import router from '@/router'
import '@/assets/font.css';
import '@/assets/main.css';

// 禁用滚轮缩放
document.addEventListener('wheel', (e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
    }
}, { passive: false })

// 禁用键盘缩放快捷键
document.addEventListener('keydown', (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=')) {
        e.preventDefault()
    }
}, { passive: false })


export default function initializedComponents(app: App<Element>) {
    app.use(createPinia())
    app.use(router)
}