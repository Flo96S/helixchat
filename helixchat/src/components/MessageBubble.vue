<template>
   <div class="bg-cyan-800 rounded-2xl p-3 space-y-2 ml-6 relative">
      <div class="relative mb-6">
         <p class="absolute opacity-75">You</p>
         <p class="text-white absolute right-0 opacity-75">{{ message.time.toLocaleTimeString() }}</p>
      </div>
      <img class="rounded-xl" v-if="imagesrc" :src="imagesrc"/>
      <p class="text-white">{{ message.text }}</p>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from 'axios';
import { Message } from "./Message";
export default defineComponent({
   name: "MessageBubble",
   data() {
      return {
         imagesrc: ''
      }
   },
   props: {
      message: {
         type: Object as () => Message,
         required: true,
      },
   },
   mounted: function() {
      this.getPhoto();
   },
   methods: {
      async getPhoto() {
         if(this.message.imageid !== undefined) {
            //load image
            console.log("LOAD IMAGE");
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
               console.log(base64Img);
               
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