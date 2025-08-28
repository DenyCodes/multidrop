<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-green-900">
    <div class="bg-black/70 p-8 rounded-xl shadow-xl w-full max-w-md">
      <!-- Logo -->
      <h1 class="text-white text-2xl font-bold mb-6 text-center">MULTIDROP</h1>

      <!-- Form -->
      <form class="space-y-4">
        <input
          type="password"
          placeholder="Password"
          class="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="password"
          placeholder="Confirm password"
          class="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Salvar e Acessar
        </button>
      </form>
    </div>
  </div>
</template>
