<template>
   <div class="bg-sky-800 rounded-2xl p-2 space-y-2 mr-6 relative" :class="[getColorClass()]">
      <div class="flex items-center cursor-pointer" @click="() => {
      console.log('clicked');
      console.log(getColorClass());
      //$router.push('/profile');
   }">
         <img class="w-6 h-6 mr-2 rounded-full aspect-square object-cover bg-slate-700"
            src="https://thumbs.dreamstime.com/b/hund-des-goldenen-apportierhunds-21668976.jpg" />
         <p class="text-white font-bold">{{ message.usernickname }}</p>
         <p class="text-white absolute right-2 flex opacity-75">{{ message.time.toLocaleTimeString() }}</p>
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

let color = 0;

export default defineComponent({
   name: "MessageBubble",
   props: {
      message: {
         type: Message,
         required: true,
      }
   },
   methods: {
      getColorClass() {
         let hash = 0;
         for (let i = 0; i < this.message.userhash.length; i++) {
            hash += this.message.userhash.charCodeAt(i);
         }
         color = (hash % 9);
         let colors = ["bg-blue-900", "bg-green-900", "bg-teal-800", "bg-lime-900", "bg-yellow-900", "bg-indigo-900", "bg-pink-900", "bg-purple-900"];
         return colors[color];
      }
   }
});
</script>


<style scoped>
/* Add any custom styles here */
</style>