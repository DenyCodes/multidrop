<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Botão voltar -->
      <button
        @click="$router.back()"
        class="flex items-center text-sm text-blue-600 hover:underline mb-4"
      >
        ← Voltar para minhas afiliações
      </button>

      <!-- Card principal -->
      <div
        v-if="produto"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      >
        <!-- Tabs -->
        <div class="flex border-b border-gray-200 dark:border-gray-700">
          <button
            class="px-6 py-3 text-sm font-medium"
            :class="aba === 'detalhes' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600 dark:text-gray-400'"
            @click="aba = 'detalhes'"
          >
            Detalhes
          </button>
          <button
            class="px-6 py-3 text-sm font-medium"
            :class="aba === 'pixels' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600 dark:text-gray-400'"
            @click="aba = 'pixels'"
          >
            Pixels
          </button>
        </div>

        <!-- Conteúdo -->
        <div v-if="aba === 'detalhes'" class="p-6">
          <!-- Cabeçalho -->
          <div class="flex flex-col md:flex-row gap-6">
            <img
              :src="produto.imagem"
              alt="Imagem"
              class="w-60 h-40 rounded-lg object-cover shadow"
            />
            <div class="flex-1">
              <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
                {{ produto.nome }}
              </h2>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                By {{ produto.autor }}
              </p>
              <p
                class="mt-2 text-sm inline-block bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
              >
                {{ produto.categoria }}
              </p>

              <div class="mt-3 flex flex-col md:flex-row md:items-center gap-3">
                <span class="text-green-600 font-semibold">
                  Profit up to: {{ produto.profit }}
                </span>
                <span class="text-gray-500 dark:text-gray-300">
                  Maximum price: {{ produto.maxPrice }}
                </span>
              </div>

              <button
                class="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              >
                Remover afiliação
              </button>
            </div>
          </div>

          <!-- Informações principais -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p><strong>Página de vendas:</strong>
                <a
                  :href="produto.link"
                  class="text-blue-600 hover:underline ml-1"
                  target="_blank"
                >
                  {{ produto.link }}
                </a>
              </p>
              <p><strong>Preço:</strong> {{ produto.preco }}</p>
              <p><strong>Comissão:</strong> {{ produto.comissao }}</p>
              <p><strong>Prazo de garantia:</strong> {{ produto.garantia }}</p>
              <p><strong>Email de suporte:</strong> {{ produto.suporte }}</p>
              <p><strong>Tipo:</strong> {{ produto.tipo }}</p>
            </div>

            <div>
              <h3 class="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Description:
              </h3>
              <p
                class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-sm"
              >
                {{ produto.descricao }}
              </p>
            </div>
          </div>

          <!-- Ofertas -->
          <div class="mt-8">
            <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
              Ofertas
            </h3>
            <div class="overflow-x-auto">
              <table class="w-full text-sm border-collapse">
                <thead>
                  <tr
                    class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                  >
                    <th class="p-3 text-left">Nome</th>
                    <th class="p-3 text-left">Preço</th>
                    <th class="p-3 text-left">Profit</th>
                    <th class="p-3 text-left">Comissão</th>
                    <th class="p-3 text-left">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(oferta, i) in produto.ofertas"
                    :key="i"
                    class="border-t border-gray-200 dark:border-gray-600"
                  >
                    <td class="p-3">{{ oferta.nome }}</td>
                    <td class="p-3">{{ oferta.preco }}</td>
                    <td class="p-3">{{ oferta.profit }}</td>
                    <td class="p-3">{{ oferta.comissao }}</td>
                    <td class="p-3">
                      <button
                        class="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded"
                      >
                        Copiar link
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Links -->
          <div class="mt-8">
            <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
              Links
            </h3>
            <ul class="space-y-2 text-sm">
              <li v-for="(link, i) in produto.links" :key="i">
                <span class="font-semibold mr-2">{{ link.label }}:</span>
                <a
                  :href="link.url"
                  target="_blank"
                  class="text-blue-600 hover:underline"
                >
                  {{ link.url }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Conteúdo Pixel -->
        <div v-if="aba === 'pixels'" class="p-6">
          <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Pixels de conversão
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Aqui você poderá configurar pixels de acompanhamento (Facebook,
            Google, etc.).
          </p>
        </div>
      </div>

      <div
        v-else
        class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-10 text-center text-gray-500 dark:text-gray-400"
      >
        Carregando produto...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const produto = ref<any>(null)
const aba = ref("detalhes")

onMounted(() => {
  const id = route.params.id
  produto.value = {
    id,
    nome: "Fit Mit Dr. Christine Theiss",
    autor: "Christine Theiss",
    categoria: "Curso Online",
    profit: "85,35 €",
    maxPrice: "206,00 €",
    link: "https://cbtchristinetheiss.de",
    preco: "€ 399,00",
    comissao: "€ 167,64",
    garantia: "14 dias",
    suporte: "email@exemplo.com",
    tipo: "Produto Digital",
    descricao: `🔥 Werde Teil meines Affiliate-Teams & verdiene mit einem der gefragtesten Fitness-Kurse!

💡 Mein Online-Kurs Fit mit Dr. Christine Theiss hilft Menschen dabei, nachhaltig abzunehmen, Bewegung mühelos in den Alltag zu integrieren und sich endlich wieder wohl in ihrem Körper zu fühlen.`,
    imagem: "https://picsum.photos/400/200?random=1",
    ofertas: [
      {
        nome: "Checkout",
        preco: "€ 150,00",
        profit: "€ 120,00",
        comissao: "50%"
      },
      {
        nome: "Pré-lançamento",
        preco: "€ 150,00",
        profit: "€ 120,00",
        comissao: "50%"
      },
      {
        nome: "Páscoa 2025",
        preco: "€ 150,00",
        profit: "€ 120,00",
        comissao: "50%"
      }
    ],
    links: [
      {
        label: "Materiais de campanha",
        url: "https://mailchimp.com/pt-br/help/about-api-keys/"
      },
      {
        label: "Imagens",
        url: "https://mailchimp.com/pt-br/help/about-api-keys/"
      }
    ]
  }
})
</script>
