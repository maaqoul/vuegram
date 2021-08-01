import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
import router from "../router/index";

Vue.use(Vuex);

// real time firebase connection
fb.postsCollection.orderBy("createdOn", "desc").onSnapshot((snapshot) => {
  let postArray = [];
  snapshot.forEach((doc) => {
    let post = doc.data();
    post.id = doc.id;
    postArray.push(post);
  });

  store.commit("setPosts", postArray);
});

const store = new Vuex.Store({
  state: {
    userProfile: {},
    posts: [],
  },
  mutations: {
    setUserProfile(state, userProfile) {
      state.userProfile = userProfile;
    },
    setPosts(state, posts) {
      state.posts = posts;
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
      if (router.currentRoute.path === "/login") {
        router.push("/");
      }
    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );

      // create user profile object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        username: form.username,
      });

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async logout({ commit }) {
      await fb.auth.signOut();

      //clear userProfile and redirect to /login
      commit("setUserProfile", {});
      router.push("/login");
    },
    async createPost({ state }, post) {
      await fb.postsCollection.add({
        createdOn: new Date(),
        content: post.content,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.username,
        comments: 0,
        likes: 0,
      });
    },
    async likePost(_, post) {
      const userId = fb.auth.currentUser.uid;
      const docId = `${userId}_${post.id}`;

      // check if user has liked post
      const doc = await fb.likesCollection.doc(docId).get();

      if (doc.exists) return;

      // create post in likes collection
      await fb.likesCollection.doc(docId).set({
        postId: post.id,
        userId: userId,
      });

      fb.postsCollection.doc(post.id).update({
        likes: post.likesCount + 1,
      });
    },
  },
  modules: {},
});

export default store;
