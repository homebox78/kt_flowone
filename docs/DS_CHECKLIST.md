# Design System 구현 체크리스트

Figma 18개 노드 (`Kf0XdH8tAE9sPZXMetJWJb`) vs 현재 코드 1:1 매핑.
2026-05-28 갱신.

> **범례**: ✅ 완료 / ⚠️ 부분 완료 / ❌ 미구현

## 🆕 최근 변경 (2026-05-28)

- **Ds 컴포넌트 내부 엔진 = Vuetify로 통일**: DsTextField/DsTextarea/DsCheckbox/DsDatePicker/DsSelect 등이 Vuetify 컴포넌트(VTextField, VTextarea, VCheckboxBtn, VDatePicker, VMenu 등)를 hidden style로 래핑 후 DS 시안 visuals로 override. 외부 API는 DS prop 유지.
- **DsIcon 인라인 SVG 렌더링**: `import.meta.glob` `?raw`로 SVG 문자열 로드 → `<span v-html>` 인라인 삽입. URL/캐시 이슈 회피, currentColor 적용 가능.
- **자산 폴더 재구성**: `src/assets/icons/` (59 SVG, 공용), `src/assets/logo/` (로고+로그인 아이콘), `src/assets/cp-con/`(legacy 유지).
- **CP-CON 화면 7개 + 모달 6종 완료**: Login, Plan(목록), PlanNewSingle, PlanNewSeries, TvAppInbound + 모달 6종.
- **시안 이미지 31장 docs/images/ 저장 + README 매핑**.

---

---

## 📊 전체 요약

| 구분 | 완료 | 부분 | 미구현 | 합계 |
|---|---:|---:|---:|---:|
| Foundation (Tokens) | 7 | 0 | 0 | 7 |
| Layout / Navigation | 6 | 0 | 0 | 6 |
| Buttons | 5 | 0 | 0 | 5 |
| Form Inputs | 16 | 0 | 0 | 16 |
| Filter / Search Area | 4 | 0 | 0 | 4 |
| Table / Detail | 7 | 0 | 0 | 7 |
| Feedback / Overlay | 7 | 0 | 0 | 7 |
| **합계** | **52** | **0** | **0** | **52** |

🎉 **전 항목 구현 완료**

---

## 1. Foundation

| 상태 | 항목 | 파일 |
|:---:|---|---|
| ✅ | Colors (122 hex) | tokens.css |
| ✅ | Typography | tokens.css |
| ✅ | Spacing (18단계) | tokens.css |
| ✅ | Radius (9단계) | tokens.css |
| ✅ | Shadow | tokens.css |
| ✅ | Icons (55 SVG) | DsIcon |
| ✅ | Spoqa Han Sans Neo 폰트 로컬 | public/fonts/spoqa |

## 2. Layout / Navigation

| 상태 | 컴포넌트 | 파일 |
|:---:|---|---|
| ✅ | GNB | GnbBar.vue |
| ✅ | Footer | AppFooter.vue |
| ✅ | LNB 1-Depth | LnbDrawer.vue |
| ✅ | LNB 2-Depth | LnbDrawer.vue |
| ✅ | LNB 3-Depth | LnbDrawer.vue (TV앱 입고 관리에 데모) |
| ✅ | Breadcrumb / Page Header | DsBreadcrumb / DsPageHeader |

## 3. Buttons

| 상태 | 컴포넌트 | 파일 |
|:---:|---|---|
| ✅ | Button (4 type × 4 size × Icon × State) | DsButton |
| ✅ | Text Button (Underline/Chevron × Black/Primary × Large/Small) | DsTextButton |
| ✅ | Search Button (gray-600 pill) | DsSearchButton |
| ✅ | Collapse Button | DsCollapseButton |
| ✅ | Add Button (dashed border) | DsAddButton |

## 4. Form Inputs

| 상태 | 컴포넌트 | 파일 |
|:---:|---|---|
| ✅ | TextField (Medium/Small × 5 state) | DsTextField |
| ✅ | Textarea | DsTextarea |
| ✅ | Input Password (eye/eye-off) | DsInputPassword |
| ✅ | Search (input + 돋보기) | DsSearch |
| ✅ | Select (커스텀 드롭다운, 단일/멀티) | DsSelect |
| ✅ | Select Menu (드롭다운 패널 단독) | DsSelectMenu |
| ✅ | Date Picker (input) | DsDatePicker |
| ✅ | Calendar 패널 (월 그리드, 오늘 표시, 일/토 컬러) | DsCalendar |
| ✅ | File Upload | DsFileUpload |
| ✅ | Checkbox | DsCheckbox |
| ✅ | Radio | DsRadio |
| ✅ | Radio Group | DsRadioGroup |
| ✅ | Toggle (Switch) | DsToggle |
| ✅ | Search Label (필수 *) | DsSearchLabel |
| ✅ | Helper Text (input 내부 prop) | TextField/Select 내장 |
| ✅ | InputUpload (시안 4:15096) | DsFileUpload |

## 5. Filter / Search Area

| 상태 | 컴포넌트 | 파일 |
|:---:|---|---|
| ✅ | Filter Group (카드 + 접기/펼침 + 액션) | DsFilterGroup |
| ✅ | Filter Row (한 줄, 60px gap) | DsFilterRow |
| ✅ | Filter Field (Label + Controls) | DsFilterField |
| ✅ | Search Button (조회) | DsSearchButton / DsButton |

## 6. Table / Detail

| 상태 | 컴포넌트 | 파일 |
|:---:|---|---|
| ✅ | Table Toolbar (총 N건 + 페이지사이즈 + 점프 + 액션) | DsTableToolbar |
| ✅ | Table Header (Large/Small × 7 state) | DsTableHeader |
| ✅ | Table Cell (Large/Small × slot) | DsTableCell |
| ✅ | Page Jump 위젯 | DsPageJump |
| ✅ | Pagination | DsPagination |
| ✅ | Detail Header (essential/icon/underline) | DsDetailHeader |
| ✅ | Detail Cell (slot) | DsDetailCell |

## 7. Feedback / Overlay

| 상태 | 컴포넌트 | 파일 |
|:---:|---|---|
| ✅ | Badge Fill (6 color) | DsBadge type=fill |
| ✅ | Badge Round (6 color) | DsBadge type=round |
| ✅ | Badge Count (1/N/99+) | DsCountBadge |
| ✅ | Status Badge | DsStatusBadge |
| ✅ | Tooltip (Auto/Toggle × 8 position + X) | DsTooltip |
| ✅ | Popup / Modal | DsModal |
| ✅ | User Popup | DsUserPopup |

---

## ✅ 완료된 컴포넌트 (총 40개)

```
DsIcon
DsButton, DsTextButton, DsSearchButton, DsCollapseButton, DsAddButton
DsTextField, DsTextarea, DsInputPassword, DsSearch
DsSelect, DsSelectMenu
DsDatePicker, DsCalendar
DsCheckbox, DsRadio, DsRadioGroup, DsToggle
DsFileUpload, DsSearchLabel
DsFilterGroup, DsFilterRow, DsFilterField
DsBadge, DsCountBadge, DsStatusBadge
DsTooltip, DsModal, DsUserPopup
DsPagination, DsPageJump, DsBreadcrumb, DsPageHeader
DsTableToolbar, DsTableHeader, DsTableCell
DsDetailHeader, DsDetailCell
```

모두 [src/components/ds/](../src/components/ds/) 위치, [index.js](../src/components/ds/index.js)에서 일괄 export.

## 📌 기존 화면 마이그레이션 상태

| 화면 | 적용 컴포넌트 |
|---|---|
| ✅ LoginView | DsButton, DsIcon |
| ✅ PlanManagementView | DsPageHeader, DsFilterGroup/Row/Field, DsSelect, DsTextField, DsCheckbox, DsDatePicker, DsButton, DsPagination, DsTableToolbar, DsStatusBadge |
| ✅ GnbBar | DsIcon, DsCountBadge, DsButton |
| ✅ LnbDrawer | DsIcon (1+2+3 dp 지원) |
| ✅ AppFooter | 토큰만 사용 |
| ✅ StyleGuide | 40개 모두 라이브 데모 |
