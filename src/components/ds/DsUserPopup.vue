<script setup>
import { ref } from 'vue'
import { VCard, VList, VListItem } from 'vuetify/components'
import DsIcon from './DsIcon.vue'

// 시안 4:15036 UserPopup — VCard + VList 기반
const props = defineProps({
  username: { type: String, default: 'tempUs**' },
  loginAt: { type: String, default: '2026-04-06 13:11:59' },
  cpName: { type: String, default: '선택된 옵션 (CP구분)' },
  cpOptions: { type: Array, default: () => [] },
})
const emit = defineEmits(['select-cp'])

const open = ref(false)
function pick(v) {
  open.value = false
  emit('select-cp', v)
}
</script>

<template>
  <div class="ds-up">
    <VCard class="ds-up__user" elevation="0">
      <strong>{{ username }}</strong>
      <small>{{ loginAt }}</small>
    </VCard>
    <VCard class="ds-up__list" elevation="0">
      <button type="button" class="ds-up__sel" @click="open = !open">
        <span>{{ cpName }}</span>
        <DsIcon :name="open ? 'line-up' : 'line-down'" :size="20" />
      </button>
      <VList v-if="open" class="ds-up__menu" density="compact">
        <VListItem
          v-for="o in cpOptions" :key="o.value"
          :ripple="false"
          class="ds-up__opt"
          :class="{ 'ds-up__opt--selected': o.selected }"
          @click="pick(o.value)"
        >{{ o.label }}</VListItem>
      </VList>
    </VCard>
  </div>
</template>

<style scoped>
.ds-up { width: 220px; display: flex; flex-direction: column; gap: var(--ds-space-4); }
.ds-up__user, .ds-up__list {
  background: var(--ds-fill-gray-white) !important;
  border: 1px solid var(--ds-border-light-blue-500) !important;
  border-radius: var(--ds-radius-8) !important;
  padding: var(--ds-space-12) var(--ds-space-14) !important;
  box-shadow: var(--ds-shadow-popup) !important;
}
.ds-up__user {
  display: flex !important; align-items: center !important; gap: var(--ds-space-8);
}
.ds-up__user strong { font-size: var(--ds-fs-body-13); font-weight: var(--ds-fw-bold); color: var(--ds-text-gray-black); }
.ds-up__user small  { font-size: var(--ds-fs-body-11); color: var(--ds-text-gray-600); }
.ds-up__list { padding: var(--ds-space-12) !important; }
.ds-up__sel {
  display: flex; align-items: center; width: 100%;
  padding: 0 var(--ds-space-10) 0 var(--ds-space-12);
  height: 40px;
  background: var(--ds-fill-gray-100);
  border: 0; border-radius: var(--ds-radius-6);
  cursor: pointer; font-family: var(--ds-font-family);
}
.ds-up__sel > span {
  flex: 1; text-align: left;
  font-size: var(--ds-fs-body-12); font-weight: var(--ds-fw-medium); color: var(--ds-text-gray-black);
}
.ds-up__menu {
  margin-top: var(--ds-space-4) !important;
  padding: 0 !important; background: transparent !important;
}
.ds-up__opt {
  display: flex !important; align-items: center; min-height: 40px !important;
  padding: 0 var(--ds-space-12) !important;
  background: var(--ds-fill-gray-white) !important;
  border: 0 !important; border-radius: var(--ds-radius-6) !important;
  cursor: pointer; font-family: var(--ds-font-family);
  text-align: left;
  font-size: var(--ds-fs-body-12); color: var(--ds-text-gray-600) !important;
}
.ds-up__opt :deep(.v-list-item__overlay) { display: none; }
.ds-up__opt:hover, .ds-up__opt--selected {
  background: var(--ds-fill-gray-100) !important;
  color: var(--ds-text-blue-600) !important;
  font-weight: var(--ds-fw-medium);
}
</style>
