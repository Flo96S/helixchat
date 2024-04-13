<template>
  <button @click="togglePasswordVisibility" class="absolute inset-y-0 right-0 px-3 py-0" style="top: 50%; transform: translateY(-70%);">
    <img v-if="showPassword" src="@/assets/show-password.svg" alt="Hide Password" class="h-6 w-6 text-gray-500 hover:text-gray-700" />
    <img v-else src="@/assets/hide-password.svg" alt="Show Password" class="h-6 w-6 text-gray-500 hover:text-gray-700" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    showPassword: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.$emit('toggle');
    },
  },
});
</script>
