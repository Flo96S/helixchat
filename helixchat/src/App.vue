<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import router from './router';


//Check if login token is present
const token = localStorage.getItem('token')
if (!token) {
  router.push('/login');
}
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
