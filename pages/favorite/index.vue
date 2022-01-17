<template>
  <div>
    <h3>Your Favourite Posts <fa icon="heart" class="red" />:</h3>
    <hr />

    <b-row>
      <b-col v-for="(post, n) in posts" :key="n" md="6" lg="4" xl="3">
        <Post :post="post" />
      </b-col>

      <Loader v-if="tenor_in_fetch" />
    </b-row>
  </div>
</template>

<script>
// vuex
import { mapGetters } from "vuex";

// components
import Post from "~/components/post/index";
import Loader from "~/components/Loader";

export default {
  data() {
    return {
      tenor_in_fetch: false,
      posts: [],
    };
  },
  computed: mapGetters(["sort", "like_list"]),
  mounted() {
    this.$store.commit("get_old_favourite");

    this.like_list.forEach((el) => {
      this.$axios
        .$get(this.$store.getters["tenor/API_ID"] + el)
        .then((res) => this.posts.push(res.results[0]));
    });
  },
  watch: {
    sort() {
      this.posts = Array.from(this.posts).sort((post) => +post.created);
    },
  },
  components: { Post, Loader },
};
</script>

<style>
.red {
  color: #e91d11;
}
</style>
