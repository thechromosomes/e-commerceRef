<template>
  <div class="product_details main_section">
    <div
      class="product-images product_images_slide mobile_only"
      v-if="Object.keys(singleProductList.single_prod_data).length > 0"
    >
      <VueSlickCarousel ref="slick" v-bind="settings">
        <div
          class="item"
          v-for="(image, imgIndex) in singleProductList.single_prod_data
            .gallery"
          :key="imgIndex"
        >
          <img :src="image.image" alt="img" class="w-100" />
        </div>
      </VueSlickCarousel>
    </div>

    <div class="container-fluid">
      <div class="row desktop_only">
        <div class="col-12">
          <div class="back-to-container">
            <a href="#" class="back-to"> Back to Loungewear </a>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12 col-lg-8 col-12">
          <div class="product-images desktop_only">
            <div class="desk-img">
              <div
                class="image-box"
                v-for="(image, imgIndex) in singleProductList.single_prod_data
                  .gallery"
                :key="imgIndex"
              >
                <img :src="image.image" alt="img" class="w-100" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 col-lg-4 col-12">
          <div class="product-content">
            <h1 class="product-title">UMLB-PETER</h1>
            <h2 class="product-short-description">
              Sweatpants with Mohawk logo
            </h2>
            <ul class="product-attributes">
              <li class="variation-attribute">
                <span class="attribute-label color"> COLOR: </span>
                <span class="attribute-label-value">
                  {{ singleProductList.single_prod_data.color }}</span
                >
                <ul class="swatch-attribute-values color">
                  <li
                    class="swatch-attribute-values-img"
                    v-for="(color, index) in singleProductList.single_prod_data
                      .color_variation"
                    :key="index"
                  >
                    <a
                      ><img
                        :src="color.image"
                        alt="img"
                        :class="[
                          $route.params.productDetail == color.url_key
                            ? 'active'
                            : '',
                        ]"
                    /></a>
                  </li>
                </ul>
              </li>
              <li class="variation-attribute">
                <span class="attribute-label color">
                  CHOOSE SIZE
                  <span v-if="selectedSizeAttr"
                    >: {{ selectedSizeAttr.configrable_atribute_value }}
                  </span>
                </span>
                <!-- <span class="attribute-label-value"> Black</span> -->
                <ul class="swatch-attribute-values color">
                  <li
                    class="attribute-value js_attribute-value"
                    v-for="(size, index) in singleProductList.single_prod_data
                      .variation"
                    :key="index"
                    :class="[size.quantity == 0 ? 'unavailable' : '']"
                    @click="hanldeSize(size)"
                  >
                    {{ size.configrable_atribute_value }}
                  </li>
                </ul>
              </li>
            </ul>

            <div class="print_btn">
              <button
                id="btn-print"
                class="primary-btn full-with-btn"
                @click="addToCart()"
              >
                Add to cart
              </button>
            </div>

            <div class="product_info">
              <div class="content-asset">
                <div
                  class="product-additional-promo-asset"
                  :class="[pickup ? 'expand-open' : 'expand-close']"
                  @click="toggleDropDown('pickup')"
                >
                  <h3 class="product-desc-title">
                    <span class="promo-title">
                      <img
                        alt="curbside-pickup"
                        height="26"
                        src="~/assets/img/car.jpg"
                      />
                      <span>CURBSIDE PICKUP IS NOW AVAILABLE! </span>
                    </span>
                  </h3>
                  <div class="product-expand-block promo-content">
                    <span
                      >Complete your pickup in store order. Wait for the
                      confirmation email that your order is ready, drive up and
                      once at your local store call to have someone from our
                      staff bring your Diesel order straight to you.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="product-collapsible-sections">
              <div
                class="product-care-instructions"
                :class="[CareInstructions ? 'expand-open' : 'expand-close']"
                @click="toggleDropDown('CareInstructions')"
              >
                <h2>Care instructions <span class="title"></span></h2>

                <!-- <div class="care-instructions product-expand-block">
                  <div class="care-instruction">
                    <img
                      class="care-instruction-image"
                      src="~/assets/img/12.svg"
                      alt="Washing"
                      aria-label="Washing"
                      title="Washing"
                    />
                    <span class="care-instruction-text"
                      >Machine wash at 30 °C</span
                    >
                  </div>
                  <div class="care-instruction">
                    <img
                      class="care-instruction-image"
                      src="~/assets/img/17.svg"
                      alt="Washing"
                      aria-label="Washing"
                      title="Washing"
                    />
                    <span class="care-instruction-text">Do not bleach</span>
                  </div>
                  <div class="care-instruction">
                    <img
                      class="care-instruction-image"
                      src="~/assets/img/28.svg"
                      alt="Washing"
                      aria-label="Washing"
                      title="Washing"
                    />
                    <span class="care-instruction-text">Do not tumble dry</span>
                  </div>
                  <div class="care-instruction">
                    <img
                      class="care-instruction-image"
                      src="~/assets/img/31.svg"
                      alt="Washing"
                      aria-label="Washing"
                      title="Washing"
                    />
                    <span class="care-instruction-text"
                      >Iron at max 110 °C</span
                    >
                  </div>
                </div> -->
                <ul>
                  <li
                    v-for="(desc, descKey) in renderDescription"
                    :key="descKey"
                  >
                    {{ descKey.toUpperCase() }} : {{ desc }}
                  </li>
                  <li
                    v-for="(details, i) in singleProductList.single_prod_data
                      .visible_attributes"
                    :key="i"
                  >
                    <span>{{ details.label }}: </span>{{ details.value }}
                  </li>
                </ul>
              </div>
              <!-- expand-open for open class -->
              <div
                class="product-care-instructions"
                :class="[size ? 'expand-open' : 'expand-close']"
                @click="toggleDropDown('size')"
              >
                <h2>SIZE & FIT <span class="title"></span></h2>
                <div class="care-instructions product-expand-block">
                  <ul class="product-information-list">
                    <li class="product-information-element">
                      Model is wearing a size S and is 177 cm / 5'9"
                    </li>
                    <li class="product-information-element">
                      <a
                        href="/on/demandware.store/Sites-DieselNonEcommerce-Site/en_TR/Product-SizeChart?cid=sizechart-dsl-bottom-women-25"
                        data-toggle="modal"
                        data-target="#sizeChartModal"
                        ><u>Size Info</u></a
                      >
                    </li>
                  </ul>
                </div>
              </div>

              <div class="product-tags">
                <h2 class="product-tag-title">
                  <span class="title">Tags</span>
                </h2>
                <div class="product-tags-wrapper">
                  <a class="product-tag" href="#"> WOMAN </a>
                  ,
                  <a class="product-tag" href="#"> APPAREL </a>
                  ,
                  <a class="product-tag" href="#"> Loungewear </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import { mapState } from "vuex";

export default {
  components: { VueSlickCarousel },
  data() {
    return {
      CareInstructions: false,
      pickup: false,
      size: false,
      selectedSizeAttr: "",
      sizeAlert: false,
      addToCartVal: 1,
      settings: {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
      },
    };
  },

  head() {
    return {
      title: this.singleProductList.single_prod_data.meta_title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.singleProductList.single_prod_data.meta_description,
        },
        {
          hid: "keyword",
          name: "keyword",
          content: this.singleProductList.single_prod_data.meta_keyword,
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
        {
          hid: "og:image",
          content: this.image,
          property: "og:image",
        },
      ],
    };
  },

  computed: {
    ...mapState(["singleProductList"]),
    renderDescription() {
      let {
        description,
        material,
        color,
        occasion,
        pattern,
        sleeve,
        warranty,
      } = this.singleProductList.single_prod_data;

      let obj = {
        description,
        material,
        color,
        occasion,
        pattern,
        sleeve,
        warranty,
      };

      let finaObj = Object.entries(obj).reduce(
        (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
        {}
      );
      return finaObj;
    },

    // render seo tags
    title() {
      if (this.singleProductList.single_prod_data.meta_title != "")
        return this.singleProductList.single_prod_data.meta_title;
      return "STEVE MADDEN SINGLE PRODUCT";
    },
    description() {
      if (this.singleProductList.single_prod_data.meta_description !== "")
        return this.singleProductList.single_prod_data.meta_description;
      return "STEVE MADDEN";
    },
    url() {
      return this.$store.state.BASE_URL + this.$route.fullPath;
    },
    image() {
      return this.singleProductList.single_prod_data.image;
    },
  },

  methods: {
    toggleDropDown(state) {
      this[state] = !this[state];
    },

    hanldeSize(size) {
      if (size.quantity == 0) return;
      this.sizeAlert = false;
      this.selectedSizeAttr = size;
    },

    // get product detail
    async getProductDetail() {
      try {
        await this.$store.commit("prepareStateForSingleProd", {
          routeParam: this.$route.params.productDetail,
        });
        let { service, store, url_key } = this.$store.state.singleProductList;
        var form = {};
        form.service = service;
        form.store = store;
        form.url_key = url_key;

        if (this.$route.query.filter) {
          form.filter = this.$route.query.filter;
        }
        let response = await this.$store.dispatch("pimAjax", {
          method: "post",
          url: `/pimresponse.php`,
          params: form,
        });

        if (response) {
          this.$store.commit("updateSingleProdState", {
            error: null,
            data: response,
          });
        } else {
          throw "no response from api";
        }
      } catch (error) {
        this.$globalError(`error from getProductDetail >>>> ${error}`);
        if (error.message === "Network Error") {
          this.$store.commit("updateSingleProdState", {
            error:
              "Oops there seems to be some Network issue, please try again",
          });
        }
      }
    },

    async addToCart() {
      if (Object.keys(this.selectedSizeAttr).length === 0) {
        this.sizeAlert = true;
        return;
      } else {
        try {
          var form = {};
          var urlHolder;
          var tokenholder;
          var product_options_json = JSON.stringify({
            size: this.selectedSizeAttr.configrable_atribute_value,
            color: this.singleProductList.single_prod_data.color,
          });
          form.product_id = this.selectedSizeAttr.id_product;
          form.product_parent_id = this.singleProductList.single_prod_data.id_product;
          form.product_options = product_options_json;
          form.fynd_size = this.singleProductList.single_prod_data.fynd_size;
          form.fynd_uid = this.singleProductList.single_prod_data.fynd_uid;
          form.name = this.singleProductList.single_prod_data.name;
          form.sku = this.selectedSizeAttr.sku;
          form.master_sku = this.singleProductList.single_prod_data.sku;
          form.price = this.singleProductList.single_prod_data.price;
          form.qty_ordered = this.addToCartVal;
          form.final_price = this.singleProductList.single_prod_data.selling_price;
          form.store = this.$store.state.cartAjax.store;
          if (
            this.$store.state.cartAjax.cart_id != null &&
            this.$store.state.cartAjax.cart_id != ""
          ) {
            form.cart_id = this.$store.state.cartAjax.cart_id;
          }
          if (
            this.$store.state.cartAjax.cart_session != "" &&
            this.$store.state.cartAjax.cart_session != null
          ) {
            form.cart_session = this.$store.state.cartAjax.cart_session;
          }
          if (
            this.$store.state.cartAjax.customer_id != null &&
            this.$store.state.cartAjax.customer_id != "" &&
            this.$store.state.cartAjax.customer_session != "" &&
            this.$store.state.cartAjax.customer_session != null
          ) {
            form.customer_id = this.$store.state.cartAjax.customer_id;
            form.customer_session = this.$store.state.cartAjax.customer_session;
            urlHolder = `/product/add-product`;
            tokenholder = this.$store.state.cartAjax.customer_token;
          } else {
            urlHolder = `/product/new-cart`;
            tokenholder = "";
          }

          let response = await this.$store.dispatch("cartAjax/actCartAjax", {
            method: "post",
            url: urlHolder,
            params: form,
            token: tokenholder,
          });
          if (response) {
            this.$store.commit("cartAjax/updateCartDetail", {
              error: null,
              vm: this,
              data: response,
            });

            // google tag manager
            // if (response.success) {
            //   this.selectedSizeAttr = "";
            //   this.$gtm.push({
            //     event: "addToCart",
            //     category: this.singleProductList.single_prod_data.category,
            //     action: "addToCart",
            //     ecommerce: {
            //       currencyCode: "INR",
            //       add: {
            //         product: [
            //           {
            //             name: this.singleProductList.single_prod_data.name,
            //             id: this.singleProductList.single_prod_data.sku,
            //             price: this.singleProductList.single_prod_data
            //               .selling_price,
            //             category: this.singleProductList.single_prod_data
            //               .category,
            //             variant: this.selectedSizeAttr
            //               .configrable_atribute_value,
            //             quantity: "1",
            //           },
            //         ],
            //       },
            //     },
            //   });
            // }
          } else {
            throw "no response from api";
          }
        } catch (error) {
          this.$globalError(`error from addToCart >>>> ${error}`);

          if (error.message === "Network Error") {
            this.$store.commit("updateSingleProdState", {
              error:
                "Oops there seems to be some Network issue, please try again",
            });
          }
        }
      }
    },
  },

  async fetch() {
    // to fetch single product detail
    await this.getProductDetail();
    // render from single variation
    if (
      this.singleProductList.single_prod_data &&
      Object.keys(this.singleProductList.single_prod_data.variation).length == 1
    ) {
      var obj = this.singleProductList.single_prod_data.variation;
      this.selectedSizeAttr = obj[Object.keys(obj)[0]];
    }
  },

  watch: {
    "$store.state.cartAjax.cart_page_message": function () {
      if (
        this.$store.state.cartAjax.cart_page_message != "" &&
        this.$store.state.cartAjax.cart_page_message != null
      ) {
        this.$toast.open(this.$store.state.cartAjax.cart_page_message);
        this.$store.commit("cartAjax/removePageMessage", {
          data: "",
        });
      }
    },
    "$store.state.cartAjax.cart_page_erro_page": function () {
      if (
        this.$store.state.cartAjax.cart_page_error_message != "" &&
        this.$store.state.cartAjax.cart_page_error_message != null
      ) {
        this.$toast.error(this.$store.state.cartAjax.cart_page_error_message);
        this.$store.commit("cartAjax/removePageMessage", {
          data: "",
        });
      }
    },
  },
};
</script>
