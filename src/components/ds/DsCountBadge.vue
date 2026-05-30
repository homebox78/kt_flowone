<script setup>
import { computed } from 'vue'
import { VChip } from 'vuetify/components'

const props = defineProps({
  value: { type: [Number, String], default: 1 },
})
const display = computed(() => {
  const n = Number(props.value)
  return Number.isFinite(n) && n > 99 ? '99+' : String(props.value)
})
</script>

<template>
  <VChip :ripple="false" variant="flat" density="compact" size="x-small" class="ds-count-badge">
    {{ display }}
  </VChip>
</template>

<style scoped>
.ds-count-badge {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-width: 16px !important;
  height: 16px !important;
  min-height: 0 !important;
  padding: 0 var(--ds-space-4) !important;
  border-radius: 12px !important;
  background: var(--ds-fill-red-300) !important;
  color: var(--ds-text-gray-white) !important;
  font-family: var(--ds-font-family) !important;
  font-size: var(--ds-fs-label-11) !important;
  font-weight: var(--ds-fw-medium) !important;
  line-height: 1 !important;
  letter-spacing: 0 !important;
  box-shadow: none !important;
}
.ds-count-badge :deep(.v-chip__overlay),
.ds-count-badge :deep(.v-chip__underlay) { display: none; }
.ds-count-badge :deep(.v-chip__content) { padding: 0; line-height: 1; }
</style>
