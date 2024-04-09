<template>
  <div>
    <button @click="() => {
      console.log('Open camera');
      $router.replace('/camera');
    }">Open camera</button>
  </div>
</template>
