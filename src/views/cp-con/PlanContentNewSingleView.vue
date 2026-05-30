<script setup>
// 시안 Page 2/6 — 단편 신작 계획 등록 / 상세(59-15491) / 수정(59-16107)
// 한 폼을 mode 로 재사용: register | edit | detail (라우트 meta.mode 로 주입)
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  DsPageHeader, DsSelect, DsTextField, DsTextarea, DsDatePicker, DsRadio, DsRadioGroup,
  DsButton, DsIcon, DsTextButton, DsCheckbox, DsBadge,
  DsDetailHeader, DsDetailCell,
} from '@/components/ds'
import AgGridWrapper from '@/components/common/AgGridWrapper.vue'
import RightsContractSearchModal from '@/components/cp-con/modals/RightsContractSearchModal.vue'
import SingleSearchModal from '@/components/cp-con/modals/SingleSearchModal.vue'
import BatchUploadModal from '@/components/cp-con/modals/BatchUploadModal.vue'
import ApprovalRequestModal from '@/components/cp-con/modals/ApprovalRequestModal.vue'
import EmptyResult from '@/components/common/EmptyResult.vue'

const route = useRoute()
const router = useRouter()
const mode = computed(() => route.meta.mode || 'register')
const isDetail = computed(() => mode.value === 'detail')
const pageTitle = computed(() =>
  mode.value === 'detail' ? '단편 신작 계획 상세'
    : mode.value === 'edit' ? '단편 신작 계획 수정'
      : '단편 신작 계획 등록',
)
const crumbLast = computed(() =>
  mode.value === 'detail' ? '신작 계획 상세'
    : mode.value === 'edit' ? '신작 계획 수정'
      : '신작 계획 등록',
)
function goEdit() {
  router.push(`/plan/single/${route.params.id || '1'}/edit`)
}

const rightsOpen = ref(false)
const singleOpen = ref(false)
const batchOpen = ref(false)
const approveOpen = ref(false)

// 상세(detail) 모드 — 반려사유 이력 (시안 59-15491)
const rejectReasons = [
  {
    role: '담당자 (品質)', date: '2026.11.13 14:23:00',
    text: '이런 내용으로 반려되었습니다. 이런 내용으로 반려되었습니다. 이런 내용으로 반려되었습니다. 이런 내용으로 반려되었습니다.',
    reply: { role: 'CP 담당자 (品質)', date: '2026.11.13 14:22:00', text: '변경하여 다시 올립니다. 변경하여 다시 올립니다. 변경하여 다시 올립니다.' },
  },
  {
    role: '담당자 (品質)', date: '2026.11.13 14:23:00',
    text: '이런 내용으로 반려되었습니다. 이런 내용으로 반려되었습니다. 이런 내용으로 반려되었습니다. 이런 내용으로 반려되었습니다.',
    reply: null,
  },
]

function onSingleSelect(row) {
  form.value.title = row.title
  form.value.titleId = row.titleId
}

// 관련 판권 계약 정보 (선택된 1건)
const rightsRow = ref({
  no: 1, code: '21012345', name: 'ABC판권', subName: '부속계약123',
  cp: 'ABC기획_지정', user: '홍길*', signDate: '2026-01-05',
  startDate: '2026-01-08', endDate: '9999-12-31',
})

// ===== 콘텐츠 등록 폼 =====
const form = ref({
  title: '아바타 : 물의 길', titleId: '1212323331',
  supplyCategory: '영화>외국영화',
  genre: '액션/SF', language: '영어',
  country: '미국', year: '2019',
  ratingNotify: 'Y', ratingNo: '',
  broadcast: 'N', videoLaw: 'N',
  ageRating: '15세이상', ratingCountry: '미국',
  releaseDate: '2020-01-01',
  director: '홍길동제임스',
  cast: '아바타, 아바타1, 아바타3',
  url: '',
  synopsis: `<아바타: 물의 길>은 판도라 행성에서 '제이크 설리'와 '네이티리'가 이룬 가족이 겪게 되는 무자비한 위협과 살아남기 위해 떠나야 하는 긴 여정과 전투, 그리고 견뎌내야 할 상처에 대한 이야기를 그렸다. 월드와이드 역대 흥행 순위 1위를 기록한 전편 <아바타>에 이어 제임스 카메론 감독이 13년만에 선보이는 영화로, 샘 워싱턴, 조 샐다나, 시고니 위버, 스티븐 랭, 케이트 윈슬렛이 출연하고 존 랜도가 프로듀싱을 맡았다.`,
})

const opts = {
  category: ['영화>외국영화', '영화>국내영화', '지상파_KBS', '지상파_SBS', '지상파_MBC'],
  addedCategory: ['외국영화', '국내영화', '지상파', '시리즈'],
  genre: ['액션/SF', '드라마', '코미디', '로맨스'],
  language: ['한국어', '영어', '일본어', '중국어'],
  country: ['대한민국', '미국', '일본', '중국'],
  age: ['전체관람가', '12세이상', '15세이상', '청소년관람불가'],
  type: ['선택', '본편', '추가본편', '예고편'],
  detailType: ['선택', '감독편', '확장편', '극장판'],
  quality: ['선택', 'HD', 'UHD'],
  window: ['선택', 'PVOD', 'SPVOD', 'TVOD'],
  trade: ['소장', '대여'],
}

// ===== 어셋 유형 설정 표 =====
const assetRows = ref([
  { name: '자동', type: '선택', detail: '선택', quality: '선택', window: '선택', trade: '소장', supply: '자동지정', sell: '자동지정', start: 'YYYY-MM-DD', end: '9999-99-99', posterName: '입력.zip', posterFile: '', subName: '입력.zip', subFile: '', videoName: '영상.mp4' },
  { name: '본편_아바타', type: '본편', detail: '감독편', quality: 'HD', window: 'PVOD', trade: '소장', supply: '0', sell: '0', start: '2025-05-02', end: '2025-05-02', posterName: '입력.zip', posterFile: '', subName: '입력.zip', subFile: '', videoName: '영상.mp4' },
  { name: '', type: '', detail: '', quality: 'UHD', window: 'PVOD', trade: '소장', supply: '0', sell: '0', start: '2025-05-02', end: '2025-05-02', posterName: '입력.zip', posterFile: '', subName: '입력.zip', subFile: '', videoName: '영상.mp4' },
])

const assetPresets = ['본편+자막+HD+SPVOD', '본편+자막+HD+SPVOD', '본편+자막+HD+SPVOD', '본편+자막+HD+SPVOD', '본편+자막+HD+SPVOD']

function addAsset() {
  assetRows.value.push({ name: '', type: '선택', detail: '선택', quality: '선택', window: '선택', trade: '소장', supply: '', sell: '', start: '', end: '', file: '' })
}
function resetAssets() {
  assetRows.value = [
    { name: '자동', type: '선택', detail: '선택', quality: '선택', window: '선택', trade: '소장', supply: '자동지정', sell: '자동지정', start: 'YYYY-MM-DD', end: '9999-99-99', file: '입력.zip' },
  ]
}

// ===== 추가된 콘텐츠 표 (시안 4:2811 — 시리즈와 동일 패턴, 시즌 sub-row 없음) =====
const addedContents = ref([
  {
    id: 1, selected: false, title: '(자막) 아바타:물의길', supplyCategory: '외국영화',
    genre: '액션/SF', language: '영어', country: '미국', year: '2019',
    ratingNotify: 'Y', broadcast: 'Y', videoLaw: 'Y', videoLawBase: '신규', ratingNo: '12345',
    ageRating: '15세이상', refCountry: '대한민국', director: '홍길동제임스',
    episodes: [
      { title: '(자막) 아바타:물의길', type: '본편', detail: '자막/더빙', quality: 'HD', window: 'SPVOD', priceOpt: '소장(100일)', supply: '18,000원', sell: '8,000원', start: '9999-99-99', end: '9999-99-99', subFile: '이미지.zip', subUpload: '가로s…', video: '영상.mp4' },
      { title: '', type: '', detail: '', quality: 'UHD', window: 'SPVOD', priceOpt: '소장', supply: '18,000원', sell: '8,000원', start: '9999-99-99', end: '9999-99-99', subFile: '이미지.zip', subUpload: '', video: '영상.mp4' },
      { title: '(자막) 아바타:물의길', type: '추가본편', detail: '감독판', quality: 'UHD', window: 'SPVOD', priceOpt: '소장', supply: '18,000원', sell: '8,000원', start: '9999-99-99', end: '9999-99-99', subFile: '이미지.zip', subUpload: '', video: '영상.mp4' },
    ],
  },
  {
    id: 2, selected: false, title: '어벤져스', supplyCategory: '외국영화',
    genre: '액션/SF', language: '영어', country: '미국', year: '2019',
    ratingNotify: 'N', broadcast: '-', videoLaw: '-', videoLawBase: '-', ratingNo: '-',
    ageRating: '15세이상', refCountry: '대한민국', director: '홍길동',
    episodes: [],
  },
])

function deleteSelected() {
  addedContents.value = addedContents.value.filter((r) => !r.selected)
}
const allSelected = computed({
  get: () => addedContents.value.length > 0 && addedContents.value.every((r) => r.selected),
  set: (v) => addedContents.value.forEach((r) => (r.selected = v)),
})

function onRightsSelect(row) {
  rightsRow.value = { ...rightsRow.value, ...row }
}

// 관련 판권 계약 정보 — AgGrid 컬럼/데이터
const CENTER_CELL = { display: 'flex', alignItems: 'center', justifyContent: 'center' }
const rightsColumnDefs = [
  { field: 'no', headerName: '번호', width: 60, suppressSizeToFit: true, cellStyle: CENTER_CELL },
  { field: 'code', headerName: '판권계약번호', width: 140, cellStyle: CENTER_CELL },
  { field: 'name', headerName: '판권계약명', width: 200 },
  { field: 'subName', headerName: '부속판권계약명', width: 180 },
  { field: 'cp', headerName: 'CP명', width: 160 },
  { field: 'user', headerName: '대표사용자', width: 120, cellStyle: CENTER_CELL },
  { field: 'signDate', headerName: '판권계약체결일', width: 140, cellStyle: CENTER_CELL },
  { field: 'startDate', headerName: '판권계약시작일', width: 140, cellStyle: CENTER_CELL },
  { field: 'endDate', headerName: '판권계약종료일', width: 140, cellStyle: CENTER_CELL },
]
const rightsRowData = computed(() => [rightsRow.value])
const rightsDefaultColDef = { sortable: false, resizable: true, suppressMovable: true }
</script>

<template>
  <div class="page">
    <DsPageHeader :title="pageTitle" :breadcrumb="['홈', '콘텐츠 관리', crumbLast]" />

    <section class="card" :class="{ 'is-readonly': isDetail }">
      <!-- 관련 판권 계약 정보 -->
      <div class="sec-group">
      <header class="sec-head">
        <h3 class="sec-title">관련 판권 계약 정보</h3>
        <DsButton type="neutral-outline" size="medium" icon-right="line-search" class="btn-rights" @click="rightsOpen = true">판권계약검색</DsButton>
      </header>
      <AgGridWrapper
        :column-defs="rightsColumnDefs"
        :row-data="rightsRowData"
        :default-col-def="rightsDefaultColDef"
        :pagination="false"
        :height="`${40 + rightsRowData.length * 44 + 2}px`"
        :header-height="40" :row-height="44"
        @grid-ready="(p) => p.api.sizeColumnsToFit()"
        @first-data-rendered="(p) => p.api.sizeColumnsToFit()"
      />
      </div>

      <!-- 콘텐츠 등록 -->
      <div class="sec-group">
      <header class="sec-head">
        <h3 class="sec-title">콘텐츠 등록</h3>
        <DsButton type="neutral-outline" size="medium" icon="line-download" class="btn-tpl">일괄등록 양식다운로드</DsButton>
      </header>

      <!-- Figma 4:2415 — Detail Header(blue-50, 160px) + Detail Cell(white) 폼 -->
      <div class="detail-form">
        <div class="df-row">
          <DsDetailHeader text="단편명" essential />
          <DsDetailCell>
            <div class="cell-stack">
              <DsTextField :model-value="form.title" placeholder="단편명을 입력하세요" readonly trailing-icon="line-search" @click="singleOpen = true" />
              <p class="helper">단편 ID {{ form.titleId }} | 단편명 조회해서 선택했습니다.</p>
            </div>
          </DsDetailCell>
          <DsDetailHeader text="수급 카테고리" essential />
          <DsDetailCell><DsSelect v-model="form.supplyCategory" :options="opts.category" /></DsDetailCell>
        </div>
        <div class="df-row">
          <DsDetailHeader text="장르" essential />
          <DsDetailCell><DsSelect v-model="form.genre" :options="opts.genre" /></DsDetailCell>
          <DsDetailHeader text="제작언어" essential />
          <DsDetailCell><DsSelect v-model="form.language" :options="opts.language" /></DsDetailCell>
        </div>
        <div class="df-row">
          <DsDetailHeader text="제작국가" essential />
          <DsDetailCell><DsSelect v-model="form.country" :options="opts.country" /></DsDetailCell>
          <DsDetailHeader text="제작년도" />
          <DsDetailCell><DsTextField v-model="form.year" placeholder="YYYY" /></DsDetailCell>
        </div>
        <div class="df-row">
          <DsDetailHeader text="등급고지여부" essential />
          <DsDetailCell><DsRadioGroup v-model="form.ratingNotify" :options="['Y','N']" name="ratingNotify" /></DsDetailCell>
          <DsDetailHeader text="등급분류번호" essential />
          <DsDetailCell><DsTextField v-model="form.ratingNo" placeholder="입력" /></DsDetailCell>
        </div>
        <div class="df-row">
          <DsDetailHeader text="방송법" essential />
          <DsDetailCell><DsRadioGroup v-model="form.broadcast" :options="['Y','N']" name="broadcast" /></DsDetailCell>
          <DsDetailHeader text="영비법" essential />
          <DsDetailCell><DsRadioGroup v-model="form.videoLaw" :options="['Y','N']" name="videoLaw" /></DsDetailCell>
        </div>
        <div class="df-row">
          <DsDetailHeader text="시청등급" essential />
          <DsDetailCell>
            <div class="cell-split">
              <DsSelect v-model="form.ageRating" :options="opts.age" />
              <DsSelect v-model="form.ratingCountry" :options="opts.country" />
            </div>
          </DsDetailCell>
          <DsDetailHeader text="개봉일자" />
          <DsDetailCell><DsDatePicker v-model="form.releaseDate" /></DsDetailCell>
        </div>
        <div class="df-row">
          <DsDetailHeader text="감독" />
          <DsDetailCell><DsTextField v-model="form.director" placeholder="홍길동제임스" /></DsDetailCell>
          <DsDetailHeader text="출연진" />
          <DsDetailCell><DsTextField v-model="form.cast" placeholder="입력" /></DsDetailCell>
        </div>
        <div class="df-row df-row--full">
          <DsDetailHeader text="참조 URL" />
          <DsDetailCell><DsTextField v-model="form.url" placeholder="입력" /></DsDetailCell>
        </div>
        <div class="df-row df-row--full">
          <DsDetailHeader text="시놉시스" />
          <DsDetailCell><DsTextarea v-model="form.synopsis" :rows="5" :maxlength="1000" show-counter placeholder="입력" /></DsDetailCell>
        </div>

        <!-- 어셋 유형 설정 — Detail Header + Detail Cell (full-width row) -->
        <div class="df-row df-row--full df-row--asset">
          <DsDetailHeader text="어셋 유형 설정" essential />
          <DsDetailCell>
            <div class="asset-wrap">
              <div class="asset-table-wrap">
                <div class="asset-table">
            <div class="at-head at-head--grouped">
              <span class="c w-160">유형명</span>
              <span class="c w-120 req">유형</span>
              <span class="c w-120 req">세부유형</span>
              <span class="c w-100 req">화질구분</span>
              <span class="c w-110 req">윈도우구분</span>
              <span class="c w-120">거래옵션</span>
              <span class="c w-120 req">공급가격</span>
              <span class="c w-120 req">판매가격</span>
              <span class="c w-145 req">편성시작일</span>
              <span class="c w-145 req">편성종료일</span>
              <span class="c-group w-239">
                <div class="c-group__top req">포스터</div>
                <div class="c-group__bottom">
                  <span class="c w-120 req">파일명</span>
                  <span class="c w-119 req">파일</span>
                </div>
              </span>
              <span class="c-group w-239">
                <div class="c-group__top">자막</div>
                <div class="c-group__bottom">
                  <span class="c w-120">파일명</span>
                  <span class="c w-119">파일</span>
                </div>
              </span>
              <span class="c-group w-120">
                <div class="c-group__top req">영상</div>
                <div class="c-group__bottom">
                  <span class="c w-120 req">파일명</span>
                </div>
              </span>
              <span class="c w-88"></span>
            </div>
            <div v-for="(r, i) in assetRows" :key="i" class="at-row">
              <span class="c w-160"><DsTextField v-model="r.name" placeholder="-" size="small" :readonly="!!r.name" /></span>
              <span class="c w-120"><DsSelect v-model="r.type" :options="opts.type" size="small" /></span>
              <span class="c w-120"><DsSelect v-model="r.detail" :options="opts.detailType" size="small" /></span>
              <span class="c w-100"><DsSelect v-model="r.quality" :options="opts.quality" size="small" /></span>
              <span class="c w-110"><DsSelect v-model="r.window" :options="opts.window" size="small" /></span>
              <span class="c w-120 cell-text">{{ r.trade }}</span>
              <span class="c w-120 cell-num"><DsTextField v-model="r.supply" size="small" readonly /></span>
              <span class="c w-120 cell-num"><DsTextField v-model="r.sell" size="small" readonly /></span>
              <span class="c w-145"><DsDatePicker v-model="r.start" size="small" /></span>
              <span class="c w-145"><DsDatePicker v-model="r.end" size="small" /></span>
              <span class="c w-120"><DsTextField v-model="r.posterName" size="small" placeholder="입력.zip" /></span>
              <span class="c w-119">
                <span v-if="r.posterFile" class="file-chip">
                  <svg class="file-chip__clip" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M8.0221 0.89C9.28 -0.3 11.3 -0.3 12.55 0.89C13.83 2.1 13.83 4.07 12.55 5.27L6.13 11.35C5.38 12.06 4.18 12.06 3.43 11.35C2.67 10.62 2.67 9.43 3.43 8.7L9.07 3.37C9.32 3.13 9.72 3.14 9.95 3.4C10.19 3.65 10.18 4.04 9.93 4.28L4.29 9.61C4.05 9.85 4.05 10.21 4.29 10.44C4.56 10.69 5 10.69 5.27 10.44L11.69 4.36C12.45 3.65 12.45 2.51 11.69 1.8C10.92 1.07 9.65 1.07 8.88 1.8L2.19 8.12C0.93 9.32 0.93 11.23 2.19 12.43C3.47 13.64 5.56 13.64 6.84 12.43L13.53 6.1C13.78 5.86 14.17 5.87 14.41 6.12C14.65 6.37 14.64 6.77 14.39 7.01L7.7 13.33C5.94 15 3.1 15 1.34 13.33C-0.45 11.65 -0.45 8.9 1.34 7.22L8.0221 0.89Z" fill="#212633"/></svg>
                  <span class="file-chip__name">{{ r.posterFile }}</span>
                  <button type="button" class="file-chip__x"><DsIcon name="line-close" :size="10" /></button>
                </span>
                <DsButton v-else type="primary-outline" size="small">업로드</DsButton>
              </span>
              <span class="c w-120"><DsTextField v-model="r.subName" size="small" placeholder="입력.zip" /></span>
              <span class="c w-119">
                <span v-if="r.subFile" class="file-chip">
                  <svg class="file-chip__clip" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M8.0221 0.89C9.28 -0.3 11.3 -0.3 12.55 0.89C13.83 2.1 13.83 4.07 12.55 5.27L6.13 11.35C5.38 12.06 4.18 12.06 3.43 11.35C2.67 10.62 2.67 9.43 3.43 8.7L9.07 3.37C9.32 3.13 9.72 3.14 9.95 3.4C10.19 3.65 10.18 4.04 9.93 4.28L4.29 9.61C4.05 9.85 4.05 10.21 4.29 10.44C4.56 10.69 5 10.69 5.27 10.44L11.69 4.36C12.45 3.65 12.45 2.51 11.69 1.8C10.92 1.07 9.65 1.07 8.88 1.8L2.19 8.12C0.93 9.32 0.93 11.23 2.19 12.43C3.47 13.64 5.56 13.64 6.84 12.43L13.53 6.1C13.78 5.86 14.17 5.87 14.41 6.12C14.65 6.37 14.64 6.77 14.39 7.01L7.7 13.33C5.94 15 3.1 15 1.34 13.33C-0.45 11.65 -0.45 8.9 1.34 7.22L8.0221 0.89Z" fill="#212633"/></svg>
                  <span class="file-chip__name">{{ r.subFile }}</span>
                  <button type="button" class="file-chip__x"><DsIcon name="line-close" :size="10" /></button>
                </span>
                <DsButton v-else type="primary-outline" size="small">업로드</DsButton>
              </span>
              <span class="c w-120"><DsTextField v-model="r.videoName" size="small" placeholder="영상.mp4" /></span>
              <span class="c w-88 ep-actions">
                <button type="button" class="ep-btn ep-btn--add" aria-label="추가">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 2v10M2 7h10" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>
                </button>
                <button type="button" class="ep-btn ep-btn--del" aria-label="삭제">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 7h10" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>
                </button>
              </span>
                </div>
              </div>
              </div>
              <div class="asset-presets">
                <button type="button" class="asset-chip asset-chip--add" @click="addAsset">
                  <span>어셋 유형 추가</span> <svg class="chip-plus" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M5.625 0C5.97018 0 6.25 0.279822 6.25 0.625V5H10.625C10.9702 5 11.25 5.27982 11.25 5.625C11.25 5.97018 10.9702 6.25 10.625 6.25H6.25V10.625C6.25 10.9702 5.97018 11.25 5.625 11.25C5.27982 11.25 5 10.9702 5 10.625V6.25H0.625C0.279822 6.25 0 5.97018 0 5.625C0 5.27982 0.279822 5 0.625 5H5V0.625C5 0.279822 5.27982 0 5.625 0Z" fill="#5BA0EF"/></svg>
                </button>
                <button v-for="(p, i) in assetPresets" :key="i" type="button" class="asset-chip">
                  <span>{{ p }}</span> <svg class="chip-plus" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M5.625 0C5.97018 0 6.25 0.279822 6.25 0.625V5H10.625C10.9702 5 11.25 5.27982 11.25 5.625C11.25 5.97018 10.9702 6.25 10.625 6.25H6.25V10.625C6.25 10.9702 5.97018 11.25 5.625 11.25C5.27982 11.25 5 10.9702 5 10.625V6.25H0.625C0.279822 6.25 0 5.97018 0 5.625C0 5.27982 0.279822 5 0.625 5H5V0.625C5 0.279822 5.27982 0 5.625 0Z" fill="#5BA0EF"/></svg>
                </button>
              </div>
            </div>
          </DsDetailCell>
        </div>
      </div>

      <div class="asset-actions">
        <DsButton type="neutral-outline" size="large" @click="resetAssets">초기화</DsButton>
        <DsButton type="primary" size="large">추가</DsButton>
      </div>
      </div>

      <!-- 추가된 콘텐츠 -->
      <div class="sec-group">
      <header class="sec-head">
        <h3 class="sec-title">추가된 콘텐츠 <span class="muted">총 <strong>{{ addedContents.length }}</strong>건</span></h3>
        <div class="actions">
          <DsButton type="neutral-outline" @click="batchOpen = true">일괄 업로드</DsButton>
          <DsButton type="primary-outline" @click="deleteSelected">선택삭제</DsButton>
        </div>
      </header>

      <div class="added-table-wrap">
        <div class="added-table">
          <!-- 메인 헤더: 시안 4:2811 — 16 컬럼 -->
          <div class="add-head">
            <span class="c w-44">번호</span>
            <span class="c w-44"><DsCheckbox v-model="allSelected" /></span>
            <span class="c w-200 req">단편명</span>
            <span class="c w-128 req">수급 카테고리</span>
            <span class="c w-128 req">장르</span>
            <span class="c w-100 req">제작언어</span>
            <span class="c w-100 req">제작국가</span>
            <span class="c w-100">제작년도</span>
            <span class="c w-106 req">등급고지여부</span>
            <span class="c w-100 req">방송법</span>
            <span class="c w-100 req">영비법</span>
            <span class="c w-96 req">영비법기준</span>
            <span class="c w-100">등급분류번호</span>
            <span class="c w-110 req">시청등급</span>
            <span class="c w-110 req">기준 국가</span>
            <span class="c w-100">감독</span>
          </div>
          <template v-for="row in addedContents" :key="row.id">
            <!-- 메인 행 -->
            <div class="add-row">
              <span class="c w-44">{{ row.id }}</span>
              <span class="c w-44"><DsCheckbox v-model="row.selected" /></span>
              <span class="c w-200"><DsTextField v-model="row.title" size="small" trailing-icon="line-search" /></span>
              <span class="c w-128"><DsSelect v-model="row.supplyCategory" :options="opts.addedCategory" size="small" /></span>
              <span class="c w-128"><DsSelect v-model="row.genre" :options="opts.genre" size="small" /></span>
              <span class="c w-100"><DsSelect v-model="row.language" :options="opts.language" size="small" /></span>
              <span class="c w-100"><DsSelect v-model="row.country" :options="opts.country" size="small" /></span>
              <span class="c w-100">{{ row.year }}</span>
              <span class="c w-106"><DsSelect v-model="row.ratingNotify" :options="['Y','N']" size="small" /></span>
              <span class="c w-100"><DsSelect v-if="row.broadcast !== '-'" v-model="row.broadcast" :options="['Y','N']" size="small" /><template v-else>-</template></span>
              <span class="c w-100"><DsSelect v-if="row.videoLaw !== '-'" v-model="row.videoLaw" :options="['Y','N']" size="small" /><template v-else>-</template></span>
              <span class="c w-96"><DsSelect v-if="row.videoLawBase !== '-'" v-model="row.videoLawBase" :options="['신규','기존']" size="small" /><template v-else>-</template></span>
              <span class="c w-100">{{ row.ratingNo }}</span>
              <span class="c w-110"><DsSelect v-model="row.ageRating" :options="opts.age" size="small" /></span>
              <span class="c w-110"><DsSelect v-model="row.refCountry" :options="opts.country" size="small" /></span>
              <span class="c w-100"><DsTextField v-model="row.director" size="small" /></span>
            </div>

            <!-- 에피소드 헤더 + 행 (시즌 sub-row 없음 — 단편) -->
            <template v-if="row.episodes && row.episodes.length">
              <div class="ep-head ep-head--grouped">
                <span class="c w-40"></span>
                <span class="c w-44"><DsCheckbox :model-value="false" /></span>
                <span class="c w-220 req">유형명</span>
                <span class="c w-110 req">유형</span>
                <span class="c w-120 req">세부유형</span>
                <span class="c w-100 req">화질구분</span>
                <span class="c w-120 req">윈도우구분</span>
                <span class="c w-140">가격옵션</span>
                <span class="c w-100 req">공급가격</span>
                <span class="c w-100 req">판매가격</span>
                <span class="c w-130 req">편성시작일</span>
                <span class="c w-130 req">편성종료일</span>
                <span class="c-group w-220">
                  <div class="c-group__top">자막</div>
                  <div class="c-group__bottom">
                    <span class="c w-110 req">파일명</span>
                    <span class="c w-110 req">파일</span>
                  </div>
                </span>
                <span class="c-group w-110">
                  <div class="c-group__top">영상</div>
                  <div class="c-group__bottom">
                    <span class="c w-110 req">파일명</span>
                  </div>
                </span>
                <span class="c w-88">추가/삭제</span>
              </div>
              <div v-for="(ep, ei) in row.episodes" :key="ei" class="ep-row">
                <span class="c w-40"></span>
                <span class="c w-44"><DsCheckbox :model-value="false" /></span>
                <span class="c w-220"><DsTextField :model-value="ep.title" size="small" /></span>
                <span class="c w-110"><DsSelect :model-value="ep.type" :options="['본편','추가본편']" size="small" /></span>
                <span class="c w-120"><DsSelect :model-value="ep.detail" :options="['자막/더빙','감독판']" size="small" /></span>
                <span class="c w-100"><DsSelect :model-value="ep.quality" :options="['HD','UHD']" size="small" /></span>
                <span class="c w-120"><DsSelect :model-value="ep.window" :options="['SPVOD','PVOD']" size="small" /></span>
                <span class="c w-140"><DsSelect :model-value="ep.priceOpt" :options="['소장','소장(100일)']" size="small" /></span>
                <span class="c w-100 cell-num"><DsTextField :model-value="ep.supply" size="small" /></span>
                <span class="c w-100 cell-num"><DsTextField :model-value="ep.sell" size="small" /></span>
                <span class="c w-130">{{ ep.start }}</span>
                <span class="c w-130">{{ ep.end }}</span>
                <span class="c w-110">{{ ep.subFile }}</span>
                <span class="c w-110">
                  <span v-if="ep.subUpload" class="file-chip">
                    <svg class="file-chip__clip" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M8.0221 0.89C9.28 -0.3 11.3 -0.3 12.55 0.89C13.83 2.1 13.83 4.07 12.55 5.27L6.13 11.35C5.38 12.06 4.18 12.06 3.43 11.35C2.67 10.62 2.67 9.43 3.43 8.7L9.07 3.37C9.32 3.13 9.72 3.14 9.95 3.4C10.19 3.65 10.18 4.04 9.93 4.28L4.29 9.61C4.05 9.85 4.05 10.21 4.29 10.44C4.56 10.69 5 10.69 5.27 10.44L11.69 4.36C12.45 3.65 12.45 2.51 11.69 1.8C10.92 1.07 9.65 1.07 8.88 1.8L2.19 8.12C0.93 9.32 0.93 11.23 2.19 12.43C3.47 13.64 5.56 13.64 6.84 12.43L13.53 6.1C13.78 5.86 14.17 5.87 14.41 6.12C14.65 6.37 14.64 6.77 14.39 7.01L7.7 13.33C5.94 15 3.1 15 1.34 13.33C-0.45 11.65 -0.45 8.9 1.34 7.22L8.0221 0.89Z" fill="#212633"/></svg>
                    <span class="file-chip__name">{{ ep.subUpload }}</span>
                    <button type="button" class="file-chip__x"><DsIcon name="line-close" :size="10" /></button>
                  </span>
                  <DsButton v-else type="primary-outline" size="small">업로드</DsButton>
                </span>
                <span class="c w-110">{{ ep.video }}</span>
                <span class="c w-88 ep-actions">
                  <button type="button" class="ep-btn ep-btn--add" aria-label="추가">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 2v10M2 7h10" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>
                  </button>
                  <button type="button" class="ep-btn ep-btn--del" aria-label="삭제">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 7h10" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>
                  </button>
                </span>
              </div>
            </template>
          </template>
          <EmptyResult v-if="!addedContents.length" />
        </div>
      </div>
      </div>

      <!-- 반려사유 (상세 모드) -->
      <div v-if="isDetail" class="sec-group reject-group">
        <h3 class="sec-title">반려사유</h3>
        <div class="reject-list">
          <div v-for="(r, i) in rejectReasons" :key="i" class="reject-item">
            <div class="reject-row">
              <span class="reject-badge">반려</span>
              <span class="reject-who">{{ r.role }}</span>
              <span class="reject-date">{{ r.date }}</span>
            </div>
            <p class="reject-text">{{ r.text }}</p>
            <div v-if="r.reply" class="reject-reply">
              <span class="reject-badge reject-badge--reply">CP 답변</span>
              <div class="reject-reply__body">
                <div class="reject-row">
                  <span class="reject-who">{{ r.reply.role }}</span>
                  <span class="reject-date">{{ r.reply.date }}</span>
                </div>
                <p class="reject-text">{{ r.reply.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer class="footer-bar">
        <DsButton type="neutral-outline" size="xl" @click="$router.push('/plan')">목록</DsButton>
        <div class="footer-right">
          <template v-if="isDetail">
            <DsButton type="primary" size="xl" @click="goEdit">수정</DsButton>
          </template>
          <template v-else>
            <DsButton type="secondary" size="xl">임시저장</DsButton>
            <DsButton type="primary" size="xl" @click="approveOpen = true">승인요청</DsButton>
          </template>
        </div>
      </footer>
    </section>

    <RightsContractSearchModal v-model="rightsOpen" @select="onRightsSelect" />
    <SingleSearchModal v-model="singleOpen" @select="onSingleSelect" />
    <BatchUploadModal v-model="batchOpen" />
    <ApprovalRequestModal v-model="approveOpen" />
  </div>
</template>

<style scoped>
/* 하단 padding 없음 — 푸터 top padding(40)이 콘텐츠↔푸터 간격 담당 */
.page { flex: 1; min-width: 0; padding: 0 var(--ds-space-40); width: 100%; }
.page .card { min-width: 0; }

.card {
  background: var(--ds-fill-gray-white);
  border-radius: var(--ds-radius-20);
  padding: var(--ds-space-40);
  box-shadow: 0 2px 8px 0 rgba(95, 102, 160, 0.06);
}

/* 시안: 관련판권·콘텐츠등록·추가된콘텐츠가 한 카드 안에서 그룹으로 분리 */
.sec-group { margin-bottom: var(--ds-space-40); }

.sec-head {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: var(--ds-space-16);
}
.sec-title {
  margin: 0;
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-headline-16);
  font-weight: var(--ds-fw-bold);
  color: var(--ds-text-gray-black);
}
.muted { font-weight: var(--ds-fw-regular); color: var(--ds-text-gray-700); font-size: var(--ds-fs-body-13); margin-left: var(--ds-space-8); }
.muted strong { color: var(--ds-text-blue-700); font-weight: var(--ds-fw-bold); }
.actions { display: flex; gap: var(--ds-space-8); }

.c { display: flex; align-items: center; justify-content: center; }

/* Section 2 — Detail Header(160px blue-50) + Detail Cell(white) 4열 폼 */
.detail-form {
  display: grid;
  grid-template-columns: 160px 1fr 160px 1fr;
  /* 첫 행 상단 보더는 내부 행 구분선(gray-200)보다 진하게 (시안) */
  border-top: 1px solid var(--ds-border-gray-400);
  margin-bottom: var(--ds-space-24);
}
.df-row { display: contents; }
.df-row--full > :nth-child(2) { grid-column: 2 / 5; }
.cell-stack { display: flex; flex-direction: column; gap: var(--ds-space-4); width: 100%; }
.cell-split { display: grid; grid-template-columns: 1fr 1fr; gap: var(--ds-space-8); width: 100%; }
.helper { margin: 0; font-size: var(--ds-fs-body-12); color: var(--ds-text-gray-700); }
.detail-form :deep(.ds-tf), .detail-form :deep(.ds-ta), .detail-form :deep(.ds-select) { width: 100%; }
.lb {
  font-size: var(--ds-fs-body-13); font-weight: var(--ds-fw-medium); color: var(--ds-text-gray-black);
  display: flex; align-items: center; min-height: 32px;
}

/* 시안: 우측 검색 아이콘 14px / 좌측 다운로드 아이콘 9px */
.btn-rights :deep(.ds-icon) { width: 17px !important; height: 17px !important; }
.btn-tpl :deep(.ds-icon) { width: 12px !important; height: 12px !important; }
.lb--top { align-self: flex-start; padding-top: 8px; }
.lb.req::after { content: ' *'; color: var(--ds-text-red-300); }

/* Asset block */
/* 어셋 유형 설정 cell — Detail Cell 안에서 가로 스크롤 동작 */
.df-row--asset :deep(.ds-dc) { padding: var(--ds-space-12) var(--ds-space-10); min-width: 0; align-items: stretch; flex-direction: column; }
.asset-wrap { display: flex; flex-direction: column; min-width: 0; width: 100%; }
/* overflow-y: hidden — 가로 스크롤바가 높이를 먹어 세로 스크롤이 생기는 현상 방지 */
.asset-table-wrap { overflow-x: auto; overflow-y: hidden; border-top: 1px solid var(--ds-border-gray-200); border-bottom: 1px solid var(--ds-border-gray-200); }
.asset-table { min-width: 1962px; display: flex; flex-direction: column; }
/* Header-Group (포스터/자막/영상) — 2단 헤더 */
.at-head--grouped { min-height: 80px; padding: 0; align-items: stretch; }
.at-head--grouped > .c { padding: var(--ds-space-4); align-items: center; justify-content: center; align-self: stretch; }
.at-head .c-group { display: flex; flex-direction: column; align-self: stretch; flex-shrink: 0; border-right: 1px solid var(--ds-border-gray-200); }
.at-head .c-group:last-child { border-right: 0; }
.at-head .c-group__top { flex: 1; display: flex; align-items: center; justify-content: center; font-size: var(--ds-fs-body-12); font-weight: var(--ds-fw-medium); color: var(--ds-text-gray-700); border-bottom: 1px solid var(--ds-border-gray-200); padding: var(--ds-space-4); }
.at-head .c-group__top.req::after { content: ' *'; color: var(--ds-text-red-300); }
.at-head .c-group__bottom { display: flex; flex: 1; }
.at-head .c-group__bottom .c { font-size: var(--ds-fs-body-12); font-weight: var(--ds-fw-medium); color: var(--ds-text-gray-700); padding: var(--ds-space-4); border-right: 1px solid var(--ds-border-gray-200); }
.at-head .c-group__bottom .c:last-child { border-right: 0; }
.at-head .c-group__bottom .c.req::after { content: ' *'; color: var(--ds-text-red-300); }

/* 추가 width 토큰 */
.w-88 { width: 88px; flex-shrink: 0; }
.w-110 { width: 110px; flex-shrink: 0; }
.w-119 { width: 119px; flex-shrink: 0; }
.w-120 { width: 120px; flex-shrink: 0; }
.w-239 { width: 239px; flex-shrink: 0; }

/* +/- 액션 버튼 */
.ep-actions { display: flex; gap: var(--ds-space-6); justify-content: center; align-items: center; }
.ep-btn { width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; border: 0; border-radius: 999px; cursor: pointer; padding: 0; }
.ep-btn--add { background: var(--ds-fill-blue-500); }
.ep-btn--add:hover { background: var(--ds-fill-blue-600); }
.ep-btn--del { background: var(--ds-fill-red-300); }

/* 첨부 파일 칩 */
.file-chip {
  display: inline-flex; align-items: center; gap: var(--ds-space-4);
  height: 28px; padding: 0 var(--ds-space-8);
  background: var(--ds-fill-gray-white);
  border: 1px solid var(--ds-border-gray-300);
  border-radius: var(--ds-radius-4);
  font-size: var(--ds-fs-body-13);
  color: var(--ds-text-gray-black); max-width: 100%;
}
.file-chip__clip { color: var(--ds-text-gray-700); flex-shrink: 0; }
.file-chip__name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; }
.file-chip__x { width: 16px; height: 16px; display: inline-flex; align-items: center; justify-content: center; border: 0; background: var(--ds-fill-gray-300); border-radius: 999px; cursor: pointer; color: var(--ds-text-gray-white); padding: 0; flex-shrink: 0; }
.at-head, .at-row { display: flex; align-items: center; border-bottom: 1px solid var(--ds-border-gray-200); }
.at-head { background: var(--ds-fill-blue-50); }
.at-head .c { font-size: var(--ds-fs-body-12); font-weight: var(--ds-fw-medium); color: var(--ds-text-gray-700); padding: var(--ds-space-8); white-space: nowrap; justify-content: center; }
.at-head .c.req::after { content: ' *'; color: var(--ds-text-red-300); }
/* 세로 라인 (마지막 셀 제외) */
.at-head > .c, .at-row > .c { border-right: 1px solid var(--ds-border-gray-200); }
.at-head > .c:last-child, .at-row > .c:last-child { border-right: 0; }
/* 행 안 인풋/셀렉트 폭 정렬 */
.at-row { align-items: stretch; min-width: 0; }
.at-row > .c { min-width: 0; box-sizing: border-box; }
.at-row :deep(.ds-tf), .at-row :deep(.ds-select), .at-row :deep(.ds-date) { width: 100%; min-width: 0; }
.at-row .c { padding: var(--ds-space-4); }
.at-row .c.small-text { font-size: var(--ds-fs-body-13); color: var(--ds-text-gray-black); padding: var(--ds-space-8); }
/* 금액 셀 — 우측 정렬 */
.at-row .c.cell-num :deep(.v-field__input),
.at-row .c.cell-num :deep(input) { text-align: right; }
.w-50 { width: 50px; }
.w-60 { width: 60px; }
.w-80 { width: 80px; }
.w-90 { width: 90px; }
.w-100 { width: 100px; }
.w-110 { width: 110px; }
.w-120 { width: 120px; }
.w-130 { width: 130px; } .w-145 { width: 145px; }
.w-150 { width: 150px; }
.w-160 { width: 160px; }
.flex { flex: 1; min-width: 100px; }

.asset-presets {
  grid-column: 2;
  display: flex; flex-wrap: wrap; gap: var(--ds-space-8);
  margin-top: var(--ds-space-12);
}
/* 시안 4:3843 — Asset list chip: 흰 bg + light-blue-300 보더 + radius 8 + plus 우측 */
.asset-chip {
  display: inline-flex; align-items: center; gap: var(--ds-space-8);
  padding: var(--ds-space-10) var(--ds-space-10) var(--ds-space-10) var(--ds-space-12);
  background: var(--ds-fill-gray-white);
  border: 1px solid var(--ds-fill-light-blue-300);
  border-radius: var(--ds-radius-8);
  color: var(--ds-text-gray-700);
  font-family: var(--ds-font-family); font-size: var(--ds-fs-body-13); font-weight: var(--ds-fw-medium);
  line-height: 1.5;
  cursor: pointer;
}
.asset-chip:hover { background: var(--ds-fill-light-blue-50); }
.asset-chip :deep(.ds-icon) { color: var(--ds-text-gray-700); }
.asset-chip :deep(.ds-icon svg [fill]) { fill: var(--ds-text-gray-700); }
.asset-chip :deep(.ds-icon svg [stroke]) { stroke: var(--ds-text-gray-700); }

.asset-actions {
  grid-column: 1 / 3;
  display: flex; justify-content: center; gap: var(--ds-space-8);
  margin-top: var(--ds-space-16);
}

/* Added contents */
.added-table-wrap { overflow-x: auto; overflow-y: hidden; border-top: 1px solid var(--ds-border-gray-200); border-bottom: 1px solid var(--ds-border-gray-200); border-radius: 0;}
.added-table { min-width: 2100px; display: flex; flex-direction: column; }
.add-head, .add-row, .ep-head, .ep-row { display: flex; align-items: center; border-bottom: 1px solid var(--ds-border-gray-200); }
.add-head { background: var(--ds-fill-blue-50); }
.add-head .c { font-size: var(--ds-fs-body-12); font-weight: var(--ds-fw-medium); color: var(--ds-text-gray-700); padding: var(--ds-space-8); white-space: nowrap; justify-content: center; }
.add-head .c.req::after { content: ' *'; color: var(--ds-text-red-300); }
/* 세로 라인 — 각 셀 우측 (마지막 제외) */
.add-head > .c, .add-row > .c, .ep-head > .c, .ep-row > .c { border-right: 1px solid var(--ds-border-gray-200); }
.add-head > .c:last-child, .add-row > .c:last-child, .ep-head > .c:last-child, .ep-row > .c:last-child { border-right: 0; }
.add-row .c { padding: var(--ds-space-4); }
.add-row .c.small-text { font-size: var(--ds-fs-body-13); color: var(--ds-text-gray-black); padding: var(--ds-space-8); }
.ep-head { background: var(--ds-fill-blue-75); }
.ep-head .c { font-size: var(--ds-fs-body-12); font-weight: var(--ds-fw-medium); color: var(--ds-text-gray-700); padding: var(--ds-space-6); white-space: nowrap; justify-content: center; }
.ep-head .c.req::after { content: ' *'; color: var(--ds-text-red-300); }
/* Header-Group inside ep-head */
.ep-head--grouped { min-height: 64px; align-items: stretch; }
.ep-head--grouped > .c { padding: var(--ds-space-4); align-items: center; justify-content: center; }
.ep-head .c-group { display: flex; flex-direction: column; align-self: stretch; flex-shrink: 0; border-right: 1px solid var(--ds-border-gray-200); }
.ep-head .c-group:last-child { border-right: 0; }
.ep-head .c-group__top { flex: 1; display: flex; align-items: center; justify-content: center; font-size: var(--ds-fs-body-12); font-weight: var(--ds-fw-medium); color: var(--ds-text-gray-700); border-bottom: 1px solid var(--ds-border-gray-200); padding: var(--ds-space-4); }
.ep-head .c-group__bottom { display: flex; flex: 1; }
.ep-head .c-group__bottom .c { font-size: var(--ds-fs-body-12); font-weight: var(--ds-fw-medium); color: var(--ds-text-gray-700); padding: var(--ds-space-4); border-right: 1px solid var(--ds-border-gray-200); }
.ep-head .c-group__bottom .c:last-child { border-right: 0; }
.ep-head .c-group__bottom .c.req::after { content: ' *'; color: var(--ds-text-red-300); }
.ep-row { background: var(--ds-fill-gray-white); }
.ep-row .c { padding: var(--ds-space-4); font-size: var(--ds-fs-body-13); color: var(--ds-text-gray-black); justify-content: center; }
.ep-row .c.small-text { padding: var(--ds-space-6); }
.ep-row :deep(.ds-tf), .ep-row :deep(.ds-select) { width: 100%; }
.ep-row .c.cell-num :deep(.v-field__input),
.ep-row .c.cell-num :deep(input) { text-align: right; }

/* 추가 width 토큰 */
.w-40 { width: 40px; flex-shrink: 0; }
.w-44 { width: 44px; flex-shrink: 0; }
.w-96 { width: 96px; flex-shrink: 0; }
.w-100 { width: 100px; flex-shrink: 0; }
.w-106 { width: 106px; flex-shrink: 0; }
.w-110 { width: 110px; flex-shrink: 0; }
.w-128 { width: 128px; flex-shrink: 0; }
.w-130 { width: 130px; flex-shrink: 0; }
.w-140 { width: 140px; flex-shrink: 0; }
.w-200 { width: 200px; flex-shrink: 0; }
.w-220 { width: 220px; flex-shrink: 0; }

/* Footer */
.footer-bar {
  display: flex; align-items: center; justify-content: space-between;
}
.footer-right { display: flex; gap: var(--ds-space-8); }

/* ===== 상세(detail) 모드 — 읽기 전용: 입력 평문화 + 편집 액션 숨김 ===== */
.is-readonly :deep(.v-field) {
  border-color: transparent !important; background: transparent !important;
  box-shadow: none !important; pointer-events: none;
  --v-field-padding-start: 0;
}
.is-readonly :deep(.v-field__append-inner) { display: none !important; }
.is-readonly :deep(.ds-field), .is-readonly :deep(.ds-select), .is-readonly :deep(.ds-date) { pointer-events: none; }
.is-readonly .sec-head :deep(button),
.is-readonly .asset-actions,
.is-readonly .asset-presets,
.is-readonly .actions,
.is-readonly .ep-actions,
.is-readonly .ep-btn,
.is-readonly .file-chip__x { display: none !important; }

/* ===== 반려사유 ===== */
.reject-group { margin-bottom: var(--ds-space-40); }
.reject-list { display: flex; flex-direction: column; gap: var(--ds-space-20); margin-top: var(--ds-space-16); }
.reject-item {
  border: 1px solid var(--ds-border-gray-200); border-radius: var(--ds-radius-8);
  padding: var(--ds-space-16) var(--ds-space-20);
}
.reject-row { display: flex; align-items: center; gap: var(--ds-space-8); }
.reject-badge {
  display: inline-flex; align-items: center; height: 22px; padding: 0 var(--ds-space-8);
  background: var(--ds-fill-red-50); color: var(--ds-text-red-300);
  border-radius: var(--ds-radius-4); font-size: var(--ds-fs-label-11); font-weight: var(--ds-fw-bold);
}
.reject-badge--reply { background: var(--ds-fill-blue-75); color: var(--ds-text-blue-500); }
.reject-who { font-size: var(--ds-fs-body-13); font-weight: var(--ds-fw-bold); color: var(--ds-text-gray-black); }
.reject-date { font-size: var(--ds-fs-body-12); color: var(--ds-text-gray-500); }
.reject-text { margin: var(--ds-space-6) 0 0; font-size: var(--ds-fs-body-13); color: var(--ds-text-gray-700); line-height: 1.6; }
.reject-reply { display: flex; gap: var(--ds-space-8); margin-top: var(--ds-space-12); }
.reject-reply__body {
  flex: 1; min-width: 0; background: var(--ds-fill-gray-50);
  border-radius: var(--ds-radius-8); padding: var(--ds-space-12) var(--ds-space-16);
}
</style>
