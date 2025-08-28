<template>
  <header class="p-4 flex justify-between items-center shadow-md bg-white">
    <!-- Logo -->
    <div class="flex items-center gap-2">
      <h2 class="text-xl font-bold">Multidrop</h2>
    </div>

    <!-- Navegação -->
    <nav class="flex gap-6 items-center">
      <RouterLink to="/" class="hover:underline">
        {{ $t('menu.home') }}
      </RouterLink>
      <RouterLink to="/afiliacoes" class="hover:underline">
        {{ $t('menu.affiliations') }}
      </RouterLink>
      <RouterLink to="/contato" class="hover:underline">
        {{ $t('menu.contact') }}
      </RouterLink>
    </nav>

    <!-- Troca de idioma -->
    <LanguageSwitcher />
  </header>
</template>

<script setup>
import LanguageSwitcher from './LanguageSwitcher.vue'
import { RouterLink } from 'vue-router'
</script>

<style scoped>
header {
  border-bottom: 1px solid #e5e7eb;
}
</style>
