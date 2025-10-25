<template>
  <header class="text-center pb-6 border-b border-slate-200">
    <h1 class="text-4xl font-bold text-teal-800 tracking-tight">{{ personalInfo.name }}</h1>
    <p class="mt-2 text-xl font-medium text-slate-600">{{ personalInfo.position }}</p>
    <div class="mt-4 flex justify-center items-center gap-x-6 gap-y-2 text-sm text-slate-500 flex-wrap">
      <a :href="'mailto:' + contact.email" class="hover:text-teal-600">{{ contact.email }}</a>
      <span>&bull;</span>
      <span>{{ contact.phone }}</span>
      <span>&bull;</span>
      <a href="https://github.com/yourusername" target="_blank" class="hover:text-teal-600">github.com/yourusername</a>
    </div>
  </header>
</template>

<script setup>
defineProps({
  personalInfo: Object,
  contact: Object,
});
</script>