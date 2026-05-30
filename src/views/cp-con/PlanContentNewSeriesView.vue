<script setup>
// 시안 Page 7/8 — 시리즈 신작 계획 등록 / 상세 / 수정(59-15840)
// 한 폼을 mode 로 재사용: register | edit | detail (라우트 meta.mode 로 주입)
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  DsPageHeader, DsSelect, DsTextField, DsTextarea, DsDatePicker, DsRadioGroup,
  DsButton, DsAddButton, DsIcon, DsTextButton, DsCheckbox, DsFileUpload,
  DsDetailHeader, DsDetailCell, DsSearchButton,
} from '@/components/ds'
import AgGridWrapper from '@/components/common/AgGridWrapper.vue'
import RightsContractSearchModal from '@/components/cp-con/modals/RightsContractSearchModal.vue'
import SeriesSearchModal from '@/components/cp-con/modals/SeriesSearchModal.vue'
import BatchUploadModal from '@/components/cp-con/modals/BatchUploadModal.vue'
import ApprovalRequestModal from '@/components/cp-con/modals/ApprovalRequestModal.vue'
import EmptyResult from '@/components/common/EmptyResult.vue'

const route = useRoute()
const router = useRouter()
const mode = computed(() => route.meta.mode || 'register')
const isDetail = computed(() => mode.value === 'detail')
const pageTitle = computed(() =>
  mode.value === 'detail' ? '시리즈 신작 계획 상세'
    : mode.value === 'edit' ? '시리즈 신작 계획 수정'
      : '시리즈 신작 계획 등록',
)
const crumbLast = computed(() =>
  mode.value === 'detail' ? '신작 계획 상세'
    : mode.value === 'edit' ? '신작 계획 수정'
      : '신작 계획 등록',
)
function goEdit() {
  router.push(`/plan/series/${route.params.id || '1'}/edit`)
}

const rightsOpen = ref(false)
const seriesOpen = ref(false)
const approveOpen = ref(false)
const rejectReasons = [
  {
    role: '담당자 (品質)', date: '2026.11.13 14:23:00',
    text: '이런 내용으로 반려되었습니다. 이런 내용으로 반려되었습니다. 이런 내용으로 반려되었습니다.',
    reply: { role: 'CP 담당자 (品質)', date: '2026.11.13 14:22:00', text: '변경하여 다시 올립니다. 변경하여 다시 올립니다.' },
  },
]

function onSeriesSelect(row) {
  form.value.seriesName = row.seriesName
  form.value.seriesId = row.seriesId
}
const batchOpen = ref(false)

const rightsRow = ref({
  no: 1, code: '21012345', name: 'ABC판권', subName: '부속계약123',
  cp: 'ABC기획_지정', user: '홍길*',
  signDate: '2026-01-05', startDate: '2026-01-08', endDate: '9999-12-31',
})

const form = ref({
  seriesName: '굿닥터', seriesId: '1212323331',
  supplyCategory: '영화_캐치온',
  genre: '시리즈>미드', language: '한국어',
  country: '한국', year: '2019',
  ratingNotify: 'Y', ratingNo: '',
  ageRating: '15세이상', refCountry: '미국',
  director: '홍길동',
  broadcast: 'N', videoLaw: 'N',
})

const opts = {
  category: ['영화_캐치온', '영화_외국영화', '지상파_MBC', '지상파_KBS'],
  genre: ['시리즈>미드', '시리즈>국내', '시리즈>예능'],
  language: ['한국어', '영어'],
  country: ['한국', '미국'],
  age: ['전체관람가', '12세이상', '15세이상', '청소년관람불가'],
  channel: ['MBC', 'KBS', 'SBS'],
  airDay: ['월,화', '수,목', '주말'],
  poster: [],
  episodes: [],
}

const seasons = ref([
  {
    open: true,
    name: '굿닥터 시즌 7', season: '7', partnerMap: 'N',
    channel: 'MBC', airDay: '월,화',
    airDate: '2020-01-01', completed: 'N',
    poster: null,
    cast: '굿닥터1, 굿닥터2, 굿닥터3',
    url: 'http:// Series.co.kr',
    synopsis: '서번트 신드롬을 앓고 있는 젊은 외과 의사가 미국 최고 병원의 외과 병동에 채용되면서 일어나는 일들을 그린 드라마',
    episodeBulk: '선택', totalEpisodes: '',
    freeEpisodes: '',
    schedule: 0,
    assets: [
      { name: '', type: '선택', detail: '선택', quality: '선택', window: '선택', trade: '선택', supply: '자동지정', sell: '자동지정', start: 'YYYY-MM-DD', end: '9999-99-99', posterName: '입력.zip', posterFile: '', subName: '입력.zip', subFile: '', videoName: '영상.mp4' },
      { name: '굿닥터 시즌7 1화', type: '본편', detail: '감독편', quality: 'HD', window: 'PVOD', trade: '소장(100일)', supply: '0', sell: '0', start: '2025-05-02', end: '2025-05-02', posterName: '입력.zip', posterFile: '이미지s…', subName: '입력.zip', subFile: '', videoName: '영상.mp4' },
      { name: '굿닥터 시즌7 2화', type: '본편', detail: '감독편', quality: 'HD', window: 'PVOD', trade: '소장(100일)', supply: '0', sell: '0', start: '2025-05-02', end: '2025-05-02', posterName: '입력.zip', posterFile: '', subName: '입력.zip', subFile: '', videoName: '영상.mp4' },
    ],
  },
])

function resetSeasons() {
  // 초기화 — 첫 시즌만 남기고 모두 삭제
  seasons.value = seasons.value.slice(0, 1)
}

function addSeason() {
  seasons.value.push({
    open: true, name: '', season: '', partnerMap: 'N',
    channel: '', airDay: '',
    airDate: '', completed: 'N',
    poster: null, cast: '', url: '', synopsis: '',
    episodeBulk: '선택', totalEpisodes: '', freeEpisodes: '', schedule: 0,
    assets: [{ name: '', type: '선택', detail: '선택', quality: '선택', window: '선택', trade: '선택', supply: '', sell: '', start: '', end: '', file: '' }],
  })
}

// 추가된 콘텐츠 (시안 4:3876 — 메인 + 시즌 sub-row + 에피소드 sub-table, 모든 셀 편집 가능)
const added = ref([
  {
    id: 1, selected: false,
    seriesName: '굿닥터', supplyCategory: '영화_캐치온',
    genre: '시리즈>미드', language: '한국어', country: '한국', year: '2019',
    ratingNotify: 'Y', broadcast: 'Y', videoLaw: 'Y', videoLawBase: '신규', ratingNo: '123456',
    ageRating: '15세이상', refCountry: '대한민국', director: '홍길동',
    season: {
      num: '7', name: '굿닥터 시즌 7', completed: 'Y', bulk: 'Y', free: '2', total: '2',
      poster: '입력.zip', channel: 'MBC', schedule: '순차편성', airDay: '월,화', airDate: '2025-01-15',
      cast: '굿닥터1,굿닥…', url: 'http:// Series…', synopsis: '서번트 신드롬…',
    },
    episodes: [
      { name: '굿닥터 시즌7 1화', type: '본편', detail: '감독판', quality: 'HD', window: 'PVOD', trade: '소장(100일)', supply: '0', sell: '0', start: '9999-99-99', end: '9999-99-99', subFile: '이미지.zip', subUpload: '가로s…', video: '영상.mp4' },
      { name: '굿닥터 시즌7 2화', type: '본편', detail: '감독판', quality: 'HD', window: 'PVOD', trade: '소장(100일)', supply: '0', sell: '0', start: '9999-99-99', end: '9999-99-99', subFile: '이미지.zip', subUpload: '', video: '영상.mp4' },
      { name: '굿닥터 시즌7 3화', type: '본편', detail: '감독판', quality: 'HD', window: 'PVOD', trade: '소장(100일)', supply: '18,000원', sell: '8,000원', start: '9999-99-99', end: '9999-99-99', subFile: '이미지.zip', subUpload: '', video: '영상.mp4' },
    ],
  },
  { id: 2, selected: false, seriesName: '무한도전', supplyCategory: '지상파_MBC', genre: '시리즈>기타', language: '한국어', country: '한국', year: '2019', ratingNotify: 'N', broadcast: '-', videoLaw: '-', videoLawBase: '-', ratingNo: '-', ageRating: '15세이상', refCountry: '대한민국', director: '홍길동', season: null, episodes: [] },
])
const allSel = computed({
  get: () => added.value.length && added.value.every((r) => r.selected),
  set: (v) => added.value.forEach((r) => (r.selected = v)),
})

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

      <div class="detail-form">
        <div class="df-row">
          <DsDetailHeader text="시리즈명" essential />
          <DsDetailCell>
            <div class="cell-stack">
              <DsTextField :model-value="form.seriesName" placeholder="시리즈명 검색" readonly trailing-icon="line-search" @click="seriesOpen = true" />
              <p class="helper">시리즈 ID {{ form.seriesId }} | 시리즈 명 제휴한다요</p>
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
          <DsDetailCell><DsRadioGroup v-model="form.ratingNotify" :options="['Y','N']" name="rn-series" /></DsDetailCell>
          <DsDetailHeader text="등급분류번호" essential />
          <DsDetailCell><DsTextField v-model="form.ratingNo" placeholder="입력" /></DsDetailCell>
        </div>
        <div class="df-row">
          <DsDetailHeader text="시청등급" essential />
          <DsDetailCell>
            <div class="cell-split">
              <DsSelect v-model="form.ageRating" :options="opts.age" />
              <DsSelect v-model="form.refCountry" :options="opts.country" />
            </div>
          </DsDetailCell>
          <DsDetailHeader text="감독" />
          <DsDetailCell><DsTextField v-model="form.director" placeholder="입력" /></DsDetailCell>
        </div>
        <div class="df-row">
          <DsDetailHeader text="방송법" essential />
          <DsDetailCell><DsRadioGroup v-model="form.broadcast" :options="['Y','N']" name="b-series" /></DsDetailCell>
          <DsDetailHeader text="영비법" essential />
          <DsDetailCell><DsRadioGroup v-model="form.videoLaw" :options="['Y','N']" name="v-series" /></DsDetailCell>
        </div>
      </div>

      <!-- 시즌 상세 -->
      <div v-for="(s, si) in seasons" :key="si" class="season-accordion">
        <button type="button" class="season-head" @click="s.open = !s.open">
          <span class="season-head__btn">
            <DsIcon :name="s.open ? 'line-minus' : 'line-plus'" :size="9" />
          </span>
          <span class="season-head__title">{{ s.name || '시즌명' }}</span>
          <DsIcon :name="s.open ? 'line-up' : 'line-down'" :size="15" class="chev" />
        </button>
        <div v-show="s.open" class="season-body">
          <div class="detail-form">
            <div class="df-row">
              <DsDetailHeader text="시즌명" essential />
              <DsDetailCell><DsTextField v-model="s.name" placeholder="입력" /></DsDetailCell>
              <DsDetailHeader text="시즌" essential />
              <DsDetailCell><DsTextField v-model="s.season" placeholder="입력" /></DsDetailCell>
            </div>
            <div class="df-row">
              <DsDetailHeader text="제휴프로그램 매핑" essential />
              <DsDetailCell>
                <div class="cell-inline">
                  <DsRadioGroup v-model="s.partnerMap" :options="['N','Y']" :name="`pm-${si}`" />
                  <DsSearchButton class="partner-pill" :disabled="s.partnerMap !== 'Y'">조회</DsSearchButton>
                </div>
              </DsDetailCell>
              <DsDetailHeader text="방영채널" essential />
              <DsDetailCell><DsSelect v-model="s.channel" :options="opts.channel" /></DsDetailCell>
            </div>
            <div class="df-row">
              <DsDetailHeader text="편성기준" essential />
              <DsDetailCell><DsRadioGroup v-model="s.schedule" :options="[{label:'순차편성', value:'순차편성'},{label:'동시편성', value:'동시편성'}]" :name="`sc-${si}`" /></DsDetailCell>
              <DsDetailHeader text="방영요일" essential />
              <DsDetailCell><DsSelect v-model="s.airDay" :options="opts.airDay" /></DsDetailCell>
            </div>
            <div class="df-row">
              <DsDetailHeader text="방영일자" />
              <DsDetailCell><DsDatePicker v-model="s.airDate" /></DsDetailCell>
              <DsDetailHeader text="완결여부" essential />
              <DsDetailCell><DsRadioGroup v-model="s.completed" :options="['N','Y']" :name="`co-${si}`" /></DsDetailCell>
            </div>
            <div class="df-row">
              <DsDetailHeader text="포스터" essential />
              <DsDetailCell><DsFileUpload v-model="s.poster" /></DsDetailCell>
              <DsDetailHeader text="출연진" />
              <DsDetailCell><DsTextField v-model="s.cast" placeholder="입력" /></DsDetailCell>
            </div>
            <div class="df-row df-row--full">
              <DsDetailHeader text="참조 URL" />
              <DsDetailCell><DsTextField v-model="s.url" placeholder="입력" /></DsDetailCell>
            </div>
            <div class="df-row df-row--full">
              <DsDetailHeader text="시놉시스" />
              <DsDetailCell><DsTextarea v-model="s.synopsis" :rows="4" :maxlength="1000" show-counter placeholder="입력" /></DsDetailCell>
            </div>
            <div class="df-row">
              <DsDetailHeader text="회차 일괄 등록" essential />
              <DsDetailCell><DsSelect v-model="s.episodeBulk" :options="['선택','옵션1','옵션2']" /></DsDetailCell>
              <DsDetailHeader text="전체회차" essential />
              <DsDetailCell><DsTextField v-model="s.totalEpisodes" placeholder="입력" /></DsDetailCell>
            </div>
            <div class="df-row df-row--full">
              <DsDetailHeader text="무료회차" />
              <DsDetailCell><DsTextField v-model="s.freeEpisodes" placeholder="입력" /></DsDetailCell>
            </div>

            <!-- 어셋 유형 설정 — Detail Header + Detail Cell (full-width row) -->
            <div class="df-row df-row--full df-row--asset">
              <DsDetailHeader text="어셋 유형 설정" essential />
              <DsDetailCell>
                <div class="asset-wrap">
                  <div class="asset-table-scroll">
                  <div class="asset-table">
                <!-- 시안 4:3759 — 헤더 (단일 + Header-Group 3종 + 액션) -->
                <div class="at-head at-head--grouped">
                  <span class="c w-148 req">애피소드명</span>
                  <span class="c w-120 req">유형</span>
                  <span class="c w-120 req">세부유형</span>
                  <span class="c w-100 req">화질구분</span>
                  <span class="c w-110 req">윈도우구분</span>
                  <span class="c w-140">가격옵션</span>
                  <span class="c w-120 req">공급가격</span>
                  <span class="c w-120 req">판매가격</span>
                  <span class="c w-148 req">편성시작일</span>
                  <span class="c w-148 req">편성종료일</span>
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
                <div v-for="(a, ai) in s.assets" :key="ai" class="at-row">
                  <span class="c w-148"><DsTextField v-model="a.name" size="small" :readonly="!!a.name" /></span>
                  <span class="c w-120"><DsSelect v-model="a.type" :options="['선택','본편','추가본편']" size="small" /></span>
                  <span class="c w-120"><DsSelect v-model="a.detail" :options="['선택','감독편']" size="small" /></span>
                  <span class="c w-100"><DsSelect v-model="a.quality" :options="['선택','HD','UHD']" size="small" /></span>
                  <span class="c w-110"><DsSelect v-model="a.window" :options="['선택','PVOD','SPVOD']" size="small" /></span>
                  <span class="c w-140 cell-text">{{ a.trade }}</span>
                  <span class="c w-120 cell-num"><DsTextField v-model="a.supply" size="small" readonly /></span>
                  <span class="c w-120 cell-num"><DsTextField v-model="a.sell" size="small" readonly /></span>
                  <span class="c w-148"><DsDatePicker v-model="a.start" size="small" /></span>
                  <span class="c w-148"><DsDatePicker v-model="a.end" size="small" /></span>
                  <!-- 포스터 그룹: 파일명 + 파일 -->
                  <span class="c w-120"><DsTextField v-model="a.posterName" size="small" placeholder="입력.zip" /></span>
                  <span class="c w-119">
                    <span v-if="a.posterFile" class="file-chip">
                      <svg class="file-chip__clip" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M8.0221 0.89C9.28 -0.3 11.3 -0.3 12.55 0.89C13.83 2.1 13.83 4.07 12.55 5.27L6.13 11.35C5.38 12.06 4.18 12.06 3.43 11.35C2.67 10.62 2.67 9.43 3.43 8.7L9.07 3.37C9.32 3.13 9.72 3.14 9.95 3.4C10.19 3.65 10.18 4.04 9.93 4.28L4.29 9.61C4.05 9.85 4.05 10.21 4.29 10.44C4.56 10.69 5 10.69 5.27 10.44L11.69 4.36C12.45 3.65 12.45 2.51 11.69 1.8C10.92 1.07 9.65 1.07 8.88 1.8L2.19 8.12C0.93 9.32 0.93 11.23 2.19 12.43C3.47 13.64 5.56 13.64 6.84 12.43L13.53 6.1C13.78 5.86 14.17 5.87 14.41 6.12C14.65 6.37 14.64 6.77 14.39 7.01L7.7 13.33C5.94 15 3.1 15 1.34 13.33C-0.45 11.65 -0.45 8.9 1.34 7.22L8.0221 0.89Z" fill="#212633"/></svg>
                      <span class="file-chip__name">{{ a.posterFile }}</span>
                      <button type="button" class="file-chip__x"><DsIcon name="line-close" :size="10" /></button>
                    </span>
                    <DsButton v-else type="primary-outline" size="small">업로드</DsButton>
                  </span>
                  <!-- 자막 그룹: 파일명 + 파일 -->
                  <span class="c w-120"><DsTextField v-model="a.subName" size="small" placeholder="입력.zip" /></span>
                  <span class="c w-119">
                    <span v-if="a.subFile" class="file-chip">
                      <svg class="file-chip__clip" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M8.0221 0.89C9.28 -0.3 11.3 -0.3 12.55 0.89C13.83 2.1 13.83 4.07 12.55 5.27L6.13 11.35C5.38 12.06 4.18 12.06 3.43 11.35C2.67 10.62 2.67 9.43 3.43 8.7L9.07 3.37C9.32 3.13 9.72 3.14 9.95 3.4C10.19 3.65 10.18 4.04 9.93 4.28L4.29 9.61C4.05 9.85 4.05 10.21 4.29 10.44C4.56 10.69 5 10.69 5.27 10.44L11.69 4.36C12.45 3.65 12.45 2.51 11.69 1.8C10.92 1.07 9.65 1.07 8.88 1.8L2.19 8.12C0.93 9.32 0.93 11.23 2.19 12.43C3.47 13.64 5.56 13.64 6.84 12.43L13.53 6.1C13.78 5.86 14.17 5.87 14.41 6.12C14.65 6.37 14.64 6.77 14.39 7.01L7.7 13.33C5.94 15 3.1 15 1.34 13.33C-0.45 11.65 -0.45 8.9 1.34 7.22L8.0221 0.89Z" fill="#212633"/></svg>
                      <span class="file-chip__name">{{ a.subFile }}</span>
                      <button type="button" class="file-chip__x"><DsIcon name="line-close" :size="10" /></button>
                    </span>
                    <DsButton v-else type="primary-outline" size="small">업로드</DsButton>
                  </span>
                  <!-- 영상: 파일명만 -->
                  <span class="c w-120"><DsTextField v-model="a.videoName" size="small" placeholder="영상.mp4" /></span>
                  <!-- +/- 액션 -->
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
                    <button type="button" class="asset-chip"><span>어셋 유형 추가</span> <svg class="chip-plus" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M5.625 0C5.97018 0 6.25 0.279822 6.25 0.625V5H10.625C10.9702 5 11.25 5.27982 11.25 5.625C11.25 5.97018 10.9702 6.25 10.625 6.25H6.25V10.625C6.25 10.9702 5.97018 11.25 5.625 11.25C5.27982 11.25 5 10.9702 5 10.625V6.25H0.625C0.279822 6.25 0 5.97018 0 5.625C0 5.27982 0.279822 5 0.625 5H5V0.625C5 0.279822 5.27982 0 5.625 0Z" fill="#5BA0EF"/></svg></button>
                    <button v-for="i in 5" :key="i" type="button" class="asset-chip"><span>본편+자막+HD+SPVOD</span> <svg class="chip-plus" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M5.625 0C5.97018 0 6.25 0.279822 6.25 0.625V5H10.625C10.9702 5 11.25 5.27982 11.25 5.625C11.25 5.97018 10.9702 6.25 10.625 6.25H6.25V10.625C6.25 10.9702 5.97018 11.25 5.625 11.25C5.27982 11.25 5 10.9702 5 10.625V6.25H0.625C0.279822 6.25 0 5.97018 0 5.625C0 5.27982 0.279822 5 0.625 5H5V0.625C5 0.279822 5.27982 0 5.625 0Z" fill="#5BA0EF"/></svg></button>
                  </div>
                </div>
              </DsDetailCell>
            </div>
          </div>
        </div>
      </div>

      <DsAddButton block class="add-season" @click="addSeason">시즌 추가</DsAddButton>

      <div class="asset-actions">
        <DsButton type="neutral-outline" size="large" @click="resetSeasons">초기화</DsButton>
        <DsButton type="primary" size="large">추가</DsButton>
      </div>
      </div>

      <!-- 추가된 콘텐츠 -->
      <div class="sec-group">
      <header class="sec-head">
        <h3 class="sec-title">추가된 콘텐츠 <span class="muted">총 <strong>{{ added.length }}</strong>건</span></h3>
        <div class="actions">
          <DsButton type="neutral-outline" @click="batchOpen = true">일괄 업로드</DsButton>
          <DsButton type="primary-outline">선택삭제</DsButton>
        </div>
      </header>
      <div class="added-table-wrap">
        <div class="added-table">
          <!-- 시안 4:3876 메인 헤더 — 16 컬럼 -->
          <div class="add-head">
            <span class="c w-44">번호</span>
            <span class="c w-44"><DsCheckbox v-model="allSel" /></span>
            <span class="c w-200 req">시리즈명</span>
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

          <template v-for="r in added" :key="r.id">
            <!-- 메인 행 -->
            <div class="add-row">
              <span class="c w-44">{{ r.id }}</span>
              <span class="c w-44"><DsCheckbox v-model="r.selected" /></span>
              <span class="c w-200"><DsTextField :model-value="r.seriesName" size="small" trailing-icon="line-search" /></span>
              <span class="c w-128">{{ r.supplyCategory }}</span>
              <span class="c w-128">{{ r.genre }}</span>
              <span class="c w-100">{{ r.language }}</span>
              <span class="c w-100">{{ r.country }}</span>
              <span class="c w-100">{{ r.year }}</span>
              <span class="c w-106">{{ r.ratingNotify }}</span>
              <span class="c w-100">{{ r.broadcast }}</span>
              <span class="c w-100">{{ r.videoLaw }}</span>
              <span class="c w-96">{{ r.videoLawBase }}</span>
              <span class="c w-100">{{ r.ratingNo }}</span>
              <span class="c w-110">{{ r.ageRating }}</span>
              <span class="c w-110">{{ r.refCountry }}</span>
              <span class="c w-100">{{ r.director }}</span>
            </div>

            <!-- 시즌 sub-row (편집 가능 폼) -->
            <template v-if="r.season">
              <div class="add-sub add-sub--head">
                <span class="c w-50">시즌 *</span>
                <span class="c w-180">시즌명 *</span>
                <span class="c w-90">완결여부 *</span>
                <span class="c w-90">일괄등록 *</span>
                <span class="c w-90">무료회차 *</span>
                <span class="c w-90">전체회차 *</span>
                <span class="c w-180">포스터 *</span>
                <span class="c w-130">방영채널 *</span>
                <span class="c w-130">편성기준 *</span>
                <span class="c w-130">방영요일 *</span>
                <span class="c w-150">방영일자</span>
                <span class="c w-150">출연진 *</span>
                <span class="c w-150">참조 URL</span>
                <span class="c w-160">시놉시스</span>
              </div>
              <div class="add-sub">
                <span class="c w-50">{{ r.season.num }}</span>
                <span class="c w-180"><DsTextField :model-value="r.season.name" size="small" /></span>
                <span class="c w-90"><DsSelect :model-value="r.season.completed" :options="['Y','N']" size="small" /></span>
                <span class="c w-90"><DsSelect :model-value="r.season.bulk" :options="['Y','N']" size="small" /></span>
                <span class="c w-90"><DsTextField :model-value="r.season.free" size="small" /></span>
                <span class="c w-90"><DsTextField :model-value="r.season.total" size="small" /></span>
                <span class="c w-180 cell-poster">
                  <DsTextField :model-value="r.season.poster" placeholder="입력.zip" size="small" />
                  <DsButton type="primary-outline" size="small">업로드</DsButton>
                </span>
                <span class="c w-130"><DsSelect :model-value="r.season.channel" :options="['MBC','KBS','SBS']" size="small" /></span>
                <span class="c w-130"><DsSelect :model-value="r.season.schedule" :options="['순차편성','동시편성']" size="small" /></span>
                <span class="c w-130"><DsSelect :model-value="r.season.airDay" :options="['월,화','수,목','주말']" size="small" /></span>
                <span class="c w-150"><DsDatePicker :model-value="r.season.airDate" size="small" /></span>
                <span class="c w-150"><DsTextField :model-value="r.season.cast" size="small" /></span>
                <span class="c w-150"><DsTextField :model-value="r.season.url" size="small" /></span>
                <span class="c w-160"><DsTextField :model-value="r.season.synopsis" size="small" /></span>
              </div>

              <!-- 에피소드 헤더 (Header-Group: 자막/영상) -->
              <div v-if="r.episodes.length" class="ep-head ep-head--grouped">
                <span class="c w-40"></span>
                <span class="c w-44"><DsCheckbox :model-value="false" /></span>
                <span class="c w-220 req">에피소드명</span>
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
              <div v-for="(ep, ei) in r.episodes" :key="ei" class="ep-row">
                <span class="c w-40"></span>
                <span class="c w-44"><DsCheckbox :model-value="false" /></span>
                <span class="c w-220"><DsTextField :model-value="ep.name" size="small" /></span>
                <span class="c w-110"><DsSelect :model-value="ep.type" :options="['본편','추가본편']" size="small" /></span>
                <span class="c w-120"><DsSelect :model-value="ep.detail" :options="['감독판','자막/더빙']" size="small" /></span>
                <span class="c w-100"><DsSelect :model-value="ep.quality" :options="['HD','UHD']" size="small" /></span>
                <span class="c w-120"><DsSelect :model-value="ep.window" :options="['PVOD','SPVOD']" size="small" /></span>
                <span class="c w-140"><DsSelect :model-value="ep.trade" :options="['소장','소장(100일)']" size="small" /></span>
                <span class="c w-100 cell-num"><DsTextField :model-value="ep.supply" size="small" /></span>
                <span class="c w-100 cell-num"><DsTextField :model-value="ep.sell" size="small" /></span>
                <span class="c w-130">{{ ep.start }}</span>
                <span class="c w-130">{{ ep.end }}</span>
                <span class="c w-110"><DsTextField :model-value="ep.subFile" size="small" /></span>
                <span class="c w-110">
                  <span v-if="ep.subUpload" class="file-chip">
                    <svg class="file-chip__clip" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                      <path d="M8.0221 0.890172C9.27675 -0.29675 11.297 -0.296698 12.5517 0.890172C13.8261 2.09577 13.8261 4.06527 12.5517 5.27087L6.12757 11.3492C5.37975 12.0563 4.18081 12.0565 3.43307 11.3492C2.66562 10.6231 2.66569 9.4304 3.43307 8.7043L9.07109 3.37064C9.32176 3.13372 9.71688 3.14465 9.95407 3.39506C10.1913 3.6458 10.1804 4.04162 9.92965 4.27884L4.29244 9.6125C4.04624 9.84545 4.04623 10.208 4.29244 10.441C4.55835 10.6923 5.00319 10.6924 5.26901 10.441L11.6932 4.36348C12.4462 3.65109 12.446 2.51085 11.6932 1.79838C10.9204 1.06732 9.6534 1.06732 8.88066 1.79838L2.19446 8.12406C0.934746 9.31597 0.934782 11.2331 2.19446 12.425C3.47406 13.6356 5.56249 13.6356 6.84209 12.425L13.5283 6.09932C13.779 5.86217 14.1748 5.87311 14.4121 6.12373C14.6493 6.37444 14.6383 6.77029 14.3877 7.00752L7.70146 13.3332C5.93996 14.9997 3.09746 14.9996 1.3359 13.3332C-0.445301 11.6481 -0.4453 8.90097 1.3359 7.21586L8.0221 0.890172Z" fill="#212633"/>
                    </svg>
                    <span class="file-chip__name">{{ ep.subUpload }}</span>
                    <button type="button" class="file-chip__x" aria-label="제거"><DsIcon name="line-close" :size="12" /></button>
                  </span>
                  <DsButton v-else type="primary-outline" size="small">업로드</DsButton>
                </span>
                <span class="c w-110"><DsTextField :model-value="ep.video" size="small" /></span>
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
          <EmptyResult v-if="!added.length" />
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

    <RightsContractSearchModal v-model="rightsOpen" />
    <SeriesSearchModal v-model="seriesOpen" @select="onSeriesSelect" />
    <BatchUploadModal v-model="batchOpen" />
    <ApprovalRequestModal v-model="approveOpen" />
  </div>
</template>

<style scoped>
/* 하단 padding 없음 — 푸터 top padding(40)이 콘텐츠↔푸터 간격 담당 */
.page { flex: 1; min-width: 0; padding: 0 var(--ds-space-40); width: 100%; }
.page .card { min-width: 0; }
.card { background: var(--ds-fill-gray-white); border-radius: var(--ds-radius-20); padding: var(--ds-space-40); box-shadow: 0 2px 8px 0 rgba(95, 102, 160, 0.06); }

/* 시안: 관련판권·콘텐츠등록·추가된콘텐츠가 한 카드 안에서 그룹으로 분리 */
.sec-group { margin-bottom: var(--ds-space-40); }

.sec-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--ds-space-16); }
.sec-title { margin: 0; font-size: var(--ds-fs-headline-16); font-weight: var(--ds-fw-bold); color: var(--ds-text-gray-black); }
.muted { font-weight: var(--ds-fw-regular); color: var(--ds-text-gray-700); font-size: var(--ds-fs-body-13); margin-left: var(--ds-space-8); }
.muted strong { color: var(--ds-text-blue-700); font-weight: var(--ds-fw-bold); }
.actions { display: flex; gap: var(--ds-space-8); }
.hint { font-size: var(--ds-fs-body-12); color: var(--ds-text-gray-500); margin: 0 0 var(--ds-space-8); }

.rights-table { border-top: 1px solid var(--ds-border-gray-200); }
.rt-head, .rt-row { display: flex; align-items: center; border-bottom: 1px solid var(--ds-border-gray-200); }
.rt-head { background: var(--ds-fill-blue-50); }
.rt-head .c { font-size: var(--ds-fs-body-13); font-weight: var(--ds-fw-medium); color: var(--ds-text-gray-700); padding: var(--ds-space-10); }
.rt-row .c { font-size: var(--ds-fs-body-13); color: var(--ds-text-gray-black); padding: var(--ds-space-10); }
.c { display: flex; align-items: center; justify-content: center; }
.w-50 { width: 50px; } .w-60 { width: 60px; } .w-70 { width: 70px; } .w-80 { width: 80px; }
.w-90 { width: 90px; } .w-100 { width: 100px; } .w-110 { width: 110px; } .w-120 { width: 120px; }
.w-130 { width: 130px; } .w-119 { width: 119px; flex-shrink: 0; }
.w-140 { width: 140px; } .w-145 { width: 145px; } .w-148 { width: 148px; flex-shrink: 0; } .w-150 { width: 150px; } .w-160 { width: 160px; }
.w-239 { width: 239px; flex-shrink: 0; }
.flex { flex: 1; min-width: 100px; }

/* Detail Header(blue-50, 160px) + Detail Cell(white) 4열 폼 */
.detail-form {
  display: grid;
  grid-template-columns: 160px 1fr 160px 1fr;
  /* 첫 행 상단 보더는 내부 행 구분선(gray-200)보다 진하게 (시안) */
  border-top: 1px solid var(--ds-border-gray-400);
  margin-bottom: var(--ds-space-16);
}
.df-row { display: contents; }
.df-row--full > :nth-child(2) { grid-column: 2 / 5; }
.cell-stack { display: flex; flex-direction: column; gap: var(--ds-space-4); width: 100%; }
.cell-split { display: grid; grid-template-columns: 1fr 1fr; gap: var(--ds-space-8); width: 100%; }
.cell-inline { display: flex; align-items: center; gap: var(--ds-space-12); width: 100%; }

/* 시안 4:3721 — 제휴프로그램 매핑 조회 버튼: pill 모양 + 스타일가이드 Neutral Outline 색상 규칙 */
/* Enabled: 흰 배경 + gray-300 보더 + black 텍스트 */
.partner-pill {
  background: var(--ds-fill-gray-white) !important;
  border: 1px solid var(--ds-border-gray-300) !important;
}
.partner-pill :deep(.ds-sbtn__label) { color: var(--ds-text-gray-black) !important; }
.partner-pill :deep(.ds-icon) { color: var(--ds-text-gray-black) !important; }
.partner-pill :deep(.ds-icon svg [fill]) { fill: var(--ds-text-gray-black) !important; }
.partner-pill :deep(.ds-icon svg [stroke]) { stroke: var(--ds-text-gray-black) !important; }
/* Hover: 흰 배경 유지 + blue-900 보더 + 텍스트/아이콘 그대로 (스타일가이드 Neutral Outline Hover) */
.partner-pill:hover:not(:disabled) {
  background: var(--ds-fill-gray-white) !important;
  border-color: var(--ds-fill-blue-900) !important;
}
/* Disabled: gray-200 배경 + gray-300 보더 + gray-500 텍스트 */
.partner-pill:disabled {
  background: var(--ds-fill-gray-200) !important;
  border-color: var(--ds-border-gray-300) !important;
}
.partner-pill:disabled :deep(.ds-sbtn__label) { color: var(--ds-text-gray-500) !important; }
.partner-pill:disabled :deep(.ds-icon) { color: var(--ds-text-gray-500) !important; }
.partner-pill:disabled :deep(.ds-icon svg [fill]) { fill: var(--ds-text-gray-500) !important; }
.partner-pill:disabled :deep(.ds-icon svg [stroke]) { stroke: var(--ds-text-gray-500) !important; }
.detail-form :deep(.ds-tf), .detail-form :deep(.ds-ta), .detail-form :deep(.ds-select) { width: 100%; }
.helper { margin: 0; font-size: var(--ds-fs-body-12); color: var(--ds-text-gray-700); }
.lb { font-size: var(--ds-fs-body-13); font-weight: var(--ds-fw-medium); color: var(--ds-text-gray-black); display: flex; align-items: center; min-height: 32px; }

/* 시안: 우측 검색 아이콘 14px / 좌측 다운로드 아이콘 9px */
.btn-rights :deep(.ds-icon) { width: 17px !important; height: 17px !important; }
.btn-tpl :deep(.ds-icon) { width: 12px !important; height: 12px !important; }

.lb.req::after { content: ' *'; color: var(--ds-text-red-300); }
.lb--top { align-self: flex-start; padding-top: 8px; }

.season-accordion {
  margin-top: var(--ds-space-20);
  border: 1px solid var(--ds-border-gray-300);
  border-radius: var(--ds-radius-6);
  overflow: hidden;
}
/* 시안 4:3700/4:3705 — 헤더: blue-50 bg, 펼침 시 body가 같은 컨테이너 안에 보이도록 */
.season-head {
  width: 100%; display: flex; align-items: center;
  padding: var(--ds-space-10) var(--ds-space-20) var(--ds-space-10) var(--ds-space-24);
  background: var(--ds-fill-blue-50);
  border: 0;
  cursor: pointer;
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-headline-14); font-weight: var(--ds-fw-medium);
  color: var(--ds-text-gray-black);
  gap: var(--ds-space-8);
}
.season-accordion:has(.season-body[style*="display: none"]) .season-head,
.season-accordion .season-head:only-child { border-bottom: 0; }
/* 펼친 상태 — 헤더 아래 구분선 */
.season-accordion .season-head + .season-body { border-top: 1px solid var(--ds-border-gray-300); }
.season-head__btn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 17px; height: 17px;
  background: var(--ds-fill-gray-white);
  border: 1px solid var(--ds-border-gray-300);
  border-radius: var(--ds-radius-4);
  color: var(--ds-text-gray-700);
}
.season-head__title {
  font-size: var(--ds-fs-headline-14); font-weight: var(--ds-fw-medium);
  color: var(--ds-text-gray-black);
}
.season-head .chev { margin-left: auto; color: var(--ds-text-gray-700); }
.season-body { padding: 0; }
.season-body .detail-form { border-top: 0; }

/* 어셋 유형 설정 cell — Detail Cell 안에서 가로 스크롤 동작하도록 */
.df-row--asset :deep(.ds-dc) { padding: var(--ds-space-12) var(--ds-space-10); min-width: 0; align-items: stretch; flex-direction: column; }
.asset-wrap { display: flex; flex-direction: column; min-width: 0; width: 100%; }
.asset-wrap > .asset-table-scroll { overflow-x: auto; overflow-y: hidden; border-top: 1px solid var(--ds-border-gray-200); border-bottom: 1px solid var(--ds-border-gray-200); }
.asset-table { min-width: 1962px; display: flex; flex-direction: column; }
.at-head, .at-row { display: flex; align-items: center; border-bottom: 1px solid var(--ds-border-gray-200); }
.at-head { background: var(--ds-fill-blue-50); }
/* 셀 우측 세로 라인 (마지막 셀 제외) */
.at-head > .c, .at-head > .c-group,
.at-row > .c { border-right: 1px solid var(--ds-border-gray-200); }
.at-head > .c:last-child, .at-head > .c-group:last-child,
.at-row > .c:last-child { border-right: 0; }
.at-head .c { font-size: var(--ds-fs-body-12); font-weight: var(--ds-fw-medium); color: var(--ds-text-gray-700); padding: var(--ds-space-8); white-space: nowrap; justify-content: center; }
.at-head .c.req::after { content: ' *'; color: var(--ds-text-red-300); }
/* Header-Group (포스터/자막/영상) — at-head 안에서 2단 헤더 */
.at-head--grouped { min-height: 80px; padding: 0; align-items: stretch; }
.at-head--grouped > .c { padding: var(--ds-space-4); align-items: center; justify-content: center; align-self: stretch; }
/* 행 안의 인풋/셀렉트가 셀 폭을 정확히 채우게 해서 미정렬 방지 */
.at-row { align-items: stretch; min-width: 0; }
.at-row > .c { min-width: 0; box-sizing: border-box; }
.at-row :deep(.ds-tf),
.at-row :deep(.ds-select),
.at-row :deep(.ds-date) { width: 100%; min-width: 0; }
.at-head--grouped > .c { align-self: stretch; }
.at-head .c-group { display: flex; flex-direction: column; align-self: stretch; flex-shrink: 0; border-right: 1px solid var(--ds-border-gray-200); }
.at-head .c-group:last-child { border-right: 0; }
.at-head .c-group__top { flex: 1; display: flex; align-items: center; justify-content: center; font-size: var(--ds-fs-body-12); font-weight: var(--ds-fw-medium); color: var(--ds-text-gray-700); border-bottom: 1px solid var(--ds-border-gray-200); padding: var(--ds-space-4); }
.at-head .c-group__top.req::after { content: ' *'; color: var(--ds-text-red-300); }
.at-head .c-group__bottom { display: flex; flex: 1; }
.at-head .c-group__bottom .c { font-size: var(--ds-fs-body-12); font-weight: var(--ds-fw-medium); color: var(--ds-text-gray-700); padding: var(--ds-space-4); border-right: 1px solid var(--ds-border-gray-200); }
.at-head .c-group__bottom .c:last-child { border-right: 0; }
.at-head .c-group__bottom .c.req::after { content: ' *'; color: var(--ds-text-red-300); }
.at-row .c { padding: var(--ds-space-4); }
.at-row .c.cell-text { padding: var(--ds-space-8); font-size: var(--ds-fs-body-13); color: var(--ds-text-gray-900); justify-content: center; }
/* 금액 셀 — 우측 정렬 */
.at-row .c.cell-num :deep(.v-field__input),
.at-row .c.cell-num :deep(input) { text-align: right; }
.asset-presets { display: flex; flex-wrap: wrap; gap: var(--ds-space-8); margin-top: var(--ds-space-12); }
/* 시안 4:3843 — Asset list chip: 흰 bg + light-blue-300 보더 + radius 8 + plus 우측 */
.asset-chip {
  display: inline-flex; align-items: center; gap: var(--ds-space-8);
  padding: var(--ds-space-10) var(--ds-space-10) var(--ds-space-10) var(--ds-space-12);
  background: var(--ds-fill-gray-white);
  border: 1px solid var(--ds-fill-light-blue-300);
  border-radius: var(--ds-radius-8);
  color: var(--ds-text-gray-700);
  font-size: var(--ds-fs-body-13); font-weight: var(--ds-fw-medium);
  line-height: 1.5;
  cursor: pointer; font-family: var(--ds-font-family);
}
.asset-chip:hover { background: var(--ds-fill-light-blue-50); }
.asset-chip :deep(.ds-icon) { color: var(--ds-text-gray-700); }
.asset-chip :deep(.ds-icon svg [fill]) { fill: var(--ds-text-gray-700); }
.asset-chip :deep(.ds-icon svg [stroke]) { stroke: var(--ds-text-gray-700); }

.add-season {
  width: 100%; display: flex; align-items: center; justify-content: center; gap: var(--ds-space-6);
  padding: var(--ds-space-14);
  margin-top: var(--ds-space-16);
  background: var(--ds-fill-gray-white);
  border: 1px dashed var(--ds-border-blue-500);
  border-radius: var(--ds-radius-4);
  color: var(--ds-text-blue-500);
  font-family: var(--ds-font-family); font-size: var(--ds-fs-body-14); font-weight: var(--ds-fw-medium);
  cursor: pointer;
}
.add-season:hover { background: var(--ds-fill-blue-75); }

.asset-actions { display: flex; justify-content: center; gap: var(--ds-space-8); margin-top: var(--ds-space-20); }

/* 시안 4:3876 — 추가된 콘텐츠 테이블 */
.added-table-wrap { overflow-x: auto; overflow-y: hidden; border-top: 1px solid #949bb0; }
.added-table { min-width: 2200px; display: flex; flex-direction: column; }
.add-head, .add-row, .add-sub, .ep-head, .ep-row {
  display: flex; align-items: center;
  border-bottom: 1px solid var(--ds-border-gray-200);
}
/* 세로 라인 — 각 셀 우측 (마지막 셀 제외) */
.add-head > .c, .add-row > .c, .add-sub > .c,
.ep-head > .c, .ep-head > .c-group,
.ep-row > .c { border-right: 1px solid var(--ds-border-gray-200); }
.add-head > .c:last-child, .add-row > .c:last-child, .add-sub > .c:last-child,
.ep-head > :last-child, .ep-row > .c:last-child { border-right: 0; }
.ep-head .c-group__bottom .c { border-right: 1px solid var(--ds-border-gray-200); }
.ep-head .c-group__bottom .c:last-child { border-right: 0; }
.add-head { background: var(--ds-fill-blue-50); min-height: 40px; }
.add-head .c { font-size: var(--ds-fs-body-13); font-weight: var(--ds-fw-medium); color: var(--ds-text-gray-700); padding: var(--ds-space-6) var(--ds-space-10); justify-content: center; }
.add-head .c.req::after { content: ' *'; color: var(--ds-text-red-300); }
.add-row { min-height: 44px; background: var(--ds-fill-gray-white); }
.add-row .c { font-size: var(--ds-fs-body-13); color: var(--ds-text-gray-black); padding: var(--ds-space-6) var(--ds-space-10); justify-content: center; }
/* 시즌 sub-row: 헤더(blue-50) + 행(white) */
.add-sub { background: var(--ds-fill-gray-white); min-height: 44px; padding-left: 88px; }
.add-sub--head { background: var(--ds-fill-blue-50); min-height: 32px; }
.add-sub--head .c { font-size: var(--ds-fs-body-13); font-weight: var(--ds-fw-medium); color: var(--ds-text-gray-700); }
.add-sub .c { font-size: var(--ds-fs-body-13); color: var(--ds-text-gray-black); padding: var(--ds-space-4) var(--ds-space-8); justify-content: center; }
.add-sub .c.cell-poster { display: flex; gap: var(--ds-space-4); align-items: center; }
.add-sub :deep(.ds-tf), .add-sub :deep(.ds-select), .add-sub :deep(.ds-date) { width: 100%; }
/* 에피소드 헤더 (Header-Group 지원 — blue-75) */
.ep-head { background: var(--ds-fill-blue-75); min-height: 64px; padding-left: 88px; }
.ep-head .c { font-size: var(--ds-fs-body-13); font-weight: var(--ds-fw-medium); color: var(--ds-text-gray-700); padding: var(--ds-space-4) var(--ds-space-10); justify-content: center; }
.ep-head .c.req::after { content: ' *'; color: var(--ds-text-red-300); }
.c-group { display: flex; flex-direction: column; align-self: stretch; flex-shrink: 0; }
.c-group__top { flex: 1; display: flex; align-items: center; justify-content: center; font-size: var(--ds-fs-body-13); font-weight: var(--ds-fw-medium); color: var(--ds-text-gray-700); border-bottom: 1px solid var(--ds-border-gray-300); padding: var(--ds-space-4); }
.c-group__bottom { display: flex; flex: 1; }
.c-group__bottom .c { padding: var(--ds-space-4) var(--ds-space-10); }
/* 에피소드 행 */
.ep-row { background: var(--ds-fill-gray-white); min-height: 44px; padding-left: 88px; }
.ep-row .c { font-size: var(--ds-fs-body-13); color: var(--ds-text-gray-black); padding: var(--ds-space-4); justify-content: center; }
.ep-row .c.cell-num :deep(.v-field__input),
.ep-row .c.cell-num :deep(input) { text-align: right; }
.ep-row :deep(.ds-tf), .ep-row :deep(.ds-select) { width: 100%; }
.ep-actions { display: flex; gap: var(--ds-space-6); justify-content: center; align-items: center; }
.ep-btn {
  width: 24px; height: 24px;
  display: inline-flex; align-items: center; justify-content: center;
  border: 0; border-radius: 999px; cursor: pointer;
  padding: 0;
}
.ep-btn--add { background: var(--ds-fill-blue-500); }
.ep-btn--add:hover { background: var(--ds-fill-blue-600); }
.ep-btn--del { background: var(--ds-fill-red-300); }
.ep-btn--del:hover { background: var(--ds-fill-red-400, #e57373); }

/* 첨부 파일 칩 — 클립 + 파일명 + X */
.file-chip {
  display: inline-flex; align-items: center; gap: var(--ds-space-4);
  height: 28px; padding: 0 var(--ds-space-8);
  background: var(--ds-fill-gray-white);
  border: 1px solid var(--ds-border-gray-300);
  border-radius: var(--ds-radius-4);
  font-size: var(--ds-fs-body-13);
  color: var(--ds-text-gray-black);
  max-width: 100%;
}
.file-chip__clip { color: var(--ds-text-gray-700); flex-shrink: 0; }
.file-chip__name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; }
.file-chip__x {
  width: 16px; height: 16px;
  display: inline-flex; align-items: center; justify-content: center;
  border: 0; background: var(--ds-fill-gray-300); border-radius: 999px;
  cursor: pointer; color: var(--ds-text-gray-white);
  padding: 0; flex-shrink: 0;
}
.file-chip__x :deep(svg) { width: 8px; height: 8px; }

/* 추가 width 토큰 */
.w-40 { width: 40px; flex-shrink: 0; }
.w-44 { width: 44px; flex-shrink: 0; }
.w-50 { width: 50px; flex-shrink: 0; }
.w-88 { width: 88px; flex-shrink: 0; }
.w-90 { width: 90px; flex-shrink: 0; }
.w-96 { width: 96px; flex-shrink: 0; }
.w-100 { width: 100px; flex-shrink: 0; }
.w-106 { width: 106px; flex-shrink: 0; }
.w-110 { width: 110px; flex-shrink: 0; }
.w-120 { width: 120px; flex-shrink: 0; }
.w-128 { width: 128px; flex-shrink: 0; }
.w-130 { width: 130px; flex-shrink: 0; }
.w-140 { width: 140px; flex-shrink: 0; }
.w-150 { width: 150px; flex-shrink: 0; }
.w-160 { width: 160px; flex-shrink: 0; }
.w-180 { width: 180px; flex-shrink: 0; }
.w-200 { width: 200px; flex-shrink: 0; }
.w-220 { width: 220px; flex-shrink: 0; }

.footer-bar { display: flex; align-items: center; justify-content: space-between; }
.footer-right { display: flex; gap: var(--ds-space-8); }

/* ===== 상세(detail) 모드 — 읽기 전용 ===== */
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
