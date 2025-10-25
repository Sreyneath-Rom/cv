<template>
  <CVSection title="Professional Development">
    <div class="mt-4 space-y-4">
      <div v-for="dev in developmentData" :key="dev.title" class="text-sm">
        <h3 class="font-semibold text-slate-800">{{ dev.title }} ({{ dev.date }})</h3>
        <p class="text-slate-600">{{ dev.description }}</p>
      </div>
    </div>
  </CVSection>
</template>

<script setup>
import CVSection from './CVSection.vue';
defineProps({
  developmentData: Array,
});
</script>
