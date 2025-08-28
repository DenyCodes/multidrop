import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import { createI18n } from 'vue-i18n'
import pt from './locales/pt.json'
import en from './locales/en.json'
import router from './router'
import './index.css'

// CSS PrimeVue
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const i18n = createI18n({
  legacy: false,
  globalInjection: true, // 👈 precisa disso p/ usar $t diretamente
  locale: 'pt',
  fallbackLocale: 'en',
  messages: { pt, en },
})

const app = createApp(App)
app.use(PrimeVue)
app.use(router)
app.use(i18n)
app.mount('#app')
