<!--index file for project-->
<template>
    <form @submit.prevent="login">
      <label>
        Username:
        <input ref="username" type="text" />
      </label>
      <label>
        Password:
        <input ref="password" type="password" />
      </label>
      <button type="submit">Login</button>
      <textarea ref="error"></textarea>
    </form>
  </template>

<style>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
}
input {
  margin: 10px;
  border: black solid 1px;
  border-radius: 5px;
}
button {
  margin: 10px;
  border: black solid 1px;
  border-radius: 5px;
  padding: 5px;
}

</style>

<script>
import { auth } from "../plugins/firebase";

export default {
  methods: {
    async login() {
      const username = this.$refs.username.value;
      const password = this.$refs.password.value;
      try {
        console.log("Signing in user with email: " + username);
        const usercreds = await auth.signInWithEmailAndPassword(username, password);
        console.log(usercreds);
        this.$router.push("/dashboard");
      } catch (error) {
        this.$refs.error.value = error;
        console.log(error);
      }
    },
  },
};
</script>