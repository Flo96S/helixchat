import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Import your Vuex store instance

const app = createApp(App)

app.use(store); // Provide Vuex store instance to the Vue app
app.use(router)

app.mount('#app')
