// generating token for the api call and fetching CMS data for the home page

export default async (context) => {
  try {
    // update mobile information
    await context.store.commit("updateDeviceInfo", {
      payload: context.$device.isMobile,
    });

    // fetching user detail form the cookies
    let customerSession = $cookies.get(
      window.location.hostname.substring(10, 4) + "_customer_session"
    );

    let customerId = $cookies.get(
      window.location.hostname.substring(10, 4) + "_customer_id"
    );

    let customerToken = $cookies.get(
      window.location.hostname.substring(10, 4) + "_customer_token"
    );

    if (customerSession && customerId && customerToken) {
      let userData = {
        customerId,
        customerSession,
        customerToken,
      };
      let userInfo = await context.store.dispatch("cartAjax/actCartAjax", {
        method: "post",
        url: `/customer/account-details`,
        token: context.store.state.cartAjax.customer_token,
        params: {
          customer_id: customerId,
          store: 1,
          customer_session: customerSession,
        },
      });

      if (userInfo.success) {
        userData.address = userInfo.data.address;
        userData.maddress = userInfo.data.maddress;
        userData.customerDetail = userInfo.data;

        await context.store.commit("cartAjax/updateUserInfo", { userData });
      }
    }

    // fetch cart detail via cookies

    let cartSession = $cookies.get(
      window.location.hostname.substring(10, 4) + "_cart_session"
    );

    let cartId = $cookies.get(
      window.location.hostname.substring(10, 4) + "_cart_id"
    );

    let cartToken = $cookies.get(
      window.location.hostname.substring(10, 4) + "_cart_token"
    );

    if (cartSession && cartId && cartToken) {
      var form = {
        cart_id: cartId,
        cart_session: cartSession,
        cart_token: cartToken,
        customer_session: customerSession,
        customer_id: customerId,
      };

      await context.store.commit("cartAjax/updateCartCookieData", { form });
      let response = await context.store.dispatch("cartAjax/actCartAjax", {
        method: "post",
        url: `/cart/get-cart`,
        token: context.store.state.cartAjax.cart_token,
        params: form,
      });

      if (response) {
        context.store.commit("cartAjax/updateCartDetail", {
          error: null,
          data: response,
        });
      } else {
        throw "no response from api " + response.message;
      }
    }

    // fetch wish list
    if ((customerSession && customerId && customerToken)) {
      let response = await context.store.dispatch("cartAjax/actCartAjax", {
        method: "post",
        url: `/wishlist/customer-wishlist`,
        token: context.store.state.cartAjax.customer_token,
        params: { customer_id: customerId, customer_session: customerSession },
      });
      if (response.success) {
        context.store.commit("cartAjax/updateWishList", {
          payload: response.data,
        });
      } else {
        throw "no response from api " + response.message;
      }
    }
  } catch (error) {
    console.log("there is an error from fetchCookies plugin >>> ", error);
    context.$globalError(
      `there is an error from fetchCookies plugin >>> ${error}`
    );
  }
};
