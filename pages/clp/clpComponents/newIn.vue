<template>
  <div>
    <section class="new_in">
      <div class="container-fluid">
        <div class="content_new_in">
          <h2 class="swiper-header">{{ header || `NEW IN` }}</h2>
          <div class="slide_new_in" v-if="slideImg && slideImg.length > 0">
            <client-only>
              <VueSlickCarousel
                class="for-right-croual"
                ref="slick_new_in"
                v-bind="settings"
              >
                <div
                  class="item"
                  v-for="(item, index) in slideImg"
                  :key="index"
                >
                  <NuxtLink :to="`/product/${item.url_key}`"
                    ><img :src="item.image" alt="img" class="w-100"
                  /></NuxtLink>
                  <div class="tile-body">
                    <p>{{ item.color }}</p>
                    <NuxtLink :to="`/product/${item.url_key}`">
                      {{ item.name }}</NuxtLink
                    >
                  </div>
                </div>
              </VueSlickCarousel>
            </client-only>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";

export default {
  components: { VueSlickCarousel },
  props: ["slideImg", "header"],
  data() {
    return {
      settings: {
        infinite: true,
        slidesToShow: this.$options.filters.renderSlideToShow(this.$device, 4),
        slidesToScroll: 1,
        dots: false,
        arrows: this.$options.filters.renderArrows(this.$device),
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              centerMode: false,
              centerPadding: "40px",
            },
          },
          {
            breakpoint: 767,
            settings: {
              centerMode: false,
              centerPadding: "40px",
            },
          },
          {
            breakpoint: 480,
            settings: {
              centerMode: false,
              centerPadding: "20px",
            },
          },
        ],
      },
    };
  },
  created() {
    // console.log(this.$route);
  },
};
</script>

<style scoped>
@import url("@/assets/css/clp-page.css");
</style>
