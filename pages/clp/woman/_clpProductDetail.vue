<template>
  <div class="clp_pages woman">
    <section class="slide-img">
      <div class="content">
        <img
          src="@/assets/img/2-DXD-full-bleed-desk.png"
          alt="img"
          class="w-100 desktop_only"
        />
        <img
          src="@/assets/img/2-DXD-full-bleed-mobile.jpg"
          alt="img"
          class="w-100 mobile_only"
        />
        <div class="content-text">
          <h4>DIESEL X DIESEL</h4>
          <p>A LINE-UP OF LIMITED PIECES, SELECTED FROM THE ARCHIVES.</p>
          <a class="button primary-btn" href="#" role="button">DISCOVER NOW</a>
        </div>
      </div>
    </section>

    <ProductSilder :slideImg="slideItem" />

    <div class="collections_slide">
      <div class="slide_content">
        <VueSlickCarousel ref="slick" v-bind="settings">
          <div class="item">
            <img
              src="@/assets/img/collections_slide_HP1.jpg"
              alt="img"
              class="desktop_only w-100"
            />
            <img
              src="@/assets/img/collections_slide_MP1.jpg"
              alt="img"
              class="mobile_only w-100"
            />
            <div class="img_content">
              <h4>READY-TO-WEAR</h4>
              <h5>SUMMER 2021</h5>
              <p class="module-text">
                Utility designs meet camo and cyber-punk prints.
                <br />
                The final touch: a twist of colour to welcome the new season.
              </p>
              <a class="button secondary-white-btn" href="#" role="button"
                >SHOP NEW ARRIVALS</a
              >
            </div>
          </div>
          <div class="item">
            <img
              src="@/assets/img/collections_slide_HP2.jpg"
              alt="img"
              class="desktop_only w-100"
            />
            <img
              src="@/assets/img/collections_slide_MP2.jpg"
              alt="img"
              class="mobile_only w-100"
            />
            <div class="img_content">
              <h4>READY-TO-WEAR</h4>
              <h5>SUMMER 2021</h5>
              <p class="module-text">
                Utility designs meet camo and cyber-punk prints.
                <br />
                The final touch: a twist of colour to welcome the new season.
              </p>
              <a class="button secondary-white-btn" href="#" role="button"
                >SHOP NEW ARRIVALS</a
              >
            </div>
          </div>
        </VueSlickCarousel>
      </div>
    </div>

    <CategorySlider :slideImg="slideItem" />

    <TowImages />
    <NewIn :slideImg="is_new" />
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import NewIn from "../clpComponents/newIn";
import ProductSilder from "../clpComponents/productSilder";
import CategorySlider from "../clpComponents/categorySlider";
import TowImages from "../clpComponents/towImages";
import { mapState } from "vuex";

export default {
  components: {
    VueSlickCarousel,
    NewIn,
    ProductSilder,
    CategorySlider,
    TowImages,
  },
  data() {
    return {
      slideItem: [1, 2, 3, 4, 5, 6, 7, 8],

      settings: {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
      },
      settings2: {
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
      settings3: {
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
              slidesToShow: 2.5,
            },
          },
          {
            breakpoint: 767,
            settings: {
              arrows: false,
              centerMode: false,
              centerPadding: "40px",
              slidesToShow: 1.5,
            },
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: false,
              centerPadding: "20px",
              slidesToShow: 1,
            },
          },
        ],
      },
    };
  },
  computed: {
    ...mapState(["is_new"]),
  },
};
</script>

<style scoped>
@import url("@/assets/css/clp-page.css");
</style>
