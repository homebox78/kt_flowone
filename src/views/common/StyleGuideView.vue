<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SgApi from './_SgApi.vue'
import logoKt from '@/assets/logo/logo-kt.svg'
import logoFlow1 from '@/assets/logo/logo-kt-flow1.svg'
import logoKtRed from '@/assets/icons/logo-kt-red.svg'
import logoKtDark from '@/assets/icons/logo-kt-dark.svg'
import logoKtLight from '@/assets/icons/logo-kt-light.svg'
import GnbBar from '@/components/cp-con/layout/GnbBar.vue'
import AppFooter from '@/components/cp-con/layout/AppFooter.vue'
import LnbDrawer from '@/components/cp-con/layout/LnbDrawer.vue'
import {
  DsIcon, DsButton, DsTextButton, DsSearchButton, DsCollapseButton, DsAddButton,
  DsBadge, DsCountBadge, DsStatusBadge,
  DsTextField, DsTextarea, DsInputPassword, DsSearch,
  DsSelect, DsSelectMenu, DsDatePicker, DsCalendar,
  DsCheckbox, DsRadio, DsRadioGroup, DsToggle, DsFileUpload,
  DsSearchLabel,
  DsFilterGroup, DsFilterRow, DsFilterField,
  DsTooltip, DsModal, DsUserPopup, DsAccordion,
  DsPagination, DsPageJump, DsBreadcrumb, DsPageHeader,
  DsTableToolbar, DsTableHeader, DsTableCell, DsDetailHeader, DsDetailCell,
} from '@/components/ds'

// ===== Brand (Logo page, Figma 4:16090) =====
const BRAND_COLORS = [
  ['#F05BB2', 'pink-500'],
  ['#B769F6', 'purple-500'],
  ['#6C71FF', 'blue-500'],
  ['#6CB1FF', 'light-blue-500'],
]

// ===== Colors page (Figma 4:15818) =====
const PRIMARY_TYPES = [
  { name: 'Primary',   hex: '#6C71FF', token: 'blue-500',  bg: '#6C71FF' },
  { name: 'Secondary', hex: '#727A90', token: 'slate-700', bg: '#727A90' },
]
const PALETTE = [
  {
    title: 'Neutral',
    cells: [
      ['Black', '#000000'], ['900', '#212633'], ['800', '#3A4154'], ['700', '#545B70'],
      ['600', '#727A90'], ['500', '#949BB0'], ['400', '#BFC5D4'], ['300', '#DBE0E9'],
      ['200', '#E8EBF1'], ['100', '#F4F5FA'], ['50', '#F8F9FC'], ['White', '#FFFFFF'],
    ],
  },
  {
    title: 'Pink',
    cells: [
      ['900', '#6E2E56'], ['800', '#8F3A6C'], ['700', '#B54988'], ['600', '#E057A8'],
      ['500', '#F05BB2'], ['400', '#F974C2'], ['300', '#FFA8DC'], ['200', '#FDD8EA'],
      ['100', '#FFE9F4'], ['75', '#FEEFF7'], ['50', '#FFF5FA'],
    ],
  },
  {
    title: 'Purple',
    cells: [
      ['900', '#4F2F69'], ['800', '#6A3E8C'], ['700', '#8652B4'], ['600', '#A366E3'],
      ['500', '#B769F6'], ['400', '#C686F4'], ['300', '#D5A4F9'], ['200', '#E5D4FB'],
      ['100', '#F2ECFF'], ['75', '#F4F1FF'], ['50', '#FAF8FF'],
    ],
  },
  {
    title: 'Blue',
    cells: [
      ['900', '#30337A'], ['800', '#3E42A6'], ['700', '#4E52C8'], ['600', '#5D63ED'],
      ['500', '#6C71FF'], ['400', '#8F93FF'], ['300', '#B0B2FF'], ['200', '#D4D7FF'],
      ['100', '#E9ECFF'], ['75', '#F0F1FF'], ['50', '#F9FAFE'],
    ],
  },
  {
    title: 'Light Blue',
    cells: [
      ['900', '#2E577E'], ['800', '#3F6FA3'], ['700', '#4F8FD6'], ['600', '#5BA0EF'],
      ['500', '#6CB1FF'], ['400', '#8FC6FF'], ['300', '#A8D2FF'], ['200', '#C7E2FF'],
      ['100', '#E7F0FF'], ['75', '#EDF4FF'], ['50', '#F5FAFF'],
    ],
  },
  {
    title: 'Red',
    cells: [
      ['600', '#D12626'], ['300', '#F23935'], ['50', '#FFF4F4'],
    ],
  },
  {
    title: 'Background',
    cells: [
      ['Background', '#F0F1F9'], ['Description_Background', '#F6F7FC'],
    ],
  },
]

// ===== Typography (Figma 4:15984) =====
const TYPO_SAMPLE_WEIGHTS = [
  ['100', 'Thin'], ['300', 'Light'], ['400', 'Regular'], ['500', 'Medium'], ['700', 'Bold'],
]
const TYPO_GROUPS = [
  {
    title: 'Display',
    rows: [
      ['Display/32 - Bold',   32, 700, 1.3],
      ['Display/28 - Bold',   28, 700, 1.3],
      ['Display/28 - Medium', 28, 500, 1.3],
      ['Display/24 - Bold',   24, 700, 1.3],
      ['Display/24 - Medium', 24, 500, 1.3],
    ],
  },
  {
    title: 'Headline',
    rows: [
      ['Headline/20 - Bold',    20, 700, 1.4],
      ['Headline/20 - Medium',  20, 500, 1.4],
      ['Headline/18 - Bold',    18, 700, 1.5],
      ['Headline/18 - Medium',  18, 500, 1.5],
      ['Headline/16 - Bold',    16, 700, 1.5],
      ['Headline/16 - Medium',  16, 500, 1.5],
      ['Headline/15 - Bold',    15, 700, 1.5],
      ['Headline/15 - Medium',  15, 500, 1.5],
      ['Headline/14 - Bold',    14, 700, 1.5],
      ['Headline/13 - Medium',  13, 500, 1.5],
    ],
  },
  {
    title: 'Body',
    rows: [
      ['Body/16 - Bold',    16, 700, 1.5],
      ['Body/16 - Medium',  16, 500, 1.5],
      ['Body/16 - Regular', 16, 400, 1.5],
      ['Body/15 - Bold',    15, 700, 1.5],
      ['Body/15 - Medium',  15, 500, 1.5],
      ['Body/15 - Regular', 15, 400, 1.5],
      ['Body/14 - Bold',    14, 700, 1.5],
      ['Body/14 - Medium',  14, 500, 1.5],
      ['Body/14 - Regular', 14, 400, 1.5],
      ['Body/13 - Bold',    13, 700, 1.5],
      ['Body/13 - Medium',  13, 500, 1.5],
      ['Body/13 - Regular', 13, 400, 1.5],
      ['Body/12 - Medium',  12, 500, 1.5],
      ['Body/12 - Regular', 12, 400, 1.5],
      ['Body/11 - Medium',  11, 500, 1.5],
    ],
  },
  {
    title: 'Label',
    rows: [
      ['Label/16 - Bold',    16, 700, 1.0],
      ['Label/16 - Medium',  16, 500, 1.0],
      ['Label/15 - Bold',    15, 700, 1.0],
      ['Label/15 - Medium',  15, 500, 1.0],
      ['Label/14 - Bold',    14, 700, 1.0],
      ['Label/14 - Medium',  14, 500, 1.0],
      ['Label/13 - Bold',    13, 700, 1.0],
      ['Label/13 - Medium',  13, 500, 1.0],
      ['Label/12 - Bold',    12, 700, 1.0],
      ['Label/12 - Medium',  12, 500, 1.0],
      ['Label/11 - Bold',    11, 700, 1.0],
      ['Label/11 - Medium',  11, 500, 1.0],
      ['Label/10 - Bold',    10, 700, 1.0],
      ['Label/10 - Medium',  10, 500, 1.0],
    ],
  },
]

function isLightHex(hex) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 170
}

const SPACINGS = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 40, 48, 60, 80]
const RADIUSES = [
  ['radius-0', 0], ['radius-4', 4], ['radius-6', 6], ['radius-8', 8],
  ['radius-14', 14], ['radius-16', 16], ['radius-20', 20], ['radius-28', 28],
  ['radius-circle', 999],
]

// ===== Live demo state =====
const txt = ref('')
const sel = ref('전체')
const chk = ref(true)
const radio = ref('a')
const date = ref('')
const file = ref(null)
const page = ref(8)
const modalOpen = ref(false)
const tipShow = ref(true)
const tipCloseShow = ref(true)
const txtArea = ref('')
const pwd = ref('')
const searchVal = ref('')
const toggleVal = ref(true)
const selMenu = ref('b')
const selMenuMulti = ref(['a','c'])
const collapseSt = ref('close')
const radioGroup = ref('a')
const calVal = ref('')
const pjPage = ref(3)
const sgPageSize = ref(20)
const sgPage = ref(1)
const filled = ref('내용 입력')
const filledArea = ref('내용 입력')
const filledPwd = ref('password')
const filledSearch = ref('검색어')
const filledSel = ref('전체')
const filledDate = ref('2026-04-01')

// ===== Icon page (Figma 4:15518) =====
const ICON_GROUPS = [
  {
    title: 'Icons / Line',
    rows: [
      { size: 24, items: [
        'line-up','line-down','line-left','line-right','line-double-left','line-double-right',
        'line-close','line-plus','line-minus','line-union','line-sorting','line-calendar',
        'line-file','line-check','line-search','line-download','line-mail','line-edit',
        'line-delete','line-clock','line-folder','line-profile','line-eye-off','line-eye',
        'line-link','line-question','line-caution','line-triangle','line-rotate','line-document','line-film',
        'line-clip',
      ] },
      { size: 28, items: ['login-guide','login-help'] },
    ],
  },
  {
    title: 'Icons / Fill',
    size: 24,
    items: ['fill-close','fill-plus','fill-minus','fill-caution','fill-question','fill-triangle','fill-noti','fill-user-2'],
  },
  {
    title: 'Icons / Lnb',
    size: 20,
    rows: [
      { items: ['lnb-home','lnb-content','lnb-stats','lnb-member','lnb-guide'] },
      { items: ['lnb-home-active','lnb-content-active','lnb-stats-active','lnb-member-active','lnb-guide-active'] },
    ],
  },
]

// flat list still used elsewhere if needed
const ICON_NAMES = ICON_GROUPS.flatMap((g) => g.rows ? g.rows.flatMap((r) => r.items) : g.items)

// ===== Left TOC (Table of Contents) =====
const TOC = [
  { id: 'conventions', label: '🔧 Convention (공통 규칙)' },
  { id: 'logo', label: 'Logo' },
  { id: 'colors', label: 'Colors' },
  { id: 'typography', label: 'Typography' },
  { id: 'icon', label: 'Icon' },
  { id: 'menu-gnb', label: 'Menu — GNB / Footer' },
  { id: 'menu-lnb', label: 'Menu — LNB' },
  { id: 'navigation-header', label: 'Navigation — Header' },
  { id: 'button', label: 'Button' },
  { id: 'search-area', label: 'Search Area' },
  { id: 'badge', label: 'Badge' },
  { id: 'input', label: 'Input' },
  { id: 'select', label: 'Select' },
  { id: 'date', label: 'Date' },
  { id: 'choice', label: 'Choice · Misc' },
  { id: 'upload', label: 'Upload File' },
  { id: 'etc', label: 'ETC Component' },
  { id: 'page-layout', label: 'Page Layout' },
  { id: 'tooltip', label: 'Tooltip' },
  { id: 'accordion', label: 'Accordion' },
  { id: 'popup', label: 'Popup' },
  { id: 'table', label: 'Table' },
  { id: 'detail-form', label: 'Detail Form' },
  { id: 'usage', label: 'Usage Guide' },
]
const activeId = ref(TOC[0].id)

const accordionDemo = [
  { title: '아코디언 제목 1 — 클릭 시 펼쳐집니다', text: '아코디언 본문 내용이 이 영역에 표시됩니다. 한 번에 하나만 열리며 다시 누르면 닫힙니다. 긴 문단과 줄바꿈도 정상 표시됩니다.' },
  { title: '아코디언 제목 2', text: '두 번째 항목의 본문 내용입니다.' },
  { title: '아코디언 제목 3', text: '세 번째 항목의 본문 내용입니다.' },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      // pick the entry closest to the top of viewport
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible[0]) activeId.value = visible[0].target.id
    },
    { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
  )
  TOC.forEach((s) => {
    const el = document.getElementById(s.id)
    if (el) observer.observe(el)
  })
  onBeforeUnmount(() => observer.disconnect())
})
function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  activeId.value = id
}
</script>

<template>
  <div class="sg">
    <aside class="sg__toc">
      <div class="sg__toc-title">스타일 가이드</div>
      <nav class="sg__toc-nav">
        <a
          v-for="t in TOC" :key="t.id"
          :href="`#${t.id}`"
          class="sg__toc-link"
          :class="{ 'sg__toc-link--active': activeId === t.id }"
          @click.prevent="scrollToSection(t.id)"
        >{{ t.label }}</a>
      </nav>
    </aside>

    <main class="sg__main">
    <header class="sg__hero">
      <h1>스타일 가이드</h1>
      <p>KT FLOW1 CP Site</p>
      <p class="sg__note">
        모든 화면은 이 페이지의 토큰(<code>var(--ds-*)</code>)과 Ds 컴포넌트(<code>@/components/ds</code>)만 사용합니다.
        시안 변경 시 <code>src/styles/tokens.css</code>만 수정하면 전 화면이 자동 반영됩니다.
      </p>
    </header>

    <!-- Conventions: 전 Ds 컴포넌트 공통 사용 규칙 -->
    <section id="conventions" class="sg__section">
      <div class="sg__page-title"><h2>Convention — 전 Ds 컴포넌트 공통 사용 규칙</h2></div>
      <p class="sg__lead">
        Ds 컴포넌트는 내부 엔진으로 Vuetify를 래핑합니다. 외부 API는 <strong>DS 자체 prop</strong> + <strong>Vuetify 호환 alias</strong> 둘 다 지원하므로 익숙한 방식 골라 쓰세요.
      </p>

      <h3 class="sg__sub-title">1. v-model (모든 입력 컴포넌트)</h3>
      <pre class="sg__code">&lt;DsTextField v-model="form.name" /&gt;
&lt;DsSelect v-model="form.type" :options="['전체','단편','시리즈']" /&gt;
&lt;DsCheckbox v-model="form.agree" /&gt;
&lt;DsDatePicker v-model="form.startDate" /&gt;
&lt;DsModal v-model="open" title="..." /&gt;</pre>

      <h3 class="sg__sub-title">2. 사이즈 (DsButton / DsTextField / DsSelect / DsDatePicker / DsCheckbox 등)</h3>
      <pre class="sg__code">size="xl"      &lt;!-- DsButton 전용: 48h --&gt;
size="large"   &lt;!-- 40h --&gt;
size="medium"  &lt;!-- 32h, 기본 --&gt;
size="small"   &lt;!-- 28h --&gt;</pre>

      <h3 class="sg__sub-title">3. 상태 (boolean flag)</h3>
      <pre class="sg__code">&lt;DsButton disabled&gt;비활성&lt;/DsButton&gt;
&lt;DsTextField readonly :model-value="value" /&gt;
&lt;DsTextField error helper="에러 메시지" /&gt;
&lt;DsCheckbox indeterminate :model-value="false" /&gt;</pre>

      <h3 class="sg__sub-title">4. 아이콘 — DS prop + Vuetify alias 모두 지원</h3>
      <pre class="sg__code">&lt;!-- DsButton --&gt;
&lt;DsButton icon="line-plus"&gt;추가&lt;/DsButton&gt;            &lt;!-- DS --&gt;
&lt;DsButton prepend-icon="line-plus"&gt;추가&lt;/DsButton&gt;    &lt;!-- Vuetify alias --&gt;
&lt;DsButton icon-right="line-down"&gt;드롭&lt;/DsButton&gt;       &lt;!-- DS --&gt;
&lt;DsButton append-icon="line-down"&gt;드롭&lt;/DsButton&gt;      &lt;!-- Vuetify alias --&gt;
&lt;DsButton only-icon icon="line-search" /&gt;            &lt;!-- 정사각형 아이콘 버튼 --&gt;

&lt;!-- DsTextField / DsSelect — 입력 내부 아이콘 --&gt;
&lt;DsTextField prepend-inner-icon="line-search" /&gt;
&lt;DsTextField append-inner-icon="line-eye" /&gt;
&lt;DsTextField trailing-icon="line-eye" /&gt;             &lt;!-- DS alias (= append-inner-icon) --&gt;
&lt;DsSelect prepend-inner-icon="line-folder" :options="..." /&gt;</pre>

      <h3 class="sg__sub-title">5. Helper / Error 메시지</h3>
      <pre class="sg__code">&lt;DsTextField helper="입력 가이드 텍스트" /&gt;
&lt;DsTextField error helper="에러 메시지 표시" /&gt;     &lt;!-- error=true → helper가 빨간색 --&gt;</pre>

      <h3 class="sg__sub-title">6. 옵션 데이터 — DS 또는 Vuetify 형식 모두 가능</h3>
      <pre class="sg__code">&lt;!-- DsSelect: DS 형식 (label / value) --&gt;
&lt;DsSelect v-model="v" :options="[{label:'단편', value:'short'}, {label:'시리즈', value:'series'}]" /&gt;

&lt;!-- DsSelect: 단순 string 배열 --&gt;
&lt;DsSelect v-model="v" :options="['전체','단편','시리즈']" /&gt;

&lt;!-- DsSelect: Vuetify 형식 (items prop, title / value) --&gt;
&lt;DsSelect v-model="v" :items="[{title:'단편', value:'short'}, {title:'시리즈', value:'series'}]" /&gt;</pre>

      <h3 class="sg__sub-title">7. 이벤트</h3>
      <pre class="sg__code">&lt;DsTextField @update:model-value="onChange" @clear="onClear" /&gt;
&lt;DsSearch @search="onSearch" /&gt;
&lt;DsButton @click="onClick" /&gt;
&lt;DsModal @update:model-value="..." /&gt;          &lt;!-- v-model:close 도 동일 --&gt;</pre>

      <h3 class="sg__sub-title">8. 화면 작업 시 절대 규칙</h3>
      <ul class="sg__rules">
        <li>❌ hex/px 하드코딩 금지 → ✅ <code>var(--ds-*)</code> 토큰만 사용</li>
        <li>❌ raw <code>&lt;button&gt;</code>/<code>&lt;input&gt;</code>/<code>&lt;select&gt;</code> 금지 → ✅ <code>Ds*</code> 컴포넌트만 사용</li>
        <li>❌ <code>VTextField</code>, <code>VBtn</code> 등 Vuetify 직접 import 금지 → ✅ Ds 컴포넌트가 내부에서 래핑</li>
        <li>✅ Ds 컴포넌트는 DS prop 우선, Vuetify alias도 호환됨</li>
      </ul>
    </section>

    <!-- 1. Logo (Figma 4:16090) -->
    <section id="logo" class="sg__section">
      <div class="sg__page-title"><h2>LOGO</h2></div>
      <div class="sg__logo-stage">
        <div class="sg__logo-mark">
          <img :src="logoKt" alt="KT" class="sg__logo-kt" />
          <img :src="logoFlow1" alt="FLOW1" class="sg__logo-flow1" />
        </div>
      </div>
      <h3 class="sg__sub-title">Brand Colors</h3>
      <div class="sg__brand-row">
        <div
          v-for="[hex, token] in BRAND_COLORS" :key="hex"
          class="sg__brand-cell"
          :style="{ background: hex, color: isLightHex(hex) ? '#212633' : '#ffffff' }"
        >
          <span class="sg__brand-hex">{{ hex }}</span>
          <small>--ds-fill-{{ token }}</small>
        </div>
      </div>
      <div class="sg__brand-bar" />

      <SgApi
        name="Logo Assets"
        snippet="<!-- 로고 SVG (Login/GNB) -->
<script setup>
import logoKt from '@/assets/logo/logo-kt.svg'
import logoFlow1 from '@/assets/logo/logo-kt-flow1.svg'
</script>

<template>
  <img :src='logoKt' alt='KT' class='logo-kt' />
  <img :src='logoFlow1' alt='FLOW1' class='logo-flow1' />
</template>

<!-- 4종 변형 (Positive / Red Wave / Dark Gray / Light Gray) -->
import logoKtRed   from '@/assets/icons/logo-kt-red.svg'
import logoKtDark  from '@/assets/icons/logo-kt-dark.svg'
import logoKtLight from '@/assets/icons/logo-kt-light.svg'"
        :props="[]"
      />
    </section>

    <!-- 2. Colors (Figma 4:15818) -->
    <section id="colors" class="sg__section">
      <div class="sg__page-title"><h2>Colors</h2></div>

      <h3 class="sg__sub-title">Primary Colors</h3>
      <div class="sg__primary-row">
        <div
          v-for="p in PRIMARY_TYPES" :key="p.name"
          class="sg__primary-cell"
          :style="{ background: p.bg, color: isLightHex(p.bg) ? '#212633' : '#ffffff' }"
        >
          <div class="sg__primary-meta">
            <strong>{{ p.name }}</strong>
            <span>{{ p.hex }}</span>
          </div>
        </div>
      </div>

      <div class="sg__divider" />

      <h3 class="sg__sub-title">Color Palette</h3>
      <div v-for="row in PALETTE" :key="row.title" class="sg__palette-row">
        <div class="sg__palette-label">{{ row.title }}</div>
        <div class="sg__palette-cells">
          <div
            v-for="[label, hex] in row.cells" :key="hex+label"
            class="sg__palette-cell"
            :style="{ background: hex, color: isLightHex(hex) ? '#212633' : '#ffffff' }"
          >
            <span>{{ label }}</span>
            <span class="sg__palette-hex">{{ hex }}</span>
          </div>
        </div>
      </div>

      <SgApi
        name="Color Tokens"
        snippet="/* 화면 CSS — hex 직접 입력 금지, var(--ds-*) 사용 */
.my-card {
  background: var(--ds-fill-gray-white);
  color: var(--ds-text-gray-900);
  border: 1px solid var(--ds-border-gray-300);
}
.my-card--primary {
  background: var(--ds-fill-blue-500);
  color: var(--ds-text-gray-white);
}

/* 모든 토큰: src/styles/tokens.css */
/* Gray: 50 ~ 900 (+ white, black) */
/* Blue: 50 ~ 900 (Primary) */
/* Light Blue / Purple / Pink: 50 ~ 900 */
/* Red: 50 / 300 / 600 (Status) */"
        :props="[]"
      />
    </section>

    <!-- 3. Typography (Figma 4:15984) -->
    <section id="typography" class="sg__section">
      <div class="sg__page-title"><h2>Typography</h2></div>

      <div class="sg__typo-intro">
        <p>
          KT Flow1은 국문 영문 모두 통일 시켜 <strong>Spoqa Han Sans Neo</strong> 사용을 권장합니다.<br />
          서체파일은 <a href="https://spoqa.github.io/spoqa-han-sans/" target="_blank" rel="noreferrer">spoqa.github.io/spoqa-han-sans</a>에서 다운 받으실 수 있습니다.
        </p>
        <div class="sg__typo-weights">
          <div v-for="[w, name] in TYPO_SAMPLE_WEIGHTS" :key="w" class="sg__typo-weight">
            <span :style="{ fontWeight: w }">Aa</span>
            <small>{{ name }} ({{ w }})</small>
          </div>
        </div>
      </div>

      <div v-for="g in TYPO_GROUPS" :key="g.title" class="sg__typo-group">
        <h3 class="sg__sub-title">{{ g.title }}</h3>
        <table class="sg__typo-table">
          <thead>
            <tr><th>Style</th><th>Size</th><th>Line height</th></tr>
          </thead>
          <tbody>
            <tr v-for="[label, size, weight, lh] in g.rows" :key="label">
              <td>
                <span :style="{ fontSize: size+'px', fontWeight: weight, lineHeight: lh }">{{ label }}</span>
              </td>
              <td>{{ size }}px</td>
              <td>{{ lh }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SgApi
        name="Typography Tokens"
        snippet="/* CSS — 폰트 패밀리는 전역 적용됨 (Spoqa Han Sans Neo) */
.my-title {
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-display-28);
  font-weight: var(--ds-fw-bold);
  line-height: var(--ds-lh-display);
}

/* Font Size: --ds-fs-display-{32,28,24}
              --ds-fs-headline-{20,18,16,15,14,13}
              --ds-fs-body-{16,15,14,13,12,11}
              --ds-fs-label-{16,15,14,13,12,11,10}
   Font Weight: --ds-fw-{thin,light,regular,medium,bold}
   Line Height: --ds-lh-{display,body,label,button} */"
        :props="[]"
      />
    </section>

    <!-- Spacing / Radius 섹션은 tokens.css 직접 참조로 충분 — UI에서는 가림 -->

    <!-- 5. Icons (Figma 4:15518) -->
    <section id="icon" class="sg__section">
      <div class="sg__page-title"><h2>Icon</h2></div>

      <div v-for="g in ICON_GROUPS" :key="g.title">
        <h3 class="sg__sub-title">{{ g.title }}</h3>

        <template v-if="g.rows">
          <div v-for="(r, ri) in g.rows" :key="ri" class="sg__icon-strip-items">
            <div v-for="name in r.items" :key="name" class="sg__icon-cell" :title="name">
              <DsIcon :name="name" :size="r.size || g.size" />
            </div>
          </div>
        </template>
        <div v-else class="sg__icon-strip-items">
          <div v-for="name in g.items" :key="name" class="sg__icon-cell" :title="name">
            <DsIcon :name="name" :size="g.size" />
          </div>
        </div>

        <div class="sg__divider" />
      </div>

      <!-- Icons / Etc · Logo (Figma 4:15788) -->
      <h3 class="sg__sub-title">Icons / Etc · Logo</h3>
      <div class="sg__icon-strip-items" style="gap:40px; align-items:center">
        <div class="sg__logo-combo">
          <img :src="logoKt" alt="kt" class="sg__logo-combo__kt" />
          <img :src="logoFlow1" alt="FLOW1" class="sg__logo-combo__flow1" />
        </div>
        <div class="sg__icon-strip-items" style="gap:24px; padding:0; align-items:center">
          <img :src="logoKt"      alt="kt Positive"   class="sg__kt-variant" />
          <img :src="logoKtRed"   alt="kt Red sweep"  class="sg__kt-variant" />
          <img :src="logoKtDark"  alt="kt Dark Gray"  class="sg__kt-variant" />
          <img :src="logoKtLight" alt="kt Light Gray" class="sg__kt-variant" />
        </div>
      </div>
      <div class="sg__icon-strip-items" style="gap:24px; padding-top:24px">
        <div class="sg__icon-cell"><DsIcon name="etc-warning" :size="60" /></div>
      </div>

      <SgApi
        name="DsIcon"
        snippet="<!-- SVG 인라인 렌더 (currentColor 적용 가능) -->
<DsIcon name='line-search' :size='20' />
<DsIcon name='line-plus' :size='16' />

<!-- 색상 — 부모 color 상속 -->
<span style='color: var(--ds-text-blue-500)'>
  <DsIcon name='line-check' />
</span>

<!-- 전체 아이콘 목록 (55+): src/assets/icons/ 폴더 파일명 -->
<!-- line-* (31), fill-* (8), lnb-* (10), login-*, logo-*, etc-*, ico-* -->"
        :props="[
          { name: 'name', type: 'String', default: '—', desc: 'SVG 파일명 (확장자 제외)' },
          { name: 'size', type: 'Number | String', default: '24', desc: 'px 크기 (정사각)' },
        ]"
      />
    </section>

    <!-- 5-1. Menu / GNB + Footer (Figma 4:15483) -->
    <section id="menu-gnb" class="sg__section">
      <div class="sg__page-title"><h2>Menu — GNB / Footer</h2></div>
      <h3 class="sg__sub-title">GNB</h3>
      <div class="sg__demo-frame">
        <GnbBar />
      </div>
      <h3 class="sg__sub-title">Footer</h3>
      <div class="sg__demo-frame">
        <AppFooter />
      </div>

      <SgApi
        name="GnbBar, AppFooter"
        snippet="<!-- CpConLayout에 자동 포함됨 (직접 사용은 거의 없음) -->
<script setup>
import GnbBar from '@/components/cp-con/layout/GnbBar.vue'
import AppFooter from '@/components/cp-con/layout/AppFooter.vue'
</script>

<template>
  <GnbBar />        <!-- 상단 64px 고정, pink-500 하단 라인 -->
  <main>...</main>
  <AppFooter />     <!-- 하단 (kt 회색 로고 + 정책 링크 + Copyright) -->
</template>"
        :props="[]"
      />
    </section>

    <!-- 5-2. Menu / LNB (Figma 4:15338) -->
    <section id="menu-lnb" class="sg__section">
      <div class="sg__page-title"><h2>Menu — LNB</h2></div>

      <h3 class="sg__sub-title">🧑‍💻 CP Site — LNB (5 변형: 4 그룹 펼침 + Collapsed)</h3>
      <div class="sg__lnb-row">
        <div class="sg__lnb-cap"><small class="sg__cap">LNB_콘텐츠관리</small>
          <div class="sg__lnb-frame"><LnbDrawer initial-open="콘텐츠 관리" /></div>
        </div>
        <div class="sg__lnb-cap"><small class="sg__cap">LNB_통계</small>
          <div class="sg__lnb-frame"><LnbDrawer initial-open="통계/현황" /></div>
        </div>
        <div class="sg__lnb-cap"><small class="sg__cap">LNB_회원정보</small>
          <div class="sg__lnb-frame"><LnbDrawer initial-open="회원정보" /></div>
        </div>
        <div class="sg__lnb-cap"><small class="sg__cap">LNB_가이드</small>
          <div class="sg__lnb-frame"><LnbDrawer initial-open="가이드" /></div>
        </div>
        <div class="sg__lnb-cap"><small class="sg__cap">LNB_닫기</small>
          <div class="sg__lnb-frame sg__lnb-frame--narrow"><LnbDrawer :initial-collapsed="true" /></div>
        </div>
      </div>

      <h3 class="sg__sub-title">💠 Basic — Lnb 1dp / 2dp / 3dp 상태 (Figma 4:15401)</h3>

      <!-- 1Depth -->
      <h4 class="sg__lnb-depth-label">1Depth title</h4>
      <div class="sg__lnb-states">
        <div class="sg__lnb-state-cell">
          <small class="sg__cap">Default</small>
          <div class="lnb-1dp-demo">
            <span class="lnb-1dp-demo__icon"><DsIcon name="lnb-content" :size="22" /></span>
            <span class="lnb-1dp-demo__txt lnb-1dp-demo__txt--default">1Depth title</span>
            <DsIcon name="line-down" :size="20" />
          </div>
        </div>
        <div class="sg__lnb-state-cell">
          <small class="sg__cap">Select</small>
          <div class="lnb-1dp-demo">
            <span class="lnb-1dp-demo__icon"><DsIcon name="lnb-content-active" :size="22" /></span>
            <span class="lnb-1dp-demo__txt lnb-1dp-demo__txt--select">1Depth title</span>
            <DsIcon name="line-up" :size="20" />
          </div>
        </div>
        <div class="sg__lnb-state-cell">
          <small class="sg__cap">Icon · Default</small>
          <div class="lnb-1dp-demo lnb-1dp-demo--icon-only">
            <span class="lnb-1dp-demo__icon"><DsIcon name="lnb-content" :size="22" /></span>
          </div>
        </div>
        <div class="sg__lnb-state-cell">
          <small class="sg__cap">Icon · Select</small>
          <div class="lnb-1dp-demo lnb-1dp-demo--icon-only">
            <span class="lnb-1dp-demo__icon lnb-1dp-demo__icon--active"><DsIcon name="lnb-content-active" :size="22" /></span>
          </div>
        </div>
      </div>

      <!-- 2Depth -->
      <h4 class="sg__lnb-depth-label">2Depth title</h4>
      <div class="sg__lnb-states">
        <div class="sg__lnb-state-cell"><small class="sg__cap">Default</small>
          <div class="lnb-2dp-demo"><span class="lnb-2dp-demo__txt">2Depth title</span></div>
        </div>
        <div class="sg__lnb-state-cell"><small class="sg__cap">Hovered</small>
          <div class="lnb-2dp-demo lnb-2dp-demo--hover"><span class="lnb-2dp-demo__txt lnb-2dp-demo__txt--hover">2Depth title</span></div>
        </div>
        <div class="sg__lnb-state-cell"><small class="sg__cap">Select</small>
          <div class="lnb-2dp-demo lnb-2dp-demo--select"><span class="lnb-2dp-demo__txt lnb-2dp-demo__txt--select">2Depth title</span></div>
        </div>
        <div class="sg__lnb-state-cell"><small class="sg__cap">3Depth Expanded</small>
          <div class="lnb-2dp-demo lnb-2dp-demo--expanded">
            <span class="lnb-2dp-demo__txt lnb-2dp-demo__txt--select">2Depth title</span>
            <div class="lnb-3dp-demo lnb-3dp-demo--select"><span class="lnb-3dp-demo__bullet">·</span>3Depth title</div>
            <div class="lnb-3dp-demo"><span class="lnb-3dp-demo__bullet">·</span>3Depth title</div>
            <div class="lnb-3dp-demo"><span class="lnb-3dp-demo__bullet">·</span>3Depth title</div>
            <div class="lnb-3dp-demo"><span class="lnb-3dp-demo__bullet">·</span>3Depth title</div>
          </div>
        </div>
      </div>

      <!-- 3Depth -->
      <h4 class="sg__lnb-depth-label">3Depth title</h4>
      <div class="sg__lnb-states">
        <div class="sg__lnb-state-cell"><small class="sg__cap">Default</small>
          <div class="lnb-3dp-demo"><span class="lnb-3dp-demo__bullet">·</span>3Depth title</div>
        </div>
        <div class="sg__lnb-state-cell"><small class="sg__cap">Hovered</small>
          <div class="lnb-3dp-demo lnb-3dp-demo--hover"><span class="lnb-3dp-demo__bullet">·</span>3Depth title</div>
        </div>
        <div class="sg__lnb-state-cell"><small class="sg__cap">Select</small>
          <div class="lnb-3dp-demo lnb-3dp-demo--select"><span class="lnb-3dp-demo__bullet">·</span>3Depth title</div>
        </div>
      </div>
      <h3 class="sg__sub-title">Collapse Button — Close / Open</h3>
      <div class="sg__row-inline" style="gap:24px">
        <DsCollapseButton state="close" />
        <DsCollapseButton state="open" />
      </div>

      <SgApi
        name="LnbDrawer, DsCollapseButton"
        snippet="<!-- LNB (CpConLayout에 자동 포함, 직접 사용은 드물지만 가능) -->
<script setup>
import LnbDrawer from '@/components/cp-con/layout/LnbDrawer.vue'
</script>

<template>
  <!-- 기본 (콘텐츠 관리 그룹 펼침) -->
  <LnbDrawer />

  <!-- 특정 1뎁스 그룹 초기 펼침 -->
  <LnbDrawer initial-open='통계/현황' />

  <!-- 닫힌 상태로 시작 (아이콘 레일) -->
  <LnbDrawer :initial-collapsed='true' />
</template>

<!-- 접기/펼치기 pill 버튼 (필터 카드 / 검색 영역) -->
<DsCollapseButton :state='collapseSt' @toggle='collapseSt = collapseSt === &quot;close&quot; ? &quot;open&quot; : &quot;close&quot;' />"
        :props="[
          { name: '(lnb) initialOpen', type: 'String', default: `'콘텐츠 관리'`, desc: '초기 펼침 1뎁스 그룹 title' },
          { name: '(lnb) initialCollapsed', type: 'Boolean', default: 'false', desc: '닫힌 레일 상태로 시작' },
          { name: '(btn) state', type: `'open' | 'close'`, default: `'close'`, desc: '현재 상태 (chevron 방향)' },
        ]"
        :events="[
          { name: '(btn) toggle', payload: '—', desc: '클릭 시' },
        ]"
      />
    </section>

    <!-- 5-3. Navigation > Header (Figma 4:15511) -->
    <section id="navigation-header" class="sg__section">
      <div class="sg__page-title"><h2>Navigation — Header</h2></div>

      <h3 class="sg__sub-title">DsBreadcrumb</h3>
      <DsBreadcrumb :items="['홈', '콘텐츠 관리', '신작 계획 관리']" />

      <h3 class="sg__sub-title">DsPageHeader</h3>
      <DsPageHeader title="신작 계획 관리" :breadcrumb="['홈', '콘텐츠 관리', '신작 계획 관리']" />

      <h3 class="sg__sub-title">DsTableToolbar (Table Header)</h3>
      <DsTableToolbar
        section-title="Section Title"
        :total="1234" :page-size="sgPageSize" :page="sgPage" :total-pages="13"
        @update:page-size="sgPageSize = $event" @update:page="sgPage = $event"
      >
        <DsCheckbox v-model="chk" label="체크박스 라벨" />
        <span class="ds-toolbar-divider" />
        <div style="width:156px"><DsSearch v-model="searchVal" placeholder="검색어 입력" /></div>
        <DsButton type="neutral-outline">Button</DsButton>
        <DsButton type="neutral-outline">Button</DsButton>
        <DsButton type="neutral-outline">Button</DsButton>
        <DsButton type="neutral-outline">Button</DsButton>
        <span class="ds-toolbar-divider" />
        <DsButton type="primary-outline">Button</DsButton>
        <DsButton type="primary-outline">Button</DsButton>
      </DsTableToolbar>

      <SgApi
        name="DsBreadcrumb, DsPageHeader, DsTableToolbar"
        snippet="<!-- 경로 -->
<DsBreadcrumb :items=&quot;['홈', '콘텐츠 관리', '신작 계획 관리']&quot; />

<!-- 페이지 헤더 (Breadcrumb + 큰 제목) -->
<DsPageHeader title='신작 계획 관리' :breadcrumb=&quot;['홈', '콘텐츠 관리', '신작 계획 관리']&quot; />

<!-- 테이블 툴바 (Section Title + 총건수 + 페이지네이션 + 우측 액션) -->
<DsTableToolbar
  section-title='Section Title'
  :total='1234'
  :page-size='size' :page='page' :total-pages='13'
  @update:page-size='size = $event'
  @update:page='page = $event'
>
  <DsCheckbox v-model='chk' label='체크박스 라벨' />
  <span class='ds-toolbar-divider' />
  <DsButton type='neutral-outline'>Button</DsButton>
</DsTableToolbar>"
        :props="[
          { name: '(header) title', type: 'String', default: '—', desc: '큰 제목' },
          { name: '(header) breadcrumb', type: 'Array', default: '[]', desc: 'Breadcrumb 항목' },
          { name: '(toolbar) sectionTitle', type: 'String', default: `''`, desc: '좌측 섹션 제목' },
          { name: '(toolbar) total', type: 'Number', default: 'null', desc: '총 건수' },
          { name: '(toolbar) pageSize / page / totalPages', type: 'Number', default: '—', desc: '페이지 네비게이션' },
          { name: '(toolbar) showPageNav', type: 'Boolean', default: 'true', desc: '페이지사이즈+점프 노출' },
        ]"
        :slots="[
          { name: '(toolbar) default', desc: '우측 액션 영역 (Checkbox/Search/Button 등)' },
        ]"
      />
    </section>

    <!-- 6. Button (Figma 4:13117) -->
    <section id="button" class="sg__section">
      <div class="sg__page-title"><h2>Button</h2></div>

      <!-- Type matrix: Enabled / Hovered / Disabled × None / Trailing / Leading / Only Icon -->
      <div v-for="t in ['primary','secondary','primary-outline','neutral-outline']" :key="t" class="sg__btn-section">
        <h3 class="sg__sub-title">{{ { primary:'Primary', secondary:'Secondary', 'primary-outline':'Primary Outline', 'neutral-outline':'Neutral Outline' }[t] }}</h3>
        <table class="sg__btn-matrix">
          <thead>
            <tr>
              <th></th><th>Icon=None</th><th>Icon=Trailing</th><th>Icon=Leading</th><th>Only Icon</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="sg__btn-state">Enabled</td>
              <td><DsButton :type="t">Button</DsButton></td>
              <td><DsButton :type="t" icon-right="line-down">Button</DsButton></td>
              <td><DsButton :type="t" icon="line-plus">Button</DsButton></td>
              <td><DsButton :type="t" only-icon icon="line-rotate" /></td>
            </tr>
            <tr class="sg__force-hover">
              <td class="sg__btn-state">Hovered</td>
              <td><DsButton :type="t">Button</DsButton></td>
              <td><DsButton :type="t" icon-right="line-down">Button</DsButton></td>
              <td><DsButton :type="t" icon="line-plus">Button</DsButton></td>
              <td><DsButton :type="t" only-icon icon="line-rotate" /></td>
            </tr>
            <tr>
              <td class="sg__btn-state">Disabled</td>
              <td><DsButton :type="t" disabled>Button</DsButton></td>
              <td><DsButton :type="t" disabled icon-right="line-down">Button</DsButton></td>
              <td><DsButton :type="t" disabled icon="line-plus">Button</DsButton></td>
              <td><DsButton :type="t" disabled only-icon icon="line-rotate" /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="sg__divider" />

      <!-- Text Button: Underline / Chevron × Default / Hovered / Visited, Black + Primary -->
      <h3 class="sg__sub-title">Text Button (Link)</h3>
      <table class="sg__btn-matrix">
        <thead>
          <tr>
            <th></th>
            <th>Underline · Black</th><th>Underline · Primary</th>
            <th>Chevron · Black</th><th>Chevron · Primary</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="sz in ['large','small']" :key="sz">
            <tr>
              <td class="sg__btn-state">{{ sz === 'large' ? 'Large (15)' : 'Small (13)' }} · Default</td>
              <td><DsTextButton type="underline" color="black"  :size="sz">텍스트 버튼</DsTextButton></td>
              <td><DsTextButton type="underline" color="primary" :size="sz">텍스트 버튼</DsTextButton></td>
              <td><DsTextButton type="chevron"  color="black"   :size="sz">텍스트 버튼</DsTextButton></td>
              <td><DsTextButton type="chevron"  color="primary" :size="sz">텍스트 버튼</DsTextButton></td>
            </tr>
          </template>
        </tbody>
      </table>

      <div class="sg__divider" />

      <!-- Search / Collapse / Add buttons -->
      <h3 class="sg__sub-title">Search Button · Collapse · Add</h3>
      <div class="sg__row-inline" style="gap:24px">
        <div>
          <small class="sg__cap">Search Button</small>
          <div class="sg__row-inline">
            <DsSearchButton />
            <DsSearchButton>전체 조회</DsSearchButton>
          </div>
        </div>
        <div>
          <small class="sg__cap">Collapse Button</small>
          <div class="sg__row-inline">
            <DsCollapseButton :state="collapseSt" @toggle="collapseSt = collapseSt === 'close' ? 'open' : 'close'" />
          </div>
        </div>
        <div>
          <small class="sg__cap">Add Button</small>
          <div class="sg__row-inline">
            <DsAddButton />
            <DsAddButton disabled>비활성</DsAddButton>
          </div>
        </div>
      </div>

      <div class="sg__divider" />

      <!-- Login Button -->
      <h3 class="sg__sub-title">Login Button</h3>
      <div class="sg__demo-frame" style="padding:32px; display:flex; justify-content:center; background:var(--ds-fill-blue-75)">
        <button type="button" class="login-btn-preview">로그인</button>
      </div>

      <div class="sg__divider" />

      <!-- Page Action Buttons (등록 페이지 카드 헤더 영역) -->
      <h3 class="sg__sub-title">Page Action Buttons — 등록 페이지 카드 헤더</h3>
      <p class="sg__desc">콘텐츠 등록 / TV앱 입고 등록 등 페이지 카드 헤더에 들어가는 액션 버튼. 폼의 인풋/셀렉트와 같은 라인에 놓이므로 모두 <code>size="medium"</code>(34px)로 통일. 아이콘은 시안 차이가 있어 클래스로 :deep override.</p>
      <div class="sg__row-inline" style="gap:12px">
        <DsButton type="neutral-outline" size="medium" icon-right="line-search" class="sg-btn-rights">판권계약검색</DsButton>
        <DsButton type="neutral-outline" size="medium" icon="line-download" class="sg-btn-tpl">일괄등록 양식다운로드</DsButton>
      </div>
      <SgApi
        name="Page Action Buttons"
        snippet="<DsButton type='neutral-outline' size='medium' icon-right='line-search' class='btn-rights'>판권계약검색</DsButton>
<DsButton type='neutral-outline' size='medium' icon='line-download' class='btn-tpl'>일괄등록 양식다운로드</DsButton>

<style scoped>
/* 아이콘 사이즈만 시안값으로 override */
.btn-rights :deep(.ds-icon) { width: 17px !important; height: 17px !important; }
.btn-tpl :deep(.ds-icon) { width: 12px !important; height: 12px !important; }
</style>"
      />

      <div class="sg__divider" />

      <!-- Inline Pill Action (조회 등 — 인라인 라디오/필드 옆 작은 액션) -->
      <h3 class="sg__sub-title">Inline Pill Action — 조회 (라디오 옆 인라인 액션)</h3>
      <p class="sg__desc">시리즈 등록의 "제휴프로그램 매핑 N/Y 조회" 처럼 라디오/체크박스 옆에 붙는 컴팩트 액션 버튼. <strong>모양과 아이콘은 시안(pill + line-search)</strong>, <strong>색상은 Neutral Outline 규칙</strong>(흰 bg + gray-300 보더, hover blue-900 보더, disabled gray-200 bg + gray-500 text). 부모 라디오 값에 따라 disabled 전환.</p>
      <div class="sg__row-inline" style="gap:20px">
        <DsSearchButton class="sg-partner-pill">조회</DsSearchButton>
        <DsSearchButton class="sg-partner-pill" disabled>조회</DsSearchButton>
      </div>
      <SgApi
        name="Inline Pill Action"
        snippet="<DsSearchButton class='partner-pill' :disabled='form.flag !== &quot;Y&quot;'>조회</DsSearchButton>

<style scoped>
.partner-pill { background: var(--ds-fill-gray-white) !important; border: 1px solid var(--ds-border-gray-300) !important; }
.partner-pill :deep(.ds-sbtn__label) { color: var(--ds-text-gray-black) !important; }
.partner-pill :deep(.ds-icon),
.partner-pill :deep(.ds-icon svg [fill]),
.partner-pill :deep(.ds-icon svg [stroke]) { color: var(--ds-text-gray-black) !important; }
.partner-pill:hover:not(:disabled) { border-color: var(--ds-border-blue-900) !important; }
.partner-pill:disabled { background: var(--ds-fill-gray-200) !important; }
.partner-pill:disabled :deep(.ds-sbtn__label),
.partner-pill:disabled :deep(.ds-icon) { color: var(--ds-text-gray-500) !important; }
</style>"
      />

      <div class="sg__divider" />

      <!-- Main Component: Size × Type matrix -->
      <h3 class="sg__sub-title">💠 Main Component — Size × Type</h3>
      <table class="sg__btn-matrix">
        <thead>
          <tr>
            <th></th>
            <th>Primary</th><th>Secondary</th><th>Primary Outline</th><th>Neutral Outline</th>
            <th>Only Icon</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sz in ['xl','large','medium','small']" :key="sz">
            <td class="sg__btn-state">{{ { xl:'Extra Large', large:'Large', medium:'Medium', small:'Small' }[sz] }}</td>
            <td><DsButton type="primary"          :size="sz">Button</DsButton></td>
            <td><DsButton type="secondary"        :size="sz">Button</DsButton></td>
            <td><DsButton type="primary-outline"  :size="sz">Button</DsButton></td>
            <td><DsButton type="neutral-outline"  :size="sz">Button</DsButton></td>
            <td><DsButton type="primary" :size="sz" only-icon icon="line-rotate" /></td>
          </tr>
        </tbody>
      </table>

      <SgApi
        name="DsButton"
        snippet="<DsButton type='primary'>확인</DsButton>
<DsButton size='xl' type='primary'>로그인</DsButton>
<DsButton icon='line-plus'>추가</DsButton>
<DsButton only-icon icon='line-search' />
<DsButton disabled>비활성</DsButton>

<!-- Vuetify VBtn 호환 prop 도 사용 가능 -->
<DsButton prepend-icon='line-plus'>추가</DsButton>
<DsButton append-icon='line-down'>드롭</DsButton>"
        :props="[
          { name: 'type', type: `'primary' | 'secondary' | 'primary-outline' | 'neutral-outline' | 'text'`, default: `'primary'`, desc: '버튼 종류' },
          { name: 'size', type: `'xl' | 'large' | 'medium' | 'small'`, default: `'medium'`, desc: '높이 48 / 40 / 32 / 28' },
          { name: 'disabled', type: 'Boolean', default: 'false', desc: '비활성화' },
          { name: 'icon / prepend-icon', type: 'String', default: 'null', desc: '왼쪽 아이콘 이름 (Vuetify VBtn 호환 alias)' },
          { name: 'iconRight / append-icon', type: 'String', default: 'null', desc: '오른쪽 아이콘 이름 (Vuetify VBtn 호환 alias)' },
          { name: 'onlyIcon', type: 'Boolean', default: 'false', desc: '아이콘만 표시 (정사각형)' },
          { name: 'block', type: 'Boolean', default: 'false', desc: '부모 너비 가득 채우기' },
          { name: 'href', type: 'String', default: 'null', desc: '링크 URL (자동으로 <a> 태그 렌더)' },
        ]"
      />
    </section>

    <!-- 6-1. Search Area (Figma 4:15159) -->
    <section id="search-area" class="sg__section sg__section--tinted">
      <div class="sg__page-title"><h2>Search Area</h2></div>

      <h3 class="sg__sub-title">1줄일 때</h3>
      <DsFilterGroup :collapsible="false">
        <DsFilterRow>
          <DsFilterField label="검색기간">
            <div style="width:104px"><DsSelect :model-value="'월별'" :options="['월별','일별']" /></div>
            <div style="width:104px"><DsSelect :model-value="'2025년'" :options="['2025년','2026년']" /></div>
            <div style="width:104px"><DsSelect :model-value="'9월'" :options="['9월','10월']" /></div>
            <span style="color:var(--ds-text-gray-600)">~</span>
            <div style="width:104px"><DsSelect :model-value="'2026년'" :options="['2025년','2026년']" /></div>
            <div style="width:104px"><DsSelect :model-value="'9월'" :options="['9월','10월']" /></div>
          </DsFilterField>
          <DsFilterField label="통계유형">
            <DsRadioGroup
              v-model="radioGroup"
              :options="[{label:'라인',value:'a'},{label:'바',value:'b'}]"
            />
          </DsFilterField>
        </DsFilterRow>
        <template #actions>
          <DsButton type="neutral-outline" only-icon icon="line-rotate" />
          <DsButton type="primary">조회</DsButton>
        </template>
      </DsFilterGroup>

      <h3 class="sg__sub-title">2줄일 때</h3>
      <DsFilterGroup :collapsible="false">
        <DsFilterRow>
          <DsFilterField label="앱 유형">
            <div style="width:180px"><DsSelect :model-value="'앱 유형'" :options="['앱 유형','전체']" /></div>
            <div style="width:355px"><DsSelect :model-value="'위젯개발 유형'" :options="['위젯개발 유형','전체']" /></div>
          </DsFilterField>
          <DsFilterField label="검색">
            <div style="width:180px"><DsSelect :model-value="'서비스명'" :options="['서비스명','전체']" /></div>
            <div style="width:355px"><DsTextField :model-value="''" placeholder="검색어 입력" /></div>
          </DsFilterField>
        </DsFilterRow>
        <DsFilterRow>
          <DsFilterField label="입고 상태">
            <div style="width:543px"><DsSelect :model-value="'전체'" :options="['전체','입고','출고']" /></div>
          </DsFilterField>
          <DsFilterField label="카테고리">
            <DsCheckbox :model-value="true" label="전체" />
            <DsCheckbox :model-value="false" label="유니캐스트" />
            <DsCheckbox :model-value="false" label="멀티캐스트" />
          </DsFilterField>
        </DsFilterRow>
        <template #actions>
          <DsButton type="neutral-outline" only-icon icon="line-rotate" />
          <DsButton type="primary">조회</DsButton>
        </template>
      </DsFilterGroup>

      <h3 class="sg__sub-title">3줄 이상 — 접힘</h3>
      <DsFilterGroup :default-open="false">
        <DsFilterRow>
          <DsFilterField label="구분">
            <div style="width:180px"><DsSelect :model-value="'전체'" :options="['전체','단편','시리즈']" /></div>
            <DsCheckbox :model-value="true" label="완결 시리즈" />
          </DsFilterField>
          <DsFilterField label="기간">
            <div style="width:178px"><DsSelect :model-value="'등록일'" :options="['등록일','수정일']" /></div>
            <div style="width:170px"><DsDatePicker :model-value="''" placeholder="yyyy-mm-dd" /></div>
            <span style="color:var(--ds-text-gray-600)">~</span>
            <div style="width:170px"><DsDatePicker :model-value="''" placeholder="yyyy-mm-dd" /></div>
          </DsFilterField>
        </DsFilterRow>
        <DsFilterRow>
          <DsFilterField label="검색">
            <div style="width:178px"><DsSelect :model-value="'전체'" :options="['전체']" /></div>
            <div style="width:355px"><DsTextField :model-value="''" placeholder="검색어 입력" /></div>
          </DsFilterField>
          <DsFilterField label="장르">
            <div style="width:245px"><DsSelect :model-value="'전체'" :options="['전체','드라마','액션']" /></div>
          </DsFilterField>
        </DsFilterRow>
        <DsFilterRow>
          <DsFilterField label="승인 상태">
            <div style="width:180px"><DsSelect :model-value="'전체'" :options="['전체']" /></div>
            <DsCheckbox :model-value="false" label="긴급요청" />
          </DsFilterField>
        </DsFilterRow>
        <template #actions>
          <DsButton type="neutral-outline" only-icon icon="line-rotate" />
          <DsButton type="primary">조회</DsButton>
        </template>
      </DsFilterGroup>

      <h3 class="sg__sub-title">3줄 이상 — 전체</h3>
      <DsFilterGroup>
        <DsFilterRow>
          <DsFilterField label="구분">
            <div style="width:180px"><DsSelect :model-value="'전체'" :options="['전체','단편','시리즈']" /></div>
            <DsCheckbox :model-value="true" label="완결 시리즈" />
          </DsFilterField>
          <div style="display:flex; align-items:center; gap:20px; width:100%; min-width:0">
            <DsFilterField label="수급 카테고리">
              <div style="width:180px"><DsSelect :model-value="'전체'" :options="['전체']" /></div>
            </DsFilterField>
            <DsFilterField label="장르">
              <div style="width:245px"><DsSelect :model-value="'전체'" :options="['전체','드라마','액션']" /></div>
            </DsFilterField>
          </div>
        </DsFilterRow>
        <DsFilterRow>
          <DsFilterField label="기간">
            <div style="width:178px"><DsSelect :model-value="'등록일'" :options="['등록일','수정일']" /></div>
            <div style="width:170px"><DsDatePicker :model-value="''" placeholder="yyyy-mm-dd" /></div>
            <span style="color:var(--ds-text-gray-600)">~</span>
            <div style="width:170px"><DsDatePicker :model-value="''" placeholder="yyyy-mm-dd" /></div>
          </DsFilterField>
          <DsFilterField label="검색">
            <div style="width:178px"><DsSelect :model-value="'전체'" :options="['전체']" /></div>
            <div style="width:355px"><DsTextField :model-value="''" placeholder="검색어 입력" /></div>
          </DsFilterField>
        </DsFilterRow>
        <DsFilterRow>
          <DsFilterField label="승인 상태">
            <div style="width:180px"><DsSelect :model-value="'전체'" :options="['전체']" /></div>
            <DsCheckbox :model-value="false" label="긴급요청" />
          </DsFilterField>
        </DsFilterRow>
        <template #actions>
          <DsButton type="neutral-outline" only-icon icon="line-rotate" />
          <DsButton type="primary">조회</DsButton>
        </template>
      </DsFilterGroup>

      <h3 class="sg__sub-title">조회버튼 있는 유형</h3>
      <DsFilterGroup>
        <DsFilterRow>
          <DsFilterField label="유형">
            <DsRadioGroup
              v-model="radioGroup"
              :options="[{label:'단편',value:'a'},{label:'시리즈',value:'b'}]"
            />
          </DsFilterField>
          <DsFilterField label="검색">
            <div style="width:178px"><DsSelect :model-value="'전체'" :options="['전체']" /></div>
            <div style="width:284px"><DsTextField :model-value="''" placeholder="검색어 입력" /></div>
            <DsSearchButton>조회</DsSearchButton>
          </DsFilterField>
        </DsFilterRow>
        <DsFilterRow>
          <DsFilterField label="기간">
            <div style="width:262px"><DsDatePicker :model-value="''" placeholder="yyyy-mm-dd" /></div>
            <span style="color:var(--ds-text-gray-600)">~</span>
            <div style="width:262px"><DsDatePicker :model-value="''" placeholder="yyyy-mm-dd" /></div>
          </DsFilterField>
          <DsFilterField label="통지종류">
            <div style="width:543px"><DsSelect :model-value="'전체'" :options="['전체']" /></div>
          </DsFilterField>
        </DsFilterRow>
        <DsFilterRow>
          <DsFilterField label="승인 상태">
            <DsCheckbox :model-value="false" label="전체" />
            <DsCheckbox :model-value="false" label="수신" />
            <DsCheckbox :model-value="false" label="발신" />
          </DsFilterField>
        </DsFilterRow>
        <template #actions>
          <DsButton type="neutral-outline" only-icon icon="line-rotate" />
          <DsButton type="primary">조회</DsButton>
        </template>
      </DsFilterGroup>

      <div class="sg__divider" />

      <h3 class="sg__sub-title">💠 Basic — Search/More · Search Label</h3>
      <div class="sg__row-inline" style="gap:32px">
        <div>
          <small class="sg__cap">Search / More</small>
          <div class="sg__row-inline">
            <DsCollapseButton :state="collapseSt" @toggle="collapseSt = collapseSt === 'close' ? 'open' : 'close'" />
          </div>
        </div>
        <div>
          <small class="sg__cap">Search Label</small>
          <div class="sg__row-inline">
            <DsSearchLabel text="구분" />
            <DsSearchLabel text="기간" required />
          </div>
        </div>
      </div>

      <SgApi
        name="DsFilterGroup, DsFilterRow, DsFilterField, DsSearchLabel"
        snippet="<DsFilterGroup>
  <!-- 한 행은 2 컬럼 그리드 (1fr 1fr) -->
  <DsFilterRow>
    <DsFilterField label='구분'>
      <div style='width:180px'><DsSelect v-model='sel' :options=&quot;['전체','단편']&quot; /></div>
      <DsCheckbox v-model='chk' label='완결' />
    </DsFilterField>
    <DsFilterField label='기간'>
      <div style='width:170px'><DsDatePicker v-model='date' /></div>
    </DsFilterField>
  </DsFilterRow>

  <!-- 우측 액션 -->
  <template #actions>
    <DsButton type='neutral-outline' only-icon icon='line-rotate' />
    <DsButton type='primary'>조회</DsButton>
  </template>
</DsFilterGroup>

<!-- 라벨만 단독 사용 -->
<DsSearchLabel text='검색기간' />
<DsSearchLabel text='필수항목' required />"
        :props="[
          { name: '(group) collapsible', type: 'Boolean', default: 'true', desc: '하단 접기/펼침 chevron 표시' },
          { name: '(group) defaultOpen', type: 'Boolean', default: 'true', desc: '초기 펼침 상태' },
          { name: '(group) actions', type: 'Boolean', default: 'true', desc: '우측 액션 슬롯 사용' },
          { name: '(group) visibleRows', type: 'Number', default: '2', desc: '접힘 시 보이는 행 수' },
          { name: '(field) label', type: 'String', default: '—', desc: '필드 라벨' },
          { name: '(field) labelWidth', type: 'Number | String', default: '90', desc: '라벨 폭 (px)' },
          { name: '(field) required', type: 'Boolean', default: 'false', desc: '필수(*) 표시' },
          { name: '(label) text', type: 'String', default: '—', desc: '라벨 텍스트' },
          { name: '(label) width', type: 'Number | String', default: '90', desc: '라벨 폭' },
        ]"
        :slots="[
          { name: '(group) default', desc: 'DsFilterRow 들' },
          { name: '(group) actions', desc: '우측 액션 버튼 (rotate/조회)' },
        ]"
      />
    </section>

    <!-- 7. Badges -->
    <section id="badge" class="sg__section">
      <h2>7. DsBadge</h2>
      <div class="sg__block"><h3>Fill</h3>
        <div class="sg__row-inline">
          <DsBadge type="fill" color="red">레이블</DsBadge>
          <DsBadge type="fill" color="blue">레이블</DsBadge>
          <DsBadge type="fill" color="light-blue">레이블</DsBadge>
          <DsBadge type="fill" color="pink">레이블</DsBadge>
          <DsBadge type="fill" color="purple">레이블</DsBadge>
          <DsBadge type="fill" color="gray">레이블</DsBadge>
        </div>
      </div>
      <div class="sg__block"><h3>Round (Pill)</h3>
        <div class="sg__row-inline">
          <DsBadge type="round" color="red">레이블</DsBadge>
          <DsBadge type="round" color="blue">레이블</DsBadge>
          <DsBadge type="round" color="light-blue">레이블</DsBadge>
          <DsBadge type="round" color="pink">레이블</DsBadge>
          <DsBadge type="round" color="purple">레이블</DsBadge>
          <DsBadge type="round" color="gray">레이블</DsBadge>
        </div>
      </div>
      <div class="sg__block"><h3>DsCountBadge</h3>
        <div class="sg__row-inline">
          <DsCountBadge :value="1" />
          <DsCountBadge :value="9" />
          <DsCountBadge :value="120" />
        </div>
      </div>
      <div class="sg__block"><h3>DsStatusBadge (신작 계획 관리)</h3>
        <div class="sg__row-inline">
          <DsStatusBadge status="요청반려" />
          <DsStatusBadge status="승인요청" />
          <DsStatusBadge status="승인완료" />
          <DsStatusBadge status="임시저장" />
        </div>
      </div>

      <SgApi
        name="DsBadge, DsCountBadge, DsStatusBadge"
        snippet="<!-- Fill (사각, 색상 배경, 흰 글자) -->
<DsBadge type='fill' color='blue'>레이블</DsBadge>
<DsBadge type='fill' color='red'>레이블</DsBadge>

<!-- Round (pill, 연한 배경 + 컬러 글자) -->
<DsBadge type='round' color='purple'>레이블</DsBadge>

<!-- 카운트 (1~99+) -->
<DsCountBadge :value='1' />
<DsCountBadge :value='120' />

<!-- 상태 (사전 정의 4종) -->
<DsStatusBadge status='승인요청' />"
        :props="[
          { name: '(badge) type', type: `'fill' | 'round'`, default: `'fill'`, desc: '뱃지 모양' },
          { name: '(badge) color', type: `'red' | 'blue' | 'light-blue' | 'pink' | 'purple' | 'gray'`, default: `'gray'`, desc: '색상' },
          { name: '(count) value', type: 'Number | String', default: '1', desc: '카운트 수 (>99는 99+)' },
          { name: '(status) status', type: `'요청반려' | '승인요청' | '승인완료' | '임시저장'`, default: '—', desc: '신작 계획 관리 상태 텍스트' },
        ]"
      />
    </section>

    <!-- 8. Input (Figma 4:14291) -->
    <section id="input" class="sg__section">
      <div class="sg__page-title"><h2>Input</h2></div>

      <h3 class="sg__sub-title">Input-Text · Medium(32) / Small(28)</h3>
      <table class="sg__btn-matrix">
        <thead><tr><th></th><th>Medium(32)</th><th>Small(28)</th></tr></thead>
        <tbody>
          <tr><td class="sg__btn-state">Placeholder</td>
            <td><DsTextField :model-value="''" placeholder="플레이스 홀더" style="width:320px" /></td>
            <td><DsTextField :model-value="''" placeholder="플레이스 홀더" size="small" style="width:320px" /></td></tr>
          <tr><td class="sg__btn-state">Filled</td>
            <td><DsTextField :model-value="filled" style="width:320px" /></td>
            <td><DsTextField :model-value="filled" size="small" style="width:320px" /></td></tr>
          <tr class="sg__force-focus"><td class="sg__btn-state">Focus</td>
            <td><DsTextField :model-value="filled" style="width:320px" /></td>
            <td><DsTextField :model-value="filled" size="small" style="width:320px" /></td></tr>
          <tr><td class="sg__btn-state">Error</td>
            <td><DsTextField :model-value="filled" error helper="에러 메시지" style="width:320px" /></td>
            <td><DsTextField :model-value="filled" size="small" error helper="에러 메시지" style="width:320px" /></td></tr>
          <tr><td class="sg__btn-state">Disabled</td>
            <td><DsTextField :model-value="filled" disabled style="width:320px" /></td>
            <td><DsTextField :model-value="filled" size="small" disabled style="width:320px" /></td></tr>
          <tr><td class="sg__btn-state">Readonly</td>
            <td><DsTextField :model-value="filled" readonly style="width:320px" /></td>
            <td><DsTextField :model-value="filled" size="small" readonly style="width:320px" /></td></tr>
        </tbody>
      </table>

      <div class="sg__divider" />

      <h3 class="sg__sub-title">Input-Password</h3>
      <table class="sg__btn-matrix">
        <thead><tr><th></th><th>Medium(32)</th><th>Small(28)</th></tr></thead>
        <tbody>
          <tr><td class="sg__btn-state">Placeholder</td>
            <td><DsInputPassword :model-value="''" placeholder="비밀번호" style="width:320px" /></td>
            <td><DsInputPassword :model-value="''" placeholder="비밀번호" size="small" style="width:320px" /></td></tr>
          <tr><td class="sg__btn-state">Filled</td>
            <td><DsInputPassword :model-value="filledPwd" style="width:320px" /></td>
            <td><DsInputPassword :model-value="filledPwd" size="small" style="width:320px" /></td></tr>
          <tr class="sg__force-focus"><td class="sg__btn-state">Focus</td>
            <td><DsInputPassword :model-value="filledPwd" style="width:320px" /></td>
            <td><DsInputPassword :model-value="filledPwd" size="small" style="width:320px" /></td></tr>
          <tr><td class="sg__btn-state">Error</td>
            <td><DsInputPassword :model-value="filledPwd" error helper="비밀번호 형식 오류" style="width:320px" /></td>
            <td><DsInputPassword :model-value="filledPwd" size="small" error helper="비밀번호 형식 오류" style="width:320px" /></td></tr>
          <tr><td class="sg__btn-state">Disabled</td>
            <td><DsInputPassword :model-value="filledPwd" disabled style="width:320px" /></td>
            <td><DsInputPassword :model-value="filledPwd" size="small" disabled style="width:320px" /></td></tr>
        </tbody>
      </table>

      <div class="sg__divider" />

      <h3 class="sg__sub-title">Search</h3>
      <table class="sg__btn-matrix">
        <thead><tr><th></th><th>Medium(32)</th><th>Small(28)</th></tr></thead>
        <tbody>
          <tr><td class="sg__btn-state">Placeholder</td>
            <td><DsSearch :model-value="''" placeholder="검색어 입력" style="width:320px" /></td>
            <td><DsSearch :model-value="''" placeholder="검색어 입력" size="small" style="width:320px" /></td></tr>
          <tr><td class="sg__btn-state">Filled</td>
            <td><DsSearch :model-value="filledSearch" style="width:320px" /></td>
            <td><DsSearch :model-value="filledSearch" size="small" style="width:320px" /></td></tr>
          <tr><td class="sg__btn-state">Disabled</td>
            <td><DsSearch :model-value="filledSearch" disabled style="width:320px" /></td>
            <td><DsSearch :model-value="filledSearch" size="small" disabled style="width:320px" /></td></tr>
        </tbody>
      </table>

      <div class="sg__divider" />

      <h3 class="sg__sub-title">Text Area</h3>
      <div class="sg__grid2">
        <div><small class="sg__cap">Placeholder</small><DsTextarea :model-value="''" placeholder="내용 입력" :rows="4" style="width:100%" /></div>
        <div><small class="sg__cap">Filled</small><DsTextarea :model-value="filledArea" :rows="4" style="width:100%" /></div>
        <div class="sg__force-focus"><small class="sg__cap">Focus</small><DsTextarea :model-value="filledArea" :rows="4" style="width:100%" /></div>
        <div><small class="sg__cap">Error</small><DsTextarea :model-value="filledArea" error helper="에러 메시지" :rows="4" style="width:100%" /></div>
        <div><small class="sg__cap">Disabled</small><DsTextarea :model-value="filledArea" disabled :rows="4" style="width:100%" /></div>
        <div><small class="sg__cap">Readonly</small><DsTextarea :model-value="filledArea" readonly :rows="4" style="width:100%" /></div>
      </div>

      <div class="sg__divider" />

      <h3 class="sg__sub-title">💠 Basic — Helper Text</h3>
      <div style="display:flex; flex-direction:column; gap:8px">
        <span style="font-size:12px; color:var(--ds-text-gray-700)">Default · 도움말 텍스트</span>
        <span style="font-size:12px; color:var(--ds-text-red-300)">Error · 에러 메시지 텍스트</span>
        <span style="font-size:12px; color:var(--ds-text-light-blue-600)">Success · 성공 메시지</span>
        <span style="font-size:12px; color:var(--ds-text-gray-500)">Caption · 부가 안내</span>
      </div>

      <SgApi
        name="DsTextField, DsInputPassword, DsSearch, DsTextarea"
        snippet="<!-- 기본 텍스트 -->
<DsTextField v-model='txt' placeholder='검색어 입력' />

<!-- 사이즈 / 상태 -->
<DsTextField v-model='txt' size='small' />
<DsTextField v-model='txt' error helper='에러 메시지' />
<DsTextField v-model='txt' disabled />
<DsTextField v-model='txt' readonly />

<!-- 비밀번호 + eye 토글 -->
<DsInputPassword v-model='pwd' placeholder='비밀번호' />

<!-- 검색 (돋보기 아이콘 + Enter 트리거) -->
<DsSearch v-model='q' @search='onSearch' />

<!-- 멀티라인 -->
<DsTextarea v-model='text' :rows='4' :maxlength='500' show-counter />"
        :props="[
          { name: 'modelValue', type: 'String | Number', default: `''`, desc: 'v-model 값' },
          { name: 'size', type: `'medium' | 'small'`, default: `'medium'`, desc: '높이 32 / 28' },
          { name: 'type', type: 'String', default: `'text'`, desc: 'HTML input type' },
          { name: 'placeholder', type: 'String', default: `''`, desc: '플레이스홀더' },
          { name: 'disabled', type: 'Boolean', default: 'false', desc: '비활성화' },
          { name: 'readonly', type: 'Boolean', default: 'false', desc: '읽기 전용' },
          { name: 'error', type: 'Boolean', default: 'false', desc: '에러 보더 + 에러 메시지' },
          { name: 'helper', type: 'String', default: `''`, desc: '하단 도움말/에러 텍스트' },
          { name: 'clearable', type: 'Boolean', default: 'false', desc: '입력 값 X 버튼 표시' },
          { name: 'trailingIcon', type: 'String', default: 'null', desc: '우측 아이콘 이름' },
        ]"
      />
    </section>

    <!-- 8-1. Select (Figma 4:14692) -->
    <section id="select" class="sg__section">
      <div class="sg__page-title"><h2>Select</h2></div>

      <h3 class="sg__sub-title">Select</h3>
      <table class="sg__btn-matrix">
        <thead><tr><th></th><th>Medium(32)</th><th>Small(28)</th></tr></thead>
        <tbody>
          <tr><td class="sg__btn-state">Placeholder</td>
            <td><DsSelect :model-value="null" :options="['전체','단편','시리즈']" placeholder="선택" style="width:320px" /></td>
            <td><DsSelect :model-value="null" :options="['전체','단편','시리즈']" placeholder="선택" size="small" style="width:320px" /></td></tr>
          <tr><td class="sg__btn-state">Filled</td>
            <td><DsSelect :model-value="filledSel" :options="['전체','단편','시리즈']" style="width:320px" /></td>
            <td><DsSelect :model-value="filledSel" :options="['전체','단편','시리즈']" size="small" style="width:320px" /></td></tr>
          <tr><td class="sg__btn-state">Error</td>
            <td><DsSelect :model-value="filledSel" :options="['전체','단편','시리즈']" error helper="필수 항목" style="width:320px" /></td>
            <td><DsSelect :model-value="filledSel" :options="['전체','단편','시리즈']" size="small" error helper="필수 항목" style="width:320px" /></td></tr>
          <tr><td class="sg__btn-state">Disabled</td>
            <td><DsSelect :model-value="filledSel" :options="['전체','단편','시리즈']" disabled style="width:320px" /></td>
            <td><DsSelect :model-value="filledSel" :options="['전체','단편','시리즈']" size="small" disabled style="width:320px" /></td></tr>
          <tr><td class="sg__btn-state">Readonly</td>
            <td><DsSelect :model-value="filledSel" :options="['전체','단편','시리즈']" readonly style="width:320px" /></td>
            <td><DsSelect :model-value="filledSel" :options="['전체','단편','시리즈']" size="small" readonly style="width:320px" /></td></tr>
        </tbody>
      </table>

      <div class="sg__divider" />

      <h3 class="sg__sub-title">Dropdown List (Select Menu)</h3>
      <div class="sg__row-inline" style="align-items:flex-start; gap:40px">
        <div>
          <small class="sg__cap">Default</small>
          <DsSelectMenu
            v-model="selMenu"
            :options="[{label:'선택되지 않은 옵션 A',value:'a'},{label:'마우스 오버된 옵션',value:'b'},{label:'선택되지 않은 옵션 C',value:'c'}]"
          />
        </div>
        <div>
          <small class="sg__cap">Multi type</small>
          <DsSelectMenu
            v-model="selMenuMulti" multiple
            :options="[{label:'옵션 A',value:'a'},{label:'옵션 B',value:'b'},{label:'옵션 C',value:'c'}]"
          />
        </div>
      </div>
    </section>

    <!-- 8-2. Date (Figma 4:14802) -->
    <section id="date" class="sg__section">
      <div class="sg__page-title"><h2>Date</h2></div>

      <h3 class="sg__sub-title">Date Input</h3>
      <table class="sg__btn-matrix">
        <thead><tr><th></th><th>Medium(32)</th><th>Small(28)</th></tr></thead>
        <tbody>
          <tr><td class="sg__btn-state">Placeholder</td>
            <td><DsDatePicker :model-value="''" placeholder="YYYY-MM-DD" style="width:320px" /></td>
            <td><DsDatePicker :model-value="''" placeholder="YYYY-MM-DD" size="small" style="width:320px" /></td></tr>
          <tr><td class="sg__btn-state">Filled</td>
            <td><DsDatePicker :model-value="filledDate" style="width:320px" /></td>
            <td><DsDatePicker :model-value="filledDate" size="small" style="width:320px" /></td></tr>
          <tr><td class="sg__btn-state">Error</td>
            <td><DsDatePicker :model-value="filledDate" error helper="잘못된 날짜" style="width:320px" /></td>
            <td><DsDatePicker :model-value="filledDate" size="small" error helper="잘못된 날짜" style="width:320px" /></td></tr>
          <tr><td class="sg__btn-state">Disabled</td>
            <td><DsDatePicker :model-value="filledDate" disabled style="width:320px" /></td>
            <td><DsDatePicker :model-value="filledDate" size="small" disabled style="width:320px" /></td></tr>
          <tr><td class="sg__btn-state">Readonly</td>
            <td><DsDatePicker :model-value="filledDate" readonly style="width:320px" /></td>
            <td><DsDatePicker :model-value="filledDate" size="small" readonly style="width:320px" /></td></tr>
        </tbody>
      </table>

      <div class="sg__divider" />

      <h3 class="sg__sub-title">Date Picker (Calendar)</h3>
      <DsCalendar v-model="calVal" />

      <SgApi
        name="DsDatePicker, DsCalendar"
        snippet="<!-- 입력 + 캘린더 팝업 -->
<DsDatePicker v-model='date' placeholder='yyyy-mm-dd' />
<DsDatePicker v-model='date' size='small' />
<DsDatePicker v-model='date' :min-date='today' :max-date='lastDay' />

<!-- 단독 캘린더 -->
<DsCalendar v-model='date' @pick='onPick' />"
        :props="[
          { name: 'modelValue', type: 'String', default: `''`, desc: `'YYYY-MM-DD' 형식 문자열` },
          { name: 'size', type: `'medium' | 'small'`, default: `'medium'`, desc: '높이 32 / 28' },
          { name: 'placeholder', type: 'String', default: `'yyyy-mm-dd'`, desc: '플레이스홀더' },
          { name: 'minDate', type: 'String', default: `''`, desc: '선택 가능 최소 날짜' },
          { name: 'maxDate', type: 'String', default: `''`, desc: '선택 가능 최대 날짜' },
          { name: 'disabled', type: 'Boolean', default: 'false', desc: '비활성화' },
          { name: 'readonly', type: 'Boolean', default: 'false', desc: '읽기 전용' },
          { name: 'error', type: 'Boolean', default: 'false', desc: '에러 상태' },
        ]"
      />
    </section>

    <!-- 8-3. Choice + Misc inputs -->
    <section id="choice" class="sg__section">
      <div class="sg__page-title"><h2>Choice · Misc</h2></div>

      <h3 class="sg__sub-title">Checkbox · Radio · Toggle</h3>
      <div class="sg__row-inline" style="gap:40px; align-items:flex-start">
        <div>
          <small class="sg__cap">DsCheckbox</small>
          <DsCheckbox v-model="chk" label="완결 시리즈" />
          <div class="sg__mt"><DsCheckbox v-model="chk" label="긴급요청" /></div>
        </div>
        <div>
          <small class="sg__cap">DsRadio</small>
          <DsRadio v-model="radio" value="a" label="승인" name="rd1" />
          <DsRadio v-model="radio" value="b" label="반려" name="rd1" />
          <DsRadio v-model="radio" value="c" label="보류" name="rd1" />
        </div>
        <div>
          <small class="sg__cap">DsRadioGroup</small>
          <DsRadioGroup
            v-model="radioGroup"
            :options="[{label:'승인',value:'a'},{label:'반려',value:'b'},{label:'보류',value:'c'}]"
          />
        </div>
        <div>
          <small class="sg__cap">DsToggle</small>
          <DsToggle v-model="toggleVal" label="알림 받기" />
          <div class="sg__mt"><DsToggle v-model="toggleVal" disabled label="Disabled" /></div>
        </div>
      </div>

      <SgApi
        name="DsCheckbox, DsRadio, DsRadioGroup, DsToggle"
        snippet="<DsCheckbox v-model='chk' label='완결 시리즈' />
<DsCheckbox v-model='chk' indeterminate label='부분 선택' />

<DsRadio v-model='val' value='a' label='승인' name='approval' />

<DsRadioGroup
  v-model='val'
  :options=&quot;[{label:'승인',value:'a'},{label:'반려',value:'b'}]&quot;
/>

<DsToggle v-model='on' label='알림 받기' />"
        :props="[
          { name: '(check) modelValue', type: 'Boolean', default: 'false', desc: '체크 상태' },
          { name: '(check) indeterminate', type: 'Boolean', default: 'false', desc: '부분 선택 (─)' },
          { name: '(radio) modelValue', type: 'String | Number | Boolean | null', default: 'null', desc: '선택된 값' },
          { name: '(radio) value', type: 'Any', default: '—', desc: '이 라디오의 값' },
          { name: '(radio) name', type: 'String', default: `'ds-radio'`, desc: '같은 그룹 이름' },
          { name: 'label', type: 'String', default: `''`, desc: '라벨 텍스트' },
          { name: 'size', type: `'20' | '24'`, default: `'24' / '20'`, desc: '크기' },
          { name: 'disabled', type: 'Boolean', default: 'false', desc: '비활성화' },
          { name: '(group) options', type: `string[] | {label,value}[]`, default: '—', desc: '옵션' },
          { name: '(group) direction', type: `'horizontal' | 'vertical'`, default: `'horizontal'`, desc: '방향' },
        ]"
      />
    </section>

    <!-- 8-4. Upload File (Figma 4:15096) -->
    <section id="upload" class="sg__section">
      <div class="sg__page-title"><h2>Upload File</h2></div>

      <h3 class="sg__sub-title">인풋 박스형 — 폼 영역 파일</h3>
      <div class="sg__grid2" style="grid-template-columns: repeat(3, 360px); gap: 60px">
        <div>
          <small class="sg__cap">기본 (Placeholder)</small>
          <DsFileUpload :model-value="null" placeholder="파일 선택해서 첨부해주세요." />
        </div>
        <div>
          <small class="sg__cap">파일선택 (Filled)</small>
          <DsFileUpload :model-value="{ name: 'document.pdf' }" />
        </div>
        <div>
          <small class="sg__cap">오류 (Error)</small>
          <DsFileUpload :model-value="{ name: 'invalid.pdf' }" error helper="파일 형식이 올바르지 않습니다." />
        </div>
      </div>

      <div class="sg__divider" />

      <h3 class="sg__sub-title">테이블 셀형 — 행 안에서 파일 등록</h3>
      <div style="max-width: 900px">
        <div style="display:flex">
          <DsTableHeader text="첨부파일" state="header" :width="300" />
          <DsTableHeader text="구분" state="header" :width="300" />
          <DsTableHeader text="비고" state="header" :width="300" />
        </div>
        <div style="display:flex">
          <DsTableCell :width="300"><div style="width:100%"><DsFileUpload :model-value="null" placeholder="파일 첨부" /></div></DsTableCell>
          <DsTableCell :width="300">자료</DsTableCell>
          <DsTableCell :width="300">-</DsTableCell>
        </div>
      </div>

      <div class="sg__divider" />

      <h3 class="sg__sub-title">💠 Basic — Input-Upload 3 state</h3>
      <div class="sg__grid2" style="grid-template-columns: 360px; gap: 12px; max-width: 400px">
        <DsFileUpload :model-value="null" placeholder="파일 선택해서 첨부해주세요." />
        <DsFileUpload :model-value="{ name: 'sample.pdf' }" />
        <DsFileUpload :model-value="{ name: 'sample.pdf' }" error helper="에러 메시지" />
      </div>

      <SgApi
        name="DsFileUpload"
        snippet="<!-- 기본 -->
<DsFileUpload v-model='file' />

<!-- 에러 + 도움말 -->
<DsFileUpload v-model='file' error helper='파일 형식이 올바르지 않습니다.' />

<!-- 버튼 숨김 (테이블 셀 안에서) -->
<DsFileUpload v-model='file' :show-button='false' />

<!-- v-model 은 File 객체 또는 null -->
<script setup>
import { ref } from 'vue'
const file = ref(null)  // 선택 시 File { name, size, ... }
</script>"
        :props="[
          { name: 'modelValue', type: 'File | { name } | null', default: 'null', desc: '선택된 파일' },
          { name: 'placeholder', type: 'String', default: `'파일 선택해서 첨부해주세요.'`, desc: '빈 상태 안내' },
          { name: 'error', type: 'Boolean', default: 'false', desc: '에러 상태' },
          { name: 'helper', type: 'String', default: `''`, desc: '하단 도움말' },
          { name: 'showButton', type: 'Boolean', default: 'true', desc: '파일 선택 버튼 표시' },
        ]"
      />
    </section>

    <!-- 9. ETC Component (Figma 4:14032) -->
    <section id="etc" class="sg__section">
      <div class="sg__page-title">
        <h2>ETC Component</h2>
        <p style="margin:12px 0 0; font-size:14px; color:var(--ds-text-gray-600)"># Checkbox · Radio · Toggle · Pagination · Breadcrumb · Scroll</p>
      </div>

      <h3 class="sg__sub-title">Checkbox — Size 24 / 20</h3>
      <table class="sg__btn-matrix">
        <thead><tr><th></th><th>Default</th><th>Selected</th><th>Hover</th><th>Disabled</th><th>Readonly</th><th>Indeterminate</th></tr></thead>
        <tbody>
          <tr>
            <td class="sg__btn-state">Size 24</td>
            <td><DsCheckbox :model-value="false" label="레이블" /></td>
            <td><DsCheckbox :model-value="true" label="레이블" /></td>
            <td class="sg__force-hover"><DsCheckbox :model-value="false" label="레이블" /></td>
            <td><DsCheckbox :model-value="false" disabled label="레이블" /></td>
            <td><DsCheckbox :model-value="true" disabled label="레이블" /></td>
            <td><DsCheckbox :model-value="true" indeterminate label="레이블" /></td>
          </tr>
        </tbody>
      </table>

      <div class="sg__divider" />

      <h3 class="sg__sub-title">Radio — Size 24 / 20</h3>
      <table class="sg__btn-matrix">
        <thead><tr><th></th><th>Default</th><th>Selected</th><th>Hover</th><th>Disabled</th><th>Readonly</th></tr></thead>
        <tbody>
          <tr>
            <td class="sg__btn-state">Size 24</td>
            <td><DsRadio :model-value="null" value="a" label="레이블" name="sgr1" /></td>
            <td><DsRadio :model-value="'a'" value="a" label="레이블" name="sgr2" /></td>
            <td class="sg__force-hover"><DsRadio :model-value="null" value="a" label="레이블" name="sgr3" /></td>
            <td><DsRadio :model-value="null" value="a" disabled label="레이블" name="sgr4" /></td>
            <td><DsRadio :model-value="'a'" value="a" disabled label="레이블" name="sgr5" /></td>
          </tr>
        </tbody>
      </table>

      <div class="sg__divider" />

      <h3 class="sg__sub-title">Toggle</h3>
      <table class="sg__btn-matrix">
        <thead><tr><th></th><th>Default (Off)</th><th>Selected (On)</th></tr></thead>
        <tbody>
          <tr>
            <td class="sg__btn-state">Toggle</td>
            <td><DsToggle :model-value="false" /></td>
            <td><DsToggle :model-value="true" /></td>
          </tr>
        </tbody>
      </table>

      <div class="sg__divider" />

      <h3 class="sg__sub-title">Pagination</h3>
      <DsPagination v-model="page" :total="1000" :page-size="10" />
      <h3 class="sg__sub-title">Page Jump</h3>
      <DsPageJump v-model="pjPage" :total="13" />

      <div class="sg__divider" />

      <h3 class="sg__sub-title">Breadcrumb</h3>
      <DsBreadcrumb :items="['홈', '콘텐츠 관리', '신작 계획 관리']" />

      <div class="sg__divider" />

      <h3 class="sg__sub-title">Scroll</h3>
      <div class="sg__row-inline" style="gap:40px; align-items:flex-start">
        <div>
          <small class="sg__cap">Vertical</small>
          <div style="width:240px; height:200px; overflow-y:scroll; padding:12px">
            <p v-for="n in 20" :key="n" style="margin:0 0 8px; font-size:13px; color:var(--ds-text-gray-700)">스크롤 항목 {{ n }}</p>
          </div>
        </div>
        <div>
          <small class="sg__cap">Horizontal</small>
          <div style="width:400px; overflow-x:scroll; padding:12px; white-space:nowrap">
            <span v-for="n in 30" :key="n" style="display:inline-block; padding:4px 12px; margin-right:8px; background:var(--ds-fill-blue-75); border-radius:4px; font-size:13px">항목 {{ n }}</span>
          </div>
        </div>
      </div>

      <SgApi
        name="DsPagination, DsPageJump, DsBreadcrumb"
        snippet="<!-- 페이지네이션 (페이지 번호 클릭) -->
<DsPagination v-model='page' :total='1000' :page-size='10' />

<!-- 페이지 점프 (입력 + 이동 버튼) -->
<DsPageJump v-model='page' :total='13' />

<!-- Breadcrumb (마지막 항목 Bold) -->
<DsBreadcrumb :items=&quot;['홈', '콘텐츠 관리', '신작 계획 관리']&quot; />
<!-- 또는 라우터 링크 객체 -->
<DsBreadcrumb :items=&quot;[{label:'홈', to:'/'}, {label:'관리'}]&quot; />"
        :props="[
          { name: '(pager) modelValue', type: 'Number', default: '1', desc: '현재 페이지 (v-model)' },
          { name: '(pager) total', type: 'Number', default: '—', desc: '전체 아이템 수' },
          { name: '(pager) pageSize', type: 'Number', default: '10', desc: '페이지 당 아이템 수' },
          { name: '(jump) modelValue', type: 'Number', default: '1', desc: '현재 페이지' },
          { name: '(jump) total', type: 'Number', default: '—', desc: '전체 페이지 수' },
          { name: '(bc) items', type: `String[] | {label, to}[]`, default: '—', desc: '경로 항목들' },
        ]"
      />
    </section>

    <!-- 9-1. Page Layout helpers -->
    <section id="page-layout" class="sg__section">
      <div class="sg__page-title"><h2>Page Layout</h2></div>

      <h3 class="sg__sub-title">DsPageHeader</h3>
      <DsPageHeader title="신작 계획 관리" :breadcrumb="['홈', '콘텐츠 관리', '신작 계획 관리']" />

      <h3 class="sg__sub-title">DsTableToolbar</h3>
      <DsTableToolbar
        section-title="Section Title"
        :total="1234" :page-size="sgPageSize" :page="sgPage" :total-pages="13"
        @update:page-size="sgPageSize = $event" @update:page="sgPage = $event"
      >
        <DsCheckbox v-model="chk" label="체크박스 라벨" />
        <span class="ds-toolbar-divider" />
        <div style="width:156px"><DsSearch v-model="searchVal" placeholder="검색어 입력" /></div>
        <DsButton type="neutral-outline">Button</DsButton>
        <DsButton type="neutral-outline">Button</DsButton>
        <DsButton type="neutral-outline">Button</DsButton>
        <DsButton type="neutral-outline">Button</DsButton>
        <span class="ds-toolbar-divider" />
        <DsButton type="primary-outline">Button</DsButton>
        <DsButton type="primary-outline">Button</DsButton>
      </DsTableToolbar>
    </section>

    <!-- 10. Tooltip (Figma 4:14914) -->
    <section id="tooltip" class="sg__section">
      <div class="sg__page-title"><h2>Tooltip</h2></div>

      <h3 class="sg__sub-title">Auto Tooltip (Dark) — 8 positions</h3>
      <div class="sg__tt-grid">
        <div class="sg__tt-cell"><DsTooltip text="Top Left" type="auto" position="top-left" /></div>
        <div class="sg__tt-cell"><DsTooltip text="Top Center" type="auto" position="top" /></div>
        <div class="sg__tt-cell"><DsTooltip text="Top Right" type="auto" position="top-right" /></div>
        <div class="sg__tt-cell"><DsTooltip text="Left Center" type="auto" position="left" /></div>
        <div class="sg__tt-cell" />
        <div class="sg__tt-cell"><DsTooltip text="Right Center" type="auto" position="right" /></div>
        <div class="sg__tt-cell"><DsTooltip text="Bottom Left" type="auto" position="bottom-left" /></div>
        <div class="sg__tt-cell"><DsTooltip text="Bottom Center" type="auto" position="bottom" /></div>
        <div class="sg__tt-cell"><DsTooltip text="Bottom Right" type="auto" position="bottom-right" /></div>
      </div>

      <div class="sg__divider" />

      <h3 class="sg__sub-title">Toggle Tooltip (Light · X 닫기) — 8 positions</h3>
      <div class="sg__tt-grid">
        <div class="sg__tt-cell"><DsTooltip text="Top Left" type="toggle" position="top-left" /></div>
        <div class="sg__tt-cell"><DsTooltip text="Top Center" type="toggle" position="top" /></div>
        <div class="sg__tt-cell"><DsTooltip text="Top Right" type="toggle" position="top-right" /></div>
        <div class="sg__tt-cell"><DsTooltip text="Left Center" type="toggle" position="left" /></div>
        <div class="sg__tt-cell" />
        <div class="sg__tt-cell"><DsTooltip text="Right Center" type="toggle" position="right" /></div>
        <div class="sg__tt-cell"><DsTooltip text="Bottom Left" type="toggle" position="bottom-left" /></div>
        <div class="sg__tt-cell"><DsTooltip text="Bottom Center" type="toggle" position="bottom" /></div>
        <div class="sg__tt-cell"><DsTooltip text="Bottom Right" type="toggle" position="bottom-right" /></div>
      </div>

      <SgApi
        name="DsTooltip"
        snippet="<!-- Auto (다크) — 일반 정보 표시 -->
<DsTooltip text='도움말 텍스트' type='auto' position='top' />

<!-- Toggle (라이트 + X 닫기) — 영구 표시 후 사용자가 닫음 -->
<DsTooltip
  text='안내사항입니다.'
  type='toggle'
  position='bottom-right'
  :visible='show'
  closable
  @close='show = false'
/>

<!-- 8 position: top, top-left, top-right, bottom, bottom-left,
                bottom-right, left, right -->"
        :props="[
          { name: 'text', type: 'String', default: '—', desc: '툴팁 내용' },
          { name: 'type', type: `'auto' | 'toggle'`, default: `'auto'`, desc: '다크/라이트' },
          { name: 'position', type: `'top'|'top-left'|'top-right'|'bottom'|'bottom-left'|'bottom-right'|'left'|'right'`, default: `'top'`, desc: '8 position' },
          { name: 'visible', type: 'Boolean', default: 'true', desc: '표시 여부' },
          { name: 'closable', type: 'Boolean', default: 'false', desc: 'X 닫기 버튼 표시' },
        ]"
        :events="[
          { name: 'close', payload: '—', desc: 'X 클릭 시' },
        ]"
      />
    </section>

    <!-- 10-0. Accordion -->
    <section id="accordion" class="sg__section">
      <div class="sg__page-title"><h2>Accordion</h2></div>
      <p class="sg__lead">펼침/접힘 목록(FAQ 등). Vuetify VExpansionPanels 래핑 + DS 시안. 기본 한 번에 하나만 열림(<code>multiple</code>로 다중 허용). <code>#title</code> / <code>#text</code> 슬롯 지원.</p>
      <pre class="sg__code">&lt;DsAccordion :items="[{ title, text }]" /&gt;</pre>
      <div style="max-width: 720px">
        <DsAccordion :items="accordionDemo" />
      </div>
    </section>

    <!-- 10-1. Popup (Figma 4:15036) -->
    <section id="popup" class="sg__section">
      <div class="sg__page-title"><h2>Popup</h2></div>

      <h3 class="sg__sub-title">DsModal — Trigger</h3>
      <div class="sg__row-inline">
        <DsButton @click="modalOpen = true">팝업 열기</DsButton>
        <small style="color:var(--ds-text-gray-600)">제목/본문/Footer 2 Action 구조</small>
      </div>
      <DsModal v-model="modalOpen" title="판권계약검색">
        <p>Popup 본문 영역입니다.</p>
        <template #footer>
          <DsButton type="neutral-outline" size="large" @click="modalOpen=false">취소</DsButton>
          <DsButton type="primary" size="large" @click="modalOpen=false">확인</DsButton>
        </template>
      </DsModal>

      <div class="sg__divider" />

      <h3 class="sg__sub-title">💠 Popup Basic — Header / Bottom</h3>
      <div class="sg__demo-frame" style="padding:24px; background:var(--ds-fill-gray-50)">
        <div style="background:var(--ds-fill-gray-white); border-radius:8px; max-width:720px; overflow:hidden; box-shadow:var(--ds-shadow-popup)">
          <div style="display:flex; align-items:center; justify-content:space-between; padding:20px 24px; border-bottom:1px solid var(--ds-fill-gray-200)">
            <strong style="font-size:18px; font-weight:700; color:var(--ds-text-gray-900)">Popup Title</strong>
            <DsIcon name="line-close" :size="20" />
          </div>
          <div style="padding:24px; min-height:80px; color:var(--ds-text-gray-700); font-size:13px">본문 영역</div>
          <div style="display:flex; justify-content:flex-end; gap:8px; padding:16px 24px; border-top:1px solid var(--ds-fill-gray-200)">
            <DsButton type="neutral-outline" size="large">취소</DsButton>
            <DsButton type="primary" size="large">확인</DsButton>
          </div>
        </div>
      </div>

      <div class="sg__divider" />

      <h3 class="sg__sub-title">🧑‍💻 CP Site — User Popup (GNB Dropdown)</h3>
      <DsUserPopup
        username="tempUs**"
        login-at="2026-04-06 13:11:59"
        cp-name="선택된 옵션 (CP구분)"
        :cp-options="[
          {label:'옵션 A', value:'a'},
          {label:'옵션 B', value:'b', selected:true},
          {label:'옵션 C', value:'c'},
        ]"
      />

      <SgApi
        name="DsModal, DsUserPopup"
        snippet="<!-- 모달 / 팝업 -->
<DsButton @click='open = true'>팝업 열기</DsButton>
<DsModal v-model='open' title='판권계약검색' :width='720'>
  <p>본문 영역</p>
  <template #footer>
    <DsButton type='neutral-outline' @click='open=false'>취소</DsButton>
    <DsButton type='primary' @click='open=false'>확인</DsButton>
  </template>
</DsModal>

<!-- GNB 우측 사용자 드롭다운 -->
<DsUserPopup
  username='홍길동'
  login-at='2026-05-28 13:11:59'
  cp-name='선택된 옵션'
  :cp-options=&quot;[{label:'A',value:'a',selected:true}, {label:'B',value:'b'}]&quot;
  @select-cp='onSelectCp'
/>"
        :props="[
          { name: '(modal) modelValue', type: 'Boolean', default: 'false', desc: '열림/닫힘 (v-model)' },
          { name: '(modal) title', type: 'String', default: `''`, desc: '제목' },
          { name: '(modal) width', type: 'Number | String', default: '720', desc: '폭 (px)' },
          { name: '(modal) closeOnBackdrop', type: 'Boolean', default: 'true', desc: '배경 클릭 시 닫기' },
          { name: '(user) username', type: 'String', default: '—', desc: '사용자 이름' },
          { name: '(user) loginAt', type: 'String', default: '—', desc: '로그인 시각' },
          { name: '(user) cpName', type: 'String', default: '—', desc: '선택된 CP명' },
          { name: '(user) cpOptions', type: `{label, value, selected?}[]`, default: '[]', desc: 'CP 선택 옵션' },
        ]"
        :events="[
          { name: '(user) select-cp', payload: 'value', desc: 'CP 선택 시' },
        ]"
        :slots="[
          { name: '(modal) default', desc: '본문' },
          { name: '(modal) footer', desc: 'Footer 영역 (Action 버튼)' },
        ]"
      />
    </section>

    <!-- 11. Table (Figma 4:13725) -->
    <section id="table" class="sg__section">
      <div class="sg__page-title"><h2>Table</h2></div>

      <h3 class="sg__sub-title">Table Header</h3>
      <table class="sg__btn-matrix">
        <thead><tr><th>Size</th><th colspan="5">States</th></tr></thead>
        <tbody>
          <tr>
            <td class="sg__btn-state">Large(40)</td>
            <td style="padding:8px"><div style="display:flex; align-items:center"><DsTableHeader text="번호" state="no" :width="80" /><DsTableHeader text="상태" state="status" :width="80" /><DsTableHeader text="제목" state="header" :width="200" /><DsTableHeader text="필수" state="header-essential" :width="160" /><DsTableHeader text="아이콘" state="header-icon" :width="160" /><DsTableHeader text="필수+아이콘" state="header-essential-icon" :width="200" /></div></td>
          </tr>
          <tr>
            <td class="sg__btn-state">Small(32)</td>
            <td style="padding:8px"><div style="display:flex; align-items:center"><DsTableHeader text="번호" state="no" size="small" :width="80" /><DsTableHeader text="상태" state="status" size="small" :width="80" /><DsTableHeader text="제목" state="header" size="small" :width="200" /><DsTableHeader text="필수" state="header-essential" size="small" :width="160" /><DsTableHeader text="아이콘" state="header-icon" size="small" :width="160" /><DsTableHeader text="필수+아이콘" state="header-essential-icon" size="small" :width="200" /></div></td>
          </tr>
        </tbody>
      </table>

      <div class="sg__divider" />

      <h3 class="sg__sub-title">Table Cell — Large(44)</h3>
      <div style="display:flex; flex-wrap:wrap; gap:0; border-bottom:1px solid var(--ds-fill-gray-200)">
        <DsTableCell :width="80" align="center">100</DsTableCell>
        <DsTableCell :width="160">텍스트 셀</DsTableCell>
        <DsTableCell :width="120"><DsBadge type="round" color="purple">레이블</DsBadge></DsTableCell>
        <DsTableCell :width="120"><DsTextButton type="underline" color="primary" size="small">상세보기</DsTextButton></DsTableCell>
        <DsTableCell :width="120"><DsButton size="small">버튼</DsButton></DsTableCell>
        <DsTableCell :width="120" align="center"><DsStatusBadge status="승인요청" /></DsTableCell>
        <DsTableCell :width="200"><div style="width:160px"><DsTextField :model-value="filled" size="small" /></div></DsTableCell>
        <DsTableCell :width="200"><div style="width:160px"><DsSelect :model-value="filledSel" :options="['전체','단편','시리즈']" size="small" /></div></DsTableCell>
      </div>

      <h3 class="sg__sub-title" style="margin-top:24px">Table Cell — Small(36)</h3>
      <div style="display:flex; flex-wrap:wrap; gap:0; border-bottom:1px solid var(--ds-fill-gray-200)">
        <DsTableCell :width="80" size="small" align="center">100</DsTableCell>
        <DsTableCell :width="160" size="small">텍스트 셀</DsTableCell>
        <DsTableCell :width="120" size="small"><DsBadge type="round" color="purple">레이블</DsBadge></DsTableCell>
        <DsTableCell :width="120" size="small"><DsTextButton type="underline" color="primary" size="small">상세</DsTextButton></DsTableCell>
        <DsTableCell :width="120" size="small"><DsButton size="small">버튼</DsButton></DsTableCell>
        <DsTableCell :width="120" size="small" align="center"><DsStatusBadge status="승인요청" /></DsTableCell>
        <DsTableCell :width="200" size="small"><div style="width:160px"><DsTextField :model-value="filled" size="small" /></div></DsTableCell>
        <DsTableCell :width="200" size="small"><div style="width:160px"><DsSelect :model-value="filledSel" :options="['전체','단편','시리즈']" size="small" /></div></DsTableCell>
      </div>

      <SgApi
        name="DsTableHeader, DsTableCell, DsTableToolbar"
        snippet="<!-- 헤더: state로 종류 결정 -->
<DsTableHeader text='제목' state='header' :width='200' />
<DsTableHeader text='필수 컬럼' state='header-essential' :width='160' />
<DsTableHeader text='번호' state='no' :width='80' size='small' />

<!-- 셀: slot 기반 (다양한 컴포넌트 삽입) -->
<DsTableCell :width='80' align='center'>100</DsTableCell>
<DsTableCell :width='200'><DsBadge type='round' color='purple'>레이블</DsBadge></DsTableCell>

<!-- 툴바 (Section Title + 페이지네이션 + 우측 액션) -->
<DsTableToolbar
  section-title='Section Title'
  :total='1234'
  v-model:page-size='size' v-model:page='page'
  :total-pages='62'
>
  <DsCheckbox v-model='chk' label='체크박스 라벨' />
  <span class='ds-toolbar-divider' />
  <DsButton type='neutral-outline'>버튼</DsButton>
</DsTableToolbar>"
        :props="[
          { name: '(header) text', type: 'String', default: `''`, desc: '헤더 라벨' },
          { name: '(header) state', type: `'header' | 'header-essential' | 'header-icon' | 'header-essential-icon' | 'no' | 'status' | 'checkbox'`, default: `'header'`, desc: '헤더 종류' },
          { name: '(header) size', type: `'large' | 'small'`, default: `'large'`, desc: '높이 40 / 32' },
          { name: '(header) width', type: 'Number', default: '—', desc: '셀 폭 (px)' },
          { name: '(cell) align', type: `'left' | 'center' | 'right'`, default: `'left'`, desc: '셀 정렬' },
          { name: '(cell) size', type: `'large' | 'small'`, default: `'large'`, desc: '높이 44 / 36' },
          { name: '(toolbar) sectionTitle', type: 'String', default: `''`, desc: '좌측 섹션 제목' },
          { name: '(toolbar) total', type: 'Number', default: 'null', desc: '총 건수' },
          { name: '(toolbar) page / pageSize / totalPages', type: 'Number', default: '—', desc: '페이지네이션 (v-model:page, v-model:page-size)' },
        ]"
      />
    </section>

    <!-- 11-1. Detail Form (Figma 4:13898) -->
    <section id="detail-form" class="sg__section">
      <div class="sg__page-title"><h2>Detail Form</h2></div>

      <h3 class="sg__sub-title">Detail Header — 6 states</h3>
      <div style="display:flex; flex-wrap:wrap; gap:8px">
        <DsDetailHeader text="Header" />
        <DsDetailHeader text="필수" essential />
        <DsDetailHeader text="아이콘" icon />
        <DsDetailHeader text="필수+아이콘" essential icon />
      </div>

      <div class="sg__divider" />

      <h3 class="sg__sub-title">Detail Cell — 다양한 state</h3>
      <div style="display:grid; grid-template-columns:160px 400px 160px 200px; width:920px">
        <DsDetailHeader text="제목" />
        <DsDetailCell :width="400">아바타: 물의 길</DsDetailCell>
        <DsDetailHeader text="장르" essential />
        <DsDetailCell :width="200"><DsBadge type="round" color="purple">액션/SF</DsBadge></DsDetailCell>

        <DsDetailHeader text="등록일" />
        <DsDetailCell :width="400">2025-01-01</DsDetailCell>
        <DsDetailHeader text="승인상태" icon />
        <DsDetailCell :width="200"><DsStatusBadge status="승인완료" /></DsDetailCell>

        <DsDetailHeader text="검색" />
        <DsDetailCell :width="400"><div style="width:240px"><DsTextField :model-value="filled" size="small" /></div></DsDetailCell>
        <DsDetailHeader text="버튼" />
        <DsDetailCell :width="200"><DsButton size="small">선택</DsButton></DsDetailCell>

        <DsDetailHeader text="라디오" />
        <DsDetailCell :width="400">
          <DsRadioGroup v-model="radioGroup" :options="[{label:'승인',value:'a'},{label:'반려',value:'b'}]" />
        </DsDetailCell>
        <DsDetailHeader text="이메일" />
        <DsDetailCell :width="200">user@example.com</DsDetailCell>
      </div>

      <h3 class="sg__sub-title">Detail Form — 등록 페이지 4열 폼 패턴</h3>
      <p class="sg__desc">단편/시리즈 신작 계획 등록의 콘텐츠 등록 폼처럼, Header(160px blue-50) + Cell(white) 4열 그리드. 한 줄 전체로 늘리려면 row에 <code>df-row--full</code> 적용해 cell이 3컬럼 span. 인풋/셀렉트/데이트픽커는 모두 default(medium=34px)로 통일해 셀 안 세로 중심 정렬.</p>
      <div class="sg__detail-form">
        <div class="sg-df-row">
          <DsDetailHeader text="단편명" essential />
          <DsDetailCell><DsTextField :model-value="filled" /></DsDetailCell>
          <DsDetailHeader text="수급 카테고리" essential />
          <DsDetailCell><DsSelect :model-value="'영화>외국영화'" :options="['영화>외국영화','영화>국내영화']" /></DsDetailCell>
        </div>
        <div class="sg-df-row sg-df-row--full">
          <DsDetailHeader text="시놉시스" />
          <DsDetailCell><DsTextarea :model-value="'시놉시스 입력 예시'" :rows="3" /></DsDetailCell>
        </div>
      </div>

      <div class="sg__divider" />

      <SgApi
        name="DsDetailHeader, DsDetailCell"
        snippet="<!-- Detail Form 4열 패턴 (단편/시리즈 등록 페이지 참고) -->
<div class='detail-form'>
  <div class='df-row'>
    <DsDetailHeader text='단편명' essential />
    <DsDetailCell><DsTextField v-model='form.title' /></DsDetailCell>
    <DsDetailHeader text='수급 카테고리' essential />
    <DsDetailCell><DsSelect v-model='form.cat' :options='cats' /></DsDetailCell>
  </div>
  <div class='df-row df-row--full'>
    <DsDetailHeader text='시놉시스' />
    <DsDetailCell><DsTextarea v-model='form.synopsis' :rows='5' /></DsDetailCell>
  </div>
</div>

<style>
.detail-form { display: grid; grid-template-columns: 160px 1fr 160px 1fr; border-top: 1px solid var(--ds-border-gray-400); }
.df-row { display: contents; }
.df-row--full > :nth-child(2) { grid-column: 2 / 5; }
</style>"
        :props="[
          { name: '(header) text', type: 'String', default: '—', desc: '헤더 라벨' },
          { name: '(header) essential', type: 'Boolean', default: 'false', desc: '필수(*) 표시' },
          { name: '(header) icon', type: 'Boolean', default: 'false', desc: '도움말 아이콘 표시' },
          { name: '(cell) width', type: 'Number', default: '—', desc: '셀 폭 (px)' },
          { name: '(cell) align', type: `'left' | 'center' | 'right'`, default: `'left'`, desc: '정렬' },
        ]"
      />
    </section>

    <!-- Usage Guide -->
    <section id="usage" class="sg__section">
      <div class="sg__page-title"><h2>Usage Guide</h2></div>

      <h3 class="sg__sub-title">Import</h3>
      <pre class="sg__code">{{ `// 화면에서 컴포넌트 import
import { DsButton, DsBadge, DsTextField } from '@/components/ds'

// 레이아웃 컴포넌트
import GnbBar from '@/components/cp-con/layout/GnbBar.vue'
import LnbDrawer from '@/components/cp-con/layout/LnbDrawer.vue'` }}</pre>

      <h3 class="sg__sub-title">Token 사용 (CSS)</h3>
      <pre class="sg__code">{{ `.my-card {
  background: var(--ds-fill-gray-white);
  border: 1px solid var(--ds-border-gray-300);
  border-radius: var(--ds-radius-4);
  padding: var(--ds-space-20);
  font-size: var(--ds-fs-body-13);
  color: var(--ds-text-gray-900);
}` }}</pre>

      <div class="sg__divider" />

      <h3 class="sg__sub-title">규칙</h3>
      <ul class="sg__rules">
        <li><strong>금지</strong>: 화면에 hex 값(<code>#6c71ff</code>) 직접 작성. 반드시 <code>var(--ds-fill-blue-500)</code>.</li>
        <li><strong>금지</strong>: 버튼/입력을 직접 마크업. 반드시 <code>&lt;DsButton&gt;</code> / <code>&lt;DsTextField&gt;</code> 사용.</li>
        <li><strong>금지</strong>: AG Grid를 <code>AgGridVue</code>로 직접 import. <code>&lt;AgGridWrapper&gt;</code> 사용.</li>
        <li><strong>금지</strong>: <code>alert()</code> / <code>window.confirm</code>. <code>useAlert()</code> 사용.</li>
        <li><strong>토큰 추가/변경</strong>: <code>src/styles/tokens.css</code>에서만. 변경 즉시 전 화면 자동 반영.</li>
        <li><strong>새 컴포넌트</strong>: <code>src/components/ds/Ds*.vue</code> 신규 + <code>src/components/ds/index.js</code> export.</li>
        <li><strong>새 화면</strong>: <code>src/views/&lt;site&gt;/XxxView.vue</code> (site = cp-con · kt-flow1 · common) + 라우터 등록 + 해당 사이트 LNB 메뉴 연결 3곳.</li>
      </ul>
    </section>
    </main>
  </div>
</template>

<style scoped>
.sg {
  width: 100%; padding: 40px 24px 80px;
  display: grid; grid-template-columns: 220px 1fr; gap: 40px;
  align-items: start;
}
.sg__main { min-width: 0; }

/* ===== Left TOC sidebar ===== */
.sg__toc {
  position: sticky; top: 24px;
  align-self: start;
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  padding: 16px 8px 16px 0;
}
.sg__toc-title {
  font-size: 16px; font-weight: 700; color: var(--ds-text-gray-900);
  padding: 0 12px 12px;
  border-bottom: 1px solid var(--ds-fill-gray-200);
  margin-bottom: 8px;
}
.sg__toc-nav { display: flex; flex-direction: column; }
.sg__toc-link {
  display: block;
  padding: 8px 12px;
  font-size: 13px; font-weight: 500; color: var(--ds-text-gray-600);
  text-decoration: none;
  border-left: 2px solid transparent;
  border-radius: 0 var(--ds-radius-4) var(--ds-radius-4) 0;
  transition: color 0.12s ease, background 0.12s ease, border-color 0.12s ease;
}
.sg__toc-link:hover { color: var(--ds-text-gray-900); background: var(--ds-fill-gray-50); }
.sg__toc-link--active {
  color: var(--ds-text-blue-500); font-weight: 700;
  background: var(--ds-fill-blue-75);
  border-left-color: var(--ds-fill-blue-500);
}
.sg__hero h1 { margin: 0 0 8px; font-size: 28px; font-weight: 700; color: var(--ds-text-gray-900); }
.sg__hero p { margin: 0; color: var(--ds-text-gray-700); font-size: 14px; line-height: 1.6; }
.sg__note { margin-top: 8px !important; font-size: 12px !important; color: var(--ds-text-gray-500) !important; }
.sg__note code {  color: var(--ds-text-blue-500); padding: 1px 5px; background: var(--ds-fill-blue-75); border-radius: 4px; }

.sg__section {
  margin-top: 48px; background: var(--ds-fill-gray-white); border-radius: 8px;
  padding: 28px 32px;
  scroll-margin-top: 24px;
}
/* Search Area 처럼 카드들 위에 옅은 배경이 필요한 섹션 */
.sg__section--tinted { background: var(--ds-fill-description-bg); }
.sg__section h2 { margin: 0 0 20px; font-size: 18px; font-weight: 700; color: var(--ds-text-gray-900); }
.sg__section h3 { margin: 16px 0 12px; font-size: 14px; font-weight: 600; color: var(--ds-text-gray-700); }
.sg__block { margin-bottom: 8px; }
.sg__row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; background: transparent; padding: 0; }
.sg__half { background: var(--ds-fill-gray-white); border-radius: 8px; padding: 28px 32px; }

/* ===== Page title (Figma page_title) ===== */
.sg__page-title {
  margin: -28px -32px 28px;
  padding: 60px 40px;
  background: linear-gradient(135deg, #e9ecff 0%, #f4f1ff 50%, #ffe9f4 100%);
  border-top-left-radius: 8px; border-top-right-radius: 8px;
}
.sg__page-title h2 { margin: 0; font-size: 56px; font-weight: 700; color: var(--ds-text-gray-900); letter-spacing: -0.02em; }
.sg__sub-title { margin: 24px 0 16px; font-size: 24px; font-weight: 700; color: var(--ds-text-gray-900); }
.sg__divider { height: 1px; background: var(--ds-fill-gray-200); margin: 32px 0; }

/* ===== Logo section ===== */
.sg__logo-stage {
  background: var(--ds-fill-gray-50);
  border-radius: 8px;
  padding: 80px 40px;
  display: flex; align-items: center; justify-content: center;
}
.sg__logo-mark { display: flex; align-items: center; gap: 16px; }
.sg__logo-kt    { height: 92px; width: auto; }
.sg__logo-flow1 { height: 84px; width: auto; }
.sg__brand-row {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;
}
.sg__brand-cell {
  height: 200px; border-radius: 8px; padding: 20px;
  display: flex; flex-direction: column; justify-content: flex-end;
}
.sg__brand-hex { font-size: 18px; font-weight: 700;  }
.sg__brand-cell small { font-size: 12px; opacity: 0.8; margin-top: 4px; }
.sg__brand-bar {
  margin-top: 16px; height: 20px; border-radius: 999px;
  background: linear-gradient(90deg, #F05BB2 0%, #B769F6 33%, #6C71FF 66%, #6CB1FF 100%);
}

/* ===== Colors section ===== */
.sg__primary-row { display: grid; grid-template-columns: 2fr 1fr; gap: 12px; }
.sg__primary-cell {
  height: 200px; border-radius: 8px; padding: 32px;
  display: flex; align-items: flex-end;
}
.sg__primary-meta { display: flex; flex-direction: column; gap: 4px; }
.sg__primary-meta strong { font-size: 18px; font-weight: 700; }
.sg__primary-meta span { font-size: 14px;  opacity: 0.9; }

.sg__palette-row { margin-bottom: 20px; }
.sg__palette-label { font-size: 14px; font-weight: 700; color: var(--ds-text-gray-900); margin-bottom: 8px; }
.sg__palette-cells { display: flex; gap: 2px; border-radius: 6px; overflow: hidden; }
.sg__palette-cell {
  flex: 1; height: 80px; padding: 10px 12px;
  display: flex; flex-direction: column; justify-content: flex-end; gap: 2px;
  font-size: 11px; font-weight: 500;
}
.sg__palette-hex { font-size: 11px;  opacity: 0.85; }

/* ===== Typography section ===== */
.sg__typo-intro {
  padding: 8px 0 28px; margin-bottom: 28px;
  display: flex; align-items: center; justify-content: space-between; gap: 24px;
}
.sg__typo-intro p { margin: 0; font-size: 14px; line-height: 1.7; color: var(--ds-text-gray-700); }
.sg__typo-intro a { color: var(--ds-text-blue-500); text-decoration: none; }
.sg__typo-intro a:hover { text-decoration: underline; }
.sg__typo-weights { display: flex; gap: 16px; }
.sg__typo-weight {
  min-width: 80px; padding: 12px 8px;
  display: flex; flex-direction: column; align-items: center; gap: 6px;
}
.sg__typo-weight small { white-space: nowrap; }
.sg__typo-weight span { font-size: 28px; color: var(--ds-text-gray-900); line-height: 1; }
.sg__typo-weight small { font-size: 11px; color: var(--ds-text-gray-600); }

.sg__typo-group { margin-bottom: 28px; }
.sg__typo-table { width: 100%; border-collapse: collapse; }
.sg__typo-table thead th {
  text-align: left; padding: 12px 16px;
  background: var(--ds-fill-gray-50);
  font-size: 13px; font-weight: 700; color: var(--ds-text-gray-700);
  border-bottom: 1px solid var(--ds-fill-gray-200);
}
.sg__typo-table thead th:nth-child(1) { width: 60%; }
.sg__typo-table thead th:nth-child(2),
.sg__typo-table thead th:nth-child(3) { width: 20%; }
.sg__typo-table tbody td {
  padding: 14px 16px; border-bottom: 1px solid var(--ds-fill-gray-200);
  font-size: 13px; color: var(--ds-text-gray-900);
}
.sg__typo-table tbody td:nth-child(2),
.sg__typo-table tbody td:nth-child(3) { color: var(--ds-text-gray-700);  }

/* legacy swatches (kept for components that may still reference) */
.sg__swatches { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px,1fr)); gap: 8px; }
.sg__swatch {
  height: 76px; border-radius: 6px; padding: 10px 12px;
  display: flex; flex-direction: column; justify-content: space-between;
  border: 1px solid var(--ds-fill-gray-200);
}
.sg__swatch-name { font-size: 11px; font-weight: 500; opacity: 0.9; }
.sg__swatch-hex { font-size: 12px; font-weight: 700;  }

.sg__table { width: 100%; border-collapse: collapse; }
.sg__table th, .sg__table td {
  text-align: left; padding: 12px; border-bottom: 1px solid var(--ds-fill-gray-200);
  font-size: 13px; color: var(--ds-text-gray-900);
}
.sg__table th { background: var(--ds-fill-gray-50); font-weight: 600; color: var(--ds-text-gray-700); }
.sg__table code {  font-size: 12px; color: var(--ds-text-blue-500); }

.sg__bar { display: inline-block; height: 16px; background: var(--ds-fill-blue-500); border-radius: 2px; vertical-align: middle; }
.sg__token-code {
  display: inline-block; padding: 2px 8px; border-radius: 4px;
  background: var(--ds-fill-blue-75); color: var(--ds-text-blue-500);
   font-size: 12px;
}

.sg__radiuses {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 20px;
}
.sg__radius {
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  padding: 16px 8px;
}
.sg__radius-box {
  width: 72px; height: 72px;
  background: var(--ds-fill-blue-75);
  border: 1px solid var(--ds-border-blue-500);
}
.sg__radius small { color: var(--ds-text-gray-500); font-size: 11px;  }

/* ===== Logo combo + kt variants (Figma 4:15788) ===== */
.sg__logo-combo { display: flex; align-items: center; gap: 12px; }
.sg__logo-combo__kt { height: 40px; width: auto; }
.sg__logo-combo__flow1 { height: 40px; width: auto; }
.sg__kt-variant { height: 32px; width: auto; display: inline-block; }

/* ===== Icon strips (Figma 4:15518) ===== */
.sg__icon-strip-items {
  display: flex; flex-wrap: wrap; align-items: center; gap: 24px;
  padding: 8px 0;
}
.sg__icon-strip-items + .sg__icon-strip-items { padding-top: 0; }
.sg__icon-cell {
  display: inline-flex; align-items: center; justify-content: center;
  color: var(--ds-text-gray-800);
}

/* ===== Button matrix (Figma 4:13117) ===== */
.sg__btn-section { margin-bottom: 8px; }
.sg__btn-matrix { width: 100%; border-collapse: collapse; }
.sg__btn-matrix thead th {
  text-align: left; padding: 10px 16px;
  font-size: 12px; font-weight: 700; color: var(--ds-text-gray-600);
  border-bottom: 1px solid var(--ds-fill-gray-200);
  background: var(--ds-fill-gray-50);
}
.sg__btn-matrix tbody td {
  padding: 14px 16px; border-bottom: 1px solid var(--ds-fill-gray-200);
  vertical-align: middle;
}
.sg__btn-state {
  width: 140px; font-size: 13px; font-weight: 600; color: var(--ds-text-gray-700);
}
.sg__cap { display: block; font-size: 11px; color: var(--ds-text-gray-600); margin-bottom: 6px; }

/* Force-hover row: simulate :hover styling on DsButton without user interaction */
.sg__force-hover :deep(.ds-btn--primary):not(.v-btn--disabled):not(:disabled) {
  background: var(--ds-fill-blue-900) !important; border-color: var(--ds-fill-blue-900) !important;
}
.sg__force-hover :deep(.ds-btn--secondary):not(.v-btn--disabled):not(:disabled) {
  background: var(--ds-fill-gray-black) !important; border-color: var(--ds-fill-gray-black) !important;
}
.sg__force-hover :deep(.ds-btn--primary-outline):not(.v-btn--disabled):not(:disabled) {
  color: var(--ds-fill-blue-900) !important; border-color: var(--ds-fill-blue-900) !important;
}
.sg__force-hover :deep(.ds-btn--neutral-outline):not(.v-btn--disabled):not(:disabled) {
  border-color: var(--ds-fill-gray-600) !important; color: var(--ds-text-gray-black) !important;
}

/* Tooltip 8-position grid */
.sg__tt-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
  padding: 40px 0;
}
.sg__tt-cell {
  min-height: 80px; display: flex; align-items: center; justify-content: center;
}

/* Hover simulation for checkbox/radio */
.sg__force-hover :deep(.ds-checkbox__box),
.sg__force-hover :deep(.ds-radio__circle) {
  border-color: var(--ds-border-blue-500) !important;
  background: var(--ds-fill-blue-75) !important;
}

/* Force-focus simulation for input states */
.sg__force-focus :deep(.ds-field):not(.ds-field--disabled):not(.ds-field--readonly):not(.ds-field--error) {
  border-color: var(--ds-border-blue-500) !important;
  box-shadow: 0 0 0 2px var(--ds-fill-blue-75) !important;
}
.sg__force-focus :deep(.ds-textarea):not([disabled]):not([readonly]) {
  border-color: var(--ds-border-blue-500) !important;
  box-shadow: 0 0 0 2px var(--ds-fill-blue-75) !important;
}

/* Detail Form pattern preview */
.sg__detail-form {
  display: grid;
  grid-template-columns: 160px 1fr 160px 1fr;
  /* 첫 행 상단 보더는 내부 행 구분선(gray-200)보다 진하게 (시안) */
  border-top: 1px solid var(--ds-border-gray-400);
  margin-bottom: 16px;
}
.sg-df-row { display: contents; }
.sg-df-row--full > :nth-child(2) { grid-column: 2 / 5; }
.sg__detail-form :deep(.ds-tf),
.sg__detail-form :deep(.ds-ta),
.sg__detail-form :deep(.ds-select) { width: 100%; }

/* Page Action Buttons — 아이콘 사이즈 override (실제 등록 페이지와 동일) */
.sg-btn-rights :deep(.ds-icon) { width: 17px !important; height: 17px !important; }
.sg-btn-tpl :deep(.ds-icon) { width: 12px !important; height: 12px !important; }

/* Inline Pill Action — 모양은 DsSearchButton pill, 색상은 Neutral Outline */
.sg-partner-pill {
  background: var(--ds-fill-gray-white) !important;
  border: 1px solid var(--ds-border-gray-300) !important;
}
.sg-partner-pill :deep(.ds-sbtn__label) { color: var(--ds-text-gray-black) !important; }
.sg-partner-pill :deep(.ds-icon) { color: var(--ds-text-gray-black) !important; }
.sg-partner-pill :deep(.ds-icon svg [fill]) { fill: var(--ds-text-gray-black) !important; }
.sg-partner-pill :deep(.ds-icon svg [stroke]) { stroke: var(--ds-text-gray-black) !important; }
.sg-partner-pill:hover:not(:disabled) {
  background: var(--ds-fill-gray-white) !important;
  border-color: var(--ds-fill-blue-900) !important;
}
.sg-partner-pill:disabled {
  background: var(--ds-fill-gray-200) !important;
  border-color: var(--ds-border-gray-300) !important;
}
.sg-partner-pill:disabled :deep(.ds-sbtn__label) { color: var(--ds-text-gray-500) !important; }
.sg-partner-pill:disabled :deep(.ds-icon) { color: var(--ds-text-gray-500) !important; }
.sg-partner-pill:disabled :deep(.ds-icon svg [fill]) { fill: var(--ds-text-gray-500) !important; }
.sg-partner-pill:disabled :deep(.ds-icon svg [stroke]) { stroke: var(--ds-text-gray-500) !important; }

/* Login button preview (mirrors LoginView .login-btn) */
.login-btn-preview {
  width: 424px;
  display: flex; align-items: center; justify-content: center;
  padding: var(--ds-space-20);
  background: var(--ds-fill-blue-500);
  color: var(--ds-text-gray-white);
  border: 0; border-radius: var(--ds-radius-14);
  font-family: var(--ds-font-family);
  font-size: 20px; font-weight: var(--ds-fw-bold); line-height: 1.4;
  cursor: pointer;
}
.login-btn-preview:hover { background: var(--ds-fill-blue-900); }

/* ===== Demo frames (GNB/LNB embeds) ===== */
.sg__demo-frame {
  position: relative; transform: translateZ(0);
  margin-bottom: 24px; padding: 0;
  overflow: hidden;
}
.sg__demo-frame--lnb { height: 540px; display: flex; }

/* LNB 5 변형 가로 배치 (Figma 4:15343) */
.sg__lnb-row {
  display: grid; grid-template-columns: repeat(4, 280px) 74px;
  gap: 16px; padding: 20px;
  overflow-x: auto;
}
.sg__lnb-cap { display: flex; flex-direction: column; gap: 8px; }
.sg__lnb-frame {
  position: relative; transform: translateZ(0);
  height: 520px;
  overflow: visible;
}
.sg__lnb-frame--narrow { width: 74px; }

/* 💠 Basic LNB depth states (Figma 4:15401) */
.sg__lnb-depth-label { margin: 24px 0 12px; font-size: 14px; font-weight: 700; color: var(--ds-text-gray-700); }
.sg__lnb-depth-label:first-of-type { margin-top: 8px; }
.sg__lnb-states {
  display: grid; grid-template-columns: repeat(4, 240px);
  gap: 24px;
  padding: 20px 0;
}
.sg__lnb-state-cell { display: flex; flex-direction: column; gap: 8px; }

.lnb-1dp-demo {
  display: flex; align-items: center; gap: 6px;
  height: 50px; padding: 8px 0;
  background: var(--ds-fill-gray-white);
}
.lnb-1dp-demo--icon-only { width: 50px; justify-content: center; padding: 0; }
.lnb-1dp-demo__icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 34px; height: 34px; padding: 6px; border-radius: var(--ds-radius-8);
  color: var(--ds-text-gray-700);
}
.lnb-1dp-demo__icon--active { background: var(--ds-fill-gray-100); color: var(--ds-text-gray-black); }
.lnb-1dp-demo__txt {
  flex: 1; font-size: 15px; line-height: 1.5;
  font-family: var(--ds-font-family);
}
.lnb-1dp-demo__txt--default { color: var(--ds-text-gray-700); font-weight: 700; }
.lnb-1dp-demo__txt--select { color: var(--ds-text-gray-black); font-weight: 700; }

.lnb-2dp-demo {
  display: flex; flex-direction: column; align-items: flex-start;
  width: 220px; padding: 8px 0;
  border-radius: var(--ds-radius-6);
  background: var(--ds-fill-gray-white);
}
.lnb-2dp-demo--hover, .lnb-2dp-demo--select, .lnb-2dp-demo--expanded {
  background: var(--ds-fill-gray-100);
}
.lnb-2dp-demo__txt {
  width: 100%; padding: 4px 12px 4px 40px;
  font-size: 14px; line-height: 1.5;
  color: var(--ds-text-gray-700); font-weight: 500;
  font-family: var(--ds-font-family);
}
.lnb-2dp-demo__txt--hover { font-weight: 700; }
.lnb-2dp-demo__txt--select { color: var(--ds-text-blue-500); font-weight: 700; }

.lnb-3dp-demo {
  display: flex; align-items: center; gap: 6px;
  width: 220px; min-height: 32px;
  padding: 6px 12px 6px 40px;
  font-size: 13px; line-height: 1.5;
  font-family: var(--ds-font-family);
  color: var(--ds-text-gray-600); font-weight: 400;
}
.lnb-3dp-demo__bullet { display: inline-block; width: 13px; text-align: center; color: var(--ds-text-gray-500); font-weight: 700; }
.lnb-3dp-demo--hover { font-weight: 700; }
.lnb-3dp-demo--select { color: var(--ds-text-blue-500); font-weight: 700; }
.lnb-3dp-demo--select .lnb-3dp-demo__bullet { color: var(--ds-text-blue-500); }
.sg__lnb-row :deep(.lnb) { position: relative !important; top: auto !important; height: 100%; box-shadow: none; }
/* Collapsed 변형: 74px 폭에 아이콘만 표시 (Figma 4:15393, LnbDrawer .lnb--collapsed 가 처리) */
/* Embedded GnbBar/LnbDrawer are position:fixed in real layout — keep them visually
   inside the demo frame only on this page */
.sg__demo-frame :deep(.gnb) { position: relative !important; }
.sg__demo-frame :deep(.lnb) { position: relative !important; top: auto !important; height: 100%; }

.sg__icons { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px,1fr)); gap: 12px; }
.sg__icon {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  padding: 14px 8px;
}
.sg__icon small { font-size: 10px; color: var(--ds-text-gray-700);  text-align: center; word-break: break-all; }

.sg__row-inline { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
.sg__grid2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 24px; }
.sg__mt { margin-top: 12px; }

.sg__code {
  background: var(--ds-fill-gray-900); color: #e6e8ef;
  border-radius: 8px; padding: 20px 24px;
  margin: 0 0 20px; font-size: 13px;
  line-height: 1.7; overflow-x: auto;
}
.sg__rules { margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.9; color: var(--ds-text-gray-900); }
.sg__rules li { margin-bottom: 4px; }
.sg__rules strong { color: var(--ds-text-red-300); margin-right: 4px; }
.sg__rules code { background: var(--ds-fill-blue-75); padding: 2px 8px; border-radius: 4px; font-size: 12px; color: var(--ds-text-blue-500);  }
</style>
