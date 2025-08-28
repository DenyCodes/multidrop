import { defineConfigWithVueTs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

// Garante que pega o diretório raiz
const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,   // 👈 forçando o caminho absoluto
        project: './tsconfig.json'
      }
    }
  },
  {
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
    plugins: { vue: pluginVue },
    rules: {
      // suas regras aqui
    }
  }
)
