import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userProfile: {},
  },
  mutations: {
    setUserProfile(state, userProfile) {
      state.userProfile = userProfile;
    },
  },
  actions: {
    async login({ dispatch }, form) {
      // sign in user
      const { user } = await fb.auth.signInWithEmailAndPassword(
        form.email,
        form.password
      );

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get();

      // set user profile in state
      commit("setUserProfile", userProfile.data());

      // change rout to dashboard
      router.push("/");
    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );

      // create user profile object in userCollections
      await fb.usersCollection.doc(user.id).set({
        name: form.name,
        username: form.username,
      });

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
  },
  modules: {},
});
