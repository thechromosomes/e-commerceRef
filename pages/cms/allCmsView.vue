<template>
  <div>
    <section class="view-all-cms">
      <div class="main-container">
        <div class="cms_page">
          <div class="containers">
            <div class="top-search"></div>
            <div class="row">
              <div class="col-12 text-center">
                <div class="content">
                  <h5>HELP</h5>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-3 col-12">
                <div class="content-asset">
                  <div class="headline-wrapper">
                    <h3 class="support_headline"><b d>SUPPORT TOPICS</b></h3>
                  </div>
                  <div class="help_menu_holder">
                    <ul class="submenu show_submenu">
                      <li
                        title="Return Condition"
                        v-for="(item_tab, Index_tab) in cmsPagesData"
                        :key="Index_tab"
                      >
                        <Nuxt-link
                          v-if="
                            item_tab.parent_name != null && item_tab.tab != 'no'
                          "
                          :to="`/cms/${item_tab.parent_name}`"
                          >{{ item_tab.name }}</Nuxt-link
                        >
                        <!-- test {{item_tab}} -->
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-lg-9 col-12">
                <span>
                  <div class="contact-page">
                    <div class="container">
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="all-cms-content">
                            <div class="single_icon_holder">
                              <p>
                                <span style="font-size: 14px"
                                  ><NuxtLink to="/trackorder"
                                    >Check Order Status</NuxtLink
                                  ></span
                                >
                              </p>
                              <NuxtLink to="/trackorder"
                                ><img
                                  alt="Go to uk.diesel.com (help-show subpage) #1"
                                  src="~assets/img/box_track.png"
                              /></NuxtLink>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="all-cms-content">
                            <div
                              class="single_icon_holder"
                              style="padding-bottom: 20px"
                            >
                              <p>
                                <span style="font-size: 14px"
                                  ><nuxt-link to="/cms/return-your-order"
                                    >Returns</nuxt-link
                                  ></span
                                >
                              </p>
                              <NuxtLink to="/cms/return-your-order">
                                <img
                                  alt="Go to uk.diesel.com (help-show subpage) #3"
                                  src="~assets/img/box_shipping.png"
                              /></NuxtLink>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row row-mt-30 pd-bottom">
                        <div class="col-sm-6">
                          <div class="all-cms-content">
                            <div
                              class="single_icon_holder"
                              style="padding-bottom: 20px"
                            >
                              <p>
                                <span style="font-size: 14px"
                                  ><NuxtLink
                                    to="/cms/legal-area/?for=delivery-and-shipping-policy"
                                    >Delivery</NuxtLink
                                  ></span
                                >
                              </p>
                              <NuxtLink
                                to="/cms/legal-area/?for=delivery-and-shipping-policy"
                                ><img
                                  alt="Go to uk.diesel.com (help-show subpage) #2"
                                  src="~assets/img/delivery_truck.png"
                              /></NuxtLink>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="all-cms-content">
                            <div class="single_icon_holder">
                              <p>
                                <span style="font-size: 14px"
                                  ><nuxt-link to="/cms/size-conversion"
                                    >Size conversion</nuxt-link
                                  ></span
                                >
                              </p>
                              <nuxt-link to="/cms/size-conversion"
                                ><img
                                  alt="Go to uk.diesel.com (help-show subpage) #4"
                                  src="~assets/img/clothes_hanger.png"
                              /></nuxt-link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
        <Contentasset />
      </div>
    </section>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Contentasset from "./Contentasset";
export default {
  components: {
    Contentasset,
  },

  data() {
    return {
      cmsPagesData: [],
    };
  },
  async fetch() {
    let form = {};
    form.service = "cms_page";
    form.store = 1;

    let cmsData = await this.$store.dispatch("pimAjax", {
      method: "get",
      url: `/pimresponse.php`,
      params: form,
    });
    this.cmsPagesData = cmsData.result;
  },
};
</script>
<style scoped>
@import url("@/assets/css/pages-css/cms.css");
.all-cms-content {
  width: 100%;
  text-align: center;
}
.view-all-cms .content h5 {
  font-weight: 700;
  margin: 20px 0px;
  text-transform: uppercase;
  font-size: 1.8rem;
  padding-top: 2rem;
  padding-bottom: 4rem;
}
.row-mt-30 {
  margin-top: 30px;
}
.view-all-cms .content-asset {
  margin-top: 0px !important;
  padding-left: 20px;
}
.row.pd-bottom {
  padding-bottom: 40px;
}
.view-all-cms .show_submenu {
  height: 293px;
  overflow: auto;
}
/* ================== scrool css =================== */

::-webkit-scrollbar {
  width: 8px;
}
/* Track */

::-webkit-scrollbar-track {
  -webkit-border-radius: 10px;
  border-radius: 10px;
}
/* Handle */

::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: #ccc;
}

::-webkit-scrollbar-thumb:window-inactive {
  background: #ccc;
}
/* =================== single product page css =============== */
</style>