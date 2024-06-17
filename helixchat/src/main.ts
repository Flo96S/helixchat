import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Import your Vuex store instance

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')  // Ensure this points to the compiled JS file
          .then((registration) => {
              console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch((error) => {
              console.error('Service Worker registration failed:', error);
          });
  });
}


const app = createApp(App)

app.use(store); // Provide Vuex store instance to the Vue app
app.use(router)

app.mount('#app')
