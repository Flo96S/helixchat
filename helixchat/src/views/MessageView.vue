<template>
   <div class="flex flex-col h-screen" :style="{ backgroundImage: `url(/backgrounds/${backgroundImage}.jpg)` }">
      <nav class="bg-blue-800 text-white pl-2 py-4 flex flex-row drop-shadow-lg">
         <button @click="goBack" class="text-white hover:underline px-2">
            <a class="icon-left-open"></a>
         </button>
         <a class="ml-2">Chat 1</a>
      </nav>
      <div class="flex-grow overflow-auto p-4"   
      :class="{ 'bg-cover': true, 'bg-center': true, 'bg-no-repeat': true, 'bg-fixed': true }"
      :style="{ backgroundImage: `url(/backgrounds/${backgroundImage}.jpg)` }">
         <div class="space-y-4 pb-12" ref="scroll">
            <template v-for="(message, index) in Messages" :key="index">
               <template v-if="message.userhash === UserId">
                  <MessageBubble :message="message" />
               </template>
               <template v-else>
                  <MessageBubbleOthers :message="message" />
               </template>
            </template>
            <div ref="bottomEl"></div>
         </div>
      </div>
      <InputField />
   </div>
</template>

<script lang="ts">
import InputField from '@/components/InputField.vue';
import { Message } from '@/components/Message';
import MessageBubble from '@/components/MessageBubble.vue';
import MessageBubbleOthers from '@/components/MessageBubbleOthers.vue';
import axios from 'axios';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
   setup() {
      const store = useStore();
      const backgroundImage = computed(() => store.state.backgroundImage);

      return { backgroundImage };
   },
   components: {
      MessageBubble,
      MessageBubbleOthers,
      InputField
   },
   data() {
      return {
         Messages: [] as Message[],
         UserId: localStorage.getItem("hash") || sessionStorage.getItem("hash"),
      };
   },
   computed: {
      backgroundImage(): string {
         const store = useStore();
         return store.state.backgroundImage;
      }
   },
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
            this.Messages = response.data.messages.map((message: any) => {
               return new Message(message.chatid, message.id, message.text, message.time, message.userhash, message.usernickname, message.photoid);
            });
         } catch (error) {
            console.log(error);
            console.log("Error while fetching messages");
            localStorage.removeItem("token");
            localStorage.removeItem("hash");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("hash");
            this.$router.replace("/login");
         }
      },
      goBack() {
         this.$router.replace("/");
      },
      scrollDown() {
         (this.$refs.bottomEl as HTMLDivElement).scrollIntoView({});
      }
   },
   created() {
      this.getMessages("chatId");
   },
   watch: {
      Messages() {
         this.$nextTick(() => {
            this.scrollDown();
         });
      }
   }
});
</script>
