<template>
  <div>
    <div class="account-page">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <h1 class="title clearfix">My Account</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 col-lg-3 col-12">
            <Sidebar />
          </div>
          <div class="col-md-12 col-lg-9 col-12">
            <div v-if="myOrder.length">
              <div class="table-responsive">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Item</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Discount</th>
                      <th scope="col">Subtotal</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(items, index) in myOrder" :key="index">
                      <td class="list-center-mobile" data-label="Item">
                        <div class="order-list">
                          <div class="order-img">
                            <img
                              :src="items.image"
                              :alt="items.name"
                              :title="items.name"
                            />
                          </div>
                          <div class="order-info">
                            <h2>{{ items.name.toUpperCase() }}</h2>
                            <p v-if="!JSON.parse(items.size).lens">
                              <span>COLOR:</span>
                              <span>{{ JSON.parse(items.size).color }}</span>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td class="align-center" data-label="Price">
                        {{ items.price }}
                      </td>
                      <td class="align-center" data-label="Quantity">
                        {{ items.qty }}
                      </td>
                      <td class="align-center" data-label="Discount">
                        {{ items.discount_amount || `-` }}
                      </td>
                      <td class="align-center" data-label="Subtotal">
                        {{ items.row_total }}
                      </td>
                      <td class="align-center" data-label="Status">
                        {{ items.item_status }}
                      </td>
                      <td class="align-center" data-label="Action">
                        <span
                          style="cursor: pointer"
                          @click="cancelOrder(items.bag_id)"
                          v-if="
                            items.bag_id != null &&
                            items.cancel_item == 1 &&
                            items.bundle_set_id == null &&
                            items.item_status != 'Cancelled'
                          "
                          ><u>cancel</u></span
                        >
                        <span
                          style="cursor: pointer"
                          @click="returnorder(items.bag_id, index)"
                          v-else-if="
                            items.return_item == 1 &&
                            items.bundle_set_id == null
                          "
                          >Return</span
                        >
                        <span v-else> - </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- order details -->
              <!-- order detail -->
              <div class="row">
                <div class="order-detail col-12">
                  <div class="row">
                    <div class="col-12 col-md-6 billing-address content-box">
                      <p>
                        <span class="font-bold"> <strong>Ship To</strong></span
                        ><br />
                        {{ this.shipping_address.name }}<br />
                        {{ this.shipping_address.address }}<br />
                        {{ this.shipping_address.city }},
                        {{ this.shipping_address.state }},
                        {{ this.shipping_address.pincode }}<br />
                        T: {{ this.shipping_address.phone }}
                      </p>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="thankyou-total w-100 content-box">
                        <p>
                          <strong class="font-bold">Subtotal : </strong>
                          <span class="price">
                            Rs.
                            <span id="cart_subtotal">{{
                              this.total
                            }}</span></span
                          >
                        </p>
                        <p>
                          <strong class="font-bold">Discount :</strong>
                          <span class="price">
                            Rs.
                            <span
                              class="price"
                              v-text="this.discount"
                              v-if="
                                this.discount != null && this.discount != ''
                              "
                            ></span
                            ><span class="price" v-else>0</span></span
                          >
                        </p>
                        <p
                          v-if="
                            shipping_charge != null && shipping_charge != '0'
                          "
                        >
                          <strong class="font-bold">Shipping Charges :</strong>
                          <span class="price"> Rs. {{ shipping_charge }}</span>
                        </p>
                        <p v-if="cod_charges != null && cod_charges != '0'">
                          <strong class="font-bold">COD Charges :</strong>
                          <span class="price"> Rs. {{ cod_charges }}</span>
                        </p>
                        <p>
                          <strong class="font-bold">Grand Total :</strong>
                          <span class="price">
                            Rs.
                            <span id="grand_subtotal">{{
                              this.grand_total
                            }}</span></span
                          >
                        </p>
                      </div>
                    </div>
                    <div class="col-12 billing-method content-box">
                      <p>
                        <span class="font-bold">
                          <strong>Payment Method</strong> </span
                        ><br />
                        <span style="text-transform: uppercase">{{
                          this.payment_method
                        }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else style="margin-left: 25%">
              <p>No product found please try adding new products</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- cancel reaspon pop up -->
    <div class="model-bg" v-if="reason_popup || return_popup">
      <div class="modal showModal" id="return_modal">
        <div class="over-flow"></div>
        <div class="modal-dialog" style="max-width: 600px">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title font-bold">Select Reason</h3>
              <button type="button" class="close" @click="hidePopUP()">
                ×
              </button>
            </div>
            <div class="modal-body">
              <form @submit="order_cancel">
                <div class="row mt-3 mb-4">
                  <div class="field col-md-12 col-12">
                    <select
                      class="input-text form-control"
                      v-model="selected_reason"
                      required
                      style="font-size: 16px; line-height: 33px; height: auto"
                    >
                      <option value="">--Select Reason--</option>
                      <option v-for="(reason, i) in reason" :value="i" :key="i">
                        {{ reason.reason }}
                      </option>
                    </select>
                  </div>

                  <!-- cod form -->
                  <template v-if="return_popup && payment_method == 'cod'">
                    <div class="field col-md-6 col-12 mt-3">
                      <input
                        type="text"
                        placeholder="Account Number*"
                        v-model="account_no"
                        autocomplete="off"
                        class="input-text form-control"
                        required
                      />
                    </div>
                    <div class="field col-md-6 col-12 mt-3">
                      <input
                        type="text"
                        placeholder="Re-enter Account Number*"
                        v-model="re_account_no"
                        autocomplete="off"
                        class="input-text form-control"
                        required
                      />
                    </div>
                    <div class="field col-md-6 col-12 mt-3">
                      <input
                        type="text"
                        placeholder="Account Holder Name*"
                        v-model="account_holder"
                        autocomplete="off"
                        class="input-text form-control"
                        required
                      />
                    </div>
                    <div class="field col-md-6 col-12 mt-3">
                      <input
                        type="text"
                        placeholder="IFSC Code*"
                        v-model="ifsc_code"
                        autocomplete="off"
                        class="input-text form-control"
                        required
                      />
                    </div>
                  </template>
                  <!-- cod from End -->  
                  <div class="field col-md-4 col-12 mt-2 text-right w-100">
                    <button class="w-100 submit sp-black-btn">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Sidebar from "@/components/my-account/Sidebar.vue";
export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      myOrder: [],
      cart_id: "",
      selected_reason: "",
      reason: [],
      returnReason: [],
      reason_popup: false,
      products: [],
      cancel_id: "",
      payment_method: "",
      order_no: "",
      shipping_charge: "",
      grand_total: "",
      cod_charge: "",
      cod_charges: "",
      discount: "",
      status: "",
      total: "",
      order_date: "",
      showCOD: "",
      return_popup: false,
      selected_bagId: "",
      return_id: "",
      select_resion: "",
      account_no: "",
      re_account_no: "",
      account_holder: "",
      bank_name: "",
      branch_name: "",
      ifsc_code: "",
      qty: 1,
      shipping_address: {
        name: "",
        address: "",
        pincode: "",
        city: "",
        state: "",
        phone: "",
      },
    };
  },

  mounted() {
    if (
      this.$store.state.cartAjax.customer_session == "" &&
      this.$store.state.cartAjax.customer_id == ""
    ) {
      this.$router.push("/login");
      return;
    }
    this.getOrder();
  },

  methods: {
    async getOrder() {
      try {
        if (
          this.$store.state.cartAjax.customer_id == "" &&
          this.$store.state.cartAjax.customer_session == ""
        ) {
          this.$router.push("/login");
          return;
        }
        let form = {
          customer_id: this.$store.state.cartAjax.customer_id,
          customer_session: this.$store.state.cartAjax.customer_session,
          store: this.$store.state.list.store,
          order_id: this.$route.params.orderDetail,
        };

        let response = await this.$store.dispatch("cartAjax/actCartAjax", {
          method: "post",
          url: `/customer/order-details`,
          token: this.$store.state.cartAjax.customer_token,
          params: form,
        });

        if (response.success) {
          this.myOrder = response.data.products;
          this.cart_id = response.data.order_quote_id;
          this.total = response.data.order_subtotal;
          this.payment_method = response.data.payment_method;
          this.order_no = response.data.fynd_order_id;
          this.showCOD = response.data.showCOD;
          this.cod_charges = response.data.cod_charge;
          this.grand_total = response.data.grand_total;
          this.discount = response.data.discount_amount;
          this.shipping_charge = response.data.shipping_charge;
          this.order_id = response.data.order_quote_id;
          this.status = response.data.status;
          this.order_date = response.data.order_date;
          this.shipping_address.name = response.data.maddress.full_name;
          this.shipping_address.address = response.data.maddress.street_address;
          this.shipping_address.pincode = response.data.maddress.pin_code;
          this.shipping_address.city = response.data.maddress.city;
          this.shipping_address.state = response.data.maddress.state;
          this.shipping_address.phone = response.data.maddress.phone;
        } else {
          throw `error form the api ${response.message}`;
        }
      } catch (error) {
        this.$globalError(`this is from getOrder (order detail) >>>> ${error}`);

        if (error.message === "Network Error") {
          this.$toast.error(
            "Oops there seems to be some Network issue, please try again."
          );
        }
        console.log("error form the get order page", error);
      }
    },

    // cancel order pop up
    cancelOrder(cart_id) {
      this.cancel_id = cart_id;
      var form = {};
      form.customer_id = this.$store.state.cartAjax.customer_id;
      form.customer_session = this.$store.state.cartAjax.customer_session;
      form.action = "cancel";
      form.bag_id = cart_id;
      this.$store
        .dispatch("cartAjax/actCartAjax", {
          method: "post",
          url: `/order/get-cancel-return-reasons`,
          token: this.$store.state.cartAjax.customer_token,
          params: form,
        })
        .then((response) => {
          if (response.success === true) {
            this.reason = response.data;
            this.reason_popup = true;
          } else {
            this.$toast.error(response.message);
          }
        })
        .catch((error) => {
          if (error.message === "Network Error") {
            this.$toast.error(
              "Oops there seems to be some Network issue, please try again."
            );
          }
        });
    },

    // cancle order for sure
    order_cancel(e) {
      e.preventDefault();

      if (this.reason_popup) {
        this.cancelThisOrder();
      } else {
        this.returnThisOrder();
      }
    },

    // order cancel follow function
    cancelThisOrder() {
      var form = {};

      form.customer_id = this.$store.state.cartAjax.customer_id;
      form.customer_session = this.$store.state.cartAjax.customer_session;
      form.reason_id = this.reason[this.selected_reason].reason_id;
      form.action = "cancel";
      form.bag_id = this.cancel_id;
      this.$store
        .dispatch("cartAjax/actCartAjax", {
          method: "post",
          url: `/order/cancel-item`,
          token: this.$store.state.cartAjax.customer_token,
          params: form,
        })
        .then((response) => {
          if (response.success === true) {
            this.reason_popup = false;
            this.$toast.success(response.message);
            this.getOrder();
          } else {
            this.$toast.error(response.message);
          }
        })
        .catch((error) => {
          if (error.message === "Network Error") {
            this.$toast.error(
              "Oops there seems to be some Network issue, please try again."
            );
          }
        });
    },

    // return this order
    returnThisOrder() {
      if (this.account_no == this.re_account_no) {
        if (this.ifsc_code != "") {
          axios
            .get(`https://ifsc.razorpay.com/${this.ifsc_code}`)
            .then((response) => {
              this.bank_name = response.data.BANK;
              this.branch_name = response.data.BRANCH;
              this.cod_refund();
            })
            .catch((error) => {
              this.$toast.error("Please Enter Correct IFSC Code");
            });
        } else {
          this.request_return();
        }
      } else {
        this.$toast.error("Your Account Number Does not Match");
      }
    },

    request_return() {
      if (
        this.$store.state.cartAjax.customer_id != null &&
        this.$store.state.cartAjax.customer_id != ""
      ) {
        var form = {};
        form.bag_id = this.selected_bagId;
        form.customer_id = this.$store.state.cartAjax.customer_id;
        form.customer_session = this.$store.state.cartAjax.customer_session;
        form.action = "return";
        form.qty = this.qty;
        form.reason_id = this.reason[this.selected_reason].reason_id;
        form.return_reasons = this.reason[this.selected_reason].reason;

        this.$store
          .dispatch("cartAjax/actCartAjax", {
            method: "post",
            token: this.$store.state.cartAjax.customer_token,
            url: `/customer/return-request`,
            params: form,
          })
          .then((response) => {
            if (response.success === true) {
              if (this.ifsc_code != "") {
                this.cod_refund();
              }
              this.return_id = "";
              (this.selected_bagId = ""), (this.select_resion = "");
              this.return_popup = true;
              this.$toast.success(response.message);
              this.getOrder();
            } else {
              this.$toast.error(response.message);
            }
          })
          .catch((error) => {
            if (error.message === "Network Error") {
              this.$store.state.error_message = error.message;
            }
            window.scrollTo(0, 0);
          });
      }
    },
    cod_refund() {
      var form = new FormData();
      form.append("cart_id", this.cart_id);
      form.append("account_holder", this.account_holder);
      form.append("account_no", this.account_no);
      form.append("bank_name", this.bank_name);
      form.append("branch_name", this.branch_name);
      form.append("ifsc_code", this.ifsc_code);
      form.append("customer_id", this.$store.state.cartAjax.customer_id);
      form.append(
        "customer_session",
        this.$store.state.cartAjax.customer_session
      );
      this.$store
        .dispatch("cartAjax/actCartAjax", {
          method: "post",
          token: this.$store.state.cartAjax.customer_token,
          url: `/customer/cod-return`,
          params: form,
        })
        .then((response) => {
          this.request_return();
          this.account_holder = "";
          this.account_no = "";
          this.re_account_no = "";
          this.bank_name = "";
          this.branch_name = "";
          this.ifsc_code = "";
        });
    },
    returnorder(cart_id, v) {
      this.selected_bagId = cart_id;
      this.return_id = v;
      this.cancel_id = cart_id;
      var form = {};
      form.customer_id = this.$store.state.cartAjax.customer_id;
      form.customer_session = this.$store.state.cartAjax.customer_session;
      form.action = "return";
      form.bag_id = cart_id;
      this.$store
        .dispatch("cartAjax/actCartAjax", {
          method: "post",
          token: this.$store.state.cartAjax.customer_token,
          url: `/order/get-cancel-return-reasons`,
          params: form,
        })
        .then((response) => {
          if (response.success === true) {
            this.reason = response.data;
            this.return_popup = true;
          } else {
            this.$toast.error(response.message);
          }
        })
        .catch((error) => {
          if (error.message === "Network Error") {
            this.$toast.error(
              "Oops there seems to be some Network issue, please try again."
            );
          }
        });
    },

    hidePopUP() {
      this.reason_popup = false;
      this.return_popup = false;
    },
  },
};
</script>
<style scoped>
@import url("@/assets/css/pages-css/myAccount.css");
</style>
