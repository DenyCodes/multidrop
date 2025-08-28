<template>
  <div class="p-6">
    <!-- Título -->
    <h1 class="text-2xl font-semibold mb-4">Marketplace</h1>

    <!-- Barra de busca -->
    <div class="mb-6">
      <input
        v-model="search"
        type="text"
        placeholder="Search"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
      />
    </div>

    <!-- Grid de produtos -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="(product, index) in filteredProducts"
        :key="index"
        class="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
      >
        <!-- Imagem -->
        <img
          :src="product.image"
          alt="Product"
          class="h-36 w-full object-cover rounded-lg mb-3"
        />

        <!-- Nome e autor -->
        <h2 class="text-base font-semibold leading-snug">
          {{ product.name }}
        </h2>
        <p class="text-sm text-gray-500 mb-3">By {{ product.author }}</p>

        <!-- Valores -->
        <div class="text-sm space-y-1 mb-4">
          <p>
            <span class="text-gray-600">Profit up to</span>
            <span class="font-semibold text-green-600 ml-1">{{ product.profit }}</span>
          </p>
          <p class="text-gray-500">
            Maximum price: <span class="font-medium">€ {{ product.maxPrice }}</span>
          </p>
        </div>

        <!-- Botão -->
        <div class="mt-auto">
          <button
            v-if="product.type === 'affiliation'"
            class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium"
          >
            Request Affiliation
          </button>
          <button
            v-else
            class="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-medium"
          >
            See links
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')

const products = ref([
  {
    name: 'Landscape PRO',
    author: 'Ellen Piotrowski',
    profit: '103,42 €',
    maxPrice: '206,00',
    image: 'https://picsum.photos/400/250?random=1',
    type: 'affiliation',
  },
  {
    name: 'Instaface - Liposomal Serum',
    author: 'Ellen Piotrowski',
    profit: '79,97 €',
    maxPrice: '206,00',
    image: 'https://picsum.photos/400/250?random=2',
    type: 'links',
  },
  {
    name: 'Nomad Content Creator',
    author: 'Ellen Piotrowski',
    profit: '85,35 €',
    maxPrice: '206,00',
    image: 'https://picsum.photos/400/250?random=3',
    type: 'affiliation',
  },
  {
    name: 'KetoXpress: Fruit Punch',
    author: 'Ellen Piotrowski',
    profit: '129,56 €',
    maxPrice: '206,00',
    image: 'https://picsum.photos/400/250?random=4',
    type: 'affiliation',
  },
  {
    name: 'Der Millionärs Code',
    author: 'Ellen Piotrowski',
    profit: '103,42 €',
    maxPrice: '206,00',
    image: 'https://picsum.photos/400/250?random=5',
    type: 'links',
  },
])

const filteredProducts = computed(() => {
  if (!search.value) return products.value
  return products.value.filter((p) =>
    p.name.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>
