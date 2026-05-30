<script setup>
// Figma 59-16385 — 로그인 화면 도움 모달
// mode: 'guide'(이용가이드) | 'help'(로그인 도움말) — 링크별 별도 모달
import { computed } from 'vue'
import { DsModal, DsButton } from '@/components/ds'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  mode: { type: String, default: 'guide' }, // 'guide' | 'help'
})
defineEmits(['update:modelValue'])

const sectionTitle = computed(() => (props.mode === 'help' ? '로그인 도움말' : '이용가이드'))

const guides = [
  { title: '공통 가이드', desc: 'CP Site를 사용하기 위한 기본 개념 및 공통 등록 기능을 쉽게 숙지할 수 있도록 알려주는 가이드입니다' },
  { title: 'TV앱 CP 가이드', desc: 'TV앱 CP사용자가 CP Site를 사용하기 위하여 등록하는 방법을 쉽게 숙지할 수 있도록 알려주는 가이드입니다.' },
  { title: '이용가이드', desc: 'CP 사용자가 CP Site를 사용하기 위하여 파트너 등록 및 사용자 등록 요청하는 방법을 쉽게 숙지할 수 있도록 알려주는 가이드입니다.' },
]
const IE_URL = 'http://windows.microsoft.com/ko-kr/internet-explorer/download-ie'
</script>

<template>
  <DsModal :model-value="modelValue" title="도움이 필요하신가요?" :width="720" @update:model-value="$emit('update:modelValue', $event)">
    <h3 class="sec-title">{{ sectionTitle }}</h3>

    <!-- 이용가이드 -->
    <div v-if="mode === 'guide'" class="info-card guide-card">
      <div v-for="g in guides" :key="g.title" class="guide-row">
        <div class="g-text">
          <p class="row-title">{{ g.title }}</p>
          <p class="row-desc">{{ g.desc }}</p>
        </div>
        <DsButton type="neutral-outline" size="small" icon="line-download">다운로드</DsButton>
      </div>
    </div>

    <!-- 로그인 도움말 -->
    <template v-else>
      <div class="info-card help-card">
        <div class="help-row">
          <p class="row-title">신규 회원가입</p>
          <p class="row-desc">CP-Site 로그인 화면의 회원가입을 통해 회원가입 가능합니다.</p>
        </div>
        <div class="help-row">
          <p class="row-title">아이디/비밀번호 분실</p>
          <p class="row-desc">CP-Site 로그인 화면의 아이디/비밀번호 찾기를 통해 확인이 가능합니다.</p>
        </div>
        <div class="help-row">
          <p class="row-title">브라우저 지원</p>
          <p class="row-desc">{{ IE_URL }}로 접속하셔서 IE11을 다운로드 받으시기 바랍니다.</p>
        </div>
        <div class="help-row">
          <p class="row-title">IE11 업그레이드 방법 안내</p>
          <p class="row-desc"><a :href="IE_URL" target="_blank" rel="noopener" class="row-link">{{ IE_URL }}</a> 로 접속하셔서 IE11을 다운로드 받으시기 바랍니다.</p>
        </div>
        <div class="help-row">
          <p class="row-title">HELP DESK</p>
          <p class="row-desc">031-712-0922 / ccubeadmin@kt.com</p>
        </div>
        <div class="help-row">
          <p class="row-title">ID/PW 문의처</p>
          <p class="row-desc">ccubeadmin@kt.com</p>
        </div>
      </div>
      <p class="opt-note">이용하시는 사이트는 Chrome 브라우저에 최적화 되어 있습니다.</p>
    </template>

    <template #footer>
      <DsButton type="primary" size="large" @click="$emit('update:modelValue', false)">확인</DsButton>
    </template>
  </DsModal>
</template>

<style scoped>
.sec-title {
  margin: 0 0 var(--ds-space-12);
  font-size: var(--ds-fs-headline-16);
  font-weight: var(--ds-fw-medium);
  color: var(--ds-text-gray-black);
}

.info-card {
  border: 1px solid var(--ds-border-gray-300);
  border-radius: var(--ds-radius-8);
  padding: var(--ds-space-20);
  display: flex; flex-direction: column;
  gap: var(--ds-space-16);
}

.guide-row { display: flex; align-items: center; justify-content: space-between; gap: var(--ds-space-16); }
.g-text { display: flex; flex-direction: column; gap: var(--ds-space-4); min-width: 0; }

.help-row { display: flex; flex-direction: column; gap: var(--ds-space-2); }

.row-title {
  margin: 0;
  font-size: var(--ds-fs-body-13); font-weight: var(--ds-fw-medium);
  line-height: var(--ds-lh-body); color: var(--ds-text-gray-black);
}
.row-desc {
  margin: 0;
  font-size: var(--ds-fs-body-13); font-weight: var(--ds-fw-regular);
  line-height: var(--ds-lh-body); color: var(--ds-text-gray-700);
  word-break: break-all;
}
.row-link { color: var(--ds-text-blue-500); text-decoration: underline; }

.opt-note {
  margin: var(--ds-space-20) 0 0;
  text-align: center;
  font-size: var(--ds-fs-body-13); font-weight: var(--ds-fw-medium);
  color: var(--ds-text-gray-700);
}
</style>
