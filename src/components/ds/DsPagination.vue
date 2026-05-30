<script setup>
import { computed } from 'vue'
import { VPagination } from 'vuetify/components'

// 시안 4:14224 Pagination — Vuetify VPagination 엔진 + DS 시안 visuals
const props = defineProps({
  modelValue: { type: Number, default: 1 },
  total: { type: Number, required: true },
  pageSize: { type: Number, default: 10 },
})
defineEmits(['update:modelValue'])

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))
</script>

<template>
  <VPagination
    :model-value="modelValue"
    :length="totalPages"
    :total-visible="7"
    :show-first-last-page="false"
    density="compact"
    class="ds-pager"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<style scoped>
.ds-pager { display: inline-flex; }
.ds-pager :deep(.v-pagination__list) {
  display: inline-flex; gap: var(--ds-space-8);
  padding: 0; margin: 0;
}
.ds-pager :deep(.v-pagination__item),
.ds-pager :deep(.v-pagination__prev),
.ds-pager :deep(.v-pagination__next),
.ds-pager :deep(.v-pagination__more) {
  margin: 0;
}
.ds-pager :deep(.v-btn) {
  min-width: 28px !important;
  width: 28px !important;
  height: 28px !important;
  padding: 0 !important;
  background: transparent !important;
  border: 0 !important;
  border-radius: var(--ds-radius-4) !important;
  font-family: var(--ds-font-family) !important;
  font-size: var(--ds-fs-body-13) !important;
  font-weight: var(--ds-fw-regular) !important;
  color: var(--ds-text-gray-900) !important;
  letter-spacing: 0 !important;
  text-transform: none !important;
  box-shadow: none !important;
}
.ds-pager :deep(.v-btn__overlay),
.ds-pager :deep(.v-btn__underlay) { display: none; }
.ds-pager :deep(.v-btn:hover:not(.v-btn--disabled)) {
  background: var(--ds-fill-gray-100) !important;
}
.ds-pager :deep(.v-pagination__item--is-active .v-btn) {
  background: var(--ds-fill-blue-500) !important;
  color: var(--ds-text-gray-white) !important;
  font-weight: var(--ds-fw-medium) !important;
}
.ds-pager :deep(.v-pagination__more) {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 28px; height: 28px;
  color: var(--ds-text-gray-500);
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-body-13);
}
</style>
