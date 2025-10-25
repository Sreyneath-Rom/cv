<template>
  <section>
    <h2 class="section-title">{{ title }}</h2>
    <slot></slot> <!-- Content for the section will be injected here -->
  </section>
</template>

<script setup>
defineProps({
  title: String,
});
</script>


