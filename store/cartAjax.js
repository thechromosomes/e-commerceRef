export const state = () => ({
  cartApi: "https://dicart.dieselindia.com/api/v1",
  cart_id: "",
  cart_session: "",
  cart_token: "",
  store: 1,
  cart_page_message: "",
  cart_page_error_message: "",
  cart_product: [],
  cart_total: "",
  cart_subtotal: "",
  cod_charge: "",
  shipping_charge: "",
  discount_code: "",
  discount_amount: "",
  address: [],
  address_id: "",
  maddress: {},
  select_address_no: "",
  customer_id: "",
  customer_session: "",
  customer_token: "",
  customerDetail: {},
  registrationMessage: "",
  wishlist: {},
  showLogIn: false,
  discount_code: "",
  gtm_product: [],
});

export const actions = {
  actCartAjax({ rootState, commit, state }, data) {
    if (!data.params.noLoader) {
      commit("updatePageLoader", { display: true }, { root: true });
    }
    // commit("updatePageLoader", { display: true }, { root: true });
    let request = data.params;
    var authOptions = {
      method: data.method,
      url: state.cartApi + data.url,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
      data: request,
    };

    return new Promise((resolve, reject) => {
      this.$axios(authOptions)
        .then((response) => {
          resolve(response.data);

          if (response.data.success == false) {
            commit("removeAllCookies", response.data);
          }

          if (response.data.success) {
            commit("UpdateCartAndCustomer", response.data);
          }
          commit("updatePageLoader", { display: false }, { root: true });
        })
        .catch((error) => {
          console.log("this is from cart actions", error);
          this.$globalError(`this is from cart actions >>> ${error}`);
          reject(error);
          commit("updatePageLoader", { display: false }, { root: true });
        });
    });
  },
};

export const mutations = {
  updateCartDetail(state, { error, data }) {
    try {
      if (error == null) {
        if (data.success === true && data.data.products) {
          state.cart_product = data.data.products;
          state.cart_total = data.data.grand_total;
          state.cart_subtotal = data.data.order_subtotal;
          state.discount_code = data.data.discount_code;
          state.discount_amount = data.data.discount_amount;
          state.address = data.data.address;
          state.maddress = data.data.maddress;
          state.discount_code = data.data.discount_code;
          if (Object.keys(data.data.customer).length != 0) {
            state.customerDetail = data.data.customer;
          }
          if (state.address.length != 0) {
            for (let i = 0; i < state.address.length; i++) {
              if (i == 0) {
                state.address_id = state.address[i].id * 1;
                state.select_address_no = i;
              }
            }
          }
          if (data.data.cart_session) {
            $cookies.set(
              window.location.hostname.substring(10, 4) + "_cart_session",
              data.data.cart_session
            );
            state.cart_session = data.data.cart_session;
          }
          if (data.data.cart_token) {
            $cookies.set(
              window.location.hostname.substring(10, 4) + "_cart_token",
              data.data.cart_token
            );
            state.cart_token = data.data.cart_token;
          }
          if (data.data.cart_id) {
            $cookies.set(
              window.location.hostname.substring(10, 4) + "_cart_id",
              data.data.cart_id
            );
            state.cart_id = data.data.cart_id;
            state.thankyou_cart = data.data.cart_id;
          }
          state.cart_page_message = data.message;

          // set products for the gtm
          state.gtm_product = [];
          for (let i = 0; i < state.cart_product.length; i++) {
            let name = state.cart_product[i].name;
            let id = state.cart_product[i].master_sku;
            let price = state.cart_product[i].selling_price;
            let variant = state.cart_product[i].size;
            let category = state.cart_product[i].category;
            let quantity = state.cart_product[i].qty;
            state.gtm_product.push({
              name,
              id,
              price,
              variant,
              category,
              quantity,
            });
          }
        } else {
          state.cart_page_error_message = "Something went wrong";
        }
      } else {
        state.cart_page_error_message = error;
      }
    } catch (err) {
      console.log("error from cart mutations", err);
      this.$globalError(`error from cart mutations >>> ${err}`);
      state.cart_page_error_message = err;
    }
  },

  // remove cart page message
  removePageMessage(state, { data }) {
    state.cart_page_message = data;
    state.cart_page_error_message = data;
  },

  // update cart data referencing cookies
  updateCartCookieData(state, { form }) {
    state.cart_id = form.cart_id;
    state.cart_session = form.cart_session;
    state.cart_token = form.cart_token;
  },

  // update user information
  updateUserInfo(state, { userData }) {
    state.customer_session = userData.customerSession;
    state.customer_id = userData.customerId;
    state.customer_token = userData.customerToken;
    state.customerDetail = userData.customerDetail;
    state.maddress = userData.maddress;
    state.address = userData.address;
  },

  // update wish list
  updateWishList(state, { payload }) {
    state.wishlist = payload;
  },

  // register user
  registerUser(state, { payload, vm }) {
    try {
      if (payload.success) {
        var {
          customer_session,
          customer,
          products,
          cart_id,
          cart_session,
          address,
          cart_token,
          token,
          grand_total,
        } = payload.data;

        if (customer.id && customer_session && token) {
          $cookies.set(
            window.location.hostname.substring(10, 4) + "_customer_session",
            customer_session
          );
          $cookies.set(
            window.location.hostname.substring(10, 4) + "_customer_id",
            customer.id
          );
          $cookies.set(
            window.location.hostname.substring(10, 4) + "_customer_token",
            token
          );
          state.customer_id = customer.id;
          state.customer_session = customer_session;
          state.customer_token = token;
          state.registrationMessage = payload.message;
        }
        if (Object.keys(customer).length != 0) {
          state.customerDetail = customer;
        }
        if (products && products.length > 0) {
          state.cart_product = products;
          state.cart_total = grand_total;
        }
        if (cart_id && cart_session && cart_token) {
          $cookies.set(
            window.location.hostname.substring(10, 4) + "_cart_session",
            cart_session
          );

          $cookies.set(
            window.location.hostname.substring(10, 4) + "_cart_token",
            cart_token
          );

          $cookies.set(
            window.location.hostname.substring(10, 4) + "_cart_id",
            cart_id
          );
          state.cart_session = cart_session;
          state.cart_id = cart_id;
          state.cart_token = cart_token;
        }
        if (address.length > 0) {
          state.address = address;
          state.address_id = address[0].id;
        }
        vm.$toast.open(payload.message);
        if (state.showLogIn) {
          state.showLogIn = false;
        } else {
          vm.$router.back();
          vm.$router.push("/");
        }
      } else {
        throw "the response status is false";
      }
    } catch (error) {
      console.log("error from register user mutation >>", error);
      this.$globalError(`error from register user mutation >>> ${error}`);
    }
  },

  // update cart address
  updateAddress(state, { payload, vm }) {
    state.address = payload.data.address;
    state.maddress = payload.data.maddress;
    if (payload.data.customer) {
      state.customerDetail = payload.data.customer;
    }
    vm.$toast.open(payload.message);
  },

  // update payment methods
  updatePaymentMethod(state, { payload, vm }) {
    state.cart_subtotal = payload.data.order_subtotal;
    state.cart_total = payload.data.grand_total;
    state.cod_charge = payload.data.cod_charge;
    state.shipping_charge = payload.data.shipping_charge;
    // vm.$toast.open(payload.message);
  },

  // update customer details
  updateCustomerDetail(state, { payload, vm }) {
    state.customerDetail = payload.data;
    vm.$toast.open(payload.message);
  },

  // splice the address array
  spliceAddress(state, { index, customerDetail }) {
    state.address.splice(index, 1);
    state.customerDetail = customerDetail.data;
  },

  // show and hide login component
  toggleLogin(state, { display }) {
    state.showLogIn = display;
  },

  // empty cart after checkout
  flushCart(state) {
    state.cart_id = "";
    state.cart_session = "";
    state.cart_token = "";
    state.cart_product = [];
    state.cart_total = "";
    state.cart_subtotal = "";
    state.cod_charge = "";
    state.shipping_charge = "";
    state.discount_code = "";
    state.discount_amount = "";
    $cookies.remove(window.location.hostname.substring(10, 4) + "_cart_token");
    $cookies.remove(
      window.location.hostname.substring(10, 4) + "_cart_session"
    );
    $cookies.remove(window.location.hostname.substring(10, 4) + "_cart_id");
  },

  // remove all cookies
  removeAllCookies(state, payload) {
    if (payload.data && payload.data.customer_session_status == false) {
      state.customer_session = "";
      state.customer_id = "";
      state.customer_token = "";
      state.cart_session = "";
      state.cart_id = "";
      state.cart_token = "";
      state.wishlist = {};
      state.cart_product = [];
      $cookies.remove(
        window.location.hostname.substring(10, 4) + "_cart_token"
      );
      $cookies.remove(
        window.location.hostname.substring(10, 4) + "_cart_session"
      );
      $cookies.remove(window.location.hostname.substring(10, 4) + "_cart_id");
      $cookies.remove(
        window.location.hostname.substring(10, 4) + "_customer_session"
      );
      $cookies.remove(
        window.location.hostname.substring(10, 4) + "_customer_id"
      );
      $cookies.remove(
        window.location.hostname.substring(10, 4) + "_customer_token"
      );
    } else {
      if (payload.data && payload.data.token_status == false) {
        state.customer_session = "";
        state.customer_id = "";
        state.customer_token = "";
        state.cart_session = "";
        state.cart_id = "";
        state.cart_token = "";
        state.wishlist = {};
        state.cart_product = [];
        $cookies.remove(
          window.location.hostname.substring(10, 4) + "_cart_token"
        );
        $cookies.remove(
          window.location.hostname.substring(10, 4) + "_cart_session"
        );
        $cookies.remove(window.location.hostname.substring(10, 4) + "_cart_id");
        $cookies.remove(
          window.location.hostname.substring(10, 4) + "_customer_session"
        );
        $cookies.remove(
          window.location.hostname.substring(10, 4) + "_customer_id"
        );
        $cookies.remove(
          window.location.hostname.substring(10, 4) + "_customer_token"
        );
      } else {
        if (payload.data && payload.data.cart_session_status == false) {
          state.cart_session = "";
          state.cart_id = "";
          state.cart_token = "";
          state.cart_product = [];
          $cookies.remove(
            window.location.hostname.substring(10, 4) + "_cart_token"
          );
          $cookies.remove(
            window.location.hostname.substring(10, 4) + "_cart_session"
          );
          $cookies.remove(
            window.location.hostname.substring(10, 4) + "_cart_id"
          );
        }
      }
    }
  },

  UpdateCartAndCustomer(state, payload) {
    if (payload.data.cart_token) {
      $cookies.set(
        window.location.hostname.substring(10, 4) + "_cart_session",
        payload.data.cart_session
      );

      $cookies.set(
        window.location.hostname.substring(10, 4) + "_cart_token",
        payload.data.cart_token
      );

      $cookies.set(
        window.location.hostname.substring(10, 4) + "_cart_id",
        payload.data.cart_id
      );

      state.cart_id = payload.data.cart_id;
      state.cart_token = payload.data.cart_token;
      state.thankyou_cart = payload.data.cart_id;
      state.cart_session = payload.data.cart_session;
    }

    if (payload.data.token) {
      $cookies.set(
        window.location.hostname.substring(10, 4) + "_customer_session",
        payload.data.customer_session
      );
      $cookies.set(
        window.location.hostname.substring(10, 4) + "_customer_id",
        payload.data.customer.id
      );
      $cookies.set(
        window.location.hostname.substring(10, 4) + "_customer_token",
        payload.data.token
      );
      state.customer_id = payload.data.customer.id;
      state.customer_session = payload.data.customer_session;
      state.customer_token = payload.data.token;
    }
  },
};
