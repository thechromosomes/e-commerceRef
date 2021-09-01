<template>
  <div class="container track-order-wraper">
    <section class="order-status-sec">
      <h2 class="text-center">ENTER THE ORDER NO</h2>
      <div class="order-staus-con">
        <small class="text-center">your order no*</small>
        <form>
          <input
            type="text"
            placeholder="Order id here"
            ref="order_id"
            v-model="order_id"
            class="order-id"
          />
          <button @click.prevent="getOrder()">Continue</button>
        </form>
      </div>
    </section>
    <!-- =============================== orderr id section ================== -->
    <section class="track-id-sec" v-if="showProductDetail">
      <template v-for="(order, index) in orders">
        <div class="orderid-text" :key="index">
          <h3><span>ORDER ID:</span> {{ order.order_id }}</h3>
          <p>Placed at {{ order.order_created_time }}</p>
        </div>
        <div
          class="order-progress-bar-div"
          :key="trackIndex + 'trackIndex'"
          v-for="(item, trackIndex) in order.shipments"
        >
          <div
            class="order-progress-bar-left"
            :key="trackIndexR + 'trackIndexR'"
            v-for="(itemR, trackIndexR) in item.bags"
          >
            <div class="track-order-sidebar active">
              <img
                :src="itemR.item.image[0]"
                title="The Green Navigator Shirt"
              />
              <h4 class="font-bold">{{ itemR.item.name }}</h4>
            </div>
          </div>
          <div
            class="order-progress-right"
            v-for="(items, rIndex) in item.bags_for_reorder"
            :key="rIndex + 'rIndex'"
          >
            <div class="progres-wizrd">
              <ol class="progtrckr">
                <template v-for="(status, sIndex) in items.bag_status">
                  <li
                    class="progtrckr-done active"
                    :key="sIndex + 'sIndex'"
                    v-if="status.bag_state_mapper.notify_customer == true"
                    :class="{ red: status.status == 'cancelled_customer' }"
                  >
                    <span
                      ><span class="font-bold">{{
                        status.bag_state_mapper.display_name
                      }}</span
                      ><span>{{ status.created_at.split("T")[0] }}</span></span
                    >
                  </li>
                </template>
              </ol>
            </div>
          </div>
        </div>
      </template>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showProductDetail: false,
      order_id: "",
      orders: [],
    };
  },
  methods: {
    async getOrder() {
      if (this.order_id == "") {
        this.$refs.order_id.focus();
        return;
      }
      this.$root.page_loader = true;
      var form = {};
      form.order_id = this.order_id;
      this.$store
        .dispatch("cartAjax/actCartAjax", {
          method: "post",
          url: `/cart/track-order`,
          params: form,
        })
        .then((response) => {
          if (response.success === true) {
            this.showProductDetail = true;
            this.orders = response.data.orders;
          } else {
            this.$toast.error(response.message);
          }
        });
    },
  },

  mounted() {
    if (
      this.$store.state.cartAjax.customer_id == "" &&
      this.$store.state.cartAjax.customer_session == "" 
    ) {
      alert(this.$store.state.cartAjax.customer_id);
      this.$router.push("/login");
      return;
    }
  },
};
</script>
<style scoped>
@import url("@/assets/css/pages-css/trackOrder.css");
</style>
