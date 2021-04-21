<template>
  <div class="thank-you-page thnk-you table">
    <div class="page_container">
      <div class="checkout-success">
        <h3>YAY, YOU JUST MADE AN AWESOME PURCHASE!</h3>
        <p class="email-success">
          You will be receiving a confirmation email from us soon.
        </p>
      </div>
      <div class="order-short-details">
        <p class="details"><b>Order Date:</b> {{ order_date }}</p>
        <p class="details"><b>Status:</b> {{ status }}</p>
        <p class="details"><b>Your Order Number:</b> {{ order_no }}</p>
        <p class="details">
          <b> Deliver To: </b> {{ this.shipping_address.name }},
          {{ this.shipping_address.address }}, {{ this.shipping_address.city }},
          {{ this.shipping_address.state }}, {{ this.shipping_address.pincode
          }}<br />
          T: {{ this.shipping_address.phone }}
        </p>
      </div>
      <div class="order-details-wrap">
        <div class="order-details">
          <div class="order-id">
            <div class="id-inline">
              <h2 class="id-in">Order Summary</h2>
            </div>
          </div>
          <div>
            <div class="table-container">
              <table
                style="border-collapse: collapse; margin-bottom: 15px"
                role="presentation"
                width="100%"
                border="0"
              >
                <tbody>
                  <tr>
                    <th scope="col">
                      <h3><strong>Order Information</strong></h3>
                    </th>
                    <th scope="col">
                      <h3><strong>Billing Address</strong></h3>
                    </th>
                    <th scope="col">
                      <h3><strong>Payment Method</strong></h3>
                    </th>
                    <th scope="col">
                      <h3><strong>Payment Total</strong></h3>
                    </th>
                  </tr>
                  <tr>
                    <td scope="row">
                      <strong>Order Date:</strong> {{ order_date }}
                    </td>
                    <td scope="row">
                      {{ this.shipping_address.name }},
                      {{ this.shipping_address.address }},
                      {{ this.shipping_address.city }},
                      {{ this.shipping_address.state }},
                      {{ this.shipping_address.pincode }}<br />
                      T: {{ this.shipping_address.phone }}
                    </td>
                    <td scope="row">
                      <strong>Payment Method:</strong> {{ payment_method }}
                    </td>
                    <td scope="row">
                      <strong>Subtotal</strong> ₹ {{ sub_total }}
                    </td>
                  </tr>
                  <tr>
                    <td scope="row"><strong>Status:</strong> {{ status }}</td>
                    <td scope="row"></td>
                    <td scope="row"></td>
                    <td scope="row">
                      <strong>Delivery Charge</strong> ₹
                      {{ $store.state.cartAjax.cod_charge }}
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">
                      <strong>Your Order Number:</strong> 2000023490
                    </td>
                    <td scope="row"></td>
                    <td scope="row"></td>
                    <td scope="row">
                      <strong>Order Total</strong> ₹ {{ total }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="show-order mc-show">
            <b class="mc-show-header">Delivery Information</b>

            <table
              style="border-collapse: collapse; margin-bottom: 15px"
              role="presentation"
              width="100%"
              border="0"
              class="Delivery-Information"
            >
              <tbody>
                <tr>
                  <th scope="col">
                    <h3><strong>Item</strong></h3>
                  </th>
                  <th scope="col">
                    <h3><strong>Item Price</strong></h3>
                  </th>
                  <th scope="col">
                    <h3><strong>Quantity</strong></h3>
                  </th>
                  <th scope="col">
                    <h3><strong>Sub Total</strong></h3>
                  </th>
                </tr>
                <tr v-for="(item, index) in order" :key="index">
                  <td scope="row">
                    <div>
                      <img class="" :src="item.image" alt="BPLAYED" />
                      <span>{{ item.name }}</span>
                    </div>
                  </td>
                  <td scope="row">₹ {{ item.price }}</td>
                  <td scope="row">{{ item.qty }}</td>
                  <td scope="row">₹ {{ sub_total }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      order: [],
      total: "",
      sub_total: "",
      shipping_charge: "",
      cod_chaeges: "",
      order_date: "",
      shipping_address: {
        name: "",
        address: "",
        pincode: "",
        city: "",
        state: "",
        phone: "",
      },
      payment_method: "",
      order_no: "",
      total_discount_amount: "",
      status: "",
      discount_code: "",
      gtm_product: [],
      delivery_msg: "",
      wigzo_sku: [],
      team_sku: "",
    };
  },

  methods: {
    getOrder() {
      var form = {};
      form.cart_id = this.$store.state.cartAjax.cart_id;
      form.cart_session = this.$store.state.cartAjax.cart_session;
      form.customer_id = this.$store.state.cartAjax.customer_id;
      form.customer_session = this.$store.state.cartAjax.customer_session;
      this.$store
        .dispatch("cartAjax/actCartAjax", {
          method: "post",
          url: `/order/get-order`,
          token: this.$store.state.cartAjax.customer_token,
          params: form,
        })
        .then((response) => {
          if (response.success === true) {
            this.order = response.data.products;
            this.total = response.data.grand_total;
            this.sub_total = response.data.order_subtotal;
            this.cod_chaeges = response.data.cod_charge;
            this.shipping_charges = response.data.shipping_charge;
            this.discount_code = response.data.discount_code;
            this.payment_method = response.data.payment_method;
            this.order_no = response.data.fynd_order_id;
            this.status = response.data.status;
            this.order_date = response.data.order_date;
            this.shipping_address.name = response.data.maddress.full_name;
            this.shipping_address.address =
              response.data.maddress.street_address;
            this.shipping_address.pincode = response.data.maddress.pin_code;
            this.shipping_address.city = response.data.maddress.city;
            this.shipping_address.state = response.data.maddress.state;
            this.shipping_address.phone = response.data.maddress.phone;
            this.delivery_msg = response.data.delivery;
            this.total_discount_amount = response.data.discount_amount;
            this.$gtm.push({
              event: "track-transaction",
              category: "Ecommerce",
              action: "Purchase",
              label: this.order_no,
              ecommerce: {
                purchase: {
                  actionField: {
                    id: this.order_no,
                    affiliation: "",
                    revenue: this.total,
                    tax: "0",
                    shipping: "0",
                    coupon: this.discount_code,
                  },
                  products: this.$store.state.cartAjax.gtm_product,
                },
              },
            }),
              this.$store.commit("cartAjax/flushCart");
          } else {
            this.$router.push("/");
          }
        });
    },
  },
  mounted() {
    this.getOrder();
  },
};
</script>
<style scoped>
@import url("@/assets/css/pages-css/thankyou.css");
</style>