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
        <form>
          <h1>Welcome Back</h1>
          <div>
            <label for="email1">Email</label>
            <input
              type="text"
              name="email1"
              id="email!"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label for="password1">Password</label>
            <input type="password" name="password1" id="password1" />
          </div>
          <button class="button">Log In</button>
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
export default {};
</script>

<style></style>
