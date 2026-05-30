<script setup>
// Figma 59-17134 — CP길라잡이 (이용약관/정책 · 이용가이드 · FAQ)
import { ref, computed } from 'vue'
import { DsPageHeader, DsButton, DsAccordion } from '@/components/ds'

const tabs = [
  { key: 'terms', label: '이용약관' },
  { key: 'guide', label: '이용가이드' },
  { key: 'faq', label: 'FAQ' },
]
const activeTab = ref('terms')
const sectionRefs = { terms: ref(null), guide: ref(null), faq: ref(null) }
function goTab(key) {
  activeTab.value = key
  sectionRefs[key].value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const supportGuides = [
  { title: '공통 CP', desc: '기본 CP 사용자가 CP Site의 기능을 쉽게 숙지할 수 있도록 알려주는 가이드입니다.' },
  { title: 'OpenVOD CP', desc: 'OpenVOD CP 사용자가 CP Site를 사용하기 위하여 등록하는 방법을 쉽게 숙지할 수 있도록 알려주는 가이드입니다.' },
  { title: 'tv앱 CP', desc: 'tv앱 CP 사용자가 CP Site를 사용하기 위하여 등록하는 방법을 쉽게 숙지할 수 있도록 알려주는 가이드입니다.' },
]
const regGuides = [
  { title: '파트너 및 사용자 등록 가이드', desc: 'CP 사용자가 CP Site를 사용하기 위하여 파트너 및 사용자 등록 요청하는 방법을 쉽게 숙지할 수 있도록 알려주는 가이드입니다.' },
  { title: '신규 메뉴 안내 시리즈 운영가이드', desc: '신규 서비스 메뉴 안내 및 각 화면의 구성·운영 방법을 쉽게 숙지할 수 있도록 알려주는 가이드입니다.' },
]

const faqTabs = ['파트너 관리', '콘텐츠 관리']
const faqTab = ref('파트너 관리')
// 탭별 가상 FAQ (CP Site 도메인 기준 — 인계 시 실제 데이터로 교체)
const faqData = {
  '파트너 관리': [
    { q: 'CP 파트너로 신규 가입하려면 어떻게 해야 하나요?', a: 'CP Site 우측 상단의 [파트너 가입] 메뉴에서 사업자 정보와 담당자 정보를 입력해 가입을 요청하시면, KT 운영자 검토 후 승인 결과가 등록하신 이메일로 발송됩니다. 승인까지는 영업일 기준 2~3일이 소요됩니다.' },
    { q: '우리 회사 직원 계정을 추가로 등록할 수 있나요?', a: '네, 마스터 계정으로 로그인 후 [회원정보 > 사용자 관리]에서 직원 계정을 추가하고 메뉴별 접근 권한을 설정할 수 있습니다. 추가된 계정은 담당자 승인 후 활성화됩니다.' },
    { q: '비밀번호를 잊어버렸어요. 어떻게 재설정하나요?', a: '로그인 화면의 [비밀번호 찾기]를 통해 가입 시 등록한 이메일로 임시 비밀번호를 받을 수 있습니다. 로그인 후 [회원정보 > 비밀번호 변경]에서 반드시 새 비밀번호로 변경해 주세요.' },
    { q: '담당자나 사업자 정보가 변경되었어요. 어디서 수정하나요?', a: '[회원정보 > 파트너 정보]에서 담당자 연락처·이메일은 직접 수정할 수 있습니다. 사업자등록번호·상호 등 핵심 정보 변경은 증빙 서류를 첨부해 운영자 승인을 받아야 반영됩니다.' },
    { q: '계정이 비활성화(휴면)되었다고 표시됩니다.', a: '일정 기간 미접속 시 보안 정책에 따라 휴면 처리될 수 있습니다. 마스터 계정에서 재활성화하거나 KT 운영 담당자에게 활성화를 요청해 주세요.' },
  ],
  '콘텐츠 관리': [
    { q: '신작 콘텐츠는 어디서 등록하나요?', a: '[콘텐츠 관리 > 신작 계획 관리]에서 구분에 맞춰 [단편등록] 또는 [시리즈등록] 버튼으로 등록할 수 있습니다. 등록 후 어셋 입고와 메타데이터 입력을 완료하면 승인 요청이 가능합니다.' },
    { q: '등록한 콘텐츠의 승인은 얼마나 걸리나요?', a: '승인 요청 후 KT 검수팀의 메타데이터·어셋 검수를 거치며 통상 영업일 기준 3~5일이 소요됩니다. 진행 상태는 [신작 계획 관리] 목록의 승인상태 컬럼에서 실시간으로 확인할 수 있습니다.' },
    { q: '콘텐츠가 반려되었습니다. 사유는 어디서 확인하나요?', a: "승인상태가 '요청반려'인 항목을 클릭하면 반려 사유와 보완 요청 사항을 확인할 수 있습니다. 사유에 따라 메타데이터 수정 또는 어셋 재입고 후 다시 승인 요청해 주세요." },
    { q: '이미 등록한 콘텐츠의 정보를 수정할 수 있나요?', a: '승인 완료 전(임시저장·요청반려 상태)에는 자유롭게 수정할 수 있습니다. 승인 완료된 콘텐츠의 핵심 메타데이터 변경은 [수정 요청]을 통해 재검수 절차를 거쳐야 반영됩니다.' },
    { q: 'TV앱 콘텐츠 입고는 어떻게 관리하나요?', a: '[콘텐츠 관리 > TV앱 입고 관리]에서 어셋 유형별 입고 상태를 확인하고 미입고 항목을 등록할 수 있습니다. 어셋 입고가 모두 완료되어야 승인 요청이 가능합니다.' },
  ],
}
const faqList = computed(() => faqData[faqTab.value])
</script>

<template>
  <div class="page">
    <DsPageHeader title="CP길라잡이" :breadcrumb="['홈', '가이드', 'CP길라잡이']" />

    <!-- 상단 탭 (섹션 이동) -->
    <div class="tabbar">
      <button
        v-for="t in tabs" :key="t.key"
        type="button" class="tab" :class="{ 'tab--active': activeTab === t.key }"
        @click="goTab(t.key)"
      >{{ t.label }}</button>
    </div>

    <!-- 이용약관/정책 -->
    <section :ref="sectionRefs.terms" class="card">
      <h3 class="sec-title">이용약관/정책</h3>
      <h4 class="sub-title">이용약관</h4>
      <div class="doc-box">
        <p class="doc-strong">CP-Site 저작권물 이용약관 — Title</p>
        <p class="doc-meta">Version 2.0</p>
        <p class="doc-p"><strong>제1조 (목적)</strong><br />본 약관은 KT가 제공하는 CP Site 서비스의 이용과 관련하여 KT와 CP(콘텐츠 파트너) 간의 권리·의무 및 책임사항, 이용조건 및 절차 등 기본적인 사항을 규정함을 목적으로 합니다.</p>
        <p class="doc-p"><strong>제2조 (정의)</strong><br />이 약관에서 사용하는 용어의 정의는 다음과 같으며, 본 약관에서 정하지 아니한 용어는 관계 법령 및 서비스별 안내에서 정하는 바에 따릅니다.<br />① "CP Site"란 KT가 콘텐츠 파트너에게 제공하는 콘텐츠 등록·관리·정산 지원 시스템을 말합니다.<br />② "CP(콘텐츠 파트너)"란 본 약관에 동의하고 KT와 이용계약을 체결한 콘텐츠 공급 사업자를 말합니다.<br />③ "콘텐츠"란 CP가 CP Site를 통해 등록하는 영상물 및 그에 부수하는 메타데이터·어셋 일체를 말합니다.<br />④ "어셋"이란 콘텐츠 서비스 제공에 필요한 영상·이미지·자막 등 디지털 파일을 말합니다.</p>
        <p class="doc-p"><strong>제3조 (약관의 효력 및 변경)</strong><br />① 본 약관은 CP Site에 게시함으로써 효력이 발생합니다.<br />② KT는 관계 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있으며, 개정 시 적용일자 및 개정사유를 명시하여 적용일 7일 전부터 공지합니다.<br />③ CP가 개정약관의 적용일까지 거부 의사를 표시하지 않은 경우 개정약관에 동의한 것으로 봅니다.</p>
        <p class="doc-p"><strong>제4조 (서비스의 제공 및 변경)</strong><br />① KT는 CP에게 콘텐츠 등록·관리, 통계 조회, 정산 내역 확인 등의 기능을 제공합니다.<br />② KT는 서비스의 내용 및 운영상·기술상 필요에 따라 제공 화면과 기능의 전부 또는 일부를 변경할 수 있으며, 변경 사항은 사전에 공지합니다.</p>
        <p class="doc-p"><strong>제5조 (이용계약의 체결)</strong><br />① 이용계약은 CP가 약관 내용에 동의하고 가입을 신청한 후 KT가 이를 승낙함으로써 성립합니다.<br />② KT는 실명이 아니거나 타인의 정보를 이용한 경우, 허위 정보를 기재한 경우 신청을 승낙하지 않거나 사후에 이용계약을 해지할 수 있습니다.</p>
        <p class="doc-p"><strong>제6조 (콘텐츠의 등록 및 검수)</strong><br />① CP는 KT가 정한 메타데이터 기준 및 어셋 규격에 따라 콘텐츠를 등록하여야 합니다.<br />② KT는 등록된 콘텐츠의 권리관계, 기술 규격, 서비스 적합성 등을 검수할 수 있으며, 기준에 부적합한 경우 보완을 요청하거나 등록을 반려할 수 있습니다.</p>
        <p class="doc-p"><strong>제7조 (저작권 및 권리의 귀속)</strong><br />① CP가 등록한 콘텐츠에 대한 저작권 및 제반 권리는 CP 또는 정당한 권리자에게 귀속됩니다.<br />② CP는 등록 콘텐츠가 제3자의 권리를 침해하지 않음을 보증하며, 이와 관련한 분쟁이 발생한 경우 자신의 책임과 비용으로 이를 해결합니다.</p>
        <p class="doc-p"><strong>제8조 (CP의 의무)</strong><br />CP는 관계 법령, 본 약관 및 KT가 통지하는 운영정책을 준수하여야 하며, 계정 정보의 관리 책임과 등록 콘텐츠의 정확성에 대한 책임을 부담합니다.</p>
        <p class="doc-p"><strong>제9조 (KT의 의무)</strong><br />KT는 안정적인 서비스 제공을 위해 노력하며, CP의 개인정보 및 영업비밀을 관계 법령에 따라 보호합니다.</p>
        <p class="doc-p"><strong>제10조 (정산 및 대금 지급)</strong><br />① 콘텐츠 이용에 따른 정산은 KT가 정한 기준 및 주기에 따라 산정·지급됩니다.<br />② 정산 내역은 CP Site의 통계·정산 메뉴에서 확인할 수 있으며, 이의가 있는 경우 정산일로부터 30일 이내에 제기하여야 합니다.</p>
        <p class="doc-p"><strong>제11조 (서비스 이용의 제한 및 계약 해지)</strong><br />KT는 CP가 본 약관을 위반하거나 서비스의 정상적인 운영을 방해한 경우 사전 통지 후 서비스 이용을 제한하거나 이용계약을 해지할 수 있습니다. 다만 긴급한 사유가 있는 경우 통지를 사후에 갈음할 수 있습니다.</p>
        <p class="doc-p"><strong>제12조 (손해배상 및 면책)</strong><br />① 일방의 귀책사유로 상대방에게 손해가 발생한 경우 그 범위 내에서 배상 책임을 부담합니다.<br />② KT는 천재지변, CP의 귀책사유 등 KT의 책임 없는 사유로 발생한 손해에 대하여는 책임을 지지 않습니다.</p>
        <p class="doc-p"><strong>제13조 (분쟁의 해결 및 준거법)</strong><br />본 약관은 대한민국 법령에 따라 해석되며, 서비스 이용과 관련하여 분쟁이 발생한 경우 KT 본사 소재지를 관할하는 법원을 전속 관할 법원으로 합니다.</p>
        <p class="doc-p"><strong>부칙</strong><br />본 약관은 2026년 1월 1일부터 시행합니다.</p>
      </div>

      <h4 class="sub-title">정책 가이드</h4>
      <div class="doc-box doc-box--sm">
        <p class="doc-p">· 콘텐츠 등록 및 검수 정책 안내 — 메타데이터 입력 기준, 어셋 규격, 검수 소요 기간 및 반려 기준<br />· 저작권 및 권리관계 확인 절차 — 권리 증빙 제출, 권리 보유 기간, 제3자 권리 침해 시 처리 방안<br />· 서비스 운영·정산 기준 및 유의사항 — 정산 주기, 정산 내역 확인 방법, 이의 제기 기한(정산일로부터 30일)<br />· 콘텐츠 노출 및 편성 정책 — 서비스 카테고리 분류, 노출 기간, 등급 표기 기준<br />· 개인정보·영업비밀 보호 정책 — 수집 항목, 보관 기간, 파기 절차에 관한 안내</p>
      </div>
    </section>

    <!-- 이용가이드 -->
    <section :ref="sectionRefs.guide" class="card">
      <h3 class="sec-title">이용가이드</h3>

      <h4 class="sub-title">사용자 지원서</h4>
      <div class="info-card">
        <div v-for="g in supportGuides" :key="g.title" class="guide-row">
          <div class="g-text">
            <p class="row-title">{{ g.title }}</p>
            <p class="row-desc">{{ g.desc }}</p>
          </div>
          <DsButton type="neutral-outline" size="small" icon="line-download">다운로드</DsButton>
        </div>
      </div>

      <h4 class="sub-title">등록가이드</h4>
      <div class="info-card">
        <div v-for="g in regGuides" :key="g.title" class="guide-row">
          <div class="g-text">
            <p class="row-title">{{ g.title }}</p>
            <p class="row-desc">{{ g.desc }}</p>
          </div>
          <DsButton type="neutral-outline" size="small" icon="line-download">다운로드</DsButton>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section :ref="sectionRefs.faq" class="card">
      <h3 class="sec-title">FAQ</h3>
      <div class="faq-tabs">
        <button
          v-for="t in faqTabs" :key="t"
          type="button" class="faq-tab" :class="{ 'faq-tab--active': faqTab === t }"
          @click="faqTab = t"
        >{{ t }}</button>
      </div>
      <DsAccordion :key="faqTab" :items="faqList">
        <template #title="{ item }">
          <span class="faq-q__mark">Q.</span>
          <span class="faq-q__txt">{{ item.q }}</span>
        </template>
        <template #text="{ item }">{{ item.a }}</template>
      </DsAccordion>
    </section>
  </div>
</template>

<style scoped>
/* 하단 padding 없음 — 푸터 자체 top padding(40)이 콘텐츠↔푸터 간격을 담당 (page padding-bottom 겹치면 80px로 과도) */
.page { flex: 1; min-width: 0; padding: 0 var(--ds-space-40); width: 100%; }
.page .card { min-width: 0; }

.tabbar { display: flex; gap: var(--ds-space-8); margin-bottom: var(--ds-space-20); }
.tab {
  padding: var(--ds-space-8) var(--ds-space-20);
  background: var(--ds-fill-gray-white); border: 1px solid var(--ds-border-gray-200);
  border-radius: var(--ds-radius-circle);
  font-size: var(--ds-fs-body-14); font-weight: var(--ds-fw-medium);
  color: var(--ds-text-gray-700); cursor: pointer; font-family: var(--ds-font-family);
}
.tab--active { background: var(--ds-fill-gray-700); border-color: var(--ds-fill-gray-700); color: var(--ds-text-gray-white); font-weight: var(--ds-fw-bold); }

.card { background: var(--ds-fill-gray-white); border-radius: var(--ds-radius-20); padding: var(--ds-space-40); margin-bottom: var(--ds-space-20); box-shadow: 0 2px 8px 0 rgba(95, 102, 160, 0.06); }
/* 마지막 카드 하단 여백 제거 — 카드 margin(20)+page padding(40)이 겹쳐 푸터 사이 여백이 과도해지는 문제 */
.card:last-child { margin-bottom: 0; }
.sec-title { margin: 0 0 var(--ds-space-20); font-size: var(--ds-fs-headline-16); font-weight: var(--ds-fw-bold); color: var(--ds-text-gray-black); }
.sub-title { margin: var(--ds-space-20) 0 var(--ds-space-12); font-size: var(--ds-fs-body-14); font-weight: var(--ds-fw-bold); color: var(--ds-text-gray-800); }
.sub-title:first-of-type { margin-top: 0; }

.doc-box {
  border: 1px solid var(--ds-border-gray-200); border-radius: var(--ds-radius-8);
  background: var(--ds-fill-gray-50);
  padding: var(--ds-space-20); max-height: 220px; overflow-y: auto;
}
.doc-box--sm { max-height: 140px; }
.doc-strong { margin: 0 0 var(--ds-space-4); font-size: var(--ds-fs-body-13); font-weight: var(--ds-fw-bold); color: var(--ds-text-gray-black); }
.doc-meta { margin: 0 0 var(--ds-space-12); font-size: var(--ds-fs-body-12); color: var(--ds-text-gray-500); }
.doc-p { margin: 0 0 var(--ds-space-12); font-size: var(--ds-fs-body-13); line-height: 1.7; color: var(--ds-text-gray-700); }
.doc-p:last-child { margin-bottom: 0; }

.info-card { border: 1px solid var(--ds-border-gray-300); border-radius: var(--ds-radius-8); padding: var(--ds-space-20); display: flex; flex-direction: column; gap: var(--ds-space-16); }
.guide-row { display: flex; align-items: center; justify-content: space-between; gap: var(--ds-space-16); }
.g-text { display: flex; flex-direction: column; gap: var(--ds-space-4); min-width: 0; }
.row-title { margin: 0; font-size: var(--ds-fs-body-13); font-weight: var(--ds-fw-medium); color: var(--ds-text-gray-black); }
.row-desc { margin: 0; font-size: var(--ds-fs-body-13); color: var(--ds-text-gray-700); line-height: var(--ds-lh-body); }

.faq-tabs { display: flex; gap: var(--ds-space-20); border-bottom: 1px solid var(--ds-border-gray-200); margin-bottom: var(--ds-space-8); }
.faq-tab {
  padding: var(--ds-space-10) var(--ds-space-4); background: transparent; border: 0; cursor: pointer;
  font-family: var(--ds-font-family); font-size: var(--ds-fs-body-14); font-weight: var(--ds-fw-medium);
  color: var(--ds-text-gray-500); border-bottom: 2px solid transparent; margin-bottom: -1px;
}
.faq-tab--active { color: var(--ds-text-gray-black); font-weight: var(--ds-fw-bold); border-bottom-color: var(--ds-fill-blue-500); }

.faq-q__mark { font-size: var(--ds-fs-body-15); font-weight: var(--ds-fw-bold); color: var(--ds-text-blue-500); flex-shrink: 0; margin-right: var(--ds-space-12); }
.faq-q__txt { flex: 1; font-size: var(--ds-fs-body-14); color: var(--ds-text-gray-800); }
</style>
