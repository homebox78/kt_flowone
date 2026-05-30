<script setup>
import { VBtn } from 'vuetify/components'

defineProps({
  disabled: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
})
</script>

<template>
  <VBtn
    :disabled="disabled"
    :ripple="false"
    variant="outlined"
    class="ds-addbtn" :class="{ 'ds-addbtn--block': block }"
  >
    <svg class="ds-addbtn__icon" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
      <path d="M5.0625 0C5.37316 0 5.625 0.25184 5.625 0.5625V4.5H9.5625C9.87316 4.5 10.125 4.75184 10.125 5.0625C10.125 5.37316 9.87316 5.625 9.5625 5.625H5.625V9.5625C5.625 9.87316 5.37316 10.125 5.0625 10.125C4.75184 10.125 4.5 9.87316 4.5 9.5625V5.625H0.5625C0.25184 5.625 0 5.37316 0 5.0625C0 4.75184 0.25184 4.5 0.5625 4.5H4.5V0.5625C4.5 0.25184 4.75184 0 5.0625 0Z" fill="currentColor"/>
    </svg>
    <span class="ds-addbtn__label"><slot>추가</slot></span>
  </VBtn>
</template>

<style scoped>
/* 시안 4:1901 — bg blue-50 + solid gray-300 border + radius 6 + 15 Medium black */
.ds-addbtn {
  display: inline-flex !important; align-items: center; justify-content: center;
  gap: 0 !important;
  height: 40px !important; min-height: 40px !important;
  min-width: 0 !important;
  padding: 0 var(--ds-space-12) !important;
  background: var(--ds-fill-blue-50) !important;
  color: var(--ds-text-gray-black) !important;
  border: 1px solid var(--ds-border-gray-300) !important;
  border-radius: var(--ds-radius-6) !important;
  font-family: var(--ds-font-family) !important;
  font-size: var(--ds-fs-body-15) !important;
  font-weight: var(--ds-fw-medium) !important;
  line-height: var(--ds-lh-body) !important;
  letter-spacing: 0 !important; text-transform: none !important;
  box-shadow: none !important;
}
.ds-addbtn :deep(.v-btn__overlay),
.ds-addbtn :deep(.v-btn__underlay) { display: none; }
.ds-addbtn :deep(.v-btn__content) { display: inline-flex; align-items: center; gap: 0; }
.ds-addbtn__label { padding: 0 var(--ds-space-6); }
.ds-addbtn--block { display: flex !important; width: 100%; }
.ds-addbtn:hover:not(:disabled) { background: var(--ds-fill-blue-75) !important; }
.ds-addbtn:disabled {
  background: var(--ds-fill-gray-100) !important;
  color: var(--ds-text-gray-500) !important;
  border-color: var(--ds-border-gray-300) !important;
  cursor: not-allowed; opacity: 1 !important;
}
</style>
