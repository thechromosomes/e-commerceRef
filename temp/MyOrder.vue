<template>
  <div>
    <div class="container acc-page">
      <div class="row">
        <div class="span12">
          <h1 class="title clearfix">My Account</h1>
        </div>
      </div>
      <div class="row new-ord same-table clearboth">
        <!-- side bar code -->
        <Sidebar />
        <div
          class="cur-or cus-order-del cus-ore rte profile-data"
          v-if="myOrders.length > 0"
        >
          <table
            style="border-collapse: collapse; margin-bottom: 15px"
            role="presentation"
            width="100%"
            border="0"
            class="Delivery-Information table_responsive"
          >
            <thead>
              <tr>
                <th scope="col">Order#</th>
                <th scope="col">Date</th>
                <th scope="col">Ship To</th>
                <th scope="col">Order Total</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in myOrders" :key="index">
                <td class="align-center" data-label="Order#">
                  {{ item.fynd_order_id }}
                </td>
                <td class="align-center" data-label="Date">
                  {{ item.order_date }}
                </td>
                <td class="align-center" data-label="Ship To">
                  {{ item.shipping_name }}
                </td>
                <td class="align-center" data-label="Order Total">
                  {{ item.order_subtotal }}
                </td>
                <td class="align-center" data-label="Action">
                  <NuxtLink :to="`/order/${item.order_quote_id}`"
                    >View & Track</NuxtLink
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <h3>
            No order forund please head to product page and get awesome product!
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "@/components/my-account/Sidebar.vue";
export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      myOrders: [],
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
        };

        let response = await this.$store.dispatch("cartAjax/actCartAjax", {
          method: "post",
          url: `/customer/account-details`,
          token: this.$store.state.cartAjax.customer_token,
          params: form,
        });

        if (response.success) {
          this.myOrders = response.data.orders;
        } else {
          throw `error form the api ${response.message}`;
        }
      } catch (error) {
        this.$globalError(`this is from getOrder (track order) >>>> ${error}`);

        if (error.message === "Network Error") {
          this.$toast.error(
            "Oops there seems to be some Network issue, please try again."
          );
        }
        console.log("error form the get order page", error);
      }
    },
  },
};
</script>
<style scoped>
@import url("@/assets/css/pages-css/myAccount.css");
</style>
