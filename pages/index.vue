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