<template>
  <div class="clp_pages woman">
    <div v-html="cmsData.content"></div>

    <div class="">
      <FitGuide :FitGuides="FitGuides" />
    </div>

    <NewIn :slideImg="newOne" header="NEW IN" />

    <NewIn :slideImg="topsWear" header="TOP WEAR" />

    <NewIn :slideImg="dresses" header="DRESSES" />
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
            "https://diesel.gumlet.io/fit_images/woman-denim-skinny.jpg?w=500&dpr=1.0",
          name: "Super Skinny",
          url: "collections/woman-jeans-new-arrival-jeans/?filter=fit~skinny",
        },
        {
          image:
            "https://diesel.gumlet.io/fit_images/woman-denim-slim.jpg?w=500&dpr=1.0",
          name: "Slim",
          url: "/collections/man-jeans-new-arrival-jeans/?filter=fit~slim",
        },
        {
          image:
            "https://diesel.gumlet.io/fit_images/woman-denim-straight.jpg?w=500&dpr=1.0",
          name: "Straight",
          url: "collections/woman-jeans-new-arrival-jeans/?filter=fit~straight",
        },
        {
          image:
            "https://diesel.gumlet.io/fit_images/woman-denim-boyfriend.jpg?w=500&dpr=1.0",
          name: "Boyfriend",
          url: "collections/woman-jeans-new-arrival-jeans/?filter=fit~boyfriend",
        },
        {
          image:
            "https://diesel.gumlet.io/fit_images/woman-denim-wide.jpg?w=500&dpr=1.0",
          name: "Flare/Wide",
          url: "/collections/woman-jeans-new-arrival-jeans/?filter=fit~wide",
        },
        {
          image:
            "https://diesel.gumlet.io/fit_images/woman-denim-bootcut.jpg?w=500&dpr=1.0",
          name: "Bootcut",
          url: "collections/woman-jeans-new-arrival-jeans/?filter=fit~bootcut",
        },
      ],
      newOne: [],
      sneakers: [],
      topsWear: [],
      dresses: [],
      cmsData: [],
    };
  },
  computed: {
    ...mapState(["is_new", "cmsPagesData", "bannerSlide"]),
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
    form.url_key = "women-clp";

    let cmsData = await this.$store.dispatch("pimAjax", {
      method: "get",
      url: `/pimresponse.php`,
      params: form,
    });
    this.cmsData = cmsData.result["women-clp"];
    this.getProductList("woman-apparel-tshirts---tops", "topsWear");
    this.getProductList("wlp-new-in", "newOne");
    this.getProductList("wlp-new-in", "dresses");
  },
};
</script>

<style scoped>
@import url("@/assets/css/clp-page.css");
</style>
