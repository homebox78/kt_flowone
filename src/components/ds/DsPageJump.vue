<script setup>
import { ref, watch } from 'vue'

// 시안 4:14032 Page Jump — [입력 | /N 페이지 | 이동] 3분할 위젯
const props = defineProps({
  modelValue: { type: Number, default: 1 },
  total: { type: Number, required: true },
})
const emit = defineEmits(['update:modelValue', 'jump'])

const input = ref(props.modelValue)
watch(() => props.modelValue, (v) => (input.value = v))

function go() {
  const n = Number(input.value)
  if (!Number.isInteger(n) || n < 1 || n > props.total) return
  emit('update:modelValue', n)
  emit('jump', n)
}
</script>

<template>
  <div class="ds-pj">
    <input v-model.number="input" type="number" min="1" :max="total" class="ds-pj__input" @keyup.enter="go" />
    <span class="ds-pj__mid">/{{ total }} 페이지</span>
    <button type="button" class="ds-pj__btn" @click="go">이동</button>
  </div>
</template>

<style scoped>
.ds-pj { display: inline-flex; align-items: stretch; height: var(--ds-h-md); }
.ds-pj__input {
  width: 48px; padding: 0 var(--ds-space-8);
  background: var(--ds-fill-gray-white);
  border: 1px solid var(--ds-border-gray-300); border-right: 0;
  border-radius: var(--ds-radius-4) 0 0 var(--ds-radius-4);
  font-family: var(--ds-font-family); font-size: var(--ds-fs-body-13);
  text-align: center; color: var(--ds-text-gray-700);
  outline: none;
}
.ds-pj__input:focus { border-color: var(--ds-border-blue-500); }
/* 브라우저 기본 number spinner 제거 */
.ds-pj__input::-webkit-outer-spin-button,
.ds-pj__input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
.ds-pj__input { -moz-appearance: textfield; appearance: textfield; }
.ds-pj__mid {
  padding: 0 var(--ds-space-10);
  background: var(--ds-fill-gray-100);
  font-size: var(--ds-fs-body-13); color: var(--ds-text-gray-700);
  display: inline-flex; align-items: center;
  border-top: 1px solid var(--ds-border-gray-300);
  border-bottom: 1px solid var(--ds-border-gray-300);
}
.ds-pj__btn {
  padding: 0 var(--ds-space-8);
  background: var(--ds-fill-gray-600);
  color: var(--ds-text-gray-white);
  border: 0; border-radius: 0 var(--ds-radius-4) var(--ds-radius-4) 0;
  font-family: var(--ds-font-family); font-size: var(--ds-fs-body-13);
  font-weight: var(--ds-fw-medium); cursor: pointer;
}
.ds-pj__btn:hover { background: var(--ds-fill-gray-700); }
</style>
