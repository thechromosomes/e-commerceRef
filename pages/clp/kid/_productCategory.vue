<template>
  <div class="clp_pages kid">
    <section class="slide-img">
      <div class="content  ">
        <img
          src="@/assets/img/2-DXD-full-bleed-desk.png"
          alt="img"
          class="w-100 desktop_only "
        />
        <img
          src="@/assets/img/2-DXD-full-bleed-mobile.jpg"
          alt="img"
          class="w-100 mobile_only "
        />
        <div class="content-text">
          <h4>
            DIESEL X DIESEL
          </h4>
          <p>A LINE-UP OF LIMITED PIECES, SELECTED FROM THE ARCHIVES.</p>
          <a class="button primary-btn" href="#" role="button">DISCOVER NOW</a>
        </div>
      </div>
    </section>

    <ProductSilder :slideImg="slideItem" />

    <div class="two-banners-section slot-margin ">
      <h2 class="category-heading text-center">DENIM COLLECTION</h2>
      <div class="category-box">
        <div class="category-item">
          <a href="#">
            <img
              alt="Shop Now on Diesel.com"
              class="category-image w-100"
              src="https://global.diesel.com/on/demandware.static/-/Library-Sites-DieselMFSharedLibrary/default/dw47504a83/landing-kid/landing-kid-junior-boy-denim.jpg"
              title="Shop Now on Diesel.com"
            />
          </a>
          <div class="info">
            <h3 class="module-title"><a href="#">WORKWEAR ATTITUDE</a></h3>
            <a class="module-link" href="#">SHOP NOW</a>
          </div>
        </div>
        <div class="category-item">
          <a href="#">
            <img
              alt="Shop Now on Diesel.com"
              class="category-image w-100"
              src="https://global.diesel.com/on/demandware.static/-/Library-Sites-DieselMFSharedLibrary/default/dwe6cd383a/landing-kid/landing-kid-junior-girl-denim.jpg"
              title="Shop Now on Diesel.com"
            />
          </a>
          <div class="info">
            <h3 class="module-title"><a href="#">WORKWEAR ATTITUDE</a></h3>
            <a class="module-link" href="#">SHOP NOW</a>
          </div>
        </div>
      </div>
    </div>

    <ProductSilder :slideImg="slideItem" />
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import ProductSilder from "../clpComponents/productSilder";
export default {
  components: { VueSlickCarousel, ProductSilder },
  data() {
    return {
      slideItem: [1, 2, 3, 4, 5, 6, 7, 8],

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
