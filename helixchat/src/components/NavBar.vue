<script setup lang="ts">
import "../assets/tailwind.css";
</script>

<template>
   <div class="navbar">
      <a class="">Nav</a>
      <div>
         Hello
      </div>
   </div>
</template>

<style>
@media (min-width: 1024px) {
   .navbar {
      position: absolute;
      top: 0;
      left: 0;
      height: 48px;
      width: 100%;
      background-color: aqua;
   }
}
</style>
