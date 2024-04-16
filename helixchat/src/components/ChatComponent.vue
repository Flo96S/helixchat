<script lang="ts">
let ChatId = "0";

import { defineComponent } from "vue";
export default defineComponent({
   name: "ChatComponent",
   props: {
      ChatId: {
         type: String,
         required: true,
      },
      ChatName: {
         type: String,
         required: false,
      },
   },
});

</script>

<template>
   <div class="mx-auto mt-0 p-4 border-b border-slate-700 cursor-pointer" @click="() => {
      console.log('Chat opened');
      console.log(ChatId)
      if (ChatId === '0') { $router.push(`/camera`); return; } $router.push(`/chat/${ChatId}`);
   }">
      <p class="font-semibold text-lg">{{ ChatName }}</p>
      <a class="line-clamp-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet
         consectetur adipisicing elit. </a>
   </div>
</template>
