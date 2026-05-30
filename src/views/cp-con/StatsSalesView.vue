<script setup>
// Figma 59-16805 — 판매이용통계 (단편/시리즈 탭, 콘텐츠별 해상도 통계)
// 헤더 3단: 단편명/단편ID/기간 + [해상도 > 단가·클라우드여부·총구매횟수·총구매금액 · GTV(SD/HD/ASP/FHD/UHD) · GTM(...)]
// 단편명/단편ID는 그룹 데이터 행을 Community rowSpan 으로 병합
import { ref, computed } from 'vue'
import AgGridWrapper from '@/components/common/AgGridWrapper.vue'
import {
  DsPageHeader, DsSelect, DsTextField, DsDatePicker, DsButton,
  DsFilterGroup, DsFilterRow, DsFilterField, DsTableToolbar,
} from '@/components/ds'

const tabs = ['단편', '시리즈']
const activeTab = ref('단편')

// 시안 59-16780: 클라우드 여부 / 화질 / 검색기간 / 검색어
const filters = ref({ cloud: '전체', quality: '전체', from: '', to: '', keyword: '' })
function reset() { filters.value = { cloud: '전체', quality: '전체', from: '', to: '', keyword: '' } }
function search() {}

const CENTER = { display: 'flex', alignItems: 'center', justifyContent: 'center' }
const RIGHT = { display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }

// 탭(단편/시리즈)에 따라 첫 두 컬럼 라벨 변경
const nameLabel = computed(() => (activeTab.value === '시리즈' ? '시리즈명' : '단편명'))
const idLabel = computed(() => (activeTab.value === '시리즈' ? '시리즈ID' : '단편ID'))
// 검색어 placeholder도 탭에 맞춰 변경 (시안: "단편명/ID 입력")
const searchPlaceholder = computed(() => (activeTab.value === '시리즈' ? '시리즈명/ID 입력' : '단편명/ID 입력'))

// 콘텐츠명/콘텐츠ID는 그룹 데이터 행을 rowSpan으로 병합 (합계 행은 제외)
function nameRowSpan(params) {
  const d = params.data
  if (!d || d._total) return 1
  return d._spanFirst ? d._span : 1
}
// 병합 셀: 흰 배경으로 하위 행을 덮어 하나의 셀처럼 보이게 (Community rowSpan 패턴)
function spanCellStyle(align) {
  return (p) => {
    if (p.data && p.data._total) return { ...CENTER }
    return { display: 'flex', alignItems: 'center', justifyContent: align, background: 'var(--ds-fill-gray-white)' }
  }
}

function resChildren(prefix) {
  return ['Sd', 'Hd', 'Asp', 'Fhd', 'Uhd'].map((s) => ({
    field: prefix + s, headerName: s === 'Sd' ? 'SD' : s === 'Hd' ? 'HD' : s.toUpperCase(),
    flex: 0.8, minWidth: 56, cellStyle: CENTER,
  }))
}

// 시안 59-16805: 단편명 / 단편ID / 기간 + [해상도 > (단가·클라우드여부·총구매횟수·총구매금액 · GTV(5) · GTM(5))]
// flex 로 그리드 폭에 맞춰 자동 분배 (좁으면 가로 스크롤)
const columnDefs = computed(() => [
  { field: 'title', headerName: nameLabel.value, flex: 2, minWidth: 140, rowSpan: nameRowSpan, cellStyle: spanCellStyle('flex-start') },
  { field: 'cid', headerName: idLabel.value, flex: 1.4, minWidth: 110, rowSpan: nameRowSpan, cellStyle: spanCellStyle('center') },
  { field: 'period', headerName: '기간', flex: 1, minWidth: 84, cellStyle: CENTER },
  {
    headerName: '해상도',
    children: [
      { field: 'price', headerName: '단가', flex: 1, minWidth: 76, cellStyle: RIGHT },
      { field: 'cloud', headerName: '클라우드 여부', flex: 1.3, minWidth: 108, cellStyle: CENTER },
      { field: 'buyCnt', headerName: '총 구매횟수', flex: 1.1, minWidth: 92, cellStyle: CENTER },
      { field: 'buyAmt', headerName: '총 구매금액', flex: 1.2, minWidth: 100, cellStyle: RIGHT },
      { headerName: 'GTV', children: resChildren('gtv') },
      { headerName: 'GTM', children: resChildren('gtm') },
    ],
  },
])
const defaultColDef = { sortable: false, resizable: true, suppressMovable: true }

// 콘텐츠별 그룹: 모든 행에 콘텐츠명/ID 보유(첫 행만 표시·병합), 그룹 끝 합계 행
function makeGroup(title, cid, months) {
  return months.map((m, i) => ({
    title: i === 0 ? title : '', cid: i === 0 ? cid : '',
    _spanFirst: i === 0, _span: months.length,
    period: m.p, price: '5,000', cloud: 'Y', buyCnt: 7, buyAmt: '104,200',
    gtvSd: 0, gtvHd: 1, gtvAsp: 2, gtvFhd: 0, gtvUhd: 3, gtmSd: 0, gtmHd: 0, gtmAsp: 3, gtmFhd: 0, gtmUhd: 0,
  }))
}
const g1 = makeGroup('아바타 : 물의길', '100010231C', [
  { p: '2025-09' }, { p: '2025-10' }, { p: '2025-11' }, { p: '2025-12' }, { p: '2026-01' },
  { p: '2026-02' }, { p: '2026-03' }, { p: '2026-04' }, { p: '2026-05' }, { p: '2026-06' },
])
const g1total = { title: '', cid: '', period: '합계', price: '', cloud: '', buyCnt: 70, buyAmt: '1,038,300', gtvSd: 0, gtvHd: 10, gtvAsp: 20, gtvFhd: 0, gtvUhd: 30, gtmSd: 0, gtmHd: 0, gtmAsp: 30, gtmFhd: 0, gtmUhd: 0, _total: true }
const g2 = makeGroup('어벤져스3', '203020100', [
  { p: '2025-09' }, { p: '2025-10' }, { p: '2025-11' }, { p: '2025-12' }, { p: '2026-01' }, { p: '2026-02' },
])
const g2total = { title: '', cid: '', period: '합계', price: '', cloud: '', buyCnt: 48, buyAmt: '625,200', gtvSd: 0, gtvHd: 6, gtvAsp: 12, gtvFhd: 0, gtvUhd: 18, gtmSd: 0, gtmHd: 0, gtmAsp: 18, gtmFhd: 0, gtmUhd: 0, _total: true }

const rows = computed(() => [...g1, g1total, ...g2, g2total])

// 헤더 3단(40×3) + 본문(44/행) + 보더
const gridHeight = computed(() => `${120 + rows.value.length * 44 + 2}px`)

const page = ref(1)
const pageSize = ref(10)
const total = 1382
const totalPages = computed(() => Math.ceil(total / pageSize.value))
</script>

<template>
  <div class="page">
    <DsPageHeader title="판매이용통계" :breadcrumb="['홈', '현황/통계', '판매이용통계']" />

    <div class="tabbar">
      <button v-for="t in tabs" :key="t" type="button" class="tab" :class="{ 'tab--active': activeTab === t }" @click="activeTab = t">{{ t }}</button>
    </div>

    <DsFilterGroup class="mb">
      <!-- Row 1: 클라우드 여부 | 화질 -->
      <DsFilterRow>
        <DsFilterField label="클라우드 여부">
          <div class="w-180"><DsSelect v-model="filters.cloud" :options="['전체','Y','N']" /></div>
        </DsFilterField>
        <DsFilterField label="화질">
          <div class="w-180"><DsSelect v-model="filters.quality" :options="['전체','SD','HD','ASP','FHD','UHD']" /></div>
        </DsFilterField>
      </DsFilterRow>
      <!-- Row 2: 검색기간 | 검색어 -->
      <DsFilterRow>
        <DsFilterField label="검색기간">
          <div class="grow"><DsDatePicker v-model="filters.from" /></div>
          <span class="tilde">~</span>
          <div class="grow"><DsDatePicker v-model="filters.to" /></div>
        </DsFilterField>
        <DsFilterField label="검색어">
          <div class="grow"><DsTextField v-model="filters.keyword" :placeholder="searchPlaceholder" trailing-icon="line-search" /></div>
        </DsFilterField>
      </DsFilterRow>
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
        :pagination="false"
        :suppress-row-transform="true"
        :get-row-class="(p) => (p.data && p.data._total ? 'row-total' : '')"
        :height="gridHeight"
        :header-height="40" :group-header-height="40" :row-height="44"
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

.tabbar { display: flex; gap: var(--ds-space-8); margin-bottom: var(--ds-space-16); }
.tab { padding: var(--ds-space-8) var(--ds-space-20); background: var(--ds-fill-gray-white); border: 1px solid var(--ds-border-gray-200); border-radius: var(--ds-radius-circle); font-size: var(--ds-fs-body-14); font-weight: var(--ds-fw-medium); color: var(--ds-text-gray-700); cursor: pointer; font-family: var(--ds-font-family); }
.tab--active { background: var(--ds-fill-gray-700); border-color: var(--ds-fill-gray-700); color: var(--ds-text-gray-white); font-weight: var(--ds-fw-bold); }

.w-180 { width: 180px; flex-shrink: 0; }
.grow { flex: 1 1 160px; min-width: 140px; }
.tilde { color: var(--ds-text-gray-500); }

/* 합계 행 강조(gray-300 배경 + 볼드 + 검정 텍스트)는 AgGridWrapper 공통 스타일에서 처리 */
</style>
