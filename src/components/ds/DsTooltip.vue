<script setup>
import { computed } from 'vue'
import DsIcon from './DsIcon.vue'

// 시안 4:14914: Auto Tooltip (다크) / Toggle Tooltip (라이트 + X 닫기) × 8 position
const props = defineProps({
  text: { type: String, required: true },
  type: { type: String, default: 'auto', validator: (v) => ['auto', 'toggle'].includes(v) },
  position: {
    type: String, default: 'top',
    validator: (v) => ['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right', 'right', 'left'].includes(v),
  },
  visible: { type: Boolean, default: true },
  closable: { type: Boolean, default: false },
})
defineEmits(['close'])

const classes = computed(() => [
  'ds-tt',
  `ds-tt--${props.type}`,
  `ds-tt--pos-${props.position}`,
])
</script>

<template>
  <transition name="ds-tt-anim">
    <div v-if="visible" :class="classes" role="tooltip">
      <span class="ds-tt__text">{{ text }}</span>
      <button v-if="closable || type === 'toggle'" type="button" class="ds-tt__close" @click="$emit('close')">
        <DsIcon name="line-close" :size="16" />
      </button>
      <span class="ds-tt__arrow" />
    </div>
  </transition>
</template>

<style scoped>
.ds-tt {
  position: relative;
  display: inline-flex;
  align-items: flex-start;
  gap: var(--ds-space-6);
  padding: var(--ds-space-8) var(--ds-space-12);
  border-radius: var(--ds-radius-8);
  max-width: 480px;
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-body-12);
  font-weight: var(--ds-fw-medium);
  line-height: var(--ds-lh-body);
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.12));
}
.ds-tt__text { flex: 1; min-width: 0; white-space: pre-line; }
.ds-tt__close {
  display: inline-flex; padding: 0; margin: 0;
  background: transparent; border: 0; cursor: pointer;
  color: inherit; flex-shrink: 0;
}

.ds-tt--auto   { background: var(--ds-fill-gray-900); color: var(--ds-text-gray-white); }
.ds-tt--toggle { background: var(--ds-fill-gray-white); color: var(--ds-text-gray-700); border: 1px solid var(--ds-border-gray-300); }

/* Arrow */
.ds-tt__arrow {
  position: absolute; width: 12px; height: 6px;
  background: inherit;
  clip-path: polygon(0 0, 100% 0, 50% 100%);
}
.ds-tt--pos-top         .ds-tt__arrow { bottom: -6px; left: 50%; transform: translateX(-50%); }
.ds-tt--pos-top-left    .ds-tt__arrow { bottom: -6px; left: 12px; }
.ds-tt--pos-top-right   .ds-tt__arrow { bottom: -6px; right: 12px; }
.ds-tt--pos-bottom      .ds-tt__arrow { top: -6px; left: 50%; transform: translateX(-50%) rotate(180deg); }
.ds-tt--pos-bottom-left .ds-tt__arrow { top: -6px; left: 12px; transform: rotate(180deg); }
.ds-tt--pos-bottom-right.ds-tt__arrow { top: -6px; right: 12px; transform: rotate(180deg); }
.ds-tt--pos-right       .ds-tt__arrow { left: -6px; top: 50%; transform: translateY(-50%) rotate(90deg); width: 6px; height: 12px; }
.ds-tt--pos-left        .ds-tt__arrow { right: -6px; top: 50%; transform: translateY(-50%) rotate(-90deg); width: 6px; height: 12px; }

.ds-tt-anim-enter-active, .ds-tt-anim-leave-active { transition: opacity 0.15s ease; }
.ds-tt-anim-enter-from, .ds-tt-anim-leave-to { opacity: 0; }
</style>
