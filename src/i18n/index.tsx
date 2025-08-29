// src/i18n/index.ts
import { createI18n } from 'vue-i18n'

const FALLBACK = 'pt'
const saved = localStorage.getItem('lang') || navigator.language.slice(0, 2)
const initial = ['pt', 'en'].includes(saved) ? saved : FALLBACK

// Carga preguiçosa (lazy) por idioma
async function loadLocaleMessages(locale: string) {
  const msgs = await import(/* @vite-ignore */ `../locales/${locale}.json`)
  return msgs.default
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,       // permite usar $t diretamente no template
  locale: initial,
  fallbackLocale: FALLBACK,
  messages: {}                 // carregaremos sob demanda
})

// carrega inicial
export async function setupI18n() {
  i18n.global.setLocaleMessage(initial, await loadLocaleMessages(initial))
}

// troca de idioma em tempo real
export async function setLocale(locale: string) {
  if (!i18n.global.availableLocales.includes(locale)) {
    i18n.global.setLocaleMessage(locale, await loadLocaleMessages(locale))
  }
  i18n.global.locale.value = locale
  localStorage.setItem('lang', locale)
}

// (Opcional) Exporte os locales do PrimeVue p/ sincronizar no main.ts
export const primeLocalePT = {
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
  dateIs: 'Data é',
  dateIsNot: 'Data não é',
  dateBefore: 'Data antes de',
  dateAfter: 'Data após',
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
  // DataTable/Paginator
  emptyMessage: 'Nenhum registro encontrado.',
  emptyFilterMessage: 'Nenhum resultado.',
  chooseYear: 'Escolher ano',
  chooseMonth: 'Escolher mês',
  dayNames: ['domingo','segunda','terça','quarta','quinta','sexta','sábado'],
  dayNamesShort: ['dom','seg','ter','qua','qui','sex','sáb'],
  dayNamesMin: ['D','S','T','Q','Q','S','S'],
  monthNames: ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'],
  monthNamesShort: ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'],
  today: 'Hoje',
  weekHeader: 'Sm',
  weak: 'Fraco',
  medium: 'Médio',
  strong: 'Forte',
  passwordPrompt: 'Digite uma senha'
}

export const primeLocaleEN = {
  startsWith: 'Starts with',
  contains: 'Contains',
  notContains: 'Not contains',
  endsWith: 'Ends with',
  equals: 'Equals',
  notEquals: 'Not equals',
  noFilter: 'No filter',
  lt: 'Less than',
  lte: 'Less than or equal',
  gt: 'Greater than',
  gte: 'Greater than or equal',
  dateIs: 'Date is',
  dateIsNot: 'Date is not',
  dateBefore: 'Date before',
  dateAfter: 'Date after',
  clear: 'Clear',
  apply: 'Apply',
  matchAll: 'Match all',
  matchAny: 'Match any',
  addRule: 'Add rule',
  removeRule: 'Remove rule',
  accept: 'Yes',
  reject: 'No',
  choose: 'Choose',
  upload: 'Upload',
  cancel: 'Cancel',
  // DataTable/Paginator
  emptyMessage: 'No records found.',
  emptyFilterMessage: 'No results found.',
  chooseYear: 'Choose year',
  chooseMonth: 'Choose month',
  dayNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  dayNamesShort: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
  dayNamesMin: ['S','M','T','W','T','F','S'],
  monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  monthNamesShort: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  today: 'Today',
  weekHeader: 'Wk',
  weak: 'Weak',
  medium: 'Medium',
  strong: 'Strong',
  passwordPrompt: 'Enter a password'
}
