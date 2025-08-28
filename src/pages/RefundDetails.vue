<template>
  <div class="min-h-screen bg-gray-50 px-6 py-10">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <button class="text-sm text-gray-600 hover:underline" @click="goBack">← Voltar</button>
      <img src="/logo.png" alt="Multidrop" class="h-10 w-auto" />
      <div class="text-sm text-gray-600">
        Você está logado(a) como <span class="font-medium">{{ user.email }}</span>.
        <button @click="logout" class="text-green-600 hover:underline ml-1">Log out</button>
      </div>
    </div>

    <!-- Título -->
    <h1 class="text-[28px] font-bold text-[#171717] mb-8">Solicitar reembolso</h1>

    <!-- Card: Detalhes do produto -->
    <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
      <h2 class="font-semibold text-gray-800 mb-4">Detalhes do produto</h2>
      <p class="text-sm text-gray-700">
        <span class="font-medium">Nome do produto:</span> {{ product.name }}
      </p>
      <p class="text-sm text-gray-700">
        <span class="font-medium">Valor:</span> € {{ product.price }}
      </p>
      <p class="text-sm text-gray-700">
        <span class="font-medium">Data Limite para solicitar reembolso:</span> {{ product.refundDeadline }}
      </p>
      <p class="text-sm text-gray-700">
        <span class="font-medium">Método de pagamento:</span> {{ product.paymentMethod }}
      </p>
      <p class="text-sm text-gray-700">
        <span class="font-medium">E-mail de suporte do vendedor:</span> {{ product.supportEmail }}
      </p>
    </div>

    <!-- Card: Motivo do reembolso -->
    <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
      <h2 class="font-semibold text-gray-800 mb-4">Motivo do reembolso</h2>

      <div class="space-y-3 mb-4">
        <label v-for="(reason, index) in reasons" :key="index" class="flex items-center gap-2">
          <input type="radio" :value="reason" v-model="selectedReason" class="text-green-600" />
          <span class="text-sm text-gray-700">{{ reason }}</span>
        </label>
      </div>

      <label class="block text-sm font-medium text-gray-700 mb-1">
        Você gostaria de informar mais algo?
      </label>
      <textarea
        v-model="extraInfo"
        rows="3"
        placeholder="Opcional"
        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700
               focus:ring-2 focus:ring-green-600 focus:outline-none"
      ></textarea>
    </div>

    <!-- Botão -->
    <button
      @click="submitRefund"
      class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition"
    >
      Solicitar Reembolso
    </button>

    <!-- Modal de sucesso -->
    <div
      v-if="showSuccess"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg p-8 text-center max-w-sm w-full">
        <div class="flex justify-center mb-4">
          <div class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
            <span class="text-green-600 text-3xl">✔</span>
          </div>
        </div>
        <h2 class="text-xl font-bold text-[#171717] mb-2">Reembolso solicitado</h2>
        <p class="text-gray-600 text-sm mb-6">
          Você receberá um e-mail com a síntese do seu reembolso.
          Verifique a sua caixa de SPAM.
        </p>
        <button
          @click="closeModal"
          class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium"
        >
          Fechar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = ref({ email: 'john@liberttar.com' })
const product = ref({
  name: 'Wireless Noise-Canceling Headphones',
  price: '324.00',
  refundDeadline: '29/05/2025',
  paymentMethod: 'Mastercard 9915',
  supportEmail: 'suporte@multidrop.com',
})

const reasons = [
  'Eu ainda não consegui acessar o produto, mas gostaria de acessar',
  'Preciso do dinheiro para outras coisas',
  'Recebi o acesso, mas as páginas ou arquivos não abrem',
  'A qualidade do produto não atingiu as minhas expectativas',
  'O produto está incompleto',
  'Compra duplicada',
]

const selectedReason = ref('')
const extraInfo = ref('')
const showSuccess = ref(false)

const submitRefund = () => {
  if (!selectedReason.value) {
    alert('Selecione um motivo para o reembolso.')
    return
  }
  showSuccess.value = true
}

const closeModal = () => {
  showSuccess.value = false
  router.push('/dashboard')
}

const logout = () => {
  router.push('/login')
}

const goBack = () => {
  router.back()
}
</script>
