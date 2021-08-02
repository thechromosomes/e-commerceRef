<template>
  <div class="clp_pages kid">
    <div v-html="cmsData.content"></div>

    <ProductSilder :slideImg="jeans" />
    <div v-html="cmsData.content_1"></div>

    <!-- new design -->
    <div class="item-four-show" v-if="jboys && jboys.length > 0">
      <h4 class="title" style="background: #2c3e50">JUNIOR BOYS & GIRLS</h4>
      <div class="item-box">
        <div class="item" v-for="(item, index) in jboys.slice(0, 8)" :key="index">
          <img :src="item.image" alt="" class="w-100" />
          <div class="content">
            <h3 class="module-title">
              <a :href="`/product/${item.url_key}`">{{ item.name }}</a>
            </h3>
            <a class="module-link" :href="`/product/${item.url_key}`"
              >SHOP NOW</a
            >
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
      jeans: [],
      jboys: [],
      cmsData: [],

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
  methods: {
    async getProductList(url, dataplaceholder) {
      try {
        let { service, store, page, count } = this.$store.state.list;

        let form = {};
        form.service = service;
        form.store = store;
        form.url_key = url;
        form.page = 1;
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
  async created() {
    let form = {};
    form.service = "cms_page";
    form.store = 1;
    form.url_key = "kid-clp";

    let cmsData = await this.$store.dispatch("pimAjax", {
      method: "get",
      url: `/pimresponse.php`,
      params: form,
    });
    this.cmsData = cmsData.result["kid-clp"];
    this.getProductList("klp-denim-must-have", "jeans");
    this.getProductList("kid-apparel-all-apparel", "jboys");
  },
};
</script>

<style scoped>
/* @import url("@/assets/css/clp-page.css");  */
</style>
