<template>
  <div class="about flex flex-col items-center justify-center bg-gray-900 text-white">
    <img src="../assets/logo.webp" class="img w-1/2 mb-4 mt-4" />
    <h1 class="text-2xl mb-4">Register</h1>
    <div class="w-full max-w-xs">
      <div class="bg-gray-800 shadow-md rounded px-8 pt-6 pb-4 mb-4">
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
            <input id="password" v-model="password" name="password" :type="showPassword ? 'text' : 'password'" required
              autocomplete="new-password"
              class="w-full appearance-none border rounded py-2 px-3 text-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Password" />
            <PasswordToggle :showPassword="showPassword" @toggle="toggleShowPassword" />
          </div>
        </div>
        <div class="mb-4">
          <label for="confirm-password" class="block text-gray-200 text-sm font-bold mb-2">Confirm Password</label>
          <div class="relative">
            <input id="confirm-password" v-model="confirmPassword" name="confirm-password"
              :type="showPassword ? 'text' : 'password'" required autocomplete="new-password"
              class="w-full appearance-none border rounded py-2 px-3 text-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirm Password" />
            <PasswordToggle :showPassword="showPassword" @toggle="toggleShowPassword" />
          </div>
        </div>
        <div class="mb-6">
          <label class="inline-flex items-center text-sm text-gray-200">
            <input id="stay-logged-in" v-model="stayLoggedIn" type="checkbox" class="form-checkbox mr-2" />
            <span class="noselect">Stay logged in</span>
          </label>
        </div>
        <div class="flex items-center justify-center mb-4">
          <button @click="register"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">Register</button>
        </div>
        <div class="text-center">
          <button @click.prevent="goToLogin"
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded..." type="button">Go to
            login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import PasswordToggle from "@/components/PasswordToggle.vue";
import router from "@/router";
import axios from "axios";
import { defineComponent, ref } from "vue";

interface RegistrationFormData {
  username: string;
  nickname: string;
  fullname: string;
  password: string;
}

export default defineComponent({
  beforeMount() {
    if (localStorage.getItem("hash") && localStorage.getItem("token")) {
      router.replace('/');
    } else if (sessionStorage.getItem("hash") && sessionStorage.getItem("token")) {
      router.replace('/');
    }
  },
  name: "RegisterView",
  components: {
    PasswordToggle,
  },
  setup() {
    const username = ref("");
    const nickname = ref("");
    const fullname = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const showPassword = ref(false);
    const stayLoggedIn = ref(false);

    const registerUser = async (formData: RegistrationFormData) => {
      const endpoint = "https://www2.hs-esslingen.de/~melcher/map/chat/api/";

      try {
        const response = await axios.get(endpoint, {
          params: {
            request: "register",
            userid: formData.username,
            password: formData.password,
            nickname: formData.nickname,
            fullname: formData.fullname,
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
        router.replace("/");
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    const register = async () => {
      const formData: RegistrationFormData = {
        username: username.value,
        nickname: nickname.value,
        fullname: fullname.value,
        password: password.value
      };

      try {
        await registerUser(formData);
      } catch (error) {
        console.error("Registration failed:", error);
      }
    };

    const goToLogin = () => {
      router.replace('/login');
    };

    const toggleShowPassword = () => {
      showPassword.value = !showPassword.value;
    };

    return {
      username,
      nickname,
      fullname,
      password,
      confirmPassword,
      showPassword,
      stayLoggedIn,
      register,
      goToLogin,
      toggleShowPassword
    };
  }
});
</script>
