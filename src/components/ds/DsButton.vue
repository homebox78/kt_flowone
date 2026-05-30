<script setup>
import { computed } from 'vue'
import { VBtn } from 'vuetify/components'
import DsIcon from './DsIcon.vue'

// 시안 (4:13117) — Vuetify VBtn 을 내부 엔진으로 사용하여
// 외부 API(type, size, icon, ...)는 유지하고 디자인 시스템 스펙(높이/패딩/색) 만 적용
const props = defineProps({
  type: {
    type: String, default: 'primary',
    validator: (v) => ['primary', 'secondary', 'primary-outline', 'neutral-outline', 'text'].includes(v),
  },
  size: {
    type: String, default: 'medium',
    validator: (v) => ['xl', 'large', 'medium', 'small'].includes(v),
  },
  disabled: { type: Boolean, default: false },
  // Leading icon — `icon` (DS) 또는 `prepend-icon` (Vuetify 호환) 모두 가능
  icon: { type: String, default: null },
  prependIcon: { type: String, default: null },
  // Trailing icon — `iconRight` (DS) 또는 `append-icon` (Vuetify 호환) 모두 가능
  iconRight: { type: String, default: null },
  appendIcon: { type: String, default: null },
  onlyIcon: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  tag: { type: String, default: 'button' },
  href: { type: String, default: null },
})

// 별칭 통합 — DS와 Vuetify 명명 모두 지원
const leadingIcon = computed(() => props.icon || props.prependIcon)
const trailingIcon = computed(() => props.iconRight || props.appendIcon)

const variant = computed(() => {
  if (props.type === 'text') return 'text'
  if (props.type === 'primary' || props.type === 'secondary') return 'flat'
  return 'outlined'
})
const color = computed(() => {
  if (props.disabled) return undefined
  if (props.type === 'primary' || props.type === 'primary-outline') return 'primary'
  if (props.type === 'secondary') return 'secondary'
  return undefined // neutral-outline / text — 색은 CSS override
})
// 시안: 아이콘 컨테이너 18(Large) + 내부 inset 21.88% = 실제 visible ~10px
// chevron SVG는 viewBox 12×7 (tight)이라 width 기준으로 사이즈 지정
const iconSize = computed(() => ({ xl: 14, large: 12, medium: 10, small: 8 }[props.size]))
// only-icon 버튼은 시안에서 약간 더 큼
const onlyIconSize = computed(() => ({ xl: 18, large: 16, medium: 12, small: 10 }[props.size]))
</script>

<template>
  <VBtn
    :variant="variant"
    :color="color"
    :disabled="disabled"
    :href="tag === 'a' ? href : undefined"
    :tag="tag"
    :ripple="false"
    :class="[
      'ds-btn',
      `ds-btn--${type}`,
      `ds-btn--${size}`,
      { 'ds-btn--only-icon': onlyIcon, 'ds-btn--block': block },
    ]"
  >
    <DsIcon v-if="leadingIcon" :name="leadingIcon" :size="onlyIcon ? onlyIconSize : iconSize" />
    <span v-if="!onlyIcon" class="ds-btn__label"><slot /></span>
    <DsIcon v-if="trailingIcon" :name="trailingIcon" :size="iconSize" />
  </VBtn>
</template>

<style scoped>
/* === Vuetify VBtn override: KT FLOW1 DS 시안 그대로 (4:13117) === */
.ds-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--ds-space-4);
  border-radius: var(--ds-radius-4) !important;
  border: 1px solid transparent;
  font-family: var(--ds-font-family) !important;
  font-weight: var(--ds-fw-medium) !important;
  line-height: var(--ds-lh-body) !important;
  white-space: nowrap; text-transform: none !important; letter-spacing: 0 !important;
  min-width: 0 !important;
  box-shadow: none !important;
}
.ds-btn :deep(.v-btn__overlay),
.ds-btn :deep(.v-btn__underlay) { display: none; }
.ds-btn :deep(.v-btn__content) {
  display: inline-flex; align-items: center; gap: var(--ds-space-4);
}
.ds-btn__label { padding: 0 var(--ds-space-4); }
.ds-btn--block { display: flex; width: 100%; }

/* === Size — Vuetify VBtn min-height 가 32보다 크므로 min-height 도 강제 === */
.ds-btn--xl     { height: var(--ds-h-xl) !important; min-height: var(--ds-h-xl) !important; padding: 0 var(--ds-space-14); font-size: var(--ds-fs-body-15); min-width: 100px !important; }
.ds-btn--large  { height: var(--ds-h-lg) !important; min-height: var(--ds-h-lg) !important; padding: 0 var(--ds-space-12); font-size: var(--ds-fs-body-14); min-width: 100px !important; }
.ds-btn--medium { height: var(--ds-h-md) !important; min-height: var(--ds-h-md) !important; padding: 0 var(--ds-space-10); font-size: var(--ds-fs-body-13); min-width: 76px !important; }
.ds-btn--small  { height: var(--ds-h-sm) !important; min-height: var(--ds-h-sm) !important; padding: 0 var(--ds-space-8);  font-size: var(--ds-fs-body-12); min-width: 60px !important; }
.ds-btn--only-icon.ds-btn--xl     { width: 48px !important; min-width: 0 !important; padding: 0; }
.ds-btn--only-icon.ds-btn--large  { width: 40px !important; min-width: 0 !important; padding: 0; }
.ds-btn--only-icon.ds-btn--medium { width: 32px !important; min-width: 0 !important; padding: 0; }
.ds-btn--only-icon.ds-btn--small  { width: 28px !important; min-width: 0 !important; padding: 0; }

/* === Type: Primary (Figma 4:13120) === */
.ds-btn--primary {
  background: var(--ds-fill-blue-500) !important;
  color: var(--ds-text-gray-white) !important;
  border: 1px solid var(--ds-fill-blue-500) !important;
}
.ds-btn--primary:hover:not(:disabled):not([disabled]):not(.v-btn--disabled) {
  background: var(--ds-fill-blue-900) !important;
  border-color: var(--ds-fill-blue-900) !important;
}

/* === Type: Secondary (Figma 4:13147) === */
.ds-btn--secondary {
  background: var(--ds-fill-gray-600) !important;
  color: var(--ds-text-gray-white) !important;
  border: 1px solid var(--ds-fill-gray-600) !important;
}
.ds-btn--secondary:hover:not(:disabled):not([disabled]):not(.v-btn--disabled) {
  background: var(--ds-fill-gray-black) !important;
  border-color: var(--ds-fill-gray-black) !important;
}

/* === Type: Primary Outline (Figma 4:13175) === */
.ds-btn--primary-outline {
  background: var(--ds-fill-gray-white) !important;
  color: var(--ds-text-blue-500) !important;
  border: 1px solid var(--ds-border-blue-500) !important;
}
.ds-btn--primary-outline:hover:not(:disabled):not([disabled]):not(.v-btn--disabled) {
  color: var(--ds-fill-blue-900) !important;
  border-color: var(--ds-fill-blue-900) !important;
}

/* === Type: Neutral Outline (Figma 4:13202) === */
.ds-btn--neutral-outline {
  background: var(--ds-fill-gray-white) !important;
  color: var(--ds-text-gray-black) !important;
  border: 1px solid var(--ds-border-gray-300) !important;
}
.ds-btn--neutral-outline:hover:not(:disabled):not([disabled]):not(.v-btn--disabled) {
  border-color: var(--ds-fill-gray-600) !important;
  color: var(--ds-text-gray-black) !important;
}

/* === Type: Text === */
.ds-btn--text {
  background: transparent !important;
  color: var(--ds-text-gray-black) !important;
  border: 1px solid transparent !important;
  min-width: 0 !important;
  padding: 0 var(--ds-space-4);
}
.ds-btn--text:hover:not(:disabled):not([disabled]):not(.v-btn--disabled) { color: var(--ds-text-blue-500) !important; }

/* === Disabled — 4 type 모두 동일 (gray-200 bg + gray-500 text) === */
.ds-btn:disabled, .ds-btn[disabled], .ds-btn.v-btn--disabled { cursor: not-allowed; opacity: 1 !important; }
.ds-btn--primary:disabled, .ds-btn--primary[disabled], .ds-btn--primary.v-btn--disabled,
.ds-btn--secondary:disabled, .ds-btn--secondary[disabled], .ds-btn--secondary.v-btn--disabled {
  background: var(--ds-fill-gray-200) !important;
  border-color: var(--ds-fill-gray-200) !important;
  color: var(--ds-text-gray-500) !important;
}
.ds-btn--primary-outline:disabled, .ds-btn--primary-outline[disabled], .ds-btn--primary-outline.v-btn--disabled,
.ds-btn--neutral-outline:disabled, .ds-btn--neutral-outline[disabled], .ds-btn--neutral-outline.v-btn--disabled {
  background: var(--ds-fill-gray-200) !important;
  border-color: var(--ds-border-gray-300) !important;
  color: var(--ds-text-gray-500) !important;
}
.ds-btn--text:disabled, .ds-btn--text[disabled], .ds-btn--text.v-btn--disabled { color: var(--ds-text-gray-500) !important; }

/* ============ Icon color override ============
   시안 아이콘 SVG가 fill="var(--fill-0, #212633)" / stroke 하드코딩으로 다크 회색 기본.
   버튼 타입별 텍스트 색에 맞춰 SVG fill/stroke 강제 override.
*/
/* Primary / Secondary — 흰색 아이콘 */
.ds-btn--primary :deep(.ds-icon),
.ds-btn--secondary :deep(.ds-icon) {
  --fill-0: #ffffff;
  color: #ffffff;
}
.ds-btn--primary :deep(.ds-icon svg [fill]),
.ds-btn--secondary :deep(.ds-icon svg [fill]) { fill: #ffffff; }
.ds-btn--primary :deep(.ds-icon svg [stroke]),
.ds-btn--secondary :deep(.ds-icon svg [stroke]) { stroke: #ffffff; }

/* Primary Outline — 블루 아이콘 */
.ds-btn--primary-outline :deep(.ds-icon) { --fill-0: var(--ds-fill-blue-500); color: var(--ds-fill-blue-500); }
.ds-btn--primary-outline :deep(.ds-icon svg [fill]) { fill: var(--ds-fill-blue-500); }
.ds-btn--primary-outline :deep(.ds-icon svg [stroke]) { stroke: var(--ds-fill-blue-500); }

/* Neutral Outline — 검정/다크 그레이 아이콘 (기본) */
.ds-btn--neutral-outline :deep(.ds-icon) { --fill-0: var(--ds-text-gray-900); color: var(--ds-text-gray-900); }
.ds-btn--neutral-outline :deep(.ds-icon svg [fill]) { fill: var(--ds-text-gray-900); }
.ds-btn--neutral-outline :deep(.ds-icon svg [stroke]) { stroke: var(--ds-text-gray-900); }

/* Text — 본문 색상 */
.ds-btn--text :deep(.ds-icon) { --fill-0: currentColor; color: inherit; }
.ds-btn--text :deep(.ds-icon svg [fill]) { fill: currentColor; }
.ds-btn--text :deep(.ds-icon svg [stroke]) { stroke: currentColor; }

/* Disabled — 모두 회색 (시안 #949bb0) */
.ds-btn:disabled :deep(.ds-icon),
.ds-btn[disabled] :deep(.ds-icon),
.ds-btn.v-btn--disabled :deep(.ds-icon) {
  --fill-0: var(--ds-text-gray-500);
  color: var(--ds-text-gray-500);
}
.ds-btn:disabled :deep(.ds-icon svg [fill]),
.ds-btn[disabled] :deep(.ds-icon svg [fill]),
.ds-btn.v-btn--disabled :deep(.ds-icon svg [fill]) { fill: var(--ds-text-gray-500) !important; }
.ds-btn:disabled :deep(.ds-icon svg [stroke]),
.ds-btn[disabled] :deep(.ds-icon svg [stroke]),
.ds-btn.v-btn--disabled :deep(.ds-icon svg [stroke]) { stroke: var(--ds-text-gray-500) !important; }

/* Label inner padding — 시안: 0 6px */
.ds-btn__label { padding: 0 var(--ds-space-6) !important; }
</style>
