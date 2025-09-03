import { createRouter, createWebHistory } from 'vue-router'

// layouts
import AuthLayout from '../layouts/AuthLayout.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'

// auth pages
import Login from '../pages/Login.vue'
import Success from '../pages/Success.vue'
import SetPassword from '../pages/SetPassword.vue'

// app pages
import Compras from '../pages/Purchases.vue'
import Refund from '../pages/RefundRequest.vue'
import Marketplace from '../pages/Marketplace.vue'
import Dashboard from '../pages/Dashboard.vue'
import Produtos from '../pages/Produtos.vue'
import ProdutoDetalhes from '../pages/ProdutoDetalhes.vue'
import Affiliations from '../pages/Affiliations.vue'
import { defineComponent } from 'vue'
import RefundDetails from '@/pages/RefundDetails.vue'

const routes = [
  // Rotas de autenticação (sem sidebar/footer)
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'login', name: 'Login', component: Login },
      { path: 'success', name: 'Success', component: Success },
      { path: 'set-password', name: 'SetPassword', component: SetPassword },
    ],
  },

  // Redireciona raiz para login
  { path: '/', redirect: '/login' },
  { path: '/login', redirect: '/auth/login' },
  // Rotas internas (com sidebar/footer)
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: 'dashboard', name: 'Dashboard', component: Dashboard },
      { path: 'produtos', name: 'Produtos', component: Produtos },
      { path: 'marketplace', name: 'Marketplace', component: Marketplace },
      { path: 'refund', name: 'Refund', component: Refund },
      { path: 'compras', name: 'Compras', component: Compras },
      { path: 'refundDetails', name: 'RefundDetails', component: RefundDetails },
      {
        path: 'produto-detalhes/:id',
        name: 'ProdutoDetalhes',
        component: ProdutoDetalhes,
        props: true,
      },
      {
        path: 'afiliacoes',
        name: 'AffiliationsPT',
        component: Affiliations,
        meta: { locale: 'pt' },
      },
      {
        path: 'affiliations',
        name: 'AffiliationsEN',
        component: Affiliations,
        meta: { locale: 'en' },
      },
      {
        path: 'integracoes',
        name: 'Integracoes',
        component: defineComponent({ template: '<div>Integrações</div>' }),
      },
      {
        path: 'settings',
        name: 'Settings',
        component: defineComponent({ template: '<div>Configurações</div>' }),
      },
      {
        path: 'support',
        name: 'Support',
        component: defineComponent({ template: '<div>Suporte</div>' }),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
