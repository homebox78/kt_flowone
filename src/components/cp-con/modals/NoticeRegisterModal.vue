<script setup>
// 시안 Page 3 — 통지 등록 모달
import { ref } from 'vue'
import { DsModal, DsRadio, DsTextField, DsTextarea, DsButton } from '@/components/ds'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  itemName: { type: String, default: '선택한 단편 또는 시리즈 명 노출' },
  itemId: { type: String, default: '10028722190009' },
  urgency: { type: String, default: '일반' },
  serviceDate: { type: String, default: '2026-03-25' },
  mcp: { type: String, default: '(사)나눔과1' },
  cp: { type: String, default: '(복)사회복지-1' },
})
const emit = defineEmits(['update:modelValue', 'submit'])

const emailMode = ref('담당자')  // '담당자' | '직접 작성'
const emailDirect = ref('')
const contactName = ref('')
const phone = ref('')
const email = ref('')
const message = ref('')

function submit() {
  emit('submit', { emailMode: emailMode.value, contactName: contactName.value, phone: phone.value, email: email.value, message: message.value })
  emit('update:modelValue', false)
}
</script>

<template>
  <DsModal :model-value="modelValue" title="통지 등록" :width="1200" @update:model-value="$emit('update:modelValue', $event)">
    <div class="form">
      <div class="row">
        <div class="dh">[단편or 시리즈] 명</div>
        <div class="dc">{{ itemName }}</div>
      </div>
      <div class="row">
        <div class="dh">[단편or 시리즈] ID</div>
        <div class="dc">{{ itemId }}</div>
      </div>
      <div class="row">
        <div class="dh">긴급구분</div>
        <div class="dc">{{ urgency }}</div>
      </div>
      <div class="row">
        <div class="dh">서비스가능일시</div>
        <div class="dc">{{ serviceDate }}</div>
      </div>
      <div class="row">
        <div class="dh">MCP명</div>
        <div class="dc">{{ mcp }}</div>
        <div class="dh">CP명</div>
        <div class="dc">{{ cp }}</div>
      </div>
      <div class="row">
        <div class="dh"><span>Email</span><span class="req">*</span></div>
        <div class="dc gap">
          <DsRadio v-model="emailMode" value="담당자" label="담당자" name="email-mode" />
          <DsRadio v-model="emailMode" value="직접 작성" label="직접 작성" name="email-mode" />
          <div v-if="emailMode === '직접 작성'" class="email-input">
            <DsTextField v-model="emailDirect" placeholder="이메일 직접 입력" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="dh">문의담당자 이름</div>
        <div class="dc"><DsTextField v-model="contactName" placeholder="입력" /></div>
        <div class="dh">전화번호</div>
        <div class="dc"><DsTextField v-model="phone" placeholder="입력" /></div>
        <div class="dh">이메일</div>
        <div class="dc"><DsTextField v-model="email" placeholder="입력" /></div>
      </div>
      <div class="row">
        <div class="dh">통지내용</div>
        <div class="dc full">
          <DsTextarea v-model="message" :rows="5" placeholder="입력" :maxlength="1000" show-counter />
        </div>
      </div>
    </div>

    <template #footer>
      <DsButton type="neutral-outline" size="large" @click="$emit('update:modelValue', false)">취소</DsButton>
      <DsButton type="primary" size="large" @click="submit">등록</DsButton>
    </template>
  </DsModal>
</template>

<style scoped>
/* Figma 4:2338 — Detail Header(blue-50, 160px 고정) + Detail Cell(white) 패턴 */
.form { display: flex; flex-direction: column; border-top: 1px solid var(--ds-border-gray-200); }
.row { display: flex; align-items: stretch; width: 100%; }
.dh {
  width: 160px; flex-shrink: 0;
  min-height: 44px;
  display: flex; align-items: center; gap: 2px;
  padding: var(--ds-space-12) var(--ds-space-14);
  background: var(--ds-fill-blue-50);
  border-bottom: 1px solid var(--ds-border-gray-200);
  font-size: var(--ds-fs-body-13); font-weight: var(--ds-fw-medium); color: var(--ds-text-gray-700);
}
.dc {
  flex: 1; min-width: 0;
  min-height: 44px;
  display: flex; align-items: center;
  padding: var(--ds-space-6) var(--ds-space-10);
  background: var(--ds-fill-gray-white);
  border-bottom: 1px solid var(--ds-border-gray-200);
  font-size: var(--ds-fs-body-13); color: var(--ds-text-gray-black);
}
.dc.gap { gap: var(--ds-space-20); }
.email-input { flex: 1; min-width: 0; max-width: 320px; margin-left: var(--ds-space-12); }
.dc.full { padding: var(--ds-space-6) var(--ds-space-10); }
.dc :deep(.ds-tf), .dc :deep(.ds-ta) { width: 100%; }
.req { color: var(--ds-text-red-300); font-weight: var(--ds-fw-bold); margin-left: 2px; }
</style>
