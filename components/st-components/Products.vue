<template>
  <client-only>
    <div class="st-col-md-3 st-products">
      <div class="st-card">
        <div class="st-product-element-top">
          <div
            class="product-imageSlider"
            @click="reDirectToProductPage(item.url)"
            v-if="getSlideShow && item.gallery && !isDeviceMobile"
          >
            <slick
              ref="slick"
              :options="slickOptions"
              class="product_image_slide"
            >
              <img v-for="i in item.gallery" :src="i.image" :key="i.image" />
            </slick>
          </div>
          <div class="st-img-container">
            <NuxtLink :to="getUrl(item.url)" class="st-loop-product">
              <img
                :src="imageModifier(item.image)"
                v-if="item.gallery === undefined || item.gallery === null"
                class="img_thumbnail"
              />
              <img
                :src="imageModifier(item.image)"
                v-else
                class="img_thumbnail"
              />
            </NuxtLink>

            <!-- <i
            aria-hidden="true"
            class="fa st-wishlist"
            v-if="!wishActive(item.group_id)"
            @click.prevent="add_w(item.id, item.group_id)"
            ><img src="~/assets/st_assets/st/wishlist.svg"
          /></i>
          <i
            aria-hidden="true"
            class="fa st-wishlist"
            v-else
            @click.prevent="remove_w(item.id, item.group_id)"
            ><img src="~/assets/st_assets/st/wishlist_fill.svg"
          /></i> -->
          </div>
        </div>
        <p class="st-price">
          <span class="st-old-price" v-show="item.discount_percentage > 0"
            >{{ currSymbol }} {{ numberWithCommas(item.price) }}</span
          >
          <span
            class="st-main-price"
            v-show="item.discounted_price > 0"
            :class="{ 'price-red': item.discount_percentage > 0 }"
            >{{ currSymbol }}
            {{ numberWithCommas(item.discounted_price) }}</span
          >
        </p>
        <div class="st-bottom-card">
          <div class="st-title-box">
            <h3 class="st-product-title">
              <NuxtLink :to="getUrl(item.url)">
                <span class="st-available-color">{{ item.colour }}</span>
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
import Slick from "vue-slick";
global.jQuery = require("jquery");
let $ = global.jQuery;
export default {
  name: "Products",
  props: ["item"],
  components: { Slick },
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
        lazyLoad: "ondemand",
        slidesToScroll: 1,
        slidesToShow: 1,
        arrows: false,
        infinite: true,
        dots: false,
        autoplay: true,
        fade: true,
        autoplaySpeed: 1000,
        pauseOnFocus: false,
        pauseOnHover: false,
        pauseOnDotsHover: false,
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
      if (img !== null && img !== undefined) {
        return img;
      } else {
        return "https://www.themelocation.com/wp-content/uploads/2015/01/woocommerce113.jpg";
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
      if (x) return x.toFixed(0);
      else return 0;
    },
    stopPropagation(event) {
      event.stopPropagation();
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
