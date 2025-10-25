<template>
  <CVSection title="Experience & Projects">
    <div class="mt-4 space-y-6">
      <div v-for="exp in experienceData" :key="exp.title" class="text-sm">
        <div class="flex justify-between items-baseline">
          <h3 class="font-semibold text-slate-800">{{ exp.title }}</h3>
          <p class="text-xs text-slate-500 font-medium">{{ exp.period }}</p>
        </div>
        <p class="text-xs text-teal-600 font-medium">Role: {{ exp.role }}</p>
        <ul class="mt-2 list-disc list-outside pl-5 space-y-1 text-slate-600">
          <li v-for="(desc, index) in exp.descriptions" :key="index">{{ desc }}</li>
        </ul>
      </div>
    </div>
  </CVSection>
</template>

<script setup>
import CVSection from './CVSection.vue';
defineProps({
  experienceData: Array,
});
</script>
