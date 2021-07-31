<template>
  <div id="login">
    <section>
      <div class="col1">
        <h1>VueGram</h1>
        <p>
          Welcome to the
          <a href="/" target="_blank">VueGram</a> sample social media web app
          powered by Vue.js and Firebase.
        </p>
      </div>
      <div class="col2">
        <form @submit.prevent>
          <h1>Welcome Back</h1>
          <div>
            <label for="email1">Email</label>
            <input
              type="text"
              name="email1"
              id="email!"
              placeholder="you@email.com"
              v-model.trim="loginForm.email"
            />
          </div>
          <div>
            <label for="password1">Password</label>
            <input
              type="password"
              name="password1"
              id="password1"
              v-model="loginForm.password"
            />
          </div>
          <button class="button" @click="login()">Log In</button>
          <div class="extras">
            <a href="#">Forgot Password</a>
            <a href="#">Create an account</a>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        email: this.loginForm.email,
        password: this.loginForm.password,
      });
    },
  },
};
</script>

<style></style>
