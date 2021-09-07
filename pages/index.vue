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
    <section class="new_in" style="min-height: 250px" v-if="is_new.length > 0">
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
            <div class="col-lg-9 col-12 pd-0-mob">
              <div class="slide_new_in">
                <VueSlickCarousel class="for-right-croual" v-bind="settings">
                  <div
                    class="item"
                    v-for="(item, index) in is_new"
                    :key="index"
                  >
                    <div class="wish-list-icon single">
                      <span
                        class="wishlist_blank"
                        :id="$store.state.cartAjax.wishlist.group"
                        :class="renderWishList(item)"
                        @click="addRemoveWishList(item, renderWishList(item))"
                      ></span>
                    </div>
                    <NuxtLink :to="`product/${item.url_key}`">
                      <img :src="item.image" alt="img" class="w-100" />
                    </NuxtLink>
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

    <!-- Start of bottom images Section -->
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
        slidesToShow: this.$options.filters.renderSlideToShow(this.$device, 3),
        slidesToScroll: 1,
        dots: false,
        arrows: this.$options.filters.renderArrows(this.$device),
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              centerMode: false,
              centerPadding: "40px",
            },
          },
          {
            breakpoint: 767,
            settings: {
              centerMode: false,
              centerPadding: "40px",
            },
          },
          {
            breakpoint: 480,
            settings: {
              centerMode: false,
              centerPadding: "20px",
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
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              autoplay: true,
            },
          },
        ],
      },
      settings3: {
        infinite: true,
        slidesToShow: this.$options.filters.renderSlideToShow(this.$device, 5),
        slidesToScroll: 1,
        dots: false,
        arrows: this.$options.filters.renderArrows(this.$device),
        autoplay: true,
        autoplaySpeed: 2000,
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
  methods: {
    // render wish list class icon
    renderWishList(item) {
      let ProductId = item.id_product;
      let groupId = item.group_id;
      let wishList = this.$store.state.cartAjax.wishlist;

      if (Object.keys(wishList).length != 0) {
        const groupResult = wishList.group
          .split(",")
          .filter((word) => word == groupId);
        const productResult = wishList.product
          .split(",")
          .filter((word) => word == ProductId);

        if (groupResult.length > 0 && productResult.length > 0) {
          return "wishlist-active";
        } else {
          return "add";
        }
      } else {
        return "add";
      }
    },
    // add and remove to wish list
    async addRemoveWishList(item, data) {
      try {
        if (
          this.$store.state.cartAjax.customer_id == "" &&
          this.$store.state.cartAjax.customer_session == ""
        )
          return this.$router.push("/login");
        let form = {
          product_id: item.id_product,
          customer_id: this.$store.state.cartAjax.customer_id,
          customer_session: this.$store.state.cartAjax.customer_session,
          group_id: item.group_id,
        };

        if (data === "add") {
          var response = await this.$store.dispatch("cartAjax/actCartAjax", {
            method: "post",
            url: `/wishlist/add-wishlist`,
            token: this.$store.state.cartAjax.customer_token,
            params: form,
          });
        } else {
          var response = await this.$store.dispatch("cartAjax/actCartAjax", {
            method: "post",
            url: `/wishlist/remove-wishlist`,
            token: this.$store.state.cartAjax.customer_token,
            params: form,
          });
        }

        if (response.success) {
          this.$toast.open(response.message);
          this.$store.commit("cartAjax/updateWishList", {
            payload: response.data,
          });

          this.$gtm.push({
            event: [data == "add" ? "addToWishlist" : "removeFromWishlist"],
            category: item.category,
            action: "removeFromWishlist",
            ecommerce: {
              currencyCode: "INR",
              remove: {
                products: [
                  {
                    name: item.name,
                    id: item.sku,
                    price: item.selling_price,
                    category: item.category,
                    position: 1,
                  },
                ],
              },
            },
          });
        } else {
          throw "no response from api";
        }
      } catch (error) {
        this.$globalError(`error from add addRemoveWishList >>>> ${error}`);
      }
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
