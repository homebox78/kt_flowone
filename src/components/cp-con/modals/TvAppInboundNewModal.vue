<script setup>
// Figma 4-4245 — TV앱 신규 입고 등록 모달
// 스타일가이드 준수: 라벨/값 폼은 DsDetailHeader / DsDetailCell + Ds 입력 컴포넌트
import { ref } from 'vue'
import {
  DsModal, DsDetailHeader, DsDetailCell,
  DsTextField, DsTextarea, DsSelect, DsRadioGroup, DsFileUpload, DsButton,
} from '@/components/ds'

defineProps({
  modelValue: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue', 'submit'])

const f = ref({
  serviceName: '', appType: '위젯', widgetDev: 'Javascript',
  hdsId: '', ageRating: '선택', genre: '선택',
  provider: '', maker: '',
  summary: '', detail: '',
  mcpFile: '', portrait: { name: 'Flowone1.img(1.5MB)' }, landscape: null, square: null,
  cleanLandscape: null, bgImg: null, listTitle: null, detailTitle: null,
  priceType: '무료',
  verifyEmailLocal: '', verifyEmailDomain: '', verifyEmailSelect: '선택',
  verifyDoc: null,
  installPath: '',
  appFile: null,
  appVersion: '',
  homepage: '', aidOid: '', language: '선택', players: '', keywords: '',
})

function submit() {
  emit('submit', f.value)
  emit('update:modelValue', false)
}
</script>

<template>
  <DsModal :model-value="modelValue" title="신규 입고 등록" :width="720" @update:model-value="$emit('update:modelValue', $event)">
    <ul class="legend">
      <li>
        <span class="lg-dot">·</span>
        <span><strong class="req-c">*</strong> : 입력 필수 항목 | <span class="ul">밑줄</span> : ADI 배포 항목 | <span class="primary-color">글자색</span> : 부가 배포 항목</span>
      </li>
    </ul>

    <div class="detail-form">
      <div class="df-row df-row--full">
        <DsDetailHeader text="서비스명" essential underline />
        <DsDetailCell>
          <div class="cell-inline">
            <span class="g"><DsTextField v-model="f.serviceName" placeholder="(&lt;,&gt;,&amp;, '.&quot; 를 제외하고 입력 가능)" /></span>
            <DsButton type="neutral-outline" size="medium">중복 확인</DsButton>
          </div>
        </DsDetailCell>
      </div>
      <div class="df-row df-row--full">
        <DsDetailHeader text="앱 유형" essential />
        <DsDetailCell><DsRadioGroup v-model="f.appType" :options="['위젯','반려','웹앱','클라우드게임']" name="appType" /></DsDetailCell>
      </div>
      <div class="df-row df-row--full">
        <DsDetailHeader text="위젯개발 유형" essential />
        <DsDetailCell><DsRadioGroup v-model="f.widgetDev" :options="['Javascript','Flash']" name="widgetDev" /></DsDetailCell>
      </div>
      <div class="df-row df-row--full">
        <DsDetailHeader text="HDS .서비스 ID" essential underline />
        <DsDetailCell><DsTextField v-model="f.hdsId" placeholder="입력" /></DsDetailCell>
      </div>

      <div class="df-row">
        <DsDetailHeader text="이용연령 등급" essential underline /><DsDetailCell><DsSelect v-model="f.ageRating" :options="['선택','전체관람가','12세이상']" /></DsDetailCell>
        <DsDetailHeader text="장르" essential underline /><DsDetailCell><DsSelect v-model="f.genre" :options="['선택','생활정보','뉴스']" /></DsDetailCell>
      </div>
      <div class="df-row">
        <DsDetailHeader text="제공사" essential underline /><DsDetailCell><DsTextField v-model="f.provider" placeholder="입력" /></DsDetailCell>
        <DsDetailHeader text="제작사" /><DsDetailCell><DsTextField v-model="f.maker" placeholder="입력" /></DsDetailCell>
      </div>

      <div class="df-row df-row--full">
        <DsDetailHeader text="소개 (요약)" essential underline />
        <DsDetailCell class="cell-top"><DsTextarea v-model="f.summary" :rows="3" :maxlength="1000" show-counter placeholder="(&lt;,&gt;,&amp;, '.&quot; 를 제외하고 입력 가능)" /></DsDetailCell>
      </div>
      <div class="df-row df-row--full">
        <DsDetailHeader text="소개 (상세)" essential underline />
        <DsDetailCell class="cell-top"><DsTextarea v-model="f.detail" :rows="3" :maxlength="1000" show-counter placeholder="(&lt;,&gt;,&amp;, '.&quot; 를 제외하고 입력 가능)" /></DsDetailCell>
      </div>
      <div class="df-row df-row--full">
        <DsDetailHeader text="MCP명" />
        <DsDetailCell><DsFileUpload v-model="f.mcpFile" placeholder="ppt/pptx 파일만 등록 가능" /></DsDetailCell>
      </div>

      <!-- 이미지 -->
      <div class="df-row df-row--full">
        <DsDetailHeader text="이미지" />
        <div class="img-sub">
          <div class="detail-form sub-form">
            <div class="df-row"><DsDetailHeader text="세로형 이미지" essential underline /><DsDetailCell><DsFileUpload v-model="f.portrait" /></DsDetailCell></div>
            <div class="df-row"><DsDetailHeader text="가로형 이미지" essential underline /><DsDetailCell><DsFileUpload v-model="f.landscape" placeholder="Jpg.png.gif만 등록 가능" /></DsDetailCell></div>
            <div class="df-row"><DsDetailHeader text="정사각형 이미지" essential underline /><DsDetailCell><DsFileUpload v-model="f.square" placeholder="Jpg.png.gif만 등록 가능" /></DsDetailCell></div>
          </div>
        </div>
      </div>
      <!-- 부가이미지 -->
      <div class="df-row df-row--full">
        <DsDetailHeader text="부가이미지" class="lbl-blue" />
        <div class="img-sub">
          <div class="detail-form sub-form">
            <div class="df-row"><DsDetailHeader text="클린가로형 이미지" /><DsDetailCell><DsFileUpload v-model="f.cleanLandscape" placeholder="Jpg.png.gif만 등록 가능" /></DsDetailCell></div>
            <div class="df-row"><DsDetailHeader text="배경 이미지" /><DsDetailCell><DsFileUpload v-model="f.bgImg" placeholder="Jpg.png.gif만 등록 가능" /></DsDetailCell></div>
            <div class="df-row"><DsDetailHeader text="목록타이틀 이미지" /><DsDetailCell><DsFileUpload v-model="f.listTitle" placeholder="Jpg.png.gif만 등록 가능" /></DsDetailCell></div>
            <div class="df-row"><DsDetailHeader text="상세타이틀 이미지" /><DsDetailCell><DsFileUpload v-model="f.detailTitle" placeholder="Jpg.png.gif만 등록 가능" /></DsDetailCell></div>
          </div>
        </div>
      </div>

      <div class="df-row df-row--full">
        <DsDetailHeader text="과금유형" essential underline />
        <DsDetailCell><DsRadioGroup v-model="f.priceType" :options="['무료','유료']" name="priceType" /></DsDetailCell>
      </div>
      <div class="df-row df-row--full">
        <DsDetailHeader text="검증센터 응대 연락처" essential />
        <DsDetailCell>
          <div class="cell-inline">
            <span class="g"><DsTextField v-model="f.verifyEmailLocal" /></span>
            <span class="at">@</span>
            <span class="g"><DsTextField v-model="f.verifyEmailDomain" /></span>
            <span class="g"><DsSelect v-model="f.verifyEmailSelect" :options="['선택','naver.com','daum.net']" /></span>
          </div>
        </DsDetailCell>
      </div>
      <div class="df-row df-row--full">
        <DsDetailHeader text="자체 검증 결과서" essential />
        <DsDetailCell><DsFileUpload v-model="f.verifyDoc" placeholder="doc, docx 파일만 등록 가능" /></DsDetailCell>
      </div>
      <div class="df-row df-row--full">
        <DsDetailHeader text="Intall path" essential underline />
        <DsDetailCell class="cell-top">
          <div class="cell-col">
            <DsTextField v-model="f.installPath" placeholder="입력" />
            <p class="desc">ACAP일 경우, 어플이 구동될 때 최초로 로딩해야 할 class 파일의 위치로 app 디렉토리 밑에 App class일 경우 app.App 형태로 입력해 주세요. 웹앱의 User App일 경우, WidgetID를 입력해 주세요.</p>
          </div>
        </DsDetailCell>
      </div>
      <div class="df-row df-row--full">
        <DsDetailHeader text="어플 파일" essential underline />
        <DsDetailCell class="cell-top">
          <div class="cell-col">
            <DsFileUpload v-model="f.appFile" placeholder="파일 선택해서 첨부해주세요." />
            <p class="desc">* 어플의 바이너리 파일로 wgt or zip 형태의 파일을 최대 10Mbytes 이하까지 등록 가능<br>* 파일명에 한글/공백/예시에 있는 특수문자는 입력 불가 합니다. (예시)&lt;,&gt;,&amp;,'.&quot;<br>- 위젯,ACAP 앱유형:zip 파일<br>- 웹타입:wgt 파일</p>
          </div>
        </DsDetailCell>
      </div>
      <div class="df-row df-row--full">
        <DsDetailHeader text="어플 버전" essential underline />
        <DsDetailCell><DsTextField v-model="f.appVersion" placeholder="예시) 5.7" /></DsDetailCell>
      </div>
      <div class="df-row df-row--full">
        <DsDetailHeader text="제작사 홈페이지" underline />
        <DsDetailCell><DsTextField v-model="f.homepage" placeholder="입력" /></DsDetailCell>
      </div>
      <div class="df-row df-row--full">
        <DsDetailHeader text="aid/oid" underline />
        <DsDetailCell><DsTextField v-model="f.aidOid" placeholder="AID와 OID는 4자리입니다.(공백없이 구분자로 입력해 주세요.)" /></DsDetailCell>
      </div>
      <div class="df-row df-row--full">
        <DsDetailHeader text="지원언어" underline />
        <DsDetailCell><DsSelect v-model="f.language" :options="['선택','한국어','영어']" /></DsDetailCell>
      </div>
      <div class="df-row df-row--full">
        <DsDetailHeader text="플레이어 수" underline />
        <DsDetailCell><DsTextField v-model="f.players" placeholder="입력" /></DsDetailCell>
      </div>
      <div class="df-row df-row--full">
        <DsDetailHeader text="검색키워드" underline />
        <DsDetailCell class="cell-top"><DsTextarea v-model="f.keywords" :rows="3" :maxlength="1000" show-counter placeholder="(&lt;,&gt;,&amp;, '.&quot; 를 제외하고 입력 가능)" /></DsDetailCell>
      </div>
    </div>

    <template #footer>
      <DsButton type="primary" size="large" @click="submit">확인</DsButton>
    </template>
  </DsModal>
</template>

<style scoped>
.legend { margin: 0 0 var(--ds-space-16); padding: var(--ds-space-12) var(--ds-space-20); background: var(--ds-fill-description-bg); border-radius: var(--ds-radius-8); font-size: var(--ds-fs-body-13); color: var(--ds-text-gray-700); }
.legend li { list-style: none; display: flex; align-items: center; gap: var(--ds-space-4); }
.lg-dot { color: var(--ds-text-gray-500); }
.req-c { color: var(--ds-text-red-300); }
.legend .ul { text-decoration: underline; text-underline-offset: 2px; }
.primary-color { color: var(--ds-text-blue-500); }

.detail-form { display: grid; grid-template-columns: 160px 1fr 160px 1fr; border-top: 1px solid var(--ds-border-gray-400); }
.df-row { display: contents; }
.df-row--full > :nth-child(2) { grid-column: 2 / 5; }

.img-sub { grid-column: 2 / 5; border-left: 1px solid var(--ds-border-gray-200); }
/* minmax(0,1fr): 채워진 파일칩 등 콘텐츠가 1fr 컬럼을 밀어 넘치는 것 방지 → 입력 우측 끝 정렬 통일 */
/* 파일첨부 행: 좌측 라벨 폭을 줄여(130px) 가운데 파일 입력 폭을 넓힘. 라벨은 한 줄 유지 */
.img-sub .sub-form { grid-template-columns: 130px minmax(0, 1fr); border-top: 0; }
.img-sub .sub-form :deep(.ds-dh) { width: 130px !important; max-width: 130px; padding-left: var(--ds-space-10); padding-right: var(--ds-space-6); }
.img-sub .sub-form :deep(.ds-dh__text) { white-space: nowrap; }

.lbl-blue :deep(.ds-dh__text) { color: var(--ds-text-blue-500); }

/* 셀 내부 입력 가로 100% */
.detail-form :deep(.ds-field),
.detail-form :deep(.ds-select),
.detail-form :deep(.ds-ta-wrap),
.detail-form :deep(.ds-upload-wrap) { width: 100%; }

.cell-inline { display: flex; align-items: center; gap: var(--ds-space-8); width: 100%; }
.cell-inline .g { flex: 1 1 0; min-width: 0; }
.cell-inline .at { flex-shrink: 0; color: var(--ds-text-gray-700); }

:deep(.ds-dc.cell-top) { align-items: stretch; padding-top: var(--ds-space-12); padding-bottom: var(--ds-space-12); }
.cell-col { display: flex; flex-direction: column; gap: var(--ds-space-6); width: 100%; }
.desc { margin: 0; font-size: var(--ds-fs-body-12); color: var(--ds-text-gray-700); line-height: 1.6; }
</style>
