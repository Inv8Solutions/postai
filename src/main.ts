import { createApp } from 'vue'
import './style.css'
import AppShell from './AppShell.vue'
import router from './router/index'
import { createPinia } from 'pinia'

const pinia = createPinia()
createApp(AppShell).use(pinia).use(router).mount('#app')

