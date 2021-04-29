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
          <!-- side bar code end -->
          <div class="inner-login">
            <div class="login-col col-1">
              <div id="address_tables">
                <div class="inner_address"></div>
                <div id="address_pagination"></div>
              </div>
            </div>

            <div class="login-col">
              <a
                href="#"
                class="add-new-address button"
                @click.prevent="showAddressform"
                ><b> + Add a new address</b></a
              >
              <div class="customer_address edit_address" v-if="showForm">
                <form>
                  <h4 id="add_address_title">Add a new address</h4>
                  <table class="customer_address_table">
                    <tbody>
                      <tr>
                        <td class="label">
                          <label for="address_first_name_new">First Name</label>
                        </td>
                        <td class="value">
                          <input
                            type="text"
                            id="address_first_name_new"
                            class="address_form"
                            value=""
                            autocomplete="off"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td class="label">
                          <label for="address_last_name_new">Last Name</label>
                        </td>
                        <td class="value">
                          <input
                            type="text"
                            id="address_last_name_new"
                            class="address_form"
                            value=""
                            size="40"
                            autocomplete="off"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="label">
                          <label for="address_company_new">Company</label>
                        </td>
                        <td class="value">
                          <input
                            type="text"
                            for="address_company_new"
                            class="address_form"
                            value=""
                            size="40"
                            id="ispbxii_5"
                            autocomplete="off"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="label">
                          <label for="address_address1_new">Address1</label>
                        </td>
                        <td class="value">
                          <input
                            type="text"
                            id="address_address1_new"
                            class="address_form"
                            value=""
                            size="40"
                            autocomplete="off"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="label">
                          <label for="address_address2_new">Address2</label>
                        </td>
                        <td class="value">
                          <input
                            type="text"
                            id="address_address2_new"
                            class="address_form"
                            value=""
                            size="40"
                            autocomplete="off"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="label">
                          <label for="address_city_new">City</label>
                        </td>
                        <td class="value">
                          <input
                            type="text"
                            id="address_city_new"
                            class="address_form"
                            value=""
                            size="40"
                            autocomplete="off"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="label">
                          <label for="address_country_new">Country</label>
                        </td>
                        <td class="value">
                          <select id="address_country_new">
                            <option value="">Select</option>
                          </select>
                        </td>
                      </tr>
                      <tr id="address_province_container_new" style="">
                        <td class="label">
                          <label for="address_province_new">Province</label>
                        </td>
                        <td class="value">
                          <select
                            id="address_province_new"
                            class="address_form"
                          >
                            <option value="Alabama">Alabama</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td class="label">
                          <label for="address_zip_new">Zip</label>
                        </td>
                        <td class="value">
                          <input
                            type="text"
                            id="address_zip_new"
                            class="address_form"
                            size="40"
                            autocomplete="off"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="label">
                          <label for="address_phone_new">Phone</label>
                        </td>
                        <td class="value">
                          <input
                            type="text"
                            id="address_phone_new"
                            class="address_form"
                            size="40"
                            autocomplete="off"
                          />
                        </td>
                      </tr>
                      <tr class="padd-top">
                        <td class="label"></td>
                        <td
                          class="value clearfix checkboxouter greyColor checkbox noteArea"
                        >
                          <input type="checkbox" id="new-address" value="1" />
                          <label for="new-address"
                            >Set as Default Address?</label
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="action_bottom text-center">
                    <input
                      class="btn new-btn"
                      type="submit"
                      value="Add Address"
                      onfocus="jQuery(this).css({'opacity':'0.6'})"
                      onblur="jQuery(this).css({'opacity':'1'})"
                    />
                    <span class="note"
                      >or
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
    Sidebar,
  },

  data() {
    return {
      showForm: false,
    };
  },
  methods: {
    showAddressform() {
      this.showForm = !this.showForm;
    },
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

