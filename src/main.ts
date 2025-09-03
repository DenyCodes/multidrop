// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'

import { createI18n } from 'vue-i18n'
import pt from './locales/pt.json'
import en from './locales/en.json'

// ===== Locale do PrimeVue (inclui fileSizeTypes) =====
const primeLocale = {
  startsWith: 'Começa com',
  contains: 'Contém',
  notContains: 'Não contém',
  endsWith: 'Termina com',
  equals: 'Igual',
  notEquals: 'Diferente',
  noFilter: 'Sem filtro',
  lt: 'Menor que',
  lte: 'Menor ou igual',
  gt: 'Maior que',
  gte: 'Maior ou igual',
  dateIs: 'Data igual',
  dateIsNot: 'Data diferente',
  dateBefore: 'Antes de',
  dateAfter: 'Depois de',
  clear: 'Limpar',
  apply: 'Aplicar',
  matchAll: 'Corresponder a todos',
  matchAny: 'Corresponder a qualquer',
  addRule: 'Adicionar regra',
  removeRule: 'Remover regra',
  accept: 'Sim',
  reject: 'Não',
  choose: 'Escolher',
  upload: 'Enviar',
  cancel: 'Cancelar',
  completed: 'Concluído',
  // <- Campo obrigatório no tipo PrimeVueLocaleOptions
  fileSizeTypes: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],

  dayNames: ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'],
  dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
  dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  monthNames: [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
  ],
  monthNamesShort: [
    'jan',
    'fev',
    'mar',
    'abr',
    'mai',
    'jun',
    'jul',
    'ago',
    'set',
    'out',
    'nov',
    'dez',
  ],
  today: 'Hoje',
  weekHeader: 'Sem',
  firstDayOfWeek: 1,
  dateFormat: 'dd/mm/yy',

  weak: 'Fraca',
  medium: 'Média',
  strong: 'Forte',
  passwordPrompt: 'Digite uma senha',

  emptyFilterMessage: 'Nenhum resultado encontrado',
  emptyMessage: 'Sem opções disponíveis',
}

// ===== i18n em modo legacy para permitir $t no template =====
const i18n = createI18n({
  legacy: true, // <-- habilita API legacy
  globalInjection: true, // <-- injeta $t / $tc globalmente
  locale: 'pt',
  fallbackLocale: 'en',
  messages: { pt, en },
})

const app = createApp(App)
app.use(router)
app.use(PrimeVue, { ripple: true, locale: primeLocale })
app.use(i18n)
app.mount('#app')
