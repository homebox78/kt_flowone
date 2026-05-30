<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { DsCheckbox } from '@/components/ds'

// AG Grid cell/header checkbox renderer — DsCheckbox 사용 (DS 규칙 준수)
// AG Grid 이벤트를 구독해 선택 상태에 반응적으로 업데이트
const props = defineProps({
  params: { type: Object, required: true },
})

const isHeader = computed(() => !props.params.node || !props.params.data && props.params.column?.colDef?.headerComponent)

// 반응형 상태 — AG Grid 이벤트로 강제 업데이트
const tick = ref(0)
const force = () => { tick.value++ }

const api = computed(() => props.params.api)
const node = computed(() => props.params.node)

const checked = computed(() => {
  tick.value // reactive dependency
  if (isHeader.value) {
    const a = api.value
    if (!a) return false
    const total = a.getDisplayedRowCount?.() || 0
    let selected = 0
    a.forEachNode?.((n) => { if (n.isSelected()) selected++ })
    return total > 0 && selected === total
  }
  return !!node.value?.isSelected?.()
})

const indeterminate = computed(() => {
  tick.value
  if (!isHeader.value) return false
  const a = api.value
  if (!a) return false
  const total = a.getDisplayedRowCount?.() || 0
  let selected = 0
  a.forEachNode?.((n) => { if (n.isSelected()) selected++ })
  return selected > 0 && selected < total
})

function onChange(v) {
  if (isHeader.value) {
    const a = api.value
    if (v) a?.selectAll?.()
    else a?.deselectAll?.()
  } else {
    node.value?.setSelected?.(v)
  }
}

// AG Grid 이벤트 구독
function onRowSelected() { force() }
function onSelectionChanged() { force() }

onMounted(() => {
  const a = api.value
  if (a) {
    a.addEventListener?.('rowSelected', onRowSelected)
    a.addEventListener?.('selectionChanged', onSelectionChanged)
  }
})
onBeforeUnmount(() => {
  const a = api.value
  if (a) {
    a.removeEventListener?.('rowSelected', onRowSelected)
    a.removeEventListener?.('selectionChanged', onSelectionChanged)
  }
})
</script>

<template>
  <div class="grid-check">
    <DsCheckbox
      :model-value="checked"
      :indeterminate="indeterminate"
      @update:model-value="onChange"
      @click.stop
    />
  </div>
</template>

<style scoped>
.grid-check {
  display: flex; align-items: center; justify-content: center;
  width: 100%; height: 100%;
}
</style>
