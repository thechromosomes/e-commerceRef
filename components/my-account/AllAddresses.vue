<template>
  <client-only>
    <div class="ship-adress">
      <h2>Shipping Address</h2>
      <template v-if="$store.state.cartAjax.address.length">
        <div
          class="ship-adress-area"
          v-for="(item, index) in $store.state.cartAjax.address"
          :key="index"
        >
          <div>
            <div>
              <p><strong>{{ `${item.full_name}, ${item.phone}` }}</strong></p>
              <p>
                {{
                  `${item.street_address}, ${item.state}, ${item.city},  ${item.pin_code}`
                }}
              </p>
              <p>{{ `Address Type: ${item.address_type}` }}</p>
            </div>
          </div>
          <div class="remove-address">
            <a @click.prevent="removeAddress(index, item.id)">
              <img src="@/assets/img/remove.webp" alt="Remove" />
            </a>
            <a @click.prevent="$emit('editAddress', item)">
              <img src="@/assets/img/edit.svg" alt="edit" width="30px" />
            </a>
          </div>
        </div>
      </template>
      <template v-else >
        <div style="margin-bottom:10px;">
          <h4>Ahh! No address added yet. please try adding new address</h4>
        </div>
      </template>
      <button @click="$parent.showAddressform()">+ Add new address</button>
    </div>
  </client-only>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    // delete address
    async removeAddress(index, id) {
      try {
        var form = {};
        form.address_id = id;
        form.cart_id = this.$store.state.cartAjax.cart_id;
        form.cart_session = this.$store.state.cartAjax.cart_session;
        form.customer_id = this.$store.state.cartAjax.customer_id;
        form.customer_session = this.$store.state.cartAjax.customer_session;

        let response = await this.$store.dispatch("cartAjax/actCartAjax", {
          method: "post",
          url: `/customer/delete-address`,
          token: this.$store.state.cartAjax.customer_token,
          params: form,
        });

        if (response.success) {
          this.$toast.success(response.message);
          this.$store.commit("cartAjax/spliceAddress", {
            index,
            customerDetail: response,
          });
        } else {
          throw `error from api ${response.message}`;
        }
      } catch (error) {
        console.log("error from delete address page", error);
      }
    },

    editAddress(item) {
      this.$emit("clicked-show-detail", product);
    },
  },
  mounted() {
    if (
      this.$store.state.cartAjax.customer_id == "" &&
      this.$store.state.cartAjax.customer_session == ""
    )
      return this.$router.push("/login");
  },
};
</script>
<style scoped>
@import url("@/assets/css/pages-css/myAccount.css");
</style>