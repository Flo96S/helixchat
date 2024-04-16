<script setup lang="ts">

import NavBar from '@/components/NavBar.vue'
import ChatComponent from '@/components/ChatComponent.vue'
</script>

<template>
  <div>
    <NavBar />
    <div>
      <div>
        <ChatComponent ChatName="Chat 1" ChatId="0" />
        <ChatComponent ChatName="Chat 2" ChatId="1" />
      </div>
   </div>
  </div>
</template>

<style></style>