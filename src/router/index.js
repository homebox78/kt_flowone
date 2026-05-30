import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// 라우트는 사이트 그룹별로 분리:
// - cpCon: 로그인 + 1차 우선 12개 화면 (Content Partner 사이트)
// - ktFlow1: 나머지 68개 화면 (KT FLOW1 사이트, 추후 작업)

const cpConRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/cp-con/LoginView.vue'),
    meta: { public: true, group: 'cp-con' },
  },
  {
    path: '/',
    component: () => import('@/layouts/CpConLayout.vue'),
    meta: { group: 'cp-con' },
    children: [
      // 루트 / 진입 시 작업 리스트로 redirect (CpConLayout 안 거치고)
      { path: '', redirect: '/work-list' },
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/cp-con/HomeView.vue'),
        meta: { title: '대시보드' },
      },
      {
        path: 'plan',
        name: 'PlanManagement',
        component: () => import('@/views/cp-con/PlanManagementView.vue'),
        meta: { public: true, title: '신작 계획 관리' },
      },
      {
        path: 'plan/new/single',
        name: 'PlanContentNewSingle',
        component: () => import('@/views/cp-con/PlanContentNewSingleView.vue'),
        meta: { public: true, title: '단편 신작 계획 등록' },
      },
      {
        path: 'plan/new/series',
        name: 'PlanContentNewSeries',
        component: () => import('@/views/cp-con/PlanContentNewSeriesView.vue'),
        meta: { public: true, title: '시리즈 신작 계획 등록' },
      },
      // 신작 계획 상세/수정 — 등록 폼을 mode 로 재사용 (register | detail | edit)
      {
        path: 'plan/single/:id',
        name: 'PlanContentSingleDetail',
        component: () => import('@/views/cp-con/PlanContentNewSingleView.vue'),
        meta: { public: true, title: '단편 신작 계획 상세', mode: 'detail' },
      },
      {
        path: 'plan/single/:id/edit',
        name: 'PlanContentSingleEdit',
        component: () => import('@/views/cp-con/PlanContentNewSingleView.vue'),
        meta: { public: true, title: '단편 신작 계획 수정', mode: 'edit' },
      },
      {
        path: 'plan/series/:id',
        name: 'PlanContentSeriesDetail',
        component: () => import('@/views/cp-con/PlanContentNewSeriesView.vue'),
        meta: { public: true, title: '시리즈 신작 계획 상세', mode: 'detail' },
      },
      {
        path: 'plan/series/:id/edit',
        name: 'PlanContentSeriesEdit',
        component: () => import('@/views/cp-con/PlanContentNewSeriesView.vue'),
        meta: { public: true, title: '시리즈 신작 계획 수정', mode: 'edit' },
      },
      {
        path: 'tv-app/inbound',
        name: 'TvAppInbound',
        component: () => import('@/views/cp-con/TvAppInboundView.vue'),
        meta: { public: true, title: 'TV앱 입고 관리' },
      },
      {
        path: 'member/my-info',
        name: 'MyInfo',
        component: () => import('@/views/cp-con/MyInfoView.vue'),
        meta: { public: true, title: '내 정보 관리' },
      },
      {
        path: 'guide',
        name: 'Guide',
        component: () => import('@/views/cp-con/GuideView.vue'),
        meta: { public: true, title: 'CP길라잡이' },
      },
      {
        path: 'stats/content',
        name: 'StatsContent',
        component: () => import('@/views/cp-con/StatsContentView.vue'),
        meta: { public: true, title: '단편/시리즈 통계' },
      },
      {
        path: 'stats/sales',
        name: 'StatsSales',
        component: () => import('@/views/cp-con/StatsSalesView.vue'),
        meta: { public: true, title: '판매이용통계' },
      },
    ],
  },
]

const ktFlow1Routes = [
  // TODO: KT FLOW1 사이트 라우트는 별도 레이아웃(KtFlow1Layout) 하위에 추가 예정
]

const commonRoutes = [
  {
    path: '/work-list',
    name: 'WorkList',
    component: () => import('@/views/common/WorkListView.vue'),
    meta: { public: true, title: '작업 리스트' },
  },
  {
    path: '/style-guide',
    name: 'StyleGuide',
    component: () => import('@/views/common/StyleGuideView.vue'),
    meta: { public: true, title: '스타일 가이드' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/common/NotFoundView.vue'),
    meta: { public: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...cpConRoutes, ...ktFlow1Routes, ...commonRoutes],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (!to.meta.public && !auth.isLoggedIn) {
    return { name: 'Login', query: { redirect: to.fullPath } }
  }
})

export default router
