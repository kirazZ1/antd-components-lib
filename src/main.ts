import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import store, { key } from '@/store'


createApp(App).use(store,key).use(router).mount('#app')
