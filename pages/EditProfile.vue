<template>
  <div>
    <div class="account-page editprofile-page">
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
            <h2>Email Address</h2>
            <div class="updateemailmsg"><span></span></div>

            <form
              class="form-vertical"
              name="updateprofile"
              id="updateprofile"
              method="post"
              @submit.prevent="updateprofile"
            >
              <div class="row mt-4">
                <div class="col-md-6 ool-12">
                  <input
                    type="email"
                    name="currentEmail"
                    id="currentEmail"
                    v-model="customer.email"
                    placeholder="Current Email Address"
                    class="form-control"
                    autocorrect="off"
                    autocapitalize="off"
                    disabled
                  />
                  <input
                    type="email"
                    name="newEmailAddress"
                    id="newEmail"
                    v-model="updateprofileData.newEmailAddress"
                    placeholder="New Email Address"
                    class="form-control mt-2"
                    :class="newEmailError"
                    autocorrect="off"
                    autocapitalize="off"
                    autocomplete="off"
                    autofocus=""
                    reequired=""
                  />
                  <span
                    v-if="
                      validation.hasError('updateprofileData.newEmailAddress')
                    "
                  >
                    <p class="input-error">
                      {{
                        validation.firstError(
                          "updateprofileData.newEmailAddress"
                        )
                      }}
                    </p>
                  </span>
                  <input
                    type="text"
                    name="name"
                    v-model="updateprofileData.name"
                    placeholder="enter you name"
                    class="form-control mt-2"
                    autocorrect="off"
                    autocapitalize="off"
                    autocomplete="off"
                  />
                  <!-- an error display tags -->
                  <span v-if="validation.hasError('updateprofileData.name')">
                    <p class="input-error">
                      {{ validation.firstError("updateprofileData.name") }}
                    </p>
                  </span>
                  <div class="btn-box mt-3">
                    <input
                      type="submit"
                      class="btn submit-button"
                      value="Update"
                      id="updateemail"
                    />
                    <a
                      style="cursor: pointer"
                      @click="() => $router.back()"
                      class="cancle_profile btn"
                      >Cancel</a
                    >
                  </div>
                </div>
                <div class="col-md-6 col-12"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "@/components/my-account/Sidebar.vue";
import { Validator } from "simple-vue-validator";
import { mapState } from "vuex";

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      newEmailError: null,
      updateprofileData: {
        newEmailAddress: this.$store.state.cartAjax.customerDetail.email || "",
        name: this.$store.state.cartAjax.customerDetail.full_name || ""
      }
    };
  },
  //   form validators
  validators: {
    "updateprofileData.newEmailAddress": function(value) {
      return Validator.value(value)
        .required()
        .email();
    },
    "updateprofileData.name": function(value) {
      return Validator.value(value).required();
    }
  },

  methods: {
    updateprofile: async function() {
      try {
        var validation = await this.$validate();
        if (validation) {
          var form = {};
          form.customer_id = this.$store.state.cartAjax.customer_id;
          form.customer_session = this.$store.state.cartAjax.customer_session;
          form.full_name = this.updateprofileData.name;
          form.email = this.updateprofileData.newEmailAddress;
        }

        let response = await this.$store.dispatch("cartAjax/actCartAjax", {
          method: "post",
          url: `/customer/update-customer`,
          token: this.$store.state.cartAjax.customer_token,
          params: form
        });
        if (response.success) {
          this.$store.commit("cartAjax/updateCustomerDetail", {
            payload: response,
            vm: this
          });
        } else {
          this.$toast.errro(response.message);
          throw `succes false >>> ${response.message}`;
        }
      } catch (error) {
        this.$globalError(`error from the updated profile >>>> ${error}`);
        console.log("error from the updated profile >>> ", error);
      }
    }
  },
  computed: {
    ...mapState({
      customer: state => state.cartAjax.customerDetail
    })
  },
  created() {
    if (Object.keys(this.$store.state.cartAjax.customerDetail).length == 0) {
      this.$router.push("./login");
    }
  }
};
</script>
<style scoped>
@import url("@/assets/css/pages-css/myAccount.css");
</style>
