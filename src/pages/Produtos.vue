<template>
  <section class="produtos">
    <h1 class="page-title">{{ $t("products.title") }}</h1>

    <DataTable
      :value="produtos"
      paginator
      :rows="5"
      class="p-datatable-striped"
    >
      <Column field="nome" :header="$t('products.table.name')" />
      <Column field="preco" :header="$t('products.table.price')" />
      <Column field="status" :header="$t('products.table.status')" />

      <!-- Coluna com botão de detalhes -->
      <Column :header="$t('products.table.actions')">
        <template #body="slotProps">
          <Button
            label="Ver detalhes"
            size="small"
            @click="verDetalhes(slotProps.data.id)"
          />
        </template>
      </Column>
    </DataTable>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import Button from "primevue/button"

// Tipagem do produto
interface Produto {
  id: number
  nome: string
  preco: string
  status: string
}

const router = useRouter()

const produtos = ref<Produto[]>([
  { id: 1, nome: "Fit Mit Dr. Christine Theiss", preco: "R$ 120", status: "Ativo" },
  { id: 2, nome: "Guia Prático de Marketing Digital", preco: "R$ 89", status: "Pendente" }
])

function verDetalhes(id: number) {
router.push({ name: "ProdutoDetalhes", params: { id } })
}
</script>

<style scoped>
.page-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}
</style>
