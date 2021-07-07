<template>
  <div class="cms_page">
    <div class="containers">
      <div class="top-search">
        <h4 class="help_headline">{{ title }}</h4>
      </div>
      <div class="row">
        <div class="col-lg-3 col-12">
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
                  :class="{ active: item.content == tapData }"
                  v-bind="
                    rendeSeo(
                      item.meta_title,
                      item.meta_description,
                      item.meta_keyword,
                      item.parent_name
                    )
                  "
                >
                  <a @click.prevent="updateData(item)">{{ item.name }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-9 col-12">
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
import $ from "jquery";

export default {
  components: {
    Contentasset,
  },
  data() {
    return {
      cmsData: {},
      tapData: "",
      title: "",
      meta_description: "",
      meta_title: "",
      meta_keyword: "diesel",
    };
  },

  head() {
    return {
      title: this.meta_title,
      meta: [
        {
          name: "description",
          content: this.meta_description,
        },
        {
          property: "keywords",
          content: this.meta_keyword,
        },
      ],
    };
  },

  methods: {
    updateData(name) {
      this.tapData = name.content;
    },
    rendeSeo(title, description, meta_keyword, url_key) {
      if (url_key == this.$route.params.cmsPage) {
        this.meta_description = description;
        this.meta_keyword = meta_keyword;
        this.meta_title = title;
      }
    },

    vanillaJs() {
      var clickMe = document.querySelectorAll(".set");
      if (clickMe) {
        clickMe.forEach((event) => {
          event.addEventListener("click", () => {
            event.classList.toggle("active");
          });
        });
      }
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
      if (cmsData.response.success != 0) {
        this.cmsData = cmsData.result;
        for (var a in cmsData.result) {
          this.tapData = cmsData.result[a].content;
          this.title = cmsData.result[a].parent_name;
          return;
        }
      } else {
        this.$router.push("/404");
      }
    }
  },

  mounted() {
    if (this.$route.params.cmsPage === "size-conversion") {
      this.vanillaJs();
    }
  },

  updated() {
    if (this.$route.params.cmsPage === "size-conversion") {
      this.vanillaJs();
    }
  },
};
</script>
<style scoped>
@import url("@/assets/css/pages-css/cms.css");
</style>
