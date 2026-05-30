<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { DsIcon, DsCountBadge, DsButton } from '@/components/ds'
import logoKt from '@/assets/logo/logo-kt.svg'
import logoFlow1 from '@/assets/logo/logo-kt-flow1.svg'

const router = useRouter()
const auth = useAuthStore()
const notiCount = 1

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <header class="gnb">
    <router-link to="/plan" class="brand">
      <img :src="logoKt" alt="KT" class="brand-kt" />
      <img :src="logoFlow1" alt="FLOW1" class="brand-flow1" />
    </router-link>

    <nav class="gnb-right">
      <button type="button" class="icon-btn" aria-label="알림">
        <DsIcon name="fill-noti" :size="24" />
        <DsCountBadge v-if="notiCount" :value="notiCount" class="badge" />
      </button>
      <button type="button" class="icon-btn" aria-label="내 정보 관리" @click="router.push('/member/my-info')">
        <DsIcon name="fill-user-2" :size="24" />
      </button>
      <DsButton type="neutral-outline" size="medium" @click="logout">로그아웃</DsButton>
    </nav>
  </header>
</template>

<style scoped>
.gnb {
  position: fixed; top: 0; left: 0; right: 0; height: 64px;
  background: var(--ds-fill-gray-white);
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--ds-space-16) 34px;
  z-index: 100;
}
/* 시안: GNB 하단 2px pink-500 솔리드 라인 (Figma 4:15484) */
.gnb::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 2px;
  background: var(--ds-fill-pink-500);
}

.brand {
  display: flex; align-items: center; gap: var(--ds-space-4);
  text-decoration: none; width: 140px;
}
.brand-kt    { height: 22px; width: auto; }
.brand-flow1 { height: 22px; width: auto; }

.gnb-right { display: flex; align-items: center; gap: var(--ds-space-20); }

.icon-btn {
  position: relative;
  width: 24px; height: 24px;
  display: inline-flex; align-items: center; justify-content: center;
  background: transparent; border: 0; cursor: pointer; padding: 0;
}
.badge { position: absolute; top: -3px; left: 13px; }
</style>
