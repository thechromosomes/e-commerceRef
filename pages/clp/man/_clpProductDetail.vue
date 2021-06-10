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

    <CategorySlider :slideImg="jackets" />
    <TowImages :slideImg="trending" />

    <NewIn :slideImg="is_new" />

    <div class="accessories">
      <div class="accessories-content">
        <div class="left-content">
          <h4>
            BAGS & <br />
            ACCESSORIES
          </h4>
          <a href="/collections/man-accessories-bags/"> VIEW ALL BAGS</a>
          <a href="/collections/man-accessories-other-accessories/">
            NEW ACCESSORIES</a
          >
        </div>
        <div class="right-content">
          <div class="slide_new_in" v-if="accessories.length > 0">
            <client-only>
              <VueSlickCarousel ref="slick" v-bind="settings4">
                <div
                  class="item"
                  v-for="(item, index) in accessories"
                  :key="index"
                >
                  <NuxtLink :to="`/product/${item.url_key}`"
                    ><img :src="item.image" alt="img" class="w-100"
                  /></NuxtLink>
                  <div class="tile-body">
                    <p>{{ item.color }}</p>
                    <NuxtLink :to="`/product/${item.url_key}`">
                      {{ item.name }}</NuxtLink
                    >
                  </div>
                </div>
              </VueSlickCarousel>
            </client-only>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import NewIn from "../clpComponents/newIn";
import CategorySlider from "../clpComponents/categorySlider";
import TowImages from "../clpComponents/towImages";
import { mapState } from "vuex";
export default {
  components: { VueSlickCarousel, NewIn, CategorySlider, TowImages },
  data() {
    return {
      slideItem: [1, 2, 3, 4, 5, 6, 7, 8],
      jackets: [],
      accessories: [],
      trending: [],
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

      settings4: {
        infinite: true,
        slidesToShow: 3,
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
    this.getProductList("man-apparel-jackets", "jackets");
    this.getProductList("man-jeans", "trending");
    this.getProductList("man-accessories-other-accessories", "accessories");
  },
};
</script>

<style scoped>
@import url("@/assets/css/clp-page.css");
</style>
