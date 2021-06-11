<template>
  <div class="cms_page ">
    <!-- <div class="cms_page_content">
      <vue-tabs
        active-tab-color="#e74c3c"
        active-text-color="white"
        type="pills"
        :start-index="1"
        direction="vertical"
      >
        <v-tab v-for="(item, index) in cmsData" :key="index" :title="item.name">
          <span v-html="item.content"></span>
        </v-tab>
      </vue-tabs>
    </div> -->

    <div class="containers">
      <div class="top-search">
        <h4 class="help_headline">Help</h4>
      </div>
      <div class="row">
        <div class="col-md-3 col-12">
          <div class="content-asset">
            <div class="headline-wrapper">
              <h3 class="support_headline">
                <b>SUPPORT TOPICS</b>
              </h3>
              <p class=" back_to_help"><b>BACK TO HELP</b></p>
            </div>
            <div class="help_menu_holder">
              <ul class="submenu show_submenu">
                <li
                  v-for="(item, index) in cmsData"
                  :key="index"
                  :title="item.name"
                  :class="active"
                >
                  <a href="#">{{ item.name }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-9 col-12">
          <span v-html="tapData"></span>
        </div>
      </div>
    </div>

    <div class="container">
      <Contentasset />
    </div>
  </div>
</template>
<script>
import Contentasset from "./Contentasset";
import { VueTabs, VTab } from "vue-nav-tabs";
import "vue-nav-tabs/themes/vue-tabs.css";
export default {
  components: {
    Contentasset,
    VueTabs,
    VTab
  },
  data() {
    return {
      cmsData: {},
      tapData: ""
    };
  },

  async fetch() {
    let url = this.$route.params.cmsPage;
    if (url == undefined) {
      this.$router.push("/404");
    } else {
      let form = {};
      form.service = "cms_page";
      form.store = 1;
      form.parent_name = url;

      let cmsData = await this.$store.dispatch("pimAjax", {
        method: "get",
        url: `/pimresponse.php`,
        params: form
      });
      if (cmsData.response.success) {
        this.cmsData = cmsData.result;
        this.tapData = cmsData.result;
      }
    }
  }
};
</script>
<style scoped>
@import url("@/assets/css/pages-css/cms.css");
</style>
