<template>
  <section class="affiliations">
    <h1 class="page-title">{{ $t("affiliations.my") }}</h1>

    <!-- Filtros -->
    <div class="filters">
      <span class="p-input-icon-left search-box">
        <i class="pi pi-search" />
        <InputText
          v-model="search"
          :placeholder="$t('affiliations.search')"
        />
      </span>

      <Dropdown
        v-model="category"
        :options="categories"
        optionLabel="label"
        optionValue="value"
        :placeholder="$t('affiliations.category')"
        class="dropdown"
      />

      <Dropdown
        v-model="type"
        :options="types"
        optionLabel="label"
        optionValue="value"
        :placeholder="$t('affiliations.type')"
        class="dropdown"
      />
    </div>

    <!-- Lista de Afiliações -->
    <div class="affiliation-list">
      <div
        v-for="item in filteredAffiliations"
        :key="item.id"
        class="affiliation-item"
      >
        <img :src="item.image" alt="thumb" class="thumb" />

        <div class="info">
          <h3>{{ item.title }}</h3>
          <p class="meta">
            {{ item.type }} • {{ $t("affiliations.date") }}: {{ item.date }}
          </p>
        </div>

        <Tag :value="item.status.label" :severity="item.status.color" />

        <div class="commission">
          {{ item.commission }}%
        </div>

        <Button icon="pi pi-ellipsis-v" text />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue"
import InputText from "primevue/inputtext"
import Dropdown from "primevue/dropdown"
import Tag from "primevue/tag"
import Button from "primevue/button"

const affiliations = ref([
  {
    id: 1,
    image: "https://picsum.photos/100/60?random=1",
    title: "Fit Mit Dr. Christine Theiss",
    type: "Curso",
    date: "01/04/2025 - 16:04",
    status: { label: "Affiliate", color: "success" },
    commission: 42
  },
  {
    id: 2,
    image: "https://picsum.photos/100/60?random=2",
    title: "Guia Prático de Marketing Digital",
    type: "Arquivos",
    date: "01/04/2025 - 16:04",
    status: { label: "Kein Affiliate", color: "danger" },
    commission: 42
  },
  {
    id: 3,
    image: "https://picsum.photos/100/60?random=3",
    title: "Outro Curso de Treinamento",
    type: "Curso",
    date: "01/04/2025 - 16:04",
    status: { label: "Affiliate", color: "success" },
    commission: 42
  }
])

const search = ref("")
const category = ref(null)
const type = ref(null)

const categories = [
  { label: "Cursos", value: "curso" },
  { label: "Arquivos", value: "arquivo" }
]

const types = [
  { label: "Ativo", value: "ativo" },
  { label: "Inativo", value: "inativo" }
]

const filteredAffiliations = computed(() => {
  return affiliations.value.filter((item) =>
    item.title.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>

<style scoped>
.page-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
}

.search-box {
  flex: 1; 
}

.search-box input {
  width: 100%;
}

.dropdown {
  min-width: 180px;
}

.affiliation-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.affiliation-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
}

.thumb {
  width: 100px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.info {
  flex: 1;
}

.info h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.info .meta {
  font-size: 0.85rem;
  color: #6b7280;
}

.commission {
  font-weight: bold;
  margin: 0 1rem;
}
</style>
