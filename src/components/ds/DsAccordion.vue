<script setup>
// 아코디언 — Vuetify VExpansionPanels 엔진 + DS 시안 visuals
// 외부 API: items [{ title, text }] + #title / #text 스코프 슬롯
import { VExpansionPanels, VExpansionPanel, VExpansionPanelTitle, VExpansionPanelText } from 'vuetify/components'

defineProps({
  items: { type: Array, default: () => [] },
  multiple: { type: Boolean, default: false }, // 기본: 한 번에 하나만
})
</script>

<template>
  <VExpansionPanels class="ds-acc" :multiple="multiple">
    <VExpansionPanel v-for="(it, i) in items" :key="i" elevation="0">
      <VExpansionPanelTitle>
        <slot name="title" :item="it" :index="i">{{ it.title }}</slot>
      </VExpansionPanelTitle>
      <VExpansionPanelText>
        <slot name="text" :item="it" :index="i">{{ it.text }}</slot>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

<style scoped>
.ds-acc { gap: 0; border-radius: 0; }
.ds-acc :deep(.v-expansion-panel) { background: transparent; border-radius: 0 !important; border-bottom: 1px solid var(--ds-border-gray-200); }
.ds-acc :deep(.v-expansion-panel::after) { display: none; }
.ds-acc :deep(.v-expansion-panel__shadow) { display: none; }
.ds-acc :deep(.v-expansion-panel-title) {
  min-height: 0;
  padding: var(--ds-space-16) var(--ds-space-4);
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-body-14);
  color: var(--ds-text-gray-800);
}
.ds-acc :deep(.v-expansion-panel-title__overlay) { background: transparent; }
.ds-acc :deep(.v-expansion-panel-title__icon) { color: var(--ds-text-gray-500); }
.ds-acc :deep(.v-expansion-panel-text__wrapper) {
  padding: var(--ds-space-16) var(--ds-space-20) var(--ds-space-16) 34px;
  background: var(--ds-fill-gray-50);
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-body-13);
  line-height: 1.7;
  color: var(--ds-text-gray-700);
  white-space: pre-line;
}
</style>
