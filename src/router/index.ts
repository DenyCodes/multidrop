import { createRouter, createWebHistory } from 'vue-router'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import Affiliations from '../pages/Affiliations.vue'
import Produtos from '../pages/Produtos.vue'
import ProdutoDetalhes from '../pages/ProdutoDetalhes.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: defineComponent({ template: '<div>Dashboard</div>' }),
  },
  {
    path: '/marketplace',
    name: 'Marketplace',
    component: defineComponent({ template: '<div>Marketplace</div>' }),
  },
  {
    path: '/produtos',
    name: 'Produtos',
    component: Produtos,
  },
  {
  path: '/ProdutoDetalhes/:id',
  name: 'ProdutoDetalhes',
  component: ProdutoDetalhes,
  props: true
  },
  {
    path: '/afiliacoes',
    name: 'AffiliationsPT',
    component: Affiliations,
    meta: { locale: 'pt' },
  },
  {
    path: '/affiliations',
    name: 'AffiliationsEN',
    component: Affiliations,
    meta: { locale: 'en' },
  },
  {
    path: '/integracoes',
    name: 'Integracoes',
    component: defineComponent({ template: '<div>Integrações</div>' }),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: defineComponent({ template: '<div>Configurações</div>' }),
  },
  {
    path: '/support',
    name: 'Support',
    component: defineComponent({ template: '<div>Suporte</div>' }),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
