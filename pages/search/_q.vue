<template>
  <div>
    <h1 class="h1 my-3">Search for <mark v-text="q" />.</h1>

    <b-row class="border br-2">
      <b-col md="6" lg="4" xl="3" v-for="(post, ndx) in posts" :key="ndx">
        <Post :post="post" />
      </b-col>

      <Loader v-if="tenor_in_fetch" />
    </b-row>
  </div>
</template>

<script>
// components
import Loader from "~/components/Loader";
import Post from "~/components/post/index.vue";

// global options
// to access it in asyncData
const oprions_tenor = {
  limit: 10,
};

export default {
  async asyncData({ $axios, store, params }) {
    // get query string to API
    let q_string = "";
    for (var k in oprions_tenor) {
      q_string += `&${k}=${oprions_tenor[k]}`;
    }

    q_string += `&q=${params.q}`; // added search string
    // feach data
    var tenor = await $axios.$get(store.getters["tenor/SEARCH_URI"] + q_string);

    oprions_tenor.pos = tenor.next;

    // return data
    return {
      posts: tenor.results,
    };
  },

  components: {
    Loader,
    Post,
  },
  data: () => ({
    oprions_tenor,

    tenor_in_fetch: false,
  }),

  computed: {
    q() {
      return this.$route.params.q;
    },
  },

  created() {
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

      q_string += `&q=${this.q}`; // added search string
      this.$axios
        .$get(this.$store.getters["tenor/SEARCH_URI"] + q_string)
        .then((res) => {
          res.results.forEach((post) => this.posts.push(post));

          oprions_tenor.pos = res.next;
        })
        .finally(() => {
          this.tenor_in_fetch = false;
        });
    },
  },
  head() {
    return {
      title: "Search For " + this.q,
    };
  },
};
</script>
