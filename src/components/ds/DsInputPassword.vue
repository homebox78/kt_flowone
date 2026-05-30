<script setup>
import { computed, ref } from 'vue'
import { VTextField } from 'vuetify/components'
import DsIcon from './DsIcon.vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  size: { type: String, default: 'medium', validator: (v) => ['medium', 'small'].includes(v) },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
  helper: { type: String, default: '' },
})
defineEmits(['update:modelValue'])

const visible = ref(false)
const errorMessages = computed(() => (props.error && props.helper ? [props.helper] : []))
const helperMessage = computed(() => (!props.error && props.helper ? props.helper : ''))
</script>

<template>
  <VTextField
    :model-value="modelValue"
    :type="visible ? 'text' : 'password'"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :error="error"
    :error-messages="errorMessages"
    :messages="helperMessage"
    variant="outlined"
    density="compact"
    hide-details="auto"
    :class="['ds-pwd', `ds-pwd--${size}`]"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template #append-inner>
      <button type="button" class="ds-pwd__toggle" tabindex="-1" @click="visible = !visible">
        <DsIcon :name="visible ? 'line-eye' : 'line-eye-off'" :size="20" />
      </button>
    </template>
  </VTextField>
</template>

<style scoped>
.ds-pwd { font-family: var(--ds-font-family); }
.ds-pwd :deep(.v-input__control) { min-height: 0; }
.ds-pwd :deep(.v-field) {
  background: var(--ds-fill-gray-white);
  border-radius: var(--ds-radius-4);
  border: 1px solid var(--ds-border-gray-300);
  box-shadow: none !important;
  padding-inline-start: var(--ds-space-14) !important;
  padding-inline-end: var(--ds-space-10) !important;
}
.ds-pwd :deep(.v-field__outline),
.ds-pwd :deep(.v-field__overlay),
.ds-pwd :deep(.v-field__label) { display: none !important; }
.ds-pwd :deep(.v-field--focused) { border-color: var(--ds-border-blue-500); }
.ds-pwd :deep(.v-field--error) { border-color: var(--ds-border-red-300); }
.ds-pwd :deep(.v-field--disabled),
.ds-pwd :deep(.v-field--readonly) { background: var(--ds-fill-gray-200); }

.ds-pwd--medium :deep(.v-field) { min-height: var(--ds-h-md); }
.ds-pwd--medium :deep(input) { min-height: var(--ds-h-md); height: var(--ds-h-md); padding: 0; }
.ds-pwd--small :deep(.v-field) { min-height: var(--ds-h-sm); padding-inline-start: var(--ds-space-12) !important; }
.ds-pwd--small :deep(input) { min-height: var(--ds-h-sm); height: var(--ds-h-sm); padding: 0; }

.ds-pwd :deep(input) {
  font-family: var(--ds-font-family); font-size: var(--ds-fs-body-13);
  color: var(--ds-text-gray-700);
}
.ds-pwd :deep(input::placeholder) { color: var(--ds-text-gray-500); opacity: 1; }
.ds-pwd :deep(.v-field__append-inner) { padding: 0; margin-inline-start: var(--ds-space-8); align-self: center; }

.ds-pwd__toggle {
  display: inline-flex; padding: 0; background: transparent;
  border: 0; cursor: pointer; color: var(--ds-text-gray-700);
}

.ds-pwd :deep(.v-input__details) { padding-left: var(--ds-space-4); padding-top: var(--ds-space-8); min-height: 0; }
.ds-pwd :deep(.v-messages) {
  font-family: var(--ds-font-family); font-size: var(--ds-fs-body-12);
  color: var(--ds-text-gray-700); opacity: 1; min-height: 0;
}
.ds-pwd :deep(.v-input--error .v-messages) { color: var(--ds-text-red-300); }
</style>
