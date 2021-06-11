<template>
  <div class="cms_page">
    <div class="containers">
      <div class="top-search">
        <h4 class="help_headline">{{title}}</h4>
      </div>
      <div class="row">
        <div class="col-md-3 col-12">
          <div class="content-asset">
            <div class="headline-wrapper">
              <h3 class="support_headline">
                <b>TOPICS</b>
              </h3>
              <!-- <p class="back_to_help"><b>BACK TO HELP</b></p> -->
            </div>
            <div class="help_menu_holder">
              <ul class="submenu show_submenu">
                <li
                  v-for="(item, index) in cmsData"
                  :key="index"
                  :title="item.name"
                  :class="{active : item.content == tapData}"
                >
                  <a @click.prevent="updateData(item)">{{ item.name }}</a>
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
export default {
  components: {
    Contentasset,
  },
  data() {
    return {
      cmsData: {},
      tapData: "",
      title: ""
    };
  },

  methods: {
    updateData(name) {
      this.tapData = name.content;
    },
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
        for (var a in cmsData.result) {
          this.tapData = cmsData.result[a].content;
          this.title = cmsData.result[a].parent_name;
          return;
        }
      }
    }
  },
};
</script>
<style scoped>
@import url("@/assets/css/pages-css/cms.css");
</style>
