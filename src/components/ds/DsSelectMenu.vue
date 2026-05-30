<script setup>
import { VList, VListItem } from 'vuetify/components'
import DsCheckbox from './DsCheckbox.vue'

// 시안 4:14692의 _Select menu — VList 기반 드롭다운 패널
const props = defineProps({
  modelValue: { type: [Array, String, Number, null], default: null },
  options: { type: Array, default: () => [] }, // [{label, value}]
  multiple: { type: Boolean, default: false },
  width: { type: [String, Number], default: 320 },
})
const emit = defineEmits(['update:modelValue'])

function isSelected(v) {
  if (props.multiple) return Array.isArray(props.modelValue) && props.modelValue.includes(v)
  return props.modelValue === v
}
function pick(v) {
  if (props.multiple) {
    const arr = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const i = arr.indexOf(v)
    if (i >= 0) arr.splice(i, 1)
    else arr.push(v)
    emit('update:modelValue', arr)
  } else {
    emit('update:modelValue', v)
  }
}
</script>

<template>
  <VList class="ds-menu" :style="{ width: typeof width === 'number' ? width + 'px' : width }" density="compact">
    <VListItem
      v-for="o in options" :key="o.value"
      :ripple="false"
      class="ds-menu__item"
      :class="{ 'ds-menu__item--selected': isSelected(o.value) }"
      @click="pick(o.value)"
    >
      <template v-if="multiple" #prepend>
        <DsCheckbox :model-value="isSelected(o.value)" @click.stop />
      </template>
      <span class="ds-menu__label">{{ o.label }}</span>
    </VListItem>
  </VList>
</template>

<style scoped>
.ds-menu {
  background: var(--ds-fill-gray-white) !important;
  border-radius: var(--ds-radius-8) !important;
  padding: var(--ds-space-12) !important;
  display: flex; flex-direction: column; gap: var(--ds-space-4);
  box-shadow: var(--ds-shadow-popup) !important;
}
.ds-menu__item {
  display: flex !important; align-items: center !important;
  gap: var(--ds-space-4) !important;
  min-height: 40px !important;
  padding: 0 var(--ds-space-12) !important;
  background: var(--ds-fill-gray-white) !important;
  border: 0 !important; border-radius: var(--ds-radius-6) !important;
  cursor: pointer; text-align: left;
  font-family: var(--ds-font-family) !important;
}
.ds-menu__item :deep(.v-list-item__overlay),
.ds-menu__item :deep(.v-list-item__underlay) { display: none; }
.ds-menu__item :deep(.v-list-item__prepend) { gap: 0; }
.ds-menu__item:hover, .ds-menu__item--selected {
  background: var(--ds-fill-gray-100) !important;
}
.ds-menu__label {
  flex: 1; min-width: 0;
  font-size: var(--ds-fs-body-12);
  font-weight: var(--ds-fw-regular);
  color: var(--ds-text-gray-600);
}
.ds-menu__item--selected .ds-menu__label {
  color: var(--ds-text-blue-600);
  font-weight: var(--ds-fw-medium);
}
</style>
