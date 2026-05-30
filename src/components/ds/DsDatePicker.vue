<script setup>
import { ref, computed } from 'vue'
import { VMenu, VDatePicker } from 'vuetify/components'
import DsIcon from './DsIcon.vue'

// 시안 4:14802 Date — Vuetify VDatePicker 엔진 + 시안 입력 필드 스타일
const props = defineProps({
  modelValue: { type: String, default: '' },
  size: { type: String, default: 'medium', validator: (v) => ['medium', 'small'].includes(v) },
  placeholder: { type: String, default: 'yyyy-mm-dd' },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
  minDate: { type: String, default: '' },
  maxDate: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue'])

const open = ref(false)

const wrapClass = computed(() => [
  'ds-date',
  `ds-date--${props.size}`,
  {
    'ds-date--error': props.error,
    'ds-date--disabled': props.disabled,
    'ds-date--readonly': props.readonly,
    'ds-date--open': open.value,
  },
])

const dateValue = computed(() => {
  if (!props.modelValue) return null
  const d = new Date(props.modelValue)
  return isNaN(d) ? null : d
})

function fmt(d) {
  if (!d) return ''
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
function onPick(v) {
  const d = Array.isArray(v) ? v[0] : v
  emit('update:modelValue', fmt(d))
  open.value = false
}
function onInput(e) {
  emit('update:modelValue', e.target.value)
}
</script>

<template>
  <div class="ds-date-wrap">
    <div :class="wrapClass">
      <input
        class="ds-date__input"
        type="text"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        @input="onInput"
        @click="!disabled && !readonly && (open = true)"
        @focus="!disabled && !readonly && (open = true)"
      />
      <button
        v-if="!disabled && !readonly"
        type="button" class="ds-date__btn" tabindex="-1"
        @click="open = !open"
      >
        <DsIcon name="line-calendar" :size="17" />
      </button>
    </div>

    <VMenu v-model="open" :close-on-content-click="false" location="bottom end" offset="4">
      <template #activator="{ props: aProps }">
        <span v-bind="aProps" class="ds-date__anchor" />
      </template>
      <VDatePicker
        :model-value="dateValue"
        :min="minDate || undefined"
        :max="maxDate || undefined"
        hide-header
        show-adjacent-months
        @update:model-value="onPick"
      />
    </VMenu>
  </div>
</template>

<style scoped>
.ds-date-wrap { position: relative; display: inline-flex; flex-direction: column; width: 100%; }

.ds-date {
  display: inline-flex; align-items: center; width: 100%;
  background: var(--ds-fill-gray-white);
  border: 1px solid var(--ds-border-gray-300);
  border-radius: var(--ds-radius-4);
  transition: border-color 0.12s ease;
}
.ds-date--medium { height: var(--ds-h-md); padding: 0 var(--ds-space-10) 0 var(--ds-space-14); }
.ds-date--small  { height: var(--ds-h-sm); padding: 0 var(--ds-space-10) 0 var(--ds-space-12); }
.ds-date:focus-within, .ds-date--open { border-color: var(--ds-border-blue-500); }
.ds-date--error { border-color: var(--ds-border-red-300); }
.ds-date--disabled, .ds-date--readonly { background: var(--ds-fill-gray-200); }

.ds-date__input {
  flex: 1; min-width: 0; height: 100%;
  background: transparent; border: 0; outline: none;
  font-family: var(--ds-font-family); font-size: var(--ds-fs-body-13);
  color: var(--ds-text-gray-700);
}
.ds-date__input::placeholder { color: var(--ds-text-gray-500); }
.ds-date__input:disabled { -webkit-text-fill-color: var(--ds-text-gray-500); cursor: not-allowed; }

.ds-date__btn {
  display: inline-flex; padding: 0; margin-left: var(--ds-space-8);
  background: transparent; border: 0; cursor: pointer; color: var(--ds-text-gray-700);
  flex-shrink: 0;
}
.ds-date__anchor {
  position: absolute; bottom: 0; right: 0; width: 1px; height: 1px; opacity: 0;
  pointer-events: none;
}
</style>
