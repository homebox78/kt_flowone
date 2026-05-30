<script setup>
// 시안 Page 4 — 판권계약검색 모달 (PlanManagement 패턴 적용)
import { ref, computed, h, markRaw } from 'vue'
import {
  DsModal, DsSelect, DsTextField, DsDatePicker, DsButton,
  DsCheckbox, DsPagination, DsTableToolbar, DsRadio,
  DsFilterGroup, DsFilterRow, DsFilterField,
} from '@/components/ds'
import AgGridWrapper from '@/components/common/AgGridWrapper.vue'

defineProps({
  modelValue: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue', 'select'])

const dateFrom = ref('')
const dateTo = ref('')
const scope = ref('전체')
const keyword = ref('')
const myOnly = ref(false)
const selectedId = ref(null)
const page = ref(1)
const pageSize = ref(100)

const CP_NAMES = ['KT', '지니뮤직', 'CJ ENM', 'JTBC', '카카오엔터', '스튜디오드래곤', '네이버웹툰', 'SBS', 'MBC', 'tvN']
const CONTRACT_NAMES = [
  '아바타 : 물의 길 판권', '존윅 4 글로벌 판권', '오징어게임 시즌2 콘텐츠 공급',
  '무빙 시리즈 판권 갱신', '더 글로리 OTT 판권', '괴물 콘텐츠 라이선스',
  '범죄도시 4 영화 판권', '경성크리처 판권 계약', '아이언맨 마블 콘텐츠',
  '굿닥터 KBS 시리즈', '런닝맨 SBS 콘텐츠', '무한도전 MBC 콘텐츠',
  '中國영화 외화 콘텐츠', '굿 플레이스 시즌 판권', '왕과 사는 남자 드라마',
]
const USER_NAMES = ['홍길*', '김민*', '이수*', '박지*', '최영*', '정현*', '오세*', '신혜*', '강동*', '윤아*']
function pad(n) { return String(n).padStart(2, '0') }
function makeDate(seed, baseYear) {
  const m = (seed * 7 + 3) % 12 + 1
  const d = (seed * 13 + 5) % 28 + 1
  const y = baseYear + (seed % 4)
  return `${y}-${pad(m)}-${pad(d)}`
}

const allRows = computed(() =>
  Array.from({ length: 1234 }, (_, i) => {
    const codeNum = 900000000 + (i * 31337) % 99999999
    return {
      id: `row-${i}`,
      no: 2691 - i,
      code: String(codeNum),
      name: CONTRACT_NAMES[i % CONTRACT_NAMES.length],
      cp: CP_NAMES[i % CP_NAMES.length],
      user: USER_NAMES[i % USER_NAMES.length],
      date1: makeDate(i, 2020),
      date2: makeDate(i + 7, 2021),
      date3: makeDate(i + 13, 2025),
    }
  }),
)
const total = computed(() => allRows.value.length)
const totalPages = computed(() => Math.ceil(total.value / pageSize.value))
const rowData = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return allRows.value.slice(start, start + pageSize.value)
})

function reset() {
  dateFrom.value = ''
  dateTo.value = ''
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
      name: 'rights-pick',
      'onUpdate:modelValue': (v) => { selectedId.value = v },
    })
  },
})

const CENTER_CELL = { display: 'flex', alignItems: 'center', justifyContent: 'center' }

const columnDefs = [
  { headerName: '선택', width: 70, suppressSizeToFit: true, sortable: false, resizable: false, cellRenderer: RadioCell, cellStyle: CENTER_CELL },
  { field: 'no', headerName: '번호', width: 80, suppressSizeToFit: true, cellStyle: CENTER_CELL },
  { field: 'code', headerName: '판권계약번호', width: 140 },
  { field: 'name', headerName: '판권계약명', width: 220 },
  { field: 'cp', headerName: 'CP명', width: 100, cellStyle: CENTER_CELL },
  { field: 'user', headerName: '대표사용자', width: 120, cellStyle: CENTER_CELL },
  { field: 'date1', headerName: '판권계약체결일', width: 140, cellStyle: CENTER_CELL },
  { field: 'date2', headerName: '판권계약시작일', width: 140, cellStyle: CENTER_CELL },
  { field: 'date3', headerName: '판권계약종료일', width: 140, cellStyle: CENTER_CELL },
]
const defaultColDef = { sortable: true, resizable: true, suppressMovable: true }
</script>

<template>
  <DsModal :model-value="modelValue" title="판권계약검색" :width="1240" @update:model-value="$emit('update:modelValue', $event)">
    <!-- 시안 4:3201 — 검색 영역 (2행 필터 + 우측 액션 버튼) -->
    <div class="search-area">
      <div class="search-area__filter">
        <div class="search-row">
          <span class="lbl">판권계약체결일</span>
          <div class="date"><DsDatePicker v-model="dateFrom" /></div>
          <span class="tilde">~</span>
          <div class="date"><DsDatePicker v-model="dateTo" /></div>
        </div>
        <div class="search-row">
          <span class="lbl">검색</span>
          <div class="select"><DsSelect v-model="scope" :options="['전체','판권계약번호','판권계약명','CP명']" /></div>
          <div class="input"><DsTextField v-model="keyword" placeholder="검색어 입력" /></div>
        </div>
      </div>
      <span class="search-area__divider" />
      <div class="search-area__actions">
        <DsButton type="neutral-outline" only-icon icon="line-rotate" @click="reset" />
        <DsButton type="primary" @click="search">조회</DsButton>
      </div>
    </div>

    <div class="toolbar-row">
      <DsTableToolbar
        :total="total" :page-size="pageSize" :page="page" :total-pages="totalPages"
        :page-size-options="[10, 50, 100]"
        @update:page-size="(s) => { pageSize = s; if (page > Math.ceil(total / s)) page = 1 }"
        @update:page="page = $event"
      />
      <DsCheckbox v-model="myOnly" label="내 판권 계약 보기" />
    </div>

    <AgGridWrapper
      class="grid"
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
/* 시안 4:3201 — 검색 영역 레이아웃 */
.search-area {
  display: flex; align-items: stretch;
  gap: var(--ds-space-16);
  padding-bottom: var(--ds-space-20);
  border-bottom: 1px solid var(--ds-border-gray-300);
  margin-bottom: var(--ds-space-16);
}
.search-area__filter {
  flex: 1; min-width: 0;
  display: flex; flex-direction: column; gap: var(--ds-space-8);
}
.search-row {
  display: flex; align-items: center; gap: var(--ds-space-8);
}
.search-row .lbl {
  width: 90px; flex-shrink: 0;
  font-size: var(--ds-fs-body-13); font-weight: var(--ds-fw-medium);
  color: var(--ds-text-gray-black);
}
.search-row .date { flex: 1; min-width: 0; }
.search-row .tilde {
  width: 10px; text-align: center;
  font-size: var(--ds-fs-body-13); color: var(--ds-text-gray-black);
}
.search-row .select { width: 178px; flex-shrink: 0; }
.search-row .input { flex: 1; min-width: 0; }
.search-row :deep(.ds-tf),
.search-row :deep(.ds-select),
.search-row :deep(.ds-date) { width: 100%; }

.search-area__divider {
  width: 1px; background: var(--ds-border-gray-300);
  align-self: stretch;
}
.search-area__actions {
  display: flex; align-items: flex-start; gap: var(--ds-space-8);
}
.tilde { color: var(--ds-text-gray-700); font-size: var(--ds-fs-body-13); flex-shrink: 0; }
.toolbar-row {
  display: flex; align-items: center; justify-content: space-between;
  gap: var(--ds-space-16); margin-bottom: var(--ds-space-12);
}
.pager-wrap { display: flex; justify-content: center; padding-top: var(--ds-space-20); }
</style>
