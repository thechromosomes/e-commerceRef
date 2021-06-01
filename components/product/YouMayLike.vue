<template>
  <div>
    <div class="product-carousel-padding" v-if="likeData.length > 0">
      <div class="product-carousel-container">
        <h2 class="product-carousel-title">You may also like</h2>
      </div>
      <client-only>
        <div class="you_like_slide">
          <VueSlickCarousel v-bind="settings">
            <div class="item" v-for="(item, index) in likeData" :key="index">
              <NuxtLink :to="`/product/${item.url_key}`">
                <img :src="item.image" alt="img" class="w-100" />
                <div class="title-body">
                  <NuxtLink :to="`/product/${item.url_key}`">{{
                    item.name
                  }}</NuxtLink>
                </div>
              </NuxtLink>
            </div>
          </VueSlickCarousel>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
export default {
  components: { VueSlickCarousel },
  props: ["likeData"],
  data() {
    return {
      settings: {
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "0px",
              slidesToShow: 2.5
            }
          },
          {
            breakpoint: 767,
            settings: {
              arrows: false,
              centerMode: false,
              centerPadding: "0px",
              slidesToShow: 2.5
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: false,
              centerPadding: "20px",
              slidesToShow: 1.5
            }
          }
        ]
      }
    };
  }
};
</script>
