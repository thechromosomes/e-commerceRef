<template>
  <div>
    <div class="product_list_page">
      <div class="search-banner content-slot slot-grid-header">
        <div class="mobile_only">
          <div class="search-banner-mobile">
            <div
              class="
                js_search-banner-arrow-back-mobile
                search-banner-arrow-back-mobile
              "
            >
              <span class="icon-arrow-black-left" role="navigation"></span>
            </div>
            <div
              class="search-banner-title-mobile"
              v-if="list.Product_list.length > 0"
            >
              {{ list.pageHead.toUpperCase() }}
            </div>
            <div class="search-banner-result-count-mobile">
              <span> {{ list.totalProduct }} Results </span>
            </div>
          </div>
        </div>
        <div
          class="search-banner-desktop desktop_only"
          v-if="list.Product_list.length > 0"
        >
          <div class="search-banner-content">
            <h1 class="search-banner-title search-black">
              {{ list.pageHead.toUpperCase() }}
            </h1>

            <span
              class="hiden-arrow"
              v-if="list.description != null && list.description != ''"
              @click="titleContent = true"
              :class="titleContent ? 'hide' : ''"
            ></span>
            <div class="hidden-text" v-if="titleContent">
              <p>
                {{ list.description }}
              </p>
            </div>
          </div>
        </div>
        <!-- visual-filters -->
        <div
          class="visual-filters"
          v-if="list.fit_filter && Object.keys(list.fit_filter).length != 0"
        >
          <div class="visual-filter-texts">
            <h6>SHOP BY FIT</h6>
          </div>
          <div class="visual-filters-container">
            <client-only>
              <VueSlickCarousel ref="slick" v-bind="settings">
                <div
                  class="category-filter"
                  v-for="(fitFilterItem, FitFilterIndex) in list.fit_filter"
                  :key="FitFilterIndex"
                  :class="
                    list.applied_filters.findIndex(
                      (x) =>
                        x === `${fitFilterItem.code}~${fitFilterItem.value_key}`
                    ) >= 0
                      ? 'active'
                      : ''
                  "
                >
                  <span
                    class="active-arrow-colse"
                    @click="
                      removeFilter(
                        `${fitFilterItem.code}~${fitFilterItem.value_key}`
                      )
                    "
                  ></span>
                  <div class="item" @click="handleFitFilter(fitFilterItem)">
                    <div class="filter-image">
                      <img :src="fitFilterItem.image" alt="img" class="w-100" />
                    </div>
                    <div class="category-filter-title">
                      <a>{{ fitFilterItem.value }}</a>
                    </div>
                  </div>
                </div>
              </VueSlickCarousel>
            </client-only>
          </div>
        </div>
        <!-- visual-filters end  sticky-->
        <div class="mobile_only">
          <div
            class="mobile-refinement-bar"
            :class="[scrollPosition > 400 ? 'sticky' : '']"
          >
            <div class="filter-sort-button-holder" @click="mobileFilter = true">
              <div class="filter-results">
                <span class="filter-sort-button-name">Filter-Sort By</span>
              </div>
            </div>
          </div>

          <div class="mobile-filter-bg" v-if="mobileFilter">
            <div class="mobile-filter-bg-white">
              <!-- sort-bar -->
              <div class="mobile-filter-sort-bar">
                <div class="mobile-header-title">
                  <h5>Sort By</h5>
                  <button
                    class="pull-right icon-close-black close"
                    @click="mobileFilter = false"
                  >
                    <i class="fa fa-close"></i>
                  </button>
                </div>
                <div class="sort-options-mobile">
                  <div class="group">
                    <div
                      class="radio-button-sort"
                      v-for="(sort, sortIndex) in list.sort"
                      :key="sortIndex"
                      @click="sortProduct(sort)"
                    >
                      <input
                        type="radio"
                        class="sort-radio sort-option"
                        :id="sort.label"
                        name="sort-by"
                      />
                      <label :for="sort.label" class="sort-radio-label">
                        {{ sort.label }}</label
                      >
                    </div>

                    <hr />
                  </div>
                </div>
              </div>
              <!-- sort-bar end -->
              <div class="mobile-filter-box">
                <div class="mobile-filter-header">
                  <h5>
                    Filter By
                    <span
                      class="total-selected d-lg-none"
                      v-show="list.applied_filters.length > 0"
                    >
                      {{ list.applied_filters.length }}
                    </span>
                  </h5>
                </div>
                <div class="mobile-filters">
                  <div
                    class="refinements-holder"
                    v-if="list.filters.length > 0"
                  >
                    <div class="container-fluids">
                      <div class="filter_box">
                        <div class="refinements">
                          <div
                            class="card refinement refinement-category"
                            :class="filterIndex == activeDropdown ? 'open' : ''"
                            v-for="(filter, filterIndex) in list.filters"
                            :key="filterIndex"
                          >
                            <h2
                              class="js_card-header card-header"
                              tabindex="0"
                              @click="activeDropdownToggle(filterIndex)"
                            >
                              <span class="filter-title js_title">
                                {{ filter.filter_lable }}
                                <!-- <span
                                  class=" total-selected d-lg-none"
                                  v-show="list.applied_filters.length > 0"
                                >
                                  {{ list.applied_filters.length }}
                                </span> -->
                              </span>
                              <span
                                class="
                                  select-arrow
                                  icon-arrow-mid-down-black
                                  js_select-arrow
                                "
                              ></span>
                            </h2>
                            <div class="hidden_filtter">
                              <ul class="sort-options">
                                <li
                                  class="sort-option best-matches"
                                  v-for="(item, index) in filter.options"
                                  :key="index"
                                >
                                  <span
                                    @click.prevent="updateFilterArray(item)"
                                  >
                                    <a
                                      class="selection-box"
                                      :class="
                                        list.applied_filters.findIndex(
                                          (x) =>
                                            x ===
                                            `${item.code}~${item.value_key}`
                                        ) >= 0
                                          ? 'selected-box'
                                          : 'not-selected-box'
                                      "
                                      >{{ item.value }}</a
                                    >
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- filter end -->

              <div class="clear-apply-wrapper">
                <div class="button-container">
                  <button
                    class="secondary-btn clear"
                    @click="removeAllFilters()"
                  >
                    Clear
                  </button>
                </div>
                <div class="button-container">
                  <button
                    class="primary-btn apply-filters"
                    @click="mobileFilter = false"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- desktop_only class add  -->
    <div
      class="refinements-holder"
      :class="openFiltter == true ? '' : 'desktop_only'"
      v-if="list.filters.length > 0"
    >
      <div class="container-fluid">
        <div class="filter_box">
          <div class="filter-header">
            <span>Filter By</span>
            <span
              class="mobile_only claose_filter"
              @click="openFiltter = false"
            ></span>
          </div>
          <div class="refinements">
            <div
              class="card refinement refinement-category"
              :class="filterIndex == activeDropdown ? 'open' : ''"
              v-for="(filter, filterIndex) in list.filters"
              :key="filterIndex"
            >
              <h2
                class="js_card-header card-header"
                tabindex="0"
                @click="activeDropdownToggle(filterIndex)"
              >
                <span class="filter-title js_title">
                  {{ filter.filter_lable }}
                  <span
                    class="js_total-selected total-selected d-lg-none"
                    data-selected="0"
                  >
                  </span>
                </span>
                <span
                  class="select-arrow icon-arrow-mid-down-black js_select-arrow"
                ></span>
              </h2>
              <div class="hidden_filtter">
                <ul class="sort-options">
                  <li
                    class="sort-option best-matches"
                    v-for="(item, index) in filter.options"
                    :key="index"
                  >
                    <span @click.prevent="updateFilterArray(item)">
                      <a
                        class="selection-box"
                        :class="
                          list.applied_filters.findIndex(
                            (x) => x === `${item.code}~${item.value_key}`
                          ) >= 0
                            ? 'selected-box'
                            : 'not-selected-box'
                        "
                        >{{ item.value }}</a
                      >
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- applied filters -->
    <div class="desktop_only" v-if="list.applied_filters.length > 0">
      <div class="filter-bar">
        <div class="filter-clearall-container">
          <a
            class="reset"
            style="cursor: pointer"
            @click.prevent="removeAllFilters()"
          >
            Clear all
          </a>
        </div>
        <ul class="filters-close-main-container">
          <li
            class="filter-value"
            style="cursor: pointer"
            v-for="(appliedFilter, filterIndex) in list.applied_filters"
            :key="filterIndex"
            @click="removeFilter(appliedFilter)"
          >
            <a class="filter-close-container" style="cursor: pointer">
              {{ appliedFilter }}
              <div class="icon-close-black icon-close-black-filter"></div>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="search-results">
      <div class="tab-content">
        <div class="container-fluid">
          <div class="product-results-container">
            <div
              class="search-result-options"
              :class="openSort == true ? 'active' : ''"
            >
              <div
                class="showing-results"
                v-show="list.Product_list.length > 0"
              >
                Showing: {{ list.totalProduct }} Product(s)
              </div>
              <div class="sort-order" v-show="list.Product_list.length > 0">
                <div class="sort-list" :class="showSort ? 'open' : ''">
                  <div class="sort-label" @click="() => (showSort = !showSort)">
                    <span
                      class="sort-selected-option"
                      v-if="sorting === 'default'"
                    >
                      Sort By</span
                    >
                    <span class="sort-selected-option" v-else>
                      {{ sorting }}</span
                    >
                    <span class="select-arrow icon-arrow-mid-down-black"></span>
                  </div>

                  <ul class="sort-options" aria-hidden="true">
                    <li
                      class="sort-option best-matches"
                      v-for="(sort, sortIndex) in list.sort"
                      :key="sortIndex"
                      @click="sortProduct(sort)"
                    >
                      {{ sort.label }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="product_lists" v-if="list.Product_list.length > 0">
              <div class="row">
                <div
                  class="col-lg-3 col-md-6 col-6"
                  v-for="(singleProd, prodIndex) in list.Product_list"
                  :key="prodIndex"
                >
                  <div class="product_list_item">
                    <div class="wish-list-icon">
                      <span
                        class="wishlist_blank"
                        :id="$store.state.cartAjax.wishlist.group"
                        :class="renderWishList(singleProd)"
                        @click.prevent="
                          addRemoveWishList(
                            singleProd,
                            renderWishList(singleProd),
                            prodIndex
                          )
                        "
                      ></span>
                    </div>
                    <div class="offers">
                      <span>{{ singleProd.promotional_tags }}</span>
                    </div>
                    <client-only>
                      <div
                        class="list_slide"
                        v-if="singleProd.gallery.length > 0"
                      >
                        <VueSlickCarousel v-bind="productSetting">
                          <div
                            class="item lazy-loader"
                            v-for="(image, imgIndex) in singleProd.gallery"
                            :key="imgIndex"
                          >
                            <Nuxt-link :to="`/product/${singleProd.url_key}`">
                              <img v-lazy="image.image" class="w-100" />
                            </Nuxt-link>
                          </div>
                        </VueSlickCarousel>
                      </div>
                    </client-only>
                    <div class="title-body">
                      <p class="p-price">
                        <span
                          v-if="
                            singleProd.discount != '' && singleProd.discount > 0
                          "
                        >
                          ₹{{ singleProd.selling_price | numberWithCommas }}
                          <span class="line-throu"
                            >₹{{ singleProd.price | numberWithCommas }}</span
                          ><span style="opacity: 0.5; font-weight: 500"
                            >({{ singleProd.discount }}% Off)</span
                          >
                        </span>
                        <span v-else
                          >₹{{ singleProd.price | numberWithCommas }}</span
                        >
                      </p>
                      <p>{{ singleProd.color }}</p>
                      <Nuxt-link :to="`/product/${singleProd.url_key}`">{{
                        singleProd.name
                      }}</Nuxt-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="no_products text-center"
              v-else-if="
                list.Product_list.length == 0 &&
                list.product_loader == false &&
                $store.state.pageLoader == false
              "
            >
              <h1>Sorry !</h1>
              <p>{{ list.page_error }}</p>
              <img
                src="@/assets/img/no_product.png"
                alt="no-product"
                class="no-product_img"
              />
            </div>
            <!-- loader image -->
            <div class="align-center product_loader">
              <img
                v-show="
                  list.product_loader === true && list.Product_list.length > 0
                "
                src="~/assets/img/giphy.gif"
                width="40px"
              />
            </div>

            <div class="show-more">
              <div
                class="loading-small show-more-spinner js_show-more-spinner"
                style="display: none"
              ></div>
              <div
                class="you-have-seen js_you-have-seen"
                v-show="list.Product_list.length > 0"
              >
                You've seen {{ list.Product_list.length }} of
                {{ list.totalProduct }} product(s)
              </div>
            </div>
          </div>

          <!-- lie -->
          <YouMayLike :likeData="likeData" />
        </div>
      </div>
    </div>
    <button
      class="back-to-top-box enabled"
      v-show="scrollPosition > 50"
      @click="scrollToTop()"
    >
      <i class="icon-arrow-white-up back-to-top-arrow"></i>
    </button>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import { mapState } from "vuex";
import YouMayLike from "./YouMayLike";
export default {
  components: { VueSlickCarousel, YouMayLike },
  data() {
    return {
      titleContent: false,
      scrollPosition: "",
      activeDropdown: -1,
      showSort: false,
      gtm_product_impressions: [],
      productSetting: {
        lazyLoad: "ondemand",
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
      },
      settings: {
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 3,
        dots: false,
        arrows: true,
        autoplay: false,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "0px",
              slidesToShow: 3.5,
            },
          },
          {
            breakpoint: 767,
            settings: {
              arrows: false,
              centerMode: false,
              centerPadding: "0px",
              slidesToShow: 3,
            },
          },
        ],
      },
      sorting: "default",
      openFiltter: false,
      openSort: false,
      likeData: [],
      mobileFilter: false,
    };
  },

  head() {
    return {
      title: this.list.meta_title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.list.meta_description,
        },
        {
          hid: "keyword",
          name: "keyword",
          content: this.list.meta_keyword,
        },
        {
          hid: "og:title",
          content: this.title,
          property: "og:title",
        },
        {
          hid: "og:description",
          content: this.description,
          property: "og:description",
        },
        {
          hid: "og:url",
          content: this.url,
          property: "og:url",
        },
      ],
    };
  },

  methods: {
    servergtm() {
      this.$gtm.push({
        event: "impressionSent",
        action: "Product Impression",
        label: "Product List page",
        category: this.list.pageHead,
        ecommerce: {
          currencyCode: "INR",
          impressions: this.gtm_product_impressions,
        },
      });
    },
    async getProductList(page) {
      let pageNumber;
      page != undefined ? (pageNumber = page) : (pageNumber = 1);
      try {
        await this.$store.commit("prepareState", {
          routeParam: this.$route.params.productCategory,
          pageNo: pageNumber,
        });
        let { service, store, pass_url_key, page, count } =
          this.$store.state.list;

        let form = {};
        form.service = service;
        form.store = store;
        form.url_key = pass_url_key;
        form.page = page;
        form.count = count;
        if (this.$route.query.sort) {
          form.sort_by = this.$route.query.sort;
        }
        if (this.$route.query.sort_dir) {
          form.sort_dir = this.$route.query.sort_dir;
        }
        if (this.$route.query.filter) {
          if (typeof this.$route.query.filter == "string") {
            form.filter = this.$route.query.filter;
          } else {
            form.filter = this.$route.query.filter.join();
          }
        }

        // to disable default loader gif
        if (pageNumber > 1) {
          form.noLoader = true;
        }

        let response = await this.$store.dispatch("pimAjax", {
          method: "post",
          url: `/pimresponse.php`,
          params: form,
        });

        if (response) {
          await this.$store.commit("updateState", {
            error: null,
            data: response,
          });
          // // google tag manager
          this.gtm_product_impressions = [];
          var appliedFilter = "none";
          if (response.query.filter) {
            appliedFilter = response.query.filter;
          }
          if (response.success && response.result.products.length > 0) {
            for (let [index, i] of response.result.products.entries()) {
              let name = i.name;
              let id = i.sku;
              let price = i.selling_price;
              let category = i.category;
              let list = "product List";
              let position = index + 1;
              this.gtm_product_impressions.push({
                name,
                id,
                price,
                category,
                list,
                position,
                appliedFilter,
              });
            }
            this.$gtm.push({
              event: "impressionSent",
              action: "Product Impression",
              label: "Product List page",
              category: response.result.products[0].category,
              ecommerce: {
                currencyCode: "INR",
                impressions: this.gtm_product_impressions,
              },
            });
          }
          if (process.browser && pageNumber == 1) {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }

          // hide mobile filter when no product
          if (
            response.response.success == 0 &&
            response.response.error_message == "no product found" &&
            this.mobileFilter == true
          ) {
            this.mobileFilter = false;
          }
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
    async removeAllFilters() {
      await this.$store.commit("blankfilter");
      this.$router.push(this.$route.path);
      this.mobileFilter = false;
    },

    toggleFilter() {
      this.openFiltter = true;
      this.openSort = false;
    },

    updateFilterArray(item) {
      this.$store.commit("updateFilterArray", {
        item,
      });
      this.activeDropdown = -1;
    },

    removeFilter(paramsData) {
      this.$store.commit("updateFilterArray", { paramsData });
    },

    // sort Product list
    sortProduct(event) {
      this.sorting = event.label;
      this.$router.push({
        query: {
          ...this.$route.query,
          sort: event.code,
          sort_dir: event.dir,
        },
      });
      this.showSort = false;
    },

    // async loadMore() {
    //   await this.$store.commit("universalListMutate", {
    //     data: Number(this.list.page) + 1,
    //     changeState: "page",
    //   });
    //   this.getProductList(this.list.page);
    // },
    // render wish list class icon
    renderWishList(item) {
      let ProductId = item.id_product;
      let groupId = item.group_id;
      let wishList = this.$store.state.cartAjax.wishlist;

      if (Object.keys(wishList).length != 0) {
        const groupResult = wishList.group
          .split(",")
          .filter((word) => word == groupId);
        const productResult = wishList.product
          .split(",")
          .filter((word) => word == ProductId);

        if (groupResult.length > 0 && productResult.length > 0) {
          return "wishlist-active";
        } else {
          return "add";
        }
      } else {
        return "add";
      }
    },
    // add and remove to wish list
    async addRemoveWishList(item, data, index) {
      try {
        if (
          this.$store.state.cartAjax.customer_id == "" &&
          this.$store.state.cartAjax.customer_session == ""
        )
          return this.$router.push("/login");
        let form = {
          product_id: item.id_product,
          customer_id: this.$store.state.cartAjax.customer_id,
          customer_session: this.$store.state.cartAjax.customer_session,
          group_id: item.group_id,
        };

        if (data === "add") {
          var response = await this.$store.dispatch("cartAjax/actCartAjax", {
            method: "post",
            url: `/wishlist/add-wishlist`,
            token: this.$store.state.cartAjax.customer_token,
            params: form,
          });
        } else {
          var response = await this.$store.dispatch("cartAjax/actCartAjax", {
            method: "post",
            url: `/wishlist/remove-wishlist`,
            token: this.$store.state.cartAjax.customer_token,
            params: form,
          });
        }

        if (response.success) {
          this.$toast.open(response.message);
          this.$store.commit("cartAjax/updateWishList", {
            payload: response.data,
          });

          this.$gtm.push({
            event: [data == "add" ? "addToWishlist" : "removeFromWishlist"],
            category: item.category,
            action: "removeFromWishlist",
            ecommerce: {
              currencyCode: "INR",
              remove: {
                products: [
                  {
                    name: item.name,
                    id: item.sku,
                    price: item.selling_price,
                    category: item.category,
                    position: 1,
                  },
                ],
              },
            },
          });
        } else {
          throw "no response from api";
        }
      } catch (error) {
        this.$globalError(`error from add addRemoveWishList >>>> ${error}`);
      }
    },
    async updatePage() {
      var loader_el = document.querySelector(".product_loader");
      this.scrollPosition = window.scrollY;
      if (loader_el) {
        var loader_position = loader_el.offsetTop;
      }
      if (window.scrollY >= loader_position - 2000) {
        await this.$store.commit("universalListMutate", {
          data: parseInt(this.list.page) + 1,
          changeState: "page",
        });
        if (
          this.list.page <= this.list.total_page &&
          !this.list.product_loader
        ) {
          this.getProductList(this.list.page);
        }
      }
    },
    // scroll to top
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    // toggle filter droopdown
    activeDropdownToggle(index) {
      if (this.activeDropdown != index) {
        this.activeDropdown = index;
      } else {
        this.activeDropdown = -1;
      }
    },

    // fit filter handler
    handleFitFilter(item) {
      this.$store.commit("updateFilterArray", { item });
    },
  },

  computed: {
    calculateResult() {
      return this.list.Product_list.length;
      // if (this.list.Product_list.length < 12) {
      // } else {
      // }
      // return this.list.total_page * 12;
    },
    ...mapState(["list"]),
    // render seo tags
    title() {
      if (this.list.meta_title != "") return this.list.meta_title;
      return "DIESEL ALL PRODUCT";
    },
    description() {
      if (this.list.meta_description !== "") return this.list.meta_description;
      return "DIESEL";
    },
    url() {
      return this.$store.state.BASE_URL + this.$route.fullPath;
    },
  },

  async fetch() {
    try {
      // fetching products from the backend
      await this.$store.commit("blankfilter");
      await this.getProductList();
    } catch (error) {
      this.$globalError(`error from the all product page ${error}`);
    }
  },
  mounted() {
    this.$store
      .dispatch("pimAjax", {
        method: "get",
        url: `/pimresponse.php`,
        token: this.$store.state.cartAjax.customer_token,
        params: {
          service: "like",
          store: 1,
          url_key: this.$route.params.productCategory,
        },
      })
      .then((like) => {
        if (like.response) {
          this.likeData = like.result.likes;
        }
      })
      .catch((error) => {
        this.$globalError(`error from the all product page ${error}`);
      });
    // add window event listner for lazy loading products
    window.addEventListener("scroll", this.updatePage);

    if (this.$store.state.list.firstgtm == true) {
      this.servergtm();
    }
    this.$store.commit("firstgtmState");
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.updatePage);
    this.$store.commit("flushActiveUrlKey");
  },
  watch: {
    "$route.query": function () {
      this.getProductList();
    },

    "$store.state.list.sortingData": {
      deep: true,
      handler: function () {
        // this.sorting.code = this.list.sortingData.code;
        // this.sorting.dir = this.list.sortingData.dir;
      },
    },
  },
};
</script>