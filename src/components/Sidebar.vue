<template>
  <aside
    :class="[
      'h-screen bg-[#111111] text-gray-200 flex flex-col transition-all duration-300',
      collapsed ? 'w-24' : 'w-64'
    ]"
  >
    <!-- Header -->
    <div class="flex items-center px-4 h-16 border-b border-gray-800">
      <!-- Botão toggle sempre à esquerda -->
      <button
        @click="toggleCollapse"
        class="p-2 hover:bg-gray-800 rounded"
      >
        <i class="pi pi-bars text-xl"></i>
      </button>

      <!-- Logo só aparece quando expandido -->
      <div v-if="!collapsed" class="flex items-center space-x-2 ml-3">
        <img src="/logo.png" alt="Multidrop" class="h-8 w-auto" />
      </div>
    </div>

    <!-- Menu -->
    <nav class="flex-1 px-2 py-6 space-y-1">
      <a
        href="#"
        class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800"
        :class="{ 'bg-green-600 text-white': active === 'dashboard' }"
      >
        <i class="pi pi-chart-bar text-lg w-6 text-center"></i>
        <span v-if="!collapsed" class="whitespace-nowrap">Dashboard</span>
      </a>

      <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800">
        <i class="pi pi-store text-lg w-6 text-center"></i>
        <span v-if="!collapsed">Marketplace</span>
      </a>

      <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800">
        <i class="pi pi-box text-lg w-6 text-center"></i>
        <span v-if="!collapsed">Products</span>
      </a>

      <!-- Plano TAO -->
      <div
        class="flex items-center gap-3 px-3 py-2 rounded-lg border border-green-600 text-green-500"
      >
        <i class="pi pi-graduation-cap text-lg w-6 text-center"></i>
        <div v-if="!collapsed">
          <p class="font-medium">TAO</p>
          <span class="text-xs text-gray-400">Members area</span>
        </div>
      </div>
    </nav>

    <!-- Footer -->
    <div class="px-2 py-4 border-t border-gray-800 space-y-1">
      <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800">
        <i class="pi pi-credit-card text-lg w-6 text-center"></i>
        <span v-if="!collapsed">Planos</span>
      </a>
      <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800">
        <i class="pi pi-question-circle text-lg w-6 text-center"></i>
        <span v-if="!collapsed">Support</span>
      </a>
      <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800">
        <i class="pi pi-cog text-lg w-6 text-center"></i>
        <span v-if="!collapsed">Settings</span>
      </a>

      <!-- User -->
      <div class="flex items-center gap-3 mt-4 p-2 rounded-lg bg-gray-800">
        <img
          src="https://randomuser.me/api/portraits/men/68.jpg"
          class="h-10 w-10 rounded-full"
        />
        <div v-if="!collapsed">
          <p class="text-sm font-medium">Denis Oliveira</p>
          <span class="text-xs text-gray-400">Dev3loper</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

const collapsed = ref(false)
const active = ref('dashboard')

const toggleCollapse = () => {
  collapsed.value = !collapsed.value
}
</script>
