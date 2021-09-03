<template>
  <div class="fit_guide">
    <div class="fit_guide_items ">
      <h2 class="swiper-header">DENIM FIT GUIDE</h2>
      <VueSlickCarousel ref="slick" v-bind="settings">
        <div class="item" v-for="(item, index) in FitGuides" :key="index">
          <Nuxt-link :to="item.url">
            <img :src="item.image" alt="img" class="w-100" />
            <div class="content">
              <h3 class="title">
                {{ item.name }}
              </h3>
            </div>
          </Nuxt-link>
        </div>
      </VueSlickCarousel>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
export default {
  data() {
    return {
      settings: {
        infinite: true,
        slidesToShow: 3.5,
        slidesToScroll: 2,
        dots: false,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              arrows: false,
              slidesToShow: 2.5
            }
          },
          {
            breakpoint: 767,
            settings: {
              arrows: false,
              slidesToShow: 1.5
            }
          }
        ]
      }
    };
  },
  components: {
    VueSlickCarousel
  },
  props: ["FitGuides"]
};
</script>

<style>
.fit_guide {
  width: 100%;
  max-lines: 1330px;
  margin: 0 auto;
}
.fit_guide .fit_guide_items {
  padding: 10px 20px;
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
}
.fit_guide .fit_guide_items .item {
  position: relative;
}
.fit_guide .swiper-header {
  font-weight: 700;
  padding: 60px 0px 10px 0px !important;
  color: #212529;
  font-size: 30px;
}
.fit_guide .fit_guide_items .item .content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 10px;
}
.fit_guide .fit_guide_items .item .content h3 {
  color: #fff;
  font-weight: bold;
  font-size: 25px;
  margin: 0;
  text-transform: uppercase;
}
.fit_guide .fit_guide_items .item .content a {
  text-transform: uppercase;
  text-decoration: underline;
  color: #fff;
  font-weight: bold;
}
.fit_guide .fit_guide_items .slick-initialized .slick-slide {
  padding: 0 10px;
}
@media (max-width: 991px) {
  .fit_guide .fit_guide_items {
    padding: 10px;
  }
  .new_in .content_new_in .swiper-header {
    text-align: center;
    padding-bottom: 20px;
  }
}
@media (max-width: 767px) {
  .fit_guide .swiper-header {
    font-size: 30px;
    text-align: center !important;
    padding: 20px 0px !important;
  }
}
</style>
