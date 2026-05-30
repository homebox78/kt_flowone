<script setup>
// 시안 4:15159/4:15511 Search Label — Filter Area 라벨
defineProps({
  text: { type: String, required: true },
  required: { type: Boolean, default: false },
  width: { type: [String, Number], default: 90 },
})
</script>

<template>
  <span class="ds-slabel" :style="{ width: typeof width === 'number' ? width + 'px' : width }">
    {{ text }}<span v-if="required" class="ds-slabel__req">*</span>
  </span>
</template>

<style scoped>
.ds-slabel {
  display: inline-flex; align-items: center;
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-body-13);
  font-weight: var(--ds-fw-medium);
  line-height: var(--ds-lh-body);
  color: var(--ds-text-gray-900);
  flex-shrink: 0;
}
.ds-slabel__req {
  color: var(--ds-text-red-300);
  margin-left: 2px;
  font-weight: var(--ds-fw-bold);
}
</style>
