<template>
  <footer class="footer">
    <div class="footer-container" id="bb-footer-clone">
      <div class="row newsletter-social">
        <div class="newsletter col-lg-6 col-12">
          <div id="bb-footer-original" class="footer-container">
            <div class="newsletter-social">
              <div class="content-asset">
                <h5>Sign up to never miss the update.</h5>
                <div class="form-box">
                  <div class="email-box">
                    <input
                      type="text"
                      v-model="email"
                      placeholder="Enter your Email address*"
                    />
                  </div>
                  <div class="gender">
                    <div class="radio-button-wrapper">
                      <input
                        v-model="emailFor"
                        class="gender-radio is-valid"
                        type="radio"
                        id="formMaleId"
                        name="gender"
                        value="male"
                      /><label for="formMaleId">Men</label>
                    </div>
                    <div class="radio-button-wrapper">
                      <input
                        v-model="emailFor"
                        class="gender-radio is-valid"
                        type="radio"
                        id="formFemaleId"
                        name="gender"
                        value="female"
                      /><label for="formFemaleId">Women</label>
                    </div>
                  </div>
                  <p class="privacy-policy-newsletter">
                    By clicking Sign up you have read and agreed to our
                    <a href="" class="more"
                      ><span class="svgMore"></span
                      ><span class="learn-more-text"
                        ><u> privacy policy</u></span
                      ></a
                    >
                  </p>
                  <span v-if="validation.hasError('email')">
                    <p class="input-error">
                      {{ validation.firstError("email") }}
                    </p>
                  </span>
                  <div class="button-signup-container">
                    <input
                      class="button-signup btn-d-code"
                      @click="subscribeNews()"
                      tabindex="0"
                      value="Sign up"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 social-media col-12">
          <div class="content-asset">
            <h4 class="social-header">Connect with us on social media:</h4>
            <div class="social-icons-container">
              <div class="social-icons">
                <a
                  href="https://instagram.com/diesel"
                  target="_blank"
                  class="icon-instagram"
                  >Instagram</a
                >
              </div>
              <div class="social-icons">
                <a
                  href="https://www.facebook.com/Diesel"
                  target="_blank"
                  class="icon-facebook-black"
                  >Facebook</a
                >
              </div>
              <div class="social-icons">
                <a
                  href="https://www.youtube.com/user/DieselPlanet"
                  target="_blank"
                  class="icon-youtube"
                  >Youtube</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid footer-hlp-container">
      <div class="footer-wrapper">
        <div class="flex-content">
          <!-- dropdown-open class -->
          <div class="footer-items" :class="help ? 'dropdown-open' : ''">
            <div class="footer-navigation" @click="() => (help = !help)">
              <span class="footer-link-text">HELP</span>
              <span class="dropdown-arrow_icon"></span>
            </div>
            <div class="footer-link-content">
              <div class="link-text">
                <NuxtLink to="/trackorder">Order Status</NuxtLink>
              </div>
              <div class="link-text">
                <NuxtLink to="/cms/legal-area/?for=delivery-and-shipping-policy"
                  >Delivery</NuxtLink
                >
              </div>
              <div class="link-text">
                <NuxtLink to="/cms/legal-area/?for=return-policy"
                  >Returns</NuxtLink
                >
              </div>
              <div class="link-text">
                <NuxtLink class="link-text" to="/cms/size-conversion"
                  >Size Conversion</NuxtLink
                >
              </div>

              <div class="link-text">
                <NuxtLink to="/cms/contact-us">Contact Us</NuxtLink>
              </div>
              <div class="link-text">
                <Nuxt-link class="hover-link" to="/cms/allCmsView"
                  >View All
                </Nuxt-link>
              </div>
            </div>
          </div>
          <div
            class="footer-items"
            :class="cooPolicyOpen ? 'dropdown-open' : ''"
          >
            <div
              class="footer-navigation"
              @click="() => (cooPolicyOpen = !cooPolicyOpen)"
            >
              <span class="footer-link-text">COOKIE POLICY & TERMS</span>
              <span class="dropdown-arrow_icon"></span>
            </div>
            <div class="footer-link-content">
              <div class="link-text">
                <NuxtLink
                  class="link-text"
                  to="/cms/legal-area/?for=privacy-policy"
                  >Privacy Policy</NuxtLink
                >
              </div>
              <div class="link-text">
                <NuxtLink
                  class="link-text"
                  to="/cms/legal-area/?for=delivery-and-shipping-policy"
                  >Shipping & Delivery Policy</NuxtLink
                >
              </div>
              <div class="link-text">
                <NuxtLink class="link-text" to="/cms/terms-of-conditions">
                  Terms & Conditions</NuxtLink
                >
              </div>
              <div class="link-text">
                <NuxtLink class="link-text" to="/cms/return-your-order"
                  >Returns & Refund Policy</NuxtLink
                >
              </div>
              <div class="link-text">
                <NuxtLink class="link-text" to="/cms/fees-and-payments-policy"
                  >Fees & Payment Policy</NuxtLink
                >
              </div>
            </div>
          </div>
          <div class="footer-items" :class="worldOpen ? 'dropdown-open' : ''">
            <div
              class="footer-navigation"
              @click="() => (worldOpen = !worldOpen)"
            >
              <span class="footer-link-text">WORLD OF DIESEL</span>
              <span class="dropdown-arrow_icon"></span>
            </div>
            <div class="footer-link-content">
              <div class="link-text">
                <NuxtLink class="link-text" to="/cms/our-brands"
                  >About Diesel</NuxtLink
                >
              </div>
              <div class="link-text">
                <NuxtLink
                  class="link-text living"
                  to="/cmsLive/for-responsible-living"
                  >For Responsible Living</NuxtLink
                >
              </div>
              <div class="link-text">
                <a
                  class="link-text"
                  target="_blank"
                  href="https://www.otbfoundation.org/"
                  >Only the Brave Foundation</a
                >
              </div>
            </div>
          </div>
          <div class="footer-items">
            <div class="footer-navigation">
              <span class="footer-link-text"
                ><NuxtLink to="/storelocator">STORE LOCATOR</NuxtLink></span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-container">
      <div class="copyright-notice">
        <p class="copyright">
          Copyright ©️2021 Diesel Fashion India Reliance Pvt.Ltd
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import { Validator } from "simple-vue-validator";
export default {
  data() {
    return {
      wodOpen: false,
      email: "",
      emailFor: "",
      CorporateOpen: false,
      help: false,
      cooPolicyOpen: false,
      worldOpen: false,
      langOpen: false
    };
  },
  // form validatiors
  validators: {
    email: function(value) {
      return Validator.value(value)
        .required()
        .email();
    }
  },

  methods: {
    async subscribeNews() {
      try {
        var validation = await this.$validate();
        if (validation) {
          let response = await this.$store.dispatch("cartAjax/actCartAjax", {
            method: "post",
            url: `/newsletter/news-letter`,
            params: { email: this.email, email_for: this.emailFor }
          });

          if (response.success) {
            this.$toast.default(response.message);
          } else {
            this.$toast.error(response.message);
            throw `${response.message}`;
          }
        }
      } catch (error) {
        this.$globalError(`error from the all subcribe email footer ${error}`);
      }
    }
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};
</script>
<style scoped>
.footer {
  width: 100%;
  padding-top: 0px;
  margin: 30px 0px;
  background: #cccccc54;
}
#bb-footer-original .button-signup-container .button-signup {
  width: 100%;
}
#bb-footer-original
  .newsletter-social
  .content-asset
  .form-box
  .gender
  .radio-button-wrapper {
  width: auto;
}
#bb-footer-original .newsletter-social {
  padding: 0px 0;
}
.social-icons-container {
  justify-content: center;
}
.footer .col-lg-6.social-media.col-12 {
  display: flex;
  align-items: center;
  text-align: center;
}
.social-media h4 {
  font-weight: 700;
  font-size: 24px;
  text-transform: capitalize;
}
.footer-hlp-container,
.footer-container .copyright {
  background: #fff;
}
.footer-container .copyright {
  margin: 0px;
  padding: 5px 0px;
}
#bb-footer-original .newsletter-social .content-asset h5 {
  text-transform: capitalize;
}
#bb-footer-original .newsletter-social .content-asset .form-box {
  position: relative;
}
#bb-footer-original .newsletter-social .content-asset .form-box .input-error {
  position: absolute;
  top: 35%;
  left: 59%;
}
.social-icons-container {
  margin-top: 27px;
}
.footer .social-icons-container .social-icons a {
  width: 28px;
  height: 28px;
  width: 28px;
  transform: scale(2);
}
.privacy-policy-newsletter {
  opacity: 1;
}
</style>
