<template>
   <div class="h-9 fixed bottom-4 left-4 right-4 overscroll-y-none">
      <div v-if="showsmile" class="min-h-12 w-full bg-white absolute bottom-12 p-2 rounded-xl transition-all duration-1000">
         <ul class="flex flex-wrap list-none">
            <li v-for="(item, index) in smileys" :key="index" class="py-2 m-1">
               <a class="opacity-100 p-2 text-xl select-none cursor-pointer bg-slate-50 rounded-lg" @click="clickedOnSmiley(index)">{{ item }}</a>
            </li>
         </ul>
      </div>
      <div class="flex h-full gap-1">
         <div class="text-black relative w-full" >
            <input class=" pl-2 rounded-xl w-full h-full" placeholder="Nachricht" v-model="inputText" />
            <button class="absolute right-0 h-full px-2 text-2xl" @click="toggleSmileys">&#x1f4ce;</button>
         </div>
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
         inputText: "",
         showsmile: false,
         smileys: ['😊','😂','🤣','😁','😄','😒','🫡','👍','👌','🙌','🎶','📷','💻','🐢']
      }
   },
   methods: {
      toggleSmileys() {
         this.showsmile = !this.showsmile;
      },
      clickedOnSmiley(index: number) {
         this.inputText += this.smileys[index];
      },
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
