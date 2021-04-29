<template>
  <client-only>
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
            class="cur-or cus-order-del cus-ore rte"
            v-if="Object.keys(customer).length != 0"
          >
            <div class="customer-head">
              <h2 class="customer-name">hi, {{ customer.full_name }}!</h2>
              <p>
                you can review and edit your account settings and orders here
              </p>
            </div>
            <aside>
              <section class="my-profile">
                <div class="profile-content">
                  <div class="img">
                    <img
                      src="@/assets/img/profile.png"
                      alt="My Profile Icon"
                    />
                  </div>
                  <div class="profile-data">
                    <h2>my profile</h2>
                    <h3>profile information</h3>
                    <p class="name">
                      name: <span>{{ customer.full_name }}</span>
                    </p>
                    <p class="email">
                      email: <span>{{ customer.email }}</span>
                    </p>
                    <p class="password">password: <span>*******</span></p>
                    <div class="hr-small"></div>
                    <div class="edit">
                      <nuxt-link to="/EditProfile">edit my profile</nuxt-link>
                    </div>
                  </div>
                </div>
              </section>
              <section class="my-addressbook">
                <div class="profile-content">
                  <div class="img">
                    <img
                      src="@/assets/img/addressbook.png"
                      alt="My Addressbook Icon"
                    />
                  </div>
                  <div class="profile-data">
                    <h2>My Address book</h2>
                    <p class="name">
                      name: <span>{{ customer.full_name }}</span>
                    </p>
                    <p class="address">
                      address:
                      <span
                        class="add-data"
                        v-if="
                          typeof maddress == 'object' &&
                          maddress !== null &&
                          Object.keys(maddress).length != 0
                        "
                        >{{
                          `${maddress.city}, ${maddress.state},  ${maddress.street_address}, ${maddress.pin_code}`
                        }}</span
                      >
                      <span v-else> No active address </span>
                    </p>
                    <div class="hr-small"></div>
                    <div class="edit">
                      <NuxtLink to="/addresses">View Address book</NuxtLink>
                    </div>
                  </div>
                </div>
              </section>
            </aside>
            <div class="hr"></div>
          </div>
          <div v-else>
            <NuxtLink to="/login">
              <p>
                Seems you did not log in yet. Please head back to the log in
                page
              </p>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>
<script>
import Sidebar from "@/components/my-account/Sidebar.vue";
import { mapState } from "vuex";

export default {
  components: {
    Sidebar,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      customer: (state) => state.cartAjax.customerDetail,
      maddress: (state) => state.cartAjax.maddress,
    }),
  },
  beforeMount() {
    if (
      this.$store.state.cartAjax.customer_session == "" &&
      this.$store.state.cartAjax.customer_id == ""
    ) {
      this.$router.push("/login");
    }
  },
};
</script>
<style scoped>
@import url("@/assets/css/pages-css/myAccount.css");
</style>
