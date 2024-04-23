<template>
  <div class="about flex flex-col items-center justify-center bg-gray-900 text-white">
    <img src="../assets/logo.webp" class="img w-32 h-32 mb-4" />
    <h1 class="text-2xl mb-4">Login</h1>
    <div class="w-full max-w-xs">
      <div class="bg-gray-800 shadow-md rounded px-8 pt-6 pb-4 mb-4" @submit.prevent="login" novalidate>
        <div class="mb-4">
          <label for="username" class="block text-gray-200 text-sm font-bold mb-2">Username (RZ-Id)</label>
          <input id="username" type="text" placeholder="Username - RZ-Id" class="w-full appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-200 text-sm font-bold mb-2">Password</label>
          <div class="relative">
            <input id="password" :type="showPassword ? 'text' : 'password'" placeholder="Password" class="w-full appearance-none border rounded py-2 px-3 text-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
            <PasswordToggle :showPassword="showPassword" @toggle="toggleShowPassword" />
          </div>
        </div>
        <div class="mb-6">
          <label class="inline-flex items-center text-sm text-gray-200">
            <input id="loggedin" type="checkbox" class="form-checkbox mr-2" />
            <span class="noselect">Stay logged in</span>
          </label>
        </div>
        <div class="flex items-center justify-center mb-4">
          <button @click.prevent="login" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Login</button>
        </div>
        <div class="text-center">
        <button @click="goToRegister" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" type="button">Go to register</button>
      </div>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import PasswordToggle from '@/components/PasswordToggle.vue';
import router from '@/router';

// State for showing password
let showPassword = false;

// Toggle function for showing password
function toggleShowPassword() {
   console.log("asfasd");
  showPassword = !showPassword;
}

// Function to handle login
function login() {
  // Login logic here
  console.log('Logging in...');
  // Redirect to the home page after successful login
  router.replace('/');
}

// Function to navigate to the registration page
function goToRegister() {
  router.replace('/register');
}
</script>

<style scoped>
/* Add your custom styles here */
</style>
