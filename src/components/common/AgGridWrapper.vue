<script>
export default { inheritAttrs: false }
</script>
<script setup>
import { useAttrs, computed } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import { themeQuartz } from 'ag-grid-community'

// AG Grid 35 — JS Theming API 로 시안 4:1990 라인 규칙 정의
// 가로/세로 라인 모두 표시, 좌우 외곽선만 제거, 라인색 #E8EBF1
const dsTheme = themeQuartz.withParams({
  fontFamily: 'Spoqa Han Sans Neo, sans-serif',
  fontSize: 13,
  foregroundColor: '#1A1A1A',
  backgroundColor: '#FFFFFF',
  headerBackgroundColor: '#F4F6FA',
  headerTextColor: '#5F6783',
  oddRowBackgroundColor: '#FFFFFF',
  rowHoverColor: '#EEF3FF',
  selectedRowBackgroundColor: '#EEF3FF',
  borderColor: '#E8EBF1',
  rowBorder: { style: 'solid', width: 1, color: '#E8EBF1' },
  columnBorder: { style: 'solid', width: 1, color: '#E8EBF1' },
  headerColumnBorder: { style: 'solid', width: 1, color: '#E8EBF1' },
  headerRowBorder: { style: 'solid', width: 1, color: '#E8EBF1' },
  wrapperBorder: false,
  wrapperBorderRadius: 0,
  rowHeight: 44,
  headerHeight: 40,
  cellHorizontalPadding: 14,
  accentColor: '#3D7DFF',
})

const props = defineProps({
  columnDefs: { type: Array, required: true },
  rowData: { type: Array, default: () => [] },
  defaultColDef: {
    type: Object,
    default: () => ({ sortable: true, resizable: true, filter: true }),
  },
  height: { type: String, default: '500px' },
  pagination: { type: Boolean, default: true },
  pageSize: { type: Number, default: 20 },
})
// 부모에서 전달된 추가 옵션(rowSelection, headerHeight, autoSizeStrategy, @grid-ready 등)을
// 그대로 내부 AgGridVue로 패스스루
// 전 그리드 공통 숫자 포맷 — 숫자형 셀 값에 천 단위(,) 구분기호 (시안: 모든 표 숫자 3자리마다 쉼표)
// 문자열(ID·날짜·'5,000'처럼 이미 포맷된 값)·렌더러 셀은 그대로 둠 → typeof number 인 경우만 변환
function dsNumberFormatter(params) {
  const v = params.value
  if (typeof v === 'number' && Number.isFinite(v)) return v.toLocaleString('en-US')
  return v
}
// 번호(순번) 컬럼은 콤마 제외 — 금액·통계 숫자에만 천 단위 구분기호 (단순 목록 넘버링엔 X)
function isNumberingCol(c) {
  const f = String(c.field || '').toLowerCase()
  if (['no', 'num', 'seq', 'idx', 'index', 'rownum', 'rownumber'].includes(f)) return true
  return /^(번호|순번|순위|No\.?)$/i.test(String(c.headerName || '').trim())
}
// leaf 컬럼(자식 없음)에 valueFormatter 주입. 이미 valueFormatter/렌더러가 있거나 번호 컬럼이면 건드리지 않음.
// (defaultColDef.valueFormatter 는 pinned 행 등에서 누락될 수 있어 컬럼에 직접 주입 — 모든 표 적용 보장)
function injectNumberFormatter(cols) {
  return (cols || []).map((c) => {
    if (c.children) return { ...c, children: injectNumberFormatter(c.children) }
    if (c.valueFormatter || c.cellRenderer || c.cellRendererSelector || isNumberingCol(c)) return c
    return { ...c, valueFormatter: dsNumberFormatter }
  })
}
const processedColumnDefs = computed(() => injectNumberFormatter(props.columnDefs))

const attrs = useAttrs()
// domLayout="autoHeight" 이면 컨테이너 height 를 고정하지 않고 내용에 맞춰 늘려
// 그리드 내부 세로 스크롤이 생기지 않게 한다 (헤더+전체 행 모두 노출)
const isAutoHeight = computed(
  () => (attrs.domLayout ?? attrs['dom-layout']) === 'autoHeight',
)
const wrapperStyle = computed(() =>
  isAutoHeight.value
    ? { width: '100%', maxWidth: '100%', minWidth: 0 }
    : { height: props.height, width: '100%', maxWidth: '100%', minWidth: 0, overflow: 'hidden' },
)
const gridStyle = computed(() => (isAutoHeight.value ? 'width: 100%;' : 'width: 100%; height: 100%;'))

// 데이터 없음 공통 오버레이 — 시안: 아이콘 + "검색 결과가 없습니다." (전 목록 표 공통)
const noRowsTemplate =
  '<div class="ds-no-rows">' +
  '<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">' +
  '<rect width="60" height="60" rx="30" fill="#F4F5FA"/>' +
  '<path d="M30 37.1929C31.6568 37.1929 33 38.5361 33 40.1929C32.9999 41.8496 31.6567 43.1929 30 43.1929C28.3434 43.1927 27.0001 41.8495 27 40.1929C27 38.5362 28.3434 37.1931 30 37.1929ZM30 16.8071C31.3295 16.8071 32.3975 17.8761 32.3975 19.2056L31.7959 32.9995C31.7959 33.9881 30.9886 34.7954 30 34.7954C29.0115 34.7954 28.2051 33.9881 28.2051 32.9995L27.6025 19.2056C27.6025 17.8875 28.6706 16.8072 30 16.8071Z" fill="#949BB0"/>' +
  '</svg>' +
  '<p>검색 결과가 없습니다.</p>' +
  '</div>'
const overlayNoRowsTemplate = computed(() => attrs.overlayNoRowsTemplate || noRowsTemplate)
</script>

<template>
  <div class="ds-grid" :style="wrapperStyle">
    <AgGridVue
      :columnDefs="processedColumnDefs"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
      :pagination="pagination"
      :paginationPageSize="pageSize"
      :theme="dsTheme"
      :overlay-no-rows-template="overlayNoRowsTemplate"
      v-bind="$attrs"
      :style="gridStyle"
    />
  </div>
</template>

<style scoped>
.ds-grid :deep(.ag-header-cell-text) {
  font-weight: var(--ds-fw-medium);
}
.ds-grid :deep(.ag-cell) {
  color: var(--ds-text-gray-700);
  display: flex; align-items: center;
}
.ds-grid :deep(.ag-header-cell-resize::after) { display: none !important; }
/* 데이터 없음 오버레이 (검색 결과가 없습니다.) */
.ds-grid :deep(.ag-overlay-no-rows-wrapper) { background: var(--ds-fill-gray-white); }
.ds-grid :deep(.ds-no-rows) {
  display: flex; flex-direction: column; align-items: center; gap: var(--ds-space-12);
  font-family: var(--ds-font-family);
}
.ds-grid :deep(.ds-no-rows p) {
  margin: 0; font-size: var(--ds-fs-body-14); font-weight: var(--ds-fw-medium);
  color: var(--ds-text-gray-500);
}
.ds-grid :deep(.ag-header) { border-top: 1px solid #949bb0 !important; }
.ds-grid :deep(.ag-body) { border-bottom: 1px solid #e8ebf1 !important; }
/* pinned-left(체크박스 등) 하단의 가로 스크롤 spacer 영역 숨김 */
.ds-grid :deep(.ag-horizontal-left-spacer) { display: none !important; }
/* 정렬 켰을 때 헤더가 좌측으로 붙는 문제 — 라벨 영역 가운데 정렬 */
.ds-grid :deep(.ag-header-cell-label) { justify-content: center !important; }
/* 그룹(다단) 헤더 라벨도 가운데 정렬 (시안: 영상/GTV/GTM 등 그룹 헤더 center) */
.ds-grid :deep(.ag-header-group-cell-label) { justify-content: center !important; }

/* 합계 행 공통 스타일 (전 그리드 적용) — 시안: gray-300(#d3d8e4) 배경 + 볼드 + 검정 텍스트.
   합계 행 표기 두 가지 모두 지원: ① pinned bottom 행(.ag-row-pinned) ② getRowClass="row-total" */
.ds-grid :deep(.ag-row-pinned),
.ds-grid :deep(.row-total) { background: var(--ds-fill-gray-300) !important; }
/* 셀에 직접 적용해야 테마의 .ag-cell 색/굵기를 이긴다 (행 단위로는 셀 규칙에 밀림) */
.ds-grid :deep(.ag-row-pinned) .ag-cell,
.ds-grid :deep(.row-total) .ag-cell {
  font-weight: var(--ds-fw-bold) !important;
  color: var(--ds-text-gray-black) !important;
}

/* 정렬 아이콘 SVG — JS 테마의 mask-image가 적용 안되는 환경 대비 직접 주입 */
.ds-grid :deep(.ag-icon-asc::before) {
  -webkit-mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath d='m15 10.621-4.292 4.294-1.416-1.416L16 6.793l6.708 6.706-1.416 1.416L17 10.621v14.586h-2z'/%3E%3C/svg%3E") !important;
  mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath d='m15 10.621-4.292 4.294-1.416-1.416L16 6.793l6.708 6.706-1.416 1.416L17 10.621v14.586h-2z'/%3E%3C/svg%3E") !important;
}
.ds-grid :deep(.ag-icon-desc::before) {
  -webkit-mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath d='m17 21.379 4.292-4.294 1.416 1.416L16 25.207l-6.708-6.706 1.416-1.416L15 21.379V6.793h2z'/%3E%3C/svg%3E") !important;
  mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath d='m17 21.379 4.292-4.294 1.416 1.416L16 25.207l-6.708-6.706 1.416-1.416L15 21.379V6.793h2z'/%3E%3C/svg%3E") !important;
}
.ds-grid :deep(.ag-icon-none::before) {
  -webkit-mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath d='M6.414 17l2.294 2.292-1.416 1.416L2.586 16l4.706-4.708 1.416 1.416L6.414 15H15V6.414l-2.292 2.294-1.416-1.416L16 2.586l4.708 4.706-1.416 1.416L17 6.414V15h8.586l-2.294-2.292 1.416-1.416L29.414 16l-4.706 4.708-1.416-1.416L25.586 17H17v8.586l2.292-2.294 1.416 1.416L16 29.414l-4.708-4.706 1.416-1.416L15 25.586V17z'/%3E%3C/svg%3E") !important;
  mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath d='M6.414 17l2.294 2.292-1.416 1.416L2.586 16l4.706-4.708 1.416 1.416L6.414 15H15V6.414l-2.292 2.294-1.416-1.416L16 2.586l4.708 4.706-1.416 1.416L17 6.414V15h8.586l-2.294-2.292 1.416-1.416L29.414 16l-4.706 4.708-1.416-1.416L25.586 17H17v8.586l2.292-2.294 1.416 1.416L16 29.414l-4.708-4.706 1.416-1.416L15 25.586V17z'/%3E%3C/svg%3E") !important;
}
.ds-grid :deep(.ag-icon::before) {
  -webkit-mask-size: contain !important;
  mask-size: contain !important;
  -webkit-mask-repeat: no-repeat !important;
  mask-repeat: no-repeat !important;
  -webkit-mask-position: center !important;
  mask-position: center !important;
  background-color: currentcolor !important;
  content: "" !important;
  display: block !important;
  width: 16px !important;
  height: 16px !important;
}
</style>
