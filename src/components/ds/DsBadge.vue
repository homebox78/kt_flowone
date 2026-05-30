<script setup>
import { computed } from 'vue'
import { VChip } from 'vuetify/components'

// 시안 (4:13993): Fill/Round × Red/Blue/Light_Blue/Pink/Purple/Gray — Vuetify VChip 엔진
const props = defineProps({
  type: { type: String, default: 'fill', validator: (v) => ['fill', 'round'].includes(v) },
  color: {
    type: String,
    default: 'gray',
    validator: (v) => ['red', 'blue', 'light-blue', 'pink', 'purple', 'gray'].includes(v),
  },
})

const classes = computed(() => ['ds-badge', `ds-badge--${props.type}`, `ds-badge--${props.color}`])
</script>

<template>
  <VChip :class="classes" :ripple="false" variant="flat" density="compact" size="x-small">
    <slot />
  </VChip>
</template>

<style scoped>
.ds-badge {
  display: inline-flex !important; align-items: center !important; justify-content: center !important;
  padding: var(--ds-space-4) var(--ds-space-6) !important;
  height: auto !important;
  min-height: 0 !important;
  font-family: var(--ds-font-family) !important;
  font-size: var(--ds-fs-label-11) !important;
  font-weight: var(--ds-fw-medium) !important;
  line-height: var(--ds-lh-label) !important;
  white-space: nowrap;
  letter-spacing: 0 !important;
  box-shadow: none !important;
}
.ds-badge :deep(.v-chip__overlay),
.ds-badge :deep(.v-chip__underlay) { display: none; }
.ds-badge :deep(.v-chip__content) { padding: 0; }

/* === Fill (rect, white text) === */
.ds-badge--fill { border-radius: var(--ds-radius-4) !important; color: var(--ds-text-gray-white) !important; }
.ds-badge--fill.ds-badge--red        { background: var(--ds-fill-red-300) !important; }
.ds-badge--fill.ds-badge--blue       { background: var(--ds-fill-blue-500) !important; }
.ds-badge--fill.ds-badge--light-blue { background: var(--ds-fill-light-blue-500) !important; }
.ds-badge--fill.ds-badge--pink       { background: var(--ds-fill-pink-500) !important; }
.ds-badge--fill.ds-badge--purple     { background: var(--ds-fill-purple-500) !important; }
.ds-badge--fill.ds-badge--gray       { background: var(--ds-fill-gray-600) !important; }

/* === Round (pill, light bg, colored text) === */
.ds-badge--round { height: 20px !important; border-radius: var(--ds-radius-circle) !important; }
.ds-badge--round.ds-badge--red        { background: var(--ds-fill-red-50) !important;        color: var(--ds-text-red-600) !important; }
.ds-badge--round.ds-badge--blue       { background: var(--ds-fill-blue-75) !important;       color: var(--ds-text-blue-600) !important; }
.ds-badge--round.ds-badge--light-blue { background: var(--ds-fill-light-blue-75) !important; color: var(--ds-text-light-blue-600) !important; }
.ds-badge--round.ds-badge--pink       { background: var(--ds-fill-pink-75) !important;       color: var(--ds-text-pink-600) !important; }
.ds-badge--round.ds-badge--purple     { background: var(--ds-fill-purple-75) !important;     color: var(--ds-text-purple-600) !important; }
.ds-badge--round.ds-badge--gray       { background: var(--ds-fill-gray-100) !important;      color: var(--ds-text-gray-600) !important; }
</style>
