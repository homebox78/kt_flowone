<script setup>
import { computed } from 'vue'
import DsSelect from './DsSelect.vue'
import DsPageJump from './DsPageJump.vue'

// 시안 4:15511/4:13725 Table-Header 툴바
// - 좌측 옵션: Section Title + (총 N건) + 페이지사이즈 + 페이지점프
// - 우측: action slot (체크박스/버튼들)
const props = defineProps({
  sectionTitle: { type: String, default: '' },         // 시안: "Section Title" 좌측 제목
  total: { type: Number, default: null },              // null 시 "총 N건" 숨김
  showTotal: { type: Boolean, default: true },
  pageSize: { type: Number, default: 10 },
  page: { type: Number, default: 1 },
  totalPages: { type: Number, default: 1 },
  pageSizeOptions: { type: Array, default: () => [10, 20, 50, 100] },
  showPageNav: { type: Boolean, default: true },       // 페이지사이즈+점프 노출
})
defineEmits(['update:pageSize', 'update:page'])

const sizeOptions = computed(() => props.pageSizeOptions.map((n) => ({ label: `${n}개씩`, value: n })))
const hasTotal = computed(() => props.showTotal && props.total !== null && props.total !== undefined)
</script>

<template>
  <header class="ds-toolbar">
    <div class="ds-toolbar__left">
      <h3 v-if="sectionTitle" class="ds-toolbar__title">{{ sectionTitle }}</h3>
      <span v-if="hasTotal" class="ds-toolbar__total">
        총 <span class="ds-toolbar__num">{{ total.toLocaleString() }}</span><span class="ds-toolbar__unit">건</span>
      </span>
      <template v-if="showPageNav">
        <div class="ds-toolbar__size">
          <DsSelect
            :model-value="pageSize" :options="sizeOptions"
            @update:model-value="$emit('update:pageSize', Number($event))"
          />
        </div>
        <DsPageJump
          :model-value="page" :total="totalPages"
          @update:model-value="$emit('update:page', $event)"
        />
      </template>
    </div>
    <div v-if="$slots.default" class="ds-toolbar__right"><slot /></div>
  </header>
</template>

<style scoped>
.ds-toolbar {
  display: flex; align-items: center; justify-content: space-between;
  gap: var(--ds-space-16); flex-wrap: wrap;
  /* 부모(body-card)가 flex gap 으로 처리하므로 자체 margin-bottom 제거 */
}
.ds-toolbar__left {
  display: flex; align-items: center; gap: var(--ds-space-12);
}
.ds-toolbar__title {
  margin: 0;
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-headline-16);
  font-weight: var(--ds-fw-medium);
  color: var(--ds-text-gray-black);
}
.ds-toolbar__total {
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-body-13);
  color: var(--ds-text-gray-700);
  display: inline-flex; align-items: baseline; gap: var(--ds-space-4);
}
.ds-toolbar__num {
  font-weight: var(--ds-fw-bold);
  color: var(--ds-text-blue-700);
}
.ds-toolbar__unit { color: var(--ds-text-gray-700); }
.ds-toolbar__size { width: 100px; }

.ds-toolbar__right {
  display: flex; align-items: center; gap: var(--ds-space-8);
}
</style>
