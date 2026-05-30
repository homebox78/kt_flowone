<script setup>
import { computed, ref } from 'vue'
import { VFileInput } from 'vuetify/components'
import DsIcon from './DsIcon.vue'
import DsButton from './DsButton.vue'

// 시안 4:15096 Upload File — VFileInput hidden + 시안 visuals
const props = defineProps({
  modelValue: { type: [Object, null], default: null },
  placeholder: { type: String, default: '파일 선택해서 첨부해주세요.' },
  error: { type: Boolean, default: false },
  helper: { type: String, default: '' },
  showButton: { type: Boolean, default: true },
})
const emit = defineEmits(['update:modelValue'])

const inputRef = ref(null)

const fileLabel = computed(() => {
  const f = props.modelValue
  if (!f) return ''
  if (typeof f.size === 'number') return `${f.name}(${(f.size / 1024 / 1024).toFixed(1)}MB)`
  return f.name || ''
})

function pickFile() {
  const el = inputRef.value?.$el?.querySelector('input[type="file"]')
  el?.click()
}
function onChange(files) {
  const f = Array.isArray(files) ? files[0] : files
  if (f) emit('update:modelValue', f)
}
function clearFile() { emit('update:modelValue', null) }
</script>

<template>
  <div class="ds-upload-wrap">
    <div class="ds-upload-row">
      <div class="ds-upload-field" :class="{ 'ds-upload-field--error': error, 'ds-upload-field--filled': modelValue }">
        <template v-if="modelValue">
          <DsIcon name="line-file" :size="20" />
          <span class="ds-upload-name">{{ fileLabel }}</span>
          <button type="button" class="ds-upload-x" @click="clearFile">
            <DsIcon name="fill-close" :size="20" />
          </button>
        </template>
        <span v-else class="ds-upload-placeholder">{{ placeholder }}</span>
      </div>
      <DsButton v-if="showButton" type="neutral-outline" size="medium" @click="pickFile">파일 선택</DsButton>
    </div>

    <!-- VFileInput hidden — 실제 파일 선택만 활용 -->
    <VFileInput
      ref="inputRef"
      hide-details
      density="compact"
      class="ds-upload-native"
      @update:model-value="onChange"
    />

    <p v-if="helper" class="ds-upload-helper" :class="{ 'ds-upload-helper--error': error }">{{ helper }}</p>
  </div>
</template>

<style scoped>
.ds-upload-wrap { display: flex; flex-direction: column; gap: var(--ds-space-8); width: 100%; }
.ds-upload-row  { display: flex; gap: var(--ds-space-8); align-items: stretch; }
.ds-upload-native {
  position: absolute; opacity: 0; width: 0; height: 0; pointer-events: none;
  overflow: hidden;
}

.ds-upload-field {
  flex: 1;
  display: flex; align-items: center; gap: var(--ds-space-8);
  height: var(--ds-h-md);
  padding: 0 var(--ds-space-10) 0 var(--ds-space-14);
  background: var(--ds-fill-gray-white);
  border: 1px solid var(--ds-border-gray-300);
  border-radius: var(--ds-radius-4);
  overflow: hidden;
}
.ds-upload-field--error { border-color: var(--ds-border-red-300); }

.ds-upload-name {
  flex: 1; min-width: 0;
  font-size: var(--ds-fs-body-13);
  color: var(--ds-text-gray-700);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.ds-upload-placeholder {
  flex: 1;
  font-size: var(--ds-fs-body-13);
  color: var(--ds-text-gray-500);
}
.ds-upload-x {
  display: inline-flex; background: transparent; border: 0;
  cursor: pointer; color: var(--ds-text-gray-700); padding: 0;
}

.ds-upload-helper {
  margin: 0; padding-left: var(--ds-space-4);
  font-size: var(--ds-fs-body-12); color: var(--ds-text-gray-700);
}
.ds-upload-helper--error { color: var(--ds-text-red-300); }
</style>
