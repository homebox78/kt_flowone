<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { DsIcon } from '@/components/ds'

// 시안 4:15338 — LNB 1+2+3 dp + 우측 Collapse 핸들
const props = defineProps({
  initialOpen: { type: String, default: '콘텐츠 관리' }, // 1뎁스 그룹 title — 최초 펼침
  initialCollapsed: { type: Boolean, default: false },
  collapsed: { type: Boolean, default: undefined },
})
const emit = defineEmits(['update:collapsed'])
const route = useRoute()
const internalCollapsed = ref(props.initialCollapsed)
const collapsed = computed({
  get: () => (props.collapsed !== undefined ? props.collapsed : internalCollapsed.value),
  set: (v) => {
    internalCollapsed.value = v
    emit('update:collapsed', v)
  },
})

const menus = ref([
  {
    title: '콘텐츠 관리', icon: 'lnb-content', iconActive: 'lnb-content-active', open: false,
    children: [
      { title: '신작계획 관리', to: '/plan' },
      { title: 'TV앱 입고 관리', to: '/tv-app/inbound' },
      { title: '통지 목록 관리', to: '/notice' },
      { title: '정산서 관리', to: '/settlement' },
    ],
  },
  { title: '현황/통계', icon: 'lnb-stats', iconActive: 'lnb-stats-active', open: false,
    children: [
      { title: '콘텐츠 통계', to: '/stats/content' },
      { title: '판매이용통계', to: '/stats/sales' },
    ],
  },
  { title: '회원정보', icon: 'lnb-member', iconActive: 'lnb-member-active', open: false,
    children: [
      { title: '파트너정보 관리', to: '/member/my-info' },
      { title: 'CP정보 관리', to: '/member/cp' },
      { title: '사용자 관리', to: '/member/users' },
    ],
  },
  { title: '가이드', icon: 'lnb-guide', iconActive: 'lnb-guide-active', open: false,
    children: [{ title: 'CP길라잡이', to: '/guide' }],
  },
])

function hasChildren(item) { return Array.isArray(item.children) && item.children.length }
function isActive(to) { return to && (route.path === to || route.path.startsWith(to + '/')) }
function is2dpActive(c) {
  if (c.to) return isActive(c.to)
  return c.children?.some((g) => isActive(g.to))
}
function isGroupActive(m) { return m.children.some(is2dpActive) }

// 라우트 변경 시 활성 그룹만 펼치고 나머지는 접는다(=초기/새로고침 기준 상태).
// 활성 메뉴가 속한 그룹은 열고, 그 외 그룹은 닫음. 2뎁스 하위그룹도 동일.
// 사용자가 페이지 내에서 직접 연 그룹은 다음 라우트 이동 전까지 유지된다.
// 매칭 그룹이 없으면(LNB 외 라우트) initialOpen 그룹만 펼침.
function syncOpenWithRoute() {
  let matched = false
  menus.value.forEach((m) => {
    const active = isGroupActive(m)
    m.open = active
    if (active) matched = true
    m.children.forEach((c) => {
      if (hasChildren(c)) c.open = is2dpActive(c)
    })
  })
  if (!matched) {
    const def = menus.value.find((m) => m.title === props.initialOpen)
    if (def) def.open = true
  }
}
watch(() => route.path, syncOpenWithRoute, { immediate: true })

// 부드러운 펼침/접힘 — height auto 를 px 로 측정해 트랜지션
function onEnter(el) {
  el.style.height = '0'
  el.offsetHeight
  el.style.height = el.scrollHeight + 'px'
}
function onAfterEnter(el) { el.style.height = 'auto' }
function onLeave(el) {
  el.style.height = el.scrollHeight + 'px'
  el.offsetHeight
  el.style.height = '0'
}
</script>

<template>
  <aside class="lnb" :class="{ 'lnb--collapsed': collapsed }">
    <div class="lnb-menu">
      <div v-for="m in menus" :key="m.title" class="group">
        <button type="button" class="group-head" @click="collapsed ? (collapsed = false, m.open = true) : (m.open = !m.open)">
          <span class="group-icon" :class="{ 'group-icon--active': isGroupActive(m) }">
            <DsIcon :name="isGroupActive(m) ? m.iconActive : m.icon" :size="20" />
          </span>
          <span class="group-title" :class="{ active: isGroupActive(m) }">{{ m.title }}</span>
          <DsIcon :name="m.open ? 'line-up' : 'line-down'" :size="12" class="group-chev" />
        </button>

        <Transition name="lnb-expand" @enter="onEnter" @after-enter="onAfterEnter" @leave="onLeave">
          <div v-show="m.open" class="group-body">
            <template v-for="c in m.children" :key="c.title">
              <router-link
                v-if="!hasChildren(c)"
                :to="c.to" class="sub-item"
                :class="{ active: isActive(c.to) }"
              >{{ c.title }}</router-link>

              <div v-else class="sub-group" :class="{ 'sub-group--expanded': c.open }">
                <button
                  type="button" class="sub-item sub-item--toggle"
                  :class="{ 'sub-item--active-parent': is2dpActive(c) || c.open }"
                  @click="c.open = !c.open"
                >
                  <span class="sub-item__txt">{{ c.title }}</span>
                </button>
                <Transition name="lnb-expand" @enter="onEnter" @after-enter="onAfterEnter" @leave="onLeave">
                  <div v-show="c.open" class="sub-group__body">
                    <router-link
                      v-for="g in c.children" :key="g.title"
                      :to="g.to" class="dp3-item"
                      :class="{ active: isActive(g.to) }"
                    >
                      <span class="dp3-bullet" aria-hidden="true">·</span>
                      <span class="dp3-text">{{ g.title }}</span>
                    </router-link>
                  </div>
                </Transition>
              </div>
            </template>
          </div>
        </Transition>
      </div>
    </div>

    <!-- 시안: LNB 우측 Collapse 핸들 (14×100 vertical pill) -->
    <button
      type="button" class="lnb-handle"
      :aria-label="collapsed ? 'LNB 펼치기' : 'LNB 접기'"
      @click="collapsed = !collapsed"
    >
      <svg v-if="collapsed" class="lnb-handle__caret" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M1 1L7 6L1 11Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
      </svg>
      <svg v-else class="lnb-handle__caret" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M7 1L1 6L7 11Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
      </svg>
    </button>
  </aside>
</template>

<style scoped>
.lnb {
  position: fixed; top: 64px; bottom: 0; left: 0;
  width: 260px;
  background: var(--ds-fill-gray-white);
  box-shadow: 8px 0 12px 0 rgba(0, 0, 0, 0.06);
  overflow: visible;
  z-index: 90;
  transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.lnb--collapsed { width: 74px; }
/* 텍스트/체브론 페이드 + 폭 축소 */
.group-title, .group-chev {
  transition: opacity 0.18s ease, width 0.2s ease, max-width 0.2s ease, margin 0.2s ease;
}
.lnb--collapsed .group-title,
.lnb--collapsed .group-chev {
  opacity: 0;
  width: 0 !important; max-width: 0; margin: 0;
  overflow: hidden; pointer-events: none;
}
.lnb-menu {
  height: 100%; overflow-y: auto; overflow-x: hidden;
  padding: var(--ds-space-20); display: flex; flex-direction: column; gap: var(--ds-space-16);
}
.lnb--collapsed .lnb-menu { align-items: center; padding: var(--ds-space-20) 0 var(--ds-space-20) 4px; }
.lnb--collapsed .group { width: auto; }

/* Collapsed (Figma 4:15393): 아이콘만 세로로 표시, 라벨·체브론·하위메뉴 숨김 */
.lnb--collapsed .group-body { display: none; }
.lnb--collapsed .group-head {
  justify-content: center; width: 34px;
  padding: var(--ds-space-8) 0;
  margin: 0 auto;
  transform: translateX(3px);
}
.lnb--collapsed .group-head:hover .group-icon,
.lnb--collapsed .group .group-head:focus-visible .group-icon { background: var(--ds-fill-gray-100); }
/* 활성 그룹의 아이콘에 gray-100 rounded 배경 (1Depth Icon·Select 상태) */

.group-head {
  display: flex; align-items: center; gap: var(--ds-space-6);
  height: 38px; padding: var(--ds-space-20) 0;
  background: transparent; border: 0; cursor: pointer;
  font-family: var(--ds-font-family); width: 100%;
}
.group-icon {
  width: 34px; height: 34px;
  display: inline-flex; align-items: center; justify-content: center;
  padding: var(--ds-space-6); border-radius: var(--ds-radius-8);
}
.lnb--collapsed .group-icon--active { background: var(--ds-fill-gray-100); }
.group-title {
  flex: 1; text-align: left;
  font-size: var(--ds-fs-headline-15);
  font-weight: var(--ds-fw-bold);
  line-height: var(--ds-lh-body);
  color: var(--ds-text-gray-700);
  width: auto;
}
.group-title.active { color: var(--ds-text-gray-black); }
.group-chev { color: var(--ds-text-gray-700); }

.group { width: 100%; }
.group-body { display: flex; flex-direction: column; width: 100%; }

.sub-item {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%;
  padding: var(--ds-space-12) var(--ds-space-12) var(--ds-space-12) var(--ds-space-40);
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-body-14);
  font-weight: var(--ds-fw-medium);
  line-height: var(--ds-lh-body);
  color: var(--ds-text-gray-700);
  text-decoration: none;
  border-radius: var(--ds-radius-6);
  background: transparent; border: 0; cursor: pointer;
}
.sub-item:hover { background: var(--ds-fill-gray-50); }
.sub-item.active {
  background: var(--ds-fill-gray-100);
  color: var(--ds-text-blue-600);  /* 시안: 짙은 보라/blue-600 */
  font-weight: var(--ds-fw-bold);
}
.sub-item--toggle { color: var(--ds-text-gray-700); }
.sub-item--active-parent { color: var(--ds-text-blue-500); font-weight: var(--ds-fw-bold); }
.sub-item__txt { flex: 1; text-align: left; }

/* 2Depth + 3Depth expanded: gray-100 rounded card 감싸기 (Figma 4:15447 / 4:15401) */
.sub-group { display: flex; flex-direction: column; width: 100%; }
.sub-group--expanded {
  background: var(--ds-fill-gray-100);
  border-radius: var(--ds-radius-6);
  overflow: hidden;
}
.sub-group--expanded > .sub-item {
  background: transparent;
}
.sub-group__body { display: flex; flex-direction: column; padding-bottom: var(--ds-space-8); }

.dp3-item {
  display: flex; align-items: center; gap: var(--ds-space-6);
  width: 100%;
  min-height: 32px;
  padding: var(--ds-space-6) var(--ds-space-12) var(--ds-space-6) var(--ds-space-40);
  font-family: var(--ds-font-family);
  font-size: var(--ds-fs-body-13);
  font-weight: var(--ds-fw-regular);
  color: var(--ds-text-gray-600);
  text-decoration: none;
  line-height: var(--ds-lh-body);
}
.dp3-bullet {
  display: inline-block; width: 13px; text-align: center;
  color: var(--ds-text-gray-500); font-weight: var(--ds-fw-bold);
}
.dp3-text { flex: 1; }
.dp3-item:hover { font-weight: var(--ds-fw-bold); }
.dp3-item.active {
  color: var(--ds-text-blue-500);
  font-weight: var(--ds-fw-bold);
}
.dp3-item.active .dp3-bullet { color: var(--ds-text-blue-500); }

/* 시안: 우측 Collapse 핸들 — 반쪽 pill (좌측 flat / 우측 둥근) (Figma 4:15475 / 4:15478) */
.lnb-handle {
  position: absolute;
  top: 50%;
  right: -14px;
  transform: translateY(-50%);
  width: 14px; height: 100px;
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--ds-fill-gray-400);
  border: 0;
  border-radius: 0 14px 14px 0;
  cursor: pointer;
  color: var(--ds-text-gray-white);
  padding: 0;
  z-index: 91;
  transition: background 0.15s ease;
}
.lnb-handle:hover { background: var(--ds-fill-gray-500); }
.lnb-handle__caret { width: 8px; height: 12px; display: block; }

/* 메뉴 펼침/접힘 트랜지션 */
.lnb-expand-enter-active,
.lnb-expand-leave-active {
  transition: height 0.22s ease, opacity 0.18s ease;
  overflow: hidden;
}
.lnb-expand-enter-from,
.lnb-expand-leave-to { opacity: 0; }
.lnb-expand-enter-to,
.lnb-expand-leave-from { opacity: 1; }
</style>
