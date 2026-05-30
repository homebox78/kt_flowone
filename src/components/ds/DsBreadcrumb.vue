<script setup>
import { computed } from 'vue'
import { VBreadcrumbs, VBreadcrumbsItem } from 'vuetify/components'
import DsIcon from './DsIcon.vue'

const props = defineProps({
  items: { type: Array, required: true }, // [string] or [{label, to}]
})

const normalized = computed(() =>
  props.items.map((it) => (typeof it === 'string' ? { title: it } : { title: it.label, to: it.to })),
)
</script>

<template>
  <VBreadcrumbs :items="normalized" class="ds-bc" density="compact">
    <template #item="{ item, index }">
      <VBreadcrumbsItem
        :class="['ds-bc__item', { 'ds-bc__item--last': index === normalized.length - 1 }]"
        :to="item.to"
      >{{ item.title }}</VBreadcrumbsItem>
    </template>
    <template #divider>
      <DsIcon name="line-right" :size="8" class="ds-bc__sep" />
    </template>
  </VBreadcrumbs>
</template>

<style scoped>
.ds-bc {
  display: inline-flex !important;
  align-items: center;
  min-height: 0 !important;
  height: auto !important;
  gap: var(--ds-space-8);
  padding: 0 !important;
}
.ds-bc :deep(.v-breadcrumbs-divider) { padding: 0 !important; display: inline-flex; align-items: center; }
.ds-bc :deep(.v-breadcrumbs-item) { padding: 0 !important; min-height: 0 !important; }
.ds-bc__sep { display: inline-flex; align-items: center; }
.ds-bc__item {
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-body-12);
  font-weight: var(--ds-fw-medium);
  line-height: var(--ds-lh-body);
  color: var(--ds-text-gray-700) !important;
  opacity: 1 !important;
  padding: 0 !important;
  text-decoration: none;
}
.ds-bc__item--last {
  color: var(--ds-text-gray-black) !important;
  font-weight: var(--ds-fw-bold);
}
.ds-bc__sep { color: #949BB0; }
.ds-bc__sep :deep(svg [fill]) { fill: #949BB0; }
.ds-bc__sep :deep(svg [stroke]) { stroke: #949BB0; }
</style>
