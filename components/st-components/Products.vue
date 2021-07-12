<template>
  <client-only>
    <div class="st-col-md-3 st-products">
      <div class="st-card">
        <div class="st-product-element-top">
          <div
            class="product-imageSlider"
            v-if="item.gallery && item.gallery.length > 0 && !isDeviceMobile"
          >
            <VueSlickCarousel v-bind="slickOptions">
              <div
                class="item"
                v-for="(image, imgIndex) in item.gallery"
                :key="imgIndex"
              >
                <Nuxt-link
                  :to="getUrl(item.url)"
                  @click.native="
                    () =>
                      $store.commit('activeSearchToggle', {
                        payload: false,
                      })
                  "
                >
                  <img :src="image.image" alt="img" class="w-100" />
                </Nuxt-link>
              </div>
            </VueSlickCarousel>
          </div>
          <div class="st-img-container">
            <div class="wish-list-icon">
              <span
                class="wishlist_blank"
                :id="$store.state.cartAjax.wishlist.group"
                :class="renderWishList(item)"
                @click.prevent="addRemoveWishList(item, renderWishList(item))"
              ></span>
            </div>
          </div>
        </div>
        <p class="st-price">
          <span class="st-main-price"
            >{{ currSymbol }}
            {{ numberWithCommas(item.discounted_price) }}</span
          >
          <span class="st-old-price" v-show="item.discount_percentage > 0"
            >{{ currSymbol }} {{ numberWithCommas(item.price) }}</span
          >
          <span
            class="st-discount_percent"
            v-show="item.discount_percentage > 0"
            >({{ item.discount_percentage }}% OFF)
          </span>
        </p>
        <div class="st-bottom-card">
          <div class="st-title-box">
            <h3 class="st-product-title">
              <span class="st-available-color">{{ item.colour }}</span>
              <NuxtLink :to="getUrl(item.url)" @click.native="
                    () =>
                      $store.commit('activeSearchToggle', {
                        payload: false,
                      })
                  ">
                <p class="st-name">{{ item.name }}</p>
              </NuxtLink>
            </h3>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import axios from "axios";
import VueSlickCarousel from "vue-slick-carousel";
global.jQuery = require("jquery");
let $ = global.jQuery;
export default {
  name: "Products",
  props: ["item"],
  components: { VueSlickCarousel },
  mounted() {
    if (this.$root.customer_id != "" && this.$root.customer_id != null) {
      this.get_wish();
    }

    this.baseUrl = `${window.location.protocol}//${window.location.host}`;
    window.$ = $;
  },
  data() {
    return {
      baseUrl: "",
      moreColors: {},
      showMoreColorsMobile: false,
      slideShow: false,
      currSymbol: "₹",
      wishlist: [],
      similarPopup: false,
      similar_Product: [],
      slickOptions: {
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
      },
    };
  },
  filters: {
    truncate: function (text, length) {
      const clamp = "...";
      length = length || 30;
      if (text.length <= length) return text;
      let tcText = text.slice(0, length - clamp.length);
      return tcText + clamp;
    },
  },
  methods: {
    add_w(id, gp) {
      if (this.$root.customer_id != "" && this.$root.customer_id != null) {
        this.$root.page_loader = true;
        var form = new FormData();
        form.append("product_id", id);
        form.append("group_id", gp);
        form.append("customer_id", this.$root.customer_id);
        form.append("customer_session", this.$root.customer_session);
        axios
          .post(this.$root.cart_api_url + `/wishlist/add-wishlist`, form)
          .then((response) => {
            this.$root.page_loader = false;
            if (response.data.success == true) {
              //this.$root.wishlist = response.data.data.product;
              this.$store.state.wishlist = response.data.data.group.split(",");
              this.$store.state.wishlist_count = response.data.data.total_row;
              //this.wishlist = true;
              this.$toast.success(response.data.message, {
                position: "top-right",
                duration: 4000,
              });
            } else {
              this.$root.page_loader = false;
              if (response.data.data.customer_session_status == false) {
                $cookies.set(
                  window.location.hostname.substring(10, 4) + "_customer",
                  "",
                  "1y"
                );
                $cookies.set(
                  window.location.hostname.substring(10, 4) + "_cus_sess",
                  "",
                  "1y"
                );
                this.$root.customer_id = "";
                this.$root.customer_session = "";
                $cookies.set(
                  window.location.hostname.substring(10, 4) + "_cart",
                  "",
                  "1y"
                );
                $cookies.set(
                  window.location.hostname.substring(10, 4) + "_ct_sess",
                  "",
                  "1y"
                );
                this.$root.cart_id = "";
                this.$root.cart_session = "";
                this.$root.cart_product = [];
              }
            }
          });
      } else {
        this.$root.login_popup = true;
      }
    },
    remove_w(id, gp) {
      this.$root.page_loader = true;
      var form = new FormData();
      form.append("product_id", id);
      form.append("group_id", gp);
      form.append("customer_id", this.$root.customer_id);
      form.append("customer_session", this.$root.customer_session);
      axios
        .post(this.$root.cart_api_url + `/wishlist/remove-wishlist`, form)
        .then((response) => {
          if (response.data.success == true) {
            this.$root.page_loader = false;
            if (response.data.data.group) {
              this.$store.state.wishlist = response.data.data.group.split(",");
              this.$store.state.wishlist_count = response.data.data.total_row;
            } else {
              this.$store.state.wishlist_count = "0";
              this.$store.state.wishlist = [];
            }
            this.$toast.success(response.data.message, {
              position: "top-right",
              duration: 4000,
            });
          } else {
            this.$root.page_loader = false;
            if (response.data.data.customer_session_status == false) {
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_customer",
                "",
                "1y"
              );
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_cus_sess",
                "",
                "1y"
              );
              this.$root.customer_id = "";
              this.$root.customer_session = "";
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_cart",
                "",
                "1y"
              );
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_ct_sess",
                "",
                "1y"
              );
              this.$root.cart_id = "";
              this.$root.cart_session = "";
              this.$root.cart_product = [];
            }
          }
        });
    },
    wishActive: function (wish) {
      try {
        return this.$store.state.cartAjax.wishlist.indexOf(wish) > -1;
      } catch (e) {
        console.error(e);
      }
    },
    setTrue: function (item) {
      if (item.gallery !== null || item.gallery !== undefined) {
        this.slideShow = true && !this.isDeviceMobile;

        try {
          $(".product_image_slide").slick(this.slickOptions);
          // eslint-disable-next-line no-empty
        } catch (e) {}
      }
    },
    setFalse: function (item) {
      if (item.gallery !== null || item.gallery !== undefined) {
        this.slideShow = false && !this.isDeviceMobile;
        $(".product_image_slide").slick("unslick");
      }
    },
    imageModifier: function (img) {
      if (img) {
        return img;
      } else {
        return "http://via.placeholder.com/400x530";
      }
    },
    getUrl: function (url) {
      if (url === null || url === undefined) return "";
      else return `/product/${url}`;
    },
    getColorName: function (color) {
      if (color)
        return (
          color.substr(0, 1).toLocaleLowerCase() + color.substr(1, color.length)
        );
      else return "white";
    },
    reDirectToProductPage: function (item_url) {
      window.location.href = item_url;
    },
    numberWithCommas: function (x) {
      if (x)
        return x
          .toFixed(0)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      else return 0;
    },
    stopPropagation(event) {
      event.stopPropagation();
    },

    // render wish list class icon
    renderWishList(item) {
      let ProductId = item.id;
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
    async addRemoveWishList(item, data, index) {
      try {
        if (
          this.$store.state.cartAjax.customer_id == "" &&
          this.$store.state.cartAjax.customer_session == ""
        )
          return this.$router.push("/login");
        let form = {
          product_id: item.id,
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

          // this.$gtm.push({
          //   event: [data == "add" ? "addToWishlist" : "removeFromWishlist"],
          //   category: item.category,
          //   action: "removeFromWishlist",
          //   ecommerce: {
          //     currencyCode: "INR",
          //     remove: {
          //       products: [
          //         {
          //           name: item.name,
          //           id: item.sku,
          //           price: item.selling_price,
          //           category: item.category,
          //           position: 1,
          //         },
          //       ],
          //     },
          //   },
          // });
        } else {
          throw "no response from api";
        }
      } catch (error) {
        this.$globalError(`error from add addRemoveWishList >>>> ${error}`);
      }
    },
  },
  computed: {
    isDeviceMobile: function () {
      return window.matchMedia("only screen and (max-width: 1024px)").matches;
    },
    getSlideShow: function () {
      return this.slideShow;
    },
  },
};
</script>

<style scoped>
</style>
