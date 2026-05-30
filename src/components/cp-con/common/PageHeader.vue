<script setup>
import { DsPageHeader } from '@/components/ds'
defineProps({
  title: { type: String, required: true },
  breadcrumb: { type: Array, default: () => [] },
})
</script>

<template>
  <DsPageHeader :title="title" :breadcrumb="breadcrumb" />
</template>
