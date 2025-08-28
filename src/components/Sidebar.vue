<template>
  <aside
    :class="[
      'h-screen bg-[#0B0B0B] text-gray-200 flex flex-col transition-all duration-300',
      collapsed ? 'w-24' : 'w-64',
    ]"
  >
    <!-- Header -->
    <div class="flex items-center px-4 h-16 border-b border-gray-800">
      <!-- Botão toggle sempre à esquerda -->
      <button @click="toggleCollapse" class="p-2 hover:bg-gray-800 rounded">
        <i class="pi pi-bars text-xl"></i>
      </button>

      <!-- Logo só aparece quando expandido -->
      <div v-if="!collapsed" class="flex items-center space-x-2 ml-3">
        <img src="/logo.png" alt="Multidrop" class="h-8 w-auto" />
      </div>
    </div>

    <!-- Menu -->
    <nav class="flex-1 px-2 py-6 space-y-1">
      <!-- Dashboard -->
      <router-link
        to="/dashboard"
        class="flex items-center gap-4 px-3 py-3 rounded-lg"
        :class="
          isActive('/dashboard')
            ? 'bg-[#1A1A1A] text-green-500 font-medium'
            : 'hover:bg-gray-800 text-gray-300'
        "
      >
        <i class="pi pi-chart-bar text-lg w-6 text-center"></i>
        <span v-if="!collapsed" class="whitespace-nowrap">Dashboard</span>
      </router-link>

      <!-- Marketplace -->
      <router-link
        to="/marketplace"
        class="flex items-center gap-4 px-3 py-3 rounded-lg"
        :class="
          isActive('/marketplace')
            ? 'bg-[#1A1A1A] text-green-500 font-medium'
            : 'hover:bg-gray-800 text-gray-300'
        "
      >
        <i class="pi pi-shopping-cart text-lg w-6 text-center"></i>
        <span v-if="!collapsed" class="whitespace-nowrap">Marketplace</span>
      </router-link>

      <!-- Products -->
      <router-link
        to="/produtos"
        class="flex items-center gap-4 px-3 py-3 rounded-lg"
        :class="
          isActive('/produtos')
            ? 'bg-[#1A1A1A] text-green-500 font-medium'
            : 'hover:bg-gray-800 text-gray-300'
        "
      >
        <i class="pi pi-box text-lg w-6 text-center"></i>
        <span v-if="!collapsed" class="whitespace-nowrap">Products</span>
      </router-link>

      <!-- TAO -->
      <router-link
        to="/refund"
        class="flex items-center gap-4 px-3 py-3 rounded-lg border border-green-500 text-green-500 mt-4"
      >
        <i class="pi pi-graduation-cap text-lg w-6 text-center"></i>
        <div v-if="!collapsed">
          <p class="font-semibold">REEMBOLSO</p>
          <span class="text-xs text-gray-400">REEMBOLSO</span>
        </div>
      </router-link>
    </nav>

    <!-- Footer -->
    <div class="px-2 py-4 border-t border-gray-800 space-y-1">
      <router-link
        to="/planos"
        class="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-gray-800 text-gray-300"
        :class="isActive('/planos') ? 'bg-[#1A1A1A] text-green-500 font-medium' : ''"
      >
        <i class="pi pi-credit-card text-lg w-6 text-center"></i>
        <span v-if="!collapsed">Planos</span>
      </router-link>

      <router-link
        to="/support"
        class="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-gray-800 text-gray-300"
        :class="isActive('/support') ? 'bg-[#1A1A1A] text-green-500 font-medium' : ''"
      >
        <i class="pi pi-question-circle text-lg w-6 text-center"></i>
        <span v-if="!collapsed">Support</span>
      </router-link>

      <router-link
        to="/settings"
        class="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-gray-800 text-gray-300"
        :class="isActive('/settings') ? 'bg-[#1A1A1A] text-green-500 font-medium' : ''"
      >
        <i class="pi pi-cog text-lg w-6 text-center"></i>
        <span v-if="!collapsed">Settings</span>
      </router-link>

      <!-- User -->
      <div class="flex items-center gap-3 mt-6 p-3 rounded-lg bg-[#1A1A1A]">
        <img
          src="https://randomuser.me/api/portraits/men/68.jpg"
          class="h-10 w-10 rounded-full"
        />
        <div v-if="!collapsed">
          <p class="text-sm font-medium">Denis Oliveira</p>
          <span class="text-xs text-gray-400">Desenvolvedor</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import 'primeicons/primeicons.css' // ✅ Import necessário para os ícones

const collapsed = ref(false)
const route = useRoute()

const toggleCollapse = () => {
  collapsed.value = !collapsed.value
}

const isActive = (path) => {
  return route.path.startsWith(path)
}
</script>
