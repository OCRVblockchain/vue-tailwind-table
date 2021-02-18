import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/index.css'

import '@ocrv/vue-tailwind-tabs/styles'
import '@ocrv/vue-tailwind-pagination/styles'

let app=createApp(App)
app.mount('#app')