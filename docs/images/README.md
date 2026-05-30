# Figma 시안 레퍼런스 이미지

원본 Figma 페이지 export. 작업 시 **1px 단위 비교 기준**.

## DS (디자인 시스템) — 19종

| 파일 | 시안 페이지 | 매핑 컴포넌트 / 토큰 |
|---|---|---|
| `Colors.png` | Colors 풀팔레트 | `src/styles/tokens.css` (Gray/Pink/Purple/Blue/LightBlue/Red) |
| `Typography.png` | Display/Headline/Body/Label 전 스케일 | `tokens.css` `--ds-fs-*` |
| `LOGO_정리 필요.png` | kt FLOW1 로고 + 4 브랜드 컬러 | `src/assets/cp-con/login/logo-*.svg` |
| `Icon.png` | Line 31 + Fill 8 + Lnb 5×2 + Etc/Logo (55종) | `DsIcon` + `src/assets/cp-con/icons/*.svg` |
| `Button.png` | Primary/Secondary/PrimaryOutline/NeutralOutline + Text/Search/Link/Add | `DsButton`, `DsTextButton`, `DsSearchButton`, `DsAddButton` |
| `Badge.png` | Fill/Round × 6색 + Count(1/N/99+) | `DsBadge`, `DsCountBadge` |
| `Input.png` | Input-Text/Password/Search/TextArea + 인증번호 타이머 | `DsTextField`, `DsInputPassword`, `DsSearch`, `DsTextarea` |
| `Select.png` | Select 5 state + Dropdown List (Default/Multi) | `DsSelect`, `DsSelectMenu` |
| `Date.png` | Date input 5 state + Date Picker | `DsDatePicker`, `DsCalendar` |
| `ETC Component.png` | Checkbox/Radio/Toggle/Pagination/Breadcrumb/Scroll | `DsCheckbox`, `DsRadio`, `DsRadioGroup`, `DsToggle`, `DsPagination`, `DsBreadcrumb` |
| `Upload File(작업중).png` | 인풋 박스형 + 테이블 셀형 | `DsFileUpload` |
| `Menu - GNB.png` | GNB (gradient line 포함) + Footer | `GnbBar.vue`, `AppFooter.vue` |
| `Menu - LNB.png` | LNB 1/2/3 Depth + Collapse 핸들 | `LnbDrawer.vue` |
| `Navigation _ Header.png` | Table Toolbar (Section Title + 체크박스 + 버튼들) | `DsTableToolbar` |
| `Search Area(작업중).png` | Search Area 5 layouts | `DsFilterGroup`, `DsFilterRow`, `DsFilterField` |
| `Table.png` | Table Header + Cell (Large/Small) | `DsTableHeader`, `DsTableCell` |
| `Detail form.png` | Detail Header 6 변형 + Detail Cell | `DsDetailHeader`, `DsDetailCell` |
| `Popup.png` | Popup + UserPopup (GNB 드롭다운) | `DsModal`, `DsUserPopup` |
| `Tooltip.png` | Auto/Toggle × 8 position + X 닫기 | `DsTooltip` |

## CP-CON 화면 — 12종

| 파일 | 시안 화면 | 매핑 페이지/모달 |
|---|---|---|
| `CP_COM_1.png` | 로그인 | `LoginView.vue` |
| `CP_CON_1.png` | 신작 계획 관리 목록 (3줄 필터 + 그리드) | `PlanManagementView.vue` |
| `CP_CON_1.1_입력전.png` | 단편 신작 계획 등록 (빈 폼) | `PlanContentNewSingleView.vue` |
| `CP_CON_1.1_입력.png` | 단편 신작 계획 등록 (입력 완료) | `PlanContentNewSingleView.vue` |
| `CP_CON_1.1.1.png` | 판권계약검색 모달 | `RightsContractSearchModal.vue` |
| `CP_CON_1.1.4.png` | 일괄 업로드 모달 (empty/filled) | `BatchUploadModal.vue` |
| `CP_CON_1.9.png` | 통지 등록 모달 | `NoticeRegisterModal.vue` |
| `CP_CON_1.1_입력전_시리즈.png` | 시리즈 신작 계획 등록 (빈 폼) | `PlanContentNewSeriesView.vue` |
| `CP_CON_1.1_입력_시리즈(시즌추가, 추가된 콘텐츠).png` | 시리즈 신작 계획 등록 (시즌 + 추가된 콘텐츠) | `PlanContentNewSeriesView.vue` |
| `CP_CON_1.1.3_시리즈.png` | 시리즈 조회 모달 | `SeriesSearchModal.vue` |
| `CP_CON_3.1_tv앱 입고 상세.png` | TV앱 입고 상세 모달 | `TvAppInboundDetailModal.vue` |
| `CP_CON_3.2_신규 입고 등록.png` | TV앱 신규 입고 등록 모달 | `TvAppInboundNewModal.vue` |

## 사용 규칙

1. **새 화면 작업 전** 해당 시안 PNG 먼저 확인.
2. 코드 작성 시 시안의 px/색/font 추출 → `tokens.css` 변수 또는 Ds 컴포넌트만 사용 (하드코딩 금지).
3. **검수 시** 작업 결과를 이 이미지와 1:1 비교.
4. 신규 시안 추가 시 본 폴더에 PNG + 이 README의 표에 1행 추가.
