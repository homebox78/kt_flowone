<script setup>
// 시안 4:1948 Filter Row — 한 줄에 2개 컬럼 (1/2 + 1/2), 60px gap
// 각 컬럼 안에 1개 또는 2개 필드(1/4 + 1/4)가 들어갈 수 있음
// 컬럼이 1개만 있으면 좌측 1/2 만 차지 (시안 row 3 승인상태)
defineProps({
  gap: { type: String, default: '60px' },
})
</script>

<template>
  <!-- gap 은 좌/우 컬럼 사이 가로 간격(column-gap)만 적용 — 한 행이 줄바꿈돼도 세로 간격이 벌어지지 않게 함 -->
  <div class="ds-frow" :style="{ columnGap: gap }"><slot /></div>
</template>

<style scoped>
.ds-frow {
  display: grid;
  grid-template-columns: 1fr 1fr;   /* 좌측 1/2 | 우측 1/2 */
  align-items: center;
}
.ds-frow > * { min-width: 0; }
/* 단일 자식: 좌측 1/2 만 차지 (우측은 공백) */
.ds-frow > :only-child { grid-column: 1 / 2; }
</style>
