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
      path: ""
    };
  },

  // watch for universal search
  watch: {
    "$store.state.list.search_input": {
      handler: function(after, before) {
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
                q: this.$store.state.list.search_input
              }
            });
          }
        }
      }
    }
  }
};
</script>

<style>
.main-container {
  min-height: 750px;
}
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}

.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.5s;
}
.layout-enter,
.layout-leave-to {
  opacity: 0;
}

.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}
.slide-bottom-enter,
.slide-bottom-leave-to {
  opacity: 0;
  transform: translate3d(0, 15px, 0);
}
</style>
