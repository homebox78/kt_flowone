<script setup>
import { ref, computed, useSlots, Comment, Fragment, Text } from 'vue'
import DsCollapseButton from './DsCollapseButton.vue'

// 시안 4:15159 Search Area — 필터 카드 컨테이너 + 접기/펼침
// 접힘 상태에서도 첫 N 개 행은 보이고, 그 이상만 숨김 (시안 "3줄 이상 — 접힘")
const props = defineProps({
  collapsible: { type: Boolean, default: true },
  defaultOpen: { type: Boolean, default: true },
  actions: { type: Boolean, default: true }, // 우측 액션 슬롯 사용 여부
  visibleRows: { type: Number, default: 2 }, // 접힌 상태에서 표시되는 행 수
})

const slots = useSlots()
const open = ref(props.defaultOpen)
const btnState = computed(() => (open.value ? 'open' : 'close'))

// 기본 슬롯의 행(DsFilterRow) 수를 센다 (주석/공백 텍스트는 제외, v-for 프래그먼트는 펼쳐서 계산)
function countRows(nodes) {
  let n = 0
  for (const v of nodes || []) {
    if (v.type === Comment) continue
    if (v.type === Text) {
      if (typeof v.children === 'string' && v.children.trim()) n += 1
      continue
    }
    if (v.type === Fragment) {
      n += countRows(v.children)
      continue
    }
    n += 1
  }
  return n
}
const rowCount = computed(() => (slots.default ? countRows(slots.default()) : 0))
// 시안: 접으면 visibleRows(=2) 행이 보이므로, 그보다 행이 많을 때(=3줄 이상)만 토글 노출.
// 1·2줄짜리 검색 영역에는 펼침 아이콘을 표시하지 않는다.
const showToggle = computed(() => props.collapsible && rowCount.value > props.visibleRows)
</script>

<template>
  <section class="ds-fg" :class="{ 'ds-fg--collapsed': !open }" :style="{ '--ds-fg-visible-rows': visibleRows }">
    <div class="ds-fg__inner">
      <div class="ds-fg__body"><slot /></div>
      <div v-if="actions && $slots.actions" class="ds-fg__actions">
        <slot name="actions" />
      </div>
    </div>
    <DsCollapseButton
      v-if="showToggle"
      :state="btnState"
      class="ds-fg__collapse"
      @toggle="open = !open"
    />
  </section>
</template>

<style scoped>
.ds-fg {
  position: relative;
  background: var(--ds-fill-gray-white);
  border-radius: var(--ds-radius-16);   /* 시안 4:1948: 16px */
  padding: var(--ds-space-24) var(--ds-space-40);
  margin-bottom: var(--ds-space-20);
  box-shadow: 0 2px 8px 0 rgba(95, 102, 160, 0.06);
}
.ds-fg__inner {
  display: flex; align-items: stretch; gap: var(--ds-space-16);
}
.ds-fg__body {
  flex: 1; min-width: 0;
  display: flex; flex-direction: column;
  gap: var(--ds-space-8);   /* 시안: 행 간격 8px */
}
/* 접힘 상태에서는 첫 2 행만 표시, 3행부터 숨김 (Figma "3줄 이상 — 접힘") */
.ds-fg--collapsed .ds-fg__body > :nth-child(n + 3) {
  display: none;
}
.ds-fg__actions {
  display: flex; align-items: flex-start; gap: var(--ds-space-8);
  position: relative;
  padding-left: var(--ds-space-16);
}
.ds-fg__actions::before {
  content: '';
  position: absolute; left: 0;
  top: calc(var(--ds-space-6) - 5px); bottom: calc(var(--ds-space-6) - 5px);
  width: 1px; background: var(--ds-border-gray-200);
}
.ds-fg__collapse {
  position: absolute;
  bottom: -14px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
