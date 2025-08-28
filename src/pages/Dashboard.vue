<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Main content -->
    <main class="flex-1 overflow-y-auto">
      <!-- Topbar -->
      <header class="h-16 bg-white flex items-center px-6 shadow">
        <h1 class="text-lg font-semibold">Dashboard</h1>
      </header>

      <div class="p-6 space-y-6">
        <!-- Welcome Card -->
        <div class="bg-black text-white rounded-xl p-6 flex items-center justify-between">
          <div>
            <p class="text-lg font-medium">Olá, gerente! Bem-vindo de volta..</p>
            <h2 class="text-2xl font-bold mt-2">
              Leve seus produtos digitais para o próximo nível:

            </h2>
            <p class="text-gray-300 mt-1">
              Crie uma área de membros exclusiva no estilo moderno da Netflix, inspire seus clientes e escale suas vendas – 100% grátis!
            </p>
            <button class="mt-4 bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-semibold">
              Comece agora como fornecedor →
            </button>
          </div>
<img src="https://picsum.photos/300/120" alt="Promo" class="h-32 rounded-lg object-cover" />
        </div>

        <!-- Metrics -->
        <div class="grid grid-cols-4 gap-6">
          <div class="card-metric">
            <p class="text-sm text-gray-500">Total Revenue</p>
            <p class="text-2xl font-bold text-gray-500">€ 23.800</p>
          </div>
          <div class="card-metric">
            <p class="text-sm text-gray-500">Sales</p>
            <p class="text-2xl font-bold text-gray-500">1203</p>
          </div>
          <div class="card-metric">
            <p class="text-sm text-gray-500">Balance</p>
            <p class="text-2xl font-bold text-gray-500">€ 7.200</p>
          </div>
          <div class="card-metric">
            <p class="text-sm text-gray-500">Outstanding Balance</p>
            <p class="text-2xl font-bold text-gray-500">€ 965</p>
          </div>
        </div>

        <!-- Chart -->
        <div class="bg-white rounded-xl shadow p-6">
          <h3 class="font-semibold mb-4 text-gray-500">Vendas por período</h3>
          <canvas id="salesChart" height="100"></canvas>
        </div>

        <!-- Sales Table -->
        <div class="bg-white rounded-xl shadow p-6">
          <h3 class="font-semibold mb-4 text-gray-500">Sales</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-left border-b text-gray-500">
                  <th class="pb-3">Product</th>
                  <th class="pb-3">Type</th>
                  <th class="pb-3">Revenue</th>
                  <th class="pb-3">Affiliate</th>
                  <th class="pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b hover:bg-gray-50 text-gray-500">
                  <td class="py-3 flex items-center space-x-2">
                    <img src="https://picsum.photos/40" class="h-8 w-8 rounded" />
                    <span>Você tem ouvido muito...</span>
                  </td>
                  <td><span class="px-2 py-1 text-xs rounded bg-gray-200">Physical</span></td>
                  <td>€ 9456,00</td>
                  <td class="flex items-center space-x-2">
                    <img src="https://randomuser.me/api/portraits/men/31.jpg" class="h-6 w-6 rounded-full" />
                    <span>Guilherme Carvalho Lima</span>
                  </td>
                  <td>07/05/2024 - 13:40</td>
                </tr>
                <!-- Repita mais linhas conforme necessário -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Chart from 'chart.js/auto'

onMounted(() => {
  const ctx = document.getElementById('salesChart')
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets: [{
        label: 'Revenue',
        data: [200,400,300,500,800,700,1000,600,900,1100,950,1400],
        borderColor: '#16a34a',
        fill: false,
        tension: 0.3
      }]
    }
  })
})
</script>

<style scoped>
.card-metric {
  @apply bg-white rounded-xl shadow p-6;
}
</style>
