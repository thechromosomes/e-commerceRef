export const state = () => ({
  list: {
    search_input: "",
    page_error: "",
    service: "category",
    description: "",
    meta_title: "",
    meta_description: "",
    meta_keyword: "",
    Product_list: [],
    Product_count: "",
    product_loader: true,
    page: 1,
    filters: [],
    sort: [],
    pass_url_key: "",
    count: 12,
    store: 1,
    total_page: 0,
    pageHead: "",
    applied_filters: [],
    sortingData: { code: "", dir: "desc" },
    totalProduct: 0,
    fit_filter: {},
  },

  singleProductList: {
    url_key: "",
    store: 1,
    service: "product",
    single_prod_data: [],
    product_loader: false,
    total_review: 0,
    average_rating: 0,
    reviews_list: [],
    breadcrumb: [],
  },

  cmsError: "",
  homePageData: {},
  cmsPagesData: {},
  header: [],
  pageLoader: true,
  // base URL is using in og tags and log generator API >>> all product
  // BASE_URL: "https://di.hostx1.de",
  BASE_URL: "http://localhost:9000",
  pimApi: "https://dipim.hostx1.de/pim",
  isMobile: false,
  instaPost: [],
  bannerSlide: [],
  is_new: [],
  intialSearchPath:""
});

export const actions = {
  pimAjax(context, data) {
    if (!data.params.noLoader) {
      context.commit("updatePageLoader", { display: true });
    }
    let request = data.params;
    var authOptions = {
      method: data.method,
      url: context.state.pimApi + data.url,
      headers: {
        "Content-Type": "application/json",
      },
      params: request,
    };

    return new Promise((resolve, reject) => {
      this.$axios(authOptions)
        .then((response) => {
          context.commit("updatePageLoader", { display: false });
          resolve(response.data);
        })
        .catch((error) => {
          this.$globalError(`error from pimAjax action >>>> ${error}`);
          context.commit("updatePageLoader", { display: false });
          reject(error);
        });
    });
  },

  // fetching data for the home page best seller
  async getBestSeller(context, form) {
    try {
      var authOptions1 = {
        method: form.method,
        url: context.state.pimApi + form.url,
        headers: {
          "Content-Type": "application/json",
        },
        params: form.params,
      };

      let tempResponse = await this.$axios(authOptions1);

      if (tempResponse.data.response.success == 1) {
        context.commit("updateBestSeller", {
          is_new: tempResponse.data.result.is_new,
        });
      } else {
        throw "encountered error while fetching best seller data";
      }
    } catch (error) {
      console.log("error from the get best seller Store action >>", error);
    }
  },

  // fetching home page banner slider
  async getBannerSlider(context, form) {
    try {
      var authOpt = {
        method: form.method,
        url: context.state.pimApi + form.url,
        headers: {
          "Content-Type": "application/json",
        },
        params: form.params,
      };

      let bannerSliderData = await this.$axios(authOpt);

      if (
        bannerSliderData.data.response &&
        bannerSliderData.data.response.success == 1
      ) {
        context.commit("updateBannerSlider", {
          bannerSlide: bannerSliderData.data.result.banner,
        });
      } else {
        throw "encountered error while fetching best seller data";
      }
    } catch (error) {
      console.log("error from the get getBannerSlider Store action >>", error);
    }
  },
};

export const mutations = {
  // set header menu data
  setHeaderData(state, data) {
    state.header = data;
  },

  // get cms data for the home page
  setCmsData(state, cmsData) {
    try {
      if (cmsData.response.success == 1) {
        state.homePageData = cmsData.result.Home;
        state.cmsPagesData = cmsData.result;
      } else {
        throw cmsData.response.error_message || "problem with the api call";
      }
    } catch (error) {
      console.log("error from setCmsData mutation >>>", error);
      this.$globalError(`error from setCmsData mutation >>> ${error}`);
      state.cmsError = error;
    }
  },

  // prepare state for product parameters before call
  prepareState(state, { routeParam, pageNo }) {
    state.list.product_loader = true;
    state.list.page = pageNo;
    state.list.Product_count = "";
    // state.list.sort = [
    //   { code: "default", dir: "desc", label: "default" },
    //   { code: "selling_price", dir: "asc", label: "Price (Low to High)" },
    //   { code: "selling_price", dir: "desc", label: "Price (High to Low)" },
    //   { code: "product_position", dir: "asc", label: "Oldest to newest" },
    //   { code: "product_position", dir: "desc", label: "Newest to oldest" },
    //   { code: "discount", dir: "asc", label: "Discount" },
    // ];

    state.list.sort = [
      { code: "default", dir: "desc", label: "default" },
      { code: "best_matches", dir: "asc", label: "Best Matches" },
      { code: "Product_name", dir: "asc", label: "Product Name A-Z" },
      { code: "Product_name", dir: "desc", label: "Product Name Z-A" },
      { code: "brand", dir: "asc", label: "Brand" },
      { code: "most_popular", dir: "asc", label: "Most popular" },
      { code: "top_sellers", dir: "asc", label: "Top Sellers" },
    ];

    if (pageNo == 1) {
      state.list.Product_list = [];
      state.list.applied_filters = [];
    }
    state.list.pass_url_key = routeParam;
  },

  // to update state data for the product page
  updateState(state, { error, data }) {
    if (error == null) {
      if (data.response.success === 1) {
        if (data.result.products.length === 0) {
          state.list.page_error = "No product found";
        }

        state.list.description = data.result.description;
        state.list.meta_title = data.result.meta_title;
        state.list.meta_description = data.result.meta_description;
        state.list.meta_keyword = data.result.meta_keyword;
        state.list.totalProduct = data.result.product_count;
        // state.list.Product_list = data.result.products;
        state.list.Product_list = state.list.Product_list.concat(
          data.result.products
        );

        state.list.pageHead = data.result.name;
        // state.list.filters = data.result.filters;
        if (
          data.result.filters &&
          data.result.filters.length > 0 &&
          state.list.filters.length == 0
        ) {
          state.list.filters = data.result.filters;
        }
        if (
          data.result.fit_filter &&
          Object.keys(data.result.fit_filter).length != 0 &&
          Object.keys(state.list.fit_filter).length == 0
        ) {
          state.list.fit_filter = data.result.fit_filter.Fit;
        }
        if (data.query.filter) {
          let array = data.query.filter.split(",");
          state.list.applied_filters = array;
        }
        if (!data.query.filter) {
          state.list.applied_filters = [];
        }
        if (data.query.sort_dir && data.query.sort_by) {
          state.list.sortingData.code = data.query.sort_by;
          state.list.sortingData.dir = data.query.sort_dir;
        } else {
          state.list.sortingData.code = "default";
          state.list.sortingData.dir = "desc";
        }
        if (data.query) {
          state.list.total_page = data.query.total_page;
          state.list.page = data.query.page;
        }
        state.list.Product_count = data.result.count;
        state.list.get_product_length = data.result.products.length;
        state.list.product_loader = false;
      } else {
        state.list.page_error = data.response.error_message;
        state.list.product_loader = false;
      }
    } else {
      state.list.page_error = error;
    }
  },

  // prepare state for single product page
  prepareStateForSingleProd(state, { routeParam }) {
    state.singleProductList.product_loader = true;
    state.singleProductList.page = 1;
    state.singleProductList.url_key = routeParam;
  },

  // update the single product state
  updateSingleProdState(state, { error, data }) {
    if (error == null) {
      if (data.response.success === 1) {
        if (!data.result) {
          state.list.page_error =
            "No product found, please try by removing last applied filter.";
        }
        state.singleProductList.single_prod_data = data.result;
        state.singleProductList.breadcrumb = JSON.parse(data.result.breadcrumb);
      } else {
        state.singleProductList.page_error = data.response.error_message;
        state.singleProductList.product_loader = false;
      }
    } else {
      state.list.page_error = error;
    }
  },

  // blank filter
  blankfilter(state) {
    state.list.filters = [];
    state.list.fit_filter = {};
  },

  // update filter array
  updateFilterArray(state, { item, paramsData }) {
    let filterParam;
    if (item) {
      filterParam = `${item.code}~${item.value_key}`;
    }
    if (paramsData) {
      filterParam = paramsData;
    }
    if (state.list.applied_filters.length == 0) {
      state.list.applied_filters.push(filterParam);
      this.$router.push({
        query: {
          ...this.$router.app.context.query,
          filter: state.list.applied_filters,
        },
      });
      return;
    }
    let i = state.list.applied_filters.findIndex(
      (_item) => _item === filterParam
    );
    if (i > -1) {
      state.list.applied_filters.splice(i, 1);
      this.$router.push({
        query: {
          ...this.$router.app.context.query,
          filter: state.list.applied_filters,
        },
      });
      return;
    } else {
      state.list.applied_filters.push(filterParam);
      this.$router.push({
        query: {
          ...this.$router.app.context.query,
          filter: state.list.applied_filters,
        },
      });
      return;
    }
  },

  // universal Mutate function
  universalListMutate(state, { data }) {
    state.list.page = data;
  },

  // update state via color variation
  updateProductColor(state, { product, index }) {
    try {
      let tempPost = { ...state.list.Product_list[index] };
      tempPost.image = product.image;
      tempPost.price = product.price;
      tempPost.url_key = product.url_key;
      tempPost.color = product.color;
      console.log(tempPost);

      state.list.Product_list.splice(index, 1, tempPost);
    } catch (error) {
      console.log("error from update product color >>> ", error);
      this.$globalError(`error from update product color >>> ${error}`);
    }
  },

  // update loader status
  updatePageLoader(state, { display }) {
    state.pageLoader = display;
  },

  // update device information
  updateDeviceInfo(state, { payload }) {
    state.isMobile = payload;
  },

  // update new in data
  updateBestSeller(state, { is_new }) {
    state.is_new = is_new;
  },

  // update banner slider
  updateBannerSlider(state, { bannerSlide }) {
    state.bannerSlide = bannerSlide;
  },

  // initial search Path
  intialSearchPath(state, payload) {
    state.intialSearchPath = payload;
  },

    st_search(state, searchInput) {
    if (searchInput == undefined) {
      state.list.search_input = "";
    } else {
      state.list.search_input = searchInput;
    }
  },
};
