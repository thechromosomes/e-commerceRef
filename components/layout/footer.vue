<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="footer-wrapper">
        <div class="flex-content">
          <!-- dropdown-open class -->
          <div class="footer-items" :class="wodOpen ? 'dropdown-open' : ''">
            <div class="footer-navigation" @click="() => (wodOpen = !wodOpen)">
              <span class="footer-link-text">WORLD OF DIESEL</span>
              <span class="dropdown-arrow_icon"></span>
            </div>
            <div class="footer-link-content">
              <div class="link-text">
                <a class="link-text" href="#">D:Code Program</a>
              </div>
              <div class="link-text">
                <a class="link-text" href="#" target="_blank">Careers</a>
              </div>
              <div class="link-text">
                <a class="link-text" href="#" target="_blank">OTB Group</a>
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
      langOpen: false
    };
  },
};
</script>
