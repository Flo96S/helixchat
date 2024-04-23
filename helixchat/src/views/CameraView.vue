<script setup lang="ts">
import router from '@/router';
let cameraActive = false;

function DrawImage() {
   const canvas = document.createElement('canvas');
   const context = canvas.getContext('2d');
   const video = document.querySelector('video');
   if (video == null) return;
   canvas.width = video.videoWidth;
   canvas.height = video.videoHeight;
   if (context == null) return;
   context.drawImage(video, 0, 0, canvas.width, canvas.height);
   const img = document.getElementById('takenphoto') as HTMLInputElement;
   img.src = canvas.toDataURL('image/png');
}

function SwitchOff() {
   const video = document.querySelector('video');
   if (video == null) return;
   video.srcObject = null;
   cameraActive = false;
}

function RequireCamera() {
   if (cameraActive) {
      return;
   }
   if (navigator.mediaDevices.getUserMedia) {
      cameraActive = true;
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
}

function ToMain() {
   console.log("To main");
   router.replace("/");
}
</script>

<template>
   <div>
      <div class="h-12 bg-blue-500">
         <p class="text-white text-xl cursor-pointer" @click="() => ToMain()">◄</p>
      </div>
      <video class="rounded-full w-2/4 aspect-square object-cover bg-black mx-auto"></video>
      <button @click="RequireCamera">Open camera</button>
      <button @click="DrawImage">Make image</button>
      <button @click="SwitchOff">Close Camera</button>
      <div>
         <img id="takenphoto" />
         <p><img /></p>
      </div>
   </div>
</template>

<style></style>
