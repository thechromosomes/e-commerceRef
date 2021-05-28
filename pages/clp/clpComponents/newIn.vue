<template>
  <div>
    <section class="new_in">
      <div class="container-fluid">
        <div class="content_new_in">
          <h2 class="swiper-header">NEW IN</h2>
          <div class="slide_new_in">
            <client-only>
              <VueSlickCarousel ref="slick" v-bind="settings">
                <div
                  class="item"
                  v-for="(item, index) in slideImg"
                  :key="index"
                >
                  <a href="#"
                    ><img
                      src="@/assets/img/new_slide_1.jpg"
                      alt="img"
                      class="w-100"
                  /></a>
                  <div class="tile-body">
                    <p>Light Blue</p>
                    <a href="#"> Super skinny - Slandy</a>
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
  props: ["slideImg"],
  data() {
    return {
      settings: {
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
              centerMode: false,
              centerPadding: "40px",
              slidesToShow: 2.5
            }
          },
          {
            breakpoint: 767,
            settings: {
              arrows: false,
              centerMode: false,
              centerPadding: "40px",
              slidesToShow: 1.5
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: false,
              centerPadding: "20px",
              slidesToShow: 1
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
