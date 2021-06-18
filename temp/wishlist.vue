<template>
  <div>
    <client-only>
      <section
        class="wish-list-empty text-center"
        v-if="wislistProducts.length == 0"
      >
        <div class="wish-list-page-container">
          <h2>YOUR WISHLIST IS CURRENTLY EMPTY</h2>
          <p>
            Want to keep track of all your favourite pieces?<br />
            Simple select your size the product page and click on the Heart icon
          </p>
        </div>
      </section>
      <section class="wish-list-item-row" v-else>
        <div class="wish-list-page-container">
          <h2 class="all-item-heading">ALL ITEMS</h2>
          <div
            class="wish-list-wraper"
            v-for="(item, mainIndex) in wislistProducts"
            :key="mainIndex"
          >
            <div class="wish-list-item-img">
              <img :src="item.image" />
            </div>
            <div class="wish-list-item-content">
              <div class="heading-with-close-btn" style="cursor: pointer">
                <h2>{{ item.name }}</h2>
                <img
                  src="@/assets/img/close.png"
                  alt="close button"
                  @click="reomoveFromCart(item, mainIndex)"
                />
              </div>
              <h3><strong>Item Code:</strong> {{ item.group_id }}</h3>
              <h4><strong>Color:</strong> {{ item.color }}</h4>
              <select v-model="selectedSize[mainIndex]">
                <option value="" disabled>Select Size</option>
                <option
                  v-for="(size, index) in item.variation"
                  :key="index"
                  :disabled="size.quantity == 0"
                >
                  {{ size.configrable_atribute_value }}
                </option>
              </select>
              <div
                v-if="sizeAlert && sizeAlertIndes == mainIndex"
                style="clear: both"
              >
                <p class="promotion-text">please select the size</p>
              </div>
              <div class="move-bag-btn-div">
                <a @click.prevent="addToCart(item, mainIndex)" class="button"
                  >MOVE TO BAG</a
                >
                <a @click.prevent>
                  <span class="price price_icon">₹</span
                  ><span class="price"> {{ item.price }}</span></a
                >
              </div>
            </div>
          </div>
        </div>
      </section>
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
      sizeAlertIndes: "",
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
        this.wislistProducts.splice(index, 1);
      } catch (error) {
        this.$globalError(
          `error from the wishlist page (reomoveFromCart) >>>> ${error}`
        );

        console.log("error from the wishlist page >>>", error);
      }
    },

    async addToCart(item, sizeIndex) {
      if (this.selectedSize[sizeIndex] == "") {
        this.sizeAlert = true;
        this.sizeAlertIndes = sizeIndex;
        return;
      } else {
        this.sizeAlert = false;
        this.sizeAlertIndes = "";
        try {
          var form = {};
          var product_options_json = JSON.stringify({
            size: this.selectedSize[sizeIndex],
            color: item.color,
          });
          form.product_id =
            item.variation[this.selectedSize[sizeIndex]].id_product;
          form.product_parent_id = item.id_product;
          form.product_options = product_options_json;
          form.fynd_size = item.fynd_size;
          form.fynd_uid = item.fynd_uid;
          form.name = item.name;
          form.sku = item.variation[this.selectedSize[sizeIndex]].sku;
          form.master_sku = item.sku;
          form.price = item.price;
          form.qty_ordered = 1;
          form.final_price = item.selling_price;
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
                          item.variation[this.selectedSize[sizeIndex]]
                            .configrable_atribute_value,
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
