import './assets/main.css'
import { createPinia } from 'pinia' // 导入 Pinia
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App)
	.use(createPinia())
	.use(router)
	.use(ElementPlus)
	.mount('#app')
