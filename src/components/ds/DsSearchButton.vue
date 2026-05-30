<script setup>
import { VBtn } from 'vuetify/components'
import DsIcon from './DsIcon.vue'

// 시안 4:13117 Search Button — VBtn rounded pill + DS visuals
defineProps({
  disabled: { type: Boolean, default: false },
})
</script>

<template>
  <VBtn
    :disabled="disabled"
    :ripple="false"
    variant="flat"
    class="ds-sbtn"
  >
    <span class="ds-sbtn__label"><slot>조회</slot></span>
    <DsIcon name="line-search" :size="14" />
  </VBtn>
</template>

<style scoped>
.ds-sbtn {
  display: inline-flex !important; align-items: center; justify-content: center;
  gap: var(--ds-space-2) !important;
  min-height: 28px !important; height: 28px !important;
  min-width: 0 !important;
  padding: 0 var(--ds-space-12) !important;
  background: var(--ds-fill-gray-600) !important;
  color: var(--ds-text-gray-white) !important;
  border: 0 !important; border-radius: var(--ds-radius-20) !important;
  font-family: var(--ds-font-family) !important;
  white-space: nowrap; flex-shrink: 0;
  letter-spacing: 0 !important; text-transform: none !important;
  box-shadow: none !important;
}
.ds-sbtn :deep(.v-btn__overlay),
.ds-sbtn :deep(.v-btn__underlay) { display: none; }
.ds-sbtn :deep(.v-btn__content) { display: inline-flex; align-items: center; gap: var(--ds-space-2); }
.ds-sbtn:hover:not(:disabled) { background: var(--ds-fill-gray-700) !important; }
.ds-sbtn :deep(.ds-icon) { --fill-0: #ffffff; color: #ffffff; }
.ds-sbtn :deep(.ds-icon svg [fill]) { fill: #ffffff !important; }
.ds-sbtn :deep(.ds-icon svg [stroke]) { stroke: #ffffff !important; }
.ds-sbtn:disabled { opacity: 0.4 !important; cursor: not-allowed; }
.ds-sbtn__label {
  padding: 0 var(--ds-space-2);
  font-size: var(--ds-fs-body-12);
  font-weight: var(--ds-fw-medium);
  line-height: var(--ds-lh-body);
}
</style>
