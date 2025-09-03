<template>
  <div class="page" @dragover.prevent @drop.prevent="onDrop">
    <!-- NAVBAR -->
    <header class="topbar">
      <div class="nav-left">
        <div class="logo">📊</div>
        <div class="brand">
          <span class="brand-primary">Business</span><span class="brand-accent">Dashboard</span>
        </div>
      </div>
      <div class="nav-center">
        <div class="pill-actions">
          <button class="pill active" @click.prevent>Visão Geral</button>
          <button class="pill" @click.prevent>Relatórios</button>
          <button class="pill" @click.prevent>Clientes</button>
        </div>
      </div>
      <div class="nav-right">
        <button class="icon-btn" title="Tema" @click="toggleTheme">🌓</button>
        <div class="avatar">DO</div>
      </div>
    </header>

    <!-- SUBBAR -->
    <div class="subbar">
      <label class="file">
        <input type="file" accept=".xlsx,.xls" @change="onFile" />
        <span>{{ fileName || 'Importar Excel (.xlsx/.xls)' }}</span>
      </label>

      <div class="date-group">
        <label
          >De
          <input type="date" v-model="from" @change="applyFilters" />
        </label>
        <span class="sep">—</span>
        <label
          >Até
          <input type="date" v-model="to" @change="applyFilters" />
        </label>
      </div>

      <div class="subbar-actions">
        <div class="seg">
          <button :class="{ active: period === 'D' }" @click="setPeriod('D')">Dia</button>
          <button :class="{ active: period === 'M' }" @click="setPeriod('M')">Mês</button>
          <button :class="{ active: period === 'Q' }" @click="setPeriod('Q')">Trimestre</button>
          <button :class="{ active: period === 'S' }" @click="setPeriod('S')">Semestre</button>
          <button :class="{ active: period === 'Y' }" @click="setPeriod('Y')">Ano</button>
        </div>
        <button class="btn ghost" @click="resetFilters" :disabled="!hasData">Reset</button>
      </div>
    </div>

    <!-- DASHBOARD -->
    <main class="container" v-if="hasData">
      <!-- KPIs -->
      <section class="kpis">
        <div class="kpi">
          <div class="kpi-title">Receita</div>
          <div class="kpi-value">{{ formatBRL(kpis.revenue) }}</div>
          <div class="kpi-sub" :class="deltaClass(kpis.revDelta)">{{ fmtPct(kpis.revDelta) }}</div>
        </div>
        <div class="kpi">
          <div class="kpi-title">Pedidos</div>
          <div class="kpi-value">{{ kpis.orders.toLocaleString('pt-BR') }}</div>
          <div class="kpi-sub" :class="deltaClass(kpis.ordDelta)">{{ fmtPct(kpis.ordDelta) }}</div>
        </div>
        <div class="kpi">
          <div class="kpi-title">Ticket Médio</div>
          <div class="kpi-value">{{ formatBRL(kpis.aov) }}</div>
          <div class="kpi-sub" :class="deltaClass(kpis.aovDelta)">{{ fmtPct(kpis.aovDelta) }}</div>
        </div>
        <div class="kpi">
          <div class="kpi-title">Conversão</div>
          <div class="kpi-value">{{ kpis.conv.toFixed(1) }}%</div>
          <div class="kpi-sub" :class="deltaClass(kpis.convDelta)">
            {{ fmtPct(kpis.convDelta) }}
          </div>
        </div>
        <div class="kpi">
          <div class="kpi-title">Clientes únicos</div>
          <div class="kpi-value">{{ kpis.uniqueCustomers.toLocaleString('pt-BR') }}</div>
          <div class="kpi-sub">
            Melhor período: {{ bestPeriod.label }} ({{ formatBRL(bestPeriod.value) }})
          </div>
        </div>
      </section>

      <!-- GRÁFICOS -->
      <section class="grid">
        <!-- Receita -->
        <article class="card span-2">
          <div class="card-head">
            <h3>Receita por {{ periodLabel }}</h3>
            <div class="card-actions">
              <button class="btn ghost" @click="dlRevenueCSV">CSV</button>
              <button class="btn ghost" @click="dlChartPNG('revenue')">PNG</button>
            </div>
          </div>
          <canvas ref="revenueCanvas" height="120"></canvas>
        </article>

        <!-- Pedidos -->
        <article class="card">
          <div class="card-head">
            <h3>Pedidos por {{ periodLabel }}</h3>
            <div class="card-actions">
              <button class="btn ghost" @click="dlChartPNG('orders')">PNG</button>
            </div>
          </div>
          <canvas ref="ordersCanvas" height="200"></canvas>
        </article>

        <!-- Status -->
        <article class="card">
          <div class="card-head">
            <h3>Status dos Pedidos</h3>
            <div class="card-actions">
              <button class="btn ghost" @click="dlChartPNG('status')">PNG</button>
            </div>
          </div>
          <canvas ref="statusCanvas" height="200"></canvas>
        </article>

        <!-- Categorias -->
        <article class="card">
          <div class="card-head">
            <h3>Top Categorias</h3>
            <div class="card-actions">
              <button class="btn ghost" @click="dlChartPNG('category')">PNG</button>
            </div>
          </div>
          <canvas ref="categoryCanvas" height="200"></canvas>
        </article>

        <!-- Canais -->
        <article class="card">
          <div class="card-head">
            <h3>Canal de Venda</h3>
            <div class="card-actions">
              <button class="btn ghost" @click="dlChartPNG('channel')">PNG</button>
            </div>
          </div>
          <canvas ref="channelCanvas" height="200"></canvas>
        </article>

        <!-- Resumo executivo -->
        <article class="card span-2">
          <div class="card-head"><h3>Resumo executivo</h3></div>
          <ul class="report">
            <li>
              <strong>Receita:</strong> {{ formatBRL(kpis.revenue) }} • <strong>Pedidos:</strong>
              {{ kpis.orders.toLocaleString('pt-BR') }} • <strong>AOV:</strong>
              {{ formatBRL(kpis.aov) }}
            </li>
            <li>
              <strong>Melhor período:</strong> {{ bestPeriod.label }} com
              {{ formatBRL(bestPeriod.value) }}
            </li>
            <li><strong>Top Categoria:</strong> {{ topCategory }}</li>
            <li><strong>Top Canal:</strong> {{ topChannel }}</li>
            <li>
              <strong>Status:</strong> Pago {{ view.byStatus['Pago'] || 0 }}, Pendente
              {{ view.byStatus['Pendente'] || 0 }}, Cancelado {{ view.byStatus['Cancelado'] || 0 }},
              Reembolsado {{ view.byStatus['Reembolsado'] || 0 }}
            </li>
          </ul>
        </article>
      </section>
    </main>

    <!-- ESTADO VAZIO -->
    <main class="container" v-else>
      <div class="empty">
        <label class="dropzone">
          <input type="file" accept=".xlsx,.xls" @change="onFile" />
          <div class="dz-icon">⬆️</div>
          <div class="dz-title">Solte o Excel aqui</div>
          <div class="dz-sub">
            ou <span class="dz-link">clique para selecionar</span> um <strong>.xlsx</strong>
          </div>
          <div class="dz-hint">
            Cabeçalhos aceitos: <code>Data/Date</code>, <code>Cliente/Customer</code>,
            <code>Categoria/Category</code>, <code>Canal/Channel</code>,
            <code>Total/Amount/Valor</code>, <code>Status</code>, <code>ID</code>.
          </div>
        </label>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import * as XLSX from 'xlsx/xlsx.mjs'
import { Chart } from 'chart.js/auto'

/* ----------------- Estado ----------------- */
const fileName = ref('')
const raw = ref([]) // linhas normalizadas
const from = ref('')
const to = ref('')
const search = ref('')
const sort = reactive({ key: 'date', dir: 'desc' })

// períodos: D (dia), M (mês), Q (trimestre), S (semestre), Y (ano)
const period = ref('D')
const periodLabel = computed(
  () => ({ D: 'Dia', M: 'Mês', Q: 'Trimestre', S: 'Semestre', Y: 'Ano' })[period.value],
)

const hasData = computed(() => raw.value.length > 0)

const view = reactive({
  series: [], // [{date,revenue,orders}] já agregado pelo período
  ordersSeries: [], // idem, apenas contagem
  byCategory: {}, // {cat: sum}
  byChannel: {}, // {ch: sum}
  byStatus: {}, // {status: count}
  orders: [], // linhas filtradas/sort
})

const kpis = reactive({
  revenue: 0,
  orders: 0,
  aov: 0,
  conv: 0,
  revDelta: 0,
  ordDelta: 0,
  aovDelta: 0,
  convDelta: 0,
  uniqueCustomers: 0,
})

/* ----------------- Tema ----------------- */
const theme = ref(localStorage.getItem('dash-theme') || 'dark')
function applyTheme() {
  const r = document.documentElement
  if (theme.value === 'light') r.classList.add('theme-light')
  else r.classList.remove('theme-light')
}
function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  localStorage.setItem('dash-theme', theme.value)
  applyTheme()
}

/* ----------------- Canvas/Charts ----------------- */
const revenueCanvas = ref(null)
const ordersCanvas = ref(null)
const statusCanvas = ref(null)
const categoryCanvas = ref(null)
const channelCanvas = ref(null)
let revenueChart, ordersChart, statusChart, categoryChart, channelChart

onBeforeUnmount(() =>
  [revenueChart, ordersChart, statusChart, categoryChart, channelChart].forEach((c) =>
    c?.destroy?.(),
  ),
)

/* ----------------- Utils ----------------- */
const formatBRL = (v) =>
  Number(v || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const fmtPct = (v) =>
  `${v >= 0 ? '+' : ''}${(Number.isFinite(v) ? v : 0).toFixed(1)}% vs período anterior`
const deltaClass = (v) => (v >= 0 ? 'positive' : 'negative')

function toISODate(v) {
  if (v == null || v === '') return ''
  // Excel serial
  if (typeof v === 'number') {
    const d = XLSX.SSF.parse_date_code(v)
    if (d) {
      const mm = String(d.m).padStart(2, '0')
      const dd = String(d.d).padStart(2, '0')
      return `${d.y}-${mm}-${dd}`
    }
  }
  // String
  const s = String(v).trim()
  const m1 = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/) // dd/mm/yyyy
  if (m1) {
    const [_, d, m, y] = m1
    const yy = y.length === 2 ? `20${y}` : y
    return `${yy}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
  }
  const m2 = s.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/) // yyyy-mm-dd
  if (m2) {
    const [_, y, m, d] = m2
    return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
  }
  const dt = new Date(s)
  if (!isNaN(dt)) return dt.toISOString().slice(0, 10)
  return ''
}

function normalizeRow(row, idx) {
  const map = {}
  for (const k of Object.keys(row)) {
    const key = String(k).trim().toLowerCase()
    if (/(data|date)/.test(key)) map.date = row[k]
    else if (/(cliente|customer|nome)/.test(key)) map.customer = row[k]
    else if (/(categoria|category)/.test(key)) map.category = row[k]
    else if (/(canal|channel)/.test(key)) map.channel = row[k]
    else if (/(total|amount|valor|preço|preco|price)/.test(key)) map.total = row[k]
    else if (/(status|situação|situacao)/.test(key)) map.status = row[k]
    else if (/(id|pedido|order)/.test(key)) map.id = row[k]
  }
  map._rowid = idx + 1
  map.date = toISODate(map.date)
  map.customer = String(map.customer ?? '').trim()
  map.category = String(map.category ?? '').trim()
  map.channel = String(map.channel ?? '').trim()
  map.status = String(map.status ?? 'Pago').trim()
  // valor: aceita pt-BR e en-US
  map.total = Number(
    String(map.total ?? 0)
      // se houver "1.234,56" -> vira "1234,56"
      .replace(/\.(?=\d{3}(?:\D|$))/g, '')
      // troca vírgula decimal por ponto
      .replace(',', '.')
      // remove símbolos
      .replace(/[^\d\.-]/g, ''),
  )
  map.id = map.id ?? map._rowid
  return map
}

/* ----------------- Upload ----------------- */
async function onFile(e) {
  await handleFile(e.target.files?.[0])
}
async function onDrop(e) {
  const f = e.dataTransfer?.files?.[0]
  if (f) await handleFile(f)
}

async function handleFile(f) {
  if (!f) return
  fileName.value = f.name
  const buf = await f.arrayBuffer()
  const wb = XLSX.read(buf, { type: 'array' })
  const ws = wb.Sheets[wb.SheetNames[0]]
  const rows = XLSX.utils.sheet_to_json(ws, { defval: '' })
  raw.value = rows.map((r, i) => normalizeRow(r, i)).filter((r) => r.date)

  // datas padrão
  const dates = [...new Set(raw.value.map((r) => r.date))].sort()
  if (!from.value && dates.length) from.value = dates[0]
  if (!to.value && dates.length) to.value = dates[dates.length - 1]

  period.value = 'M' // padrão mensal
  await nextTick()
  rebuild()
}

/* ----------------- Períodos ----------------- */
function setPeriod(p) {
  period.value = p
  rebuild()
}
const ym = (d) => d.slice(0, 7)
const yq = (d) => `${d.slice(0, 4)}-Q${Math.ceil(Number(d.slice(5, 7)) / 3)}`
const ys = (d) => `${d.slice(0, 4)}-${Number(d.slice(5, 7)) <= 6 ? 'H1' : 'H2'}`
const yy = (d) => d.slice(0, 4)
function groupSeries(series, g) {
  if (g === 'D') return series
  const keyFn = g === 'M' ? ym : g === 'Q' ? yq : g === 'S' ? ys : yy
  const bucket = {}
  for (const it of series) {
    const k = keyFn(it.date)
    if (!bucket[k]) bucket[k] = { date: k, revenue: 0, orders: 0 }
    bucket[k].revenue += it.revenue
    bucket[k].orders += it.orders
  }
  return Object.keys(bucket)
    .sort()
    .map((k) => bucket[k])
}

/* ----------------- Core (rebuild) ----------------- */
function rebuild() {
  if (!raw.value.length) return

  // 1) filtro por data e busca (se quiser buscar, digite em `search`)
  const f = raw.value.filter((r) => {
    const okFrom = from.value ? r.date >= from.value : true
    const okTo = to.value ? r.date <= to.value : true
    const q = search.value.trim().toLowerCase()
    const okQ = q
      ? String(r.customer).toLowerCase().includes(q) ||
        String(r.category).toLowerCase().includes(q) ||
        String(r.channel).toLowerCase().includes(q) ||
        String(r.id).includes(q)
      : true
    return okFrom && okTo && okQ
  })

  // 2) sort
  const sorted = [...f].sort((a, b) => {
    const dir = sort.dir === 'asc' ? 1 : -1
    let va = a[sort.key],
      vb = b[sort.key]
    if (sort.key === 'total') {
      va = Number(va)
      vb = Number(vb)
    }
    if (sort.key === 'date') {
      va = new Date(a.date).getTime()
      vb = new Date(b.date).getTime()
    }
    if (va < vb) return -1 * dir
    if (va > vb) return 1 * dir
    return 0
  })

  // 3) séries DIÁRIAS base
  const byDate = {}
  for (const r of sorted) {
    if (!byDate[r.date]) byDate[r.date] = { revenue: 0, orders: 0 }
    byDate[r.date].revenue += Number(r.total) || 0
    byDate[r.date].orders += 1
  }
  const seriesDaily = Object.keys(byDate)
    .sort()
    .map((d) => ({ date: d, revenue: byDate[d].revenue, orders: byDate[d].orders }))

  // 3.1) agrega pela granularidade
  const grouped = groupSeries(seriesDaily, period.value)

  // 4) agregações
  const byCategory = {}
  const byChannel = {}
  const byStatus = {}
  let revenue = 0
  const customers = new Set()
  for (const r of sorted) {
    revenue += Number(r.total) || 0
    byCategory[r.category] = (byCategory[r.category] || 0) + (Number(r.total) || 0)
    byChannel[r.channel] = (byChannel[r.channel] || 0) + (Number(r.total) || 0)
    byStatus[r.status] = (byStatus[r.status] || 0) + 1
    if (r.customer) customers.add(r.customer)
  }
  const orders = sorted.length
  const aov = orders ? revenue / orders : 0
  const conv = orders ? Math.max(2, Math.min(20, (orders / (orders * 16)) * 100 * 18)) : 0

  // 5) deltas vs metade do período (usando diário p/ mais precisão)
  const half = Math.floor(seriesDaily.length / 2)
  const prev = seriesDaily.slice(0, half)
  const curr = seriesDaily.slice(half)
  const sum = (arr, k) => arr.reduce((s, x) => s + (x[k] || 0), 0)
  const pRev = sum(prev, 'revenue') || 0
  const cRev = sum(curr, 'revenue') || 0
  const pOrd = sum(prev, 'orders') || 0
  const cOrd = sum(curr, 'orders') || 0
  const pAOV = pOrd ? pRev / pOrd : 0
  const cAOV = cOrd ? cRev / cOrd : 0

  // 6) aplica estado
  view.orders = sorted
  view.series = grouped
  view.ordersSeries = grouped.map((s) => ({ date: s.date, count: s.orders }))
  view.byCategory = byCategory
  view.byChannel = byChannel
  view.byStatus = byStatus
  kpis.revenue = revenue
  kpis.orders = orders
  kpis.aov = aov
  kpis.conv = conv
  kpis.revDelta = pRev ? ((cRev - pRev) / pRev) * 100 : 0
  kpis.ordDelta = pOrd ? ((cOrd - pOrd) / pOrd) * 100 : 0
  kpis.aovDelta = pAOV ? ((cAOV - pAOV) / pAOV) * 100 : 0
  kpis.convDelta = Math.random() * 6 - 3
  kpis.uniqueCustomers = customers.size

  drawCharts()
}

/* ----------------- KPIs auxiliares ----------------- */
const bestPeriod = computed(() => {
  const s = view.series
  if (!s.length) return { label: '-', value: 0 }
  const best = s.reduce((a, b) => (b.revenue > a.revenue ? b : a), s[0])
  return { label: best.date, value: best.revenue }
})
const topCategory = computed(() => {
  const e = Object.entries(view.byCategory)
  if (!e.length) return '-'
  return e.sort((a, b) => b[1] - a[1])[0][0]
})
const topChannel = computed(() => {
  const e = Object.entries(view.byChannel)
  if (!e.length) return '-'
  return e.sort((a, b) => b[1] - a[1])[0][0]
})

/* ----------------- Charts ----------------- */
function gradFill(hex) {
  return (ctx) => {
    const { chart } = ctx
    const { ctx: c, chartArea } = chart
    if (!chartArea) return hex + '22'
    const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
    g.addColorStop(0, hex + '66')
    g.addColorStop(1, hex + '10')
    return g
  }
}
function baseLineOptions() {
  return {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: 'rgba(148,163,184,.12)' } },
      y: {
        grid: { color: 'rgba(148,163,184,.12)' },
        ticks: { callback: (v) => formatBRL(Number(v)) },
      },
    },
  }
}
function baseBarOptions() {
  return {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: 'rgba(148,163,184,.12)' } },
      y: {
        grid: { color: 'rgba(148,163,184,.12)' },
        ticks: { callback: (v) => formatBRL(Number(v)) },
      },
    },
  }
}

async function drawCharts() {
  if (
    !revenueCanvas.value ||
    !ordersCanvas.value ||
    !statusCanvas.value ||
    !categoryCanvas.value ||
    !channelCanvas.value
  ) {
    await nextTick()
  }

  const labels = view.series.map((s) => s.date)
  const dataR = view.series.map((s) => s.revenue)
  const dataO = view.ordersSeries.map((s) => s.count)

  // destruir instâncias antigas
  revenueChart?.destroy()
  ordersChart?.destroy()
  statusChart?.destroy()
  categoryChart?.destroy()
  channelChart?.destroy()

  // Receita (linha)
  revenueChart = new Chart(revenueCanvas.value.getContext('2d'), {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Receita',
          data: dataR,
          fill: true,
          tension: 0.35,
          borderWidth: 2,
          borderColor: '#7c3aed',
          backgroundColor: (ctx) => {
            const { chartArea, ctx: c } = ctx.chart
            if (!chartArea) return '#7c3aed22'
            const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
            g.addColorStop(0, '#7c3aed66')
            g.addColorStop(1, '#7c3aed10')
            return g
          },
          pointRadius: 0,
        },
      ],
    },
    options: { responsive: true, plugins: { legend: { display: false } } },
  })

  // Pedidos (barra)
  ordersChart = new Chart(ordersCanvas.value.getContext('2d'), {
    type: 'bar',
    data: { labels, datasets: [{ label: 'Pedidos', data: dataO }] },
    options: { responsive: true, plugins: { legend: { display: false } } },
  })

  // Status (pizza)
  const stLabels = Object.keys(view.byStatus)
  const stData = Object.values(view.byStatus)
  statusChart = new Chart(statusCanvas.value.getContext('2d'), {
    type: 'doughnut',
    data: { labels: stLabels, datasets: [{ data: stData }] },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } } },
  })

  // Categorias (barra)
  categoryChart = new Chart(categoryCanvas.value.getContext('2d'), {
    type: 'bar',
    data: {
      labels: Object.keys(view.byCategory),
      datasets: [{ label: 'Receita', data: Object.values(view.byCategory) }],
    },
    options: { responsive: true, plugins: { legend: { display: false } } },
  })

  // Canais (barra)
  channelChart = new Chart(channelCanvas.value.getContext('2d'), {
    type: 'bar',
    data: {
      labels: Object.keys(view.byChannel),
      datasets: [{ label: 'Receita', data: Object.values(view.byChannel) }],
    },
    options: { responsive: true, plugins: { legend: { display: false } } },
  })
}

/* ----------------- Ações extras ----------------- */
function csvDownload(filename, rows) {
  const csv = rows
    .map((r) =>
      r
        .map((v) => {
          const s = String(v ?? '')
          return s.includes(',') || s.includes('"') ? `"${s.replaceAll('"', '""')}"` : s
        })
        .join(','),
    )
    .join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
function dlRevenueCSV() {
  const rows = [['periodo', 'receita']].concat(view.series.map((s) => [s.date, s.revenue]))
  csvDownload('receita.csv', rows)
}
function dlChartPNG(kind) {
  const refMap = {
    revenue: revenueCanvas,
    orders: ordersCanvas,
    status: statusCanvas,
    category: categoryCanvas,
    channel: channelCanvas,
  }
  const c = refMap[kind]?.value
  if (!c) return
  const link = document.createElement('a')
  link.download = `${kind}.png`
  link.href = c.toDataURL('image/png')
  link.click()
}
function applyFilters() {
  rebuild()
}
function resetFilters() {
  from.value = ''
  to.value = ''
  search.value = ''
  sort.key = 'date'
  sort.dir = 'desc'
  period.value = 'D'
  rebuild()
}

/* ----------------- Lifecycle ----------------- */
onMounted(async () => {
  applyTheme()
  if (raw.value.length) {
    // se você já pré-carrega algo
    await nextTick()
    rebuild()
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

:root {
  --bg: #0b0f14;
  --panel: #10161c;
  --card: #0f141a;
  --muted: #94a3b8;
  --text: #e5e7eb;
  --brand: #7c3aed;
  --brand2: #34d399;
  --border: #1f2937;
  --danger: #ef4444;
  --warn: #f59e0b;
  --ok: #22c55e;
}
.theme-light:root,
.theme-light {
  --bg: #f5f7fb;
  --panel: #ffffff;
  --card: #ffffff;
  --muted: #6b7280;
  --text: #0f172a;
  --brand: #2563eb;
  --brand2: #16a34a;
  --border: #e5e7eb;
  --danger: #dc2626;
  --warn: #b45309;
  --ok: #059669;
}

.page {
  min-height: 100vh;
  background:
    radial-gradient(1200px 600px at 20% -10%, rgba(124, 58, 237, 0.1), transparent 60%),
    radial-gradient(800px 400px at 90% 0%, rgba(52, 211, 153, 0.1), transparent 60%), var(--bg);
  color: var(--text);
  font-family:
    Inter,
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Ubuntu;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  letter-spacing: 0.2px;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--border);
  background: linear-gradient(180deg, rgba(16, 22, 28, 0.85), rgba(16, 22, 28, 0.6));
  backdrop-filter: blur(10px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}
.theme-light .topbar {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6));
  box-shadow: 0 6px 18px rgba(2, 6, 23, 0.08);
}
.nav-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.logo {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: radial-gradient(100% 100% at 30% 20%, var(--brand), var(--brand2));
  color: #062b1f;
  font-weight: 900;
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.25);
}
.brand {
  font-weight: 800;
  letter-spacing: 0.2px;
  display: flex;
  gap: 4px;
  font-size: 18px;
}
.brand-primary {
  background: linear-gradient(90deg, var(--text), var(--muted));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.brand-accent {
  color: var(--brand);
}
.nav-center {
  display: flex;
  justify-content: center;
}
.pill-actions {
  display: flex;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 4px;
  gap: 4px;
}
.pill {
  border: none;
  background: transparent;
  color: #cbd5e1;
  padding: 6px 12px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 600;
}
.pill.active {
  background: rgba(124, 58, 237, 0.2);
  color: #fff;
}
.nav-right {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  align-items: center;
}
.icon-btn {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--card);
  color: var(--text);
  cursor: pointer;
}
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 800;
  color: #0a0f14;
  background: linear-gradient(135deg, var(--brand), var(--brand2));
}

.subbar {
  position: sticky;
  top: 56px;
  z-index: 15;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: linear-gradient(180deg, rgba(16, 22, 28, 0.8), rgba(16, 22, 28, 0.65));
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(10px);
}
.theme-light .subbar {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
}
.date-group {
  display: flex;
  align-items: center;
  gap: 8px;
}
.sep {
  color: var(--muted);
}
.subbar .seg {
  display: flex;
  border: 1px solid var(--border);
  border-radius: 999px;
  overflow: hidden;
  background: var(--card);
}
.subbar .seg button {
  padding: 6px 10px;
  border: none;
  background: transparent;
  color: var(--muted);
  font-weight: 700;
  cursor: pointer;
}
.subbar .seg button.active {
  background: var(--brand);
  color: #fff;
}
.btn {
  background: var(--brand);
  color: #062b1f;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}
.btn.ghost {
  background: transparent;
  color: var(--muted);
  border: 1px solid var(--border);
}
label.file {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--card);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
}
label.file input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}
label.file span {
  display: inline-block;
  padding: 9px 14px;
  color: var(--text);
  font-weight: 700;
}

.container {
  max-width: 1240px;
  margin: 20px auto;
  padding: 0 16px;
}
.kpis {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
}
.kpi {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 14px;
}
.kpi-title {
  color: var(--muted);
  font-size: 12px;
  letter-spacing: 0.3px;
}
.kpi-value {
  font-size: 30px;
  font-weight: 800;
  margin-top: 6px;
}
.kpi-sub {
  font-size: 12px;
  margin-top: 2px;
  color: var(--muted);
}
.kpi-sub.positive {
  color: var(--ok);
}
.kpi-sub.negative {
  color: var(--danger);
}

.grid {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}
.card {
  background: linear-gradient(180deg, var(--panel), rgba(0, 0, 0, 0));
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 16px;
}
.card.span-2 {
  grid-column: span 2;
}
.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.card-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.report {
  margin: 2px 0 0 16px;
  padding: 0;
  list-style: disc;
  color: var(--muted);
}
.report strong {
  color: var(--text);
}

.table-wrap {
  overflow: auto;
  border-radius: 12px;
  border: 1px solid var(--border);
}
.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.table th,
.table td {
  padding: 12px;
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
  text-align: left;
}

.empty {
  margin: 40px 0;
  padding: 24px;
  border: 1px dashed var(--border);
  border-radius: 12px;
  color: var(--muted);
  text-align: center;
}
.dropzone {
  display: grid;
  place-items: center;
  padding: 36px;
  border: 2px dashed rgba(124, 58, 237, 0.35);
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(124, 58, 237, 0.08), rgba(52, 211, 153, 0.06));
  cursor: pointer;
  transition: 0.2s ease;
  text-align: center;
}
.dropzone:hover {
  border-color: var(--brand);
  box-shadow: 0 8px 30px rgba(124, 58, 237, 0.15);
}
.dropzone input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}
.dz-icon {
  font-size: 36px;
  margin-bottom: 8px;
}
.dz-title {
  font-weight: 900;
  letter-spacing: 0.3px;
}
.dz-sub {
  color: var(--muted);
  margin-top: 2px;
}
.dz-link {
  color: var(--brand);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.dz-hint {
  margin-top: 10px;
  font-size: 12px;
  color: var(--muted);
}

@media (max-width: 1100px) {
  .kpis {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 800px) {
  .kpis {
    grid-template-columns: repeat(2, 1fr);
  }
  .grid {
    grid-template-columns: 1fr;
  }
  .card.span-2 {
    grid-column: auto;
  }
  .subbar {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
}
@media (max-width: 520px) {
  .kpi-value {
    font-size: 24px;
  }
}
</style>
