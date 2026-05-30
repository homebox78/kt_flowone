<script setup>
import DsSearchLabel from './DsSearchLabel.vue'

// 시안 4:15159 Filter Field — Label + Controls
defineProps({
  label: { type: String, required: true },
  required: { type: Boolean, default: false },
  labelWidth: { type: [String, Number], default: 90 },
  grow: { type: Boolean, default: false },
})
</script>

<template>
  <div class="ds-ffield" :class="{ 'ds-ffield--grow': grow }">
    <DsSearchLabel :text="label" :required="required" :width="labelWidth" />
    <div class="ds-ffield__controls"><slot /></div>
  </div>
</template>

<style scoped>
.ds-ffield {
  display: flex;
  align-items: center;
  gap: var(--ds-space-8);
  min-width: 0;
  width: 100%;
}
.ds-ffield--grow { flex: 1 1 auto; }
.ds-ffield__controls {
  display: flex;
  align-items: center;
  gap: var(--ds-space-8);
  flex: 1 1 auto;
  min-width: 0;
}
</style>
