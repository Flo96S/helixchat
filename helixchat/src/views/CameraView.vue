
<script lang="ts">
import axios from 'axios';
import { defineComponent } from "vue";

export default defineComponent({
   name: "Camera",
   data() {
      return {
         cameraVisible: true,
         cameraActive: false,
         photoTaken: false
      }
   },
   props: {

   },
   mounted: function () {
      this.RequireCamera();
      //this.DrawImage();
   },
   methods:{
      async ConfirmPhoto(){
         //Send to server
         //get photo data
         let text: string | null = null;
         let data = document.getElementById("takenphoto") as HTMLImageElement;
         try{
            const response = await axios.post("https://www2.hs-esslingen.de/~melcher/map/chat/api/", {
               token: localStorage.getItem("token") || sessionStorage.getItem("token"),
               text:text,
               request: "postmessage",
               chatid: 0,
               photo: data.src,
            },
            {
               headers:{
                  "Content-Type": "application/json",
               },
            }
         );
            if(response.status != 200) {
               alert("Error sending image");
               return;
            }
         } catch(error) {
            alert("Error sending image");
            return;
         }
         this.ToMain();
      },
      DenyPhoto(){
         console.log("Deny");
         const img = document.getElementById('takenphoto') as HTMLInputElement;
         img.src = "";
         this.cameraVisible = true;
         this.photoTaken = false;
         this.RequireCamera();
      },
      DrawImage() {
         const canvas = document.createElement('canvas');
         const context = canvas.getContext('2d');
         const video = document.querySelector('video');
         if (video == null) return;
         canvas.width = video.videoWidth;
         canvas.height = video.videoHeight;
         if (context == null) return;
         context.drawImage(video, 0, 0, canvas.width, canvas.height);
         const img = document.getElementById('takenphoto') as HTMLInputElement;
         if(img == null) {
            alert("Error while taking an image");
            return;
         }
         img.src = canvas.toDataURL('image/png');
         this.SwitchOff();
         this.photoTaken = true;
      },
      SwitchOff() {
         const video = document.querySelector('video');
         if (video == null) return;
         video.srcObject = null;
         this.cameraActive = false;
         this.cameraVisible = false;
      },
      RequireCamera() {
         if (this.cameraActive) {
            return;
         }
         if (navigator.mediaDevices.getUserMedia) {
            this.cameraActive = true;
            navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
               var video = document.querySelector('video');
               if (video == null) return;
               video.srcObject = stream;
               video.onloadedmetadata = function (e) {
                  if (video == null) return;
                  video.play();
               };
            })
            .catch(function (error) {
               console.log("Something went wrong!");
               console.log(error);
            });
         }
      },
      HandleSendingImage(){
         console.log("");
      },
      ToMain() {
         this.SwitchOff();
         this.$router.replace("/messages");
      }
   }
});

</script>

<template>
   <div>
      <div class="h-12 bg-blue-500 items-center flex">
         <p class="text-white text-xl cursor-pointer icon-left-open" @click="() => ToMain()">Camera</p>
      </div>
      <div v-if="cameraVisible">
         <video class="rounded-xl w-11/12 object-cover bg-black mt-2 mx-auto"></video>
      </div>
      <div class="mt-2 px-2">
         <img id="takenphoto" class="rounded-xl"/>
         <p><img /></p>
      </div>

      <div v-if="photoTaken" class="absolute bottom-4 w-full">
         <div class="text-center mb-4">
            Are you sure you want to post this image?
         </div>
         <div class="flex px-4 w-full justify-between">
            <div @click="DenyPhoto" class="bg-red-700 h-20 w-20 rounded-full items-center justify-center flex icon-cancel text-4xl cursor-pointer">
         </div>
         <div @click="ConfirmPhoto" class="bg-green-700 h-20 w-20 rounded-full items-center justify-center flex icon-ok text-4xl cursor-pointer">
         </div>
         </div>
      </div>
      <div v-if="!photoTaken" class="absolute bottom-4 flex px-4 w-full justify-between">
         <div @click="DrawImage" class="bg-slate-300 h-20 mx-auto w-20 text-black rounded-full items-center justify-center flex icon-camera text-3xl cursor-pointer">
         </div>
      </div>
   </div>
</template>

<style></style>
