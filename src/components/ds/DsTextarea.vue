<script setup>
import { computed } from 'vue'
import { VTextarea } from 'vuetify/components'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  rows: { type: Number, default: 4 },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
  helper: { type: String, default: '' },
  maxlength: { type: Number, default: null },
  showCounter: { type: Boolean, default: false },
})
defineEmits(['update:modelValue'])

const errorMessages = computed(() => (props.error && props.helper ? [props.helper] : []))
const helperMessage = computed(() => (!props.error && props.helper ? props.helper : ''))
const count = computed(() => (props.modelValue || '').length)
</script>

<template>
  <div class="ds-ta-wrap">
    <VTextarea
      :model-value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      :readonly="readonly"
      :error="error"
      :error-messages="errorMessages"
      :messages="helperMessage"
      :maxlength="maxlength"
      variant="outlined"
      density="compact"
      hide-details="auto"
      no-resize
      class="ds-ta"
      @update:model-value="$emit('update:modelValue', $event)"
    />
    <div v-if="showCounter && maxlength" class="ds-ta__counter" :class="{ 'ds-ta__counter--error': error }">
      {{ count }} / {{ maxlength }}
    </div>
  </div>
</template>

<style scoped>
.ds-ta-wrap { position: relative; display: flex; flex-direction: column; width: 100%; }
.ds-ta { font-family: var(--ds-font-family); }
.ds-ta :deep(.v-input__control) { min-height: 0; }
.ds-ta :deep(.v-field) {
  background: var(--ds-fill-gray-white);
  border-radius: var(--ds-radius-4);
  border: 1px solid var(--ds-border-gray-300);
  box-shadow: none !important;
  padding-inline-start: var(--ds-space-14) !important;
  padding-inline-end: var(--ds-space-10) !important;
  padding-top: var(--ds-space-10) !important;
  padding-bottom: var(--ds-space-10) !important;
}
.ds-ta :deep(.v-field__outline),
.ds-ta :deep(.v-field__overlay),
.ds-ta :deep(.v-field__label) { display: none !important; }
.ds-ta :deep(.v-field--focused) { border-color: var(--ds-border-blue-500); }
.ds-ta :deep(.v-field--error) { border-color: var(--ds-border-red-300); }
.ds-ta :deep(.v-field--disabled),
.ds-ta :deep(.v-field--readonly) { background: var(--ds-fill-gray-200); }
.ds-ta :deep(textarea) {
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-body-13);
  line-height: var(--ds-lh-body);
  color: var(--ds-text-gray-700);
  padding: 0 !important; margin: 0 !important;
  -webkit-mask-image: none; mask-image: none;
}
.ds-ta :deep(textarea::placeholder) { color: var(--ds-text-gray-500); opacity: 1; }

.ds-ta :deep(.v-input__details) {
  padding-left: var(--ds-space-4); padding-top: var(--ds-space-8); min-height: 0;
}
.ds-ta :deep(.v-messages) {
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-body-12);
  color: var(--ds-text-gray-700); opacity: 1; min-height: 0;
}
.ds-ta :deep(.v-input--error .v-messages) { color: var(--ds-text-red-300); }

.ds-ta__counter {
  position: absolute; right: var(--ds-space-14); bottom: var(--ds-space-10);
  font-size: var(--ds-fs-body-12); color: var(--ds-text-gray-700);
  pointer-events: none;
}
.ds-ta__counter--error { color: var(--ds-text-red-300); }
</style>
