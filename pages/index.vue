<template>
  <b-row>
    <b-col v-for="(post, n) in posts" :key="n" md="6" lg="4" xl="3">
      <Post :post="post" />
    </b-col>

    <Loader v-if="tenor_in_fetch" />
  </b-row>
</template>

<script>
// vuex
import { mapGetters } from "vuex";

// components
import Post from "~/components/post/index";
import Loader from "~/components/Loader";

// glopals
const oprions_tenor = {
  limit: 10,
};

export default {
  asyncData: async function ({ $axios, store }) {
    // get query string to API
    let q_string = "";
    for (var k in oprions_tenor) {
      q_string += `&${k}=${oprions_tenor[k]}`;
    }
    // get data
    const { next, results } = await $axios.$get(
      store.getters["tenor/API_URI"] + q_string
    );

    oprions_tenor.pos = next;
    return { posts: results };
  },
  data: () => ({
    giphy_in_fetch: false,
  }),
  computed: mapGetters(["sort"]),
  watch: {
    sort() {
      this.posts = Array.from(this.posts).sort((post) => +post.created);
    },
  },
  components: { Post, Loader },
  mounted() {
    // work in client side onely
    if (process.client) {
      onscroll = (e) => {
        this.scroll(document.scrollingElement.scrollTopMax, scrollY);
      };
    }
  },
  methods: {
    scroll(max, naw) {
      if (max - naw < 200) {
        // start get new data

        if (!this.tenor_in_fetch) {
          this.tenor_in_fetch = true;

          this.get_more_tenor();
        }
      }
    },
    get_more_tenor() {
      // get query string to API
      let q_string = "";
      for (var k in oprions_tenor) {
        q_string += `&${k}=${oprions_tenor[k]}`;
      }

      this.$axios
        .$get(this.$store.getters["tenor/API_URI"] + q_string)
        .then((res) => {
          res.results.forEach((post) => this.posts.push(post));

          oprions_tenor.pos = res.next;
        })
        .finally(() => {
          this.tenor_in_fetch = false;
        });
    },
  },
  head: { title: "Home" },
};
</script>
