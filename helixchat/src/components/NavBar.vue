<script setup lang="ts">
import "../assets/tailwind.css";
import router from '@/router';

function ToProfile() {
   console.log("To profile");
   router.push("/profile")
}
</script>

<template>
   <div class="max-w-screen-xl bg-gradient-to-t bg-blue-800 to-slate-800 flex h-16">
      <img src="../assets/logo.webp" class="m-2" />
      <div class="flex items-center h-full">
         <span class="text-2xl font-semibold text-white">HelixChat</span>
      </div>
      <div @click="ToProfile" class="flex items-center cursor-pointer float-end mr-4 ml-auto">
         <a class="text-white icon-user text-xl"></a>
      </div>
   </div>
</template>

<style></style>
