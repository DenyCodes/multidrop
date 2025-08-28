<template>
<div class="min-h-screen flex flex-col items-center bg-gray-50 pt-20">
    <!-- Logo -->
    <div class="flex justify-center mb-8">
      <img src="/logo.png" alt="Multidrop" class="h-10 w-auto" />
    </div>

    <!-- Tela de solicitar reembolso -->
    <div class="w-full max-w-md bg-white border border-gray-200 rounded-md shadow-sm p-8">
      <h1 class="text-[24px] font-bold text-[#171717] text-center mb-2">Solicitar reembolso</h1>
      <p class="text-[14px] leading-[150%] text-gray-600 text-center mb-8">
        Você pode solicitar um reembolso dentro do prazo estipulado pelo produtor.
      </p>

      <form @submit.prevent="goToVerification">
        <label for="email" class="block text-sm font-medium text-black mb-2">
          E-mail usado na compra
        </label>

        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="Digite seu e-mail"
          class="w-full h-11 px-3 border border-gray-300 rounded-md text-black
                 focus:ring-2 focus:ring-green-600 focus:border-green-600
                 outline-none mb-6"
        />

        <button
          type="submit"
          class="w-full h-11 bg-green-700 hover:bg-green-800 text-white
                 font-medium rounded-md transition"
        >
          Encontrar sua compra
        </button>
      </form>
    </div>

    <!-- Overlay + Modal de verificação -->
    <div
      v-if="showVerification"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8 relative">
        <!-- Botão fechar -->
        <button
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          @click="showVerification = false"
        >
          ✕
        </button>

        <h1 class="text-[23px] font-bold text-[#171717] text-center mb-4">
          Verify your email
        </h1>

        <p class="text-center text-gray-600 text-sm mb-2">
          Para confirmar esta operação, digite o código que enviamos para o seu e-mail:
          <span class="font-semibold text-[#171717]">{{ email }}</span>
        </p>
        <p class="text-center text-gray-500 text-sm mb-6">Reenviar código (40s)</p>

        <!-- Inputs -->
        <div class="flex justify-center space-x-3 mb-6">
          <input
            v-for="(digit, index) in codeDigits"
            :key="index"
            v-model="codeDigits[index]"
            maxlength="1"
            type="text"
            class="w-12 h-12 border border-gray-300 text-black rounded-md text-center text-lg
                   focus:ring-2 focus:ring-green-600 focus:outline-none"
          />
        </div>

        <!-- Botão -->
        <button
          @click="confirmCode"
          class="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-md
                 font-medium flex items-center justify-center gap-2 transition"
        >
          Continue →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const codeDigits = ref(['', '', '', '', '', ''])
const showVerification = ref(false) // controla modal

const goToVerification = () => {

  showVerification.value = true // abre modal
}

const confirmCode = () => {

  router.push('/compras') // redireciona ao confirmar
}
</script>
