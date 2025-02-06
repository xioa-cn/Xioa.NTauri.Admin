import type { App } from "vue";
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
import { createPinia } from 'pinia'
import router from '@/router'

export default function initializedComponents(app: App<Element>) {
    app.use(createPinia())
    app.use(router)
}