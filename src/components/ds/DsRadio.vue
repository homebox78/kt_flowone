<script setup>
const props = defineProps({
  modelValue: { type: [String, Number, Boolean, null], default: null },
  value: { type: [String, Number, Boolean], required: true },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  size: { type: String, default: '20', validator: (v) => ['20', '24'].includes(v) },
  name: { type: String, default: 'ds-radio' },
})
const emit = defineEmits(['update:modelValue'])
function onChange() {
  if (props.disabled) return
  emit('update:modelValue', props.value)
}
</script>

<template>
  <label class="ds-radio" :class="{ 'ds-radio--disabled': disabled }">
    <input
      type="radio"
      class="ds-radio__native"
      :name="name"
      :value="value"
      :checked="modelValue === value"
      :disabled="disabled"
      @change="onChange"
    />
    <span
      class="ds-radio__circle"
      :class="[`ds-radio__circle--${size}`, { 'ds-radio__circle--checked': modelValue === value }]"
    >
      <span v-if="modelValue === value" class="ds-radio__dot" />
    </span>
    <span v-if="label || $slots.default" class="ds-radio__label"><slot>{{ label }}</slot></span>
  </label>
</template>

<style scoped>
/* Figma 4:14125 — Default/Selected/Hover/Disabled/Readonly, size 20/24 */
.ds-radio {
  display: inline-flex; align-items: center; vertical-align: middle;
  cursor: pointer; user-select: none; line-height: 1;
}
.ds-radio:has(.ds-radio__circle--20) { gap: var(--ds-space-6); }
.ds-radio:has(.ds-radio__circle--24) { gap: var(--ds-space-8); }
.ds-radio--disabled { cursor: not-allowed; }

.ds-radio__native { position: absolute; opacity: 0; width: 0; height: 0; pointer-events: none; }

.ds-radio__circle {
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--ds-fill-gray-white);
  border: 1px solid var(--ds-border-gray-300);
  border-radius: var(--ds-radius-circle);
  transition: background-color 0.12s ease, border-color 0.12s ease;
}
.ds-radio__circle--20 { width: 20px; height: 20px; }
.ds-radio__circle--24 { width: 24px; height: 24px; }

/* Hover: blue-900 border (active/checked 아닌 상태에서만) */
.ds-radio:hover:not(.ds-radio--disabled) .ds-radio__circle:not(.ds-radio__circle--checked) {
  border-color: var(--ds-border-blue-900, var(--ds-fill-blue-900));
}

/* Selected: 원 전체가 blue-500, 안쪽 흰색 dot */
.ds-radio__circle--checked {
  background: var(--ds-fill-blue-500);
  border-color: var(--ds-fill-blue-500);
}
.ds-radio__dot {
  background: var(--ds-fill-gray-white);
  border-radius: var(--ds-radius-circle);
}
.ds-radio__circle--20 .ds-radio__dot { width: 8px; height: 8px; }
.ds-radio__circle--24 .ds-radio__dot { width: 12px; height: 12px; }

/* Disabled: gray-200 bg, gray-300 border */
.ds-radio--disabled .ds-radio__circle {
  background: var(--ds-fill-gray-200);
  border-color: var(--ds-border-gray-300);
}
.ds-radio--disabled .ds-radio__circle--checked .ds-radio__dot { background: var(--ds-fill-gray-white); }

.ds-radio__label {
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-body-13);
  font-weight: var(--ds-fw-regular);
  line-height: 1.5;
  color: var(--ds-text-gray-black);
  transform: translateY(1px);
}
.ds-radio--disabled .ds-radio__label { color: var(--ds-text-gray-500); }
</style>
