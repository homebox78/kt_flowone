<script setup>
import { computed } from 'vue'

// 시안 SVG 55개를 raw 문자열로 import → 인라인 <svg> 렌더링.
// URL 해석/캐시 이슈 없음. currentColor 적용 가능.
const modules = import.meta.glob('@/assets/icons/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
})
const icons = {}
for (const path in modules) {
  const name = path.split('/').pop().replace('.svg', '')
  icons[name] = modules[path]
}

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
})

const sizePx = computed(() => (typeof props.size === 'number' ? props.size + 'px' : props.size))
const svg = computed(() => icons[props.name] || '')
</script>

<template>
  <span
    v-if="svg"
    class="ds-icon"
    :style="{ width: sizePx, height: sizePx }"
    v-html="svg"
  />
  <span v-else class="ds-icon-missing" :style="{ width: sizePx, height: sizePx }">?</span>
</template>

<style scoped>
.ds-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  flex-shrink: 0;
  line-height: 0;
}
.ds-icon :deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}
.ds-icon-missing {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--ds-fill-red-50);
  color: var(--ds-text-red-300);
  border: 1px dashed var(--ds-border-red-300);
  font-size: 11px;
}
</style>
