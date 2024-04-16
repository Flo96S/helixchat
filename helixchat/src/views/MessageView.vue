<template>
   <div class="flex flex-col h-screen">
      <nav class="bg-blue-800 text-white p-4 flex flex-col">
         <button @click="goBack" class="text-white hover:underline">
            <img src="../assets/arrowback.svg" />
            Chat 1
         </button>
      </nav>
      <div class="flex-grow overflow-auto p-4">
         <div class="space-y-4">
            <MessageTimeDate date="13.04.2024" />
            <MessageBubble name="Florian"
               image="https://www.nylabone.com/-/media/project/oneweb/nylabone/images/dog101/activities-fun/10-great-small-dog-breeds/maltese-portrait.jpg"
               text="Hello how are you? I just wanted to reach out to you to see if everything is fine." />
            <MessageBubbleOthers name="Tim" text="Hey!" time="12:10"
               image="https://www.hartz.com/wp-content/uploads/2022/04/small-dog-owners-1.jpg" />
            <MessageTimeDate date="14.04.2024" />
            <MessageBubbleOthers name="Nina" time="13:50"
               text="All good! How are you? I just wanted to reach out to you to see if everything is fine."
               image="https://www.hartz.com/wp-content/uploads/2022/04/small-dog-owners-1.jpg" />
            <MessageBubbleOthers name="Nina" time="18:12"
               text="All good! How are you? I just wanted to reach out to you to see if everything is fine."
               image="https://www.hartz.com/wp-content/uploads/2022/04/small-dog-owners-1.jpg" />
         </div>
      </div>
   </div>
</template>


<script lang="ts">

import { defineComponent } from 'vue';
import MessageBubble from '@/components/MessageBubble.vue';
import MessageBubbleOthers from '@/components/MessageBubbleOthers.vue';
import MessageTimeDate from '@/components/MessageTimeDate.vue';


export default defineComponent({
   methods: {
      goBack() {
         this.$router.replace("/");
      },
   },
   components: {
      MessageBubble,
      MessageBubbleOthers,
      MessageTimeDate,
   },
});
</script>


<style>
/* Add any custom styles here */
</style>