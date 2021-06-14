<template>
  <div class="not_found_page">
    <section class="not_found_img">
      <div class="img_box">
        <img
          src="~/assets/img/404_img_desk.jpg"
          alt="img"
          class="w-100 desktop_only "
        />
        <img
          src="~/assets/img/404_img_mobile.jpg"
          alt="img"
          class="mobile_only w-100"
        />
      </div>
      <div class="content">
        <div class="text-container-404">
          <h2 class="main-404-title">
            THE CONTENT<br />YOU ARE LOOKING FOR<br />IS NO LONGER HERE
          </h2>
          <div class="btn-block">
            <NuxtLink to="/" class="button light-btn">
              Back to Home
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- shop-latest-for -->
    <div class="shop-latest-for">
      <div class="content-asset">
        <h2 class="shop-latest-header desktop_only">SHOP THE LATEST FOR</h2>
        <div class="shop-latest-container">
          <a class="shop-latest-block" href="/clp/man">
            <img
              class="shop-latest-img w-100"
              src="~/assets/img/404-categorybanner-MAN.jpg"
            />
            <h3 class="shop-latest-title">MAN</h3>
          </a>
          <NuxtLink class="shop-latest-block" to="/clp/woman">
            <img
              class="shop-latest-img w-100"
              src="~/assets/img/404-categorybanner-WOMAN.jpg"
            />
            <h3 class="shop-latest-title">WOMAN</h3>
          </NuxtLink>
          <NuxtLink class="shop-latest-block" to="/clp/kid">
            <img
              class="shop-latest-img w-100"
              src="~/assets/img/404-categorybanner-KID.jpg"
            />
            <h3 class="shop-latest-title">KID</h3>
          </NuxtLink>
          <NuxtLink class="shop-latest-block" to="/">
            <img
              class="shop-latest-img w-100"
              src="~/assets/img/404-categorybanner-LIVING.jpg"
            />
            <h3 class="shop-latest-title">LIVING</h3>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>

  <!-- <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app> -->
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred"
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    };
  }
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
