<template>
  <div class="clp_pages">
    <div v-html="cmsData.content"></div>
    <FitGuide :FitGuides="FitGuides" />
    <NewIn :slideImg="newIn"  header="NEW IN"/>
    <NewIn :slideImg="Footwear"  header="SNEAKERS"/>

    <span v-html="cmsData.content_1"></span>
  </div>
</template>

<script>
import NewIn from "../clpComponents/newIn";
import FitGuide from "../clpComponents/FitGuide";

import { mapState } from "vuex";
export default {
  components: {
    NewIn,
    FitGuide,
  },
  data() {
    return {
      FitGuides: [
        {
          image:
            "https://diesel.gumlet.io/fit_images/man-denim-skinny.jpg?w=200&dpr=1.0",
          name: "SKINNY",
          url: "/collections/man-jeans-new-arrival-jeans/?filter=fit~skinny",
        },
        {
          image:
            "https://diesel.gumlet.io/fit_images/man-denim-slim.jpg?w=200&dpr=1.0",
          name: "Slim",
          url: "/collections/man-jeans-new-arrival-jeans/?filter=fit~slim",
        },
        {
          image:
            "https://diesel.gumlet.io/fit_images/man-denim-straight.jpg?w=200&dpr=1.0",
          name: "Straight",
          url: "/collections/man-jeans-new-arrival-jeans/?filter=fit~straight",
        },
        {
          image:
            "https://diesel.gumlet.io/fit_images/man-denim-tapered.jpg?w=200&dpr=1.0",
          name: "Tapered",
          url: "/collections/man-jeans-new-arrival-jeans/?filter=fit~tapered",
        },
        {
          image:
            "https://diesel.gumlet.io/fit_images/man-denim-carrot.jpg?w=200&dpr=1.0",
          name: "Carrot",
          url: "/collections/man-jeans-new-arrival-jeans/?filter=fit~tapered&filter=fit~carrot",
        },
        {
          image:
            "https://diesel.gumlet.io/fit_images/man-denim-bootcut.jpg?w=200&dpr=1.0",
          name: "Bootcut",
          url: "/collections/man-jeans-new-arrival-jeans/?filter=fit~tapered&filter=fit~carrot&filter=fit~bootcut",
        },
      ],
      jackets: [],
      newIn: [],
      Footwear: [],
      accessories: [],
      trending: [],
      cmsData: [],
    };
  },
  computed: {
    ...mapState(["is_new"]),
  },

  methods: {
    async getProductList(url, dataplaceholder) {
      try {
        let { service, store, page, count } = this.$store.state.list;

        let form = {};
        form.service = service;
        form.store = store;
        form.url_key = url;
        form.page = 1;
        form.count = count;

        let response = await this.$store.dispatch("pimAjax", {
          method: "post",
          url: `/pimresponse.php`,
          params: form,
        });

        if (response) {
          this[dataplaceholder] = response.result.products;
        } else {
          throw "there is error from all product page >> no response";
        }
      } catch (error) {
        this.$globalError(`error from all product page >>>> ${error}`);
        if (error.message === "Network Error") {
          this.$store.commit("updateState", {
            error:
              "Oops there seems to be some Network issue, please try again",
          });
        }
      }
    },
  },
  async created() {
    let form = {};
    form.service = "cms_page";
    form.store = 1;
    form.url_key = "man-clp";

    let cmsData = await this.$store.dispatch("pimAjax", {
      method: "get",
      url: `/pimresponse.php`,
      params: form,
    });
    this.cmsData = cmsData.result["man-clp"];
    this.getProductList("man-apparel-jackets", "jackets");
    this.getProductList("mlp-new-in", "newIn");
    this.getProductList("man-shoes-sneakers", "Footwear");
    this.getProductList("mlp-best sellers", "trending");
    this.getProductList("mlp-all-accessories", "accessories");
  },
};
</script>

<style scoped>
/* @import url("@/assets/css/clp-page.css");  */
</style>
