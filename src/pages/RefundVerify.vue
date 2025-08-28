<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8 relative">
      <!-- Fechar -->
      <button
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        @click="close"
      >
        ✕
      </button>

      <!-- Título -->
      <h1 class="text-[23px] font-bold text-[#171717] text-center mb-4">
        Verify your email
      </h1>

      <!-- Texto -->
      <p class="text-center text-gray-600 text-sm mb-2">
        Para confirmar esta operação, digite o código que enviamos para o seu e-mail:
        <span class="font-semibold text-[#171717]">{{ email }}</span>
      </p>
      <p class="text-center text-gray-500 text-sm mb-6">
        Reenviar código (40s)
      </p>

      <!-- Inputs de código -->
      <div class="flex justify-center space-x-3 mb-6">
        <input
          v-for="(digit, index) in codeDigits"
          :key="index"
          v-model="codeDigits[index]"
          maxlength="1"
          type="text"
          class="w-12 h-12 border border-gray-300 rounded-md text-center text-lg focus:ring-2 focus:ring-green-600 focus:outline-none"
        />
      </div>

      <!-- Botão -->
      <button
        @click="confirmCode"
        class="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-md font-medium flex items-center justify-center gap-2 transition"
      >
        Continue
        <span>→</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('john@liberttar.com')
const codeDigits = ref(['', '', '', '', '', ''])

const confirmCode = () => {
  const code = codeDigits.value.join('')
  if (code.length < 6) {
    alert('Digite os 6 dígitos.')
    return
  }
  alert(`Código ${code} confirmado!`)
}

const close = () => {
  alert('Fechar modal')
}
</script>
