<template>
  <div class="settings flex flex-col items-center justify-center bg-gray-900 text-white">
    <nav class="bg-blue-800 text-white pl-2 py-4 flex flex-row drop-shadow-lg w-full">
         <button @click="goBack" class="text-white hover:underline px-2">
            <a class="icon-left-open"></a>
         </button>
         <a class="ml-2">Settings</a>
    </nav>
    <img src="../assets/logo.webp" class="img w-32 h-32 mb-4" />
    <h1 class="text-2xl mb-4">Settings</h1>
    <div class="w-full max-w-xs">
      <div class="bg-gray-800 shadow-md rounded px-8 pt-6 pb-4 mb-4">
        <div class="mb-4">
          <label for="username" class="block text-gray-200 text-sm font-bold mb-2">Username</label>
          <input id="username" type="text" placeholder="Username" class="w-full appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-200 text-sm font-bold mb-2">Email</label>
          <input id="email" type="email" placeholder="Email" class="w-full appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div class="bg-gray-800 p-4 rounded">
        <label for="theme">Theme</label>
        <select v-model="theme" id="theme" class="bg-gray-700 w-full mb-4">
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
        <label for="background-pattern">Background Pattern</label>
        <select v-model="backgroundPattern" id="background-pattern" class="bg-gray-700 w-full mb-4">
          <option value="none">None</option>
          <option value="pattern1">Pattern 1</option>
          <option value="pattern2">Pattern 2</option>
          <option value="pattern3">Pattern 3</option>
        </select>
        <label for="chat-bubble-color">Chat Bubble Color Theme</label>
        <select v-model="chatBubbleColor" id="chat-bubble-color" class="bg-gray-700 w-full mb-4">
          <option value="blue">Blue</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
        </select>
     </div>
        <div class="mb-4">
          <label for="font-size" class="block text-gray-200 text-sm font-bold mb-2">Font Size</label>
          <select id="font-size" class="w-full appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div class="flex items-center justify-center mb-4">
          <button @click.prevent="saveSettings" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Save</button>
        </div>
        <div class="flex items-center justify-center mb-4">
          <button @click.prevent="logout" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Logout</button>
          <button @click.prevent="deleteAccount" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4" type="button">Delete Account</button>
        </div>
      </div>
    </div>
    <div v-if="showDeleteConfirmation" class="bg-gray-800 shadow-md rounded px-8 pt-6 pb-4 mb-4 fixed bottom-0 left-0 right-0">
      <div class="mb-4">
        <p class="text-white text-lg">Are you sure you want to delete your account? This action cannot be undone.</p>
      </div>
      <div class="flex items-center justify-center mb-4"><button @click.prevent="cancelDeleteAccount" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Cancel</button>
        <button @click.prevent="confirmDeleteAccount" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4" type="button">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import axios from 'axios';
import { ref } from 'vue';

interface SettingsFormData {
  username: string;
  email: string;
  theme: string;
  backgroundPattern: string;
  chatBubbleColor: string;
}

const username = ref('');
const email = ref('');
const theme = ref('dark');
const backgroundPattern = ref('none');
const chatBubbleColor = ref('blue');
const showDeleteConfirmation = ref(false);

const saveSettings = async () => {
  const formData: SettingsFormData = {
    username: username.value,
    email: email.value,
    theme: theme.value,
    backgroundPattern: backgroundPattern.value,
    chatBubbleColor: chatBubbleColor.value
  };

  // Implement your save settings logic here
};

const logout = async () => {
  let token = localStorage.getItem('token');
  if(!token)
  {
    token = sessionStorage.getItem('token');
  }
  if (token) {
    try {
      const endpoint = "https://www2.hs-esslingen.de/~melcher/map/chat/api/";
      const response = await axios.get(endpoint, {
        params: {
          request: "logout",
          token: token,
        },
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      });

      if (response.data) {
        sessionStorage.removeItem('token');
        localStorage.removeItem('token');
        sessionStorage.removeItem('hash');
        localStorage.removeItem('hash');
        router.push('/login');
      } else {
        console.error('Logout failed:', response.data.message);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  } else {
    console.error('No token found. User may not be logged in.');
  }
};

const deregister = async () => {
  let token = localStorage.getItem('token');
  if(!token)
  {
    token = sessionStorage.getItem('token');
  }
  if (token) {
    try {
      const endpoint = "https://www2.hs-esslingen.de/~melcher/map/chat/api/";
      const response = await axios.get(endpoint, {
        params: {
          request: "deregister",
          token: token,
        },
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      });

      if (response.data) {
        sessionStorage.removeItem('token');
        localStorage.removeItem('token');
        sessionStorage.removeItem('hash');
        localStorage.removeItem('hash');
        router.push('/login');
      } else {
        console.error('Deregistration failed:', response.data.message);
      }
    } catch (error) {
      console.error('Deregistration error:', error);
    }
  } else {
    console.error('No token found. User may not be logged in.');
  }
};
const goBack = () =>{
  router.replace("/");
};

const deleteAccount = () => {
  showDeleteConfirmation.value = true;
};

const cancelDeleteAccount = () => {
  showDeleteConfirmation.value = false;
};

const confirmDeleteAccount = async () => {
  showDeleteConfirmation.value = false;
  deregister();
};
</script>