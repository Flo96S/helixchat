<template>
   <div class="bg-slate-800 rounded-2xl p-3 space-y-2 ml-6">
      <p class="text-white">{{ text }}</p>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
   name: "MessageBubble",
   props: {
      text: {
         type: String,
         required: true,
      },
   },
});
</script>


<style scoped>
/* Add any custom styles here */
</style>