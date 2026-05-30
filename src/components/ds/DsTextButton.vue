<script setup>
import { computed } from 'vue'
import { VBtn } from 'vuetify/components'
import DsIcon from './DsIcon.vue'

const props = defineProps({
  type: { type: String, default: 'underline', validator: (v) => ['underline', 'chevron'].includes(v) },
  color: { type: String, default: 'black', validator: (v) => ['black', 'primary'].includes(v) },
  size: { type: String, default: 'small', validator: (v) => ['large', 'small'].includes(v) },
  href: { type: String, default: null },
})

const classes = computed(() => [
  'ds-tbtn',
  `ds-tbtn--${props.type}`,
  `ds-tbtn--${props.color}`,
  `ds-tbtn--${props.size}`,
])
const iconSize = computed(() => (props.size === 'large' ? 16 : 14))
</script>

<template>
  <VBtn
    variant="plain"
    :ripple="false"
    :href="href"
    :tag="href ? 'a' : 'button'"
    :class="classes"
  >
    <span class="ds-tbtn__label"><slot /></span>
    <DsIcon v-if="type === 'chevron'" name="line-right" :size="iconSize" />
  </VBtn>
</template>

<style scoped>
.ds-tbtn {
  display: inline-flex !important; align-items: center; gap: var(--ds-space-2) !important;
  background: transparent !important; border: 0 !important; padding: 0 !important;
  height: auto !important; min-width: 0 !important; min-height: 0 !important;
  font-family: var(--ds-font-family) !important;
  font-weight: var(--ds-fw-regular) !important;
  line-height: var(--ds-lh-body) !important;
  text-decoration: none;
  letter-spacing: 0 !important; text-transform: none !important;
  box-shadow: none !important; opacity: 1 !important;
}
.ds-tbtn :deep(.v-btn__overlay),
.ds-tbtn :deep(.v-btn__underlay) { display: none; }
.ds-tbtn :deep(.v-btn__content) { display: inline-flex; align-items: center; gap: var(--ds-space-2); }

.ds-tbtn--large { font-size: var(--ds-fs-body-15) !important; }
.ds-tbtn--small { font-size: var(--ds-fs-body-13) !important; }

.ds-tbtn--black   { color: var(--ds-text-gray-black) !important; }
.ds-tbtn--primary { color: var(--ds-text-blue-500) !important; }

.ds-tbtn--underline .ds-tbtn__label { text-decoration: underline; text-underline-offset: 2px; }
.ds-tbtn--chevron .ds-tbtn__label   { text-decoration: none; }

.ds-tbtn:hover { opacity: 0.7 !important; }
</style>
