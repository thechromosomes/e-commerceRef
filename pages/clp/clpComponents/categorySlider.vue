<template>
  <div>
    <div class="two-banners gift-version slot-margin">
      <div class="swiper-overflow-container">
        <div class="swiper-heading-wrapper">
          <h2 class="swiper-header">SUMMER MUST-HAVE</h2>
        </div>
        <div class="swiper-overflow-gift-swiper">
          <div class="slide-item" v-if="slideImg.length > 0">
            <VueSlickCarousel ref="slick" v-bind="settings">
              <div class="item" v-for="(item, index) in slideImg" :key="index">
                <div class="img-box">
                  <Nuxt-link :to="`/product/${item.url_key}`"
                    ><img
                      :src="item.image"
                      alt="DIESEL T-SHIRTS for women"
                      class="w-100"
                  /></Nuxt-link>
                </div>
                <div class="swiper-overflow-gift-slide-title">
                  {{ item.name
                  }}<span
                    ><NuxtLink :to="`/product/${item.url_key}`"
                      >SHOP</NuxtLink
                    ></span
                  >
                </div>
              </div>
            </VueSlickCarousel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";

export default {
  components: { VueSlickCarousel },
  props: ["slideImg"],
  data() {
    return {
      settings: {
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "0px",
              slidesToShow: 3.5,
            },
          },
          {
            breakpoint: 767,
            settings: {
              arrows: false,
              centerMode: false,
              centerPadding: "0px",
              slidesToShow: 2.5,
            },
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: false,
              centerPadding: "20px",
              slidesToShow: 1.5,
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
