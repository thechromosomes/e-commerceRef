<template>
  <div class="clp_pages woman">
    <section class="slide-img">
      <div class="content">
        <img
          src="@/assets/img/woman.jpg"
          alt="img"
          class="w-100 desktop_only"
        />
        <img
          src="https://uk.diesel.com/dw/image/v2/BBLG_PRD/on/demandware.static/-/Library-Sites-DieselMFSharedLibrary/default/dwa7ecba5a/2021/FW21-Prefall-drop/diesel-pre-fall-lauch-woman-mobile.jpg?sw=640"
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

    <ProductSilder :slideImg="sneakers" />

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

    <CategorySlider :slideImg="sweaters" />

    <TowImages :slideImg="trending"/>
    <NewIn :slideImg="is_new" />

    <div class="accessories">
      <div class="accessories-content">
        <div class="left-content">
          <h4>
            BAGS & <br />
            ACCESSORIES
          </h4>
          <a href="/collections/woman-accessories-bags/"> VIEW ALL BAGS</a>
          <a href="/collections/woman-accessories-other-accessories/">
            NEW ACCESSORIES</a
          >
        </div>
        <div class="right-content">
          <div class="slide_new_in" v-if="accessories && accessories.length > 0">
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
      accessories: [],
      sneakers: [],
      sweaters: [],
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
  created() {
    this.getProductList("woman-accessories-other-accessories", "accessories");
    this.getProductList("woman-shoes-sneakers", "sneakers");
    this.getProductList("woman-apparel-sweaters", "sweaters")
    this.getProductList("woman-apparel-tshirts---tops", "trending")
  },
};
</script>

<style scoped>
@import url("@/assets/css/clp-page.css");
</style>
