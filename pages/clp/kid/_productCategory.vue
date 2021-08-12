<template>
  <div class="clp_pages kid">
    <div v-html="cmsData.content"></div>

    <NewIn :slideImg="newIn" />
    <!-- <ProductSilder :slideImg="jeans" /> -->
    <!-- <div v-html="cmsData.content_1"></div> -->

    <div class="shop_by_category kids">
      <div class="shop_by_category_items w-100">
        <div
          class="item"
          v-for="(ShopByItem, ShopByIndex) in ShopByCategory"
          :key="ShopByIndex"
        >
          <div class="img-box">
            <img :src="ShopByItem.image" alt="img" class="w-100" />
          </div>
          <h5>{{ ShopByItem.name }}</h5>
        </div>
      </div>
    </div>
    <!-- new design -->
    <div class="item-four-show d-none" v-if="jboys && jboys.length > 0">
      <h4 class="title" style="background: #2c3e50">JUNIOR BOYS & GIRLS</h4>
      <div class="item-box">
        <div
          class="item"
          v-for="(item, index) in jboys.slice(0, 8)"
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
export default {
  components: {
    NewIn
  },
  data() {
    return {
      slideItem: [1, 2, 3, 4, 5, 6, 7, 8],
      Item: [1, 2, 3, 4],
      jboys: [],
      cmsData: [],
      newIn: [],
      ShopByCategory: [
        {
          image: require("@/assets/img/2placeholder.jpg"),
          name: "Denim"
        },
        {
          image: require("@/assets/img/2placeholder.jpg"),
          name: "T-shirts"
        },
        {
          image: require("@/assets/img/2placeholder.jpg"),
          name: "Shirts"
        },
        {
          image: require("@/assets/img/2placeholder.jpg"),
          name: "Loungewear"
        }
      ]
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
          params: form
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
            error: "Oops there seems to be some Network issue, please try again"
          });
        }
      }
    }
  },
  async created() {
    let form = {};
    form.service = "cms_page";
    form.store = 1;
    form.url_key = "kid-clp";

    let cmsData = await this.$store.dispatch("pimAjax", {
      method: "get",
      url: `/pimresponse.php`,
      params: form
    });
    this.cmsData = cmsData.result["kid-clp"];
    this.getProductList("kid-apparel-all-apparel", "jboys");
    this.getProductList("kid-new-arrivals", "newIn");
  }
};
</script>

<style scoped>
/* @import url("@/assets/css/clp-page.css");  */
</style>
