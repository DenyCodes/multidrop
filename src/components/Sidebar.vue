<template>
  <aside class="sidebar">
    <!-- Logo -->
    <div class="logo">
      <img src="/logo.png" alt="Multidrop Logo" />
      <Button icon="pi pi-bars" text class="menu-toggle" />
    </div>

    <!-- Menu principal -->
    <nav class="menu">
      <RouterLink to="/dashboard" class="menu-item" active-class="active">
        <i class="pi pi-home"></i>
        <span>{{ $t("menu.dashboard") }}</span>
      </RouterLink>

      <RouterLink to="/dashboard" class="menu-item" active-class="active">
        <i class="pi pi-shopping-cart"></i>
        <span>{{ $t("menu.marketplace") }}</span>
      </RouterLink>

      <RouterLink to="/produtos" class="menu-item" active-class="active">
        <i class="pi pi-box"></i>
        <span>{{ $t("menu.products") }}</span>
      </RouterLink>

      <RouterLink to="/afiliacoes" class="menu-item" active-class="active">
        <i class="pi pi-users"></i>
        <span>{{ $t('menu.affiliations') }}</span>
      </RouterLink>

      <RouterLink to="/integracoes" class="menu-item" active-class="active">
        <i class="pi pi-link"></i>
        <span>{{ $t("menu.integrations") }}</span>
      </RouterLink>
    </nav>

    <!-- Bloco do Portal -->
    <div class="portal-box">
      <i class="pi pi-graduation-cap"></i>
      <div>
        <span class="portal-title">TAO Admin</span>
        <p class="portal-sub">Members area</p>
      </div>
      <i class="pi pi-angle-right arrow"></i>
    </div>

    <hr class="divider" />

    <!-- Menu secundário -->
    <nav class="menu secondary">
      <RouterLink to="/support" class="menu-item" active-class="active">
        <i class="pi pi-question-circle"></i>
        <span>{{ $t("menu.support") }}</span>
      </RouterLink>

      <RouterLink to="/settings" class="menu-item" active-class="active">
        <i class="pi pi-cog"></i>
        <span>{{ $t("menu.settings") }}</span>
      </RouterLink>
    </nav>

    <!-- Perfil do usuário -->
    <div class="user-profile">
      <img class="avatar" src="https://i.pravatar.cc/40?img=3" alt="User" />
      <div class="user-info">
        <p class="name">Denis Oliveira</p>
        <p class="role">Dev3loper</p>
      </div>
      <Button icon="pi pi-ellipsis-v" text />
    </div>
  </aside>
</template>

<script setup>
import { RouterLink } from "vue-router"
import Button from "primevue/button"
</script>

<style scoped>
.sidebar {
  width: 260px;
  height: 100vh;
  background: #171717; /* preto correto */
  color: #f9fafb;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  left: 0;
  top: 0;
}

.logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #262626;
}

.logo img {
  height: 32px;
}

.menu {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  color: #d4d4d4;
  text-decoration: none;
  font-size: 0.95rem;
  transition: background 0.2s, color 0.2s;
}

.menu-item i {
  font-size: 1.2rem;
  width: 20px;
  text-align: center;
}

.menu-item:hover {
  background: #262626;
  color: #22c55e;
}

.menu-item.active {
  background: #262626;
  border-left: 3px solid #22c55e;
  color: #22c55e;
}

.portal-box {
  margin: 1rem;
  padding: 1rem;
  background: #262626;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.portal-box i {
  font-size: 1.2rem;
  color: #22c55e;
}

.portal-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: #fff;
}

.portal-sub {
  font-size: 0.8rem;
  color: #a3a3a3;
  margin: 0;
}

.portal-box .arrow {
  margin-left: auto;
  color: #9ca3af;
}

.divider {
  border: none;
  border-top: 1px solid #262626;
  margin: 0.8rem 0;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 1rem;
  background: #262626;
  border-radius: 8px;
  margin: 1rem;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user-info {
  flex: 1;
}

.user-info .name {
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
  color: #fff;
}

.user-info .role {
  font-size: 0.8rem;
  color: #a3a3a3;
  margin: 0;
}
</style>
