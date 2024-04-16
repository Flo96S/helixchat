<template>
   <div class="bg-blue-800 rounded-2xl p-2 space-y-2 mr-6">
      <div class="flex items-center cursor-pointer" @click="() => {
         console.log('clicked');
         $router.push('/profile');
      }">
         <img :src="image" class="w-6 h-6 mr-2 rounded-full aspect-square object-cover" />
         <p class="text-white">{{ name }}</p>
         <p class="text-white">{{ time }}</p>
      </div>
      <div class="flex-0">
         <p class="text-white">{{ text }}</p>
      </div>
   </div>
</template>

<script lang="ts">
import type router from "@/router";
import { defineComponent } from "vue";
export default defineComponent({
   name: "MessageBubble",
   props: {
      name: {
         type: String,
         required: true,
      },
      image: {
         type: String,
         required: true,
      },
      text: {
         type: String,
         required: true,
      },
      time: {
         type: String,
         required: true
      }
   },
});
</script>


<style scoped>
/* Add any custom styles here */
</style>