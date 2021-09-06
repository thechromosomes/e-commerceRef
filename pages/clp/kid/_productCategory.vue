<template>
  <div class="clp_pages kid">
    <div v-html="cmsData.content"></div>

    <NewIn :slideImg="newIn" />

    <div class="shop_by_category kids">
      <div class="shop_by_category_items w-100">
        <template v-for="(ShopByItem, ShopByIndex) in bannerSlide">
          <div
            class="item"
            v-if="ShopByItem.banner_type === 'Kid'"
            :key="ShopByIndex"
          >
            <nuxtLink :to="`/${ShopByItem.url}`">
              <div class="img-box">
                <img :src="ShopByItem.desktop_image" alt="img" class="w-100" />
              </div>
              <h5>{{ ShopByItem.title }}</h5>
            </nuxtLink>
          </div>
        </template>
      </div>
    </div>
    <!-- new design -->
    <div class="item-four-show" v-if="jboys.length > 0">
      <h4 class="title" style="background: #2c3e50">JUNIOR BOYS & GIRLS</h4>
      <div class="item-box">
        <div
          class="item"
          v-for="(item, index) in jboys.slice(0, 4)"
          :key="index"
        >
          <img :src="item.image" alt="" class="w-100" />
          <div class="content">
            <h3 class="module-title">
              <a :href="`/product/${item.url_key}`">{{ item.name }}</a>
            </h3>
            <a class="module-link" :href="`/product/${item.url_key}`"
              >SHOP NOW</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewIn from "../clpComponents/newIn";
import { mapState } from "vuex";

export default {
  components: {
    NewIn,
  },

  computed: {
    ...mapState(["bannerSlide"]),
  },
  data() {
    return {
      jboys: [],
      cmsData: [],
      newIn: [],
    };
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
    form.url_key = "kid-clp";

    let cmsData = await this.$store.dispatch("pimAjax", {
      method: "get",
      url: `/pimresponse.php`,
      params: form,
    });
    this.cmsData = cmsData.result["kid-clp"];
    this.getProductList("kid-jeans", "jboys");
    this.getProductList("kid-new-arrivals", "newIn");
  },
};
</script>

<style scoped>
/* @import url("@/assets/css/clp-page.css");  */
</style>
