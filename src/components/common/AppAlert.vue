<script setup>
import { useAlert } from '@/composables/useAlert'
const { state } = useAlert()
</script>

<template>
  <v-snackbar
    v-model="state.visible"
    :color="state.type"
    location="top"
    timeout="-1"
  >
    {{ state.message }}
  </v-snackbar>
</template>
