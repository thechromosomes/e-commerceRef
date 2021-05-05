// generating token for the api call and fetching CMS data for the home page

export default async (context) => {
  try {

    let form = {};
    form.service = "cms_page";
    form.store = 1;

    let cmsData = await context.store.dispatch("pimAjax", {
      method: "get",
      url: `pimresponse.php`,
      params: form,
    });
    context.store.commit("setCmsData", cmsData);


    // set header menu
    let header = {};
    header.service = "menu";
    header.store = 1;
    let headerData = await context.store.dispatch("pimAjax", {
      method: "get",
      url: `pimresponse.php`,
      params: header,
    });

    // get new in slider data
    let bestSellerForm = {};
    bestSellerForm.service = "is_new";
    bestSellerForm.store = 1;
    context.store.dispatch("getBestSeller", {
      method: "get",
      url: `pimresponse.php`,
      params: bestSellerForm,
    });

    if (headerData.result.length > 0 && headerData.response.success == 1) {
      context.store.commit("setHeaderData", headerData.result);
    } else {
      throw "while fetching header menu data from backend API";
    }
  } catch (error) {
    context.$globalError(
      `there is an error from token and cms plugin >>> ${error}`
    );
  }
};
