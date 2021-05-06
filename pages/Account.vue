<template>
  <client-only>
    <div>
      <div class="address-page">
        <div class="container">
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
              <div class="address">
                <a
                  href="#"
                  class="add-new-address button"
                  @click.prevent="showAddressform"
                  ><b> + Add a new address</b></a
                >
              </div>

              <div class="customer_address edit_address" v-if="showForm">
                <form>
                  <h4 id="add_address_title">Add a new address</h4>
                  <div class="row">
                    <div class="col-md-6 col-12">
                      <label for="address_first_name_new">First Name</label>
                      <input
                        type="text"
                        id="address_first_name_new"
                        class="address_form form-control"
                        autocomplete="off"
                      />
                    </div>
                    <div class="col-md-6 col-12">
                      <label for="address_last_name_new">Last Name</label>
                      <input
                        type="text"
                        id="address_last_name_new"
                        class="address_form form-control"
                        size="40"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4 col-12">
                      <label for="address_address1_new">Company </label>
                      <input
                        type="text"
                        for="address_company_new"
                        class="address_form form-control"
                        value=""
                        size="40"
                        id="ispbxii_5"
                        autocomplete="off"
                      />
                    </div>
                    <div class="col-md-4 col-12">
                      <label for="address_address1_new">Address 1</label>
                      <input
                        type="text"
                        id="address_address1_new"
                        class="address_form form-control"
                        size="40"
                        autocomplete="off"
                      />
                    </div>
                    <div class="col-md-4 col-12">
                      <label for="address_address2_new">Address2</label>
                      <input
                        type="text"
                        id="address_address2_new"
                        class="address_form form-control"
                        size="40"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 col-12">
                      <label for="address_city_new">City</label>
                      <input
                        type="text"
                        id="address_city_new"
                        class="address_form form-control"
                        value=""
                        size="40"
                        autocomplete="off"
                      />
                    </div>
                    <div class="col-md-6 col-12">
                      <label for="address_country_new">Country</label>
                      <select id="address_country_new" class="form-control">
                        <option value="">Select</option>
                      </select>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 col-12">
                      <label for="address_province_new">Province</label>
                      <select
                        id="address_province_new"
                        class="address_form form-control"
                      >
                        <option value="Alabama">Alabama</option>
                      </select>
                    </div>
                    <div class="col-md-6 col-12">
                      <label for="address_zip_new">Zip</label>
                      <input
                        type="text"
                        id="address_zip_new"
                        class="address_form form-control"
                        size="40"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 col-12">
                      <label for="address_phone_new">Phone</label>
                      <input
                        type="text"
                        id="address_phone_new"
                        class="address_form form-control"
                        size="40"
                        autocomplete="off"
                      />
                    </div>
                    <div class="col-md-6 col-12">
                      <div class="default-address">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="new-address"
                        />
                        <label class="form-check-label" for="new-address"
                          >Set as Default Address?</label
                        >
                      </div>
                    </div>
                  </div>

                  <div class="action_bottom text-center">
                    <input
                      class="btn new-btn"
                      type="submit"
                      value="Add Address"
                      onfocus="jQuery(this).css({'opacity':'0.6'})"
                      onblur="jQuery(this).css({'opacity':'1'})"
                    />
                    <span class="note">
                      <a
                        href="#"
                        onclick="Shopify.CustomerAddress.toggleNewForm(); return false;"
                        >Cancel</a
                      ></span
                    >
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>
<script>
import Sidebar from "@/components/my-account/Sidebar.vue";
export default {
  components: {
    Sidebar
  },

  data() {
    return {
      showForm: false
    };
  },
  methods: {
    showAddressform() {
      this.showForm = !this.showForm;
    }
  },

  beforeMount() {
    if (
      this.$store.state.cartAjax.customer_session == "" &&
      this.$store.state.cartAjax.customer_id == ""
    ) {
      this.$router.push("/login");
    }
  }
};
</script>
<style scoped>
@import url("@/assets/css/pages-css/myAccount.css");
</style>
