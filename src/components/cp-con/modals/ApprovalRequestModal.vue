<script setup>
// 시안 59-15484 — 승인요청 모달 (코멘트 입력 + 취소/승인요청)
import { ref } from 'vue'
import { DsModal, DsTextarea, DsButton } from '@/components/ds'

defineProps({
  modelValue: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue', 'submit'])

const comment = ref('')

function close() {
  emit('update:modelValue', false)
}
function submit() {
  emit('submit', comment.value)
  comment.value = ''
  emit('update:modelValue', false)
}
</script>

<template>
  <DsModal :model-value="modelValue" title="승인요청" :width="720" @update:model-value="$emit('update:modelValue', $event)">
    <DsTextarea v-model="comment" :rows="8" :maxlength="1000" show-counter placeholder="입력" />

    <template #footer>
      <DsButton type="neutral-outline" size="large" @click="close">취소</DsButton>
      <DsButton type="primary" size="large" :disabled="!comment.trim()" @click="submit">승인요청</DsButton>
    </template>
  </DsModal>
</template>

<style scoped>
:deep(.ds-ta) { width: 100%; }
</style>
