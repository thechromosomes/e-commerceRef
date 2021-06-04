<template>
  <div>
    <div class="cart">
      <div class="headding">
        <h4>Added to bag</h4>
        <span class="remove-icontop"></span>
        <hr />

        <div
          class="product-summary"
          v-for="(product, index) in $store.state.cartAjax.cart_product"
          :key="index"
        >
          <div class="product-cart">
            <div class="p-img">
              <nuxt-link :to="`/product/${product.url_key}`">
                <img :src="product.image" alt="img" class="w-100" />
              </nuxt-link>
            </div>
            <div class="p-name">
              <nuxt-link :to="`/product/${product.url_key}`">
                <span class="name">{{ product.name }}</span>
                <span class="price">MRP ₹{{ product.price }}</span>
              </nuxt-link>
            </div>
            <span class="p-remove  ">
              <span
                class="remove-icon"
                @click.prevent="removeCartItem(product)"
              ></span>
            </span>
          </div>
        </div>
        <hr />
        <div class="row estimated-total ">
          <div class="col-8">
            <span class="d-block tax-label">VAT</span>
            <span class="d-block sub-total-label">Order Total</span>
          </div>
          <div class="col-4">
            <span class="d-block tax-total">Included</span>
            <span class="d-block sub-total"
              >₹{{ $store.state.cartAjax.cart_total }}</span
            >
          </div>
        </div>
        <div class="row">
          <div class="col-12 checkout-continue">
            <div>
              <a
                href="#"
                class="button primary-btn d-block checkout-btn "
                role="button"
                aria-pressed="true"
                @click.prevent="() => $router.push('/checkout')"
              >
                Go to checkout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
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
          params: form
        });
        if (response) {
          this.$store.commit("cartAjax/updateCartDetail", {
            error: null,
            data: response,
            vm: this
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
                      quantity: item.qty
                    }
                  ]
                }
              }
            });
          }
        } else {
          throw "no response from api";
        }
      } catch (error) {
        this.$globalError(`error from remove cart >>>> ${error}`);
        console.log("error from remove cart >>>", error);
      }
    }
  },
  watch: {
    "$store.state.cartAjax.cart_page_message": function() {
      if (
        this.$store.state.cartAjax.cart_page_message != "" &&
        this.$store.state.cartAjax.cart_page_message != null
      ) {
        this.$toast.open(this.$store.state.cartAjax.cart_page_message);
        this.$store.commit("cartAjax/removePageMessage", {
          data: ""
        });
      }
    },
    "$store.state.cartAjax.cart_page_erro_page": function() {
      if (
        this.$store.state.cartAjax.cart_page_error_message != "" &&
        this.$store.state.cartAjax.cart_page_error_message != null
      ) {
        this.$toast.error(this.$store.state.cartAjax.cart_page_error_message);
        this.$store.commit("cartAjax/removePageMessage", {
          data: ""
        });
      }
    }
  }
};
</script>
