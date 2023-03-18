<!--index file for project-->
<template>
  <form @submit.prevent="PageLogin">
    <label>
      Email:
      <input ref="email" type="text" />
    </label>
    <label>
      Password:
      <input ref="password" type="password" />
    </label>
    <button type="submit">Login</button>
    Or
    <button type="button" @click="RegisterUser">Register</button>
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
  padding: 5px;
}
button {
  margin: 10px;
  border: black solid 1px;
  border-radius: 5px;
  padding: 5px;
}

</style>

<script>
import { mapActions } from "vuex";
import { auth } from "../plugins/firebase";
import axios from "axios";

export default {
  methods: {
    ...mapActions(["login", "register"]),
    async PageLogin() {
      const email = this.$refs.email.value;
      const password = this.$refs.password.value;
      try {
        const usercreds = await auth.signInWithEmailAndPassword(email, password);
        await this.login({ email })
        this.$router.push("/dashboard");
      } catch (error) {
        this.$refs.error.value = error;
        console.log(error);
      }
    },
    async PageLogout() {
      try {
        await auth.signOut();
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    async RegisterUser() {
      const email = this.$refs.email.value;
      const password = this.$refs.password.value;
      try {
        const usercreds = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        await this.register({ email })
        let self=this;
        axios.put('/api/new', {
          email: email
        }).then(function (response) {
          self.$router.push("/dashboard");
        }).catch(function (error) {
          console.log(error);
        });
      } catch (error) {
        this.$refs.error.value = error;
        console.log(error);
      }
    },
  },
};
</script>
