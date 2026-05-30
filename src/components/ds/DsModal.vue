<script setup>
import { computed } from 'vue'
import { VDialog } from 'vuetify/components'
import DsIcon from './DsIcon.vue'

// 시안 (4:15036): Popup — Vuetify VDialog 엔진 + DS 시안 visuals
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  width: { type: [String, Number], default: 720 },
  closeOnBackdrop: { type: Boolean, default: true },
})
const emit = defineEmits(['update:modelValue'])

const widthStr = computed(() => (typeof props.width === 'number' ? props.width + 'px' : props.width))
function close() { emit('update:modelValue', false) }
</script>

<template>
  <VDialog
    :model-value="modelValue"
    :width="widthStr"
    :persistent="!closeOnBackdrop"
    scrim="rgba(0, 0, 0, 0.4)"
    transition="fade-transition"
    class="ds-modal-overlay"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="ds-modal" role="dialog">
      <header class="ds-modal__header">
        <h2 class="ds-modal__title">{{ title }}</h2>
        <button type="button" class="ds-modal__close" @click="close">
          <DsIcon name="line-close" :size="20" />
        </button>
      </header>
      <div class="ds-modal__body"><slot /></div>
      <footer v-if="$slots.footer" class="ds-modal__footer"><slot name="footer" /></footer>
    </div>
  </VDialog>
</template>

<style scoped>
.ds-modal {
  background: var(--ds-fill-gray-white);
  border-radius: var(--ds-radius-20);
  max-height: 90vh;
  display: flex; flex-direction: column; overflow: hidden;
  font-family: var(--ds-font-family);
}
.ds-modal__header {
  display: flex; align-items: center; gap: var(--ds-space-24);
  padding: var(--ds-space-28) var(--ds-space-32) var(--ds-space-20) var(--ds-space-40);
}
.ds-modal__title {
  flex: 1; margin: 0;
  font-size: var(--ds-fs-display-28);
  font-weight: var(--ds-fw-medium);
  line-height: var(--ds-lh-display);
  color: var(--ds-text-gray-black);
}
.ds-modal__close {
  display: inline-flex;
  background: transparent; border: 0; cursor: pointer; padding: 0;
  color: var(--ds-text-gray-700);
}
.ds-modal__body {
  flex: 1; padding: 0 var(--ds-space-40) var(--ds-space-10); overflow-y: auto;
}
.ds-modal__footer {
  display: flex; align-items: center; justify-content: center; gap: var(--ds-space-12);
  padding: var(--ds-space-24) var(--ds-space-40) var(--ds-space-48);
}
</style>
