import { createApp } from 'vue'
import './style.css'
import AppShell from './AppShell.vue'
import router from './router/index'

createApp(AppShell).use(router).mount('#app')
