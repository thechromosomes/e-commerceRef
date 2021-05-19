<template>
  <footer class="footer">
    <div class="footer-container" id="bb-footer-original">
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
    </div>

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
                <a target="_blank" href="#" class="icon-instagram">Instagram</a>
              </div>
              <div class="social-icons">
                <a target="_blank" href="#" class="icon-facebook-black"
                  >Facebook</a
                >
              </div>
              <div class="social-icons">
                <a target="_blank" href="#" class="icon-twitter-black-sm"
                  >Twitter</a
                >
              </div>
              <div class="social-icons">
                <a target="_blank" href="#" class="icon-youtube">Youtube</a>
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
                <a class="link-text" href="#">Order Status</a>
              </div>
              <div class="link-text">
                <a class="link-text" href="#" target="_blank">Delivery</a>
              </div>
              <div class="link-text">
                <a class="link-text" href="#" target="_blank">Returns</a>
              </div>
              <div class="link-text">
                <a class="link-text" href="#" target="_blank"
                  >Size Conversion</a
                >
              </div>
              <div class="link-text">
                <a class="link-text" href="#" target="_blank"
                  >Send us a message</a
                >
              </div>
              <div class="link-text">
                <a class="link-text" href="#" target="_blank">Contact us</a>
              </div>
              <div class="link-text">
                <a class="link-text" href="#" target="_blank">View all</a>
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
                <a class="link-text" href="#">Privacy Policy</a>
              </div>
              <div class="link-text">
                <a class="link-text" href="#" target="_blank">Cookie Policy</a>
              </div>
              <div class="link-text">
                <a class="link-text" href="#" target="_blank"
                  >Information on Personal data</a
                >
              </div>
              <div class="link-text">
                <a class="link-text" href="#" target="_blank">Terms of sale</a>
              </div>
              <div class="link-text">
                <a class="link-text" href="#" target="_blank">Terms of Use</a>
              </div>
              <div class="link-text">
                <a class="link-text" href="#" target="_blank">Return policy</a>
              </div>
              <div class="link-text">
                <a class="link-text" href="#" target="_blank"
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
                <a class="link-text" href="#">About Diesel</a>
              </div>
              <div class="link-text">
                <a class="link-text" href="#">D:Code Program</a>
              </div>
              <div class="link-text">
                <a class="link-text living" href="#" target="_blank"
                  >For Responsible Living</a
                >
              </div>
              <div class="link-text">
                <a class="link-text" href="#" target="_blank">Work with us</a>
              </div>
              <div class="link-text">
                <a class="link-text" href="#" target="_blank"
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
              <div class="link-text">
                <a class="link-text living" href="#">For Responsible Living</a>
              </div>
              <div class="link-text">
                <a class="link-text" href="#" target="_blank">Code of Ethics</a>
              </div>
              <div class="link-text">
                <a class="link-text" href="#" target="_blank"
                  >Organisation, Management, and Control Model</a
                >
              </div>
              <div class="link-text">
                <a class="link-text" href="#" target="_blank"
                  >Other Corporate information
                </a>
              </div>
              <div class="link-text">
                <a class="link-text" href="#" target="_blank"
                  >UK Gender Pay Gap
                </a>
              </div>
              <div class="link-text">
                <a class="link-text" href="#" target="_blank"
                  >Diesel is part of OTB
                </a>
              </div>
            </div>
          </div>
          <div class="footer-items">
            <div class="footer-navigation">
              <span class="footer-link-text"
                ><NuxtLink to="/storelocater">STORE LOCATOR</NuxtLink></span
              >
            </div>
          </div>
          <div class="footer-items">
            <div class="footer-navigation">
              <span class="footer-link-text">SHIP TO</span>
            </div>
          </div>
          <div class="footer-items" :class="langOpen ? 'dropdown-open' : ''">
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
          </div>
        </div>
      </div>
    </div>

    <div class="footer-container">
      <div class="copyright-notice">
        <p class="copyright">
          Copyright © 2021 Diesel SpA - All rights reserved - VAT 00642650246 -
          <a href="#" class="postscript" @click.prevent="modelShow = true">
            Vendor information.</a
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
      langOpen: false,
    };
  },
};
</script>
