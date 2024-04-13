<script setup lang="ts">
import type router from '@/router';
import NavBar from '../components/NavBar.vue'
</script>

<template>
  <div class="padding">
    <div>
      <button @click="() => {
        console.log('Login');
        $router.replace('/login');
      }">To Login</button>
    </div>
    <div>
      <button @click="() => {
        console.log('Register');
        $router.replace('/register');
      }">To Register</button>
    </div>
    <div>
      <button @click="() => {
        console.log('Messages');
        $router.replace('/messages');
      }">To Messages</button>
    </div>
    <div>
      <button @click="() => {
        console.log('Profile');
        $router.replace('/profile');
      }">To Profile</button>
    </div>
  </div>
</template>

<style></style>