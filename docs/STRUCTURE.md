# 폴더 구조 상세

이 문서는 각 폴더와 주요 파일의 역할을 설명합니다. 신규 합류자가 가장 먼저 읽어야 할 문서입니다.

## 사이트 그룹

본 저장소는 **두 사이트**를 한 코드베이스에 담습니다.

| 그룹 | 폴더 약칭 | 설명 | 화면 수 |
|---|---|---|---|
| Content Partner | `cp-con` | 로그인 + 1차 우선 12개 (콘텐츠 관리 위주) | 12 |
| KT FLOW1 | `kt-flow1` | 나머지 80개 (회원/파트너/통계/운영) | 80 |
| 공통 | `common` | 404 등 양쪽에서 쓰는 보조 화면/컴포넌트 | — |

`views/`, `components/`, `assets/`, `layouts/`, `router/`가 모두 이 그룹 규칙을 따릅니다.

## 루트

| 경로 | 설명 |
|---|---|
| `index.html` | Vite 엔트리 HTML. `<div id="app">`에 Vue 앱이 마운트됨. |
| `vite.config.js` | Vite 설정. `@` → `src/` alias, Vuetify plugin, dev 서버 포트. |
| `eslint.config.js` | ESLint Flat Config (Vue 3 + Prettier 호환). |
| `.prettierrc.json` | Prettier 포맷 규칙 (세미콜론 없음, single quote, 100 cols). |
| `.editorconfig` | 에디터 공통 인덴트/EOL 설정. |
| `.env.development` / `.env.production` | 환경 변수. |
| `deploy/` | 배포 산출물 (`Dockerfile`, `nginx.conf`, `.dockerignore`). 빌드 컨텍스트는 프로젝트 루트, Dockerfile만 `-f deploy/Dockerfile`로 지정. |
| `scripts/` | 유틸리티 스크립트 (`download-icons.py` — Figma 아이콘 일괄 다운로드). |
| `public/fonts/spoqa/` | Spoqa Han Sans Neo 5 weight 로컬 호스팅 (woff2 + woff). |
| `docs/images/` | Figma 시안 PNG 30+종 + README 매핑표. 작업 시 1:1 비교 기준. |

## `src/`

### `main.js`
앱 진입점. **반드시 이 순서**로 플러그인을 등록한다.
```
Pinia → Router → Vuetify → AG Grid 모듈 등록
```
Router 가드(`beforeEach`)가 Pinia 스토어에 접근하므로 Pinia가 먼저 등록되어야 한다.

### `App.vue`
루트 컴포넌트. `<v-app>`으로 Vuetify 컨텍스트를 제공하고, `<router-view/>`와 전역 알럿(`AppAlert`)을 렌더한다.

### `assets/`
이미지, 폰트 등 빌드에 포함되는 정적 자원.

| 경로 | 설명 |
|---|---|
| `assets/icons/` | DsIcon이 사용하는 SVG 아이콘 59종. `import.meta.glob`로 raw 문자열 로드 → `<span v-html>`로 인라인 렌더링 (URL 캐시 이슈 회피, currentColor 지원). |
| `assets/logo/` | 로고(kt, kt FLOW1) + 로그인 전용 아이콘 (guide/help). |
| `assets/fonts.css` | Spoqa Han Sans Neo `@font-face` 5개. |
| `assets/cp-con/`, `assets/kt-flow1/` | 사이트 전용 자산 (필요 시). |

### `styles/`
| 파일 | 설명 |
|---|---|
| `tokens.css` | **단일 진리원**. 컬러 122개 (Gray/Blue/LightBlue/Purple/Pink/Red × shade) + Typography + Spacing 18단계 + Radius 9단계 + Shadow + 컴포넌트 높이. Figma 변수 1:1 매핑. 화면 변경 시 이 파일만 수정하면 전 화면 반영. |

### `components/ds/`
**Design System 컴포넌트 40개**. [index.js](../src/components/ds/index.js)에서 일괄 export.

내부 구현은 **Vuetify 컴포넌트(VTextField, VTextarea, VCheckboxBtn, VDatePicker, VMenu 등)를 hidden style로 래핑** 후 DS 시안 visuals로 override. 외부 API는 DS prop 유지.

| 카테고리 | 컴포넌트 |
|---|---|
| Foundation | DsIcon |
| Buttons | DsButton, DsTextButton, DsSearchButton, DsCollapseButton, DsAddButton |
| Inputs | DsTextField, DsTextarea, DsInputPassword, DsSearch, DsSelect, DsSelectMenu, DsDatePicker, DsCalendar, DsCheckbox, DsRadio, DsRadioGroup, DsToggle, DsFileUpload, DsSearchLabel |
| Filter | DsFilterGroup, DsFilterRow, DsFilterField |
| Feedback | DsBadge, DsCountBadge, DsStatusBadge, DsTooltip, DsModal, DsUserPopup |
| Navigation | DsPagination, DsPageJump, DsBreadcrumb, DsPageHeader |
| Table/Detail | DsTableToolbar, DsTableHeader, DsTableCell, DsDetailHeader, DsDetailCell |

### `components/common/`
양 사이트에서 공통으로 사용하는 범용 UI 컴포넌트.

| 컴포넌트 | 역할 |
|---|---|
| `AppAlert.vue` | 전역 스낵바. `useAlert` composable과 연동. |
| `AgGridWrapper.vue` | AG Grid 공통 래퍼. JS Theming API(themeQuartz.withParams), `$attrs` 패스스루, 정렬 아이콘 SVG 직접 주입, 헤더 상단 라인 1px #949bb0, 정렬 라벨 가운데. 모든 그리드 사용 View(PlanManagementView, TvAppInboundView, HomeView)는 이 래퍼만 사용하며 컬럼은 `width` + `suppressSizeToFit`(고정) 패턴 + `@grid-ready/`@first-data-rendered`의 `sizeColumnsToFit()` 보험 호출로 가로 100% 채움. |

### `components/cp-con/`
Content Partner 사이트 전용 컴포넌트.

| 경로 | 역할 |
|---|---|
| `layout/GnbBar.vue` | CP-CON 상단 GNB (kt FLOW1 로고 + 벨/유저/로그아웃 + 하단 브랜드 그라데이션 라인). |
| `layout/LnbDrawer.vue` | CP-CON 좌측 메뉴 (1/2/3 Depth + 우측 Collapse 핸들). |
| `layout/AppFooter.vue` | CP-CON 하단 footer (KT 회사정보). |
| `common/PageHeader.vue` | DsPageHeader 래퍼. |
| `common/StatusBadge.vue` | DsStatusBadge 래퍼. |
| `modals/RightsContractSearchModal.vue` | 판권계약검색 (DsFilterGroup 대신 단일행 검색 영역, AgGridWrapper) |
| `modals/BatchUploadModal.vue` | 일괄 업로드 |
| `modals/NoticeRegisterModal.vue` | 통지 등록 (DsDetailHeader/Cell 폼 패턴) |
| `modals/SeriesSearchModal.vue` | 시리즈 조회 — 시리즈 단일 선택(라디오) + 선택 시리즈의 시즌 sub-table 인라인(체크박스 다중 선택). AG Grid Community master-detail 미지원이라 div 기반 커스텀 테이블 사용 (예외 케이스). |
| `modals/SingleSearchModal.vue` | 단편 조회 — 단일 선택 (AgGridWrapper) |
| `modals/TvAppInboundNewModal.vue` | TV앱 신규 입고 등록 |
| `modals/TvAppInboundDetailModal.vue` | TV앱 입고 상세 |

### 페이지 ↔ 모달 연관 관계

각 CP-CON View가 어떤 모달을 호출하는지 매핑.

| 페이지 (View) | 라우트 | 호출하는 모달 |
|---|---|---|
| `LoginView` | `/login` | — |
| `PlanManagementView` (신작 계획 관리) | `/plan` | `NoticeRegisterModal` (통지 등록) |
| `PlanContentNewSingleView` (단편 신작 계획 등록) | `/plan/new/single` | `RightsContractSearchModal` (판권계약검색), `SingleSearchModal` (단편 조회), `BatchUploadModal` (일괄 업로드) |
| `PlanContentNewSeriesView` (시리즈 신작 계획 등록) | `/plan/new/series` | `RightsContractSearchModal` (판권계약검색), `SeriesSearchModal` (시리즈 조회), `BatchUploadModal` (일괄 업로드) |
| `TvAppInboundView` (TV앱 입고 관리) | `/tv-app/inbound` | `TvAppInboundNewModal` (신규 입고 등록), `TvAppInboundDetailModal` (입고 상세) |
| `HomeView` (대시보드) | `/home` | — *(미완)* |

> 작업 리스트(`/work-list`)에서도 각 페이지 카드 안에 호출하는 모달 목록을 표시하므로, 새 모달을 추가/제거할 때는 `WorkListView.vue`의 `items[].modals` 배열과 이 표를 함께 갱신할 것.
| `modals/TvAppInboundDetailModal.vue` | TV앱 입고 상세 |

### `components/kt-flow1/` *(추후)*
KT FLOW1 사이트 전용 컴포넌트. 2차 작업 단계에서 GNB/LNB/Footer 및 도메인 컴포넌트 추가.

### `composables/`
Vue 3 Composition API 기반 재사용 로직.

| 파일 | 설명 |
|---|---|
| `useAlert.js` | 전역 알럿 상태와 `info/success/warning/error` 헬퍼. |

### `constants/`
앱 전반에서 사용하는 상수. `STORAGE_KEYS`, `APP_TITLE` 등.

### `layouts/`
페이지 레이아웃 컴포넌트. `<router-view/>`를 감싸는 셸 역할. **사이트별로 하나씩** 둔다.

| 파일 | 설명 |
|---|---|
| `CpConLayout.vue` | CP-CON 셸 — `components/cp-con/layout/`의 GNB+LNB+Footer 조합. |
| `KtFlow1Layout.vue` *(추후)* | KT FLOW1 셸. |

로그인/404 등은 레이아웃 없이 풀스크린으로 렌더.

### `plugins/`
외부 라이브러리 초기화 코드.

| 파일 | 설명 |
|---|---|
| `vuetify.js` | Vuetify 인스턴스 생성. **테마 색상 변경은 여기서**. |
| `agGrid.js` | AG Grid Community 모듈 일괄 등록. |

### `router/`
| 파일 | 설명 |
|---|---|
| `index.js` | 라우트 정의 + 인증 가드. **사이트별로 배열을 분리**(`cpConRoutes` / `ktFlow1Routes` / `commonRoutes`)해서 결합. `meta.public: true`가 아니면 로그인 필요. 미존재 경로는 `NotFoundView`로 fallback. |

### `services/`
HTTP 통신 모듈. **이 폴더는 백엔드 인계 시 사용되도록 준비된 스켈레톤이다.**

| 파일 | 설명 |
|---|---|
| `http.js` | axios 인스턴스. `VITE_API_BASE_URL`, JWT 헤더, 401 핸들링. |

도메인별 API 모듈(`auth.js`, `content.js` 등)을 추가하는 방식:
```js
// services/auth.js
import http from './http'
export const login = (payload) => http.post('/auth/login', payload)
```

### `stores/`
Pinia 스토어.

| 파일 | 설명 |
|---|---|
| `index.js` | Pinia 인스턴스 export. |
| `auth.js` | 로그인 세션 (`user`, `token`) + localStorage 동기화. |

### `utils/`
순수 함수 유틸. Vue/Pinia 의존 없는 헬퍼.

| 파일 | 설명 |
|---|---|
| `format.js` | `formatDate`, `formatNumber`. |

### `views/`
라우트 단위 화면 컴포넌트. 파일명은 `XxxView.vue` 규칙. **사이트별 하위 폴더로 분리**한다.

| 경로 | 설명 |
|---|---|
| `views/cp-con/LoginView.vue` | 로그인 (Content Partner 인입). |
| `views/cp-con/HomeView.vue` | 샘플 대시보드. |
| `views/cp-con/PlanManagementView.vue` | 신작 계획 관리 (목록). |
| `views/cp-con/PlanContentNewSingleView.vue` | 단편 신작 계획 등록. |
| `views/cp-con/PlanContentNewSeriesView.vue` | 시리즈 신작 계획 등록. |
| `views/cp-con/TvAppInboundView.vue` | TV앱 입고 관리. |
| `views/cp-con/...` *(추후)* | 통지/정산/통계 등 나머지 5개. |
| `views/common/WorkListView.vue` | 작업 리스트 (개발 진행 현황). |
| `views/common/StyleGuideView.vue` | 스타일 가이드 (`/style-guide` — Ds 컴포넌트 라이브 데모). |
| `views/common/NotFoundView.vue` | 404. |

## `docs/`

| 파일 | 설명 |
|---|---|
| `STRUCTURE.md` | (현재 문서) 폴더/파일 역할 상세. |
| `DEVELOPMENT.md` | 화면 추가, 컨벤션, 공통 컴포넌트 사용법. |
| `DEPLOYMENT.md` | Docker 빌드 및 Azure 배포 절차. |

## Import 규칙

`@` alias로 `src/`를 가리킨다. 상대경로(`../../`) 대신 alias 사용 권장.

```js
import GnbBar from '@/components/common/GnbBar.vue'
import { useAuthStore } from '@/stores/auth'
import http from '@/services/http'
```
