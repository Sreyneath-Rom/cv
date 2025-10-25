<template>
  <CVSection title="Skills">
    <div class="mt-4 space-y-3 text-sm">
      <div>
        <h3 class="font-semibold text-slate-700">Technical Skills</h3>
        <p class="text-slate-600">{{ hardSkills.join(', ') }}</p>
      </div>
      <div>
        <h3 class="font-semibold text-slate-700">Tools & Platforms</h3>
        <p class="text-slate-600">{{ technicalTools.join(', ') }}</p>
      </div>
      <div>
        <h3 class="font-semibold text-slate-700">Soft Skills</h3>
        <p class="text-slate-600">{{ softSkills.join(', ') }}</p>
      </div>
    </div>
  </CVSection>
</template>

<script setup>
import CVSection from './CVSection.vue';
defineProps({
  hardSkills: Array,
  technicalTools: Array,
  softSkills: Array,
});
</script>
