<template>
  <div class="layout">
    <!-- NavBar -->
    <NavBar />

    <!-- main -->
    <Nuxt />
  </div>
</template>

<script>
import NavBar from "~/components/NavBar";

export default {
  components: {
    NavBar,
  },
};
</script>
