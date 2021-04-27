<template>
  <div>
    <client-only>
      <div id="cart">
        <div class="container">
          <div class="row">
            <div class="span12">
              <h1 class="title text-center">Your cart</h1>
              <div
                v-if="$store.state.cartAjax.cart_product.length == 0"
                class="cart-empty"
              >
                <p class="empty-head">phew! your cart is empty</p>

                <img
                  src="@/assets/img/empty-cart.png"
                  alt="empty_cart"
                  width="200px"
                />
              </div>
              <form v-if="$store.state.cartAjax.cart_product.length != 0">
                <div class="clearboth">
                  <div class="cartItemProducts">
                    <div
                      class="clearboth productItem"
                      v-for="(product, index) in $store.state.cartAjax
                        .cart_product"
                      :key="index"
                    >
                      <div class="image-info display-inline">
                        <div class="clearboth">
                          <div class="product_image display-inline">
                            <a
                              :href="`/collections/product/${product.url_key}`"
                            >
                              <img
                                :src="product.image"
                                alt="HOWLER SAND SUEDE"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class="item-info display-inline">
                        <div class="clearboth">
                          <div class="item display-inline">
                            <a href="#" class="text-info">
                              <strong>{{ product.name }}</strong> <br />
                              <span
                                class="product_options-cart"
                                v-if="JSON.parse(product.size).color"
                                >Color :
                                {{ JSON.parse(product.size).color }}</span
                              >
                              <span
                                class="product_options-cart"
                                v-if="JSON.parse(product.size).size"
                                >Size :
                                {{ JSON.parse(product.size).size }}</span
                              >
                              <span
                                class="product_options-cart Loyalty_LineItem hide_permanent"
                              ></span>
                              <span
                                class="product_options-cart Loyalty_LineItem hide_permanent"
                              ></span>
                              <span
                                class="product_options-cart Loyalty_LineItem hide_permanent"
                              ></span>
                              Pre-ordered items: {{ product.qty }}
                              <br />
                              <span
                                ><div
                                  class="cart__meta-text pre-order-message"
                                  data-product-id="5172417462405"
                                ></div>
                              </span>
                            </a>
                          </div>
                          <div class="remove display-inline mobileOnly">
                            <a
                              @click.prevent="removeCartItem(product)"
                              class="cart"
                              ><img
                                src="@/assets/img/remove.webp"
                                alt="Remove"
                            /></a>
                          </div>
                          <div class="qty display-inline">
                            <div class="product-single__quantity">
                              <a
                                class="minus-symbol"
                                @click.prevent="addCartVal('minus', product)"
                                >-</a
                              >
                              <input
                                name="updates[]"
                                class="cart__product-qty tc item-quantity"
                                :value="product.qty"
                                type="text"
                                disabled
                              />
                              <a
                                class="plus-symbol"
                                @click.prevent="addCartVal('add', product)"
                                >+</a
                              >
                            </div>
                          </div>
                          <div class="remove display-inline desktopOnly">
                            <a
                              @click.prevent="removeCartItem(product)"
                              class="cart"
                              ><img
                                src="@/assets/img/remove.webp"
                                alt="Remove"
                            /></a>
                          </div>
                          <div class="price display-inline">
                            <span class="price price_icon">₹</span
                            ><span class="price"> {{ product.price }}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p class="clearnceMsg" v-show="product.max_qty == 0">
                          Requested quentity is out of stock.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="cartItemSidebar">
                    <h4 class="total">
                      Total:
                      <strong>
                        <span class="price price_icon">₹</span
                        ><span class="price">
                          {{ $store.state.cartAjax.cart_total }}</span
                        >
                      </strong>
                    </h4>
                    <h4
                      class="total"
                      v-if="
                        $store.state.cartAjax.discount_amount != '' &&
                        $store.state.cartAjax.discount_amount != null
                      "
                    >
                      Dsicount:
                      <strong>
                        <span class="price price_icon">₹</span
                        ><span class="price">
                          {{ $store.state.cartAjax.discount_amount }}</span
                        >
                      </strong>
                    </h4>
                    <div
                      class="tooltiptext red"
                      id="preOrderDate"
                      v-if="
                        $store.state.cartAjax.discount_code == '' ||
                        $store.state.cartAjax.discount_code == null
                      "
                    >
                      <input
                        type="text"
                        placeholder="Apply coupon"
                        name="coupon"
                        value="Coupon"
                        ref="applied_coupon"
                        v-model="applied_coupon"
                        style="padding-top: 8px"
                        autocomplete="off"
                      />
                      <button @click.prevent="addRemoveCoupon('add')">
                        Apply
                      </button>
                    </div>
                    <div class="tooltiptext red" id="preOrderDate" v-else>
                      <input
                        type="text"
                        placeholder="remove coupon"
                        name="coupon"
                        value="Coupon"
                        ref="applied_coupon"
                        v-model="$store.state.cartAjax.discount_code"
                        disabled
                        style="padding-top: 8px"
                        autocomplete="off"
                      />
                      <button @click.prevent="addRemoveCoupon('remove')">
                        Remove
                      </button>
                    </div>
                    <div class="buttons clearfix">
                      <input
                        type="submit"
                        class="btn"
                        name="checkout"
                        value="Checkout"
                        @click.prevent="() => $router.push('/checkout')"
                      />
                    </div>
                  </div>
                </div>
              </form>
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
      addToCartVal: 0,
      applied_coupon: "",
    };
  },

  methods: {
    async removeCartItem(item) {
      try {
        var form = {};
        form.cart_id = this.$store.state.cartAjax.cart_id;
        form.cart_session = this.$store.state.cartAjax.cart_session;
        form.product_id = item.item_id;
        form.customer_id = this.$store.state.cartAjax.customer_id;
        form.customer_session = this.$store.state.cartAjax.customer_session;

        let response = await this.$store.dispatch("cartAjax/actCartAjax", {
          method: "post",
          url: `/product/remove-product`,
          token: this.$store.state.cartAjax.cart_token,
          params: form,
        });
        if (response) {
          this.$store.commit("cartAjax/updateCartDetail", {
            error: null,
            data: response,
            vm: this,
          });
          if (response.success) {
            this.$gtm.push({
              event: "removeFromCart",
              action: "removeFromCart",
              ecommerce: {
                remove: {
                  product: [
                    {
                      name: item.name,
                      id: item.master_sku,
                      price: item.selling_price,
                      variant: item.fynd_size,
                      quantity: item.qty,
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
        this.$globalError(`error from remove cart >>>> ${error}`);
        console.log("error from remove cart >>>", error);
      }
    },

    async updateCart(item) {
      try {
        var form = {};
        form.qty_ordered = this.addToCartVal;
        form.cart_id = this.$store.state.cartAjax.cart_id;
        form.cart_session = this.$store.state.cartAjax.cart_session;
        form.product_id = item.variant_id;
        form.customer_id = this.$store.state.cartAjax.customer_id;
        form.customer_session = this.$store.state.cartAjax.customer_session;

        let response = await this.$store.dispatch("cartAjax/actCartAjax", {
          method: "post",
          url: `/product/update-product`,
          token: this.$store.state.cartAjax.cart_token,
          params: form,
        });
        if (response) {
          this.$store.commit("cartAjax/updateCartDetail", {
            error: null,
            data: response,
            vm: this,
          });
        } else {
          throw "no response from api";
        }
      } catch (error) {
        this.$globalError(
          `this is from cart checkout updateCart >>>> ${error}`
        );
        console.log("error", error);
      }
    },

    addCartVal(cartval, product) {
      this.addToCartVal = product.qty;
      if (Object.keys(product).length === 0) {
        alert("no product available");
        return;
      }
      if (this.addToCartVal >= 5 && cartval == "add") {
        return;
      } else {
        if (
          cartval === "add" &&
          this.addToCartVal < product.max_qty &&
          this.addToCartVal < 5
        ) {
          this.addToCartVal += 1;
        } else if (cartval === "minus") {
          this.addToCartVal -= 1;
          this.addToCartVal === 0 ? (this.addToCartVal = 1) : this.addToCartVal;
        }
      }
      this.updateCart(product);
    },

    // add coupon to the cart
    async addRemoveCoupon(behave) {
      try {
        var url;
        var token;
        if (behave == "add" && this.applied_coupon == "") {
          this.$refs.applied_coupon.focus();
          return;
        }

        if (behave == "remove") {
          url = `/cart/remove-coupon`;
          token = this.$store.state.cartAjax.cart_token;
        }
        var form = {};
        form.cart_id = this.$store.state.cartAjax.cart_id;
        form.cart_session = this.$store.state.cartAjax.cart_session;
        if (behave == "add") {
          url = `/cart/assign-coupon`;
          token = this.$store.state.cartAjax.cart_token;
          form.coupon = this.applied_coupon;
        }
        if (
          this.$store.state.cartAjax.customer_id != null &&
          this.$store.state.cartAjax.customer_id != ""
        ) {
          form.customer_id = this.$store.state.cartAjax.customer_id;
          form.customer_session = this.$store.state.cartAjax.customer_session;
        }

        let response = await this.$store.dispatch("cartAjax/actCartAjax", {
          method: "post",
          url,
          token,
          params: form,
        });

        if (response.success) {
          this.$store.commit("cartAjax/updateCartDetail", {
            error: null,
            data: response,
          });
          this.$toast.open(response.message);
        } else {
          this.$toast.error(response.message);
        }
      } catch (error) {
        console.log("error form the add coupon foo >>", error);
      }
    },
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

<style scoped>
.empty-head {
  margin-top: -46px;
  margin-bottom: 40px;
}
</style>