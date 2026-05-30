<script setup>
import { computed, shallowRef } from 'vue'
import { useRouter } from 'vue-router'

// 작업목록에서 모달을 바로 열어볼 수 있도록 전 모달 컴포넌트 import
import LoginHelpModal from '@/components/cp-con/modals/LoginHelpModal.vue'
import NoticeRegisterModal from '@/components/cp-con/modals/NoticeRegisterModal.vue'
import ApprovalRequestModal from '@/components/cp-con/modals/ApprovalRequestModal.vue'
import RightsContractSearchModal from '@/components/cp-con/modals/RightsContractSearchModal.vue'
import SingleSearchModal from '@/components/cp-con/modals/SingleSearchModal.vue'
import SeriesSearchModal from '@/components/cp-con/modals/SeriesSearchModal.vue'
import BatchUploadModal from '@/components/cp-con/modals/BatchUploadModal.vue'
import TvAppInboundNewModal from '@/components/cp-con/modals/TvAppInboundNewModal.vue'
import TvAppInboundDetailModal from '@/components/cp-con/modals/TvAppInboundDetailModal.vue'
import RepUserChangeModal from '@/components/cp-con/modals/RepUserChangeModal.vue'
import logoKtSymbol from '@/assets/logo/logo-kt.svg'
import logoKtFlow1 from '@/assets/logo/logo-kt-flow1.svg'

const router = useRouter()

function resolveHref(to) {
  return to ? router.resolve(to).href : undefined
}
function statusLabel(s) { return s === 'done' ? '완료' : s === 'wip' ? '작업중' : '대기' }

// 모달 파일명 → 컴포넌트 매핑. 모달 항목 클릭 시 작업목록에서 바로 띄운다.
const modalMap = {
  LoginHelpModal, NoticeRegisterModal, ApprovalRequestModal,
  RightsContractSearchModal, SingleSearchModal, SeriesSearchModal,
  BatchUploadModal, TvAppInboundNewModal, TvAppInboundDetailModal, RepUserChangeModal,
}
const openModalComp = shallowRef(null)
const openModalProps = shallowRef({})
function openModal(m) {
  if (modalMap[m.file]) {
    openModalComp.value = modalMap[m.file]
    openModalProps.value = m.props || {}
  }
}
function closeModal() { openModalComp.value = null; openModalProps.value = {} }

// 작업 현황을 사이트(코드베이스 그룹) 단위로 분기.
//  - common  : 양 사이트 공통 (스타일 가이드 등)
//  - cp-con  : CP Site — 1차 작업. **CP Site 사이드(LNB) 메뉴 구조 그대로** 정리해 작업여부 표시
//  - kt-flow1: KT FLOW1 — 2차 작업, 약 80개 화면 예정 (피그마 시안 대기)
// item.status: 'done' | 'wip' | 'todo'
// item.subPages: 해당 메뉴의 하위 화면(등록/상세/수정 등) — 클릭해 바로 열람
const sites = [
  {
    key: 'common',
    label: '공통',
    desc: '양 사이트 공통 — 디자인 시스템 / 공통 컴포넌트',
    tone: 'error',
    sections: [
      {
        title: '스타일 가이드',
        subtitle: '디자인 토큰 + 공통 컴포넌트 — 작업 시 항상 참조',
        color: 'success',
        items: [
          { name: '스타일 가이드', to: '/style-guide', status: 'done' },
        ],
      },
    ],
  },
  {
    key: 'cp-con',
    label: 'CP Site',
    desc: 'Content Partner — 1차 작업 (CP Site 사이드 메뉴 기준)',
    tone: 'primary',
    sections: [
      {
        title: '진입',
        subtitle: 'LNB 외 진입 화면',
        color: 'secondary',
        items: [
          {
            name: '로그인', to: '/login', status: 'done',
            modals: [
              { name: '이용가이드', file: 'LoginHelpModal', props: { mode: 'guide' } },
              { name: '로그인 도움말', file: 'LoginHelpModal', props: { mode: 'help' } },
            ],
          },
        ],
      },
      {
        title: '콘텐츠 관리',
        subtitle: 'LNB — 콘텐츠 관리',
        color: 'primary',
        items: [
          {
            name: '신작계획 관리', to: '/plan', status: 'done',
            subPages: [
              { name: '단편 신작 계획 등록', to: '/plan/new/single' },
              { name: '단편 신작 계획 상세', to: '/plan/single/1' },
              { name: '단편 신작 계획 수정', to: '/plan/single/1/edit' },
              { name: '시리즈 신작 계획 등록', to: '/plan/new/series' },
              { name: '시리즈 신작 계획 상세', to: '/plan/series/1' },
              { name: '시리즈 신작 계획 수정', to: '/plan/series/1/edit' },
            ],
            modals: [
              { name: '통지 등록', file: 'NoticeRegisterModal' },
              { name: '승인요청', file: 'ApprovalRequestModal' },
              { name: '판권계약검색', file: 'RightsContractSearchModal' },
              { name: '단편 조회', file: 'SingleSearchModal' },
              { name: '시리즈 조회', file: 'SeriesSearchModal' },
              { name: '일괄 업로드', file: 'BatchUploadModal' },
            ],
          },
          {
            name: 'TV앱 입고 관리', to: '/tv-app/inbound', status: 'done',
            modals: [
              { name: '신규 입고 등록', file: 'TvAppInboundNewModal' },
              { name: '입고 상세', file: 'TvAppInboundDetailModal' },
            ],
          },
          { name: '통지 목록 관리', to: null, status: 'todo' },
          { name: '정산서 관리', to: null, status: 'todo' },
        ],
      },
      {
        title: '현황/통계',
        subtitle: 'LNB — 현황/통계',
        color: 'primary',
        items: [
          { name: '콘텐츠 통계', to: '/stats/content', status: 'done' },
          { name: '판매이용통계', to: '/stats/sales', status: 'done' },
        ],
      },
      {
        title: '회원정보',
        subtitle: 'LNB — 회원정보',
        color: 'primary',
        items: [
          {
            name: '파트너정보 관리', to: '/member/my-info', status: 'done',
            modals: [{ name: '대표사용자 변경 신청', file: 'RepUserChangeModal' }],
          },
          { name: 'CP정보 관리', to: null, status: 'todo' },
          { name: '사용자 관리', to: null, status: 'todo' },
        ],
      },
      {
        title: '가이드',
        subtitle: 'LNB — 가이드',
        color: 'primary',
        items: [
          { name: 'CP길라잡이', to: '/guide', status: 'done' },
        ],
      },
    ],
  },
  {
    key: 'kt-flow1',
    label: 'KT FLOW1',
    desc: '2차 작업 — 약 80개 화면 예정 (별도 레이아웃 KtFlow1Layout)',
    tone: 'grey',
    countLabel: '?',
    sections: [
      {
        title: '예정',
        subtitle: '피그마 시안 나오면 진행',
        color: 'grey',
        items: [
          { name: '약 80개 화면 (피그마 시안 대기)', to: null, status: 'todo' },
        ],
      },
    ],
  },
]

// 진행률 — 카운트 가능한 화면(CP Site + 공통) 기준. KT FLOW1은 시안 미정이라 '?'.
const countableItems = computed(() =>
  sites
    .filter((g) => g.key !== 'kt-flow1')
    .flatMap((g) => g.sections.flatMap((s) => s.items)),
)
const stats = computed(() => {
  const total = countableItems.value.length
  const done = countableItems.value.filter((i) => i.status === 'done').length
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 }
})
function siteCount(site) {
  if (site.countLabel) return site.countLabel
  const items = site.sections.flatMap((s) => s.items)
  return `${items.filter((i) => i.status === 'done').length} / ${items.length}`
}
</script>

<template>
  <div class="worklist-page">
    <div class="wl-logo">
      <img :src="logoKtSymbol" alt="kt" class="wl-logo__kt" />
      <img :src="logoKtFlow1" alt="FLOW1" class="wl-logo__flow1" />
    </div>
    <header class="worklist-header">
      <div>
        <h1 class="text-h4 font-weight-bold mb-1">작업 리스트</h1>
        <p class="text-body-2 text-medium-emphasis ma-0">
          CP Site 사이드 메뉴 기준 작업 현황 — 완료된 화면/하위 화면은 클릭하면 새 탭으로 열립니다.
        </p>
      </div>
      <div class="progress-card">
        <div class="progress-num">
          <span class="done">{{ stats.done }}</span>
          <span class="sep">/</span>
          <span class="total">{{ stats.total }}</span>
        </div>
        <div class="progress-label">CP Site 완료 ({{ stats.pct }}%)</div>
        <v-progress-linear :model-value="stats.pct" color="primary" height="8" rounded class="mt-2" />
      </div>
    </header>

    <div v-for="site in sites" :key="site.key" class="site-group" :class="`site-group--${site.key}`">
      <div class="site-head">
        <v-chip :color="site.tone" size="default" variant="flat" label class="site-chip">
          {{ site.label }}
        </v-chip>
        <span class="site-desc">{{ site.desc }}</span>
        <span class="site-count">{{ siteCount(site) }}</span>
      </div>

      <section v-for="s in site.sections" :key="s.title" class="section">
        <div class="section-head">
          <v-chip :color="s.color" size="small" variant="flat" class="mr-2">{{ s.title }}</v-chip>
          <span class="text-caption text-medium-emphasis">{{ s.subtitle }}</span>
        </div>

        <div class="grid">
          <div
            v-for="item in s.items"
            :key="item.name"
            class="card"
            :class="{ 'card--done': item.status === 'done', 'card--wip': item.status === 'wip', 'card--todo': item.status === 'todo' }"
          >
            <div class="card-top">
              <v-icon
                :icon="item.status === 'done' ? 'mdi-check-circle' : item.status === 'wip' ? 'mdi-progress-clock' : 'mdi-clock-outline'"
                :color="item.status === 'done' ? 'success' : item.status === 'wip' ? 'warning' : 'grey'"
                size="20"
              />
              <span class="card-status">{{ statusLabel(item.status) }}</span>
            </div>

            <a v-if="item.to" class="card-name card-name--link" :href="resolveHref(item.to)" target="_blank" rel="noopener">{{ item.name }}</a>
            <div v-else class="card-name">{{ item.name }}</div>
            <div class="card-path">{{ item.to || '—' }}</div>

            <ul v-if="item.subPages && item.subPages.length" class="card-subs">
              <li v-for="sp in item.subPages" :key="sp.to">
                <a :href="resolveHref(sp.to)" target="_blank" rel="noopener" class="card-sub-link">
                  <v-icon icon="mdi-file-link-outline" size="12" class="card-subs__icon" />{{ sp.name }}
                </a>
              </li>
            </ul>

            <ul v-if="item.modals && item.modals.length" class="card-modals">
              <li v-for="m in item.modals" :key="m.file">
                <button
                  v-if="modalMap[m.file]"
                  type="button" class="card-modal-btn"
                  @click="openModal(m)"
                >
                  <v-icon icon="mdi-window-restore" size="11" class="card-modals__icon" />
                  {{ m.name }} <span class="card-modals__file">{{ m.file }}</span>
                </button>
                <span v-else>
                  <v-icon icon="mdi-window-restore" size="11" class="card-modals__icon" />
                  {{ m.name }} <span class="card-modals__file">{{ m.file }}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <!-- 작업목록에서 바로 열어보는 모달 -->
    <component
      :is="openModalComp"
      v-if="openModalComp"
      v-bind="openModalProps"
      :model-value="true"
      @update:model-value="(v) => { if (!v) closeModal() }"
    />
  </div>
</template>

<style scoped>
.worklist-page {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 40px 40px 80px;
  box-sizing: border-box;
}

/* kt 심볼 + FLOW1 로고 — 총 가로 약 200px */
.wl-logo { display: flex; align-items: center; gap: 8px; width: fit-content; margin-bottom: 24px; }
.wl-logo__kt { height: 32px; width: auto; display: block; }
.wl-logo__flow1 { height: 30px; width: auto; display: block; }

.worklist-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.progress-card {
  min-width: 240px;
  background: #f6f7fb;
  border-radius: 14px;
  padding: 16px 20px;
}
.progress-num {
  display: flex;
  align-items: baseline;
  gap: 4px;
}
.progress-num .done {
  font-size: 36px;
  font-weight: 700;
  color: #6c71ff;
  line-height: 1;
}
.progress-num .sep,
.progress-num .total {
  font-size: 20px;
  color: #727a90;
}
.progress-label {
  font-size: 13px;
  color: #727a90;
  margin-top: 2px;
}

/* 사이트 분기 (공통 / CP Site / KT FLOW1) */
.site-group {
  margin-bottom: 48px;
  padding-top: 20px;
  border-top: 2px solid #e5e7eb;
}
.site-group:first-of-type {
  border-top: none;
  padding-top: 0;
}
.site-group--kt-flow1 {
  opacity: 0.85;
}
.site-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}
.site-chip {
  font-weight: 700;
}
.site-desc {
  font-size: 13px;
  color: #727a90;
  flex: 1 1 auto;
}
.site-count {
  font-size: 14px;
  font-weight: 700;
  color: #6c71ff;
  white-space: nowrap;
}

.section {
  margin-bottom: 32px;
}
.section-head {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.grid {
  display: grid;
  /* 한 줄에 카드 4개(각 25%) */
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.card {
  text-align: left;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  font-family: inherit;
  color: inherit;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.card--done:hover,
.card--wip:hover {
  border-color: #6c71ff;
  box-shadow: 0 4px 12px rgba(108, 113, 255, 0.15);
}
.card--wip { border-color: #ffb74d; background: #fff8e6; }
.card--todo {
  background: #fafafa;
  opacity: 0.7;
}

.card-top {
  display: flex;
  align-items: center;
  gap: 6px;
}
.card-status {
  font-size: 12px;
  color: #727a90;
}
.card-name {
  font-size: 15px;
  font-weight: 600;
  color: #373e4d;
  white-space: nowrap;
}
/* 링크는 모두 링크색(파랑)으로 구분 */
.card-name--link { color: #6c71ff; text-decoration: none; cursor: pointer; }
.card-name--link:hover { text-decoration: underline; }
.card-path {
  font-size: 12px;
  color: #9aa0b3;
}

/* 하위 화면 링크 (등록/상세/수정 등) */
.card-subs {
  margin: 8px 0 0;
  padding: 8px 0 0;
  list-style: none;
  border-top: 1px dashed #e5e7eb;
  display: flex; flex-direction: column; gap: 4px;
}
.card-sub-link {
  font-size: 12px;
  color: #6c71ff;
  display: flex; align-items: center; gap: 4px;
  text-decoration: none;
  white-space: nowrap;
}
.card-sub-link:hover { text-decoration: underline; }
.card-subs__icon { color: #6c71ff; flex-shrink: 0; }

.card-modals {
  margin: 8px 0 0;
  padding: 8px 0 0;
  list-style: none;
  border-top: 1px dashed #e5e7eb;
  display: flex; flex-direction: column; gap: 4px;
}
.card-modals li {
  font-size: 12px;
  color: #545b70;
  display: flex; align-items: center; gap: 4px;
  white-space: nowrap;
  overflow: hidden;
  min-width: 0;
}
.card-modals__icon { color: #9aa0b3; flex-shrink: 0; }
.card-modals__file {
  color: #9aa0b3; font-size: 11px; margin-left: 2px;
  overflow: hidden; text-overflow: ellipsis; min-width: 0;
}
/* 클릭하면 작업목록에서 바로 열리는 모달 항목 */
.card-modal-btn {
  display: flex; align-items: center; gap: 4px;
  background: none; border: 0; padding: 0; margin: 0;
  font: inherit; color: #6c71ff; cursor: pointer;
  white-space: nowrap; overflow: hidden; min-width: 0; max-width: 100%;
  text-align: left;
}
.card-modal-btn .card-modals__icon { color: #6c71ff; }
.card-modal-btn:hover { text-decoration: underline; }
</style>
