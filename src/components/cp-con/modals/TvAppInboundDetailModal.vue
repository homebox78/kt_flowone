<script setup>
// Figma 4-4142 — tv앱 입고 상세 모달 (읽기 전용)
// 스타일가이드 준수: 라벨/값 폼은 DsDetailHeader / DsDetailCell 사용
import { DsModal, DsButton, DsIcon, DsDetailHeader, DsDetailCell } from '@/components/ds'

defineProps({
  modelValue: { type: Boolean, default: false },
  data: {
    type: Object,
    default: () => ({
      serviceName: '서비스명이 노C.',
      appType: '위젯',
      widgetDevType: 'Javascript',
      hdsId: '231312321',
      ageRating: '231312321',
      genre: '생활정보',
      provider: '제공사',
      maker: '제작사',
      summary: '요약 소개 노출 됩니다. 요약 소개 노출 됩니다. 요약 소개 노출 됩니다.\n요약 소개 노출 됩니다. 요약 소개 노출 됩니다. 요약 소개 노출 됩니다.\n요약 소개 노출 됩니다. 요약 소개 노출 됩니다. 요약 소개 노출 됩니다.',
      detail: '소개 상세 노출됩니다. 소개 상세 노출됩니다. 소개 상세 노출됩니다.\n소개 상세 노출됩니다. 소개 상세 노출됩니다. 소개 상세 노출됩니다.\n소개 상세 노출됩니다. 소개 상세 노출됩니다. 소개 상세 노출됩니다.\n소개 상세 노출됩니다. 소개 상세 노출됩니다. 소개 상세 노출됩니다.',
      mcpFile: 'ijdiqddjpowqd.ppt',
      portraitImg: 'Default_image.jpg',
      landscapeImg: 'Default_image.jpg',
      squareImg: 'Default_image.jpg',
      cleanLandscape: 'sdasdjpowqd.jpg',
      bgImg: '', listTitle: '', detailTitle: '',
      priceType: '무료',
      verifyEmail: 'dasdsad@fsfsd.com',
      verifyDoc: 'Qwerwe.doc',
      installPath: '입력값 노출',
      appFile: 'Qwerwe.doc',
      appVersion: '1.2',
      homepage: 'https:// abcd.com',
      aidOid: '2123',
      language: '한국어',
      players: '', keywords: '키워드 입력',
    }),
  },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <DsModal :model-value="modelValue" title="tv앱 입고 상세" :width="720" @update:model-value="$emit('update:modelValue', $event)">
    <div class="detail-form">
      <div class="df-row df-row--full"><DsDetailHeader text="서비스명" essential underline /><DsDetailCell>{{ data.serviceName }}</DsDetailCell></div>
      <div class="df-row df-row--full"><DsDetailHeader text="앱 유형" essential /><DsDetailCell>{{ data.appType }}</DsDetailCell></div>
      <div class="df-row df-row--full"><DsDetailHeader text="위젯개발 유형" essential /><DsDetailCell>{{ data.widgetDevType }}</DsDetailCell></div>
      <div class="df-row df-row--full"><DsDetailHeader text="HDS .서비스 ID" essential underline /><DsDetailCell>{{ data.hdsId }}</DsDetailCell></div>

      <div class="df-row">
        <DsDetailHeader text="이용연령 등급" essential underline /><DsDetailCell>{{ data.ageRating }}</DsDetailCell>
        <DsDetailHeader text="장르" essential underline /><DsDetailCell>{{ data.genre }}</DsDetailCell>
      </div>
      <div class="df-row">
        <DsDetailHeader text="제공사" essential underline /><DsDetailCell>{{ data.provider }}</DsDetailCell>
        <DsDetailHeader text="제작사" /><DsDetailCell>{{ data.maker }}</DsDetailCell>
      </div>

      <div class="df-row df-row--full"><DsDetailHeader text="소개 (요약)" essential underline /><DsDetailCell class="cell-top"><span class="multi">{{ data.summary }}</span></DsDetailCell></div>
      <div class="df-row df-row--full"><DsDetailHeader text="소개 (상세)" essential underline /><DsDetailCell class="cell-top"><span class="multi">{{ data.detail }}</span></DsDetailCell></div>
      <div class="df-row df-row--full"><DsDetailHeader text="MCP명" /><DsDetailCell><span class="file"><DsIcon name="line-clip" :size="14" /> {{ data.mcpFile }}</span></DsDetailCell></div>

      <!-- 이미지 -->
      <div class="df-row df-row--full">
        <DsDetailHeader text="이미지" />
        <div class="img-sub">
          <div class="detail-form sub-form">
            <div class="df-row"><DsDetailHeader text="세로형 이미지" essential underline /><DsDetailCell><span class="file"><DsIcon name="line-clip" :size="14" /> {{ data.portraitImg }}</span></DsDetailCell></div>
            <div class="df-row"><DsDetailHeader text="가로형 이미지" essential underline /><DsDetailCell><span class="file"><DsIcon name="line-clip" :size="14" /> {{ data.landscapeImg }}</span></DsDetailCell></div>
            <div class="df-row"><DsDetailHeader text="정사각형 이미지" essential underline /><DsDetailCell><span class="file"><DsIcon name="line-clip" :size="14" /> {{ data.squareImg }}</span></DsDetailCell></div>
          </div>
        </div>
      </div>
      <!-- 부가이미지 -->
      <div class="df-row df-row--full">
        <DsDetailHeader text="부가이미지" class="lbl-blue" />
        <div class="img-sub">
          <div class="detail-form sub-form">
            <div class="df-row"><DsDetailHeader text="클린가로형 이미지" /><DsDetailCell><span v-if="data.cleanLandscape" class="file"><DsIcon name="line-clip" :size="14" /> {{ data.cleanLandscape }}</span></DsDetailCell></div>
            <div class="df-row"><DsDetailHeader text="배경 이미지" /><DsDetailCell>{{ data.bgImg }}</DsDetailCell></div>
            <div class="df-row"><DsDetailHeader text="목록타이틀 이미지" /><DsDetailCell>{{ data.listTitle }}</DsDetailCell></div>
            <div class="df-row"><DsDetailHeader text="상세타이틀 이미지" /><DsDetailCell>{{ data.detailTitle }}</DsDetailCell></div>
          </div>
        </div>
      </div>

      <div class="df-row df-row--full"><DsDetailHeader text="과금유형" essential underline /><DsDetailCell>{{ data.priceType }}</DsDetailCell></div>
      <div class="df-row df-row--full"><DsDetailHeader text="검증센터 응대 연락처" essential /><DsDetailCell>{{ data.verifyEmail }}</DsDetailCell></div>
      <div class="df-row df-row--full"><DsDetailHeader text="자체 검증 결과서" essential /><DsDetailCell><span class="file"><DsIcon name="line-clip" :size="14" /> {{ data.verifyDoc }}</span></DsDetailCell></div>
      <div class="df-row df-row--full"><DsDetailHeader text="Intall path" essential underline /><DsDetailCell>{{ data.installPath }}</DsDetailCell></div>
      <div class="df-row df-row--full"><DsDetailHeader text="어플 파일" essential underline /><DsDetailCell><span class="file"><DsIcon name="line-clip" :size="14" /> {{ data.appFile }}</span></DsDetailCell></div>
      <div class="df-row df-row--full"><DsDetailHeader text="어플 버전" essential underline /><DsDetailCell>{{ data.appVersion }}</DsDetailCell></div>
      <div class="df-row df-row--full"><DsDetailHeader text="제작사 홈페이지" underline /><DsDetailCell><a v-if="data.homepage" class="link" :href="data.homepage.replace(/\s+/g, '')" target="_blank" rel="noopener noreferrer">{{ data.homepage }}</a></DsDetailCell></div>
      <div class="df-row df-row--full"><DsDetailHeader text="aid/oid" underline /><DsDetailCell>{{ data.aidOid }}</DsDetailCell></div>
      <div class="df-row df-row--full"><DsDetailHeader text="지원언어" underline /><DsDetailCell>{{ data.language }}</DsDetailCell></div>
      <div class="df-row df-row--full"><DsDetailHeader text="플레이어 수" underline /><DsDetailCell>{{ data.players }}</DsDetailCell></div>
      <div class="df-row df-row--full"><DsDetailHeader text="검색키워드" underline /><DsDetailCell>{{ data.keywords }}</DsDetailCell></div>
    </div>

    <template #footer>
      <DsButton type="primary" size="large" @click="$emit('update:modelValue', false)">확인</DsButton>
    </template>
  </DsModal>
</template>

<style scoped>
.detail-form { display: grid; grid-template-columns: 160px 1fr 160px 1fr; border-top: 1px solid var(--ds-border-gray-400); }
.df-row { display: contents; }
.df-row--full > :nth-child(2) { grid-column: 2 / 5; }

/* 이미지/부가이미지 — 라벨 셀이 하위 행을 세로 병합 */
.img-sub { grid-column: 2 / 5; border-left: 1px solid var(--ds-border-gray-200); }
.img-sub .sub-form { grid-template-columns: 160px minmax(0, 1fr); border-top: 0; }
.img-sub .sub-form .df-row > :nth-child(1) { border-left: 0; }

/* 부가이미지 라벨 blue */
.lbl-blue :deep(.ds-dh__text) { color: var(--ds-text-blue-500); }

/* 다중행 값(소개) 상단 정렬 */
.cell-top :deep(.ds-dc),
:deep(.ds-dc.cell-top) { align-items: flex-start; }
.multi { white-space: pre-line; line-height: 1.7; }
/* 제작사 홈페이지 — 실제 링크 */
.link { color: var(--ds-text-blue-500); text-decoration: underline; text-underline-offset: 2px; cursor: pointer; }
.link:hover { color: var(--ds-text-blue-700); }
/* 첨부파일 — 클립 아이콘 + 파일명 */
.file { display: inline-flex; align-items: center; gap: var(--ds-space-6); color: var(--ds-text-gray-900); }
</style>
