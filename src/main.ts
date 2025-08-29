// src/main.ts
import { createApp, watch } from 'vue'
import App from './App.vue'
import router from './router'

// PrimeVue
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

// CSS global do projeto
import './index.css'

// i18n unificado
import { i18n, setupI18n, primeLocaleEN, primeLocalePT } from './i18n'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(i18n)

await setupI18n()

// Sincroniza o locale do PrimeVue (Calendar, DataTable, etc.)
function syncPrimeLocale(lang: string) {
  const cfg = app.config.globalProperties.$primevue?.config
  if (cfg) cfg.locale = lang === 'pt' ? primeLocalePT : primeLocaleEN
}

// Inicial + reatividade na troca
syncPrimeLocale(i18n.global.locale.value)
watch(i18n.global.locale, (lang) => syncPrimeLocale(lang))

app.mount('#app')
