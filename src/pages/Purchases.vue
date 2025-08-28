<template>
  <div class="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-20 py-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <img src="/logo.png" alt="Multidrop" class="h-10 w-auto mb-4 sm:mb-0" />
      <div class="text-sm text-gray-600 text-center sm:text-right">
        Você está logado(a) como: <span class="font-medium">{{ user.email }}</span
        >.
        <button class="text-green-600 hover:underline ml-1" @click="logout">Log out</button>
      </div>
    </div>

    <!-- Título -->
    <h1 class="text-xl sm:text-2xl font-bold text-[#171717] mb-4">Suas compras</h1>

    <!-- Aviso -->
    <div
      class="bg-blue-50 border border-blue-200 text-blue-700 text-sm p-3 rounded-md mb-8 text-center"
    >
      Ao solicitar um reembolso, a sua compra será cancelada e você não terá mais acesso ao produto.
    </div>

    <!-- Lista de compras -->
    <div class="space-y-6">
      <div
        v-for="(purchase, index) in purchases"
        :key="index"
        class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <!-- Produto -->
        <div class="flex flex-col items-center md:flex-row md:items-center gap-4 flex-1">
          <img
            :src="purchase.image"
            alt="Produto"
            class="w-full sm:w-40 h-40 object-cover rounded-xl"
          />
          <div class="text-center md:text-left">
            <h2 class="font-semibold text-lg text-gray-900 mb-2">
              {{ purchase.name }}
            </h2>
            <p class="text-sm text-gray-600">
              Valor da compra: <span class="font-medium">€ {{ purchase.price }}</span>
            </p>
            <p class="text-sm text-gray-600">Data da compra: {{ purchase.date }}</p>
            <p class="text-sm text-gray-600">
              Data limite para solicitar reembolso: {{ purchase.refundDeadline }}
            </p>
          </div>
        </div>

        <!-- Ações -->
        <div class="flex justify-center md:justify-end mt-4 md:mt-0">
          <button
            v-if="!purchase.refunded"
            @click="detalhes"
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-md shadow-sm w-full sm:w-auto"
          >
            Solicitar reembolso
          </button>

          <span
            v-else
            class="inline-flex items-center justify-center bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full w-full sm:w-auto"
          >
            ✅ Reembolsado
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref({
  email: 'john@liberttar.com',
})

const purchases = ref([
  {
    name: 'Wireless Noise-Canceling Headphones',
    price: '324.00',
    date: '22/05/2025',
    refundDeadline: '29/05/2025',
    refunded: false,
    image: 'https://picsum.photos/400/300?random=1',
  },
  {
    name: 'Wireless Noise-Canceling Headphones',
    price: '324.00',
    date: '22/05/2025',
    refundDeadline: '29/05/2025',
    refunded: true,
    image: 'https://picsum.photos/400/300?random=2',
  },
])

const logout = () => {
  alert('Logout efetuado!')
}
const detalhes = () => {
  router.push('/refundDetails')
}
const requestRefund = (index) => {
  purchases.value[index].refunded = true
}
</script>
