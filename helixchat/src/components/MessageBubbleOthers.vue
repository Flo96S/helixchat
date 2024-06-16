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
         <img class="rounded-xl" v-if="imagesrc" :src="imagesrc"/>
         <p class="text-white">{{ message.text }}</p>
      </div>
   </div>
</template>

<script lang="ts">
import type router from "@/router";
import { defineComponent } from "vue";
import axios from 'axios';
import { Message } from "./Message";

let imageShow = false;
let color = 0;

export default defineComponent({
   name: "MessageBubble",
   data() {
      return {
         imagesrc: ''
      }
   },
   props: {
      message: {
         type: Message,
         required: true,
      },
   },
   mounted: function () {
      this.getPhoto();
   },
   methods: {
      getColorClass() {
         let hash = 0;
         for (let i = 0; i < this.message.userhash.length; i++) {
            hash += this.message.userhash.charCodeAt(i);
         }
         let colors = ["bg-blue-900", "bg-green-900", "bg-teal-800", "bg-lime-900", "bg-yellow-900", "bg-indigo-900", "bg-pink-900", "bg-purple-900", "bg-red-900", "bg-orange-900", "bg-cyan-900"];
         color = (hash % colors.length - 1);
         return colors[color];
      },
      async getPhoto() {
         if(this.message.imageid !== undefined) {
            //load image
            try{
               const response = await axios.get("https://www2.hs-esslingen.de/~melcher/map/chat/api/", {
                  params: {
                     request: "getphoto",
                     token: localStorage.getItem("token") || sessionStorage.getItem("token"),
                     photoid: this.message.imageid
                  },
                  responseType: 'arraybuffer'
               });
               if(response.status != 200) {
                  console.log("Error - : " + response.data.status);
                  return;
               }
               const arrbuff = response.data;
               const bytes = new Uint8Array(arrbuff);
               let binary = "";
               bytes.forEach(byte => {
                  binary += String.fromCharCode(byte);
               })
               const base64 = btoa(binary);
               let base64Img = `data:image/png;base64,${base64}`;
               this.imagesrc = base64Img;
               
            } catch(error) {
               console.log("Could not load images");
            }
         }
      },
   }
});
</script>


<style scoped>
/* Add any custom styles here */
</style>