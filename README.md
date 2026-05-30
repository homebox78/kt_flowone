# KT FLOW1 CP Site — Frontend

KT FLOW1 CP(콘텐츠 파트너) 운영 사이트의 Vue 3 + Vite 프론트엔드.

> **납품 범위**: 프론트엔드 마크업/구성 (견적 Q-20260526-001). 백엔드 API·서버 통신·비즈니스 로직은 범위 외 — 인계용 스켈레톤(`src/services/http.js`, `src/stores/auth.js`)만 포함.

## 1. 기술 스택

| 분류 | 기술 |
|---|---|
| 프레임워크 | Vue 3 (`<script setup>`) + Vite 8 |
| UI / 그리드 | Vuetify 3 (Ds 컴포넌트 내부 엔진) · AG Grid Community 35 |
| 디자인 시스템 | `src/styles/tokens.css` (토큰) + `src/components/ds/` (Ds 컴포넌트 40종) |
| 라우팅 / 상태 / HTTP | Vue Router 4 · Pinia · Axios |
| 폰트 | Spoqa Han Sans Neo (로컬 호스팅) |
| 언어 / 품질 | JavaScript (TS 미사용) · ESLint + Prettier |
| 배포 / 브라우저 | Docker → Azure Container · Chrome 데스크탑 |

## 2. 실행

```bash
npm install
npm run dev      # 개발 서버 http://localhost:5173
npm run build    # 프로덕션 빌드 → dist/
```

- Node.js 20+ (권장 22 LTS)

## 3. 환경 변수

| 변수 | 설명 |
|---|---|
| `VITE_API_BASE_URL` | 백엔드 API 베이스 URL |
| `VITE_APP_TITLE` | 앱 제목 |

- `.env.development`(dev) / `.env.production`(build) / `.env.local`(개인 override, git 제외)

## 4. 구조

**두 사이트**를 한 코드베이스에 포함. 폴더·라우트 모두 그룹별 분리.

| 그룹 | 약칭 | 설명 | 작업 단계 |
|---|---|---|---|
| Content Partner 사이트 | **cp-con** | 로그인 + 1차 우선 12개 화면 (콘텐츠 관리 위주) | 현재 진행 중 |
| KT FLOW1 사이트 | **kt-flow1** | 나머지 68개 화면 (회원/파트너/통계/운영 등) | 2차 작업 예정 |
| 공통 | **common** | 양쪽 공통 화면/컴포넌트 (404, AppAlert, AgGridWrapper 등) | — |

각 사이트는 **자체 레이아웃(GNB/LNB/Footer)** · **자체 컴포넌트** 보유. 공통 컴포넌트(`AppAlert`, `AgGridWrapper` 등)는 `components/common/`에 배치.

```
.
├── public/
│   ├── favicon.svg
│   └── fonts/spoqa/                   # Spoqa Han Sans Neo 5 weight (Thin/Light/Regular/Medium/Bold) × woff2,woff
├── src/
│   ├── assets/
│   │   ├── icons/                     # SVG 아이콘 60종 (line-clip 첨부 아이콘 포함; DsIcon이 raw 로드 후 인라인 렌더)
│   │   ├── logo/                      # 로고 + 로그인 전용 아이콘
│   │   ├── fonts.css                  # @font-face 5개
│   │   ├── cp-con/                    # CP-CON 사이트 자산 (legacy)
│   │   └── kt-flow1/                  # KT FLOW1 사이트 자산 (추후)
│   ├── styles/
│   │   └── tokens.css                 # ★ 단일 진리원 — 컬러 122 + Typography + Spacing + Radius + Shadow
│   ├── components/
│   │   ├── ds/                        # ★ 41개 Ds 컴포넌트 (DsButton, DsTextField, DsSelect, DsAccordion, ... index.js)
│   │   ├── common/                    # 양 사이트 공통 (AppAlert, AgGridWrapper, EmptyResult)
│   │   ├── cp-con/
│   │   │   ├── layout/                # CP-CON 전용 GNB/LNB/Footer
│   │   │   ├── common/                # CP-CON 전용 공통 (PageHeader, StatusBadge — Ds 래퍼)
│   │   │   └── modals/                # 10종 모달 (판권계약검색/일괄업로드/통지등록/단편·시리즈조회/TV앱 신규/TV앱 상세/로그인 도움/대표사용자 변경/승인요청)
│   │   └── kt-flow1/                  # KT FLOW1 전용 (추후)
│   ├── composables/                   # useAlert 등
│   ├── constants/                     # 전역 상수
│   ├── layouts/
│   │   ├── CpConLayout.vue            # CP-CON 셸
│   │   └── KtFlow1Layout.vue          # KT FLOW1 셸 (추후)
│   ├── plugins/                       # Vuetify(시안 토큰 동기화), AG Grid 초기화
│   ├── router/                        # 사이트별 라우트 배열 (cpConRoutes / ktFlow1Routes / commonRoutes)
│   ├── services/                      # axios 인스턴스 (인계용 스켈레톤)
│   ├── stores/                        # Pinia (auth)
│   ├── utils/
│   ├── views/
│   │   ├── common/                    # WorkListView, StyleGuideView, NotFoundView
│   │   ├── cp-con/                    # 화면 (Login/Home/Plan/PlanNew×2/TvAppInbound/MyInfo/Guide/Stats×2)
│   │   └── kt-flow1/                  # 추후
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── deploy/                            # 배포 산출물 (Dockerfile, nginx.conf, .dockerignore)
├── docs/                              # 프로젝트 문서 (STRUCTURE / DEVELOPMENT / DEPLOYMENT)
├── .env.development / .env.production
└── package.json
```

- 폴더/파일 상세 → [docs/STRUCTURE.md](docs/STRUCTURE.md)
- 신규 화면 추가법·컴포넌트 사용법 → [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)
- 배포(Docker/Azure) → [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

### 새 화면을 어느 폴더에 둘지?

- **로그인 / 신작 계획 관리 / 신작 등록 / TV앱 입고 관리** 등 1차 우선 12개 → `src/views/cp-con/`
- **회원/파트너 등록, 회원정보 관리, 정산/통지/통계** 등 나머지 → `src/views/kt-flow1/`
- 양쪽에서 모두 쓰는 화면(404 등) → `src/views/common/`

라우트 등록도 [src/router/index.js](src/router/index.js)의 해당 그룹 배열(`cpConRoutes` / `ktFlow1Routes`)에 추가.

## 5. 진행 현황

- **완료 화면**: 로그인 · 신작 계획 관리(목록) · 단편/시리즈 신작 계획 등록·**상세·수정** · TV앱 입고 관리 · 내 정보 관리(파트너정보) · CP길라잡이 · 단편/시리즈 통계 · 판매이용통계 · 스타일 가이드
- **신작 계획 상세/수정 = 등록 폼 mode 재사용**: 라우트 `meta.mode`(register/edit/detail)로 분기 — `plan/single/:id`(상세)·`plan/single/:id/edit`(수정), 시리즈 동일. 상세=읽기전용+반려사유+`목록/수정`, 수정=편집+`임시저장/승인요청`. (상세 → [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md))
- **모달 10종**: 판권계약검색 · 일괄 업로드 · 통지 등록 · 단편 조회 · 시리즈 조회 · TV앱 신규 입고 · TV앱 입고 상세 · 로그인 도움 · 대표사용자 변경 · **승인요청**
- **작업 리스트(`/work-list`, 진입점 `/`)**: CP Site LNB 메뉴 기준 작업 현황 + 화면/하위 화면 링크 + 모달 바로 열기. KT FLOW1(2차)은 시안 대기로 `?` 표기.
- **AgGridWrapper 공통 처리(전 그리드 자동)**: 숫자 천단위 콤마(번호 컬럼 제외) · 빈 목록 "검색 결과가 없습니다." · 다단 헤더 가운데 정렬 · 합계 행 강조. 커스텀 div 테이블은 `EmptyResult` 컴포넌트로 빈 상태 처리. 페이지 재작성 불필요.

## 6. 작업 범위 제외 (별도 협의 대상)

- 백엔드 API 구현·연동
- 반응형 (태블릿/모바일)
- AG Grid Enterprise 기능
- 레거시 브라우저(IE 등)

---

## 7. 인계 안내

### 🧑‍💻 개발자 — 필수 컨벤션

- **Ds 컴포넌트만 사용**: 입력/버튼/모달/뱃지 등은 raw HTML 금지, `src/components/ds/`만.
- **토큰만 사용**: CSS에 hex/px 하드코딩 금지, 항상 `var(--ds-*)`.
- **목록/테이블은 `AgGridWrapper`**: 직접 `<table>`·커스텀 그리드 금지.
- **AG Grid Community 35**: Enterprise 전용(Set Filter·Range Selection·Master/Detail·Row Grouping 등) 사용 불가.
- **Vuetify 직접 import 금지**: Ds 컴포넌트 내부에서만 래핑.
- **TS 미사용 / 반응형 미적용** (Chrome 데스크탑 기준).
- 컴포넌트 카탈로그: 앱 실행 후 `/style-guide`.
- 공식 문서: [AG Grid (Vue·Community)](https://www.ag-grid.com/vue-data-grid/) · [Vuetify 3](https://vuetifyjs.com/en/components/all/)

### 🎨 디자이너 — 신규 시안 시

- **스타일 가이드 캡쳐 별도 제공**: 토큰·Ds 컴포넌트 40종을 한눈에 정리한 이미지. 신규 시안을 이 캡쳐의 컴포넌트·토큰에 맞춰 설계.
- **기존 토큰/컴포넌트 우선**: 임의의 새 색·사이즈 대신 기존 토큰 팔레트 안에서, 신규 화면은 기존 컴포넌트 조합으로.
- **라이브러리 제약**:
  - 표/목록(AG Grid Community) — 정렬·페이징·셀 편집·기본 필터·체크박스는 가능, Enterprise 기능은 불가. [예제](https://www.ag-grid.com/example/) *("Enterprise" 표시는 미사용)*
  - 폼/버튼/모달 등(Vuetify 기반) — 컴포넌트별 정의된 상태 범위 내 설계. [컴포넌트 갤러리](https://vuetifyjs.com/en/components/all/)
  - 데스크탑(Chrome) 고정 폭 — 반응형 불필요.
- **신규 컴포넌트/토큰이 필요하면 "신규"로 표시** → 개발 측에서 디자인 시스템에 추가.

---

## 8. 특이사항 / 알려진 이슈

- **⚠️ (2026-05-31) 로컬 git 저장소 손상 발생**: 작업 중 로컬 `.git`의 인덱스 및 다수 오브젝트(HEAD 포함, ~696개)가 손상됨(`unknown index entry format` / `corrupt loose object` — 디스크·파일시스템 이슈 추정). **작업 트리(소스)는 전부 정상**이며 원격(`origin` = github.com/homebox78/kt_flowone)에 히스토리가 남아 있어, **원격 기준으로 `.git` 복구** 후 커밋·푸시를 재개함. 동일 증상(`git status` 실패) 재발 시 손상된 `.git`을 백업·격리하고 원격에서 다시 받아 복구할 것.
- 변경 이력·시안 대비 차이는 [docs/DS_DIFFS.md](docs/DS_DIFFS.md)에 누적 기록.
