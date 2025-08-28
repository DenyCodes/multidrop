<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0a2b1f] to-green-900 px-4">
    <div class="w-full max-w-md bg-[#111111]/90 rounded-xl shadow-2xl p-8">

      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center space-x-3">
          <img src="/logo.png" alt="Multidrop" class="h-10 w-auto" />
          <span class="text-white text-xl font-extrabold tracking-wide">MULTIDROP</span>
        </div>
        <a href="#" class="text-green-400 hover:text-green-300 font-medium">Criar conta</a>
      </div>

      <!-- Form -->
      <form class="space-y-5">
        <!-- Nome -->
        <div>
          <label class="block text-sm font-medium text-gray-200 mb-1">Nome</label>
          <input
            type="text"
            placeholder="Digite seu nome"
            class="input-field"
          />
        </div>

        <!-- Sobrenome -->
        <div>
          <label class="block text-sm font-medium text-gray-200 mb-1">Sobrenome</label>
          <input
            type="text"
            placeholder="Digite seu sobrenome"
            class="input-field"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-200 mb-1">Email</label>
          <input
            type="email"
            placeholder="Digite seu email"
            class="input-field"
          />
        </div>

        <!-- Checkbox -->
        <div class="flex items-start space-x-2">
          <input
            id="terms"
            type="checkbox"
            class="h-4 w-4 text-green-600 bg-gray-800 border-gray-700 rounded focus:ring-green-500"
          />
          <label for="terms" class="text-xs text-gray-400 leading-5">
            Declaro que li e aceito os
            <a href="#" class="text-green-400 hover:underline">Termos de Serviço e Uso</a>
            da Multidrop e a sua Política de Privacidade.
          </label>
        </div>

        <!-- Botão -->
        <button
          type="submit"
          class="btn-primary"
        >
          Cadastrar
        </button>
      </form>

      <!-- Footer -->
      <p class="text-center text-sm text-gray-400 mt-8">
        Já tem uma conta?
        <a href="#" class="text-green-400 hover:underline font-medium">Entrar</a>
      </p>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.input-field {
  @apply w-full px-4 py-2 rounded-lg bg-gray-900 text-white placeholder-gray-500
         border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500;
}

.btn-primary {
  @apply w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg
         font-semibold tracking-wide transition duration-200 shadow-md;
}
</style>
