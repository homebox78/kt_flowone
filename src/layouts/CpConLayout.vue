<script setup>
import { ref } from 'vue'
import GnbBar from '@/components/cp-con/layout/GnbBar.vue'
import LnbDrawer from '@/components/cp-con/layout/LnbDrawer.vue'
import AppFooter from '@/components/cp-con/layout/AppFooter.vue'

const lnbCollapsed = ref(false)
</script>

<template>
  <div class="cp-shell" :class="{ 'cp-shell--lnb-collapsed': lnbCollapsed }">
    <GnbBar />
    <LnbDrawer v-model:collapsed="lnbCollapsed" />
    <main class="cp-main">
      <router-view />
      <AppFooter />
    </main>
  </div>
</template>

<style scoped>
.cp-shell {
  min-height: 100vh;
  background: #f0f1f9;
}
.cp-main {
  margin-left: 260px;
  padding-top: 64px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.cp-shell--lnb-collapsed .cp-main { margin-left: 74px; }
</style>
