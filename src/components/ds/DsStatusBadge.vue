<script setup>
import { computed } from 'vue'
import DsIcon from './DsIcon.vue'

// 신작 계획 관리 등에서 사용하는 상태 표시
// urgent=true 면 fill-caution 아이콘 + 진한 색
// urgent=false 면 단순 컬러 텍스트
const props = defineProps({
  status: { type: String, required: true },
  urgent: { type: Boolean, default: false },
})

const STYLES = {
  요청반려: { color: 'var(--ds-text-red-300)' },
  승인요청: { color: 'var(--ds-text-blue-500)' },
  승인완료: { color: 'var(--ds-text-purple-600)' },
  임시저장: { color: 'var(--ds-text-gray-700)' },
}

const showIcon = computed(() =>
  props.urgent && (props.status === '요청반려' || props.status === '승인요청'),
)
const color = computed(() => STYLES[props.status]?.color || 'var(--ds-text-gray-700)')
</script>

<template>
  <span class="ds-st" :style="{ color }">
    <span v-if="showIcon" class="ds-st__icon" :style="{ color }">
      <DsIcon name="fill-caution" :size="16" />
    </span>
    {{ status }}
  </span>
</template>

<style scoped>
.ds-st {
  display: inline-flex;
  align-items: center;
  gap: var(--ds-space-4);
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-body-13);
  font-weight: var(--ds-fw-medium);
  line-height: var(--ds-lh-body);
}
.ds-st__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
/* fill-caution SVG가 fill="var(--fill-0, #212633)" 인 점 활용 — color 로 override */
.ds-st__icon :deep(.ds-icon) { --fill-0: currentColor; }
.ds-st__icon :deep(svg [fill]) { fill: currentColor; }
</style>
