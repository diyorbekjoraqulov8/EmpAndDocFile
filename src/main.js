// Sass
import '@/assets/sass/style.scss'
// Pinia
import { createPinia } from 'pinia'

const pinia = createPinia()

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// router
import router from "./router";

const app = createApp(App)

registerPlugins(app)

app.use(router)
app.use(pinia)
app.mount('#app')
