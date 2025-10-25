<template>
    <CVSection title="Languages">
        <div class="mt-4 space-y-2 text-sm">
            <p v-for="lang in languages" :key="lang.lang">
                <span class="font-semibold text-slate-700">{{ lang.lang }}:</span> 
                <span class="text-slate-600">{{ lang.level }}</span>
            </p>
        </div>
    </CVSection>
</template>

<script setup>
import CVSection from './CVSection.vue';
defineProps({
    languages: Array,
});
</script>
