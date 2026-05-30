# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

KT FLOW1 CP Site — Vue 프론트엔드 (마크업/구성 전용). 견적 Q-20260526-001, 60일, 약 92개 화면 (CP-CON 12 + KT FLOW1 80). 신규 프로젝트로 Azure 컨테이너에 MSA 기반 배포 예정. 백엔드 API 연동·반응형은 견적 범위 외.

1차 우선 화면 12개: 로그인, 신작 계획 관리, 신작 등록(단편/시리즈), TV앱 입고 관리.

## Stack

Vue 3 + Vite 8 + JavaScript / Vuetify 3 + AG Grid Community 35 / Vue Router 4 + Pinia / Axios / ESLint(Flat) + Prettier. Chrome 데스크탑.

## Commands

```
npm run dev        # http://localhost:5173
npm run build      # dist/
npm run preview    # http://localhost:4173
npm run lint       # ESLint
npm run lint:fix
npm run format     # Prettier
npm run docker:build   # docker build -f deploy/Dockerfile ...
npm run docker:run
```

## Site Groups (중요)

본 저장소는 **두 사이트**를 한 코드베이스에 담는다. 폴더/라우트 모두 그룹별로 분리.

- **cp-con** (Content Partner) — 로그인 + 1차 우선 12개. 현재 작업 중. CP-CON 전용 GNB/LNB/Footer 사용(`CpConLayout`).
- **kt-flow1** (KT FLOW1) — 나머지 80개 (회원/파트너/통계/운영). 2차 작업, 별도 레이아웃 예정.
- **common** — 양쪽 공통 (404, AppAlert, AgGridWrapper, useAlert 등).

신규 화면 배치 규칙: 화면명이 1차 우선 12개에 속하면 `cp-con/`, 아니면 `kt-flow1/`, 양쪽에서 쓰는 보조 화면(404 등)은 `common/`.

## Design System (단일 진리원)

**모든 화면은 토큰(`var(--ds-*)`) 또는 Ds 컴포넌트만 사용. hex/sizes 하드코딩 금지.**

- 토큰 `src/styles/tokens.css` — 컬러 122개(Gray/Blue/LightBlue/Purple/Pink/Red × shade) + Typography + Spacing + Radius + Shadow. Figma 변수 1:1 매핑. 시안 변경 시 이 파일만 수정.
- Ds 컴포넌트 `src/components/ds/Ds*.vue` — 40개 (Button/TextField/Select/Calendar/Modal/Tooltip/Table/Detail/Filter 등). [index.js](src/components/ds/index.js)에서 일괄 export.
- **Ds 컴포넌트 내부 엔진**: Vuetify(VTextField, VTextarea, VCheckboxBtn, VDatePicker, VMenu 등)를 hidden style로 래핑 + DS 시안 visuals로 override. 외부 API는 DS prop 유지 (`size="medium"|"small"`, `error`, `helper`, `clearable` 등).
- 스타일 가이드 `/style-guide` 경로 — 40개 컴포넌트 전수 라이브 데모 + 토큰 시각화. 작업 전 항상 참조.
- Figma 시안 PNG → `docs/images/` (19종 DS + 12종 CP-CON 화면). 작업 시 1:1 비교.

## Architecture

- 진입점 `src/main.js` — 플러그인 등록 순서 고정: **Pinia → Router → Vuetify → AG Grid 모듈**. Router 가드가 Pinia 의존하므로 순서 바꾸면 깨짐.
- 라우팅 `src/router/index.js` — 라우트를 사이트별 배열(`cpConRoutes`, `ktFlow1Routes`, `commonRoutes`)로 분리해 결합. 비공개 라우트는 해당 사이트의 Layout children으로 등록. `meta.public: true`가 아니면 인증 가드가 `/login`으로 리다이렉트.
- 레이아웃 `src/layouts/CpConLayout.vue` — CP-CON GNB+LNB+Footer 셸. KT_FLOW1 작업 시 `KtFlow1Layout.vue` 신규 추가 예정.
- 컴포넌트 분리 — `src/components/ds/`(40개 Ds*, 디자인 시스템), `src/components/common/`(`AgGridWrapper`·`AppAlert` 등 양 사이트 공통), `src/components/cp-con/layout/`(CP-CON 전용 GNB/LNB/Footer), `src/components/cp-con/modals/`(CP-CON 전용 모달 6종), `src/components/kt-flow1/`(KT_FLOW1 전용, 추후).
- 자산 — `src/assets/icons/`(55+개 SVG, DsIcon이 `import.meta.glob` 으로 raw 로드 후 인라인 렌더링), `src/assets/logo/`(로고+로그인 아이콘), `src/assets/fonts.css`(Spoqa Han Sans Neo 5 weight). 사이트 전용 이미지는 `src/assets/<site>/`.
- HTTP 스켈레톤 `src/services/http.js` — axios 인스턴스(`VITE_API_BASE_URL`, JWT 헤더, 401 핸들링). 도메인별 모듈은 `services/<도메인>.js`로 추가하는 컨벤션. **본 견적 범위는 API 연동 없음** — 인계용 스켈레톤.
- 상태 `src/stores/auth.js` — 로그인 세션 + localStorage 동기화. Pinia 인스턴스는 `stores/index.js`에서 export.
- 환경변수 — `VITE_` 접두어만 클라이언트에 노출. `.env.development` / `.env.production` 분리. base URL은 `import.meta.env.VITE_API_BASE_URL`.
- 배포 — `deploy/Dockerfile`(Node 22 build → nginx 1.27 alpine serve) + `deploy/nginx.conf`(SPA fallback `try_files ... /index.html`, gzip, 1년 자산 캐싱). 빌드 컨텍스트는 루트, `-f deploy/Dockerfile`로 지정.
- alias — `@` → `src/`. 상대경로 다단계 금지.

## Conventions

- TypeScript 도입 금지 (견적 합의).
- AG Grid Enterprise 기능 사용 금지 (Community 라이선스).
- 반응형 작업 금지 (Chrome 데스크탑 기준).
- 새 화면 = `src/views/<site>/XxxView.vue` (site = cp-con | kt-flow1 | common) + `router/index.js`의 해당 사이트 라우트 배열에 등록 + 해당 사이트 LNB 메뉴 `to` 연결, 3곳 모두 수정.
- **DS 사용 강제**: 입력/버튼/모달/뱃지 등은 반드시 `<DsButton>`, `<DsTextField>` 등 Ds 컴포넌트만 사용. raw HTML form/button 마크업 금지.
- **토큰 사용 강제**: 화면 CSS에서 hex/px 직접 작성 금지. 항상 `var(--ds-*)` 변수.
- Vuetify 직접 import 금지 (`VTextField` 등). Ds 컴포넌트가 내부에서 래핑하므로 그것만 import.
- **목록/테이블 형태 UI는 모두 `AgGridWrapper` 사용** (신규/기존 불문, 모달 안 작은 목록도 포함). 직접 `AgGridVue` import, div 기반 커스텀 그리드, raw `<table>` 마크업 금지.
- **테이블 공통 규칙은 `AgGridWrapper`에 내장 — 페이지에서 재작성 금지**: ① 헤더(일반·그룹 다단) 가운데 정렬, ② 합계 행 = gray-300 배경 + 볼드 + 검정 텍스트. 합계 행은 `:pinned-bottom-row-data` 또는 `:get-row-class="row-total"` 중 하나만 주면 자동 적용된다(전 페이지·신규 페이지 공통).
- 알럿은 `useAlert()` 사용. `alert()`/`window.confirm` 금지.

## Docs

- `README.md` — 프로젝트 진입 문서
- `docs/STRUCTURE.md` — 폴더/파일 역할 상세
- `docs/DEVELOPMENT.md` — 화면 추가법, 컴포넌트 사용법
- `docs/DEPLOYMENT.md` — Docker/Azure 배포
- `docs/DS_CHECKLIST.md` — DS 시안 ↔ 코드 1:1 매핑 체크리스트
- `docs/DS_DIFFS.md` — 시안 vs 코드 차이점 기록
- `docs/images/README.md` — 시안 PNG 19종(DS) + 12종(CP-CON) 매핑 표
