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
      <div :class="{ 'signup-form': !showLoginForm }" class="col2">
        <form v-if="showLoginForm" @submit.prevent>
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
            <a @click="togglePasswordReset()">Forgot Password</a>
            <a @click="toggleForm()">Create an account</a>
          </div>
        </form>
        <form v-else @submit.prevent>
          <h1>Get Started</h1>
          <div>
            <label for="name">Name</label>
            <input
              type="text"
              v-model.trim="signupForm.name"
              placeholder="your name"
              id="name"
            />
          </div>
          <div>
            <label for="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              v-model.trim="signupForm.username"
            />
          </div>
          <div>
            <label for="email2">Email</label>
            <input
              type="text"
              name="email2"
              id="email2"
              v-model.trim="signupForm.email"
            />
          </div>
          <div>
            <label for="password2">Password</label>
            <input
              type="password"
              id="password2"
              v-model.trim="signupForm.password"
            />
          </div>
          <button class="button" @click="signup()">Sign Up</button>
          <div class="extras">
            <a @click="toggleForm()">Back to Log In</a>
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
      signupForm: {
        name: "",
        username: "",
        email: "",
        password: "",
      },
      showLoginForm: true,
      showPasswordReset: false,
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        ...this.loginForm,
      });
    },
    signup() {
      this.$store.dispatch("signup", {
        ...this.signupForm,
      });
    },
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset;
    },
  },
};
</script>

<style></style>
