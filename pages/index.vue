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

export default {
  methods: {
    ...mapActions(["login"]),
    async PageLogin() {
      const email = this.$refs.email.value;
      const password = this.$refs.password.value;
      console.log("email, password: ", email, password);
      try {
        console.log("Signing in user with email: " + email);
        const usercreds = await auth.signInWithEmailAndPassword(email, password);
        console.log("User signed in....");
        await this.login({ email })
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
