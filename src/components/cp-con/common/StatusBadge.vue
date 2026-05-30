<script setup>
import { DsStatusBadge } from '@/components/ds'
defineProps({ status: { type: String, required: true } })
</script>
<template><DsStatusBadge :status="status" /></template>
