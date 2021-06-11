<template>
  <div class="clp_pages kid">
    <section class="slide-img">
      <div class="content  ">
        <img
          src="@/assets/img/kids.jpg"
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
            XMAS COLLECTION
          </h4>
          <a class="button primary-btn" href="#" role="button"
            >DISCOVER FOR BOYS</a
          >
          <a class="button primary-btn" href="#" role="button"
            >DISCOVER FOR GIRLS</a
          >
        </div>
      </div>
    </section>

    <ProductSilder :slideImg="jeans" />

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
            <h3 class="module-title"><a href="/collections/kid-jeans">WORKWEAR ATTITUDE</a></h3>
            <a class="module-link" href="/collections/kid-jeans">SHOP NOW</a>
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
            <h3 class="module-title"><a href="/collections/kid-jeans">WORKWEAR ATTITUDE</a></h3>
            <a class="module-link" href="/collections/kid-jeans">SHOP NOW</a>
          </div>
        </div>
      </div>
    </div>

    <ProductSilder :slideImg="shirts" />
    <!-- new design -->
    <div class="item-four-show" v-if="jboys.length > 0">
      <h4 class="title" style="background:#2c3e50;">JUNIOR BOYS</h4>
      <div class="item-box">
        <div class="item" v-for="(item, index) in jboys" :key="index">
          <img
            :src="item.image"
            alt=""
            class="w-100"
          />
          <div class="content">
            <h3 class="module-title"><a :href="`/product/${item.url_key}`">{{item.name}}</a></h3>
            <a class="module-link" :href="`/product/${item.url_key}`">SHOP NOW</a>
          </div>
        </div>
      </div>
    </div>
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
      Item: [1, 2, 3, 4],
      jeans:[],
      shirts: [],
      jboys:[],

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
  methods: {
    async getProductList(url, dataplaceholder) {
      try {
        let { service, store, page, count } = this.$store.state.list;

        let form = {};
        form.service = service;
        form.store = store;
        form.url_key = url;
        form.page = page;
        form.count = count;

        let response = await this.$store.dispatch("pimAjax", {
          method: "post",
          url: `/pimresponse.php`,
          params: form,
        });

        if (response) {
          this[dataplaceholder] = response.result.products;
        } else {
          throw "there is error from all product page >> no response";
        }
      } catch (error) {
        this.$globalError(`error from all product page >>>> ${error}`);
        if (error.message === "Network Error") {
          this.$store.commit("updateState", {
            error:
              "Oops there seems to be some Network issue, please try again",
          });
        }
      }
    },
  },
  created() {
    this.getProductList("kid-jeans", "jeans");
    this.getProductList("kid-apparel-shirts", "shirts");
    this.getProductList("kid-apparel-sweaters", "jboys");


  },
};
</script>

<style scoped>
@import url("@/assets/css/clp-page.css");
</style>
