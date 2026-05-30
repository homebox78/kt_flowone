<script setup>
import { computed } from 'vue'

// 시안 4:13898 Detail Cell — 폼 우측 값 셀
const props = defineProps({
  align: { type: String, default: 'left', validator: (v) => ['left', 'center', 'right'].includes(v) },
  width: { type: [String, Number], default: null },
})
const classes = computed(() => ['ds-dc', `ds-dc--${props.align}`])
const style = computed(() => (props.width ? { width: typeof props.width === 'number' ? props.width + 'px' : props.width } : {}))
</script>

<template>
  <div :class="classes" :style="style"><slot /></div>
</template>

<style scoped>
.ds-dc {
  display: flex; align-items: center;
  min-height: 44px;
  padding: var(--ds-space-6) var(--ds-space-10);
  background: var(--ds-fill-gray-white);
  border-bottom: 1px solid var(--ds-border-gray-200);
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-body-13);
  color: var(--ds-text-gray-black);
}
.ds-dc--left   { justify-content: flex-start; gap: var(--ds-space-8); }
.ds-dc--center { justify-content: center; gap: var(--ds-space-8); }
.ds-dc--right  { justify-content: flex-end; gap: var(--ds-space-8); }
</style>
