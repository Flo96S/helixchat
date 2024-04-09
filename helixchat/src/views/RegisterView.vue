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

<style>
.img {
   width: 50%;
   height: auto;
   margin: 0 auto;
   display: block;
}

.noselect {
   user-select: none;
}

.buttons {
   margin-top: 16px;
   display: flex;
   flex-direction: column;
   gap: 8px;
}

button {
   width: 100%;
   padding-block: 8px;
}

.checkbox {
   display: flex;
   flex-direction: row;
   gap: 8px;
}

input[type="text"],
input[type="password"] {
   width: 100%;
   padding: 10px;
   margin: 10px 0;
   border-radius: 5px;
   border: 1px solid #ccc;
}

@media (min-width: 1024px) {
   .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
   }
}
</style>
