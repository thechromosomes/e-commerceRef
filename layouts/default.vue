<template>
  <div>
    <div class="main-header">
      <Header />
    </div>
    <div class="main-container">
      <nuxt />
    </div>
    <div class="main-footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";

export default {
  components: { Header, Footer },
  data() {
    return {
      path: "",
    };
  },

  // watch for universal search
  watch: {
    "$store.state.list.search_input": {
      handler: function (after, before) {
        if (after == "") {
          if (this.path != "") {
            this.$router.push(this.path);
          }
          if (this.path == "/searchpage") {
            this.$router.push("/");
          }
        }
        if (before == "") {
          // this.path = this.$route.path;
          this.$store.commit("intialSearchPath", this.$route.path);
          this.$router.push(
            `/searchpage?q=${this.$store.state.list.search_input}`
          );
        } else {
          if (after != "") {
            this.$router.push({
              query: {
                ...this.$route.query,
                q: this.$store.state.list.search_input,
              },
            });
          }
        }
      },
    },
  },
};
</script>

<style scoped>
.main-container {
  min-height: 750px;
}
</style>
