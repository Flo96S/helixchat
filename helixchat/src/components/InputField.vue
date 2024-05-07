<template>
   <div class="h-9 fixed bottom-4 left-4 right-4 overscroll-y-none">
      <div class="flex h-full gap-1">
         <input placeholder="Nachricht" class="w-full h-full pl-2 rounded-xl text-black" v-model="inputText" />
         <button class="bg-blue-800 text-white icon-paper-plane w-12 rounded-xl" @click="sendMessage"></button>
      </div>
   </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({
   name: "InputField",
   data() {
      return {
         inputText: ""
      }
   },
   methods: {
      async sendMessage() {
         const url = "https://www2.hs-esslingen.de/~melcher/map/chat/api/";
         const token = localStorage.getItem("token") || sessionStorage.getItem("token");
         const chatId = 0;
         const text = this.getValue();
         if (text.length == 0) return;
         this.inputText = "";
         const response = await axios.post(url, {
            request: "postmessage",
            token,
            text
         });
         if (response.data.status !== "ok") {
            console.log("Error: " + response.data.status);
            return;
         }
         console.log(response.data);
      },
      getValue() {
         return this.inputText;
      }
   }
});
</script>

<style></style>
