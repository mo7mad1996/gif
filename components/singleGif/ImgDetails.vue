<template>
  <b-container>
    <table class="mb-6">
      <tbody>
        <tr v-for="key in keys" :key="key">
          <td>{{ key }}</td>
          <td>: {{ post[key] }}</td>
        </tr>
      </tbody>
    </table>
  </b-container>
</template>

<script>
export default {
  name: "ImgDetails",
  props: ["post", "img"],
  computed: {
    keys() {
      return ["content_description", "itemurl", "url", "id"];
    },
  },
};
</script>

<style scoped>
td {
  padding: 5px 10px;
}
table {
  margin: 2em 0;
}
</style>
