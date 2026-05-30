<script setup>
import { computed } from 'vue'
import { VSelect } from 'vuetify/components'
import DsIcon from './DsIcon.vue'

// 시안 4:14692 Select — Vuetify VSelect 를 내부 엔진으로 사용
// 외부 API(modelValue, options, size, multiple, placeholder, disabled, readonly, error, helper) 유지
const props = defineProps({
  modelValue: { type: [String, Number, Boolean, Array, null], default: null },
  // `options` (DS) 또는 `items` (Vuetify VSelect 호환) 모두 가능
  options: { type: Array, default: () => [] }, // string[] | [{label, value}]
  items: { type: Array, default: null }, // Vuetify alias — [{title, value}] 또는 string[]
  size: { type: String, default: 'medium', validator: (v) => ['medium', 'small'].includes(v) },
  multiple: { type: Boolean, default: false },
  placeholder: { type: String, default: '선택' },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
  helper: { type: String, default: '' },
  prependInnerIcon: { type: String, default: null },
})
defineEmits(['update:modelValue'])

// items (Vuetify 형식) 우선 사용, 없으면 options (DS 형식) 변환
const normalizedItems = computed(() => {
  const src = props.items || props.options
  return src.map((o) =>
    typeof o === 'object' && o !== null
      ? { title: o.title || o.label, value: o.value }
      : { title: String(o), value: o },
  )
})
const errorMessages = computed(() => (props.error && props.helper ? [props.helper] : []))
const helperMessage = computed(() => (!props.error && props.helper ? props.helper : ''))
</script>

<template>
  <VSelect
    :model-value="modelValue"
    :items="normalizedItems"
    :placeholder="placeholder"
    :multiple="multiple"
    :disabled="disabled"
    :readonly="readonly"
    :error="error"
    :error-messages="errorMessages"
    :messages="helperMessage"
    variant="outlined"
    density="compact"
    hide-details="auto"
    menu-icon=""
    item-title="title"
    item-value="value"
    :class="['ds-select', `ds-select--${size}`]"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template v-if="prependInnerIcon" #prepend-inner>
      <DsIcon :name="prependInnerIcon" :size="16" />
    </template>
    <template #append-inner>
      <DsIcon name="line-down" :size="12" class="ds-select__chev" />
    </template>
    <template #selection="{ item, index }">
      <span v-if="!multiple" class="ds-select__value">{{ item.title }}</span>
      <span v-else-if="index === 0" class="ds-select__value">
        {{ Array.isArray(modelValue) ? normalizedItems.filter(i => modelValue.includes(i.value)).map(i => i.title).join(', ') : '' }}
      </span>
    </template>
  </VSelect>
</template>

<style scoped>
/* === Vuetify VSelect override: KT FLOW1 DS 시안 (4:14692) === */
.ds-select { font-family: var(--ds-font-family); }
.ds-select :deep(.v-input__control) { min-height: 0; }
.ds-select :deep(.v-field) {
  background: var(--ds-fill-gray-white);
  border-radius: var(--ds-radius-4);
  border: 1px solid var(--ds-border-gray-300);
  transition: border-color 0.12s ease;
  box-shadow: none !important;
  padding-inline-start: var(--ds-space-14) !important;
  padding-inline-end: var(--ds-space-10) !important;
  cursor: pointer;
}
.ds-select--small :deep(.v-field) { padding-inline-start: var(--ds-space-12) !important; }
.ds-select :deep(.v-field__append-inner) { margin-inline-start: var(--ds-space-8); padding: 0; }
.ds-select :deep(.v-field__outline) { display: none; }
.ds-select :deep(.v-field__overlay) { display: none; }
.ds-select :deep(.v-field__loader) { display: none; }
.ds-select :deep(.v-field__field) { align-items: center; }
.ds-select :deep(.v-field__label) { display: none !important; }
.ds-select :deep(.v-field__append-inner) { padding: 0; align-self: center; }

.ds-select :deep(.v-field--focused) { border-color: var(--ds-border-blue-500); }
.ds-select :deep(.v-field--error) { border-color: var(--ds-border-red-300); }
.ds-select :deep(.v-field--disabled),
.ds-select :deep(.v-field--readonly) { background: var(--ds-fill-gray-200); }

/* Size — v-field 가 outer 박스, 내부 input 은 100% 채우기 */
.ds-select--medium :deep(.v-field) { height: var(--ds-h-md); min-height: var(--ds-h-md); }
.ds-select--medium :deep(.v-field__input) { height: auto; min-height: 0; padding: 0; }
.ds-select--small  :deep(.v-field) { height: var(--ds-h-sm); min-height: var(--ds-h-sm); --v-field-padding-start: var(--ds-space-12); }
.ds-select--small  :deep(.v-field__input) { height: auto; min-height: 0; padding: 0; }

/* Input text */
.ds-select :deep(.v-field__input) {
  display: flex; align-items: center; gap: 0;
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-body-13);
  font-weight: var(--ds-fw-regular);
  line-height: var(--ds-lh-body);
  color: var(--ds-text-gray-700);
  -webkit-mask-image: none; mask-image: none;
}
.ds-select :deep(.v-field__input)::placeholder,
.ds-select :deep(input::placeholder) { color: var(--ds-text-gray-500); opacity: 1; }

.ds-select__value {
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-body-13);
  color: var(--ds-text-gray-700);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.ds-select__chev { color: var(--ds-text-gray-700); flex-shrink: 0; }

/* Helper / error message */
.ds-select :deep(.v-input__details) {
  padding-left: var(--ds-space-4); padding-top: var(--ds-space-8); min-height: 0;
}
.ds-select :deep(.v-messages) {
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-body-12);
  color: var(--ds-text-gray-700);
  opacity: 1; min-height: 0;
}
.ds-select :deep(.v-input--error .v-messages) { color: var(--ds-text-red-300); }

/* Dropdown panel — Vuetify .v-menu .v-list 위에 적용 */
:global(.v-overlay__content .v-list) {
  background: var(--ds-fill-gray-white) !important;
  border-radius: var(--ds-radius-8) !important;
  padding: var(--ds-space-12) !important;
  box-shadow: var(--ds-shadow-popup) !important;
  font-family: var(--ds-font-family) !important;
}
:global(.v-overlay__content .v-list-item) {
  min-height: 40px !important; padding: 0 var(--ds-space-12) !important;
  border-radius: var(--ds-radius-6) !important;
  font-family: var(--ds-font-family) !important;
}
:global(.v-overlay__content .v-list-item__overlay) { display: none !important; }
:global(.v-overlay__content .v-list-item-title) {
  font-size: var(--ds-fs-body-12) !important;
  color: var(--ds-text-gray-600) !important;
  font-family: var(--ds-font-family) !important;
}
:global(.v-overlay__content .v-list-item:hover),
:global(.v-overlay__content .v-list-item--active) {
  background: var(--ds-fill-gray-100) !important;
}
:global(.v-overlay__content .v-list-item--active .v-list-item-title) {
  color: var(--ds-text-blue-600) !important; font-weight: var(--ds-fw-medium) !important;
}
</style>
