<template>
  <div class="flex min-h-screen bg-gray-100">
    <main class="flex-1 overflow-y-auto">
      <!-- Topbar -->
      <header class="sticky top-0 z-10 h-14 sm:h-16 bg-white/90 backdrop-blur flex items-center px-4 sm:px-6 shadow">
        <h1 class="text-base sm:text-lg font-semibold">Dashboard</h1>
      </header>

      <div class="p-4 sm:p-6 space-y-6">
        <!-- Hero -->
        <section class="bg-black text-white rounded-xl p-4 sm:p-6 grid md:grid-cols-2 gap-4 items-center">
          <div class="order-2 md:order-none space-y-2">
            <p class="text-sm font-medium">Olá, gerente! Bem-vindo de volta..</p>
            <h2 class="text-xl sm:text-2xl font-bold">
              Leve seus produtos digitais para o próximo nível:
            </h2>
            <p class="text-gray-300 text-sm sm:text-base">
              Crie uma área de membros exclusiva no estilo moderno da Netflix, inspire seus clientes
              e escale suas vendas – 100% grátis!
            </p>
            <button
              class="mt-3 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold w-full md:w-auto"
            >
              Comece agora como fornecedor →
            </button>
          </div>
          <div class="order-1 md:order-none">
            <img
              src="https://picsum.photos/600/260"
              alt="Promo"
              class="w-full h-32 xs:h-36 sm:h-40 md:h-44 rounded-lg object-cover"
            />
          </div>
        </section>

        <!-- Métricas -->
        <section class="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <div class="card-metric">
            <p class="text-[11px] sm:text-sm text-gray-500">Total Revenue</p>
            <p class="text-xl sm:text-2xl font-bold text-gray-700">€ 23.800</p>
          </div>
          <div class="card-metric">
            <p class="text-[11px] sm:text-sm text-gray-500">Sales</p>
            <p class="text-xl sm:text-2xl font-bold text-gray-700">1203</p>
          </div>
          <div class="card-metric">
            <p class="text-[11px] sm:text-sm text-gray-500">Balance</p>
            <p class="text-xl sm:text-2xl font-bold text-gray-700">€ 7.200</p>
          </div>
          <div class="card-metric">
            <p class="text-[11px] sm:text-sm text-gray-500">Outstanding Balance</p>
            <p class="text-xl sm:text-2xl font-bold text-gray-700">€ 965</p>
          </div>
        </section>

        <!-- Gráfico -->
        <section class="bg-white rounded-xl shadow p-4 sm:p-6">
          <div class="flex items-center justify-between mb-3 sm:mb-4 gap-2">
            <h3 class="font-semibold text-gray-700 text-sm sm:text-base">Vendas por período</h3>
            <select
              v-model="period"
              class="text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-green-600 focus:border-green-600"
            >
              <option value="12m">Últimos 12 meses</option>
              <option value="6m">Últimos 6 meses</option>
              <option value="3m">Últimos 3 meses</option>
            </select>
          </div>
          <!-- altura menor no mobile -->
          <div class="h-48 sm:h-60 md:h-80">
            <canvas ref="salesCanvas" class="w-full h-full"></canvas>
          </div>
        </section>

        <!-- Vendas: Cards (mobile) -->
        <section class="bg-white rounded-xl shadow p-4 sm:p-6 md:hidden">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-semibold text-gray-700">Sales</h3>
            <input
              v-model="search"
              type="search"
              placeholder="Buscar..."
              class="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-green-600 focus:border-green-600"
            />
          </div>

          <ul class="space-y-3">
            <li class="border border-gray-100 rounded-lg p-3">
              <div class="flex items-center gap-3">
                <img src="https://picsum.photos/40" class="h-10 w-10 rounded object-cover" />
                <div class="min-w-0">
                  <p class="text-sm font-medium text-gray-800 truncate">Você tem ouvido muito...</p>
                  <p class="text-xs text-gray-500">Physical • € 9.456,00</p>
                </div>
              </div>
              <div class="flex items-center justify-between mt-3">
                <div class="flex items-center gap-2">
                  <img
                    src="https://randomuser.me/api/portraits/men/31.jpg"
                    class="h-6 w-6 rounded-full object-cover"
                  />
                  <span class="text-xs text-gray-600">Guilherme Carvalho Lima</span>
                </div>
                <span class="text-xs text-gray-500 whitespace-nowrap">07/05/2024 13:40</span>
              </div>
            </li>
            <!-- duplique <li> para mais itens -->
          </ul>
        </section>

        <!-- Vendas: Tabela (>= md) -->
        <section class="bg-white rounded-xl shadow p-4 sm:p-6 hidden md:block">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-gray-700">Sales</h3>
            <input
              v-model="search"
              type="search"
              placeholder="Buscar..."
              class="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-green-600 focus:border-green-600"
            />
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-[720px] w-full text-sm">
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
                <tr class="border-b hover:bg-gray-50 text-gray-700">
                  <td class="py-3">
                    <div class="flex items-center gap-2">
                      <img src="https://picsum.photos/40" class="h-8 w-8 rounded object-cover" />
                      <span>Você tem ouvido muito...</span>
                    </div>
                  </td>
                  <td>
                    <span class="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700 border border-gray-200">
                      Physical
                    </span>
                  </td>
                  <td>€ 9.456,00</td>
                  <td>
                    <div class="flex items-center gap-2">
                      <img
                        src="https://randomuser.me/api/portraits/men/31.jpg"
                        class="h-6 w-6 rounded-full object-cover"
                      />
                      <span>Guilherme Carvalho Lima</span>
                    </div>
                  </td>
                  <td class="whitespace-nowrap">07/05/2024 - 13:40</td>
                </tr>
                <!-- mais linhas aqui -->
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import Chart from 'chart.js/auto'

const salesCanvas = ref(null)
let chart

const period = ref('12m')
const search = ref('')

const labelsByPeriod = {
  '12m': ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  '6m': ['May','Jun','Jul','Aug','Sep','Oct'],
  '3m': ['Aug','Sep','Oct'],
}
const dataByPeriod = {
  '12m': [200,400,300,500,800,700,1000,600,900,1100,950,1400],
  '6m':  [800,700,1000,600,900,1100],
  '3m':  [1000,600,900],
}

function buildChart() {
  if (chart) chart.destroy()
  const ctx = salesCanvas.value?.getContext('2d')
  if (!ctx) return

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labelsByPeriod[period.value],
      datasets: [
        {
          label: 'Revenue',
          data: dataByPeriod[period.value],
          borderColor: '#16a34a',
          backgroundColor: 'rgba(22, 163, 74, 0.08)',
          fill: true,
          tension: 0.3,
          pointRadius: 2,
          pointHitRadius: 10,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { maxRotation: 0 } },
        y: { ticks: { callback: (v) => `€ ${v}` } },
      },
      interaction: { mode: 'index', intersect: false },
    },
  })
}

onMounted(buildChart)
onBeforeUnmount(() => chart?.destroy())
watch(period, buildChart)
</script>

<style scoped>
.card-metric {
  @apply bg-white rounded-xl shadow p-4 sm:p-6;
}
</style>
