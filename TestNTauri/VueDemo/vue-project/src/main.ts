import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import initializedComponents from './utils/initialzedComponents'

const app = createApp(App)

initializedComponents(app)

app.mount('#app')
