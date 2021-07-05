<template>
  <div v-if="slideImg && slideImg.length >= 5">
    <div class="two-banners-section slot-margin">
      <h2 class="category-heading text-center">TRENDING NOW</h2>
      <div class="category-box">
        <div class="category-item">
          <a href="#">
            <img
              alt="Shop Now on Diesel.com"
              class="category-image w-100"
              :src="slideImg[3].image"
              title="Shop Now on Diesel.com"
            />
          </a>
          <div class="info">
            <h3 class="module-title">
              <NuxtLink
                class="module-link"
                :to="`/product/${slideImg[3].url_key}`"
              >
                {{ slideImg[3].name }}</NuxtLink
              >
            </h3>
            <NuxtLink
              class="module-link"
              :to="`/product/${slideImg[3].url_key}`"
              >SHOP NOW</NuxtLink
            >
          </div>
        </div>
        <div class="category-item">
          <a href="#">
            <img
              alt="Shop Now on Diesel.com"
              class="category-image w-100"
              :src="slideImg[4].image"
              title="Shop Now on Diesel.com"
            />
          </a>
          <div class="info">
            <h3 class="module-title">
              <NuxtLink
                class="module-link"
                :to="`/product/${slideImg[4].url_key}`"
              >
                {{ slideImg[4].name }}</NuxtLink
              >
            </h3>
            <NuxtLink
              class="module-link"
              :to="`/product/${slideImg[4].url_key}`"
              >SHOP NOW</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["slideImg"]
};
</script>

<style scoped>
@import url("@/assets/css/clp-page.css");
</style>
