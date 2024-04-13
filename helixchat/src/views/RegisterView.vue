<template>
   <div class="about flex flex-col items-center justify-center bg-gray-900 text-white">
      <img src="../assets/logo.webp" class="img w-32 h-32 mb-4" />
      <h1 class="text-2xl mb-4">Register</h1>
      <div class="w-full max-w-xs">
         <div class="bg-gray-800 shadow-md rounded px-8 pt-6 pb-4 mb-4" @submit.prevent="register" novalidate>
            <div class="mb-4">
               <label for="username" class="block text-gray-200 text-sm font-bold mb-2">Username (RZ-Id)</label>
               <input id="username" v-model="username" name="username" required autocomplete="username"
                  class="w-full appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                  type="text" placeholder="Username (RZ-Id)" />
            </div>
            <div class="mb-4">
               <label for="nickname" class="block text-gray-200 text-sm font-bold mb-2">Nickname</label>
               <input id="nickname" v-model="nickname" name="nickname" required autocomplete="nickname"
                  class="w-full appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                  type="text" placeholder="Nickname" />
            </div>
            <div class="mb-4">
               <label for="fullname" class="block text-gray-200 text-sm font-bold mb-2">Fullname</label>
               <input id="fullname" v-model="fullname" name="fullname" required autocomplete="name"
                  class="w-full appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                  type="text" placeholder="Fullname" />
            </div>
            <div class="mb-4">
      <label for="password" class="block text-gray-200 text-sm font-bold mb-2">Password</label>
      <div class="relative">
        <input id="password" v-model="password" name="password" :type="showPassword ? 'text' : 'password'" required autocomplete="new-password" class="w-full appearance-none border rounded py-2 px-3 text-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Password" />
        <PasswordToggle :showPassword="showPassword"@toggle="toggleShowPassword" />
      </div>
    </div>

    <div class="mb-4">
      <label for="confirm-password" class="block text-gray-200 text-sm font-bold mb-2">Confirm Password</label>
      <div class="relative">
        <input id="password" v-model="confirmPassword" name="password" :type="showPassword ? 'text' : 'password'" required autocomplete="new-password" class="w-full appearance-none border rounded py-2 px-3 text-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Password" />
        <PasswordToggle :showPassword="showPassword" @toggle="toggleShowPassword" />
      </div>
    </div>
            <div class="mb-6">
               <label class="inline-flex items-center text-sm text-gray-200">
                  <input id="loggedin" v-model="stayLoggedIn" type="checkbox" class="form-checkbox mr-2" />
                  <span class="noselect">Stay logged in</span>
               </label>
            </div>
            <div class="flex items-center justify-center mb-4">
               <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit">
                  Register
               </button>
            </div>
            <div class="text-center">
            <button @click.prevent="goToLogin" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded..."
               type="button">Go to login</button>
         </div>
         </div>
         
      </div>
   </div>
</template>

<script lang="ts">
import PasswordToggle from '@/components/PasswordToggle.vue';
import { defineComponent } from 'vue';

export default defineComponent({
   components: {
      PasswordToggle,
   },
   data() {
      return {
         username: '',
         nickname: '',
         fullname: '',
         password: '',
         confirmPassword: '',
         showPassword: false,
         stayLoggedIn: false,
      };
   },
   methods: {
      register() {
         this.$router.replace('/');
      },
      goToLogin() {
         this.$router.replace('/login');
      },
      toggleShowPassword() {
         this.showPassword = !this.showPassword;
      },
   },
});
</script>