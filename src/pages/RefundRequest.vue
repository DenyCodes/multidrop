<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <!-- Logo -->
    <div class="flex justify-center mb-8">
      <img src="/logo.png" alt="Multidrop" class="h-10 w-auto" />
    </div>

    <!-- Conteúdo -->
    <div class="w-full max-w-md bg-white border border-gray-200 rounded-md shadow-sm p-8">
      <!-- Título -->
      <h1 class="text-[24px] font-bold text-[#171717] text-center mb-2">
        Solicitar reembolso
      </h1>
      <p class="text-[14px] leading-[150%] text-gray-600 text-center mb-8">
        Você pode solicitar um reembolso dentro do prazo estipulado pelo produtor.
      </p>

      <!-- Form -->
      <form @submit.prevent="submitRefund">
        <label
          for="email"
          class="block text-sm font-medium text-[#171717] mb-2"
        >
          E-mail usado na compra
        </label>

        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="Digite seu e-mail"
          class="w-full h-11 px-3 border border-gray-300 rounded-md
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
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

const submitRefund = () => {
  if (!email.value) {
    alert('Digite seu e-mail')
    return
  }
  alert(`Enviamos um código de verificação para ${email.value}`)
}
</script>
