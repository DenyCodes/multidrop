<template>
  <router-view />
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Login from './pages/Login.vue'
import Dash from './pages/Dash.vue'
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
