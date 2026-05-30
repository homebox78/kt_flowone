<script setup>
import { ref, computed, h, markRaw, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import AgGridWrapper from '@/components/common/AgGridWrapper.vue'
import {
  DsPageHeader, DsSelect, DsTextField, DsCheckbox, DsDatePicker,
  DsButton, DsPagination, DsStatusBadge,
  DsFilterGroup, DsFilterRow, DsFilterCol, DsFilterField,
  DsTableToolbar,
} from '@/components/ds'
import GridCheckboxCell from '@/components/common/GridCheckboxCell.vue'
import NoticeRegisterModal from '@/components/cp-con/modals/NoticeRegisterModal.vue'

const router = useRouter()
// 목록 행(아이템명) 클릭 → 단편/시리즈 신작 계획 상세
function openDetail(row) {
  const base = row.itemKind === '시리즈' ? 'series' : 'single'
  router.push(`/plan/${base}/${row.no}`)
}

const CheckboxCell = markRaw({
  props: ['params'],
  setup(props) { return () => h(GridCheckboxCell, { params: props.params }) },
})

const filters = ref({
  category: '전체', completedSeries: true,
  supplyCategory: '전체', genre: '전체',
  dateType: '등록일', dateFrom: '', dateTo: '',
  searchScope: '전체', keyword: '',
  approvalStatus: '전체', urgent: false,
})
const opts = {
  category: ['전체', '단편', '시리즈'],
  supplyCategory: ['전체', '영화_외국영화', '영화_국내영화', '지상파_KBS', '지상파_SBS', '지상파_MBC'],
  genre: ['전체', '영화>액션/SF', '영화>드라마', '시리즈>기타'],
  dateType: ['등록일', '수정일'],
  searchScope: ['전체', '아이템명', '수급 카테고리'],
  approvalStatus: ['전체', '요청반려', '승인요청', '승인완료', '임시저장'],
}
function resetFilters() {
  filters.value = {
    category: '전체', completedSeries: false,
    supplyCategory: '전체', genre: '전체',
    dateType: '등록일', dateFrom: '', dateTo: '',
    searchScope: '전체', keyword: '',
    approvalStatus: '전체', urgent: false,
  }
}
function search() { /* TODO(api) */ }

const noticeOpen = ref(false)
function openNotice() { noticeOpen.value = true }

// Grid data — 정렬/필터 테스트 가능하도록 다양한 샘플 데이터
const SAMPLES = [
  { cat: '영화_외국영화', kind: '단편',   name: '아바타 : 물의 길',        genre: '영화>액션/SF' },
  { cat: '영화_외국영화', kind: '단편',   name: '아이언맨',                 genre: '영화>액션/SF' },
  { cat: '지상파_KBS',    kind: '시리즈', name: '굿닥터',                   genre: '영화>드라마' },
  { cat: '영화_국내영화', kind: '단편',   name: '왕과 사는 남자',           genre: '영화>액션/SF' },
  { cat: '지상파_SBS',    kind: '시리즈', name: '런닝맨',                   genre: '시리즈>기타' },
  { cat: '지상파_MBC',    kind: '시리즈', name: '무한도전',                 genre: '시리즈>기타' },
  { cat: '영화_국내영화', kind: '단편',   name: '좀비딸',                   genre: '영화>드라마' },
  { cat: '시리즈_기타',   kind: '시리즈', name: '中國英花',                 genre: '시리즈_기타' },
  { cat: '시리즈_기타',   kind: '시리즈', name: '굿 플레이스',              genre: '시리즈_기타' },
  { cat: '영화_외국영화', kind: '단편',   name: '존윅 2',                   genre: '영화>액션/SF' },
  { cat: '영화_외국영화', kind: '단편',   name: '인터스텔라',               genre: '영화>드라마' },
  { cat: '영화_외국영화', kind: '단편',   name: '오펜하이머',               genre: '영화>드라마' },
  { cat: '영화_외국영화', kind: '단편',   name: '듄: 파트2',                genre: '영화>액션/SF' },
  { cat: '영화_외국영화', kind: '단편',   name: '미션 임파서블',            genre: '영화>액션/SF' },
  { cat: '영화_국내영화', kind: '단편',   name: '범죄도시 4',               genre: '영화>액션/SF' },
  { cat: '영화_국내영화', kind: '단편',   name: '서울의 봄',                genre: '영화>드라마' },
  { cat: '영화_국내영화', kind: '단편',   name: '파묘',                     genre: '영화>드라마' },
  { cat: '영화_국내영화', kind: '단편',   name: '괴물',                     genre: '영화>드라마' },
  { cat: '영화_국내영화', kind: '단편',   name: '기생충',                   genre: '영화>드라마' },
  { cat: '지상파_KBS',    kind: '시리즈', name: '태양의 후예',              genre: '시리즈>기타' },
  { cat: '지상파_KBS',    kind: '시리즈', name: '동백꽃 필 무렵',           genre: '시리즈>기타' },
  { cat: '지상파_SBS',    kind: '시리즈', name: '낭만닥터 김사부',          genre: '시리즈>기타' },
  { cat: '지상파_SBS',    kind: '시리즈', name: '펜트하우스',               genre: '시리즈>기타' },
  { cat: '지상파_MBC',    kind: '시리즈', name: '구르미 그린 달빛',         genre: '시리즈>기타' },
  { cat: '지상파_MBC',    kind: '시리즈', name: 'W',                        genre: '시리즈>기타' },
  { cat: '시리즈_기타',   kind: '시리즈', name: '오징어 게임',              genre: '시리즈>기타' },
  { cat: '시리즈_기타',   kind: '시리즈', name: '더 글로리',                genre: '시리즈>기타' },
  { cat: '시리즈_기타',   kind: '시리즈', name: '무빙',                     genre: '시리즈>기타' },
  { cat: '시리즈_기타',   kind: '시리즈', name: '경성크리처',               genre: '시리즈>기타' },
  { cat: '시리즈_기타',   kind: '시리즈', name: '재벌집 막내아들',          genre: '시리즈>기타' },
]
const STATUSES = ['요청반려', '임시저장', '승인요청', '승인완료']
function pad2(n) { return String(n).padStart(2, '0') }
function makeDateP(seed, baseYear) {
  const m = (seed * 7 + 3) % 12 + 1
  const d = (seed * 13 + 5) % 28 + 1
  const y = baseYear + (seed % 4)
  return `${y}-${pad2(m)}-${pad2(d)}`
}
const allRows = Array.from({ length: 120 }, (_, i) => {
  const s = SAMPLES[i % SAMPLES.length]
  const assets = 1 + (i * 3 + 1) % 5  // 1~5
  const status = STATUSES[(i * 7) % STATUSES.length]
  const urgent = (i % 5 === 0)  // 5개당 1개 긴급
  const isPlus = s.cat === '지상파_KBS' && (i % 3 === 0)
  const inboundDone = (i * 11) % (assets + 1)
  return {
    no: 120 - i,
    supplyCategory: s.cat,
    supplyCategoryPlus: isPlus ? 1 : 0,
    itemKind: s.kind,
    itemName: s.name,
    genre: s.genre,
    regDate: makeDateP(i, 2024),
    modDate: makeDateP(i + 5, 2025),
    status,
    urgent,
    assetTypes: assets,
    inbound: `${inboundDone}/${assets}`,
  }
})

const page = ref(1)
const pageSize = ref(10)
const total = computed(() => allRows.length)
const totalPages = computed(() => Math.ceil(total.value / pageSize.value))
const rowData = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return allRows.slice(start, start + pageSize.value)
})

const StatusCell = markRaw({
  props: ['params'],
  setup(props) {
    return () => h(DsStatusBadge, {
      status: props.params.value,
      urgent: !!props.params.data?.urgent,
    })
  },
})

// 수급 카테고리 + "+N" 시리즈 카운트 배지 (시안 row 8 "지상파_KBS +1")
const SupplyCategoryCell = markRaw({
  props: ['params'],
  setup(props) {
    return () => h('span', { class: 'sc-cell' }, [
      h('span', null, props.params.value),
      props.params.data?.supplyCategoryPlus
        ? h('span', { class: 'sc-cell__plus' }, `+${props.params.data.supplyCategoryPlus}`)
        : null,
    ])
  },
})

// 시안: 가변 텍스트는 좌측, 날짜/번호/상태/유형/입고상태는 센터 정렬
// (가이드: feedback-table-alignment)
const CENTER_CELL = { display: 'flex', alignItems: 'center', justifyContent: 'center' }
// AG Grid 표준 innerHeaderComponent: 기본 정렬/메뉴 UI 유지 + 텍스트만 가운데
const CenterInnerHeader = markRaw(defineComponent({
  props: ['params'],
  setup(props) {
    return () => h('div', {
      style: 'flex:1;text-align:center;'
    }, props.params.displayName)
  },
}))
const CENTER_HEADER = { innerHeaderComponent: CenterInnerHeader }

const columnDefs = [
  {
    headerName: '',
    width: 44, suppressSizeToFit: true,
    pinned: 'left', resizable: false, sortable: false,
    cellRenderer: CheckboxCell,
    headerComponent: CheckboxCell,
  },
  { field: 'no', headerName: '번호', width: 80, suppressSizeToFit: true, cellStyle: CENTER_CELL, headerComponentParams: CENTER_HEADER },
  { field: 'supplyCategory', headerName: '수급 카테고리', width: 160, cellRenderer: SupplyCategoryCell },
  { field: 'itemKind', headerName: '아이템구분', width: 120 },
  { field: 'itemName', headerName: '아이템명', minWidth: 220, flex: 1, cellClass: 'cell-link', onCellClicked: (p) => openDetail(p.data) },
  { field: 'genre', headerName: '장르', width: 140 },
  { field: 'regDate', headerName: '등록일', width: 130, cellStyle: CENTER_CELL, headerComponentParams: CENTER_HEADER },
  { field: 'modDate', headerName: '수정일', width: 130, cellStyle: CENTER_CELL, headerComponentParams: CENTER_HEADER },
  { field: 'status', headerName: '승인상태', width: 130, cellRenderer: StatusCell, cellStyle: CENTER_CELL, headerComponentParams: CENTER_HEADER },
  { field: 'assetTypes', headerName: '어셋 유형수', width: 110, cellStyle: CENTER_CELL, headerComponentParams: CENTER_HEADER },
  { field: 'inbound', headerName: '입고상태', width: 110, cellStyle: CENTER_CELL, headerComponentParams: CENTER_HEADER },
]
const defaultColDef = { sortable: true, resizable: true, suppressMovable: true }
</script>

<template>
  <div class="plan">
    <DsPageHeader title="신작 계획 관리" :breadcrumb="['홈', '콘텐츠 관리', '신작 계획 관리']" />

    <DsFilterGroup class="mb" :default-open="false">
      <!-- Row 1: 구분 + 완결 시리즈  |  수급 카테고리 + 장르 -->
      <DsFilterRow>
        <DsFilterField label="구분">
          <div class="w-180"><DsSelect v-model="filters.category" :options="opts.category" /></div>
          <DsCheckbox v-model="filters.completedSeries" label="완결 시리즈" />
        </DsFilterField>
        <DsFilterCol>
          <DsFilterField label="수급 카테고리">
            <DsSelect v-model="filters.supplyCategory" :options="opts.supplyCategory" />
          </DsFilterField>
          <DsFilterField label="장르">
            <DsSelect v-model="filters.genre" :options="opts.genre" />
          </DsFilterField>
        </DsFilterCol>
      </DsFilterRow>

      <!-- Row 2: 기간 + DateGroup  |  검색 + Select + Input -->
      <DsFilterRow>
        <DsFilterField label="기간">
          <div class="w-178"><DsSelect v-model="filters.dateType" :options="opts.dateType" /></div>
          <div class="grow-date"><DsDatePicker v-model="filters.dateFrom" /></div>
          <span class="tilde">~</span>
          <div class="grow-date"><DsDatePicker v-model="filters.dateTo" /></div>
        </DsFilterField>
        <DsFilterCol>
          <DsFilterField label="검색">
            <DsSelect v-model="filters.searchScope" :options="opts.searchScope" />
          </DsFilterField>
          <DsTextField v-model="filters.keyword" placeholder="검색어 입력" />
        </DsFilterCol>
      </DsFilterRow>

      <!-- Row 3: 승인 상태 + 긴급요청 (좌측 1/2 만) -->
      <DsFilterRow>
        <DsFilterField label="승인 상태">
          <div class="w-180"><DsSelect v-model="filters.approvalStatus" :options="opts.approvalStatus" /></div>
          <DsCheckbox v-model="filters.urgent" label="긴급요청" />
        </DsFilterField>
      </DsFilterRow>

      <template #actions>
        <DsButton type="neutral-outline" only-icon icon="line-rotate" @click="resetFilters" />
        <DsButton type="primary" @click="search">조회</DsButton>
      </template>
    </DsFilterGroup>

    <section class="card body-card">
      <DsTableToolbar
        :total="total" :page-size="pageSize" :page="page" :total-pages="totalPages"
        @update:page-size="(s) => { pageSize = s; if (page > Math.ceil(total / s)) page = 1 }"
        @update:page="page = $event"
      >
        <DsButton type="neutral-outline" @click="openNotice">통지등록</DsButton>
        <span class="divider" />
        <DsButton type="primary-outline" @click="$router.push('/plan/new/series')">시리즈등록</DsButton>
        <DsButton type="primary-outline" @click="$router.push('/plan/new/single')">단편등록</DsButton>
      </DsTableToolbar>

      <AgGridWrapper
        class="grid"
        :column-defs="columnDefs" :row-data="rowData" :default-col-def="defaultColDef"
        :pagination="false"
        :height="`${40 + rowData.length * 44 + 2}px`"
        :row-selection="'multiple'" :suppress-row-click-selection="true"
        :header-height="40" :row-height="44"
      />

      <div class="pager-wrap">
        <DsPagination v-model="page" :total="total" :page-size="pageSize" />
      </div>
    </section>

    <NoticeRegisterModal v-model="noticeOpen" />
  </div>
</template>

<style scoped>
.plan { flex: 1; padding: 0 var(--ds-space-40); width: 100%; min-width: 0; }
.mb { margin-bottom: var(--ds-space-24); }

.card {
  background: var(--ds-fill-gray-white);
  border-radius: var(--ds-radius-6);
  padding: var(--ds-space-20) var(--ds-space-40) var(--ds-space-24);
}
/* 시안 4:1987 Body 카드 — radius 20 / padding pt 40, pb 60, px 40 / gap 12 (toolbar↔table 좁게) */
.body-card {
  border-radius: var(--ds-radius-20);
  padding: var(--ds-space-40);
  display: flex; flex-direction: column;
  gap: var(--ds-space-12);
  box-shadow: 0 2px 8px 0 rgba(95, 102, 160, 0.06);
  min-width: 0;
  overflow: hidden;
}

.w-180 { width: 180px; flex-shrink: 0; }
.w-178 { width: 178px; flex-shrink: 0; }
.w-170 { width: 169.5px; flex-shrink: 0; }
.grow-input { flex: 1 1 0; min-width: 0; }
.grow-date { flex: 1 1 0; min-width: 0; }
.tilde { color: var(--ds-text-gray-700); font-size: var(--ds-fs-body-13); flex-shrink: 0; }

.divider {
  width: 1px; height: 16px;
  background: var(--ds-fill-gray-300);
  margin: 0 var(--ds-space-4);
}

/* 시안: Table 외곽선 없음 - bottom border 만으로 행 구분 */
.grid {
  height: 500px;
}
.grid :deep(.ag-header) { background: var(--ds-fill-blue-50); border-bottom: 1px solid var(--ds-border-gray-200); }
.grid :deep(.ag-header-cell-text) { font-size: var(--ds-fs-body-13); font-weight: var(--ds-fw-medium); color: var(--ds-text-gray-700); }
.grid :deep(.ag-cell) { font-size: var(--ds-fs-body-13); color: var(--ds-text-gray-900); display: flex; align-items: center; }
/* 아이템명 — 상세로 이동하는 링크 셀 */
.grid :deep(.cell-link) { cursor: pointer; color: var(--ds-text-blue-700); font-weight: var(--ds-fw-medium); }
.grid :deep(.cell-link:hover) { text-decoration: underline; }
.grid :deep(.sc-cell) { display: inline-flex; align-items: center; gap: var(--ds-space-4); }
.grid :deep(.sc-cell__plus) {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 22px; height: 18px; padding: 0 var(--ds-space-4);
  background: var(--ds-fill-blue-75); color: var(--ds-text-blue-500);
  border-radius: var(--ds-radius-circle);
  font-size: var(--ds-fs-label-11); font-weight: var(--ds-fw-medium);
}

.pager-wrap { display: flex; justify-content: center; margin-top: 0; padding-top: var(--ds-space-20); }
</style>
