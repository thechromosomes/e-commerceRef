<template>
  <div>
    <div class="collections_slide">
      <div class="slide_content" v-if="bannerSlide.length > 0">
        <VueSlickCarousel v-bind="settings2">
          <template v-for="(item, index) in bannerSlide">
            <div class="item" v-if="item.banner_type === 'Banner'" :key="index">
              <img
                :src="item.desktop_image"
                alt="img"
                class="desktop_only w-100"
              />
              <img
                :src="item.mobile_image"
                alt="img"
                class="mobile_only w-100"
              />
              <div class="img_content">
                <div class="" v-html="item.description"></div>
              </div>
            </div>
          </template>
        </VueSlickCarousel>
      </div>
    </div>
    <!-- <LazyHydrate when-visible> -->
      <section
        class="new_in"
        style="min-height: 250px"
        v-if="is_new.length > 0"
      >
        <div class="container-fluid">
          <div class="content_new_in">
            <div class="row content_new_in-roww">
              <div class="col-lg-3 col-12">
                <div class="new_in_new">
                  <h2 class="swiper-header">
                    <span class="new-in-men-wo">NEW IN </span> men | women
                  </h2>
                  <Nuxt-link to="/" class="btn-shop"> shop now </Nuxt-link>
                </div>
              </div>
              <div class="col-lg-9 col-12">
                <div class="slide_new_in">
                  <VueSlickCarousel class="for-right-croual" v-bind="settings">
                    <div
                      class="item"
                      v-for="(item, index) in is_new"
                      :key="index"
                    >
                      <NuxtLink :to="`product/${item.url_key}`"
                        ><img :src="item.image" alt="img" class="w-100"
                      /></NuxtLink>
                      <div class="tile-body">
                        <p>{{ item.color }}</p>
                        <NuxtLink :to="`product/${item.url_key}`">
                          {{ item.name }}
                        </NuxtLink>
                      </div>
                    </div>
                  </VueSlickCarousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- </LazyHydrate> -->
      <LazyHydrate never>
        <span v-html="homePageData.content_1"></span>
      </LazyHydrate>
      <div class="shop_by_category" v-if="bannerSlide.length > 0">
        <div class="shop_by_category_items w-100">
          <VueSlickCarousel class="for-right-croual" v-bind="settings3">
            <template v-for="(ShopByItem, ShopByIndex) in bannerSlide">
              <div
                v-if="ShopByItem.banner_type === 'homePage_footer_banner'"
                :key="ShopByIndex"
                class="item"
              >
                <nuxt-link :to="ShopByItem.url">
                  <div class="img-box">
                    <img
                      :src="ShopByItem.desktop_image"
                      alt="img"
                      class="w-100"
                    />
                  </div>
                  <h5 v-html="ShopByItem.description"></h5>
                </nuxt-link>
              </div>
            </template>
          </VueSlickCarousel>
        </div>
      </div>
I    <!-- Start of bottom images Section -->
    <LazyHydrate never>
      <span v-html="homePageData.content_2"></span>
    </LazyHydrate>
  </div>
</template>
<script>
import VueSlickCarousel from "vue-slick-carousel";
import LazyHydrate from "vue-lazy-hydration";
import { mapState } from "vuex";
export default {
  components: { VueSlickCarousel, LazyHydrate },
  data() {
    return {
      settings: {
        infinite: true,
        slidesToShow: 3,
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
              slidesToShow: 1.5,
            },
          },
        ],
      },
      settings2: {
        focusOnSelect: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        centerMode: false,
        responsive: [
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 1,
              autoplay: true,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              autoplay: true,
              slidesToScroll: 1,
            },
          },
        ],
      },
      settings3: {
        infinite: true,
        slidesToShow: 5,
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
              slidesToShow: 1.5,
            },
          },
          {
            breakpoint: 767,
            settings: {
              arrows: false,
              slidesToShow: 1.5,
            },
          },
        ],
      },
    };
  },
  jsonld() {
    return {
      "@context": "http://schema.org",
      "@type": "Organization",
      name: "diesel india",
      image: "/icon.png",
      "@id": "",
      url: this.$store.state.BASE_URL,
      telephone: "022- 48930102",
      potentialAction: {
        "@type": "SearchAction",
        target: `${this.$store.state.BASE_URL}/searchpage/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Diesel Fashion India Reliance Pvt. Ltd, 7th Floor, Maker Towers E, Cuffe Parade",
        addressLocality: "Mumbai",
        postalCode: "400005",
        addressCountry: "IN",
      },
      sameAs: [" https://www.instagram.com/diesel/"],
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: this.description,
          name: this.description,
          content: this.description,
        },
        {
          hid: "og:title",
          content: this.title,
          property: "og:title",
        },
        {
          hid: "og:description",
          content: this.description,
          property: "og:description",
        },
        {
          hid: "og:url",
          content: this.url,
          property: "og:url",
        },
      ],
    };
  },
  computed: {
    ...mapState(["homePageData", "bannerSlide", "is_new"]),
    // render seo tags
    title() {
      if (this.homePageData.meta_title != "") {
        return this.homePageData.meta_title;
      }
      return "DIESEL ALL PRODUCT";
    },
    description() {
      if (this.homePageData.meta_description !== "") {
        return this.homePageData.meta_description;
      }
      return "DIESEL";
    },
    url() {
      return this.$store.state.BASE_URL + this.$route.fullPath;
    },
  },
};
</script>
<style>
.home-benefits-section {
  margin-bottom: 20px;
}
.home-benefits-section .benefits-section-col {
  max-width: 290px;
  margin: 0 auto;
  padding: 15px;
}
.home-benefits-section .benefits-section-div {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
}
.home-benefits-section .benefits-section-div img {
  max-width: 100%;
  width: 110px;
  margin-bottom: 20px;
}
.home-benefits-section .benefits-section-div h3 {
  font-size: 18px;
  margin: 0 0 14px 0;
  line-height: 1;
}
.home-benefits-section .benefits-section-div p {
  margin: 0 0 14px 0;
}
.home-benefits-section .view-all-link {
  font-weight: bold;
  text-decoration: underline;
}
@media (max-width: 991px) {
  .home-benefits-section .benefits-section-col {
    max-width: 290px;
    margin: 0 auto;
    padding: 35px;
  }
}
</style>