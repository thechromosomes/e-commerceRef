<template>
  <div>
    <div class="two-banners gift-version slot-margin">
      <div class="swiper-overflow-container">
        <div class="swiper-heading-wrapper">
          <h2 class="swiper-header">SUMMER MUST-HAVE</h2>
        </div>
        <div class="swiper-overflow-gift-swiper">
          <div class="slide-item">
            <VueSlickCarousel ref="slick" v-bind="settings">
              <div class="item" v-for="(item, index) in slideImg" :key="index">
                <div class="img-box">
                  <a href="#"
                    ><img
                      src="https://global.diesel.com/on/demandware.static/-/Library-Sites-DieselMFSharedLibrary/default/dw4fc61c54/2021/ss21-dropsummer/diesel-ss21-summer-musthave-male-tshirts.jpg"
                      alt="DIESEL T-SHIRTS for Men"
                      class="w-100"
                  /></a>
                </div>
                <div class="swiper-overflow-gift-slide-title">
                  T-SHIRT<span>SHOP</span>
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
              slidesToShow: 3.5
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
  },
  created() {
    // console.log(this.$route);
  }
};
</script>

<style scoped>
@import url("@/assets/css/clp-page.css");
</style>
