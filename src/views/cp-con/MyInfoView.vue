<script setup>
// Figma 59-16437 — 내 정보 관리 (사업자/사업장/사용자 정보 + 대표사용자 변경요청)
import { reactive, ref, watch } from 'vue'
import {
  DsPageHeader, DsDetailHeader, DsDetailCell,
  DsTextField, DsTextarea, DsSelect, DsRadioGroup, DsCheckbox, DsDatePicker, DsButton,
} from '@/components/ds'
import RepUserChangeModal from '@/components/cp-con/modals/RepUserChangeModal.vue'

const form = reactive({
  // 사업자 정보
  bizType: '법인사업자', bizNo: '10281******',
  partnerName: '파트너명 A', partnerId: '123454',
  ceoName: '홍길*', industry: '서비스',
  bizCategory: '서비스', taxType: '과세',
  taxClass: '일반과세', country: '대한민국',
  corpNo: '123456677', employees: '',
  foundedAt: '',
  // 사업장 정보
  addrType: '지번주소',
  zip: '123456', addr1: '서울 중구 남대문로 5가', addr2: '123-45',
  telHead: '02', telBody: '12345678',
  emailLocal: 'qwewqe', emailDomain: 'qver.com', emailSelect: '선택',
  intro: '',
  faxHead: '02', faxBody: '', homepage: '',
  // 사용자 정보
  userBizType: '홍길*', ktId: 'FREW***',
  cpName: '스퀘어네트', task: '지정 CP - (일반사용자 또는 대표사용자)',
  userEmailLocal: '', userEmailDomain: '', userEmailSelect: '선택', emailAgree: true,
  repUser: 'N',
  status: '사용', position: '과장',
  dept: '여기저기', mobileHead: '02', mobileBody: '',
  applyReason: '일해야 하니까요!',
  // 대표사용자 변경요청
  reqUser: '홍길*', reqAt: '2026-02-24 09:02:12',
  changeReason: '대표사용자 변경합니다. 이전 대표사용자 계정 담당자가 잠수 퇴사하였습니다.',
})

const phoneOpts = ['02', '031', '010', '070']
const emailOpts = ['선택', 'naver.com', 'gmail.com', 'daum.net']

// 대표사용자여부 Y 변경 시 변경 신청 모달
const repModalOpen = ref(false)
const repSubmitted = ref(false)
watch(() => form.repUser, (v, old) => {
  if (v === 'Y' && old === 'N') {
    repSubmitted.value = false
    repModalOpen.value = true
  }
})
function onRepModal(open) {
  repModalOpen.value = open
  if (!open && !repSubmitted.value) form.repUser = 'N' // 취소 시 원복
}
function onRepSubmit() { repSubmitted.value = true }
</script>

<template>
  <div class="page">
    <DsPageHeader title="내 정보 관리" :breadcrumb="['홈', '회원정보', '내 정보 관리']" />

    <section class="card">
      <!-- 사업자 정보 -->
      <div class="sec-group">
        <h3 class="sec-title">사업자 정보</h3>
        <div class="detail-form">
          <div class="df-row">
            <DsDetailHeader text="사업자 구분" essential />
            <DsDetailCell><DsTextField v-model="form.bizType" readonly /></DsDetailCell>
            <DsDetailHeader text="사업자 등록 번호" essential />
            <DsDetailCell><DsTextField v-model="form.bizNo" readonly /></DsDetailCell>
          </div>
          <div class="df-row">
            <DsDetailHeader text="파트너명" essential />
            <DsDetailCell><DsTextField v-model="form.partnerName" readonly /></DsDetailCell>
            <DsDetailHeader text="파트너아이디" essential />
            <DsDetailCell><DsTextField v-model="form.partnerId" readonly /></DsDetailCell>
          </div>
          <div class="df-row">
            <DsDetailHeader text="대표자명" essential />
            <DsDetailCell><DsTextField v-model="form.ceoName" readonly /></DsDetailCell>
            <DsDetailHeader text="업종" essential />
            <DsDetailCell><DsTextField v-model="form.industry" /></DsDetailCell>
          </div>
          <div class="df-row">
            <DsDetailHeader text="업태" essential />
            <DsDetailCell><DsTextField v-model="form.bizCategory" /></DsDetailCell>
            <DsDetailHeader text="과세유형" essential />
            <DsDetailCell><DsSelect v-model="form.taxType" :options="['과세','면세','영세']" /></DsDetailCell>
          </div>
          <div class="df-row">
            <DsDetailHeader text="과세구분" essential />
            <DsDetailCell><DsSelect v-model="form.taxClass" :options="['일반과세','간이과세']" /></DsDetailCell>
            <DsDetailHeader text="국가" essential />
            <DsDetailCell><DsSelect v-model="form.country" :options="['대한민국','미국','일본']" /></DsDetailCell>
          </div>
          <div class="df-row">
            <DsDetailHeader text="법인등록번호" />
            <DsDetailCell><DsTextField v-model="form.corpNo" /></DsDetailCell>
            <DsDetailHeader text="소속사원수" />
            <DsDetailCell><DsTextField v-model="form.employees" placeholder="숫자만 입력" /></DsDetailCell>
          </div>
          <div class="df-row df-row--full">
            <DsDetailHeader text="설립일자" />
            <DsDetailCell><DsDatePicker v-model="form.foundedAt" /></DsDetailCell>
          </div>
        </div>
      </div>

      <!-- 사업장 정보 -->
      <div class="sec-group">
        <h3 class="sec-title">사업장 정보</h3>
        <div class="detail-form">
          <div class="df-row df-row--full">
            <DsDetailHeader text="주소구분" essential />
            <DsDetailCell><DsTextField v-model="form.addrType" readonly /></DsDetailCell>
          </div>
          <div class="df-row df-row--full">
            <DsDetailHeader text="주소" essential />
            <DsDetailCell>
              <div class="addr-cell">
                <div class="addr-line">
                  <DsTextField v-model="form.zip" class="addr-zip" />
                  <DsButton type="neutral-outline" size="medium">주소 찾기</DsButton>
                </div>
                <div class="addr-line">
                  <DsTextField v-model="form.addr1" class="addr-main" />
                  <DsTextField v-model="form.addr2" class="addr-sub" />
                </div>
              </div>
            </DsDetailCell>
          </div>
          <div class="df-row">
            <DsDetailHeader text="대표 전화번호" essential />
            <DsDetailCell>
              <div class="inline-2"><DsSelect v-model="form.telHead" :options="phoneOpts" class="w-100" /><DsTextField v-model="form.telBody" /></div>
            </DsDetailCell>
            <DsDetailHeader text="대표 이메일" essential />
            <DsDetailCell>
              <div class="email-cell">
                <DsTextField v-model="form.emailLocal" /><span class="at">@</span><DsTextField v-model="form.emailDomain" /><DsSelect v-model="form.emailSelect" :options="emailOpts" class="w-120" />
              </div>
            </DsDetailCell>
          </div>
          <div class="df-row df-row--full">
            <DsDetailHeader text="회사소개" essential />
            <DsDetailCell><DsTextarea v-model="form.intro" :rows="3" :maxlength="1000" show-counter placeholder="입력" /></DsDetailCell>
          </div>
          <div class="df-row">
            <DsDetailHeader text="대표 팩스번호" />
            <DsDetailCell>
              <div class="inline-2"><DsSelect v-model="form.faxHead" :options="phoneOpts" class="w-100" /><DsTextField v-model="form.faxBody" placeholder="'-'없이 최대 8자 입력 (숫자만)" /></div>
            </DsDetailCell>
            <DsDetailHeader text="홈페이지" />
            <DsDetailCell><DsTextField v-model="form.homepage" placeholder="입력" /></DsDetailCell>
          </div>
        </div>
      </div>

      <!-- 사용자 정보 -->
      <div class="sec-group">
        <h3 class="sec-title">사용자 정보</h3>
        <div class="detail-form">
          <div class="df-row">
            <DsDetailHeader text="사업자 구분" essential />
            <DsDetailCell><DsTextField v-model="form.userBizType" readonly /></DsDetailCell>
            <DsDetailHeader text="KT ID" essential />
            <DsDetailCell><DsTextField v-model="form.ktId" readonly /></DsDetailCell>
          </div>
          <div class="df-row">
            <DsDetailHeader text="CP명" essential />
            <DsDetailCell><DsTextField v-model="form.cpName" readonly /></DsDetailCell>
            <DsDetailHeader text="담당업무" essential />
            <DsDetailCell><DsTextField v-model="form.task" readonly /></DsDetailCell>
          </div>
          <div class="df-row">
            <DsDetailHeader text="대표자명" essential />
            <DsDetailCell>
              <div class="user-email">
                <div class="email-cell">
                  <DsTextField v-model="form.userEmailLocal" placeholder="입력" /><span class="at">@</span><DsTextField v-model="form.userEmailDomain" placeholder="입력" /><DsSelect v-model="form.userEmailSelect" :options="emailOpts" class="w-120" />
                </div>
                <DsCheckbox v-model="form.emailAgree" label="이메일 수신 동의" />
              </div>
            </DsDetailCell>
            <DsDetailHeader text="대표사용자여부" />
            <DsDetailCell>
              <div class="rep-cell">
                <DsRadioGroup v-model="form.repUser" :options="['Y','N']" name="repUser" />
                <p class="rep-hint">대표사용자 변경 요청 시 Y로 변경해주세요.</p>
              </div>
            </DsDetailCell>
          </div>
          <div class="df-row">
            <DsDetailHeader text="상태" />
            <DsDetailCell><DsTextField v-model="form.status" readonly /></DsDetailCell>
            <DsDetailHeader text="직책" />
            <DsDetailCell><DsTextField v-model="form.position" /></DsDetailCell>
          </div>
          <div class="df-row">
            <DsDetailHeader text="소속부서" />
            <DsDetailCell><DsTextField v-model="form.dept" /></DsDetailCell>
            <DsDetailHeader text="휴대 전화 번호" />
            <DsDetailCell>
              <div class="inline-2"><DsSelect v-model="form.mobileHead" :options="phoneOpts" class="w-100" /><DsTextField v-model="form.mobileBody" placeholder="'-'없이 최대 8자 입력 (숫자만)" /></div>
            </DsDetailCell>
          </div>
          <div class="df-row df-row--full">
            <DsDetailHeader text="신청 사유" />
            <DsDetailCell><DsTextarea v-model="form.applyReason" :rows="3" :maxlength="1000" show-counter /></DsDetailCell>
          </div>
        </div>
      </div>

      <!-- 대표사용자 변경요청 -->
      <div class="sec-group">
        <h3 class="sec-title">대표사용자 변경요청</h3>
        <div class="detail-form">
          <div class="df-row">
            <DsDetailHeader text="요청자" />
            <DsDetailCell><DsTextField v-model="form.reqUser" readonly /></DsDetailCell>
            <DsDetailHeader text="요청일" />
            <DsDetailCell><DsTextField v-model="form.reqAt" readonly /></DsDetailCell>
          </div>
          <div class="df-row df-row--full">
            <DsDetailHeader text="변경사유" />
            <DsDetailCell><DsTextarea v-model="form.changeReason" :rows="3" :maxlength="1000" show-counter readonly /></DsDetailCell>
          </div>
        </div>
      </div>

      <footer class="footer-bar">
        <DsButton type="primary" size="xl">저장</DsButton>
      </footer>
    </section>

    <RepUserChangeModal
      :model-value="repModalOpen"
      @update:model-value="onRepModal"
      @submit="onRepSubmit"
    />
  </div>
</template>

<style scoped>
/* 하단 padding 없음 — 푸터 top padding(40)이 콘텐츠↔푸터 간격 담당 */
.page { flex: 1; min-width: 0; padding: 0 var(--ds-space-40); width: 100%; }
.page .card { min-width: 0; }
.card { background: var(--ds-fill-gray-white); border-radius: var(--ds-radius-20); padding: var(--ds-space-40); box-shadow: 0 2px 8px 0 rgba(95, 102, 160, 0.06); }

.sec-group { margin-bottom: var(--ds-space-40); }
.sec-title { margin: 0 0 var(--ds-space-16); font-size: var(--ds-fs-headline-16); font-weight: var(--ds-fw-bold); color: var(--ds-text-gray-black); }

.detail-form {
  display: grid;
  grid-template-columns: 160px 1fr 160px 1fr;
  /* 첫 행 상단 보더는 내부 행 구분선(gray-200)보다 진하게 (시안) */
  border-top: 1px solid var(--ds-border-gray-400);
}
.df-row { display: contents; }
.df-row--full > :nth-child(2) { grid-column: 2 / 5; }

.detail-form :deep(.ds-field),
.detail-form :deep(.ds-select),
.detail-form :deep(.ds-ta-wrap),
.detail-form :deep(.ds-date-wrap) { width: 100%; }

.inline-2 { display: flex; align-items: center; gap: var(--ds-space-8); width: 100%; }
.inline-2 .w-100 { flex: 0 0 100px; width: 100px; }

.email-cell { display: flex; align-items: center; gap: var(--ds-space-6); width: 100%; }
.email-cell .at { flex-shrink: 0; color: var(--ds-text-gray-700); }
.email-cell .w-120 { flex: 0 0 120px; width: 120px; }

.user-email { display: flex; flex-direction: column; gap: var(--ds-space-8); width: 100%; }

.addr-cell { display: flex; flex-direction: column; gap: var(--ds-space-8); width: 100%; }
.addr-line { display: flex; align-items: center; gap: var(--ds-space-8); width: 100%; }
.addr-line .addr-zip { flex: 0 0 200px; }
.addr-line .addr-main { flex: 1 1 auto; }
.addr-line .addr-sub { flex: 0 0 160px; }

.rep-cell { display: flex; flex-direction: column; gap: var(--ds-space-4); width: 100%; }
.rep-hint { margin: 0; font-size: var(--ds-fs-body-12); color: var(--ds-text-gray-500); }

.footer-bar { display: flex; align-items: center; justify-content: flex-end; margin-top: var(--ds-space-8); }

/* 읽기전용 셀 배경(시안: 회색) */
.detail-form :deep(.ds-field--readonly) { background: var(--ds-fill-gray-100); }
</style>
