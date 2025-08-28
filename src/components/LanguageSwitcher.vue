<template>
  <Dropdown
    v-model="locale"
    :options="languages"
    optionLabel="label"
    optionValue="value"
    @change="changeLanguage"
    style="width: 150px"
  />
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import Dropdown from 'primevue/dropdown'

const { locale } = useI18n()

const languages = [
  { label: 'Português', value: 'pt' },
  { label: 'English', value: 'en' }
]

function changeLanguage(event) {
  locale.value = event.value
}
</script>
