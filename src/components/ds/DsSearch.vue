<script setup>
import { computed } from 'vue'
import { VTextField } from 'vuetify/components'
import DsIcon from './DsIcon.vue'

// 시안 4:14291 Search — VTextField + trailing search icon
const props = defineProps({
  modelValue: { type: String, default: '' },
  size: { type: String, default: 'medium', validator: (v) => ['medium', 'small'].includes(v) },
  placeholder: { type: String, default: '검색어 입력' },
  disabled: { type: Boolean, default: false },
  helper: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue', 'search'])

const helperMessage = computed(() => props.helper || '')
function go() { emit('search', props.modelValue) }
</script>

<template>
  <VTextField
    :model-value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :messages="helperMessage"
    variant="outlined"
    density="compact"
    hide-details="auto"
    :class="['ds-search', `ds-search--${size}`]"
    @update:model-value="$emit('update:modelValue', $event)"
    @keyup.enter="go"
  >
    <template #append-inner>
      <button type="button" class="ds-search__btn" tabindex="-1" @click="go">
        <DsIcon name="line-search" :size="20" />
      </button>
    </template>
  </VTextField>
</template>

<style scoped>
.ds-search { font-family: var(--ds-font-family); }
.ds-search :deep(.v-input__control) { min-height: 0; }
.ds-search :deep(.v-field) {
  background: var(--ds-fill-gray-white);
  border-radius: var(--ds-radius-4);
  border: 1px solid var(--ds-border-gray-300);
  box-shadow: none !important;
  padding-inline-start: var(--ds-space-14) !important;
  padding-inline-end: var(--ds-space-10) !important;
  align-items: center;
}
.ds-search :deep(.v-field__field) { align-items: center; height: 100%; }
.ds-search :deep(input) { align-self: center; }
.ds-search :deep(.v-field__outline),
.ds-search :deep(.v-field__overlay),
.ds-search :deep(.v-field__label) { display: none !important; }
.ds-search :deep(.v-field--focused) { border-color: var(--ds-border-blue-500); }
.ds-search :deep(.v-field--disabled) { background: var(--ds-fill-gray-200); }

.ds-search--medium :deep(.v-field) { height: var(--ds-h-md); min-height: var(--ds-h-md); }
.ds-search--medium :deep(.v-field__input),
.ds-search--medium :deep(input) { height: auto; min-height: 0; padding: 0; }
.ds-search--small :deep(.v-field) { height: var(--ds-h-sm); min-height: var(--ds-h-sm); padding-inline-start: var(--ds-space-12) !important; }
.ds-search--small :deep(.v-field__input),
.ds-search--small :deep(input) { height: auto; min-height: 0; padding: 0; }

.ds-search :deep(.v-field__input) {
  display: flex; align-items: center;
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-body-13);
  color: var(--ds-text-gray-700);
  -webkit-mask-image: none; mask-image: none;
}
.ds-search :deep(input::placeholder) { color: var(--ds-text-gray-500); opacity: 1; }
.ds-search :deep(.v-field__append-inner) { padding: 0; margin-inline-start: var(--ds-space-8); align-self: center; }

.ds-search__btn {
  display: inline-flex; padding: 0; background: transparent;
  border: 0; cursor: pointer; color: var(--ds-text-gray-700);
}

.ds-search :deep(.v-input__details) { padding-left: var(--ds-space-4); padding-top: var(--ds-space-8); min-height: 0; }
.ds-search :deep(.v-messages) {
  font-family: var(--ds-font-family); font-size: var(--ds-fs-body-12);
  color: var(--ds-text-gray-700); opacity: 1; min-height: 0;
}
</style>
