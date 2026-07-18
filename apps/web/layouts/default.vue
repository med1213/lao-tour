<script setup lang="ts">
const open = ref(false)
const nav = [{ label: 'Explore', to: '/#discover' }, { label: 'Journeys', to: '/#journeys' }, { label: 'About Laos', to: '/#about' }]
</script>
<template>
  <div>
    <header class="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#16382b]/90 text-white backdrop-blur-lg">
      <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <NuxtLink to="/" class="flex items-center gap-3 font-display text-2xl tracking-wide"><span class="grid h-9 w-9 place-items-center rounded-full border border-[#cfb46c] text-sm text-[#e9d18b]">ລ</span>Lao Tour</NuxtLink>
        <nav class="hidden items-center gap-8 text-sm text-white/80 md:flex"><NuxtLink v-for="item in nav" :key="item.label" :to="item.to" class="transition hover:text-[#efd788]">{{ item.label }}</NuxtLink></nav>
        <NuxtLink to="/admin" class="hidden rounded-full border border-[#d9c172]/60 px-5 py-2 text-sm text-[#f5e7b0] transition hover:bg-[#d9c172] hover:text-[#16382b] sm:block">Admin portal</NuxtLink>
        <button class="md:hidden" @click="open = !open" aria-label="Toggle menu">☰</button>
      </div>
      <div v-if="open" class="space-y-3 border-t border-white/10 px-5 py-4 md:hidden"><NuxtLink v-for="item in nav" :key="item.label" :to="item.to" class="block" @click="open = false">{{ item.label }}</NuxtLink></div>
    </header>
    <main><slot /></main>
    <footer class="bg-[#102a20] px-5 py-12 text-white/70"><div class="mx-auto flex max-w-7xl flex-col justify-between gap-5 sm:flex-row"><div><p class="font-display text-2xl text-white">Lao Tour</p><p class="mt-2 text-sm">Slow down. Look closer. Travel beautifully.</p></div><p class="text-sm">© 2026 Lao Tour · Crafted in Laos</p></div></footer>
  </div>
</template>

