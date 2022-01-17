<template>
  <nuxt-link :to="`/gif/${post.id}`" :title="post.content_description">
    <div class="img-continer" :class="{ in_load }">
      <img
        :src="post.media[0].gif.url"
        :alt="post.content_description"
        @loadend="in_load = false"
      />

      <div class="favourite" @click.prevent.stop>
        <button @click="__like">
          <fa :icon="[liked ? 'fas' : 'far', 'heart']" />
        </button>
      </div>
    </div>

    <Load :post="post" v-if="in_load" />
  </nuxt-link>
</template>

<script>
// vuex
import { mapActions, mapGetters, mapMutations } from "vuex";

// components
import Load from "~/components/post/Load";

export default {
  name: "Post",
  props: ["post"],
  components: { Load },
  data: () => ({
    in_load: true,
    liked: false,
    click: false,
  }),
  computed: mapGetters(["like_list"]),
  methods: {
    ...mapActions(["make_like"]),
    __like() {
      this.click = true;
      this.liked = !this.liked;
    },
  },
  watch: {
    liked() {
      if (this.click) {
        this.make_like({ like: this.liked, id: this.post.id });
      }
    },
  },
  mounted() {
    this.$store.commit("get_old_favourite");
    if (this.like_list.indexOf(this.post.id) > -1) {
      this.liked = true;
    }
  },
};
</script>

<style scoped>
.img-continer.in_load {
  opacity: 0;
}
.img-continer {
  transform: perspective(500px);
  transition: 0.3s;
  margin-top: 10px;
  border-radius: 10px;
  overflow: hidden;

  position: relative;
}
.img-continer:hover {
  transform: perspective(500px) translateZ(100px);
  z-index: 2;
}

.img-continer img {
  object-fit: cover;
  width: 100%;
  color: #555;
}

.img-continer:hover .favourite {
  bottom: 10px;
}

.img-continer img {
  object-fit: cover;
  width: 100%;
  color: #555;
}

a {
  text-decoration: none;
  text-decoration: none;
  position: relative;
  display: block;
}

a .favourite {
  position: absolute;
  bottom: -70px;
  right: 10px;
  transition: 0.4s;
}
a .favourite button {
  border: 1px solid red;
  color: red;
  background: rgba(255, 0, 0, 0.2);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 1em;
  display: grid;
  place-items: center;
}
</style>
