<template>
  <div id="dashboard">
    <transition name="fade">
      <CommentModal
        v-if="showCommentModal"
        :post="seletcedPost"
        @close="toggleCommentModal({})"
      ></CommentModal>
    </transition>
    <section>
      <div class="col1">
        <div class="profile">
          <h5>{{ userProfile.name }}</h5>
          <div class="create-post">
            <p>create a post</p>
            <form @submit.prevent>
              <textarea v-model.trim="post.content"></textarea>
              <button
                class="button"
                @click="createPost()"
                :disabled="!post.content"
              >
                post
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="col2">
        <div v-if="posts.length">
          <div v-for="post in posts" :key="post.id" class="post">
            <h5>{{ post.userName }}</h5>
            <span>{{ post.createdOn | formatDate }}</span>
            <p>{{ post.content | trimLength }}</p>
            <ul>
              <li>
                <a @click="toggleCommentModal(post)"
                  >Comments {{ post.comments }}</a
                >
              </li>
              <li>
                <a>likes {{ post.likes }}</a>
              </li>
              <li><a>View full post</a></li>
            </ul>
          </div>
        </div>
        <div v-else>
          <p class="no-results">There are currently no posts</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import CommentModal from "@/components/CommentModal";

export default {
  components: {
    CommentModal,
  },
  data() {
    return {
      post: { content: "" },
      showCommentModal: false,
      seletcedPost: {},
    };
  },
  computed: {
    ...mapState(["userProfile", "posts"]),
  },
  methods: {
    createPost() {
      this.$store.dispatch("createPost", { ...this.post });
      this.post.content = "";
    },
    toggleCommentModal(post) {
      this.showCommentModal = !this.showCommentModal;
      this.seletcedPost = post;
    },
  },
  filters: {
    formatDate(val) {
      if (!val) return "_";
      const date = val.toDate();
      return moment(date).fromNow();
    },
    trimLength(val) {
      if (val.length < 200) return val;
      return `${val.substring(0, 200)}...`;
    },
  },
  mounted() {
    console.log("post : ", this.posts);
  },
};
</script>

<style></style>
