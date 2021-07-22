<template>
  <div class="product_details main_section">
    <div
      class="product-images product_images_slide mobile_only"
      v-if="
        singleProductList.single_prod_data &&
        Object.keys(singleProductList.single_prod_data).length > 0
      "
    >
      <VueSlickCarousel ref="slick" v-bind="settings">
        <div
          class="item"
          v-for="(image, imgIndex) in singleProductList.single_prod_data
            .gallery"
          :key="imgIndex"
        >
          <a href="#" @click.prevent="toggleZoomImg(imgIndex)"
            ><img :src="image.image" alt="img" class="w-100"
          /></a>
        </div>
      </VueSlickCarousel>
    </div>

    <div class="container-fluid">
      <div class="row desktop_only">
        <div class="col-12">
          <div
            class="back-to-container"
            v-if="
              singleProductList.breadcrumb &&
              singleProductList.breadcrumb.length > 0
            "
          >
            <span
              v-for="(itemBrd, indexBrd) in singleProductList.breadcrumb"
              :key="indexBrd"
            >
              <Nuxt-link
                v-if="
                  indexBrd != 0 &&
                  indexBrd != singleProductList.breadcrumb.length - 1
                "
                :to="`/collections/${itemBrd.url_key}`"
                >{{ itemBrd.name }}
              </Nuxt-link>
              <Nuxt-link v-if="indexBrd == 0" :to="`${itemBrd.url_key}`"
                >{{ itemBrd.name }}
              </Nuxt-link>
              <Nuxt-link
                v-if="indexBrd == singleProductList.breadcrumb.length - 1"
                :to="`/product/${itemBrd.url_key}`"
                >{{ itemBrd.name }}
              </Nuxt-link>
              <span class="arrow-space"> / </span>
            </span>
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
                <a href="#" @click.prevent="toggleZoomImg(imgIndex)"
                  ><img :src="image.image" alt="img" class="w-100"
                /></a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 col-lg-4 col-12">
          <div class="product-content">
            <h1 class="product-title">
              {{ singleProductList.single_prod_data.name }}
            </h1>
            <p class="p-price">
              MRP
              <span
                v-if="
                  singleProductList.single_prod_data.discount != '' &&
                  singleProductList.single_prod_data.discount > 0
                "
              >
                ₹{{
                  singleProductList.single_prod_data.selling_price
                    | numberWithCommas
                }}
                <span class="line-throu"
                  >₹{{
                    singleProductList.single_prod_data.price | numberWithCommas
                  }}</span
                >
              </span>
              <span v-else
                >₹{{
                  singleProductList.single_prod_data.price | numberWithCommas
                }}</span
              >
              <span
                style="opacity: 0.5; font-weight: 500"
                v-if="
                  singleProductList.single_prod_data.discount != '' &&
                  singleProductList.single_prod_data.discount > 0
                "
                >({{ singleProductList.single_prod_data.discount }}% Off)</span
              >
              <br />
              <span class="pricr-title">Price inclusive of all taxes</span>
            </p>

            <span id="stick-cart-temp"></span>

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
                    <NuxtLink :to="color.url_key">
                      <img
                        :src="color.image"
                        alt="img"
                        :class="[
                          $route.params.productDetail == color.url_key
                            ? 'active'
                            : '',
                        ]"
                    /></NuxtLink>
                  </li>
                </ul>
              </li>
              <li
                class="variation-attribute"
                v-if="
                  singleProductList.single_prod_data.variation &&
                  Object.keys(singleProductList.single_prod_data.variation)
                    .length > 0
                "
              >
                <span
                  class="attribute-label color"
                  :class="sizeAlert == true ? 'error' : ''"
                >
                  CHOOSE SIZE
                  <span v-if="selectedSizeAttr"
                    >: {{ selectedSizeAttr.configrable_atribute_value }}
                  </span>
                </span>
                <ul class="swatch-attribute-values color">
                  <li
                    class="attribute-value js_attribute-value"
                    v-for="(size, index) in singleProductList.single_prod_data
                      .variation"
                    :key="index"
                    :class="[size.quantity == 0 ? 'unavailable' : '']"
                    @click="hanldeSize(size)"
                  >
                    <span
                      :class="
                        selectedSizeAttr.configrable_atribute_value ===
                        size.configrable_atribute_value
                          ? 'selected-size'
                          : ''
                      "
                      >{{ size.configrable_atribute_value }}</span
                    >
                  </li>
                </ul>
              </li>

              <li
                class="variation-attribute"
                v-if="
                  singleProductList.single_prod_data.item_lengths &&
                  Object.keys(singleProductList.single_prod_data.item_lengths)
                    .length > 0
                "
              >
                <span
                  class="attribute-label color"
                  :class="lengthAlert == true ? 'error' : ''"
                >
                  CHOOSE Length
                  <span v-if="selectedLengthAttr"
                    >: {{ selectedLengthAttr.configrable_atribute_value }}
                  </span>
                </span>
                <ul class="swatch-attribute-values color">
                  <li
                    class="attribute-value js_attribute-value"
                    v-for="(size, index) in singleProductList.single_prod_data
                      .item_lengths"
                    :key="index"
                    :class="[size.quantity == 0 ? 'unavailable' : '']"
                    @click="hanldeLengt(size)"
                  >
                    <span
                      :class="
                        selectedLengthAttr.configrable_atribute_value ===
                        size.configrable_atribute_value
                          ? 'selected-size'
                          : ''
                      "
                      >{{ size.configrable_atribute_value }}</span
                    >
                  </li>
                </ul>
              </li>
            </ul>

            <div
              class="print_btn"
              :class="{ addtocartsticky: fixedMobileCart && showStickycart }"
            >
              <button
                id="btn-print"
                class="primary-btn full-with-btn"
                @click="addToCart()"
              >
                <a href="#stick-cart-temp" class="text-white"> Add to cart </a>
              </button>
              <div class="wish-list-icon single">
                <span
                  class="wishlist_blank"
                  :id="$store.state.cartAjax.wishlist.group"
                  :class="renderWishList()"
                  @click="addRemoveWishList(renderWishList())"
                ></span>
              </div>
            </div>
            <div class="store-locator-link">
              <span
                role="presentation"
                class="store-locator-pin icon-pin"
              ></span>
              <a href="#" @click="openInStorePickUp()">In-store pickup</a>
            </div>
            <div class="product-collapsible-sections">
              <div
                class="product-care-instructions care"
                :class="[CareInstructions ? 'expand-open' : 'expand-close']"
              >
                <h2 @click="toggleDropDown('CareInstructions')">
                  Description <span class="title"></span>
                </h2>
                <ul>
                  <li
                    v-for="(desc, descKey) in renderDescription"
                    :key="descKey"
                  >
                    <span style="text-transform: capitalize"></span>
                    {{ desc }}
                  </li>
                </ul>
              </div>

              <!-- other details -->
              <div
                class="product-care-instructions care"
                :class="[otherDetails ? 'expand-open' : 'expand-close']"
                @click="toggleDropDown('otherDetails')"
              >
                <h2>OTHER DETAILS <span class="title"></span></h2>
                <div class="care-instructions product-expand-block">
                  <ul class="product-information-list">
                    <li
                      v-for="(desc, descKey) in renderDescription2"
                      :key="descKey"
                    >
                      <span style="text-transform: capitalize">{{
                        descKey
                      }}</span>
                      : {{ desc }}
                    </li>
                    <li
                      v-for="(details, i) in singleProductList.single_prod_data
                        .visible_attributes"
                      :key="i"
                    >
                      <span style="text-transform: capitalize"
                        >{{ details.label }}: </span
                      >{{ details.value }}
                    </li>
                  </ul>
                </div>
              </div>
              <div
                v-if="
                  singleProductList.single_prod_data.care_instructions &&
                  singleProductList.single_prod_data.care_instructions != ''
                "
                class="product-care-instructions"
                :class="[CareInt ? 'expand-open' : 'expand-close']"
              >
                <h2 @click="toggleDropDown('CareInt')">
                  Care instructions <span class="title"></span>
                </h2>
                <div class="care-instructions product-expand-block">
                  <div
                    class="care-instruction"
                    v-for="(
                      careItem, careIndex
                    ) in singleProductList.single_prod_data.care_instructions.split(
                      ','
                    )"
                    :key="careIndex"
                  >
                    <img
                      class="care-instruction-image"
                      :src="renderImage(careItem)"
                      alt="Washing"
                      aria-label="Washing"
                      title="Washing"
                    />
                    <span class="care-instruction-text">{{ careItem }}</span>
                  </div>
                </div>
              </div>
              <div class="store-locator-link">
                <a href="#" @click="toggleDropDown('showSizeChart')"
                  >SIZE & FIT</a
                >
              </div>

              <!-- show pdf -->
              <div v-if="showSizeChart">
                <VueModal />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- image zoom show -->
    <transition name="slide">
      <ImageZoom
        :images="singleProductList.single_prod_data.gallery"
        :scrollToId="scrollToId"
        v-if="showZoomedImage"
      />
    </transition>
    <!-- YOU MAY ALSO LIKE -->
    <YouMayLike :likeData="singleProductList.single_prod_data.recommended" />

    <!--  IN-STORE PICKUP  -->
    <div class="store-model-overlay" v-if="storemodel">
      <div class="store-model-body">
        <a href="#" @click="() => (storemodel = false)">
          <span class="close-icon"></span>
        </a>
        <div class="titel">
          <h2>IN-STORE PICKUP</h2>
        </div>
        <div class="model-content">
          <div class="srtor-search-box">
            <span class="location-icons"></span>
            <input
              type="text"
              name=""
              class="form-control"
              placeholder="Enter your city or postal code"
              autocomplete="off"
              v-model="search"
            />
            <button class="search-stores-btn">Filter</button>
          </div>

          <div class="store-search-items">
            <div
              class="store-search-result"
              v-for="(addressList, index) in filteredList"
              :key="index"
            >
              <div class="store-list">
                <div class="list">
                  <h5>{{ addressList.infoText.name }}</h5>
                </div>
                <p>
                  {{ addressList.infoText.address }}<br />
                  {{ addressList.infoText.phone }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  IN-STORE PICKUP  -->
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import { mapState } from "vuex";
import ImageZoom from "./imageZoom";
import YouMayLike from "./YouMayLike";
import VueModal from "./modal";

export default {
  components: { VueSlickCarousel, ImageZoom, YouMayLike, VueModal },
  data() {
    return {
      fixedMobileCart: false,
      showSizeChart: false,
      showStickycart: false,
      storemodel: false,
      search: "",
      serviceCenters: [],
      markers: [],
      CareInstructions: false,
      otherDetails: false,
      CareInt: false,
      selectedSizeError: "",
      showZoomedImage: false,
      pickup: false,
      size: false,
      selectedSizeAttr: "",
      selectedLengthAttr: "",
      isLengthAvailable: false,
      sizeAlert: false,
      lengthAlert: false,
      lengthError: "",
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
      let { description } = this.singleProductList.single_prod_data;

      let obj = {
        description,
      };

      let finaObj = Object.entries(obj).reduce(
        (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
        {}
      );
      return finaObj;
    },

    filteredList() {
      return this.markers.filter((post) => {
        return post.infoText.search
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },

    renderDescription2() {
      let { material, color, occasion, warranty } =
        this.singleProductList.single_prod_data;

      let obj = {
        material,
        color,
        occasion,
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
      return "DIESEL SINGLE PRODUCT";
    },
    description() {
      if (this.singleProductList.single_prod_data.meta_description !== "")
        return this.singleProductList.single_prod_data.meta_description;
      return "DIESEL";
    },
    url() {
      return this.$store.state.BASE_URL + this.$route.fullPath;
    },
    image() {
      return this.singleProductList.single_prod_data.image;
    },
  },

  methods: {
    CloseModal() {
      this.showSizeChart = false;
    },
    async openInStorePickUp() {
      if (Object.keys(this.selectedSizeAttr).length === 0) {
        this.sizeAlert = true;
        this.selectedSizeError = "Please select size";
      }
      if (
        this.isLengthAvailable &&
        Object.keys(this.selectedLengthAttr).length === 0
      ) {
        this.lengthAlert = true;
        this.lengthError = "please select length";
        return;
      } else {
        var response = await this.$store.dispatch("cartAjax/actCartAjax", {
          method: "post",
          url: `/cart/productstore`,
          token: this.$store.state.cartAjax.customer_token,
          params: {
            fynd_uid: this.selectedSizeAttr.fynd_uid,
          },
        });

        if (response.success) {
          if (response.data) {
            this.serviceCenters = response.data;
            this.serviceCenters.map((element) => {
              if (element.lat != "") {
                this.markers.push({
                  position: {
                    lat: Number(element.lat),
                    lng: Number(element.lng),
                  },
                  infoText: {
                    search:
                      element.display_name +
                      " " +
                      element.address +
                      " " +
                      element.city +
                      " " +
                      element.email +
                      " " +
                      element.phone,
                    name: element.display_name,
                    address: element.address,
                    city: element.city,
                    state: element.state,
                    zip: element.postcode,
                    phone: element.phone,
                    email: element.email,
                    store_id: element.store_id,
                    store_email: element.email,
                  },
                });
              }
            });
          }
          this.storemodel = true;
        } else {
          this.$toast.error("No pick up store available");
        }
      }
    },
    toggleDropDown(state) {
      this[state] = !this[state];
    },
    toggleZoomImg(id) {
      this.scrollToId = id;
      this.showZoomedImage = !this.showZoomedImage;
      if (this.showZoomedImage) {
        document.body.classList.add("remove-scrollBar");
      } else {
        document.body.classList.remove("remove-scrollBar");
      }
    },

    hanldeSize(size) {
      if (size.quantity == 0) return;
      this.sizeAlert = false;
      this.selectedSizeAttr = size;
    },

    hanldeLengt(size) {
      if (size.quantity == 0) return;
      this.lengthAlert = false;
      this.selectedLengthAttr = size;
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

          if (response.response.success) {
            this.$gtm.push({
              event: "ProductDetail",
              action: "Product Detail",
              category: this.singleProductList.single_prod_data.category,
              ecommerce: {
                detail: {
                  products: [
                    {
                      name: this.singleProductList.single_prod_data.name,
                      id: this.singleProductList.single_prod_data.sku,
                      price:
                        this.singleProductList.single_prod_data.selling_price,
                      category:
                        this.singleProductList.single_prod_data.category,
                    },
                  ],
                },
              },
            });
          }
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
        this.selectedSizeError = "Please select size";
      }
      if (
        this.isLengthAvailable &&
        Object.keys(this.selectedLengthAttr).length === 0
      ) {
        this.lengthAlert = true;
        this.lengthError = "please select length";
        return;
      } else {
        try {
          this.selectedSizeError = "";
          var form = {};
          var urlHolder;
          var tokenholder;
          var product_options_json = JSON.stringify({
            size: this.selectedSizeAttr.configrable_atribute_value,
            color: this.singleProductList.single_prod_data.color,
          });
          form.length = this.selectedLengthAttr.configrable_atribute_value;
          form.product_id = this.selectedSizeAttr.id_product;
          form.product_parent_id =
            this.singleProductList.single_prod_data.id_product;
          form.product_options = product_options_json;
          form.fynd_size = this.selectedSizeAttr.configrable_atribute_value;
          form.fynd_uid = this.singleProductList.single_prod_data.fynd_uid;
          form.name = this.singleProductList.single_prod_data.name;
          form.sku = this.selectedSizeAttr.sku;
          form.master_sku = this.singleProductList.single_prod_data.sku;
          form.price = this.singleProductList.single_prod_data.price;
          form.qty_ordered = this.addToCartVal;
          form.final_price =
            this.singleProductList.single_prod_data.selling_price;
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
            if (response.success) {
              this.selectedSizeAttr = "";
              this.$gtm.push({
                event: "addToCart",
                category: this.singleProductList.single_prod_data.category,
                action: "addToCart",
                ecommerce: {
                  currencyCode: "INR",
                  add: {
                    products: [
                      {
                        name: this.singleProductList.single_prod_data.name,
                        id: this.singleProductList.single_prod_data.sku,
                        price:
                          this.singleProductList.single_prod_data.selling_price,
                        category:
                          this.singleProductList.single_prod_data.category,
                        variant:
                          this.selectedSizeAttr.configrable_atribute_value,
                        quantity: "1",
                      },
                    ],
                  },
                },
              });
            }
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
    // render wish list class icon
    renderWishList() {
      let ProductId = this.singleProductList.single_prod_data.id_product;
      let groupId = this.singleProductList.single_prod_data.group_id;
      let wishList = this.$store.state.cartAjax.wishlist;

      if (wishList && Object.keys(wishList).length != 0) {
        const groupResult = wishList.group
          .split(",")
          .filter((word) => word == groupId);
        const productResult = wishList.product
          .split(",")
          .filter((word) => word == ProductId);

        if (
          groupResult &&
          groupResult.length > 0 &&
          productResult &&
          productResult.length > 0
        ) {
          return "wishlist-active";
        } else {
          return "add";
        }
      } else {
        return "add";
      }
    },

    updateAddToCart() {
      function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
        );
      }
      const box = document.querySelector("#stick-cart-temp");
      if (isInViewport(box)) {
        this.showStickycart = false;
      } else {
        this.showStickycart = true;
      }
    },

    // add and remove to wish list
    async addRemoveWishList(data, index) {
      try {
        if (
          this.$store.state.cartAjax.customer_id == "" &&
          this.$store.state.cartAjax.customer_session == ""
        )
          return this.$router.push("/login");
        let form = {
          product_id: this.singleProductList.single_prod_data.id_product,
          customer_id: this.$store.state.cartAjax.customer_id,
          customer_session: this.$store.state.cartAjax.customer_session,
          group_id: this.singleProductList.single_prod_data.group_id,
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
            category: this.singleProductList.single_prod_data.category,
            action: "removeFromWishlist",
            ecommerce: {
              currencyCode: "INR",
              remove: {
                products: [
                  {
                    name: this.singleProductList.single_prod_data.name,
                    id: this.singleProductList.single_prod_data.sku,
                    price:
                      this.singleProductList.single_prod_data.selling_price,
                    category: this.singleProductList.single_prod_data.category,
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

    // render iamge
    renderImage(data) {
      if (data.search("wash") >= 0) {
        return require("@/assets/img/12.svg");
      }
      if (data.search("bleach") >= 0) {
        return require("@/assets/img/17.svg");
      }
      if (data.search("tumble") >= 0) {
        return require("@/assets/img/28.svg");
      }
      if (data.search("Iron") >= 0) {
        return require("@/assets/img/31.svg");
      } else {
        return require("@/assets/img/instruction.svg");
      }
    },
  },

  async fetch() {
    // to fetch single product detail
    this.$store.commit("removeSingleProdState");
    await this.getProductDetail();

    this.fixedMobileCart = this.$device.isMobile;
    // render from single variation
    if (
      this.singleProductList.single_prod_data &&
      this.singleProductList.single_prod_data.variation &&
      Object.keys(this.singleProductList.single_prod_data.variation).length == 1
    ) {
      var obj = this.singleProductList.single_prod_data.variation;
      this.selectedSizeAttr = obj[Object.keys(obj)[0]];
    }

    // length check
    if (
      this.singleProductList.single_prod_data &&
      this.singleProductList.single_prod_data.item_lengths &&
      Object.keys(this.singleProductList.single_prod_data.item_lengths)
        .length != 0
    ) {
      this.isLengthAvailable = true;
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

  mounted() {
    // add window event listner for lazy loading products
    window.addEventListener("scroll", this.updateAddToCart);
    if (this.singleProductList.single_prod_data.name) {
      this.$gtm.push({
        event: "ProductDetail",
        action: "Product Detail",
        category: this.singleProductList.single_prod_data.category,
        ecommerce: {
          detail: {
            products: [
              {
                name: this.singleProductList.single_prod_data.name,
                id: this.singleProductList.single_prod_data.sku,
                price: this.singleProductList.single_prod_data.selling_price,
                category: this.singleProductList.single_prod_data.category,
              },
            ],
          },
        },
      });
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.updateAddToCart);
  },
};
</script>
