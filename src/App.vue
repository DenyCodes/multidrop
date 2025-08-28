<template>
  <div class="layout">
    <!-- Sidebar fixa -->
    <Sidebar />

    <!-- Conteúdo principal -->
    <div class="content">
      <!-- <Header /> -->

      <main class="main-content">
        <router-view />
      </main>

      <Footer />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  width: 100%;
  background: #f9fafb;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 260px; /* largura da sidebar */
}

.main-content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}
</style>
