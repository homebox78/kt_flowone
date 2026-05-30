<script setup>
import logoKt from '@/assets/icons/logo-kt-dark.svg'

defineProps({
  variant: { type: String, default: 'default' }, // 'default' | 'login'
})

const policyLinks = [
  { label: '회사소개' },
  { label: '이용약관' },
  { label: '법적고지' },
  { label: '개인정보처리방침', bold: true },
  { label: '청소년보호정책' },
]
const info = [
  '(주)케이티 대표이사 김영섭',
  '사업자등록번호 102-81-42945',
  '(13606) 경기도 성남시 분당구 불정로 90(정자동 206번지)',
  'Tel 031-712-0922',
  'Email ccubeadmin@kt.com',
]
</script>

<template>
  <footer class="cp-footer" :class="`cp-footer--${variant}`">
    <div v-if="variant !== 'login'" class="cp-footer__logo">
      <img :src="logoKt" alt="kt" />
    </div>
    <div class="cp-footer__copy">
      <ul class="policies">
        <li v-for="l in policyLinks" :key="l.label" :class="{ bold: l.bold }">
          <a href="#">{{ l.label }}</a>
        </li>
      </ul>
      <div class="info">
        <p class="info-row">
          <template v-for="(t, i) in info" :key="t">
            <span>{{ t }}</span>
            <span v-if="i < info.length - 1" class="info-row__sep" aria-hidden="true" />
          </template>
        </p>
        <p class="copyright">Copyright© 2012 KT Corp. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.cp-footer {
  display: flex; align-items: center; gap: var(--ds-space-40);
  padding: var(--ds-space-40) calc(var(--ds-space-40) + var(--ds-space-12));
  color: var(--ds-text-gray-600);
}

.cp-footer__logo { display: flex; align-items: center; justify-content: center; width: 36px; flex-shrink: 0; margin-left: 2px; }
.cp-footer__logo img { width: 100%; height: auto; }

.cp-footer__copy { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: var(--ds-space-8); }

.policies {
  list-style: none; padding: 0; margin: 0;
  display: flex; gap: var(--ds-space-20); align-items: center; height: 22px;
  font-size: var(--ds-fs-body-14); font-weight: var(--ds-fw-medium);
}
.policies a { color: var(--ds-text-gray-600); text-decoration: none; }
.policies a:hover { text-decoration: underline; }
.policies .bold a { color: var(--ds-text-gray-700); font-weight: var(--ds-fw-bold); }

.info { display: flex; flex-direction: column; gap: 2px; }
.info-row {
  margin: 0; font-size: var(--ds-fs-body-12); font-weight: var(--ds-fw-regular);
  display: flex; flex-wrap: wrap; gap: var(--ds-space-8); align-items: center;
}
.info-row__sep {
  display: inline-block; width: 1px; height: 8px;
  background: var(--ds-fill-gray-400);
}
.copyright { margin: 0; font-size: var(--ds-fs-body-12); font-weight: var(--ds-fw-regular); }

/* login variant — 로고 없이 가운데 정렬 */
.cp-footer--login { justify-content: center; }
.cp-footer--login .cp-footer__copy { align-items: center; text-align: center; }
.cp-footer--login .policies { justify-content: center; }
.cp-footer--login .info-row { justify-content: center; }
</style>
