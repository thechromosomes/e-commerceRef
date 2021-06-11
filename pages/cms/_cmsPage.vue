<template>
  <div>
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
    VTab,
  },
  data() {
    return {
      cmsData: {},
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
        params: form,
      });
      if (cmsData.response.success) {
        this.cmsData = cmsData.result;
      }
    }
  },
};
</script>
