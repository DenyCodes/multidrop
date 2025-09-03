<template>
  <router-view />
</template>

<script setup>
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
