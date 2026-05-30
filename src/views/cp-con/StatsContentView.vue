<script setup>
// Figma 59-16588 — 콘텐츠 통계 (단편/시리즈 통계)
import { ref, computed } from 'vue'
import AgGridWrapper from '@/components/common/AgGridWrapper.vue'
import {
  DsPageHeader, DsSelect, DsRadioGroup, DsButton,
  DsFilterGroup, DsFilterField, DsTableToolbar,
} from '@/components/ds'

const filters = ref({ unit: '월별', fromYear: '2025년', fromMonth: '9월', toYear: '2026년', toMonth: '9월', chartType: '라인' })
function reset() { filters.value = { unit: '월별', fromYear: '2025년', fromMonth: '9월', toYear: '2026년', toMonth: '9월', chartType: '라인' } }
function search() {}

const years = ['2024년', '2025년', '2026년']
const months = Array.from({ length: 12 }, (_, i) => `${i + 1}월`)

const CENTER = { display: 'flex', alignItems: 'center', justifyContent: 'center' }

// 시안 59-16629: 기간(전체높이) + 영상 그룹[ 단편·시리즈(2행 span) + GTV·GTM 그룹 ]
const columnDefs = [
  { field: 'period', headerName: '기간', width: 120, cellStyle: CENTER },
  {
    headerName: '영상',
    children: [
      { field: 'single', headerName: '단편', width: 110, cellStyle: CENTER },
      { field: 'series', headerName: '시리즈', width: 110, cellStyle: CENTER },
      { headerName: 'GTV', children: [
        { field: 'gtvSd', headerName: 'SD', width: 90, cellStyle: CENTER },
        { field: 'gtvHd', headerName: 'HD', width: 90, cellStyle: CENTER },
        { field: 'gtvAsp', headerName: 'ASP', width: 90, cellStyle: CENTER },
        { field: 'gtvFhd', headerName: 'FHD', width: 90, cellStyle: CENTER },
        { field: 'gtvUhd', headerName: 'UHD', width: 90, cellStyle: CENTER },
      ] },
      { headerName: 'GTM', children: [
        { field: 'gtmSd', headerName: 'SD', width: 90, cellStyle: CENTER },
        { field: 'gtmHd', headerName: 'HD', width: 90, cellStyle: CENTER },
        { field: 'gtmAsp', headerName: 'ASP', width: 90, cellStyle: CENTER },
        { field: 'gtmFhd', headerName: 'FHD', width: 90, cellStyle: CENTER },
        { field: 'gtmUhd', headerName: 'UHD', width: 90, cellStyle: CENTER },
      ] },
    ],
  },
]
const defaultColDef = { sortable: true, resizable: true, suppressMovable: true }

const rows = [
  { period: '2025-09', single: 7, series: 182, gtvSd: 0, gtvHd: 296, gtvAsp: 0, gtvFhd: 0, gtvUhd: 29, gtmSd: 0, gtmHd: 0, gtmAsp: 295, gtmFhd: 0, gtmUhd: 0 },
  { period: '2025-10', single: 182, series: 7, gtvSd: 0, gtvHd: 301, gtvAsp: 0, gtvFhd: 0, gtvUhd: 24, gtmSd: 0, gtmHd: 0, gtmAsp: 300, gtmFhd: 0, gtmUhd: 0 },
  { period: '2025-11', single: 108, series: 4, gtvSd: 0, gtvHd: 283, gtvAsp: 0, gtvFhd: 0, gtvUhd: 27, gtmSd: 0, gtmHd: 0, gtmAsp: 284, gtmFhd: 0, gtmUhd: 0 },
  { period: '2025-12', single: 117, series: 7, gtvSd: 0, gtvHd: 285, gtvAsp: 0, gtvFhd: 0, gtvUhd: 28, gtmSd: 0, gtmHd: 0, gtmAsp: 285, gtmFhd: 0, gtmUhd: 0 },
  { period: '2026-01', single: 155, series: 6, gtvSd: 0, gtvHd: 294, gtvAsp: 0, gtvFhd: 0, gtvUhd: 31, gtmSd: 0, gtmHd: 0, gtmAsp: 294, gtmFhd: 0, gtmUhd: 0 },
  { period: '2026-02', single: 182, series: 118, gtvSd: 0, gtvHd: 273, gtvAsp: 0, gtvFhd: 0, gtvUhd: 28, gtmSd: 0, gtmHd: 0, gtmAsp: 273, gtmFhd: 0, gtmUhd: 0 },
  { period: '2026-03', single: 2, series: 92, gtvSd: 0, gtvHd: 216, gtvAsp: 0, gtvFhd: 0, gtvUhd: 20, gtmSd: 0, gtmHd: 0, gtmAsp: 218, gtmFhd: 0, gtmUhd: 0 },
]
const totalRow = [{ period: '합계', single: 37, series: 879, gtvSd: 0, gtvHd: 1948, gtvAsp: 0, gtvFhd: 0, gtvUhd: 187, gtmSd: 0, gtmHd: 0, gtmAsp: 1949, gtmFhd: 0, gtmUhd: 0 }]

const page = ref(1)
const pageSize = ref(10)
const total = 120
const totalPages = computed(() => Math.ceil(total / pageSize.value))
</script>

<template>
  <div class="page">
    <DsPageHeader title="단편/시리즈 통계" :breadcrumb="['홈', '현황/통계', '단편/시리즈 통계']" />

    <DsFilterGroup class="mb">
      <!-- 시안 59-16599: 검색기간 + 통계유형을 한 줄에 흐름 배치 (50/50 그리드 아님 — 통계유형이 밀리지 않게) -->
      <div class="filter-flow">
        <DsFilterField label="검색기간">
          <div class="w-100"><DsSelect v-model="filters.unit" :options="['월별','일별']" /></div>
          <div class="w-120"><DsSelect v-model="filters.fromYear" :options="years" /></div>
          <div class="w-100"><DsSelect v-model="filters.fromMonth" :options="months" /></div>
          <span class="tilde">~</span>
          <div class="w-120"><DsSelect v-model="filters.toYear" :options="years" /></div>
          <div class="w-100"><DsSelect v-model="filters.toMonth" :options="months" /></div>
        </DsFilterField>
        <DsFilterField label="통계유형">
          <DsRadioGroup v-model="filters.chartType" :options="['라인','바']" name="chartType" />
        </DsFilterField>
      </div>
      <template #actions>
        <DsButton type="neutral-outline" only-icon icon="line-rotate" @click="reset" />
        <DsButton type="primary" @click="search">조회</DsButton>
      </template>
    </DsFilterGroup>

    <section class="card body-card">
      <DsTableToolbar :total="total" :page-size="pageSize" :page="page" :total-pages="totalPages"
        @update:page-size="(s) => { pageSize = s; page = 1 }" @update:page="page = $event">
        <DsButton type="neutral-outline" icon="line-download">엑셀다운로드</DsButton>
      </DsTableToolbar>
      <AgGridWrapper
        class="grid stat-grid"
        :column-defs="columnDefs" :row-data="rows" :default-col-def="defaultColDef"
        :pinned-bottom-row-data="totalRow"
        :pagination="false"
        dom-layout="autoHeight"
        :header-height="40" :row-height="44"
        @grid-ready="(p) => p.api.sizeColumnsToFit()"
        @first-data-rendered="(p) => p.api.sizeColumnsToFit()"
      />
    </section>
  </div>
</template>

<style scoped>
/* 하단 padding 없음 — 푸터 top padding(40)이 콘텐츠↔푸터 간격 담당 */
.page { flex: 1; min-width: 0; padding: 0 var(--ds-space-40); width: 100%; }
.page .card { min-width: 0; }
.mb { margin-bottom: var(--ds-space-24); }
.card { background: var(--ds-fill-gray-white); }
.body-card { border-radius: var(--ds-radius-20); padding: var(--ds-space-40); display: flex; flex-direction: column; gap: var(--ds-space-12); box-shadow: 0 2px 8px 0 rgba(95, 102, 160, 0.06); min-width: 0; overflow: hidden; }
/* 검색기간 + 통계유형 한 줄 흐름 배치 (각 필드는 내용 너비만 차지) */
.filter-flow { display: flex; align-items: center; gap: var(--ds-space-40); flex-wrap: wrap; }
.filter-flow :deep(.ds-ffield) { width: auto; flex: 0 0 auto; }
.w-100 { width: 100px; flex-shrink: 0; }
.w-120 { width: 120px; flex-shrink: 0; }
.tilde { color: var(--ds-text-gray-500); }

/* 합계 행 강조(gray-300 배경 + 볼드 + 검정 텍스트)는 AgGridWrapper 공통 스타일에서 처리 */
</style>
