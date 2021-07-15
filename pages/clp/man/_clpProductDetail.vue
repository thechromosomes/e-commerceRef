<template>
  <div class="clp_pages">
    <div class="newclp">
      <div class="clp_banner">
        <div class="img-box">
          <img
            src="@/assets/img/clp-banner-man.jpg"
            alt=" img "
            class="desktop_only w-100"
          />
          <img
            src="@/assets/img/clp-banner-man_mobile.jpg"
            alt=" img "
            class="mobile_only w-100"
          />
        </div>
        <div class="content">
          <div class="content-box">
            <h3>THE NEW DENIM COLLECTION</h3>
            <p>
              CLEAN UP YOUR ACT WITH SOPHISTICATED NEW TAKES ON OUR SIGNATURE
              DENIM.
            </p>
            <a href="#" class="secondary-white-btn">
              VIEW ALL DENIM
            </a>
          </div>
        </div>
      </div>
    </div>

    <Slideproduct :slideImg="is_new" />

    <CategorySlider :slideImg="jackets" />
    <TowImages :slideImg="trending" />

    <NewIn :slideImg="is_new" />

    <!-- NEW SNEAKERS -->
    <div class="new-sneakers">
      <h4>NEW SNEAKERS</h4>
      <div class="img-box w-100">
        <img
          src="@/assets/img/diesel-yukandnet-man.jpg"
          alt="img"
          class="w-100"
        />
      </div>
      <p>TAKE A STEP BACK WITH COLOURFUL SNEAKERS INSPIRED BY 90S STYLE.</p>
    </div>

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
import Slideproduct from "../clpComponents/Slideproduct";
import CategorySlider from "../clpComponents/categorySlider";
import TowImages from "../clpComponents/towImages";
import { mapState } from "vuex";
export default {
  components: {
    VueSlickCarousel,
    NewIn,
    CategorySlider,
    TowImages,
    Slideproduct
  },
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
  computed: {
    ...mapState(["is_new"])
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
          params: form
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
            error: "Oops there seems to be some Network issue, please try again"
          });
        }
      }
    }
  },
  created() {
    this.getProductList("man-apparel-jackets", "jackets");
    this.getProductList("man-jeans", "trending");
    this.getProductList("man-accessories-other-accessories", "accessories");
  }
};
</script>

<style scoped>
@import url("@/assets/css/clp-page.css");
</style>
