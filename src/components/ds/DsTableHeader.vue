<script setup>
import { computed } from 'vue'
import DsIcon from './DsIcon.vue'

// 시안 4:13725 Table Header — Large(40)/Small(32) × state
const props = defineProps({
  size: { type: String, default: 'large', validator: (v) => ['large', 'small'].includes(v) },
  state: {
    type: String, default: 'header',
    validator: (v) => ['header', 'header-essential', 'header-icon', 'header-essential-icon', 'no', 'status', 'checkbox'].includes(v),
  },
  text: { type: String, default: 'Header' },
  width: { type: [String, Number], default: null },
})
const classes = computed(() => ['ds-th', `ds-th--${props.size}`, `ds-th--${props.state}`])
const style = computed(() => (props.width ? { width: typeof props.width === 'number' ? props.width + 'px' : props.width } : {}))
</script>

<template>
  <div :class="classes" :style="style">
    <template v-if="['header','header-icon','no','status'].includes(state)">
      <span class="ds-th__txt">{{ text }}</span>
      <DsIcon v-if="state === 'header-icon'" name="line-caution" :size="16" />
    </template>
    <template v-else-if="['header-essential','header-essential-icon'].includes(state)">
      <span class="ds-th__essential">
        <span class="ds-th__txt">{{ text }}</span>
        <span class="ds-th__star">*</span>
      </span>
      <DsIcon v-if="state === 'header-essential-icon'" name="line-caution" :size="16" />
    </template>
    <template v-else-if="state === 'checkbox'">
      <slot />
    </template>
  </div>
</template>

<style scoped>
.ds-th {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--ds-space-2);
  background: var(--ds-fill-blue-50);
  border-bottom: 1px solid var(--ds-border-gray-200);
  border-right: 1px solid var(--ds-border-gray-200);
  padding: 0 var(--ds-space-10);
}
.ds-th--large { min-height: 40px; padding-top: var(--ds-space-6); padding-bottom: var(--ds-space-6); }
.ds-th--small { min-height: 32px; padding-top: var(--ds-space-4); padding-bottom: var(--ds-space-4); background: var(--ds-fill-blue-75); border-color: var(--ds-border-gray-300); }
.ds-th__txt {
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-headline-13);
  font-weight: var(--ds-fw-medium);
  color: var(--ds-text-gray-700);
  text-align: center;
}
.ds-th__essential { display: inline-flex; align-items: center; gap: 2px; }
.ds-th__star { color: var(--ds-text-red-300); font-weight: var(--ds-fw-bold); font-size: var(--ds-fs-body-13); }
</style>
