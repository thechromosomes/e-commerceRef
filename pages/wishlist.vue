<template>
  <div>
    <client-only>
      <div id="cart" class="wishlist">
        <div class="containers">
          <div class="account-top-section">
            <h4 class="wishlist-title">Wishlist</h4>
            <div class="content-asset"></div>
            <div class="section-actions">
              <!-- <button
                class="add-all-to-cart"
                v-if="wislistProducts.length > 0"
                @click="addAllToShoppingBag()"
              >
                ADD ALL TO SHOPPING BAG
              </button> -->
              <div
                class="wishlist-products-list empty"
                v-if="
                  $store.state.pageLoader == false &&
                  wislistProducts.length == 0
                "
              >
                <h4>YOUR WISHLIST IS EMPTY</h4>
                <Nuxt-link to="/" class="btn btn-default"
                  >Start Shopping</Nuxt-link
                >
              </div>
              <!-- <button
                v-if="wislistProducts.length > 0"
                type="button"
                @click="showSocialicons = true"
                class="share-button d-flex"
              >
                <span class="icon-share"></span>Share
              </button>
              <div class="wl-social-sharing" v-if="showSocialicons">
                <ShareNetwork
                  v-for="(item, index) in network"
                  :key="index"
                  :network="item.net"
                  url="http://di.hostx1.de/"
                  title="Say hi to diesel"
                  description="Create your wishlist: save up to 50 items to always be informed on their availability and add them directly to your Shopping Bag at any moment."
                  hashtags="Diesel"
                >
                  <a :class="item.icon"> </a>
                </ShareNetwork>

                <a
                  class="icon icon-close-black-md"
                  @click.prevent="showSocialicons = false"
                ></a>
              </div> -->
            </div>
          </div>

          <div class="product-flext">
            <div
              class="product"
              v-for="(item, mainIndex) in wislistProducts"
              :key="mainIndex"
            >
              <NuxtLink :to="`/product/${item.url_key}`">
                <div class="image-container">
                  <img :src="item.image" alt="img" class="w-100" />
                </div>
                <div class="tile-body">
                  <div class="product-color">{{ item.color }}</div>
                  <p class="name">{{ item.name }}</p>
                  <h4>
                    <strong>MRP:</strong>
                    <span class="price"
                      >₹{{ item.price | numberWithCommas }}</span
                    >
                  </h4>
                </div>
              </NuxtLink>
              <div class="select-box">
                <select
                  v-model="selectedColor[mainIndex]"
                  :class="{ error: sizeAlert && sizeAlertIndes == mainIndex }"
                  @change="updateColor(mainIndex)"
                >
                  <option value="" disabled>Select Color</option>
                  <template v-for="(size, index) in item.color_variation">
                    <option
                      v-if="size.quantity != 0"
                      :key="index"
                      :value="size"
                    >
                      {{ size.color }}
                    </option>
                  </template>
                </select>
              </div>

              <div class="select-box">
                <select
                  v-model="selectedSize[mainIndex]"
                  :class="{ error: sizeAlert && sizeAlertIndes == mainIndex }"
                >
                  <option value="" disabled>Select Size</option>
                  <template v-for="(size, index) in item.variation">
                    <option
                      :key="index"
                      :value="size"
                      v-if="
                        size.quantity != 0 &&
                        selectedColor[mainIndex].fynd_uid == size.fynd_uid
                      "
                    >
                      {{ size.configrable_atribute_value }}
                    </option>
                  </template>
                </select>
              </div>

              <div class="select-box">
                <select
                  v-if="
                    item.item_lengths &&
                    Object.keys(item.item_lengths).length > 0
                  "
                  :class="{
                    error: lengthAlert && lengthAlertIndes == mainIndex,
                  }"
                  v-model="selectedLength[mainIndex]"
                >
                  <option value="" disabled>Select Length</option>
                  <template v-for="(size, index) in item.item_lengths">
                    <option
                      :key="index"
                      :value="size"
                      v-if="
                        selectedSize[mainIndex].size == size.size &&
                        selectedSize[mainIndex].fynd_uid == size.fynd_uid &&
                        selectedSize[mainIndex].fynd_size == size.fynd_size &&
                        size.quantity != 0
                      "
                    >
                      {{ size.item_length }}
                    </option>
                  </template>
                </select>
              </div>
              <button
                class="add-to-cart--wishlist"
                @click="addToCart(item, mainIndex)"
              >
                Add to bag
              </button>
              <div class="product-tile__wishlist-cta">
                <button
                  class="remove-from-wishlist"
                  @click="reomoveFromCart(item, mainIndex)"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>
<script>
export default {
  data() {
    return {
      wislistProducts: [],
      selectedSizeAttr: {},
      sizeAlert: false,
      selectedSize: [],
      selectedColor: [],
      selectedLength: [],
      isLengthAvailable: [],
      sizeAlertIndes: "",
      showSocialicons: false,
      mainsizeAlert: false,
      colorAlert: true,
      colorIndex: "",
      selectedLengthAttr: "",
      lengthAlert: false,
      lengthAlertIndes: "",
      network: [
        { icon: "icon  icon-facebook-black", net: "facebook" },
        { icon: "icon  icon-pintrest", net: "Pinterest" },
        { icon: "icon  icon-twitter-black", net: "twitter" },
        { icon: "icon  icon-mail", net: "Email" },
        { icon: "icon  icon-whatsapp", net: "WhatsApp" },
      ],
    };
  },
  async created() {
    try {
      if (
        this.$store.state.cartAjax.customer_session == "" &&
        this.$store.state.cartAjax.customer_id == ""
      ) {
        this.$router.push("/login");
        return;
      }
      if (Object.keys(this.$store.state.cartAjax.wishlist).length != 0) {
        this.getProduct();
      }
    } catch (error) {
      this.$globalError(`error from the wishlist page fetch>>>> ${error}`);
      console.log("error from the wishlist page >>> ", error);
    }
  },

  methods: {
    async reomoveFromCart(item, index) {
      try {
        let form = {
          product_id: item.id_product,
          customer_id: this.$store.state.cartAjax.customer_id,
          customer_session: this.$store.state.cartAjax.customer_session,
          group_id: item.group_id,
        };
        var response = await this.$store.dispatch("cartAjax/actCartAjax", {
          method: "post",
          url: `/wishlist/remove-wishlist`,
          token: this.$store.state.cartAjax.customer_token,
          params: form,
        });

        if (response.success) {
          this.$store.commit("cartAjax/updateWishList", {
            payload: response.data,
          });
          this.getProduct();

          this.$gtm.push({
            event: "removeFromWishlist",
            action: "removeFromWishlist",
            category: item.sub_category,
            ecommerce: {
              currencyCode: "INR",
              remove: {
                products: [
                  {
                    name: item.name,
                    id: item.sku,
                    price: item.selling_price,
                    category: item.sub_category,
                  },
                ],
              },
            },
          });
        } else {
          this.$toast.error(response.message);
          throw "no response from api";
        }
        // this.wislistProducts.splice(index, 1);
        // this.selectedSize.splice(index, 1);
      } catch (error) {
        this.$globalError(
          `error from the wishlist page (reomoveFromCart) >>>> ${error}`
        );

        console.log("error from the wishlist page >>>", error);
      }
    },

    // update product via color refrence
    updateColor(index) {
      try {
        let tempPost = { ...this.wislistProducts[index] };
        tempPost.image = this.selectedColor[index].image;
        tempPost.price = this.selectedColor[index].price;
        tempPost.url_key = this.selectedColor[index].url_key;
        tempPost.color = this.selectedColor[index].color;

        this.wislistProducts.splice(index, 1, tempPost);
      } catch (error) {
        console.log("error from update product color >>> ", error);
        this.$globalError(`error from update product color >>> ${error}`);
      }
    },

    async getProduct() {
      try {
        var form = {};
        form.service = "wishlist";
        form.sku = this.$store.state.cartAjax.wishlist.product;
        form.store = this.$store.state.list.store;
        let response = await this.$store.dispatch("pimAjax", {
          method: "post",
          url: `/pimresponse.php`,
          params: form,
        });
        this.gtm_product_impressions = [];
        if (response.response.success) {
          this.wislistProducts = response.result;
          for (let i = 0; i < response.result.length; i++) {
            this.selectedSize[i] = "";
            this.selectedColor[i] = "";
            this.selectedLength[i] = "";
            if (
              response.result[i] &&
              response.result[i].item_lengths &&
              Object.keys(response.result[i].item_lengths).length != 0
            ) {
              this.isLengthAvailable[i] = true;
            } else {
              this.isLengthAvailable[i] = false;
            }
            let name = response.result[i].name;
            let id = response.result[i].sku;
            let price = response.result[i].selling_price;
            let category = response.result[i].category;
            let list = "List";
            let position = i + 1;
            this.gtm_product_impressions.push({
              name,
              id,
              price,
              category,
              list,
              position,
            });
          }

          this.$gtm.push({
            event: "impressionSent",
            action: "Product Impression",
            label: "Wishlist page",
            ecommerce: {
              currencyCode: "INR",
              impressions: this.gtm_product_impressions,
            },
          });
        } else {
          throw "No data found";
        }
      } catch (error) {
        this.$globalError(
          `error from the wishlist page (getProduct) >>>> ${error}`
        );
      }
    },

    // add all item to shopping bag
    addAllToShoppingBag() {
      for (let step = 0; step < this.wislistProducts.length; step++) {
        if (this.selectedSize[step] == "") {
          this.mainsizeAlert = true;
        } else {
          this.mainsizeAlert = false;
          this.addToCart(this.wislistProducts[step], step);
        }
      }
    },

    async addToCart(item, sizeIndex) {
      if (this.selectedSize[sizeIndex] == "") {
        this.sizeAlert = true;
        this.sizeAlertIndes = sizeIndex;
        return;
      }
      if (
        this.isLengthAvailable[sizeIndex] == true &&
        this.selectedLength[sizeIndex] == ""
      ) {
        this.lengthAlert = true;
        this.lengthAlertIndes = sizeIndex;
        return;
      }

      if (this.selectedColor[sizeIndex] == "") {
        this.colorAlert = true;
        this.colorIndex = sizeIndex;
        return;
      } else {
        this.sizeAlert = false;
        this.lengthAlert = false;
        this.colorAlert = false;
        this.colorIndex = "";
        this.sizeAlertIndes = "";
        this.lengthAlertIndes = "";
        try {
          var form = {};
          var product_options_json = JSON.stringify({
            size: this.selectedSize[sizeIndex].configrable_atribute_value,
            color: this.selectedColor[sizeIndex].color,
          });

          form.product_parent_id = item.id_product;
          form.product_options = product_options_json;
          if (this.isLengthAvailable[sizeIndex] == true) {
            form.fynd_size = this.selectedLength[sizeIndex].fynd_size;
            form.fynd_uid = this.selectedLength[sizeIndex].fynd_uid;
            form.sku = this.selectedLength[sizeIndex].sku;
            form.product_id = this.selectedLength[sizeIndex].id_product;
            form.master_sku = this.selectedLength[sizeIndex].sku;
          } else {
            form.fynd_size = this.selectedSize[sizeIndex].fynd_size;
            form.fynd_uid = this.selectedSize[sizeIndex].fynd_uid;
            form.sku = this.selectedSize[sizeIndex].sku;
            form.product_id = this.selectedSize[sizeIndex].id_product;
            form.master_sku = this.selectedSize[sizeIndex].sku;
          }
          form.name = item.name;
          form.price = item.price;
          form.qty_ordered = 1;
          form.final_price = item.selling_price;
          form.store = this.$store.state.cartAjax.store;
          form.length =
            this.selectedLength[sizeIndex].configrable_atribute_value;

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
          }

          let response = await this.$store.dispatch("cartAjax/actCartAjax", {
            method: "post",
            url: `/product/add-product`,
            token: this.$store.state.cartAjax.customer_token,
            params: form,
          });
          if (response) {
            await this.$store.commit("cartAjax/updateCartDetail", {
              error: null,
              data: response,
            });
            if (response.success) this.reomoveFromCart(item, sizeIndex);

            // google tag manager
            if (response.success) {
              this.$gtm.push({
                event: "addToCart",
                category: item.sub_category,
                action: "addToCart",
                ecommerce: {
                  currencyCode: "INR",
                  add: {
                    products: [
                      {
                        name: item.name,
                        id: item.sku,
                        price: item.selling_price,
                        category: item.sub_category,
                        variant:
                          item.variation[
                            this.selectedSize[sizeIndex]
                              .configrable_atribute_value
                          ].configrable_atribute_value,
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
          this.$globalError(
            `error from the wishlist add to cart >>>> ${error}`
          );
          console.log("error from the wishlist add to cart", error);
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
};
</script>
<style scoped>
@import url("@/assets/css/pages-css/wishList.css");
</style>
