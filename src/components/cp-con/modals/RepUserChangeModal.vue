<script setup>
// Figma 59-16580 — 대표사용자 변경 신청 모달
import { ref, watch } from 'vue'
import { DsModal, DsButton, DsTextarea } from '@/components/ds'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue', 'submit'])

const reason = ref('')

// 열릴 때마다 사유 초기화
watch(() => props.modelValue, (open) => { if (open) reason.value = '' })

function close() { emit('update:modelValue', false) }
function submit() {
  if (!reason.value.trim()) return
  emit('submit', reason.value)
  emit('update:modelValue', false)
}
</script>

<template>
  <DsModal :model-value="modelValue" title="대표사용자 변경 신청" :width="720" @update:model-value="$emit('update:modelValue', $event)">
    <p class="lead">
      해당 사용자를 대표사용자로 변경하시려면 관리자의 승인이 필요합니다.<br />
      승인 요청하시겠습니까?
    </p>
    <DsTextarea
      v-model="reason"
      :rows="6"
      :maxlength="1000"
      show-counter
      placeholder="요청 시에는 변경 사유를 입력해주세요"
    />

    <template #footer>
      <DsButton type="neutral-outline" size="large" @click="close">취소</DsButton>
      <DsButton type="primary" size="large" :disabled="!reason.trim()" @click="submit">요청</DsButton>
    </template>
  </DsModal>
</template>

<style scoped>
.lead {
  margin: 0 0 var(--ds-space-16);
  font-size: var(--ds-fs-body-15);
  line-height: var(--ds-lh-body);
  color: var(--ds-text-gray-700);
}
</style>
