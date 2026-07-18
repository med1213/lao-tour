<script setup lang="ts">
const config = useRuntimeConfig()
const { data: places } = await useFetch<any[]>(`${config.public.apiBase}/places`, { default: () => [] })
const categories = ['All', 'Nature', 'Culture', 'Adventure', 'Food']
const selected = ref('All')
const filtered = computed(() => selected.value === 'All' ? places.value : places.value?.filter(p => p.category === selected.value))
</script>
<template>
  <div>
    <section class="grain relative min-h-[760px] overflow-hidden bg-[#16382b] pt-20 text-white">
      <img src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2200&q=90" alt="Lush Laos landscape" class="absolute inset-0 h-full w-full object-cover opacity-65" />
      <div class="absolute inset-0 bg-gradient-to-r from-[#102f23] via-[#16382b]/75 to-[#16382b]/15" />
      <div class="relative mx-auto flex min-h-[680px] max-w-7xl items-end px-5 pb-20 lg:px-8 lg:pb-28"><div class="max-w-3xl"><p class="mb-6 text-xs font-bold uppercase tracking-[.28em] text-[#ead384]">The land of a million elephants</p><h1 class="font-display text-5xl leading-[.95] sm:text-7xl lg:text-8xl">Find the Laos<br /><em class="text-[#e8cd78]">that stays with you.</em></h1><p class="mt-7 max-w-lg text-lg leading-8 text-white/80">Curated stories, soulful stays, and unforgettable places — made for travellers who prefer the road less rushed.</p><a href="#discover" class="mt-10 inline-flex items-center gap-3 rounded-full bg-[#e4c66d] px-6 py-3.5 font-semibold text-[#173a2b] transition hover:bg-[#f3dfa0]">Start exploring <span>→</span></a></div></div>
      <div class="absolute bottom-7 right-8 hidden text-right text-xs text-white/65 lg:block"><p class="uppercase tracking-[.2em]">Featured escape</p><p class="mt-1 font-display text-xl text-white">Kuang Si, Luang Prabang</p></div>
    </section>
    <section id="discover" class="mx-auto max-w-7xl px-5 py-24 lg:px-8"><div class="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><p class="text-xs font-bold uppercase tracking-[.22em] text-[#9d7f32]">Handpicked places</p><h2 class="mt-3 font-display text-4xl text-[#173a2b] sm:text-5xl">Discover at your own pace.</h2></div><div class="flex flex-wrap gap-2"><button v-for="c in categories" :key="c" @click="selected = c" class="rounded-full px-4 py-2 text-sm transition" :class="selected === c ? 'bg-[#173a2b] text-white' : 'bg-[#edf1eb] text-[#355347]'">{{ c }}</button></div></div>
      <div class="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3"><article v-for="(place, i) in filtered" :key="place.id" class="group overflow-hidden rounded-[1.6rem] bg-white surface"><div class="relative h-72 overflow-hidden"><img :src="place.image" :alt="place.title" class="h-full w-full object-cover transition duration-700 group-hover:scale-110"/><span class="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#173a2b] backdrop-blur">{{ place.category }}</span></div><div class="p-6"><p class="text-xs font-bold uppercase tracking-[.16em] text-[#9d7f32]">{{ place.province }}</p><h3 class="mt-2 font-display text-3xl text-[#173a2b]">{{ place.title }}</h3><p class="mt-3 leading-7 text-[#5b7066]">{{ place.excerpt }}</p><NuxtLink :to="`/places/${place.slug}`" class="mt-5 inline-block text-sm font-bold text-[#2f6650]">Discover the story →</NuxtLink></div></article></div>
    </section>
    <section id="journeys" class="bg-[#e7eee5] px-5 py-24 lg:px-8"><div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr]"><div><p class="text-xs font-bold uppercase tracking-[.22em] text-[#9d7f32]">The slow travel edit</p><h2 class="mt-4 font-display text-5xl leading-tight text-[#173a2b]">More than a destination.<br />A different rhythm.</h2></div><div class="grid gap-5 sm:grid-cols-2"><div class="rounded-3xl bg-[#173a2b] p-7 text-white"><p class="text-4xl">01</p><h3 class="mt-12 font-display text-3xl">Follow the river</h3><p class="mt-3 text-white/70">Let the Mekong set the pace for your journey.</p></div><div class="rounded-3xl bg-[#d8b95a] p-7 text-[#173a2b]"><p class="text-4xl">02</p><h3 class="mt-12 font-display text-3xl">Taste what’s local</h3><p class="mt-3 text-[#173a2b]/75">Markets, coffee, and recipes worth lingering over.</p></div></div></div>
    </section>
  </div>
</template>

