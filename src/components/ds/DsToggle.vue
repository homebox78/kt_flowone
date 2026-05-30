<script setup>
import { VSwitch } from 'vuetify/components'

defineProps({
  modelValue: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  label: { type: String, default: '' },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <label class="ds-toggle" :class="{ 'ds-toggle--disabled': disabled }">
    <VSwitch
      :model-value="modelValue"
      :disabled="disabled"
      :ripple="false"
      hide-details
      density="compact"
      class="ds-toggle__native"
      @update:model-value="$emit('update:modelValue', $event)"
    />
    <span class="ds-toggle__track" :class="{ 'ds-toggle__track--on': modelValue }">
      <span class="ds-toggle__thumb" :class="{ 'ds-toggle__thumb--on': modelValue }" />
    </span>
    <span v-if="label || $slots.default" class="ds-toggle__label"><slot>{{ label }}</slot></span>
  </label>
</template>

<style scoped>
.ds-toggle { display: inline-flex; align-items: center; gap: var(--ds-space-8); cursor: pointer; user-select: none; }
.ds-toggle--disabled { cursor: not-allowed; opacity: 0.4; }

/* Vuetify VSwitch 자체는 hidden — 접근성/상태만 활용 */
.ds-toggle__native {
  position: absolute; opacity: 0; width: 0; height: 0;
  pointer-events: none; overflow: hidden;
}

.ds-toggle__track {
  position: relative; display: inline-block;
  width: 36px; height: 20px;
  background: var(--ds-fill-gray-400);
  border-radius: var(--ds-radius-circle);
  transition: background 0.15s ease;
}
.ds-toggle__track--on { background: var(--ds-fill-blue-500); }
.ds-toggle__thumb {
  position: absolute; top: 2px; left: 2px;
  width: 16px; height: 16px;
  background: var(--ds-fill-gray-white);
  border-radius: var(--ds-radius-circle);
  transition: transform 0.15s ease;
}
.ds-toggle__thumb--on { transform: translateX(16px); }
.ds-toggle__label {
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-body-13);
  font-weight: var(--ds-fw-regular);
  color: var(--ds-text-gray-700);
}
</style>
