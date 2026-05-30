<script setup>
import { computed } from 'vue'
import { VRadioGroup } from 'vuetify/components'
import DsRadio from './DsRadio.vue'

const props = defineProps({
  modelValue: { type: [String, Number, Boolean, null], default: null },
  options: { type: Array, required: true },
  name: { type: String, default: () => `rg-${Math.random().toString(36).slice(2, 8)}` },
  direction: { type: String, default: 'horizontal', validator: (v) => ['horizontal', 'vertical'].includes(v) },
  size: { type: String, default: '20', validator: (v) => ['20', '24'].includes(v) },
  disabled: { type: Boolean, default: false },
  gap: { type: String, default: '20px' },
})
defineEmits(['update:modelValue'])

const items = computed(() =>
  props.options.map((o) => (typeof o === 'object' ? o : { label: String(o), value: o })),
)
</script>

<template>
  <VRadioGroup
    :model-value="modelValue"
    :inline="direction === 'horizontal'"
    :disabled="disabled"
    hide-details
    density="compact"
    class="ds-rg"
    :class="`ds-rg--${direction}`"
    :style="{ '--ds-rg-gap': gap }"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <DsRadio
      v-for="o in items" :key="o.value"
      :model-value="modelValue" :value="o.value"
      :label="o.label" :name="name" :size="size"
      :disabled="disabled || o.disabled"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </VRadioGroup>
</template>

<style scoped>
/* Vuetify VRadioGroup 의 기본 spacing/details 제거 */
.ds-rg { display: inline-flex; }
.ds-rg :deep(.v-input__control) { gap: var(--ds-rg-gap, 20px); }
.ds-rg :deep(.v-input__details) { display: none; }
.ds-rg :deep(.v-selection-control-group) {
  display: inline-flex; align-items: center;
  gap: var(--ds-rg-gap, 20px);
}
.ds-rg--horizontal :deep(.v-selection-control-group) { flex-direction: row; }
.ds-rg--vertical :deep(.v-selection-control-group) { flex-direction: column; align-items: flex-start; }
</style>
