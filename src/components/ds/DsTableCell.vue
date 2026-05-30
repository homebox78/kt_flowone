<script setup>
import { computed } from 'vue'

// 시안 4:13725 Table Cell — Large(44)/Small(36) × 17 states
// 단순 셀 컨테이너. 실제 콘텐츠는 slot으로 전달 (Ds*).
const props = defineProps({
  size: { type: String, default: 'large', validator: (v) => ['large', 'small'].includes(v) },
  align: { type: String, default: 'left', validator: (v) => ['left', 'center', 'right'].includes(v) },
  width: { type: [String, Number], default: null },
  noBorderRight: { type: Boolean, default: false },
})
const classes = computed(() => ['ds-tc', `ds-tc--${props.size}`, `ds-tc--${props.align}`, { 'ds-tc--no-r': props.noBorderRight }])
const style = computed(() => (props.width ? { width: typeof props.width === 'number' ? props.width + 'px' : props.width } : {}))
</script>

<template>
  <div :class="classes" :style="style"><slot /></div>
</template>

<style scoped>
.ds-tc {
  display: flex; align-items: center;
  background: var(--ds-fill-gray-white);
  border-bottom: 1px solid var(--ds-border-gray-200);
  border-right: 1px solid var(--ds-border-gray-200);
  padding: 0 var(--ds-space-10);
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-body-13);
  color: var(--ds-text-gray-black);
}
.ds-tc--no-r { border-right: 0; }
.ds-tc--large { min-height: 44px; padding-top: var(--ds-space-6); padding-bottom: var(--ds-space-6); }
.ds-tc--small { min-height: 36px; padding-top: var(--ds-space-4); padding-bottom: var(--ds-space-4); }
.ds-tc--left   { justify-content: flex-start; text-align: left; }
.ds-tc--center { justify-content: center; text-align: center; }
.ds-tc--right  { justify-content: flex-end; text-align: right; }
</style>
