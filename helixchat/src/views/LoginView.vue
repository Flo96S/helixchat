<script setup lang="ts">
import router from '@/router';

function Login() {
   //Login logic
   console.log('Login');
   localStorage.setItem('token', '1234');
   router.replace("/");
}
</script>

<template>
   <div class="about">
      <img src="../assets/logo.webp" class="img" />
      <h1>Login</h1>
      <input type="text" placeholder="Username - RZ-Id"></input>
      <input type="password" placeholder="Password"></input>
      <div class="checkbox">
         <input id="loggedin" type="checkbox"></input>
         <label class="noselect" for="loggedin">Stay loggedin</label>
      </div>
      <div class="buttons">
         <button @click="() => {
            Login();
         }">Login</button>
         <br /><br />
         <button @click="() => {
            $router.replace('/register');
         }">To register</button>
      </div>
   </div>
</template>

<style></style>
