<template>
   <div class="bg-sky-800 rounded-2xl p-2 space-y-2 mr-6">
      <div class="flex items-center cursor-pointer" @click="() => {
         console.log('clicked');
         $router.push('/profile');
      }">
         <img class="w-6 h-6 mr-2 rounded-full aspect-square object-cover bg-slate-700"
            src="https://thumbs.dreamstime.com/b/hund-des-goldenen-apportierhunds-21668976.jpg" />
         <p class="text-white font-bold">{{ message.usernickname }}</p>
         <p class="text-white">{{ message.time.getDay() }}</p>
      </div>
      <div class="flex-0">
         <p class="text-white">{{ message.text }}</p>
      </div>
   </div>
</template>

<script lang="ts">
import type router from "@/router";
import { defineComponent } from "vue";
import { Message } from "./Message";
export default defineComponent({
   name: "MessageBubble",
   props: {
      message: {
         type: Message,
         required: true,
      }
   },
});
</script>


<style scoped>
/* Add any custom styles here */
</style>