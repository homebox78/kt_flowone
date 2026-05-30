# 개발 가이드

## 0. 핵심 규칙 (Single Source of Truth)

**모든 화면은 DS(Design System)만 사용해서 작성한다. hex/px 하드코딩 금지, raw HTML form/button 금지.**

1. CSS 값은 `var(--ds-*)` 토큰만 사용 ([src/styles/tokens.css](../src/styles/tokens.css))
2. 입력/버튼/모달/뱃지는 `<DsButton>`, `<DsTextField>`, `<DsSelect>` 등 Ds 컴포넌트만 사용 ([src/components/ds/](../src/components/ds/))
3. 작업 전 `/style-guide` 페이지에서 컴포넌트 확인
4. 시안 변경 시 → `tokens.css` 또는 해당 Ds 컴포넌트 수정 → 전 화면 자동 반영

## 1. 코드 컨벤션

- **언어**: JavaScript (TypeScript 미사용 — 견적 합의 사항).
- **Vue 작성 스타일**: `<script setup>` + Composition API.
- **컴포넌트 파일명**: `PascalCase.vue` (예: `LoginView.vue`, `DsButton.vue`).
- **포맷**: Prettier (`npm run format`) — 세미콜론 없음, single quote, 100 cols.
- **린트**: ESLint (`npm run lint`) — 커밋 전 권장.
- **Import 경로**: `@/...` alias 사용. 상대경로 다단계(`../../../`) 금지.
- **사이트 그룹**: 모든 화면/컴포넌트/자산은 `cp-con` (1차 12개) / `kt-flow1` (나머지) / `common` (양쪽 공유) 중 하나에 속한다.
- **컴포넌트 디렉토리 규칙**:
  - DS 컴포넌트(전 사이트 공통): `src/components/ds/Ds*.vue` ([index.js](../src/components/ds/index.js)에서 export)
  - 양 사이트 공통(알럿, 그리드 래퍼 등): `src/components/common/`
  - CP-CON 화면 셸(GNB/LNB/Footer): `src/components/cp-con/layout/`
  - CP-CON 공통 래퍼(PageHeader 등): `src/components/cp-con/common/`
  - CP-CON 모달: `src/components/cp-con/modals/`
  - CP-CON 도메인 전용: `src/components/cp-con/<도메인>/`
  - KT FLOW1 컴포넌트: `src/components/kt-flow1/...` *(추후)*
  - 화면 단위(라우트): `src/views/<site>/XxxView.vue`

## 1-1. Vuetify 사용 정책

Vuetify는 **Ds 컴포넌트의 내부 엔진**으로만 사용. 화면에서 `VTextField`, `VSelect` 등을 직접 import하지 않는다.

- Ds 컴포넌트(예: `DsTextField`) 내부에서 `VTextField`를 wrapping + DS visuals로 override
- 외부에서 보이는 API는 DS prop 유지: `size`, `error`, `helper`, `clearable` 등
- 새 Ds 컴포넌트 추가 시 Vuetify 컴포넌트가 있으면 우선 활용, 없으면 직접 구현

## 2. 신규 화면 추가하기

예) "신작 계획 관리" 화면을 추가한다고 가정.

### 2-1. View 컴포넌트 생성

`src/views/cp-con/PlanManagementView.vue` *(1차 우선 12개에 속하므로 cp-con 하위)*

```vue
<script setup>
import { ref } from 'vue'
import {
  DsPageHeader, DsFilterGroup, DsFilterRow, DsFilterField,
  DsSelect, DsTextField, DsButton, DsPagination, DsTableToolbar,
} from '@/components/ds'
import AgGridWrapper from '@/components/common/AgGridWrapper.vue'

const filters = ref({ scope: '전체', keyword: '' })
const rowData = ref([])
</script>

<template>
  <DsPageHeader title="신작 계획 관리" :breadcrumb="['홈', '콘텐츠 관리', '신작 계획 관리']" />

  <DsFilterGroup>
    <DsFilterRow>
      <DsFilterField label="검색" grow>
        <div style="width: 180px">
          <DsSelect v-model="filters.scope" :options="['전체','제목']" />
        </div>
        <DsTextField v-model="filters.keyword" placeholder="검색어 입력" />
      </DsFilterField>
    </DsFilterRow>
    <template #actions>
      <DsButton type="primary">조회</DsButton>
    </template>
  </DsFilterGroup>

  <AgGridWrapper :column-defs="[]" :row-data="rowData" />
</template>

<style scoped>
/* hex 직접 사용 금지 — var(--ds-*) 만 */
.section { background: var(--ds-fill-gray-white); padding: var(--ds-space-24); }
</style>
```

> **페이지 하단 여백 규칙**: 화면 루트(`.page`/`.plan` 등)에 **`padding-bottom`을 주지 않는다**. 콘텐츠↔푸터 간격은 공용 푸터(`AppFooter`)의 `padding-top: 40px`이 담당한다(시안 ≈40px). 페이지에 하단 padding을 추가하면 푸터 top padding과 겹쳐 80px로 벌어진다. 여러 카드를 쌓는 화면은 마지막 카드의 `margin-bottom`도 `:last-child`로 0 처리.

### 2-2. 라우트 등록

`src/router/index.js`의 `cpConRoutes` 배열에서 `CpConLayout` children에 추가.

```js
{
  path: 'plan',
  name: 'PlanManagement',
  component: () => import('@/views/cp-con/PlanManagementView.vue'),
  meta: { title: '신작 계획 관리' },
},
```

### 2-3. LNB 메뉴 연결

`src/components/cp-con/layout/LnbDrawer.vue`의 메뉴 트리에서 해당 항목의 `to` 값을 `/plan`으로 변경.

> **그룹 자동 펼침**: LNB는 현재 라우트(`route.path`)를 watch해 활성 메뉴가 속한 1뎁스 그룹(+2뎁스 하위그룹)을 자동으로 펼치고 활성 표시한다(`syncOpenWithRoute`). 펼침만 추가하고 닫지는 않으므로 사용자가 직접 연 다른 그룹은 유지된다. LNB에 없는 라우트로 가면 `initialOpen` 그룹을 기본 펼친다. 따라서 새 화면을 추가할 때 `to`만 정확히 연결하면 해당 화면 진입 시 그룹이 알아서 열린다.

## 3. 공통 컴포넌트 사용법

### AgGridWrapper

```vue
<AgGridWrapper
  :column-defs="cols"
  :row-data="rows"
  height="600px"
  :pagination="true"
  :page-size="50"
/>
```

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `columnDefs` | Array | 필수 | AG Grid 컬럼 정의 |
| `rowData` | Array | `[]` | 데이터 행 |
| `defaultColDef` | Object | `{sortable, resizable, filter}` | 컬럼 기본 옵션 |
| `height` | String | `'500px'` | 그리드 높이 (`dom-layout="autoHeight"` 사용 시 무시됨) |
| `pagination` | Boolean | `true` | 페이지네이션 사용 |
| `pageSize` | Number | `20` | 페이지당 행 수 |

추가 AG Grid 옵션(`rowSelection`, `suppressRowClickSelection`, `headerHeight`, `rowHeight`, `autoSizeStrategy`, `@grid-ready` 등)은 `v-bind="$attrs"` 패스스루로 그대로 내부 `AgGridVue`에 전달된다. 예:

```vue
<AgGridWrapper
  :column-defs="cols" :row-data="rows"
  :pagination="false"
  :row-selection="'multiple'" :suppress-row-click-selection="true"
  :header-height="40" :row-height="44"
/>
```

**그리드 내부 요소 스타일링 — scope-id 함정 (중요)**: AgGridWrapper는 `inheritAttrs:false`라서 부모가 넘긴 `class`(예: `stat-grid`)가 fallthrough되지 않고 `v-bind="$attrs"`로 **내부 AgGridVue 요소**에 붙는다. 이 내부 요소에는 AgGridWrapper의 scope id만 있고 **부모 화면의 scope id는 닿지 않는다**. 따라서 부모 화면의 scoped 스타일에서 `.stat-grid :deep(.ag-cell)`처럼 그 클래스를 **prefix로** 쓰면 `.stat-grid[data-v-부모] ...`로 컴파일돼 **절대 매칭되지 않는다**(합계 행 배경색이 안 먹던 원인).
- ✅ prefix 없이 `:deep(.ag-row-pinned)`만 쓴다 → `[data-v-부모] .ag-row-pinned`로 컴파일되고, AgGridWrapper 루트(`.ds-grid`)·화면 루트(`.page`)가 부모 scope id를 갖고 있어 자손으로 매칭된다.
- 전 그리드 공통 스타일은 AgGridWrapper 안에서 `.ds-grid :deep(...)`로 둔다(래퍼 자신의 scope id라 안전).

**전 그리드 공통 규칙 (AgGridWrapper 내장 — 모든 페이지 자동 적용)**:
- **헤더 가운데 정렬**: 일반 헤더 `.ag-header-cell-label` + 그룹(다단) 헤더 `.ag-header-group-cell-label` 모두 `justify-content:center`.
- **합계 행 강조**: 시안 gray-300(`#d3d8e4`) 배경 + 볼드(`--ds-fw-bold`) + 검정 텍스트. 합계 행 표기는 두 방식 모두 지원하므로 **화면에서 별도 스타일 작성 불필요**, 둘 중 하나만 쓰면 자동 적용된다:
  - ① `:pinned-bottom-row-data="totalRow"` (pinned bottom 행 → `.ag-row-pinned`)
  - ② `:get-row-class="(p) => (p.data?._total ? 'row-total' : '')"` (일반 행에 `row-total` 클래스)
  - ⚠️ 볼드/색은 행이 아니라 **셀(`.ag-cell`)에 `!important`로** 걸어야 테마의 `.ag-cell` 색 규칙을 이긴다(행 단위로는 밀림).
- **숫자 천 단위(,) 포맷**: AgGridWrapper가 leaf 컬럼마다 `valueFormatter`를 자동 주입해 **`typeof number` 인 셀 값에만** 천 단위 구분기호를 넣는다(`injectNumberFormatter`). 문자열(ID·날짜·`'5,000'`처럼 이미 포맷된 값)과 `cellRenderer`/`valueFormatter`가 이미 있는 컬럼은 건드리지 않는다. 페이지에서 별도 포맷 불필요.
  - ⚠️ `defaultColDef.valueFormatter`로 주면 **pinned(합계) 행에 누락**되는 케이스가 있어, 컬럼에 직접 주입하는 방식을 쓴다. 숫자형 ID에 콤마가 들어가면 안 되는 컬럼은 데이터를 **문자열로** 두거나 컬럼에 자체 `valueFormatter`를 지정해 우회.
  - **번호(순번) 컬럼은 콤마 제외**: 콤마는 금액·통계 숫자용. `field`가 `no/num/seq/idx/index/rownum`이거나 `headerName`이 `번호/순번/No`면 `isNumberingCol`이 걸러 포맷을 주입하지 않는다(번호는 콤마 없이 표시).
- **데이터 없음 공통 표시**: 행이 없으면 AgGridWrapper의 `overlayNoRowsTemplate` 기본값(아이콘 + "검색 결과가 없습니다.")이 그리드 본문 중앙에 표시된다. 페이지가 `overlay-no-rows-template`를 직접 주면 그 값이 우선.
  - **AgGrid 가 아닌 커스텀 div 테이블**(일괄 업로드 미리보기, 추가된 콘텐츠 등)은 공통 컴포넌트 `components/common/EmptyResult.vue`를 빈 상태에 렌더한다: `<EmptyResult v-if="!rows.length" />`. AgGrid 오버레이와 동일한 아이콘·문구.

**테마**: AG Grid 35 JS Theming API (`themeQuartz.withParams(...)`). 시안 라인 색/패딩/높이/폰트는 래퍼 내부에서 적용. `ag-grid-overrides.css`는 JS 테마와 CSS 변수 충돌로 비활성 상태(`plugins/agGrid.js`). 정렬 아이콘은 일부 환경에서 mask-image 주입이 누락되므로 래퍼 스타일에 SVG `mask-image`를 직접 주입해 안정화.

**가로 100% 채우기 — Flexbox `min-width: auto` 함정 (가장 중요)**:
AG Grid가 컨테이너를 넘쳐도 스크롤이 안 생기는 경우, 진짜 범인은 부모 flex 자식의 `min-width` 기본값(`auto`)이다. flex 자식은 콘텐츠보다 작게 줄어들지 않으므로 그리드가 부풀면 `.plan` 같은 컨테이너가 같이 부풀어 화면을 넘는다.

해결: 그리드를 품는 flex 자식에 모두 `min-width: 0`을 명시. AG Grid 옵션을 만지기 전에 이걸 먼저 확인할 것.
```css
.plan       { flex: 1; min-width: 0; }
.body-card  { display: flex; flex-direction: column; min-width: 0; overflow: hidden; }
.ds-grid    { width: 100%; min-width: 0; overflow: hidden; }  /* AgGridWrapper 내부에 적용됨 */
```

**AG Grid 35 컬럼 너비 옵션**:
- `defaultColDef`에 `flex`를 두면 `width`만 설정된 고정 컬럼에도 침투해 비율 계산이 꼬인다. defaultColDef에서는 `flex`를 빼는 편이 안전.
- 절대 안 늘어나야 할 고정 컬럼은 `width` + `suppressSizeToFit: true`.
- **가로 스크롤이 필요한 경우 `sizeColumnsToFit()` 호출 금지** — 이 API는 컬럼을 컨테이너 폭에 맞춰 축소하므로 가로 스크롤이 영원히 안 생긴다. 대신 가변 텍스트 컬럼 1개에 `flex: 1, minWidth: <시안 폭>`을 부여하면 ① 컨테이너가 넓을 때 100% 채움, ② 컨테이너가 좁아져 컬럼 합을 넘으면 자동으로 가로 스크롤 발생.
  ```js
  // 예: PlanManagementView 패턴
  { field: 'itemName', headerName: '아이템명', minWidth: 220, flex: 1 },  // 가변
  { field: 'genre', headerName: '장르', width: 140 },                       // 고정
  ```
- `autoSizeStrategy`와 `colDef.flex`는 함께 쓸 수 없다.

**행 높이 동적 조절**: 페이지 사이즈에 따라 카드도 늘어나야 하는 화면은 `height`를 동적으로 계산해서 넘긴다 — `:height="`${40 + rowData.length * 44 + 2}px`"`.

**세로 스크롤 없이 전체 행 노출 — `dom-layout="autoHeight"` (권장)**: 행 수만큼 그리드가 늘어나 내부 세로 스크롤이 절대 생기지 않게 하려면 고정 `height` 대신 `dom-layout="autoHeight"`를 넘긴다. 래퍼가 이 속성을 감지해 컨테이너 height 를 `auto`로 두므로 헤더+전체 행+pinned 합계 행이 모두 보인다(페이지네이션 off + 행 수가 적은 통계 표에 적합). 높이 px 계산이 불필요해 **다단 헤더 높이 오산(아래) 같은 실수를 원천 차단**한다.
```vue
<AgGridWrapper :column-defs="cols" :row-data="rows" :pagination="false" dom-layout="autoHeight" />
```
> ⚠️ **다단 헤더 height 오산 함정**: `height`를 px로 직접 계산할 때 헤더 단수를 빠뜨리기 쉽다. 예) `영상 > GTV/GTM > SD/HD/...`는 헤더가 **3단(=3 × headerHeight)**인데 `80(=2단)`만 더하면 한 단(40px)이 모자라 세로 스크롤이 생긴다. 다단 헤더 표는 `dom-layout="autoHeight"`를 쓰거나, 헤더 단수를 정확히 세어 `단수 × headerHeight + 행수 × rowHeight + (pinned 행)`로 계산할 것.

> Community 버전 기준이므로 Range Selection, Set Filter 등 Enterprise 기능은 사용할 수 없다.

**다단(그룹) 헤더 + 셀 병합(rowSpan)** — 통계 표(예: 판매이용통계 `StatsSalesView`):
- **그룹 헤더**: `columnDefs`에 `{ headerName: '해상도', children: [...] }`처럼 children을 중첩하면 헤더가 다단으로 쌓인다. children에 leaf 컬럼과 또 다른 그룹(`GTV`/`GTM`)을 섞으면, leaf 컬럼 헤더는 자동으로 아래 행까지 세로로 span된다(최상위 leaf인 `단편명/단편ID/기간`도 헤더 전체 높이로 span). 컨테이너 높이 = `헤더단수 × headerHeight + 행수 × rowHeight`로 계산 (`:group-header-height` = `:header-height`).
- **셀 세로 병합**: AG Grid Community `colDef.rowSpan` 사용. 그리드에 `:suppress-row-transform="true"` 필수(`$attrs` 패스스루). rowSpan 콜백은 그룹 첫 행에서 병합 행수, 나머지 행/합계 행에서 `1`을 반환. 병합 셀은 흰 배경 `cellStyle`로 아래 셀을 덮어 한 칸처럼 보이게 한다. 데이터는 첫 행에만 값을 두고 나머지는 빈 문자열로 둔다.
  ```js
  function nameRowSpan(p){ const d=p.data; if(!d||d._total) return 1; return d._spanFirst ? d._span : 1 }
  { field:'title', rowSpan:nameRowSpan, cellStyle:()=>({background:'var(--ds-fill-gray-white)'}) }
  ```

### 신작 계획 등록/상세/수정 — mode 재사용 패턴

상세·수정 화면은 **별도 View가 아니라** 등록 View(`PlanContentNewSingle/SeriesView`)를 `mode`로 재사용한다.
- 라우트 `meta.mode`로 주입: `plan/single/:id`(detail), `plan/single/:id/edit`(edit), 시리즈 동일. mode 미지정 = `register`.
- View에서 `const mode = computed(() => route.meta.mode || 'register')`. `pageTitle`·`crumbLast`·푸터 버튼을 mode로 분기.
- **detail**: `<section class="card" :class="{ 'is-readonly': isDetail }">`. `.is-readonly`가 모든 입력(`.v-field`)의 보더/배경을 투명화 + `pointer-events:none`로 평문화하고, 편집 액션(검색·추가·초기화·+/- 등)을 `display:none`. 추가로 **반려사유** 섹션 표시, 푸터는 `목록/수정`(수정→edit 라우트).
- **edit**: 등록과 동일한 편집 폼, 푸터 `목록/임시저장/승인요청`.
- **승인요청**: 푸터 승인요청 버튼 → `ApprovalRequestModal`(코멘트 textarea, 시안 59-15484).
- 신작 계획 관리 목록의 아이템명 셀 클릭 → 단편/시리즈 상세 라우트로 이동(`openDetail`). 작업목록(WorkList)에도 상세/수정 subPage 링크 제공.
- ⚠️ detail의 평문화는 CSS 기반 근사치 — 셀렉트 chevron/데이트 아이콘 등 일부 컨트롤은 남을 수 있음(읽기전용 동작에는 영향 없음).

### 등록 페이지 어셋/콘텐츠 테이블 패턴

단편/시리즈 신작 계획 등록의 "어셋 유형 설정"·"추가된 콘텐츠" 테이블은 편집 셀이 많고 nested sub-row가 필요해 AgGridWrapper 대신 div 기반 커스텀 테이블을 쓴다 ("목록은 AgGridWrapper" 규칙의 예외).

**공통 클래스**:
- `.c` — 셀 base (`display: flex; align-items: center; justify-content: center`)
- `.w-NN` — 셀 폭(px), 모두 `flex-shrink: 0`
- `.at-head` / `.add-head` — 헤더 (blue-50 bg), `white-space: nowrap`
- `.at-row` / `.add-row` — 행, 인풋은 모두 `width: 100%`
- 셀 우측 1px gray-200 세로 라인 (마지막 셀 제외), 행 하단 가로 라인

**Header-Group** (시안의 "포스터/자막/영상" 같이 2단 헤더):
```vue
<span class="c-group w-239">
  <div class="c-group__top req">포스터</div>
  <div class="c-group__bottom">
    <span class="c w-120 req">파일명</span>
    <span class="c w-119 req">파일</span>
  </div>
</span>
```
헤더 행 높이 80px (`min-height`), 단일 컬럼 셀은 `align-self: stretch`로 동일 높이 — 세로 라인이 위→아래 끊김 없이 이어지게.

**`.file-chip` (첨부 파일 표시)**: 흰 bg + gray-300 보더 + 클립 SVG + 파일명(ellipsis) + 회색 원형 X 버튼. 파일 미첨부 시 `<DsButton type="primary-outline" size="small">업로드</DsButton>` 표시.

**`.ep-btn` (+/- 행 액션 버튼)**: 24×24 원형. `.ep-btn--add` blue-500 / `.ep-btn--del` red-300, 흰색 SVG 아이콘.

**숫자 셀 우측 정렬**: `.cell-num :deep(input) { text-align: right }`로 금액(공급가격/판매가격) 인풋 우측 정렬.

**가로 스크롤**: 테이블을 감싸는 wrap에 `overflow-x: auto`, 내부 테이블에 `min-width: <전체 컬럼 폭>px`을 명시해 부족하면 스크롤 발생.

### 라우터 인증 가드

`meta.public: true`인 라우트만 비로그인 접근 가능. CP-CON 콘텐츠 라우트(`/plan`, `/plan/new/single`, `/plan/new/series`, `/tv-app/inbound`)는 작업 리스트(WorkList)에서 로그인 없이 데모 접근이 가능하도록 `public: true` 부여한 상태. 실제 운영 배포 전엔 이 flag를 제거하고 인증 흐름을 통합해야 한다.

### WorkList 사이트 분기 구조

`WorkListView.vue`의 데이터는 **사이트(코드베이스 그룹) 단위로 분기**된 `sites` 배열이다. 각 사이트는 상단 구분선 + 사이트 칩 + 카운트로 묶여 표시된다.
- `common` (공통) — 양 사이트 공통. 스타일 가이드 등.
- `cp-con` (CP Site) — Content Partner, 1차 작업. **CP Site 사이드(LNB) 메뉴 구조 그대로** section을 구성: 진입(로그인) / 콘텐츠 관리(신작계획 관리·TV앱 입고 관리·통지 목록 관리·정산서 관리) / 현황·통계(콘텐츠 통계·판매이용통계) / 회원정보(파트너정보 관리·CP정보 관리·사용자 관리) / 가이드(CP길라잡이). 메뉴 추가/변경 시 LNB와 이 목록을 함께 맞춘다.
- `kt-flow1` (KT FLOW1) — 2차 작업, 약 80개 화면 예정. **피그마 시안 미정**이라 단일 '예정' 카드만 두고 카운트는 `countLabel: '?'`로 표시. 시안 확정 시 section/items 추가.

각 사이트는 `{ key, label, desc, tone, sections, countLabel? }` 구조이며, `sections[].items`가 화면 카드다. `item.subPages`(등록/상세/수정 등 하위 화면)는 카드 안에서 **클릭 가능한 링크**로 렌더된다(예: 신작계획 관리 → 단편/시리즈 등록). `item.modals`는 비링크 텍스트 목록. 진행률(상단 카드)은 KT FLOW1을 제외한 카운트 가능한 화면 기준.

### WorkList 상태값

`status: 'done' | 'wip' | 'todo'` 3가지로 화면별 진행 상태를 표시:
- `done` — 완료 (체크 아이콘, hover 시 클릭 가능)
- `wip` — 작업중 (시계 아이콘 + 노랑 보더 `#ffb74d` + 배경 `#fff8e6`)
- `todo` — 대기 (회색, 클릭 비활성)

클릭 핸들러는 `router.push(item.to)`로 현재 탭에서 이동 (이전엔 `target="_blank"` + href로 새 탭, 로그인 가드에 걸렸음).

### 토글/펼침 애니메이션 규칙

모든 펼침/접힘 UI는 instant `display: none` 대신 **부드러운 트랜지션**을 적용한다.
- **width 변화** (LNB 등): `transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1)`
- **텍스트/아이콘 페이드**: `display: none` 대신 `opacity 0 + pointer-events: none`
- **가변 height 펼침** (LNB 서브메뉴): Vue `<Transition>` + `@enter/@leave` 훅에서 `scrollHeight`를 측정해 `height` 트랜지션 (`LnbDrawer.vue`의 `onEnter/onLeave` 패턴 참조)
- **DsFilterGroup 3줄 토글은 애니메이션 없이 instant `display: none`** — 행이 한꺼번에 사라지면서 덜그럭거리는 시각적 노이즈가 더 큼.

#### DsFilterGroup 펼침 아이콘(˅) 노출 조건 — 시안 4:15159 "Search Area"

펼침/접힘 토글은 **행이 접힘 표시 행 수(`visibleRows`, 기본 2)보다 많을 때만** 노출한다. 즉 1·2줄짜리 검색 영역에는 아이콘이 없고, **3줄 이상에서만** ˅/˄ 토글이 나타나며 접으면 2줄까지 보인다(시안 "1줄일때 / 2줄일때 / 3줄이상 접힘·전체" 변형과 1:1).
- 구현: `DsFilterGroup`이 기본 슬롯의 행(`DsFilterRow`) vnode 수를 세어(`countRows`, 주석·공백 텍스트 제외, v-for 프래그먼트 펼침) `rows > visibleRows`일 때만 `DsCollapseButton`을 렌더.
- **행 = 1 DsFilterRow 규칙**: 한 시각적 행은 반드시 `DsFilterRow` 하나로 만든다. 한 `DsFilterRow`에 3개 이상 필드를 넣으면 grid(2열)가 줄바꿈되며 `gap`(가로 60px)이 세로에도 적용돼 행 사이에 60px 공백이 생긴다. `DsFilterRow`의 간격은 `column-gap`(가로 전용)으로만 적용하고, 행 간 간격은 `DsFilterGroup` body의 8px가 담당한다.

### Detail Form (등록 폼 4열 패턴)

신작 계획 등록 같은 입력 폼은 `DsDetailHeader`(160px blue-50) + `DsDetailCell`(white) × 4열 그리드로 구성. 한 줄 전체로 늘리려면 row에 `df-row--full` 추가해 cell이 3컬럼 span.

**높이 통일**: 폼 안의 인풋/셀렉트/데이트픽커는 모두 default(`size` 미지정 = medium = 34px)로 두어야 좌측 셀의 세로 중심과 정렬됨. `size="small"`(28px)을 쓰면 세로 정렬이 깨짐.

**나란히 배치되는 버튼도 medium**: 카드 상단 `판권계약검색` / `일괄등록 양식다운로드` 같이 폼과 같은 시각 라인에 놓이는 버튼은 `size="medium"`(34px)로 통일.

```vue
<div class="detail-form">
  <div class="df-row">
    <DsDetailHeader text="단편명" essential />
    <DsDetailCell><DsTextField v-model="form.title" /></DsDetailCell>
    <DsDetailHeader text="수급 카테고리" essential />
    <DsDetailCell><DsSelect v-model="form.cat" :options="cats" /></DsDetailCell>
  </div>
  <div class="df-row df-row--full">
    <DsDetailHeader text="시놉시스" />
    <DsDetailCell><DsTextarea v-model="form.synopsis" :rows="5" /></DsDetailCell>
  </div>
</div>

<style>
.detail-form { display: grid; grid-template-columns: 160px 1fr 160px 1fr; border-top: 1px solid var(--ds-border-gray-200); }
.df-row { display: contents; }
.df-row--full > :nth-child(2) { grid-column: 2 / 5; }
</style>
```

### DsButton 아이콘 사이즈 커스텀

DsButton의 size별 기본 아이콘 크기(xl 14 / large 12 / medium 10 / small 8)와 시안 요구가 다른 경우, 버튼에 클래스를 부여하고 `:deep(.ds-icon)`으로 width/height만 오버라이드.

```vue
<DsButton type="neutral-outline" size="medium" icon-right="line-search" class="btn-rights">판권계약검색</DsButton>

<style scoped>
.btn-rights :deep(.ds-icon) { width: 17px !important; height: 17px !important; }
</style>
```

### 전역 알럿

```vue
<script setup>
import { useAlert } from '@/composables/useAlert'
const alert = useAlert()

function onSave() {
  alert.success('저장되었습니다.')
  alert.error('저장 실패: 네트워크 오류')
  alert.warning('필수 입력값을 확인하세요.', 5000) // 두번째 인자: 노출 시간(ms)
}
</script>
```

## 4. API 모듈 작성 (인계용 가이드)

> 본 프로젝트의 견적 범위는 API 연동을 포함하지 않습니다. 아래는 백엔드 팀 인계 시 참고용입니다.

### 4-1. 도메인 모듈 추가

`src/services/auth.js`

```js
import http from './http'

export const authApi = {
  login: (body) => http.post('/auth/login', body),
  logout: () => http.post('/auth/logout'),
  me: () => http.get('/auth/me'),
}
```

### 4-2. View에서 사용

```vue
<script setup>
import { authApi } from '@/services/auth'
import { useAuthStore } from '@/stores/auth'
import { useAlert } from '@/composables/useAlert'

const auth = useAuthStore()
const alert = useAlert()

async function onSubmit() {
  try {
    const { data } = await authApi.login({ id, password })
    auth.setSession(data)
  } catch (e) {
    alert.error(e.response?.data?.message ?? '로그인 실패')
  }
}
</script>
```

## 5. 라우터 인증 가드

기본 동작: `meta.public: true`가 아닌 모든 라우트는 로그인 필요.
- 비로그인 상태로 보호 라우트 진입 시 `/login?redirect=원래경로`로 이동.
- 공개 라우트(예: 로그인, 404)는 `meta: { public: true }` 명시.

## 6. Vuetify 테마 변경

`src/plugins/vuetify.js`에서 변경.

```js
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1A73E8',     // KT 브랜드 색상으로 교체
          secondary: '#6B7280',
        },
      },
    },
  },
})
```

## 7. 환경 변수 추가

1. `.env.development`, `.env.production`에 `VITE_*` 접두어로 추가.
2. 사용:
   ```js
   const url = import.meta.env.VITE_MY_NEW_VAR
   ```

> `VITE_` 접두어가 없는 변수는 클라이언트 코드에 노출되지 않는다 (Vite 정책).

## 8. 자주 묻는 문제

### 빌드 결과 청크가 500KB 이상이라는 경고
Vuetify 전체 번들 크기 때문이며 정상이다. 필요 시 `vite.config.js`의 `build.chunkSizeWarningLimit`를 조정.

### Vuetify 컴포넌트가 스타일 없이 출력됨
`src/App.vue`가 `<v-app>`으로 감싸졌는지, `main.js`에서 `.use(vuetify)`가 호출됐는지 확인.

### 라우트 이동 시 LNB 메뉴가 사라짐
라우트가 `DefaultLayout`의 children으로 등록되지 않은 경우. `src/router/index.js` 확인.

### 페이지 전환 시 가로폭이 갑자기 좁아짐(레이아웃 점프)
실제 세로 스크롤러는 `#app`(`height:100%` + `overflow-x:hidden` → `overflow-y:auto`). 내용이 긴 페이지는 스크롤바(약 15px)가 생겨 콘텐츠 폭이 줄고, 짧은 페이지는 안 줄어 전환 시 폭이 출렁인다. `src/style.css`에서 `#app { scrollbar-gutter: stable }`로 스크롤바 공간을 항상 예약해 해결. **이 속성은 반드시 실제 스크롤러(#app)에만** 두기 — `html/body`에도 같이 주면 거터가 이중(약 30px) 예약되어 폭이 더 줄어든다.
