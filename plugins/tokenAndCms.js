// generating token for the api call and fetching CMS data for the home page

export default async (context) => {
  try {
    let form = {};
    form.service = "cms_page";
    form.store = 1;

    let cmsData = await context.store.dispatch("pimAjax", {
      method: "get",
      url: `/pimresponse.php`,
      params: form,
    });
    context.store.commit("setCmsData", cmsData);

    // set header menu
    let header = {};
    header.service = "menu";
    header.store = 1;
    let headerData = await context.store.dispatch("pimAjax", {
      method: "get",
      url: `/pimresponse.php`,
      params: header,
    });
    if (headerData.result.length > 0 && headerData.response.success == 1) {
      context.store.commit("setHeaderData", headerData.result);
    } else {
      throw "while fetching header menu data from backend API";
    }

    //  get bannerSlide
    context.store.dispatch("getBannerSlider", {
      method: "get",
      url: `/pimresponse.php`,
      params: {
        service: "banner_slider",
        store: 1,
      },
    });

    // is new api call
    let bestSellerForm = {};
    bestSellerForm.service = "is_new";
    bestSellerForm.store = 1;
    context.store.dispatch("getBestSeller", {
      method: "get",
      url: `/pimresponse.php`,
      params: bestSellerForm,
    });
  } catch (error) {
    context.$globalError(
      `there is an error from token and cms plugin >>> ${error}`
    );
  }
};
