<template>
  <div class="modal">
    <div class="modal-content">
      <div class="close" @click="$emit('close')">close</div>
      <h3>Reset Password</h3>
      <div v-if="!showSuccess">
        <p>Enter your email to reset your password</p>
        <form @submit.prevent>
          <input
            type="email"
            v-model.trim="email"
            placeholder="you@email.com"
          />
        </form>
        <p v-if="errorMsg !== ''" class="error">{{ errorMsg }}</p>
        <button class="button" @click="resetPassword()">Reset</button>
      </div>
      <p v-else>Success! check your email for a reset link.</p>
    </div>
  </div>
</template>

<script>
import { auth } from "@/firebase";
export default {
  data() {
    return {
      showSucces: false,
      email: "",
      errorMsg: "",
    };
  },
  methods: {
    async resetPassword() {
      this.errorMsg = "";
      try {
        await auth.sendPasswordResetEmail(this.email);
        this.showSucces = true;
      } catch (err) {
        this.errorMsg = err.message;
      }
    },
  },
};
</script>

<style></style>
