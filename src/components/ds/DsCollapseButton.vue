<script setup>
import { VBtn } from 'vuetify/components'
import DsIcon from './DsIcon.vue'

// 시안 4:15326/4:15329 — 필터 카드/검색 영역 접기/펼침 pill 버튼
defineProps({
  state: { type: String, default: 'close', validator: (v) => ['open', 'close'].includes(v) },
})
defineEmits(['toggle'])
</script>

<template>
  <VBtn
    :ripple="false"
    variant="flat"
    class="ds-cbtn"
    @click="$emit('toggle')"
  >
    <DsIcon :name="state === 'open' ? 'line-up' : 'line-down'" :size="13" />
  </VBtn>
</template>

<style scoped>
.ds-cbtn {
  display: inline-flex !important; align-items: center; justify-content: center;
  width: 60px !important; height: 24px !important;
  min-width: 0 !important; min-height: 0 !important;
  background: var(--ds-fill-gray-white) !important;
  border: 1px solid var(--ds-border-gray-400) !important;
  border-radius: var(--ds-radius-circle) !important;
  color: var(--ds-text-gray-700) !important;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.12) !important;
  padding: 0 !important;
  letter-spacing: 0 !important; text-transform: none !important;
}
.ds-cbtn :deep(.v-btn__overlay),
.ds-cbtn :deep(.v-btn__underlay) { display: none; }
.ds-cbtn:hover { border-color: var(--ds-border-blue-500) !important; color: var(--ds-text-blue-500) !important; }
</style>
