import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'

// AG Grid 35 — Community 모듈 + Quartz 테마 + 아이콘 폰트 일괄 로드
// (체크박스/펼침 등 아이콘이 폰트로 렌더되므로 agGridQuartzFont 필수)
// v33+ JS Theming API 사용 — Quartz CSS 파일 import 제거
// (CSS 파일과 JS theme 병행 시 "Theming API and CSS File Themes are both used" 경고 + 충돌)
// 시안 border 오버라이드는 일단 제거 (테마 변수 충돌 의심) — 아이콘 정상화 후 재도입
// import '@/styles/ag-grid-overrides.css'

ModuleRegistry.registerModules([AllCommunityModule])
