<script setup>
import { computed } from 'vue'
import DsIcon from './DsIcon.vue'

// 시안 4:13898 Detail Header — 폼 좌측 헤더 셀
const props = defineProps({
  text: { type: String, required: true },
  essential: { type: Boolean, default: false },
  icon: { type: Boolean, default: false }, // help/caution icon trailing
  underline: { type: Boolean, default: false },
  width: { type: [String, Number], default: 160 },
})
const style = computed(() => ({ width: typeof props.width === 'number' ? props.width + 'px' : props.width }))
</script>

<template>
  <div class="ds-dh" :style="style">
    <span class="ds-dh__text" :class="{ 'ds-dh__text--ul': underline }">{{ text }}</span>
    <span v-if="essential" class="ds-dh__star">*</span>
    <DsIcon v-if="icon" name="line-caution" :size="16" class="ds-dh__icon" />
  </div>
</template>

<style scoped>
.ds-dh {
  display: flex; align-items: center; gap: 2px;
  min-height: 44px;
  max-width: 160px;
  padding: var(--ds-space-12) var(--ds-space-14);
  background: var(--ds-fill-blue-50);
  border-bottom: 1px solid var(--ds-border-gray-200);
}
.ds-dh__text {
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-body-13);
  font-weight: var(--ds-fw-medium);
  line-height: var(--ds-lh-body);
  color: var(--ds-text-gray-700);
}
.ds-dh__text--ul { text-decoration: underline; text-underline-offset: 2px; }
.ds-dh__star { color: var(--ds-text-red-300); font-weight: var(--ds-fw-bold); font-size: var(--ds-fs-body-13); }
.ds-dh__icon { color: var(--ds-text-gray-700); margin-left: var(--ds-space-2); }
</style>
