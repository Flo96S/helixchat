<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import router from '@/router'

function RemoveToken() {
  localStorage.removeItem('token')
  router.replace('/login');
}

function OpenCamera() {
  console.log('Opening camera')
  router.replace('/camera')
}
</script>

<template>
  <img src="../assets/logo.webp" class="img" />
  <button @click="() => RemoveToken()">Back to login</button>
  <button @click="() => OpenCamera()">Open camera</button>

</template>

<style>
.img {
  width: 50%;
  height: auto;
  margin: 0 auto;
  display: block;
  margin-bottom: 32px;
}
</style>
