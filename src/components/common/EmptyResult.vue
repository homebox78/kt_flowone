<script setup>
// 데이터 없음 공통 표시 — 아이콘 + "검색 결과가 없습니다." (시안 59-15832)
// AgGrid 가 아닌 커스텀 div 테이블/목록의 빈 상태에 사용. (AgGrid 는 AgGridWrapper 의 overlayNoRowsTemplate 가 동일하게 처리)
defineProps({
  message: { type: String, default: '검색 결과가 없습니다.' },
})
</script>

<template>
  <div class="empty-result">
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="60" height="60" rx="30" fill="#F4F5FA" />
      <path d="M30 37.1929C31.6568 37.1929 33 38.5361 33 40.1929C32.9999 41.8496 31.6567 43.1929 30 43.1929C28.3434 43.1927 27.0001 41.8495 27 40.1929C27 38.5362 28.3434 37.1931 30 37.1929ZM30 16.8071C31.3295 16.8071 32.3975 17.8761 32.3975 19.2056L31.7959 32.9995C31.7959 33.9881 30.9886 34.7954 30 34.7954C29.0115 34.7954 28.2051 33.9881 28.2051 32.9995L27.6025 19.2056C27.6025 17.8875 28.6706 16.8072 30 16.8071Z" fill="#949BB0" />
    </svg>
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
.empty-result {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: var(--ds-space-12);
  padding: var(--ds-space-40) 0;
}
.empty-result p {
  margin: 0;
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-body-14);
  font-weight: var(--ds-fw-medium);
  color: var(--ds-text-gray-500);
}
</style>
