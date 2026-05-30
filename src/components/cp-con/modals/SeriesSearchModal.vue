<script setup>
// 시리즈 조회 모달 — 시리즈 단일 선택 + 시즌 다중 선택 (시안 4:4056)
// 시안의 nested master-detail 룩 (선택된 시리즈 행 안에 시즌 목록 인라인)을 위해
// AgGrid Community(master-detail 미지원) 대신 커스텀 div 테이블 사용 — 예외 케이스.
import { ref, computed } from 'vue'
import {
  DsModal, DsSelect, DsTextField, DsButton,
  DsCheckbox, DsPagination, DsRadio,
} from '@/components/ds'

defineProps({
  modelValue: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue', 'select'])

const scope = ref('시리즈명')
const keyword = ref('')
const selectedId = ref(null)
const selectedSeasons = ref({})  // { seriesId: Set<seasonId> }
const page = ref(1)
const pageSize = ref(50)

const SERIES_NAMES = [
  '굿닥터', '무한도전', '런닝맨', '태양의 후예', '동백꽃 필 무렵',
  '낭만닥터 김사부', '펜트하우스', '구르미 그린 달빛', 'W', '오징어 게임',
  '더 글로리', '무빙', '경성크리처', '재벌집 막내아들', '이상한 변호사 우영우',
  '도깨비', '미스터 션샤인', '응답하라 1988', '비밀의 숲', '시그널',
  '나의 아저씨', '슬기로운 의사생활', '하이재킹', '소년시대', '커넥션',
]

const allRows = computed(() =>
  Array.from({ length: 180 }, (_, i) => {
    const seasonCount = 1 + (i * 3) % 8
    return {
      id: `series-${i}`,
      seriesId: String(1200000000 + (i * 17389) % 999999999),
      seriesName: SERIES_NAMES[i % SERIES_NAMES.length],
      seasons: Array.from({ length: seasonCount }, (_, j) => ({
        id: `series-${i}-s${j}`,
        name: `시즌명 노출 ${380 - i - j}회`,
      })),
    }
  }),
)
const total = computed(() => allRows.value.length)
const rowData = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return allRows.value.slice(start, start + pageSize.value)
})

function reset() {
  scope.value = '시리즈명'
  keyword.value = ''
}
function search() { /* TODO(api) */ }

function pickSeries(id) {
  selectedId.value = id
}
function onSelect() {
  const row = allRows.value.find((r) => r.id === selectedId.value)
  if (row) {
    const picked = selectedSeasons.value[row.id]
    emit('select', { ...row, selectedSeasonIds: picked ? Array.from(picked) : [] })
  }
  emit('update:modelValue', false)
}
function toggleSeason(seriesId, seasonId) {
  const set = selectedSeasons.value[seriesId] || new Set()
  if (set.has(seasonId)) set.delete(seasonId)
  else set.add(seasonId)
  selectedSeasons.value = { ...selectedSeasons.value, [seriesId]: set }
}
function toggleAllSeasons(series) {
  const all = series.seasons.map((s) => s.id)
  const set = selectedSeasons.value[series.id] || new Set()
  const allSelected = all.length && all.every((id) => set.has(id))
  selectedSeasons.value = {
    ...selectedSeasons.value,
    [series.id]: allSelected ? new Set() : new Set(all),
  }
}
function isSeasonChecked(seriesId, seasonId) {
  return !!selectedSeasons.value[seriesId]?.has(seasonId)
}
function isAllSeasonsChecked(series) {
  const set = selectedSeasons.value[series.id]
  return !!set && series.seasons.length > 0 && series.seasons.every((s) => set.has(s.id))
}
</script>

<template>
  <DsModal :model-value="modelValue" title="시리즈 조회" :width="720" @update:model-value="$emit('update:modelValue', $event)">
    <div class="search-row">
      <span class="lbl">조회</span>
      <div class="select"><DsSelect v-model="scope" :options="['시리즈명','시리즈 ID']" /></div>
      <div class="input"><DsTextField v-model="keyword" placeholder="입력" /></div>
      <span class="divider" />
      <DsButton type="neutral-outline" only-icon icon="line-rotate" @click="reset" />
      <DsButton type="primary" @click="search">조회</DsButton>
    </div>

    <div class="tbl">
      <div class="tbl__head">
        <span class="c-sel">선택</span>
        <span class="c-id">시리즈 ID</span>
        <span class="c-name">시리즈명</span>
      </div>
      <div class="tbl__body">
        <template v-for="r in rowData" :key="r.id">
          <div class="row" :class="{ 'row--active': selectedId === r.id }">
            <span class="c-sel" @click="pickSeries(r.id)">
              <DsRadio :model-value="selectedId" :value="r.id" name="series-pick" @update:model-value="pickSeries(r.id)" />
            </span>
            <span class="c-id">{{ r.seriesId }}</span>
            <span class="c-name">{{ r.seriesName }}</span>
          </div>
          <!-- 선택된 시리즈에만 시즌 sub-table 인라인 노출 -->
          <div v-if="selectedId === r.id && r.seasons.length" class="seasons">
            <div class="seasons__head">
              <span class="s-chk"><DsCheckbox :model-value="isAllSeasonsChecked(r)" @update:model-value="toggleAllSeasons(r)" /></span>
              <span class="s-name">시즌명</span>
            </div>
            <div v-for="se in r.seasons" :key="se.id" class="seasons__row">
              <span class="s-chk"><DsCheckbox :model-value="isSeasonChecked(r.id, se.id)" @update:model-value="toggleSeason(r.id, se.id)" /></span>
              <span class="s-name">{{ se.name }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div class="pager-wrap"><DsPagination v-model="page" :total="total" :page-size="pageSize" /></div>

    <template #footer>
      <DsButton type="neutral-outline" size="large" @click="$emit('update:modelValue', false)">취소</DsButton>
      <DsButton type="primary" size="large" :disabled="!selectedId" @click="onSelect">선택</DsButton>
    </template>
  </DsModal>
</template>

<style scoped>
.search-row {
  display: flex; align-items: center; gap: var(--ds-space-8);
  padding-bottom: var(--ds-space-20);
  border-bottom: 1px solid var(--ds-border-gray-300);
  margin-bottom: var(--ds-space-20);
}
.search-row .lbl {
  font-size: var(--ds-fs-body-13); font-weight: var(--ds-fw-medium);
  color: var(--ds-text-gray-black);
  width: 60px; flex-shrink: 0;
}
.search-row .select { width: 140px; flex-shrink: 0; }
.search-row .input { flex: 1; min-width: 0; }
.search-row .divider {
  display: inline-block; width: 1px; height: 20px;
  background: var(--ds-border-gray-300); margin: 0 var(--ds-space-4);
}
.search-row :deep(.ds-tf), .search-row :deep(.ds-select) { width: 100%; }

/* 시안 4:4076 — 시리즈 테이블 (선택 / 시리즈 ID / 시리즈명) */
.tbl {
  border-top: 1px solid #949bb0;
  max-height: 520px; overflow-y: auto;
}
.tbl__head {
  display: flex; align-items: center;
  background: var(--ds-fill-blue-50);
  border-bottom: 1px solid var(--ds-border-gray-200);
  min-height: 40px;
}
.tbl__head > span {
  font-size: var(--ds-fs-body-13); font-weight: var(--ds-fw-medium);
  color: var(--ds-text-gray-700);
  padding: var(--ds-space-6) var(--ds-space-10);
  text-align: center;
}
.row {
  display: flex; align-items: stretch;
  border-bottom: 1px solid var(--ds-border-gray-200);
  min-height: 44px;
}
.row > span {
  padding: var(--ds-space-6) var(--ds-space-10);
  font-size: var(--ds-fs-body-13);
  color: var(--ds-text-gray-black);
  display: flex; align-items: center;
}
.c-sel {
  width: 60px; flex-shrink: 0;
  justify-content: center;
  cursor: pointer;
  border-right: 1px solid var(--ds-border-gray-200);
}
.c-id { width: 140px; flex-shrink: 0; justify-content: center; border-right: 1px solid var(--ds-border-gray-200); }
.c-name { flex: 1; min-width: 0; }

/* 시즌 sub-table — 선택된 시리즈 행 바로 아래 인라인 */
.seasons {
  display: flex; flex-direction: column;
  margin-left: 60px;  /* 선택 컬럼 폭만큼 들여쓰기 */
  border-bottom: 1px solid var(--ds-border-gray-200);
}
.seasons__head {
  display: flex; align-items: center;
  background: var(--ds-fill-blue-75);
  border-bottom: 1px solid var(--ds-border-gray-300);
  min-height: 32px;
}
.seasons__head .s-chk { padding: var(--ds-space-4) var(--ds-space-10); border-right: 1px solid var(--ds-border-gray-300); }
.seasons__head .s-name {
  flex: 1; text-align: center;
  font-size: var(--ds-fs-body-13); font-weight: var(--ds-fw-medium);
  color: var(--ds-text-gray-700);
  padding: var(--ds-space-4) var(--ds-space-10);
}
.seasons__row {
  display: flex; align-items: center;
  border-bottom: 1px solid var(--ds-border-gray-300);
  min-height: 36px; background: var(--ds-fill-gray-white);
}
.seasons__row:last-child { border-bottom: 0; }
.seasons__row .s-chk { padding: var(--ds-space-4) var(--ds-space-10); border-right: 1px solid var(--ds-border-gray-300); }
.seasons__row .s-name {
  flex: 1;
  font-size: var(--ds-fs-body-13); color: var(--ds-text-gray-black);
  padding: var(--ds-space-4) var(--ds-space-10);
}

.pager-wrap { display: flex; justify-content: center; padding-top: var(--ds-space-20); }
</style>
