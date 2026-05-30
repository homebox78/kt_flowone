<script setup>
// TV앱 입고 관리 목록 (시안 별도 없으나 신작 계획 관리 패턴 동일)
import { ref, computed, h, markRaw, defineComponent } from 'vue'
import AgGridWrapper from '@/components/common/AgGridWrapper.vue'
import {
  DsPageHeader, DsSelect, DsTextField, DsCheckbox, DsDatePicker,
  DsButton, DsPagination, DsStatusBadge,
  DsFilterGroup, DsFilterRow, DsFilterField, DsTableToolbar,
} from '@/components/ds'
import TvAppInboundNewModal from '@/components/cp-con/modals/TvAppInboundNewModal.vue'
import TvAppInboundDetailModal from '@/components/cp-con/modals/TvAppInboundDetailModal.vue'
import GridCheckboxCell from '@/components/common/GridCheckboxCell.vue'

const CheckboxCell = markRaw({
  props: ['params'],
  setup(props) { return () => h(GridCheckboxCell, { params: props.params }) },
})

const filters = ref({
  appType: '전체', inboundStatus: '전체',
  searchScope: '서비스명', keyword: '',
  category: { all: true, unicast: false, multicast: false },
})

function reset() { filters.value = { appType: '전체', inboundStatus: '전체', searchScope: '서비스명', keyword: '', category: { all: true, unicast: false, multicast: false } } }
function search() {}

const newOpen = ref(false)
const detailOpen = ref(false)

// 상세 모달에 행별 데이터를 채우기 위한 공통 골격 (목록 컬럼에 없는 필드는 대표값)
const detailBase = {
  hdsId: '20230114', ageRating: '15세이상',
  mcpFile: 'service_guide.ppt',
  portraitImg: 'poster_portrait.jpg', landscapeImg: 'poster_landscape.jpg', squareImg: 'poster_square.jpg',
  cleanLandscape: '', bgImg: '', listTitle: '', detailTitle: '',
  priceType: '무료', verifyEmail: 'cp@partner.co.kr', verifyDoc: 'self_verify.docx',
  installPath: 'app.MainApp', appFile: 'app_v1.zip',
  homepage: 'https://www.partner.co.kr', aidOid: '1234 5678', language: '한국어',
  players: '', keywords: '',
}

// 실제 TV앱 입고 형태의 목록 데이터 (상세 모달 내용과 일관)
const allRows = [
  { service: '실시간 날씨 위젯', appType: '위젯', widgetDevType: 'Javascript', genre: '생활정보', provider: '케이웨더', maker: '케이웨더', version: '1.3', regDate: '2025-04-18', status: '승인완료', summary: '전국 시·군·구 단위 실시간 날씨와 미세먼지를 한눈에 보여주는 위젯.', detail: '기상청 동네예보 기반 시간대별 강수·기온·미세먼지 제공, 즐겨찾기 지역 최대 5개 등록 가능.' },
  { service: '골프 레슨 클래스', appType: '웹앱', widgetDevType: '-', genre: '스포츠/레저', provider: '골프존', maker: '골프존미디어', version: '2.0', regDate: '2025-03-22', status: '승인완료', summary: 'PGA 코치의 스윙 레슨을 부위별로 학습하는 골프 강좌 서비스.', detail: '드라이버·아이언·퍼팅 단계별 영상 강의와 슬로우모션 분석 제공.' },
  { service: '우리아이 한글놀이', appType: '위젯', widgetDevType: 'Javascript', genre: '교육', provider: '아이스크림에듀', maker: '아이스크림에듀', version: '1.1', regDate: '2025-02-10', status: '승인요청', summary: '유아 대상 한글 자음·모음 학습 인터랙티브 놀이.', detail: '소리·터치 기반 따라쓰기와 받아쓰기 게임으로 한글 떼기 학습.' },
  { service: '트로트 노래방', appType: '웹앱', widgetDevType: '-', genre: '음악', provider: '금영엔터테인먼트', maker: '금영', version: '3.2', regDate: '2025-04-02', status: '승인완료', summary: '최신 트로트 신곡을 매주 업데이트하는 TV 노래방.', detail: '실시간 점수·음정 가이드, 인기차트 100곡 무료 제공.' },
  { service: '현대홈쇼핑 라이브', appType: '웹앱', widgetDevType: '-', genre: '쇼핑', provider: '현대홈쇼핑', maker: '현대IT&E', version: '1.0', regDate: '2025-01-15', status: '임시저장', summary: 'TV로 보는 실시간 홈쇼핑 라이브 방송.', detail: '리모컨 즉시 주문, 방송 편성표, 방송상품 다시보기 지원.' },
  { service: '실시간 증시 시세', appType: '위젯', widgetDevType: 'Flash', genre: '금융/증권', provider: '한국경제TV', maker: '와우넷', version: '2.1', regDate: '2025-03-08', status: '요청반려', summary: '코스피·코스닥 및 관심 종목 시세를 실시간 표시하는 위젯.', detail: '관심종목 등록, 등락률 색상 표시, 환율·금시세 위젯 포함.' },
  { service: '오늘의 운세', appType: '위젯', widgetDevType: 'Javascript', genre: '생활정보', provider: '포스텔러', maker: '라이크유', version: '1.4', regDate: '2025-02-27', status: '승인완료', summary: '띠별·별자리별 오늘의 운세를 매일 제공.', detail: '생년월일 기반 일일 운세, 토정비결, 궁합 콘텐츠 제공.' },
  { service: '키즈 동요 천국', appType: '웹앱', widgetDevType: '-', genre: '키즈', provider: '스마트스터디', maker: '핑크퐁컴퍼니', version: '1.2', regDate: '2025-04-11', status: '승인요청', summary: '인기 동요·율동 영상을 모은 어린이 전용 채널.', detail: '핑크퐁·아기상어 시리즈 등 1,000여 편, 연령별 추천 재생목록.' },
  { service: '명상과 힐링 사운드', appType: '웹앱', widgetDevType: '-', genre: '건강', provider: '마보', maker: '마보', version: '1.0', regDate: '2025-01-30', status: '임시저장', summary: '수면·집중을 돕는 명상 가이드와 ASMR 사운드.', detail: '수면·불안·스트레스 테마별 명상 음성과 자연의 소리 제공.' },
  { service: '전국 맛집 지도', appType: '위젯', widgetDevType: 'Javascript', genre: '생활정보', provider: '망고플레이트', maker: '망고플레이트', version: '1.5', regDate: '2025-03-15', status: '승인완료', summary: '지역별 인기 맛집과 리뷰를 보여주는 위젯.', detail: '현재 위치 기반 주변 맛집, 평점·메뉴·영업시간 정보 제공.' },
  { service: '프로야구 라이브', appType: '웹앱', widgetDevType: '-', genre: '스포츠', provider: '스포티비', maker: '에이클라미디어', version: '4.0', regDate: '2025-04-20', status: '승인완료', summary: 'KBO 전 경기 생중계 및 하이라이트 다시보기.', detail: '멀티뷰 중계, 실시간 문자중계, 팀별 일정·순위 제공.' },
  { service: '클라우드 레이싱', appType: '클라우드게임', widgetDevType: '-', genre: '게임', provider: '카카오게임즈', maker: '카카오게임즈', version: '1.0', regDate: '2025-02-05', status: '요청반려', summary: '리모컨·패드로 즐기는 클라우드 기반 레이싱 게임.', detail: '서버 렌더링 스트리밍, 별도 설치 없이 즉시 실행, 멀티플레이 지원.' },
  { service: '홈트레이닝 PT', appType: '웹앱', widgetDevType: '-', genre: '건강', provider: '콰트', maker: '콰트', version: '2.3', regDate: '2025-03-29', status: '승인요청', summary: '집에서 따라하는 부위별 홈트레이닝 코칭.', detail: '난이도·부위별 루틴, AI 자세 가이드, 주간 운동 리포트 제공.' },
  { service: '실시간 교통정보', appType: '위젯', widgetDevType: 'Javascript', genre: '생활정보', provider: '티맵모빌리티', maker: '티맵', version: '1.6', regDate: '2025-01-22', status: '승인완료', summary: '주요 도로 소통 상황과 출퇴근 경로 소요시간 위젯.', detail: '실시간 교통량 색상 표시, 자주 가는 경로 등록, 사고·공사 정보 제공.' },
  { service: '영어회화 마스터', appType: '웹앱', widgetDevType: '-', genre: '교육', provider: '야나두', maker: '야나두', version: '3.0', regDate: '2025-02-18', status: '승인완료', summary: '하루 10분 생활영어 회화 학습 서비스.', detail: '원어민 발음 비교, 상황별 표현, 학습 진도 관리 제공.' },
  { service: '클래식 명곡 감상', appType: '웹앱', widgetDevType: '-', genre: '음악', provider: '지니뮤직', maker: '지니뮤직', version: '1.1', regDate: '2025-04-06', status: '임시저장', summary: '엄선된 클래식 명곡을 고음질로 감상하는 채널.', detail: '작곡가·시대별 큐레이션, 4K 공연 영상, 무손실 음원 스트리밍.' },
]
allRows.forEach((r, i) => { r.no = allRows.length - i })

// 상세 모달 데이터 (클릭한 행으로 채움)
const detailData = ref({ ...detailBase })
function openDetail(row) {
  detailData.value = {
    ...detailBase,
    serviceName: row.service, appType: row.appType, widgetDevType: row.widgetDevType,
    genre: row.genre, provider: row.provider, maker: row.maker,
    appVersion: row.version, summary: row.summary, detail: row.detail,
  }
  detailOpen.value = true
}

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
  setup(props) { return () => h(DsStatusBadge, { status: props.params.value }) },
})

const CENTER_CELL = { display: 'flex', alignItems: 'center', justifyContent: 'center' }
const CenterInnerHeader = markRaw(defineComponent({
  props: ['params'],
  setup(props) {
    return () => h('div', { style: 'flex:1;text-align:center;' }, props.params.displayName)
  },
}))
const CENTER_HEADER = { innerHeaderComponent: CenterInnerHeader }

const columnDefs = [
  {
    headerName: '',
    width: 44, pinned: 'left', resizable: false, sortable: false,
    cellRenderer: CheckboxCell,
    headerComponent: CheckboxCell,
  },
  { field: 'no', headerName: '번호', width: 80, cellStyle: CENTER_CELL, headerComponentParams: CENTER_HEADER },
  { field: 'service', headerName: '서비스명', width: 240, onCellClicked: (p) => openDetail(p.data) },
  { field: 'appType', headerName: '앱 유형', width: 120 },
  { field: 'version', headerName: '버전', width: 100, cellStyle: CENTER_CELL, headerComponentParams: CENTER_HEADER },
  { field: 'provider', headerName: '제공사', width: 120 },
  { field: 'regDate', headerName: '등록일', width: 140, cellStyle: CENTER_CELL, headerComponentParams: CENTER_HEADER },
  { field: 'status', headerName: '상태', width: 140, cellRenderer: StatusCell, cellStyle: CENTER_CELL, headerComponentParams: CENTER_HEADER },
]
const defaultColDef = { sortable: true, resizable: true, suppressMovable: true }
</script>

<template>
  <div class="page">
    <DsPageHeader title="TV앱 입고 관리" :breadcrumb="['홈', '콘텐츠 관리', 'TV앱 입고 관리']" />

    <DsFilterGroup class="mb" :collapsible="false">
      <!-- Row 1: 앱 유형 | 입고 상태 -->
      <DsFilterRow>
        <DsFilterField label="앱 유형">
          <div class="w-180"><DsSelect v-model="filters.appType" :options="['전체','위젯','웹앱','클라우드게임']" /></div>
        </DsFilterField>
        <DsFilterField label="입고 상태">
          <div class="w-180"><DsSelect v-model="filters.inboundStatus" :options="['전체','요청반려','승인요청','승인완료']" /></div>
        </DsFilterField>
      </DsFilterRow>
      <!-- Row 2: 검색(서비스명+입력) | 카테고리 -->
      <DsFilterRow>
        <DsFilterField label="검색">
          <div class="w-180"><DsSelect v-model="filters.searchScope" :options="['서비스명','제공사','제작사']" /></div>
          <div class="grow"><DsTextField v-model="filters.keyword" placeholder="검색어 입력" /></div>
        </DsFilterField>
        <DsFilterField label="카테고리">
          <DsCheckbox v-model="filters.category.all" label="전체" />
          <DsCheckbox v-model="filters.category.unicast" label="유니캐스트" />
          <DsCheckbox v-model="filters.category.multicast" label="멀티캐스트" />
        </DsFilterField>
      </DsFilterRow>
      <template #actions>
        <DsButton type="neutral-outline" only-icon icon="line-rotate" @click="reset" />
        <DsButton type="primary" @click="search">조회</DsButton>
      </template>
    </DsFilterGroup>

    <section class="card body-card">
      <DsTableToolbar :total="total" :page-size="pageSize" :page="page" :total-pages="totalPages"
        @update:page-size="(s) => { pageSize = s; if (page > Math.ceil(total / s)) page = 1 }"
        @update:page="page = $event">
        <DsButton type="primary-outline" @click="newOpen = true">신규 입고 등록</DsButton>
      </DsTableToolbar>
      <AgGridWrapper
        class="grid"
        :column-defs="columnDefs" :row-data="rowData" :default-col-def="defaultColDef"
        :pagination="false"
        :height="`${40 + rowData.length * 44 + 2}px`"
        :row-selection="'multiple'" :suppress-row-click-selection="true"
        :header-height="40" :row-height="44"
        @grid-ready="(p) => p.api.sizeColumnsToFit()"
        @first-data-rendered="(p) => p.api.sizeColumnsToFit()"
      />
      <div class="pager-wrap"><DsPagination v-model="page" :total="total" :page-size="pageSize" /></div>
    </section>

    <TvAppInboundNewModal v-model="newOpen" />
    <TvAppInboundDetailModal v-model="detailOpen" :data="detailData" />
  </div>
</template>

<style scoped>
.page { flex: 1; min-width: 0; padding: 0 var(--ds-space-40); width: 100%; }
.page .card { min-width: 0; }
.mb { margin-bottom: var(--ds-space-24); }
.card { background: var(--ds-fill-gray-white); }
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
.grow { flex: 1 1 240px; min-width: 200px; }
.pager-wrap { display: flex; justify-content: center; margin-top: 0; padding-top: var(--ds-space-20); }
</style>
