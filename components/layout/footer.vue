<template>
  <footer class="footer">
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
                <NuxtLink to="/cms/legal-area">Returns</NuxtLink>
              </div>
              <div class="link-text">
                <NuxtLink class="link-text" to="/cms/size-conversion"
                  >Size Conversion</NuxtLink
                >
              </div>
              <!-- <div class="link-text">
                <NuxtLink to="/cms/contact-us">Send us a message</NuxtLink>
              </div> -->
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
              <!-- <div class="link-text">
                <a class="link-text" href="#">Privacy Policy</a>
              </div> -->
              <div class="link-text">
                <NuxtLink class="link-text" to="/cms/legal-area"
                  >Privacy Policy</NuxtLink
                >
              </div>
              <div class="link-text">
                <NuxtLink class="link-text" to="/cms/legal-area"
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
              <!-- <div class="link-text">
                <NuxtLink class="link-text" to="/cmsLive/dcode-program"
                  >D:Code Program</NuxtLink
                >
              </div> -->
              <div class="link-text">
                <NuxtLink
                  class="link-text living"
                  to="/cmsLive/for-responsible-living"
                  >For Responsible Living</NuxtLink
                >
              </div>
              <!-- <div class="link-text">
                <a
                  class="link-text"
                  target="_blank"
                  href="https://www.otb.net/en/otb-career/"
                  >Work with us</a
                >
              </div> -->
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
          <!-- <div
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
            </div>
          </div> -->
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
export default {
  data() {
    return {
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
