<script setup>
import { computed } from 'vue'
import { VTextField } from 'vuetify/components'
import DsIcon from './DsIcon.vue'

// 시안 4:14291 Input-Text — Vuetify VTextField 를 내부 엔진으로 사용.
// 외부 API(modelValue, size, placeholder, disabled, readonly, error, helper, clearable) 유지
const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  size: { type: String, default: 'medium', validator: (v) => ['medium', 'small'].includes(v) },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
  helper: { type: String, default: '' },
  clearable: { type: Boolean, default: false },
  // Icon props — DS 자체 + Vuetify VTextField 호환 alias
  trailingIcon: { type: String, default: null },
  prependInnerIcon: { type: String, default: null },
  appendInnerIcon: { type: String, default: null },
})
defineEmits(['update:modelValue', 'clear'])

const errorMessages = computed(() => (props.error && props.helper ? [props.helper] : []))
const helperMessage = computed(() => (!props.error && props.helper ? props.helper : ''))
// Vuetify 호환 alias 통합
const leadingIcon = computed(() => props.prependInnerIcon)
const trailingIconName = computed(() => props.trailingIcon || props.appendInnerIcon)
</script>

<template>
  <VTextField
    :model-value="modelValue"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :error="error"
    :error-messages="errorMessages"
    :messages="helperMessage"
    :clearable="clearable"
    variant="outlined"
    density="compact"
    hide-details="auto"
    :class="['ds-field', `ds-field--${size}`, { 'ds-field--disabled': disabled, 'ds-field--readonly': readonly && !disabled }]"
    @update:model-value="$emit('update:modelValue', $event)"
    @click:clear="$emit('clear')"
  >
    <template v-if="leadingIcon" #prepend-inner>
      <DsIcon :name="leadingIcon" :size="16" />
    </template>
    <template v-if="trailingIconName" #append-inner>
      <DsIcon :name="trailingIconName" :size="16" />
    </template>
  </VTextField>
</template>

<style scoped>
/* === Vuetify VTextField override: KT FLOW1 DS 시안 (4:14291) === */
.ds-field { font-family: var(--ds-font-family); }

/* Vuetify wrapper depth 정리 */
.ds-field :deep(.v-input__control) { min-height: 0; }
.ds-field :deep(.v-field) {
  background: var(--ds-fill-gray-white);
  border-radius: var(--ds-radius-4);
  font-family: var(--ds-font-family);
  border: 1px solid var(--ds-border-gray-300);
  transition: border-color 0.12s ease;
  box-shadow: none !important;
  --v-field-padding-start: var(--ds-space-14);
  --v-field-padding-end: var(--ds-space-10);
  --v-field-padding-top: 0;
}
.ds-field :deep(.v-field__outline) { display: none; }
.ds-field :deep(.v-field__overlay) { display: none; }
.ds-field :deep(.v-field__loader) { display: none; }
.ds-field :deep(.v-field__field) { align-items: center; }

.ds-field :deep(.v-field--focused) { border-color: var(--ds-border-blue-500); }
.ds-field :deep(.v-field--error) { border-color: var(--ds-border-red-300); }
/* Disabled / Readonly — 배경 동일 gray-200 */
.ds-field--disabled :deep(.v-field),
.ds-field--readonly :deep(.v-field) {
  background: var(--ds-fill-gray-200) !important;
  opacity: 1 !important;
}
.ds-field--disabled :deep(.v-field__overlay),
.ds-field--readonly :deep(.v-field__overlay) {
  opacity: 0 !important; background: transparent !important;
}
/* Readonly만 텍스트 진하게 (선택 가능) */
.ds-field--readonly :deep(.v-field__input),
.ds-field--readonly :deep(input) {
  color: var(--ds-text-gray-900) !important;
  -webkit-text-fill-color: var(--ds-text-gray-900) !important;
}

/* Size — v-field 가 outer 박스 (border 포함). 내부 input 은 100% 채우기. */
.ds-field--medium :deep(.v-field) { height: var(--ds-h-md); min-height: var(--ds-h-md); }
.ds-field--medium :deep(.v-field__input),
.ds-field--medium :deep(input) {
  height: auto; min-height: 0;
  padding-top: 0; padding-bottom: 0;
}
.ds-field--small :deep(.v-field) { height: var(--ds-h-sm); min-height: var(--ds-h-sm); }
.ds-field--small :deep(.v-field__input),
.ds-field--small :deep(input) {
  height: auto; min-height: 0;
  padding-top: 0; padding-bottom: 0;
}
.ds-field--small :deep(.v-field) { --v-field-padding-start: var(--ds-space-12); }

/* Input text styling */
.ds-field :deep(.v-field__input) {
  display: flex; align-items: center;
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-body-13);
  font-weight: var(--ds-fw-regular);
  line-height: var(--ds-lh-body);
  color: var(--ds-text-gray-700);
  -webkit-mask-image: none; mask-image: none;
}
.ds-field :deep(.v-field__input)::placeholder,
.ds-field :deep(input::placeholder) { color: var(--ds-text-gray-500); opacity: 1; }
.ds-field :deep(input:disabled) { color: var(--ds-text-gray-500); -webkit-text-fill-color: var(--ds-text-gray-500); }

/* Label/floating label 제거 — placeholder 만 사용 */
.ds-field :deep(.v-field__label) { display: none !important; }

/* Helper(messages) 영역 */
.ds-field :deep(.v-input__details) {
  padding-left: var(--ds-space-4); padding-top: var(--ds-space-8);
  min-height: 0;
}
.ds-field :deep(.v-messages) {
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-body-12);
  color: var(--ds-text-gray-700);
  opacity: 1;
  min-height: 0;
}
.ds-field :deep(.v-input--error .v-messages) { color: var(--ds-text-red-300); }

/* Append/prepend inner — 트레일링 아이콘 정렬 */
.ds-field :deep(.v-field__append-inner) {
  align-self: center; padding: 0;
  color: var(--ds-text-gray-700);
}
.ds-field :deep(.v-field__clearable) {
  align-self: center; padding: 0 var(--ds-space-4) 0 0;
  color: var(--ds-fill-gray-400);
}
.ds-field :deep(.v-field__clearable:hover) { color: var(--ds-text-gray-700); }
</style>
