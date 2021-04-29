<template>
  <div>
    <client-only>
      <div class="">
        <div class="regBanner"></div>
        <div class="container">
          <div class="systemForm">
            <div class="row">
              <div id="checkCustomer" class="span7">
                <h1 class="title">Hi there!</h1>
                <form action="" class="validateCustomer">
                  <div class="inputWrapper">
                    <label for="newnumber" class="label">Mobile Number*</label>
                    <input
                      type="number"
                      v-model.number="mobileNumber"
                      ref="mobile_number"
                      name="newnumber"
                      class="text number"
                      autocomplete="off"
                    />
                    <span class="input-error" v-if="pageError != ''">
                      {{ pageError }}</span
                    >
                  </div>
                  <div class="inputWrapper" v-if="showOtp">
                    <label for="otp" class="label"
                      >One Time Password (OTP)*</label
                    >
                    <input
                      type="text"
                      v-model="otpNumber"
                      name="otp"
                      id="otp"
                      class="text"
                      maxlength="4"
                      autocomplete="off"
                    />
                    <span class="input-error" v-if="otpPageError != ''">
                      {{ otpPageError }}</span
                    >
                    <div class="resend-otp" v-if="showOtp">
                      <span
                        style="cursor: pointer"
                        v-if="showOtp && this.resend_otp_time == 0"
                        @click="registeruser()"
                        >Resend OTP</span
                      >
                      <span v-else> 00:{{ resend_otp_time }} </span>
                    </div>
                  </div>
                  <div
                    class="action_bottom btnWrapper"
                    v-if="!showOtp && sendButton"
                  >
                    <input
                      class="btn"
                      type="submit"
                      value="Send OTP"
                      @click.prevent="registeruser()"
                    />
                  </div>
                  <div class="action_bottom btnWrapper" v-else-if="showOtp">
                    <input
                      class="btn"
                      type="submit"
                      value="Continue"
                      @click.prevent="registeruserOtp()"
                    />
                  </div>
                </form>
                <div class="errorMsg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- vue recaptch -->
      <vue-recaptcha
        ref="invisibleRecaptcha"
        @verify="recaptchaSuccess"
        @expired="onExpired"
        @error="recaptchaError"
        size="invisible"
        sitekey="6LdmY7QaAAAAALNMQFmqg3seM9k-RkXKz7-CYzEh"
        :loadRecaptchaScript="true"
      ></vue-recaptcha>
    </client-only>
  </div>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";

export default {
  components: { VueRecaptcha },
  data() {
    return {
      mobileNumber: "",
      pageError: "",
      showOtp: false,
      otpNumber: "",
      otpPageError: "",
      captchaToken: "",
      resend_otp_time: 0,
      sendButton: false,
      timeout: null,
    };
  },

  methods: {
    async registeruser() {
      try {
        if (/^(\+\d{1,3}[- ]?)?\d{10}$/.test(this.mobileNumber)) {
          if (this.captchaToken == "") {
            this.pageError = "Error occured, please try reloading your page";
            return;
          }
          let form = {
            phone: this.mobileNumber,
            captcha: this.captchaToken,
          };

          this.resend_otp_time = 60;
          let response = await this.$store.dispatch("cartAjax/actCartAjax", {
            method: "post",
            url: `/customer/send-otp`,
            params: form,
          });
          this.countDownTimer();
          if (response.success) {
            this.showOtp = true;
            this.pageError = "";
            this.$toast.open(`otp sent to ${this.mobileNumber}`);
          } else {
            if (
              !response.success &&
              response.data &&
              response.data.blocked == 1
            ) {
              this.pageError = response.message;
            } else {
              throw response.message;
            }
          }
        } else {
          this.pageError = "Please enter valid mobile number";
        }
      } catch (error) {
        this.pageError = "Error occured. Please try reloading and check number";
        console.log("error from log in page", error);
        this.$globalError(`error from log in page (registeruser)>>>> ${error}`);
      }
    },

    async registeruserOtp() {
      try {
        var otpno = /^\d*(?:\.\d{1,2})?$/;
        if (this.otpNumber != "" && this.otpNumber.match(otpno)) {
          var form = {};
          if (
            this.$store.state.cartAjax.cart_id != null &&
            this.$store.state.cartAjax.cart_id != ""
          ) {
            form.cart_id = this.$store.state.cartAjax.cart_id;
            form.cart_session = this.$store.state.cartAjax.cart_session;
          }
          form.store = this.$store.state.list.page;
          form.otp = this.otpNumber;
          form.phone = this.mobileNumber;

          let response = await this.$store.dispatch("cartAjax/actCartAjax", {
            method: "post",
            url: `/customer/validate-otp`,
            params: form,
          });
          if (response.success) {
            this.$store.commit("cartAjax/registerUser", {
              payload: response,
              vm: this,
            });

            this.$gtm.push({
              event: "Login",
              category: "Login",
              action: "Login Success",
            });
            this.$gtm.push({
              event: "Login_status",
              category: "Login_status",
              action: "Login Success",
              Mobile_no: this.mobileNumber,
            });
          } else {
            this.otpPageError = response.message;
            throw "Error while requesting";
          }
        } else {
          this.otpPageError = "please enter valid otp";
        }
      } catch (error) {
        this.$globalError(
          `error from log in page (registeruserOtp) >>>> ${error}`
        );
        console.log("error from log in page", error);
      }
    },

    recaptchaSuccess(recaptchaToken) {
      this.captchaToken = recaptchaToken;
    },
    onExpired() {
      this.captchaToken = "";
    },
    recaptchaError() {
      this.captchaToken = "";
      this.$toast.error(
        "Google Recaptcha Error. Please contact administration'"
      );
    },

    // resend otp timer
    countDownTimer() {
      let that = this;
      if (this.resend_otp_time > 0) {
        this.timeout = setTimeout(() => {
          this.resend_otp_time -= 1;
          this.countDownTimer();
        }, 1000);
      }
      if (this.resend_otp_time == 2) {
        that.$refs.invisibleRecaptcha.execute();
      }
    },
  },

  beforeMount() {
    if (
      this.$store.state.cartAjax.customer_session != "" ||
      this.$store.state.cartAjax.customer_id != ""
    ) {
      this.$router.push("/");
      return;
    }
  },
  watch: {
    mobileNumber: function () {
      if (/^(\+\d{1,3}[- ]?)?\d{10}$/.test(this.mobileNumber)) {
        this.$refs.invisibleRecaptcha.execute();
        this.timeout = setTimeout(() => {
          this.sendButton = true;
        }, 1500);
      } else {
        this.showOtp = false;
        this.pageError = "";
      }
    },
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
};
</script>

<style scoped>
.resend-otp {
  text-align: right;
  margin-top: 10px;
}
</style>