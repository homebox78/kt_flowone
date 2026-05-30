<script setup>
// 시안 Page 5 — 일괄 업로드 모달 (empty / filled)
import { ref, computed, watch } from 'vue'
import { DsModal, DsFileUpload, DsButton } from '@/components/ds'
import EmptyResult from '@/components/common/EmptyResult.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  guideUrl: { type: String, default: '#' },
})
const emit = defineEmits(['update:modelValue', 'upload'])

const file = ref(null)
const preview = ref([])  // 파일 파싱 후 미리보기 행
const canUpload = computed(() => file.value !== null)

// 데모: 파일 선택 시 더미 행 표시
watch(file, (v) => {
  preview.value = v
    ? [
        { 구분: '단편', 수급카테고리: '영화_외국영화', 노출장르: '영화 > 액션/SF', 단편명: '아바타 : 물의 길', 제작언어: '영어', 제작국가: '미국' },
        { 구분: '단편', 수급카테고리: '영화_외국영화', 노출장르: '영화 > 액션/SF', 단편명: '아바타 : 물의 길', 제작언어: '영어', 제작국가: '미국' },
      ]
    : []
})

function doUpload() {
  emit('upload', { file: file.value, rows: preview.value })
  emit('update:modelValue', false)
  file.value = null
}
function close() {
  emit('update:modelValue', false)
  file.value = null
}
</script>

<template>
  <DsModal :model-value="modelValue" title="일괄 업로드" :width="780" @update:model-value="$emit('update:modelValue', $event)">
    <ul class="guides">
      <li>일괄 업로드 진행 시 <strong>필수 입력 항목을 모두 입력했는지</strong> 확인해 주세요.</li>
      <li>작성 완료한 엑셀 템플릿 파일을 선택하시면 콘텐츠를 일괄 입력할 수 있습니다.</li>
      <li>파일등록의 경우 엑셀등록 이후 진행해 주세요.</li>
      <li>일괄 업로드에 대한 엑셀 기입 가이드가 필요하신 경우 <a :href="guideUrl">여기</a>에서 확인하실 수 있습니다.</li>
    </ul>

    <DsFileUpload v-model="file" placeholder="파일 선택해서 첨부해주세요." />

    <div class="preview">
      <div class="head">
        <span class="c">구분</span>
        <span class="c">수급카테고리 *</span>
        <span class="c">노출장르 *</span>
        <span class="c flex">단편명 *</span>
        <span class="c">제작언어 *</span>
        <span class="c">제작국가 *</span>
      </div>
      <template v-if="preview.length">
        <div v-for="(r, i) in preview" :key="i" class="row">
          <span class="c">{{ r['구분'] }}</span>
          <span class="c">{{ r['수급카테고리'] }}</span>
          <span class="c">{{ r['노출장르'] }}</span>
          <span class="c flex">{{ r['단편명'] }}</span>
          <span class="c">{{ r['제작언어'] }}</span>
          <span class="c">{{ r['제작국가'] }}</span>
        </div>
      </template>
      <EmptyResult v-else />
    </div>

    <template #footer>
      <DsButton type="neutral-outline" size="large" @click="close">취소</DsButton>
      <DsButton type="primary" size="large" :disabled="!canUpload" @click="doUpload">업로드</DsButton>
    </template>
  </DsModal>
</template>

<style scoped>
.guides {
  margin: 0 0 var(--ds-space-16); padding: var(--ds-space-16) var(--ds-space-20);
  background: var(--ds-fill-description-bg);
  border-radius: var(--ds-radius-8);
  font-size: var(--ds-fs-body-13); color: var(--ds-text-gray-700);
}
.guides li { padding-left: 4px; line-height: 1.7; }
.guides a { color: var(--ds-text-blue-500); text-decoration: underline; }

.preview {
  margin-top: var(--ds-space-16);
  border-top: 1px solid var(--ds-border-gray-200);
  border-bottom: 1px solid var(--ds-border-gray-200);
  overflow-x: auto;
}
.head, .row { display: flex; align-items: center; }
.head { background: var(--ds-fill-blue-50); }
.head .c { font-size: var(--ds-fs-body-13); font-weight: var(--ds-fw-medium); color: var(--ds-text-gray-700); padding: var(--ds-space-10); }
.row { border-top: 1px solid var(--ds-border-gray-200); }
.row .c { font-size: var(--ds-fs-body-13); color: var(--ds-text-gray-black); padding: var(--ds-space-10); }
.c { display: flex; align-items: center; min-width: 80px; }
.c.flex { flex: 1; min-width: 140px; }
.empty { height: 60px; }
</style>
