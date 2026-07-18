<script setup lang="ts">
definePageMeta({ layout: false })

const config = useRuntimeConfig()
const email = ref('admin@laotour.la')
const password = ref('laotour2026')
const error = ref('')
const notice = ref('')
const logged = ref(false)
const collapsed = ref(false)
const active = ref<'overview' | 'places' | 'users'>('overview')
const places = ref<any[]>([])
const users = ref<any[]>([])
const form = reactive({ title: '', slug: '', excerpt: '', description: '', province: '', category: 'Nature', image: '', status: 'published' })

const menu = [
  { id: 'overview', label: 'Overview', icon: 'i-lucide-layout-dashboard' },
  { id: 'places', label: 'Places', icon: 'i-lucide-map-pinned' },
  { id: 'users', label: 'Users', icon: 'i-lucide-users-round' }
] as const

const authHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem('lao_token')}` })
async function load() {
  places.value = await $fetch(`${config.public.apiBase}/places`)
  users.value = await $fetch(`${config.public.apiBase}/auth/users`, { headers: authHeaders() })
}
async function login() {
  error.value = ''
  try {
    const result: any = await $fetch(`${config.public.apiBase}/auth/login`, { method: 'POST', body: { email: email.value, password: password.value } })
    localStorage.setItem('lao_token', result.accessToken)
    logged.value = true
    await load()
  } catch { error.value = 'Email or password is incorrect.' }
}
async function addPlace() {
  notice.value = ''
  try {
    await $fetch(`${config.public.apiBase}/places`, { method: 'POST', headers: authHeaders(), body: form })
    Object.assign(form, { title: '', slug: '', excerpt: '', description: '', province: '', category: 'Nature', image: '', status: 'published' })
    notice.value = 'Place published successfully.'
    await load()
  } catch { notice.value = 'Unable to publish. Please check every field.' }
}
function signOut() { localStorage.removeItem('lao_token'); logged.value = false }
onMounted(() => { if (localStorage.getItem('lao_token')) { logged.value = true; load().catch(signOut) } })
</script>

<template>
  <div v-if="!logged" class="grid min-h-screen place-items-center bg-[#f7f7f5] p-5 text-[#17261f]">
    <div class="w-full max-w-md rounded-[2rem] border border-[#e6e7e2] bg-white p-9 shadow-[0_20px_60px_rgba(22,43,32,.08)]">
      <NuxtLink to="/" class="flex items-center gap-2 font-display text-2xl"><span class="grid h-8 w-8 place-items-center rounded-full bg-[#173a2b] text-sm text-[#f0d982]">ລ</span>Lao Tour</NuxtLink>
      <p class="mt-10 text-xs font-bold uppercase tracking-[.2em] text-[#9d7f32]">Admin c-panel</p><h1 class="mt-2 font-display text-4xl">Welcome back.</h1><p class="mt-2 text-[#698076]">Sign in to manage your travel stories.</p>
      <form class="mt-8 space-y-4" @submit.prevent="login"><input v-model="email" type="email" class="login-input" placeholder="Email"/><input v-model="password" type="password" class="login-input" placeholder="Password"/><p v-if="error" class="text-sm text-red-600">{{ error }}</p><button class="w-full rounded-xl bg-[#173a2b] py-3 font-semibold text-white transition hover:bg-[#285941]">Sign in</button></form>
    </div>
  </div>

  <div v-else class="min-h-screen bg-[#f7f7f5] text-[#17261f]">
    <aside class="fixed inset-y-0 left-0 z-20 flex flex-col border-r border-[#e6e7e2] bg-white p-3 transition-all duration-300" :class="collapsed ? 'w-[76px]' : 'w-64'">
      <div class="flex h-12 items-center" :class="collapsed ? 'justify-center' : 'justify-between px-2'"><NuxtLink to="/" class="flex items-center gap-3 overflow-hidden"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#173a2b] font-display text-lg text-[#f0d982]">ລ</span><span v-if="!collapsed" class="whitespace-nowrap font-display text-2xl">Lao Tour</span></NuxtLink><button v-if="!collapsed" class="sidebar-button" title="Collapse menu" @click="collapsed = true"><UIcon name="i-lucide-panel-left-close" /></button></div>
      <button v-if="collapsed" class="sidebar-button mx-auto mt-4" title="Expand menu" @click="collapsed = false"><UIcon name="i-lucide-panel-left-open" /></button>
      <nav class="mt-10 space-y-1"><button v-for="item in menu" :key="item.id" class="group flex w-full items-center rounded-xl py-3 text-sm font-medium transition" :class="[active === item.id ? 'bg-[#e7eee5] text-[#173a2b]' : 'text-[#6b7f76] hover:bg-[#f4f6f2] hover:text-[#173a2b]', collapsed ? 'justify-center px-0' : 'gap-3 px-3']" :title="collapsed ? item.label : undefined" @click="active = item.id"><UIcon :name="item.icon" class="h-5 w-5 shrink-0"/><span v-if="!collapsed">{{ item.label }}</span></button></nav>
      <div class="mt-auto border-t border-[#e6e7e2] pt-3"><NuxtLink to="/" class="flex items-center rounded-xl py-3 text-sm text-[#6b7f76] hover:bg-[#f4f6f2]" :class="collapsed ? 'justify-center' : 'gap-3 px-3'" :title="collapsed ? 'View website' : undefined"><UIcon name="i-lucide-external-link" class="h-5 w-5"/><span v-if="!collapsed">View website</span></NuxtLink><button class="flex w-full items-center rounded-xl py-3 text-sm text-[#6b7f76] hover:bg-red-50 hover:text-red-600" :class="collapsed ? 'justify-center' : 'gap-3 px-3'" :title="collapsed ? 'Sign out' : undefined" @click="signOut"><UIcon name="i-lucide-log-out" class="h-5 w-5"/><span v-if="!collapsed">Sign out</span></button></div>
    </aside>

    <main class="min-h-screen transition-all duration-300" :class="collapsed ? 'pl-[76px]' : 'pl-64'">
      <header class="flex h-20 items-center justify-between border-b border-[#e6e7e2] bg-white px-6 lg:px-10"><div><p class="text-xs font-bold uppercase tracking-[.18em] text-[#9d7f32]">Admin c-panel</p><h1 class="mt-1 font-display text-2xl">{{ active === 'overview' ? 'Dashboard overview' : active === 'places' ? 'Manage places' : 'Team members' }}</h1></div><div class="flex items-center gap-3"><span class="hidden text-right text-sm sm:block"><b class="block">Lao Tour Admin</b><span class="text-[#6b7f76]">Administrator</span></span><span class="grid h-10 w-10 place-items-center rounded-full bg-[#e7eee5] font-semibold text-[#285941]">LT</span></div></header>
      <div class="mx-auto max-w-7xl p-6 lg:p-10">
        <section v-if="active === 'overview'"><div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"><div class="stat-card"><span class="stat-icon"><UIcon name="i-lucide-map"/></span><p>Published places</p><strong>{{ places.length }}</strong><small>Discoveries across Laos</small></div><div class="stat-card"><span class="stat-icon"><UIcon name="i-lucide-users"/></span><p>Team members</p><strong>{{ users.length }}</strong><small>People with admin access</small></div><div class="stat-card sm:col-span-2 xl:col-span-1"><span class="stat-icon"><UIcon name="i-lucide-sparkles"/></span><p>Site status</p><strong class="text-emerald-700">Live</strong><small>All services connected</small></div></div><section class="mt-8 rounded-3xl border border-[#e6e7e2] bg-white p-6"><div class="flex items-center justify-between"><div><p class="text-xs font-bold uppercase tracking-[.16em] text-[#9d7f32]">Latest places</p><h2 class="mt-1 font-display text-3xl">Your travel collection</h2></div><button class="rounded-xl bg-[#173a2b] px-4 py-2 text-sm font-semibold text-white" @click="active = 'places'">Add new place</button></div><div class="mt-6 grid gap-4 md:grid-cols-3"><article v-for="place in places.slice(0, 3)" :key="place.id" class="overflow-hidden rounded-2xl bg-[#f7f7f5]"><img :src="place.image" :alt="place.title" class="h-32 w-full object-cover"/><div class="p-4"><p class="text-xs font-bold uppercase tracking-wider text-[#9d7f32]">{{ place.province }}</p><h3 class="mt-1 font-display text-xl">{{ place.title }}</h3></div></article></div></section></section>
        <section v-else-if="active === 'places'" class="grid gap-7 xl:grid-cols-[1.2fr_.8fr]"><div class="rounded-3xl border border-[#e6e7e2] bg-white p-6"><div class="flex items-center justify-between"><div><p class="text-xs font-bold uppercase tracking-[.16em] text-[#9d7f32]">Content library</p><h2 class="mt-1 font-display text-3xl">All places</h2></div><span class="rounded-full bg-[#e7eee5] px-3 py-1 text-sm">{{ places.length }} live</span></div><div class="mt-5 divide-y divide-[#e6e7e2]"><article v-for="place in places" :key="place.id" class="flex items-center gap-4 py-4"><img :src="place.image" :alt="place.title" class="h-14 w-14 rounded-xl object-cover"/><div class="min-w-0 flex-1"><h3 class="truncate font-semibold">{{ place.title }}</h3><p class="mt-1 text-sm text-[#6b7f76]">{{ place.province }} · {{ place.category }}</p></div><span class="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">{{ place.status }}</span></article></div></div><section class="rounded-3xl bg-[#173a2b] p-6 text-white"><p class="text-xs font-bold uppercase tracking-[.16em] text-[#e9d486]">Create a post</p><h2 class="mt-1 font-display text-3xl">Add a place</h2><p class="mt-2 text-sm text-white/65">Publish a new destination to the public website.</p><form class="mt-6 space-y-3" @submit.prevent="addPlace"><input v-model="form.title" required placeholder="Place name" class="admin-input"/><input v-model="form.slug" required placeholder="URL slug, e.g. vientiane-night" class="admin-input"/><div class="grid grid-cols-2 gap-3"><input v-model="form.province" required placeholder="Province" class="admin-input"/><select v-model="form.category" class="admin-input"><option>Nature</option><option>Culture</option><option>Adventure</option><option>Food</option></select></div><input v-model="form.image" required placeholder="Image URL" class="admin-input"/><textarea v-model="form.excerpt" required placeholder="Short introduction" class="admin-input min-h-20"/><textarea v-model="form.description" required placeholder="Full story" class="admin-input min-h-24"/><p v-if="notice" class="text-sm text-[#f0d982]">{{ notice }}</p><button class="w-full rounded-xl bg-[#e4c66d] py-3 font-semibold text-[#173a2b] transition hover:bg-[#f2d987]">Publish place</button></form></section></section>
        <section v-else class="rounded-3xl border border-[#e6e7e2] bg-white p-6"><p class="text-xs font-bold uppercase tracking-[.16em] text-[#9d7f32]">Access management</p><h2 class="mt-1 font-display text-3xl">Users</h2><div class="mt-6 divide-y divide-[#e6e7e2]"><div v-for="user in users" :key="user.id" class="flex items-center gap-4 py-4"><span class="grid h-11 w-11 place-items-center rounded-full bg-[#e7eee5] font-semibold text-[#285941]">{{ user.name.slice(0, 1) }}</span><div class="flex-1"><p class="font-semibold">{{ user.name }}</p><p class="text-sm text-[#6b7f76]">{{ user.email }}</p></div><span class="rounded-full bg-[#f7f2dd] px-3 py-1 text-xs font-semibold capitalize text-[#8a6a19]">{{ user.role }}</span></div></div></section>
      </div>
    </main>
  </div>
</template>

<style scoped>
.login-input{width:100%;border-radius:.75rem;background:#f3f5f1;padding:.8rem 1rem;color:#17261f;outline:none}.login-input:focus{box-shadow:0 0 0 2px #d7b860}.sidebar-button{display:grid;height:2.25rem;width:2.25rem;place-items:center;border-radius:.65rem;color:#587065}.sidebar-button:hover{background:#f4f6f2;color:#173a2b}.stat-card{border:1px solid #e6e7e2;border-radius:1.5rem;background:white;padding:1.5rem}.stat-card p{margin-top:1.25rem;color:#6b7f76;font-size:.875rem}.stat-card strong{display:block;margin-top:.15rem;font-family:var(--font-serif);font-size:2.5rem}.stat-card small{color:#8a9a92}.stat-icon{display:grid;height:2.5rem;width:2.5rem;place-items:center;border-radius:.75rem;background:#e7eee5;color:#285941;font-size:1.25rem}.admin-input{width:100%;border-radius:.75rem;background:rgba(255,255,255,.11);padding:.75rem 1rem;color:white;outline:none}.admin-input::placeholder{color:rgba(255,255,255,.55)}.admin-input:focus{box-shadow:0 0 0 2px rgba(228,198,109,.8)}.admin-input option{color:#17261f}
</style>
