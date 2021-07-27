<template>
  <div>
    <div v-if="Object.keys(cmsData).length != 0">
      <span v-html="cmsData"></span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cmsData: {},
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
    // this.$store.commit("setCmsData", cmsData);
    let pageData = cmsData.result[this.$route.params.cmsPage];
    if (pageData != undefined) {
      this.cmsData = pageData.content;
    } else {
      this.$router.push("/404");
    }
  },
};
</script>
