<template>
   <div class="bg-cyan-800 rounded-2xl p-3 space-y-2 ml-6">
      <p class="text-white">{{ message.text }}</p>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Message } from "./Message";
export default defineComponent({
   name: "MessageBubble",
   props: {
      message: {
         type: Object as () => Message,
         required: true,
      },
   },
});
</script>


<style scoped>
/* Add any custom styles here */
</style>