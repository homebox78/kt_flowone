<script setup>
// 시안: Filter Row 의 1/2 컬럼 안에 1개 또는 2개 필드 배치용 컨테이너
// 시안 row 1 우측: 수급 카테고리 + 장르 (1/4 + 1/4)
// 시안 row 2 우측: 검색 라벨 + 검색 select + input
defineProps({
  gap: { type: String, default: '20px' },
})
</script>

<template>
  <div class="ds-fcol" :style="{ gap }"><slot /></div>
</template>

<style scoped>
.ds-fcol {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  min-width: 0;
}
.ds-fcol > * { min-width: 0; }
.ds-fcol > :only-child { grid-column: 1 / 2; }
</style>
