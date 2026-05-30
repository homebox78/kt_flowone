<script setup>
import { computed } from 'vue'
import { VDatePicker } from 'vuetify/components'

// 시안 4:14802 Date Picker 캘린더 — Vuetify VDatePicker (standalone)
const props = defineProps({
  modelValue: { type: String, default: '' }, // 'YYYY-MM-DD'
  minDate: { type: String, default: '' },
  maxDate: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue', 'pick'])

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
  const s = fmt(d)
  emit('update:modelValue', s)
  emit('pick', s)
}
</script>

<template>
  <VDatePicker
    :model-value="dateValue"
    :min="minDate || undefined"
    :max="maxDate || undefined"
    show-adjacent-months
    class="ds-cal"
    @update:model-value="onPick"
  />
</template>

<style scoped>
.ds-cal { font-family: var(--ds-font-family); }
</style>
