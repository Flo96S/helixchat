<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import NavBar from '../components/NavBar.vue'
</script>

<template>
  <div class="padding">
    <NavBar />
    <TheWelcome />
  </div>
</template>

<style>
.padding {
  position: absolute;
  left: 0;
  top: 0;
  padding: 0;
  margin: 0;
}
</style>