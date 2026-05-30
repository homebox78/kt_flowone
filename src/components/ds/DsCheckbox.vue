<script setup>
import { computed } from 'vue'
import { VCheckboxBtn } from 'vuetify/components'
import DsIcon from './DsIcon.vue'

// 시안 4:14032 / 4:15230 Checkbox — Vuetify VCheckboxBtn 엔진 + DS 시안 visuals
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  indeterminate: { type: Boolean, default: false },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  size: { type: String, default: '24', validator: (v) => ['20', '24'].includes(v) },
})
defineEmits(['update:modelValue'])

// 시안: 체크박스 내부 아이콘은 박스 대비 작게 (~30% 축소)
const iconSize = computed(() => (props.size === '20' ? 8 : 11))
const state = computed(() => {
  if (props.indeterminate) return 'indeterminate'
  return props.modelValue ? 'checked' : 'unchecked'
})
</script>

<template>
  <label class="ds-check" :class="{ 'ds-check--disabled': disabled }">
    <VCheckboxBtn
      :model-value="modelValue"
      :indeterminate="indeterminate"
      :disabled="disabled"
      :ripple="false"
      hide-details
      density="compact"
      class="ds-check__native"
      @update:model-value="$emit('update:modelValue', $event)"
    />
    <span class="ds-check__box" :class="[`ds-check__box--${size}`, `ds-check__box--${state}`]">
      <DsIcon v-if="state === 'checked'" name="line-check" :size="iconSize" />
      <DsIcon v-else-if="state === 'indeterminate'" name="line-minus" :size="iconSize" />
    </span>
    <span v-if="label || $slots.default" class="ds-check__label"><slot>{{ label }}</slot></span>
  </label>
</template>

<style scoped>
.ds-check {
  display: inline-flex; align-items: center; gap: var(--ds-space-8);
  cursor: pointer; user-select: none;
}
.ds-check--disabled { cursor: not-allowed; opacity: 0.4; }

/* Vuetify VCheckboxBtn 자체는 hidden — 클릭/포커스/접근성만 활용 */
.ds-check__native {
  position: absolute; opacity: 0; width: 0; height: 0;
  pointer-events: none;
}

.ds-check__box {
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--ds-fill-gray-white);
  border: 1px solid var(--ds-border-gray-300);
  border-radius: var(--ds-radius-4);
  transition: background 0.12s ease, border-color 0.12s ease;
}
.ds-check__box--20 { width: 20px; height: 20px; }
.ds-check__box--24 { width: 24px; height: 24px; }
.ds-check__box--checked,
.ds-check__box--indeterminate {
  background: var(--ds-fill-blue-500);
  border-color: var(--ds-fill-blue-500);
}
.ds-check__box--checked :deep(.ds-icon),
.ds-check__box--indeterminate :deep(.ds-icon) { filter: brightness(0) invert(1); }

.ds-check__label {
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-body-13);
  font-weight: var(--ds-fw-regular);
  color: var(--ds-text-gray-700);
  transform: translateY(1px);
}
</style>
