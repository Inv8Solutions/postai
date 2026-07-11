import { createApp } from 'vue'
import './style.css'
import AppShell from './AppShell.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import { initAuthListener } from './plugins/authListener'

const app = createApp(AppShell)
const pinia = createPinia()

app.use(pinia)
initAuthListener()

app.use(router).mount('#app')
