# 시안 vs 코드 차이점

2026-05-27 시안 이미지 검수 결과. ✅ 수정 완료 / ⚠️ 미반영.

## 🎨 Foundation

| # | 항목 | 시안 | 현재 | 조치 |
|---|---|---|---|:---:|
| 1 | Description_Background 컬러 | `#F6F7FC` | 누락 | ✅ tokens.css 추가 |
| 2 | Display 32 Bold | 32px Bold | 28px만 있음 | ✅ tokens.css 추가 |
| 3 | Display 24 Bold / Medium | 24px | 누락 | ✅ tokens.css 추가 |
| 4 | Headline 18 Bold / Medium | 18px | 누락 | ✅ tokens.css 추가 |
| 5 | Body 16 Bold/Medium/Regular | 16px (3가지) | Headline 16 Medium만 | ✅ tokens.css 추가 |
| 6 | Label 10 Medium | 10px | 누락 | ✅ tokens.css 추가 |
| 7 | Headline 20 Medium | 20 Medium | 20 Bold만 | ✅ tokens.css 추가 |

## 🧩 Components

| # | 컴포넌트 | 시안 | 현재 | 조치 |
|---|---|---|---|:---:|
| 8 | GnbBar 하단 그라데이션 라인 | pink→purple→blue 1px 라인 | 누락 | ✅ GnbBar.vue 추가 |
| 9 | DsCheckbox `indeterminate` | "—" 부분 선택 표시 | 미구현 | ✅ prop 추가 |
| 10 | DsTextField clear (X) 버튼 | filled/error 상태에서 우측 X | 누락 | ✅ clearable prop |
| 11 | DsTextarea 문자수 카운터 | `0 / 1000` 우측 하단 | 누락 | ✅ counter 표시 |
| 12 | DsBreadcrumb 마지막 항목 Bold | 현재 항목 굵게 | 색만 변경 | ✅ 폰트 weight 추가 |
| 13 | DsBreadcrumb Basic (dashed) | 점선 박스 변형 | 누락 | ⚠️ 사용처 미확인, 대기 |
| 14 | DsScroll 컴포넌트 | 가로/세로 스크롤바 | 누락 | ⚠️ 브라우저 기본 사용, 별도 컴포넌트 보류 |
| 15 | DsVerificationInput (인증번호) | input + 타이머 03:00 | 누락 | ⚠️ 사용처 미확인 대기 |
| 16 | DsTableToolbar Section Title | 좌측 Section Title + 체크박스 | 없음 | ✅ slot/prop 추가 |
| 17 | LnbDrawer 우측 Collapse 핸들 | 14×100 vertical pill | 누락 | ✅ 추가 |
| 18 | DsToggle Selected/off 상태 시각 | thumb 우측 정렬 + 색 변경 | OK | ✅ 동작 |
| 19 | Login Button purple variant | DsButton primary 활용 가능 | OK | ✅ |
| 20 | Secondary 더 어두운 hover | gray-900으로 | OK | ✅ |
| 21 | DsTableCell 셀 변형 다수 | input/search/date/file/badge 인라인 | DsTableCell slot으로 위임 | ✅ 사용 시 Ds 컴포넌트 조합 |
| 22 | Detail Form 첫 행 상단 보더 | 첫 행 윗 라인이 내부 구분선보다 진함 | gray-200 동일 | ✅ `.detail-form` border-top을 gray-400(#bfc5d4)로, 내부선은 gray-200(#e8ebf1) 유지 (전 사용처 일괄 적용) |
| 23 | 펠형 탭 활성 색 | 진한 슬레이트 펠 + 흰 텍스트 | 연한 블루(blue-75) | ✅ `.tab--active` → gray-700(#545b70) 배경 + 흰 텍스트 Bold (GuideView·StatsSalesView) |
| 24 | 판매이용통계 헤더(59-16805) | 단편명/단편ID/기간 + 해상도 그룹(단가·클라우드여부·총구매횟수·총구매금액·GTV·GTM), 단편명/ID rowSpan 병합 | 콘텐츠명/ID·결제ICN수·매출 그룹, 병합 없음 | ✅ 3단 그룹헤더 재구성 + Community `rowSpan` 병합 + flex 폭 |
| 25 | Search Area 펼침 아이콘 노출 조건 (4:15159) | 1·2줄: 아이콘 없음 / 3줄 이상에서만 ˅·˄ 토글 (접으면 2줄 표시) | 줄 수와 무관하게 항상 노출 | ✅ DsFilterGroup이 기본 슬롯의 행(DsFilterRow) 수를 세어 `rows > visibleRows`(=3줄 이상)일 때만 DsCollapseButton 노출 |
| 26 | Search Area 2줄 행 간격 | 행 사이 8px (시안 "2줄일때") | 한 DsFilterRow에 3필드 → grid 줄바꿈 + `gap:60px`이 세로에도 적용돼 60px 공백 | ✅ DsFilterRow의 `gap`을 `column-gap`(가로 전용)으로 변경 + 판매이용통계를 2개 DsFilterRow로 분리(행간 8px) |
| 27 | 단편/시리즈 통계 표 세로 스크롤 | 헤더+전체 행이 스크롤 없이 노출 | 다단(3단) 헤더 높이를 2단(80px)으로 오산 → 한 단(40px) 모자라 세로 스크롤 발생 | ✅ AgGridWrapper에 `dom-layout="autoHeight"` 지원 추가(컨테이너 height auto) + StatsContentView에 적용 → 행 수 무관 스크롤 없이 전체 노출 |
| 28 | 통계 표 그룹 헤더 정렬 | 영상/GTV/GTM(해상도 포함) 그룹 헤더 가운데 정렬 | 좌측 정렬 | ✅ AgGridWrapper에 `.ag-header-group-cell-label { justify-content:center }` 추가(전 그리드 공통) |
| 29 | 합계 행 배경색·볼드 (전 그리드 공통) | gray-300 `#d3d8e4` 배경 + 볼드 + 검정 텍스트 | 배경 안 먹음(scope-id 불일치) + 텍스트 볼드 아님(셀 색이 행 규칙을 덮음) | ✅ **AgGridWrapper 공통 스타일로 이전** — `.ag-row-pinned`/`.row-total` 배경 gray-300, 볼드·검정은 `.ag-cell`에 `!important`. 페이지별 scoped 규칙 제거. 과거·미래 모든 그리드 자동 적용 |
| 50 | 작업목록 모달 바로 열기 | 모달 항목 클릭 시 작업목록에서 즉시 표시 | 텍스트만(클릭 불가) | ✅ WorkList가 전 모달 컴포넌트 import → `modalMap` + `<component :is>`로 클릭 시 오버레이 표시(10종). 모드별 화면 링크(단편/시리즈 등록·상세·수정)는 subPages 링크로 상시 노출 |
| 49 | 신작 계획 상세/수정 화면(59-15491·16107·15840) | 등록 폼을 읽기/편집 모드로 재사용 | 화면 없음 | ✅ 등록 View에 `mode`(register/edit/detail) 추가 + 라우트(`plan/single/:id`, `:id/edit`, series 동일). detail=읽기전용(입력 평문화)+반려사유+목록/수정, edit=편집+임시저장/승인요청 |
| 48 | 승인요청 모달(59-15484) | 코멘트 textarea + 취소/승인요청 | 없음 | ✅ `ApprovalRequestModal.vue` 신규(0/1000 카운터, 입력 없으면 승인요청 비활성). 등록/수정 푸터 승인요청 버튼에 연결 |
| 47 | 신작 계획 관리 목록 → 상세 진입 | 아이템명 클릭 시 상세 이동 | 이동 없음 | ✅ 아이템명 셀 `onCellClicked` → 단편/시리즈 상세 라우트, 링크 셀 스타일 |
| 46 | 작업목록 상세/수정 카드 링크 | 고객이 상세·수정·승인요청 화면 직접 열람 | 없음 | ✅ WorkList 신작계획 관리 카드에 단편/시리즈 상세·수정 subPage 링크 + 승인요청 모달 표기 |
| 45 | TV앱 입고/상세 라벨 색상 정정 | 부가배포(글자색) 아닌 라벨은 기본색 | 제작사·제작사홈페이지·aid/oid·지원언어·플레이어수·검색키워드를 잘못 blue 처리 | ✅ 해당 라벨 `lbl-blue` 제거(밑줄은 유지), 부가이미지 그룹만 blue 유지 |
| 44 | 신규 입고 등록 파일첨부 라벨 폭 | 좌측 라벨 좁게 → 파일 입력 넓게 | 라벨 160px | ✅ img-sub 서브폼 라벨 130px(nowrap)로 축소, 입력 +30px |
| 43 | TV앱 입고 관리 검색 레이아웃 | 앱유형·위젯개발유형 / 검색 / 입고상태·카테고리 (깔끔한 행) | 한 행에 3필드 몰려 깨짐 | ✅ 3개 DsFilterRow로 분리 + `collapsible=false`(목 데이터라 토글 불필요) |
| 42 | 어셋·추가콘텐츠 테이블 세로 스크롤 | 가로 스크롤만 | 가로 스크롤바가 높이를 먹어 세로 스크롤 발생 | ✅ `overflow-y: hidden` 명시(단편·시리즈 등록 폼 공통) |
| 41 | 단편 등록 추가된 콘텐츠 메인행(59-13572) | 수급카테고리·장르·제작언어·제작국가·등급고지여부·방송법·영비법·영비법기준·시청등급·기준국가=select, 단편명·감독=input, 제작년도·등급분류번호=text, N/A 항목은 "-" | 전부 텍스트 | ✅ 메인행 셀을 시안대로 select/input 전환(방송법·영비법·영비법기준·등급분류번호는 값이 '-'면 텍스트) |
| 40 | 데이터 없음 공통 표시(59-15832) | 아이콘 + "검색 결과가 없습니다." | 없음(빈 그리드/표) | ✅ AgGrid: `overlayNoRowsTemplate` 기본값. **커스텀 div 테이블**(AgGrid 아님): 공통 `EmptyResult.vue` 컴포넌트로 처리 — 일괄 업로드 미리보기·추가된 콘텐츠(단편/시리즈) 빈 상태에 적용 |
| 39 | 번호 컬럼 콤마 제외(공통) | 번호 넘버링엔 콤마 X (금액·통계만 O) | 모든 숫자에 콤마 | ✅ AgGridWrapper `isNumberingCol`(field no/num/seq/idx… 또는 headerName 번호/순번/No)면 valueFormatter 미주입 |
| 38 | TV앱 입고 상세 첨부 아이콘(59-14904) | 클립(📎) 아이콘 | `line-link` 아이콘 | ✅ `line-clip.svg` 추가(제공 SVG, fill currentColor) + MCP명·이미지·부가이미지·어플파일·자체검증결과서 모두 `line-clip` |
| 37 | TV앱 입고 상세 제작사 홈페이지 | 클릭 가능한 링크 | `<span>` 밑줄만 | ✅ `<a :href target=_blank>` 링크(blue·underline), URL 공백 제거 |
| 36 | TV앱 입고 라벨 밑줄/글자색(59-15007·14904) | 밑줄=ADI 배포 항목, 글자색(blue)=부가 배포 항목 | 미표기 | ✅ ADI 항목 19개 `underline`, 부가배포(제작사+하단 5개) `lbl-blue`. 신규/상세 모달 공통 |
| 35 | 신규 입고 등록 이미지 입력 폭(59-15007) | 세로/가로/정사각형 입력 우측 끝이 타 입력과 정렬 | `1fr`(=minmax(auto,1fr))이라 채워진 파일칩이 컬럼을 밀어 21px 넘침 | ✅ 서브폼 그리드 `160px minmax(0,1fr)`로 blowout 방지 → 전 입력 우측 정렬 |
| 34 | 전 그리드 숫자 천단위(,) | 모든 표 숫자 3자리마다 쉼표 | 미적용(1948 등) | ✅ AgGridWrapper가 leaf 컬럼에 `valueFormatter` 주입(typeof number 만 변환, ID·날짜·문자열 보존). pinned 합계 행 포함 전 그리드 자동 적용 |
| 33 | 단편/시리즈 통계 헤더 rowSpan(59-16629) | 영상 그룹이 단편·시리즈까지 포함, 단편·시리즈는 하위 2행 span | 단편·시리즈가 최상위 leaf(전체높이 span), 영상은 GTV/GTM만 | ✅ 단편·시리즈를 영상 그룹 children 으로 이동 |
| 32 | 단편/시리즈 통계 검색 폼(59-16599) | 검색기간 + 통계유형 한 줄 흐름 | 50/50 그리드라 좁은 폭에서 검색기간 선택들이 통계유형 라벨을 밀어 사라짐 | ✅ DsFilterRow(grid) → flex 흐름(`.filter-flow`), 필드 내용 너비, flex-wrap |
| 31 | 판매이용통계 검색 폼(59-16780) | 클라우드 여부·화질(select) / 검색기간(date~date) / 검색어(단편명·ID, 검색 아이콘) 2×2 | 콘텐츠 메뉴 구분·조회기간·검색(콘텐츠명/ID) | ✅ StatsSalesView 필터 재구성 — 클라우드 여부/화질/검색기간/검색어 + `trailing-icon="line-search"`, placeholder 탭 연동 |
| 30 | 콘텐츠↔푸터 여백 (전 페이지) | 시안 ≈40px (푸터 자체 top padding) | page `padding-bottom:40` + 푸터 `padding-top:40`이 겹쳐 **80px**로 과도 (GuideView는 마지막 카드 margin까지 더해 더 큼). PlanManagement만 하단 padding이 없어 시안과 일치 | ✅ 6개 화면(`.page`)의 하단 padding 제거(`padding:0 var(--ds-space-40)`) → 푸터 top padding(40)이 단일 간격원. GuideView는 `.card:last-child{margin-bottom:0}`도 적용. 전 페이지 40px 통일 |

## 📌 결정 사항

- **DsScroll**: 브라우저 native scrollbar로 충분. 별도 컴포넌트 불필요 (시안도 단순 시각 표시).
- **DsVerificationInput**: 1차 12개 화면에 인증번호 입력이 있는지 확인 후 추가. 대기.
- **DsBreadcrumb Basic dashed**: Figma 문서용 표기 같음. 실 사용 시안 확인 후 추가. 대기.
- **DsTableCell 17 state**: 셀 컨테이너 + 내부 Ds 컴포넌트 조합으로 처리. 별도 wrapper 필요 시 추가.
