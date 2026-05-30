<script setup>
import DsBreadcrumb from './DsBreadcrumb.vue'

defineProps({
  title: { type: String, required: true },
  breadcrumb: { type: Array, default: () => [] },
})
</script>

<template>
  <header class="ds-ph">
    <h1 class="ds-ph__title">{{ title }}</h1>
    <div v-if="breadcrumb.length" class="ds-ph__bc"><DsBreadcrumb :items="breadcrumb" /></div>
  </header>
</template>

<style scoped>
.ds-ph {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  padding: var(--ds-space-40) var(--ds-space-12) var(--ds-space-12);
}
.ds-ph__title { align-self: center; }
.ds-ph__bc { margin-top: 10px; }
.ds-ph__title {
  margin: 0;
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-display-28);
  font-weight: var(--ds-fw-medium);
  line-height: var(--ds-lh-display);
  color: var(--ds-text-gray-900);
}
</style>
