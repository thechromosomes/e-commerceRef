<template>
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
            <div class="">
              <AllAddresses
                v-if="showOldAddress && !showForm"
                @editAddress="updateForm"
              />

              <div class="customer_address edit_address" v-if="showForm">
                <div class="row">
                  <div class="col-md-6 col-12">
                    <label for="address_first_name_new">First Name</label>
                    <input
                      type="text"
                      id="address_first_name_new"
                      class="address_form form-control"
                      v-model="user.firstName"
                      autocomplete="off"
                    />
                    <!-- an error display tags -->
                    <span v-if="validation.hasError('user.firstName')">
                      <p class="input-error">
                        {{ validation.firstError("user.firstName") }}
                      </p>
                    </span>
                  </div>
                  <div class="col-md-6 col-12">
                    <label for="address_last_name_new">Last Name</label>
                    <input
                      type="text"
                      id="address_last_name_new"
                      class="address_form form-control"
                      size="40"
                      v-model="user.lastName"
                      autocomplete="off"
                    />
                    <!-- an error display tags -->
                    <span v-if="validation.hasError('user.lastName')">
                      <p class="input-error">
                        {{ validation.firstError("user.lastName") }}
                      </p>
                    </span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 col-12">
                    <label for="address_address1_new">Address 1</label>
                    <input
                      type="text"
                      id="address_address1_new"
                      class="address_form form-control"
                      v-model="user.address"
                      size="40"
                      autocomplete="off"
                    />
                    <!-- an error display tags -->
                    <span v-if="validation.hasError('user.address')">
                      <p class="input-error">
                        {{ validation.firstError("user.address") }}
                      </p>
                    </span>
                  </div>
                  <div class="col-md-6 col-12">
                    <label for="address_address2_new">Address2</label>
                    <input
                      type="text"
                      id="address_address2_new"
                      class="address_form form-control"
                      v-model="user.address2"
                      size="40"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 col-12">
                    <label for="address_zip_new">Zip</label>
                    <input
                      type="text"
                      id="address_zip_new"
                      class="address_form form-control"
                      size="40"
                      v-model="user.pinCode"
                      autocomplete="off"
                    />
                    <!-- an error display tags -->
                    <span v-if="validation.hasError('user.pinCode')">
                      <p class="input-error">
                        {{ validation.firstError("user.pinCode") }}
                      </p>
                    </span>
                    <!-- error or success message -->
                    <template>
                      <div v-if="pin_code_error !== ''">
                        <p class="input-error">
                          {{ pin_code_error }}
                        </p>
                      </div>
                      <div v-else>
                        <p class="input-success">
                          {{ pin_code_success }}
                        </p>
                      </div>
                    </template>
                  </div>
                  <div class="col-md-6 col-12">
                    <label for="address_city_new">City</label>
                    <input
                      type="text"
                      id="address_city_new"
                      class="address_form form-control"
                      v-model="user.city"
                      size="40"
                      autocomplete="off"
                    />
                    <!-- an error display tags -->
                    <span v-if="validation.hasError('user.city')">
                      <p class="input-error">
                        {{ validation.firstError("user.city") }}
                      </p>
                    </span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 col-12">
                    <label for="address_country_new">Country</label>
                    <select
                      id="address_country_new"
                      class="form-control form-control"
                      disabled
                    >
                      <option value="India">India</option>
                    </select>
                  </div>
                  <div class="col-md-6 col-12">
                    <label for="address_province_new">State</label>
                    <input
                      placeholder=""
                      :value="user.state"
                      disabled
                      class="address_form form-control"
                      size="40"
                      type="text"
                      autocomplete="off"
                    />
                    <!-- an error display tags -->
                    <span v-if="validation.hasError('user.state')">
                      <p class="input-error">
                        {{ validation.firstError("user.state") }}
                      </p>
                    </span>
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
                      v-model="user.mobileNo"
                      autocomplete="off"
                    />
                    <!-- an error display tags -->
                    <span v-if="validation.hasError('user.mobileNo')">
                      <p class="input-error">
                        {{ validation.firstError("user.mobileNo") }}
                      </p>
                    </span>
                  </div>
                  <div class="col-md-6 col-12">
                    <div class="default-address">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="new-address"
                        v-model="user.defaultAddress"
                      />
                      <label class="form-check-label" for="new-address"
                        >Set as Default Address?</label
                      >
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12 col-12">
                    <label
                      class="form-check-label address-type"
                      for="form-check-label"
                      >Address type</label
                    >
                    <div class="address-type-box">
                      <div class="p-2">
                        <input
                          class="form-check-input"
                          type="radio"
                          value="home"
                          v-model="user.address_type"
                          id="home-radio"
                        />
                        <label for="home-radio">Home</label>
                      </div>
                      <div class="p-2">
                        <input
                          class="form-check-input"
                          type="radio"
                          value="office"
                          v-model="user.address_type"
                          id="office-radio"
                        />
                        <label for="office-radio">Office</label>
                      </div>
                    </div>
                    <div class="col-md-12 col-12 p-0">
                      <div class="submit_box mt-4">
                        <input class="btn new-btn" type="submit" value="Back" />
                        <input
                          class="btn new-btn ml-3"
                          type="submit"
                          value="Add Address"
                          @click.prevent="submitDetail()"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Validator } from "simple-vue-validator";
import Sidebar from "@/components/my-account/Sidebar.vue";
import AllAddresses from "@/components/my-account/AllAddresses.vue";
export default {
  components: {
    Sidebar,
    AllAddresses
  },
  data() {
    return {
      showForm: false,
      showOldAddress: true,
      pin_code_success: "",
      pin_code_error: "",
      user: {
        state: "",
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        country: "India",
        pinCode: "",
        mobileNo: "",
        email: "",
        city: "",
        address_type: "home",
        address_id: "",
        defaultAddress: false
      }
    };
  },

  // form validatiors
  validators: {
    "user.firstName": function(value) {
      return Validator.value(value).required();
    },
    "user.lastName": function(value) {
      return Validator.value(value).required();
    },
    "user.address": function(value) {
      return Validator.value(value).required();
    },
    "user.pinCode": function(value) {
      return Validator.value(value)
        .required()
        .integer()
        .minLength(6)
        .maxLength(6);
    },
    "user.mobileNo": function(value) {
      return Validator.value(value)
        .required()
        .integer()
        .minLength(10)
        .maxLength(10);
    },
    "user.city": function(value) {
      return Validator.value(value).required();
    }
  },

  methods: {
    showAddressform() {
      this.showForm = !this.showForm;
    },

    updateForm(data) {
      (this.user.state = data.state),
        (this.user.firstName = data.full_name.split(" ")[0]),
        (this.user.lastName = data.full_name.split(" ")[1] || ""),
        (this.user.address = data.street_address.split(" ")[0] || ""),
        (this.user.address2 = data.street_address.split(" ")[1] || ""),
        (this.user.country = "India"),
        (this.user.pinCode = data.pin_code),
        (this.user.mobileNo = data.phone),
        (this.user.email = ""),
        (this.user.city = data.city),
        (this.user.address_type = data.address_type);
      this.user.address_id = data.id;
      this.showForm = true;
    },

    // submit the user address
    async submitDetail() {
      try {
        var validation = await this.$validate();
        let {
          state,
          firstName,
          lastName,
          address,
          pinCode,
          mobileNo,
          city,
          address2,
          address_type,
          address_id,
          defaultAddress
        } = this.user;
        if (
          state &&
          firstName &&
          lastName &&
          address &&
          pinCode &&
          mobileNo &&
          city &&
          validation
        ) {
          if (
            this.$store.state.cartAjax.cart_session == "" &&
            this.$store.state.cartAjax.cart_id == ""
          ) {
            this.$toast.error(
              "your cart is empty please try adding itmes first"
            );
            return;
          }
          var form = {};
          form.customer_id = this.$store.state.cartAjax.customer_id;
          form.customer_session = this.$store.state.cartAjax.customer_session;
          form.cart_id = this.$store.state.cartAjax.cart_id;
          form.cart_session = this.$store.state.cartAjax.cart_session;
          form.full_name = `${firstName} ${lastName}`;
          form.street_address = `${address} ${address2}`;
          form.pin_code = pinCode;
          form.city = city;
          form.state_name = state;
          form.phone = mobileNo;
          form.address_type = address_type;
          form.address_id = address_id;
          form.default = Number(defaultAddress);

          let url;
          let token;
          if (address_id != "") {
            url = `/customer/edit-address`;
            token = this.$store.state.cartAjax.customer_token;
          } else {
            url = `/customer/add-address`;
            token = this.$store.state.cartAjax.customer_token;
          }

          let response = await this.$store.dispatch("cartAjax/actCartAjax", {
            method: "post",
            url,
            token,
            params: form
          });

          if (response.success) {
            this.$store.commit("cartAjax/updateAddress", {
              payload: response,
              vm: this
            });
            this.showForm = false;
          } else {
            this.$toast.error(response.message);
            throw response.message;
          }
        } else {
          throw "please fill the form data first";
        }
      } catch (error) {
        this.$globalError(
          `error form the shipping page (submitDetail)>>>> ${error}`
        );
        console.log("error form the shipping page >>> ", error);
      }
    },

    // get detil via pin code
    fetchUserDetail: function() {
      var pin_code = /^([0-9]{6,})+$/;
      if (
        this.user.pinCode != null &&
        this.user.pinCode.match(pin_code) &&
        this.user.pinCode != "" &&
        this.user.pinCode.length &&
        this.user.pinCode != undefined
      ) {
        var form = {};
        form.service = "pincheck";
        form.store = this.$store.state.cartAjax.store;
        form.pincode = this.user.pinCode;
        this.$store
          .dispatch("pimAjax", {
            method: "post",
            url: `/pimresponse.php`,
            params: form
          })
          .then(response => {
            if (response.result == "") {
              this.pin_code_error = "Sorry this pincode is not serviceable.";
              this.pin_code_success = "";
            } else {
              if (response.result.cod === "N") {
                this.cod_msg =
                  "Due to regulatory & operational restrictions, we are unable to offer Cash on delivery in the selected Pin code. <span class='green'>Free delivery on PREPAID orders.</span>";
              } else {
                this.cod_msg = "";
              }

              this.user.city = response.result.city;
              this.user.state = response.result.state;
              this.pin_code_success = response.response.success_message_sort;
              this.pin_code_error = "";
            }
          })
          .catch(error => {
            console.log("error from the shipping page >>> ", error);
            this.$globalError(
              `error from the shipping page (fetchUserDetail) >>>> ${error}`
            );
            if (error.message === "Network Error") {
              this.$toast.error(
                "Oops there seems to be some Network issue, please try again."
              );
            }
            this.pin_code_success = "";
          });
      } else {
        this.pin_code_error = "Please enter valid Pin code";
        this.pin_code_success = "";
      }
    }
  },
  mounted() {
    if (
      this.$store.state.cartAjax.customer_id == "" &&
      this.$store.state.cartAjax.customer_session == ""
    )
      return this.$router.push("/login");
  },
  watch: {
    "user.pinCode": function() {
      if (this.user.pinCode >= 1000) {
        this.fetchUserDetail();
      }
    }
  }
};
</script>
<style scoped>
@import url("@/assets/css/pages-css/myAccount.css");
@import url("@/assets/css/pages-css/shipping.css");
</style>
