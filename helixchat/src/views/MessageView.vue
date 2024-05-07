<template>
   <div class="flex flex-col h-screen">
      <nav class="bg-blue-800 text-white pl-2 py-4 flex flex-row drop-shadow-lg">
         <button @click="goBack" class="text-white hover:underline px-2">
            <a class="icon-left-open"></a>
         </button>
         <a class="ml-2">Chat 1</a>
      </nav>
      <div class="flex-grow overflow-auto p-4">
         <div class="space-y-4 pb-12">
            <template v-for="(message, index) in Messages" :key="index">
               <template v-if="message.userhash === UserId">
                  <MessageBubble :message="message" />
               </template>
               <template v-else>
                  <MessageBubbleOthers :message="message" />
               </template>
            </template>
         </div>
      </div>
      <InputField />
   </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import MessageBubble from '@/components/MessageBubble.vue';
import MessageBubbleOthers from '@/components/MessageBubbleOthers.vue';
import MessageTimeDate from '@/components/MessageTimeDate.vue';
import InputField from '@/components/InputField.vue';
import axios from 'axios';
import { Message } from '@/components/Message';


export default defineComponent({
   methods: {
      async getMessages(chatId: string) {
         try {
            const response = await axios.get("https://www2.hs-esslingen.de/~melcher/map/chat/api/", {
               params: {
                  request: "getmessages",
                  token: localStorage.getItem("token") || sessionStorage.getItem("token"),
                  chatId
               }
            });
            if (response.data.status !== "ok") {
               console.log("Error: " + response.data.status);
               return;
            }
            console.log(response.data);
            this.Messages = response.data.messages.map((message: any) => {
               return new Message(message.chatid, message.id, message.text, message.time, message.userhash, message.usernickname);
            });
         } catch (error) {
            console.log(error);
         }
      },
      goBack() {
         this.$router.replace("/");
      },
      shouldRender(index: number) {
         return true;
      },
      scrollToBottom() {
         (this.$refs.bottomElement as HTMLDivElement).scrollIntoView({ behavior: "smooth" });
      }
   },
   components: {
      MessageBubble,
      MessageBubbleOthers,
      MessageTimeDate,
      InputField
   },
   data() {
      return {
         Messages: [] as Message[],
         UserId: localStorage.getItem("hash") || sessionStorage.getItem("hash"),
      };
   },
   created() {
      this.getMessages("chatId");
   },
});

</script>


<style>
/* Add any custom styles here */
</style>