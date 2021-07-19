<template>
  <footer class="footer">
    <!-- <div class="footer-container" id="bb-footer-original">
      <div class="row newsletter-social">
        <div class="col-lg-8 newsletter bbMarginAuto">
          <div class="content-asset text-center">
            <h5>SIGN UP FOR THE NEWSLETTER</h5>
            <div class="form-box">
              <div class="email-box">
                <input
                  type="email"
                  placeholder="Enter your Email address*"
                  required
                  autocomplete="off"
                />
                <span class="error"></span>
              </div>
              <div class="gender">
                <div class="radio-button-wrapper">
                  <input type="radio" id="test1" name="radio-group" />
                  <label for="test1">MEN</label>
                </div>
                <div class="radio-button-wrapper">
                  <input type="radio" id="test2" name="radio-group" />
                  <label for="test2">WOMEN</label>
                </div>
              </div>
              <p class="privacy-policy-newsletter">
                By clicking Sign up you have read and agreed to our
                <a href="#" class="more">
                  <span class="svgMore"></span>
                  <span class="learn-more-text"><u> privacy policy</u></span>
                </a>
              </p>
              <div class="button-signup-container">
                <input
                  class="button-signup btn-d-code"
                  type="button"
                  tabindex="0"
                  value="Sign up"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div class="footer-container" id="bb-footer-clone">
      <div class="row newsletter-social">
        <div class="col-lg-8 newsletter">
          <div class="content-asset">
            <div class="complete-registration">
              <div class="img-box">
                <img src="@/assets/img/footer-dcode-image.png" alt="" />
              </div>
              <div class="complete-registration__body">
                <span class="complete-registration__title social-header"
                  >Join the tribe, become a D:CODE member</span
                ><span class="complete-registration__text"
                  >Complete your registration, discover our loyalty program and
                  get all D:CODE benefits</span
                ><NuxtLink
                  id="bb_dcode_signup"
                  to="/login"
                  class="complete-registration__cta social-header"
                  >Become a D:CODE member</NuxtLink
                >
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 social-media">
          <div class="content-asset">
            <h4 class="social-header">Connect with us on social media:</h4>
            <div class="social-icons-container">
              <div class="social-icons">
                <a href="https://instagram.com/diesel" target="_blank" class="icon-instagram">Instagram</a>
              </div>
              <div class="social-icons">
                <a href="https://www.facebook.com/Diesel" target="_blank" class="icon-facebook-black">Facebook</a>
              </div>
              <div class="social-icons">
                <a href="https://twitter.com/diesel" target="_blank" class="icon-twitter-black-sm"
                  >Twitter</a
                >
              </div>
              <div class="social-icons">
                <a href="https://www.youtube.com/user/DieselPlanet" target="_blank" class="icon-youtube">Youtube</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid">
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
                <NuxtLink to="/cms/shipping">Delivery</NuxtLink>
              </div>
              <div class="link-text">
                <NuxtLink to="/cms/return-your-order">Returns</NuxtLink>
              </div>
              <div class="link-text">
                <NuxtLink class="link-text" to="/cms/size-conversion"
                  >Size Conversion</NuxtLink
                >
              </div>
              <div class="link-text">
                <NuxtLink to="/cms/contact-us">Send us a message</NuxtLink>
              </div>
              <div class="link-text">
                <NuxtLink to="/cms/contact-us">Contact Us</NuxtLink>
              </div>
              <div class="link-text">
                <!-- <NuxtLink to="/cms/Contact us">View All</NuxtLink> -->
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
              <!-- <div class="link-text">
                <a class="link-text" href="#">Privacy Policy</a>
              </div> -->
              <div class="link-text">
                <NuxtLink class="link-text" to="/cms/legal-area"
                  >Cookie Policy</NuxtLink
                >
              </div>
              <div class="link-text">
                <NuxtLink class="link-text" to="/cms/legal-area"
                  >Information on Personal data</NuxtLink
                >
              </div>
              <div class="link-text">
                <NuxtLink class="link-text" to="/cms/terms-of-conditions">
                  Terms of sale</NuxtLink
                >
              </div>
              <div class="link-text">
                <NuxtLink class="link-text" to="/cms/terms-of-conditions"
                  >Terms of Use</NuxtLink
                >
              </div>
              <div class="link-text">
                <NuxtLink class="link-text" to="/cms/legal-area"
                  >Return policy</NuxtLink
                >
              </div>
              <div class="link-text">
                <a
                  class="link-text"
                  target="_blank"
                  href="https://uk.diesel.com/en/help-show?content=accessibility-statement"
                  >Accessibility Statement</a
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
                <NuxtLink class="link-text" to="/cmsLive/dcode-program"
                  >D:Code Program</NuxtLink
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
                  href="https://www.otb.net/en/otb-career/"
                  >Work with us</a
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
          <div
            class="footer-items"
            :class="CorporateOpen ? 'dropdown-open' : ''"
          >
            <div
              class="footer-navigation"
              @click="() => (CorporateOpen = !CorporateOpen)"
            >
              <span class="footer-link-text">CORPORATE</span>
              <span class="dropdown-arrow_icon"></span>
            </div>
            <div class="footer-link-content">
              <!-- <div class="link-text">
                <a class="link-text living" href="#">For Responsible Living</a>
              </div> -->
              <div class="link-text">
                <a
                  class="link-text"
                  target="_blank"
                  href="https://uk.diesel.com/on/demandware.static/-/Library-Sites-DieselMFSharedLibrary/default/dw4e137934/document/OTB_CodeOfEthics.pdf"
                  >Code of Ethics</a
                >
              </div>
              <div class="link-text">
                <a
                  class="link-text"
                  target="_blank"
                  href="https://uk.diesel.com/on/demandware.static/-/Library-Sites-DieselMFSharedLibrary/default/dw70aed053/document/Diesel_Organisation-Management-Control_Model231.pdf"
                  >Organisation, Management, and Control Model</a
                >
              </div>
              <div class="link-text">
                <NuxtLink class="link-text" to="/cms/legal-area"
                  >Other Corporate information
                </NuxtLink>
              </div>
              <!-- <div class="link-text">
                <a class="link-text" href="#"
                  >UK Gender Pay Gap
                </a>
              </div> -->
              <!-- <div class="link-text">
                <a class="link-text" href="#"
                  >Diesel is part of OTB
                </a>
              </div> -->
            </div>
          </div>
          <div class="footer-items">
            <div class="footer-navigation">
              <span class="footer-link-text"
                ><NuxtLink to="/storelocator">STORE LOCATOR</NuxtLink></span
              >
            </div>
          </div>
          <!-- <div class="footer-items">
            <div class="footer-navigation">
              <span class="footer-link-text">SHIP TO</span>
            </div>
          </div> -->
          <!-- <div class="footer-items" :class="langOpen ? 'dropdown-open' : ''">
            <div
              class="footer-navigation"
              @click="() => (langOpen = !langOpen)"
            >
              <span class="footer-link-text">LANGUAGE</span>
              <span class="dropdown-arrow_icon"></span>
            </div>
            <div class="footer-link-content">
              <div class="link-text">
                <a class="link-text" href="#">English </a>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>

    <div class="footer-container">
      <div class="copyright-notice">
        <p class="copyright">
          Copyright © 2021 Diesel SpA - All rights reserved - VAT 00642650246 -
          <NuxtLink to="#" class="postscript" @click.prevent="modelShow = true">
            Vendor information.</NuxtLink
          >
          <small aria-hidden="true" class="version">v4.5.5</small>
        </p>

        <div class="modal vendor-popup" id="vendorPopupModal" v-if="modelShow">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <div
                  class="icon-close-black modal-close"
                  @click.prevent="modelShow = false"
                ></div>

                <div class="content-asset">
                  <span class="modal-title">Diesel S.P.A.</span>
                  <div class="modal-text-container">
                    <span class="modal-text"
                      >Via dell’Industria, 4/6 – Breganze (Vicenza), Italy</span
                    >
                    <span class="modal-text">
                      <a
                        href="https://global.diesel.com/help-show?content=sendmessage"
                        >E-Mail Address</a
                      >
                    </span>
                    <span class="modal-text"
                      >Vicenza Companies Register tax code/VAT no.:
                      00642650246</span
                    >
                    <span class="modal-text">R.E.A. no.: VI-143773</span>
                    <span class="modal-text">Share capital € 22,500,00.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      modelShow: false,
      wodOpen: false,
      CorporateOpen: false,
      help: false,
      cooPolicyOpen: false,
      worldOpen: false,
      langOpen: false
    };
  },
  methods: {}
};
</script>
