<script setup>
import { computed } from 'vue'

// 스타일 가이드 전용: 컴포넌트 사용법(import + snippet + Props 표) 표시
const props = defineProps({
  name: { type: String, required: true },         // ex: 'DsButton'
  snippet: { type: String, required: true },      // 사용 예시 코드 (HTML/Vue)
  props: { type: Array, default: () => [] },      // [{ name, type, default, desc }]
  events: { type: Array, default: () => [] },     // [{ name, payload, desc }]
  slots: { type: Array, default: () => [] },      // [{ name, desc }]
})

// 라인 단위로 분리해 주석 라인을 syntax highlight 가능하게 마킹
const codeLines = computed(() => {
  // 컴포넌트 목록이 콤마 있을 경우 import 라인 분리
  const importLine = props.name.includes(',')
    ? `import { ${props.name.split(',').map(s => s.trim()).join(', ')} } from '@/components/ds'`
    : `import { ${props.name} } from '@/components/ds'`
  const full = importLine + '\n\n' + props.snippet
  return full.split('\n').map((line) => {
    const trimmed = line.trimStart()
    let type = 'normal'
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) type = 'comment'
    else if (trimmed.startsWith('<!--')) type = 'comment'
    return { text: line, type }
  })
})
</script>

<template>
  <div class="sg-api">
    <h3 class="sg-api__heading">📘 사용법</h3>

    <pre class="sg-api__code"><code><span v-for="(l, i) in codeLines" :key="i" :class="`sg-api__line sg-api__line--${l.type}`">{{ l.text }}
</span></code></pre>

    <h4 class="sg-api__label">Props</h4>
    <table v-if="props.length" class="sg-api__table">
      <thead>
        <tr><th>Name</th><th>Type</th><th>Default</th><th>설명</th></tr>
      </thead>
      <tbody>
        <tr v-for="p in props" :key="p.name">
          <td><code>{{ p.name }}</code></td>
          <td><code class="sg-api__type">{{ p.type }}</code></td>
          <td><code class="sg-api__default">{{ p.default }}</code></td>
          <td>{{ p.desc }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else class="sg-api__empty">Props 없음</p>

    <template v-if="events.length">
      <h4 class="sg-api__label">Events</h4>
      <table class="sg-api__table">
        <thead><tr><th>Name</th><th>Payload</th><th>설명</th></tr></thead>
        <tbody>
          <tr v-for="e in events" :key="e.name">
            <td><code>{{ e.name }}</code></td>
            <td><code class="sg-api__type">{{ e.payload }}</code></td>
            <td>{{ e.desc }}</td>
          </tr>
        </tbody>
      </table>
    </template>

    <template v-if="slots.length">
      <h4 class="sg-api__label">Slots</h4>
      <table class="sg-api__table">
        <thead><tr><th>Name</th><th>설명</th></tr></thead>
        <tbody>
          <tr v-for="s in slots" :key="s.name">
            <td><code>{{ s.name }}</code></td>
            <td>{{ s.desc }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<style scoped>
.sg-api { margin-top: 32px; padding-top: 24px; border-top: 1px dashed var(--ds-fill-gray-300); }
.sg-api__heading {
  margin: 0 0 12px; font-size: 18px; font-weight: 700; color: var(--ds-text-gray-900);
}
.sg-api__label {
  margin: 16px 0 8px; font-size: 13px; font-weight: 700; color: var(--ds-text-gray-700);
}

/* 다크 코드 블록 + 라인별 syntax 컬러 */
.sg-api__code {
  background: #1e2130;
  border-radius: 10px;
  padding: 20px 24px;
  margin: 0 0 24px;
  overflow-x: auto;
  font-family: ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace;
  font-size: 13px;
  line-height: 1.7;
  color: #e6e8ef;
}
.sg-api__code code {
  font-family: inherit; font-size: inherit; line-height: inherit;
  background: transparent; padding: 0;
}
.sg-api__line { display: inline; }
.sg-api__line--comment { color: #7b8aa8; }   /* 주석 */
.sg-api__line--normal  { color: #e6e8ef; }
.sg-api__table {
  width: 100%; border-collapse: collapse; font-family: var(--ds-font-family);
}
.sg-api__table thead th {
  text-align: left; padding: 8px 12px;
  font-size: 12px; font-weight: 700; color: var(--ds-text-gray-700);
  background: var(--ds-fill-gray-50);
  border-bottom: 1px solid var(--ds-fill-gray-200);
}
.sg-api__table tbody td {
  padding: 10px 12px; border-bottom: 1px solid var(--ds-fill-gray-200);
  font-size: 13px; color: var(--ds-text-gray-900); vertical-align: top;
}
.sg-api__table code {
  display: inline-block; padding: 1px 6px; border-radius: 3px;
  background: var(--ds-fill-blue-75); color: var(--ds-text-blue-500);
  font-size: 12px;
}
.sg-api__type { background: var(--ds-fill-gray-100) !important; color: var(--ds-text-gray-700) !important; }
.sg-api__default { background: var(--ds-fill-purple-75) !important; color: var(--ds-text-purple-600) !important; }
.sg-api__empty { color: var(--ds-text-gray-500); font-size: 13px; margin: 0; }
</style>
