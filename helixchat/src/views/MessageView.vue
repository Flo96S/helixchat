<template>
   <div class="flex flex-col h-screen">
      <nav class="bg-blue-800 text-white pl-2 py-4 flex flex-row">
         <button @click="goBack" class="text-white hover:underline px-2">
            <a class="icon-left-open"></a>
         </button>
         <a class="ml-2">Chat 1</a>
      </nav>
      <div class="flex-grow overflow-auto p-4">
         <div class="space-y-4">
            <MessageTimeDate date="13.04.2024" />
            <MessageBubble name="Florian"
               image="https://www.nylabone.com/-/media/project/oneweb/nylabone/images/dog101/activities-fun/10-great-small-dog-breeds/maltese-portrait.jpg"
               text="Hello how are you? I just wanted to reach out to you to see if everything is fine." />
            <MessageBubbleOthers name="Tim" text="Hey!" time="12:10"
               image="https://www.hartz.com/wp-content/uploads/2022/04/small-dog-owners-1.jpg" />
            <MessageTimeDate date="14.04.2024" />
            <MessageBubbleOthers name="Nina" time="13:50"
               text="All good! How are you? I just wanted to reach out to you to see if everything is fine."
               image="https://www.hartz.com/wp-content/uploads/2022/04/small-dog-owners-1.jpg" />
            <MessageBubbleOthers name="Nina" time="18:12"
               text="All good! How are you? I just wanted to reach out to you to see if everything is fine."
               image="https://www.hartz.com/wp-content/uploads/2022/04/small-dog-owners-1.jpg" />
         </div>
      </div>
   </div>
</template>


<script lang="ts">

import { defineComponent } from 'vue';
import MessageBubble from '@/components/MessageBubble.vue';
import MessageBubbleOthers from '@/components/MessageBubbleOthers.vue';
import MessageTimeDate from '@/components/MessageTimeDate.vue';
import axios from 'axios';


export default defineComponent({
   methods: {
      goBack() {
         this.$router.replace("/");
      },
   },
   components: {
      MessageBubble,
      MessageBubbleOthers,
      MessageTimeDate,
   },
});


let messages = GetMessages("chatId");


function GetMessages(chatId: string) {
   return;
   // Get messages from the server
   let url = "https://www2.hs-esslingen.de/~melcher/map/chat/api/"
   let token = localStorage.getItem("token") || sessionStorage.getItem("token");
   if (token == null) {
      return;
   }
   let axi = axios.create({
      baseURL: url,
      withCredentials: false,
      headers: {
         Accept: "application/json",
         'Content-Type': 'application/json',
      }
   });
   let data = axi.get("", {
      params: {
         request: "getMessages",
         token,
         chatId
      }
   });
   return data.then;
}
</script>


<style>
/* Add any custom styles here */
</style>