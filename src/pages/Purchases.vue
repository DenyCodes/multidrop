<template>
  <div class="min-h-screen bg-gray-50 px-6 py-10">
    <!-- Header -->
    <div class="flex justify-center mb-8">
      <img src="/logo.png" alt="Multidrop" class="h-10 w-auto" />
    </div>

    <!-- User info -->
    <div class="text-center text-sm text-gray-600 mb-6">
      Você está logado(a) como:
      <span class="font-medium">{{ user.email }}</span
      >.
      <button class="text-green-600 hover:underline ml-1" @click="logout">Log out</button>
    </div>

    <!-- Aviso -->
    <div
      class="bg-blue-50 border border-blue-200 text-blue-700 text-sm p-3 rounded-md mb-8 text-center"
    >
      Ao solicitar um reembolso, a sua compra será cancelada e você não terá mais acesso ao produto.
    </div>

    <!-- Lista de compras -->
    <div class="space-y-4">
      <div
        v-for="(purchase, index) in purchases"
        :key="index"
        class="bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-between p-6"
      >
        <!-- Produto -->
        <div class="flex items-center gap-6">
          <img :src="purchase.image" alt="Produto" class="w-40 h-40 object-cover rounded-xl" />
          <div>
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
        <div class="flex flex-col items-end gap-3">
          <button
            v-if="!purchase.refunded"
            @click="detalhes"
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-md shadow-sm"
          >
            Solicitar reembolso
          </button>

          <span
            v-else
            class="inline-flex items-center bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full"
          >
            ✅ Reembolsado
          </span>

          <!-- Avatar do usuário -->
          <img
            src="https://randomuser.me/api/portraits/men/68.jpg"
            alt="User"
            class="w-10 h-10 rounded-full border"
          />
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
    image: 'https://picsum.photos/200/200?random=1',
  },
  {
    name: 'Wireless Noise-Canceling Headphones',
    price: '324.00',
    date: '22/05/2025',
    refundDeadline: '29/05/2025',
    refunded: false,
    image: 'https://picsum.photos/200/200?random=2',
  },
  {
    name: 'Wireless Noise-Canceling Headphones',
    price: '324.00',
    date: '22/05/2025',
    refundDeadline: '29/05/2025',
    refunded: true,
    image: 'https://picsum.photos/200/200?random=3',
  },
])

const logout = () => {
  alert('Logout efetuado')
}

const requestRefund = (index) => {
  purchases.value[index].refunded = true
}

const detalhes = () => {
  router.push('/refundDetails')
}
</script>
