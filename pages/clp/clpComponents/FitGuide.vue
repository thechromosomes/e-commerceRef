<template>
  <div class="fit_guide">
    <div class="fit_guide_items">
      <VueSlickCarousel ref="slick" v-bind="settings">
        <div class="item" v-for="(item, index) in FitGuides" :key="index">
          <img :src="item.image" alt="img" class="w-100" />
          <div class="content">
            <h3 class="title">
              {{ item.name }}
            </h3>
            <Nuxt-link :to="item.url">
              shop now
            </Nuxt-link>
          </div>
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
              slidesToShow: 2.5
            }
          },
          {
            breakpoint: 767,
            settings: {
              arrows: false,
              slidesToShow: 2
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
}
</style>
