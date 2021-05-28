<template>
  <div class="clp_pages">
    <div class="tape-wrapper">
      <h1>DIESEL SALE PREVIEW. MEMBERS ONLY.</h1>
      <p class="tape-description">LOGIN OR REGISTER TO GET EXCLUSIVE ACCESS.</p>
      <a class="tape-button" href="#">LOG IN</a>
      <a class="tape-button" href="#">SUBSCRIBE NOW</a>
    </div>

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

    <div class="two-banners gift-version slot-margin">
      <div class="swiper-overflow-container">
        <div class="swiper-heading-wrapper">
          <h2 class="swiper-header">SUMMER MUST-HAVE</h2>
        </div>
        <div class="swiper-overflow-gift-swiper">
          <div class="slide-item">
            <VueSlickCarousel ref="slick" v-bind="settings2">
              <div class="item" v-for="(item, index) in slideItem" :key="index">
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

    <div class="two-banners-section slot-margin ">
      <h2 class="category-heading text-center">TRENDING NOW</h2>
      <div class="category-box">
        <div class="category-item">
          <a href="#">
            <img
              alt="Shop Now on Diesel.com"
              class="category-image w-100"
              src="https://global.diesel.com/on/demandware.static/-/Library-Sites-DieselMFSharedLibrary/default/dw034a8655/2021/ss21-dropsummer/diesel-ss21-summer-trendingnow-twoslots-male-workwear.jpg"
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
              src="https://global.diesel.com/on/demandware.static/-/Library-Sites-DieselMFSharedLibrary/default/dw034a8655/2021/ss21-dropsummer/diesel-ss21-summer-trendingnow-twoslots-male-workwear.jpg"
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

    <section class="new_in">
      <div class="container-fluid">
        <div class="content_new_in">
          <h2 class="swiper-header">NEW IN</h2>
          <div class="slide_new_in">
            <client-only>
              <VueSlickCarousel ref="slick" v-bind="settings3">
                <div
                  class="item"
                  v-for="(item, index) in slideItem"
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
        autoplaySpeed: 2000
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
        arrows: false,
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
