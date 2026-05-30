<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { DsIcon, DsButton } from '@/components/ds'
import AppFooter from '@/components/cp-con/layout/AppFooter.vue'
import LoginHelpModal from '@/components/cp-con/modals/LoginHelpModal.vue'
import logoKt from '@/assets/logo/logo-kt.svg'
import logoFlow1 from '@/assets/logo/logo-kt-flow1.svg'

const router = useRouter()
const auth = useAuthStore()
const guideOpen = ref(false)
const helpOpen = ref(false)

function onLogin() {
  // TODO(api): KT SSO 연동
  auth.setSession({ user: { id: 'demo', name: 'CP 사용자' }, token: 'dummy-token' })
  router.push('/plan')
}
</script>

<template>
  <div class="login-page">
    <div class="bg-blur bg-blur--1" />
    <div class="bg-blur bg-blur--2" />

    <main class="login-main">
      <section class="login-card">
        <div class="login-area">
          <div class="logo">
            <img :src="logoKt" alt="KT" class="logo-kt" />
            <img :src="logoFlow1" alt="FLOW1" class="logo-flow1" />
          </div>
          <div class="title">
            <h1>Content Partner</h1>
            <p>백 년 역사를 기반으로 더 큰 미래를 만들어가겠습니다.</p>
          </div>
          <DsButton type="primary" size="xl" block class="login-btn" @click="onLogin">로그인</DsButton>
        </div>

        <div class="divider" />

        <button type="button" class="link-box" @click="guideOpen = true">
          <span class="link-box__inner">
            <span class="link-box__icon"><DsIcon name="login-guide" :size="19" /></span>
            <span class="link-box__text">이용가이드</span>
          </span>
          <DsIcon name="line-right" :size="24" class="link-box__arrow" />
        </button>

        <button type="button" class="link-box" @click="helpOpen = true">
          <span class="link-box__inner">
            <span class="link-box__icon"><DsIcon name="login-help" :size="19" /></span>
            <span class="link-box__text">로그인 도움말</span>
          </span>
          <DsIcon name="line-right" :size="24" class="link-box__arrow" />
        </button>

        <p class="optimized">(Chrome 브라우저 최적화)</p>
      </section>
    </main>

    <AppFooter class="login-footer" variant="login" />

    <LoginHelpModal v-model="guideOpen" mode="guide" />
    <LoginHelpModal v-model="helpOpen" mode="help" />
  </div>
</template>

<style scoped>
.login-page {
  position: relative; min-height: 100vh; overflow: hidden;
  display: flex; flex-direction: column;
  background: var(--ds-fill-background);
}

.bg-blur { position: absolute; border-radius: 50%; filter: blur(160px); opacity: 0.5; pointer-events: none; }
.bg-blur--1 { width: 720px; height: 720px; top: -200px; left: -160px;  background: var(--ds-fill-blue-200); }
.bg-blur--2 { width: 820px; height: 820px; bottom: -260px; right: -180px; background: var(--ds-fill-pink-200); }

.login-main {
  position: relative;
  display: flex; align-items: center; justify-content: center;
  padding: 80px 20px 0;
}

.login-card {
  position: relative;
  width: 520px; max-width: 100%;
  background: var(--ds-fill-gray-white);
  border-radius: var(--ds-radius-28);
  padding: var(--ds-space-48);
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  display: flex; flex-direction: column; gap: var(--ds-space-10);
}

.login-area { display: flex; flex-direction: column; align-items: center; gap: var(--ds-space-20); padding: var(--ds-space-20) 0; }
.logo { display: flex; align-items: center; justify-content: center; gap: var(--ds-space-6); height: 22px; }
.logo-kt    { height: 22px; width: auto; }
.logo-flow1 { height: 20px; width: auto; }

.title { width: 100%; text-align: center; padding-bottom: var(--ds-space-24); display: flex; flex-direction: column; gap: var(--ds-space-4); }
.title h1 { margin: 0; font-size: 36px; font-weight: var(--ds-fw-bold); line-height: var(--ds-lh-display); color: var(--ds-text-gray-800); }
.title p { margin: 0; font-size: var(--ds-fs-body-15); color: var(--ds-text-gray-600); line-height: var(--ds-lh-body); }

/* 로그인 버튼 — Style Guide "Login Button" preview와 일치 (radius 14, fs 20 Bold, 패딩 20) */
.login-btn.ds-btn,
.login-btn :deep(.v-btn),
.login-btn :deep(.ds-btn--xl) {
  height: auto !important;
  min-height: 0 !important;
  padding: var(--ds-space-20) !important;
  border-radius: var(--ds-radius-14) !important;
}
.login-btn :deep(.ds-btn__label),
.login-btn :deep(.v-btn__content) {
  font-size: 20px !important;
  font-weight: var(--ds-fw-bold) !important;
  line-height: 1.4 !important;
}
.login-btn :deep(.v-btn:hover),
.login-btn.ds-btn--primary:hover {
  background: var(--ds-fill-blue-900) !important;
  border-color: var(--ds-fill-blue-900) !important;
}

.divider { height: 1px; background: var(--ds-fill-gray-200); margin: var(--ds-space-4) 0; }

.link-box {
  width: 100%;
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--ds-space-10) var(--ds-space-20);
  background: var(--ds-fill-blue-75);
  border: 0; border-radius: var(--ds-radius-14);
  cursor: pointer; font-family: var(--ds-font-family);
  transition: background 0.15s ease;
}
.link-box:hover { background: var(--ds-fill-blue-100); }
.link-box__inner { display: flex; align-items: center; gap: var(--ds-space-18); }
.link-box__icon {
  width: 40px; height: 40px;
  background: var(--ds-fill-gray-white);
  border-radius: var(--ds-radius-circle);
  display: flex; align-items: center; justify-content: center;
}
.link-box__text { font-size: var(--ds-fs-headline-16); font-weight: var(--ds-fw-medium); color: var(--ds-text-gray-800); }
.link-box__arrow { color: var(--ds-text-gray-600); }

.optimized {
  text-align: center; margin: 0; padding-top: var(--ds-space-20);
  font-size: var(--ds-fs-body-13); font-weight: var(--ds-fw-medium); color: var(--ds-text-gray-600);
}

.login-footer { position: relative; margin-top: 40px; }
</style>
