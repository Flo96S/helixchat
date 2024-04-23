<template>
  <div class="about flex flex-col items-center justify-center bg-gray-900 text-white">
    <img src="../assets/logo.webp" class="img w-32 h-32 mb-4" />
    <h1 class="text-2xl mb-4">Login</h1>
    <div class="w-full max-w-xs">
      <div class="bg-gray-800 shadow-md rounded px-8 pt-6 pb-4 mb-4">
        <div class="mb-4">
          <label for="username" class="block text-gray-200 text-sm font-bold mb-2">Username (RZ-Id)</label>
          <input id="username" v-model="username" name="username" type="text" placeholder="Username - RZ-Id" class="w-full appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-200 text-sm font-bold mb-2">Password</label>
          <div class="relative">
            <input id="password" v-model="password" name="password" :type="showPassword ? 'text' : 'password'" placeholder="Password" class="w-full appearance-none border rounded py-2 px-3 text-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
            <PasswordToggle :showPassword="showPassword" @toggle="toggleShowPassword" />
          </div>
        </div>
        <div class="mb-6">
          <label class="inline-flex items-center text-sm text-gray-200">
            <input id="loggedin" type="checkbox" class="form-checkbox mr-2" v-model="stayLoggedIn" />
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
import axios from 'axios';
import { ref } from 'vue';

interface LoginFormData {
  username: string;
  password: string;
}

const username = ref('');
const password = ref('');
const showPassword = ref(false);
const stayLoggedIn = ref(false);

const loginUser = async (formData: LoginFormData) => {
  const endpoint = "https://www2.hs-esslingen.de/~melcher/map/chat/api/";
  try {
    const response = await axios.get(endpoint, {
      params: {
        request: "login",
        userid: formData.username,
        password: formData.password,
      },
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    });

    const hash = response.data.hash;
    const token = response.data.token;

    if (stayLoggedIn.value) {
      console.log("Staying logged in");
      localStorage.setItem("hash", hash);
      localStorage.setItem("token", token);
    } else {
      console.log("Not staying logged in");
      sessionStorage.setItem("hash", hash);
      sessionStorage.setItem("token", token);
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const login = async () => {
  const formData: LoginFormData = {
    username: username.value,
    password: password.value
  };

  try {
    await loginUser(formData);
    router.replace('/');
  } catch (error) {
    console.error("Login failed:", error);
  }
};
function toggleShowPassword() {
  showPassword.value = !showPassword.value;
}

function goToRegister() {
  router.replace('/register');
}
</script>
