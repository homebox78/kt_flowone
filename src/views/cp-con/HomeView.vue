<script setup>
import { ref } from 'vue'
import AgGridWrapper from '@/components/common/AgGridWrapper.vue'

const columnDefs = [
  { field: 'id', headerName: 'ID', width: 100, suppressSizeToFit: true },
  { field: 'title', headerName: '제목', width: 400 },
  { field: 'status', headerName: '상태', width: 140 },
]

const rowData = ref([
  { id: 1, title: '샘플 신작 A', status: '검수중' },
  { id: 2, title: '샘플 신작 B', status: '승인' },
  { id: 3, title: '샘플 신작 C', status: '반려' },
])
</script>

<template>
  <h2 class="text-h5 mb-4">대시보드</h2>
  <AgGridWrapper
    :column-defs="columnDefs" :row-data="rowData"
    :pagination="false"
    :height="`${40 + rowData.length * 44 + 2}px`"
    :header-height="40" :row-height="44"
    @grid-ready="(p) => p.api.sizeColumnsToFit()"
    @first-data-rendered="(p) => p.api.sizeColumnsToFit()"
  />
</template>
