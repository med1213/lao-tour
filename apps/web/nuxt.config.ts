export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: { public: { apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001/api' } },
  app: { head: { title: 'Lao Tour — Discover the Soul of Laos', meta: [{ name: 'description', content: 'Curated journeys through Laos.' }] } },
  devtools: { enabled: true },
  compatibilityDate: '2025-02-01'
})

