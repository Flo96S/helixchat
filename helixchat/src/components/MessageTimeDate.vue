<template>
   <div class="bg-slate-800 mx-auto w-24 p-1 rounded-2xl text-center">
      <p>{{ date }}</p>
   </div>
</template>


<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
   name: "MessageTimeDate",
   props: {
      date: {
         type: String,
         required: true,
      }
   }
});
</script>


<style>
/* Add any custom styles here */
</style>