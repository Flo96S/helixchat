<script setup lang="ts">
let cameraActive = false;
function GetVideoStream() {
   navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480 },
      audio: false
   })
      .then(stream => {
      });
}

function DrawImage() {
   const canvas = document.createElement('canvas');
   const context = canvas.getContext('2d');
   const video = document.querySelector('video');
   if (video == null) return;
   canvas.width = video.videoWidth;
   canvas.height = video.videoHeight;
   if (context == null) return;
   context.drawImage(video, 0, 0, canvas.width, canvas.height);
   const img = document.createElement('img');
   img.src = canvas.toDataURL('image/png');
   img.classList.add('image');
   document.body.appendChild(img);
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
         .catch(function (err0r) {
            console.log("Something went wrong!");
         });
   }
}
</script>

<template>
   <div class="about">
      <h1>This is the camera</h1>
      <video></video>
      <button @click="RequireCamera">Open camera</button>
      <button @click="DrawImage">Make image</button>
      <button @click="SwitchOff">Close Camera</button>
   </div>
</template>

<style>
.image {
   width: 100%;
   height: auto;
}

video {
   width: 100%;
   height: auto;
}

@media (min-width: 1024px) {
   .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
   }
}
</style>
