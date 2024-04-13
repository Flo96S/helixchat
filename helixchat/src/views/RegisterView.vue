<template>
   <div class="about">
      <img src="../assets/logo.webp" class="img" />
      <h1>Register</h1>
      <input type="text" placeholder="Username - RZ-Id"></input>
      <input type="text" placeholder="Nickname"></input>
      <input type="text" placeholder="Fullname"></input>
      <input type="password" placeholder="Password"></input>
      <input type="password" placeholder="Password"></input>
      <div class="checkbox">
         <input id="loggedin" type="checkbox"></input>
         <label class="noselect" for="loggedin">Stay loggedin</label>
      </div>
      <div class="buttons">
         <button>Register</button>
         <br /><br />
         <button @click="() => {
            $router.replace('/login');
         }">To login</button>
      </div>
   </div>
</template>

<style></style>
