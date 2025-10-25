<template>
  <CVSection title="Education">
    <div class="mt-4 space-y-4">
      <div v-for="edu in educationData" :key="edu.degree">
        <p class="font-semibold text-slate-800">{{ edu.degree }}</p>
        <p class="text-sm text-slate-600">{{ edu.institution }}</p>
        <p class="text-xs text-slate-500">{{ edu.period }}</p>
      </div>
    </div>
  </CVSection>
</template>

<script setup>
import CVSection from './CVSection.vue';
defineProps({
  educationData: Array,
});
</script>
