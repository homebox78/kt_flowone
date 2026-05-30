<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" class="text-center">
        <h1 class="text-h2 mb-2">404</h1>
        <p class="text-body-1 mb-6">요청하신 페이지를 찾을 수 없습니다.</p>
        <v-btn color="primary" @click="router.push('/home')">홈으로 이동</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
