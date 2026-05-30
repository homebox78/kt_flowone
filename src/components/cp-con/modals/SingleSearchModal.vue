<script setup>
// 단편 검색 모달 — 단편명/단편 ID 검색해서 선택
import { ref, computed, h, markRaw } from 'vue'
import {
  DsModal, DsSelect, DsTextField, DsButton,
  DsCheckbox, DsPagination, DsTableToolbar, DsRadio,
  DsFilterGroup, DsFilterRow, DsFilterField,
} from '@/components/ds'
import AgGridWrapper from '@/components/common/AgGridWrapper.vue'

defineProps({
  modelValue: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue', 'select'])

const scope = ref('단편명')
const keyword = ref('')
const myOnly = ref(false)
const selectedId = ref(null)
const page = ref(1)
const pageSize = ref(50)

const TITLES = [
  '아바타 : 물의 길', '아이언맨', '존윅 2', '존윅 4', '인터스텔라', '오펜하이머',
  '듄: 파트2', '미션 임파서블', '범죄도시 4', '서울의 봄', '파묘', '괴물', '기생충',
  '왕과 사는 남자', '좀비딸', '中國영화', '굿 플레이스', '어벤져스: 엔드게임',
  '스파이더맨', '탑건: 매버릭', '바비', '엘리멘탈', '인사이드 아웃 2',
]
const CATEGORIES = ['영화_외국영화', '영화_국내영화', '지상파_KBS', '지상파_SBS', '지상파_MBC']
const GENRES = ['액션/SF', '드라마', '코미디', '로맨스', '판타지']
function pad2(n) { return String(n).padStart(2, '0') }
function makeDate(seed) {
  const m = (seed * 7 + 3) % 12 + 1
  const d = (seed * 13 + 5) % 28 + 1
  const y = 2020 + (seed % 6)
  return `${y}-${pad2(m)}-${pad2(d)}`
}

const allRows = computed(() =>
  Array.from({ length: 234 }, (_, i) => ({
    id: `single-${i}`,
    no: 234 - i,
    titleId: String(1000000000 + (i * 31337) % 999999999),
    title: TITLES[i % TITLES.length],
    category: CATEGORIES[i % CATEGORIES.length],
    genre: GENRES[i % GENRES.length],
    regDate: makeDate(i),
  })),
)
const total = computed(() => allRows.value.length)
const totalPages = computed(() => Math.ceil(total.value / pageSize.value))
const rowData = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return allRows.value.slice(start, start + pageSize.value)
})

function reset() {
  scope.value = '전체'
  keyword.value = ''
}
function search() { /* TODO(api) */ }

function onSelect() {
  const row = allRows.value.find((r) => r.id === selectedId.value)
  if (row) emit('select', row)
  emit('update:modelValue', false)
}

const RadioCell = markRaw({
  props: ['params'],
  setup(props) {
    return () => h(DsRadio, {
      modelValue: selectedId.value,
      value: props.params.data.id,
      name: 'single-pick',
      'onUpdate:modelValue': (v) => { selectedId.value = v },
    })
  },
})

const CENTER_CELL = { display: 'flex', alignItems: 'center', justifyContent: 'center' }
const columnDefs = [
  { headerName: '선택', width: 60, suppressSizeToFit: true, sortable: false, resizable: false, cellRenderer: RadioCell, cellStyle: CENTER_CELL },
  { field: 'titleId', headerName: '단편 ID', width: 140, cellStyle: CENTER_CELL },
  { field: 'title', headerName: '단편명', flex: 1, minWidth: 240 },
]
const defaultColDef = { sortable: true, resizable: true, suppressMovable: true }
</script>

<template>
  <DsModal :model-value="modelValue" title="단편 조회" :width="720" @update:model-value="$emit('update:modelValue', $event)">
    <div class="search-row">
      <span class="lbl">조회</span>
      <div class="select"><DsSelect v-model="scope" :options="['단편명','단편 ID']" /></div>
      <div class="input"><DsTextField v-model="keyword" placeholder="입력" /></div>
      <span class="divider" />
      <DsButton type="neutral-outline" only-icon icon="line-rotate" @click="reset" />
      <DsButton type="primary" @click="search">조회</DsButton>
    </div>

    <AgGridWrapper
      :column-defs="columnDefs" :row-data="rowData" :default-col-def="defaultColDef"
      :pagination="false"
      :height="`${40 + Math.min(rowData.length, 10) * 44 + 2}px`"
      :header-height="40" :row-height="44"
      @grid-ready="(p) => p.api.sizeColumnsToFit()"
      @first-data-rendered="(p) => p.api.sizeColumnsToFit()"
    />

    <div class="pager-wrap"><DsPagination v-model="page" :total="total" :page-size="pageSize" /></div>

    <template #footer>
      <DsButton type="neutral-outline" size="large" @click="$emit('update:modelValue', false)">취소</DsButton>
      <DsButton type="primary" size="large" :disabled="!selectedId" @click="onSelect">선택</DsButton>
    </template>
  </DsModal>
</template>

<style scoped>
.search-row {
  display: flex; align-items: center; gap: var(--ds-space-8);
  padding-bottom: var(--ds-space-20);
  border-bottom: 1px solid var(--ds-border-gray-300);
  margin-bottom: var(--ds-space-20);
}
.search-row .lbl {
  font-size: var(--ds-fs-body-13); font-weight: var(--ds-fw-medium);
  color: var(--ds-text-gray-black);
  width: 60px; flex-shrink: 0;
}
.search-row .select { width: 140px; flex-shrink: 0; }
.search-row .input { flex: 1; min-width: 0; }
.search-row .divider {
  display: inline-block; width: 1px; height: 20px;
  background: var(--ds-border-gray-300); margin: 0 var(--ds-space-4);
}
.search-row :deep(.ds-tf), .search-row :deep(.ds-select) { width: 100%; }

.pager-wrap { display: flex; justify-content: center; padding-top: var(--ds-space-20); }
</style>
