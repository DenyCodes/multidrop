<template>
  <Dropdown
    v-model="model"
    :options="languages"
    optionLabel="label"
    optionValue="value"
    class="w-40"
    aria-label="Language selector"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Dropdown from 'primevue/dropdown'
import { setLocale } from '@/i18n' // <- usa a função que carrega mensagens e persiste

const { locale } = useI18n()

// Proxy do v-model para o i18n + persistência/lazy-load
const model = computed<'pt' | 'en'>({
  get: () => (locale.value === 'en' ? 'en' : 'pt'),
  set: async (val) => { await setLocale(val) }
})

const languages = [
  { label: 'Português', value: 'pt' },
  { label: 'English', value: 'en' }
]
</script>
