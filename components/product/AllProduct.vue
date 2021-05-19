<template>
  <div>
    <div class="product_list_page">
      <div class="search-banner content-slot slot-grid-header">
        <div class="mobile_only">
          <div class="search-banner-mobile">
            <div
              class="js_search-banner-arrow-back-mobile search-banner-arrow-back-mobile"
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
              <span> {{ calculateResult }} Results </span>
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
          </div>
        </div>
      </div>
    </div>
    <!-- desktop_only class add  -->
    <div
      class="refinements-holder"
      :class="openFiltter == true ? '' : 'desktop_only'"
      v-if="list.filters.length > 0 && list.Product_list.length > 0"
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
              class="card refinement refinement-category "
              v-for="(filter, filterIndex) in list.filters"
              :key="filterIndex"
            >
              <h2 class="js_card-header card-header" tabindex="0">
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
                    <span
                      @click.prevent="
                        $store.commit('updateFilterArray', { item })
                      "
                    >
                      <a
                        class="selection-box"
                        :class="
                          list.applied_filters.findIndex(
                            x => x === `${item.code}~${item.value_key}`
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
    <div class="" v-if="list.applied_filters.length > 0">
      <div class="filter-bar">
        <div class="filter-clearall-container">
          <a class="reset" @click.prevent="removeAllFilters()"> Clear all </a>
        </div>
        <ul class="filters-close-main-container">
          <li
            class="filter-value"
            v-for="(appliedFilter, filterIndex) in list.applied_filters"
            :key="filterIndex"
            @click="removeFilter(appliedFilter)"
          >
            <a class="filter-close-container">
              {{ appliedFilter }}
              <div class="icon-close-black icon-close-black-filter"></div>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <template v-if="list.Product_list.length > 0">
      <button
        class="product-sort mobile_sortby mobile_only"
        @click="openSort = false"
        v-if="openSort"
      >
        Close
      </button>
      <button
        v-else
        class="product-sort mobile_sortby mobile_only dd"
        @click="() => (openSort = true)"
      >
        Sort by
      </button>
      <button
        class="mobile-filter mobile_filtter mobile_only"
        @click="openFiltterFun"
      >
        Filter
      </button>
    </template>

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
                Showing: {{ calculateResult }} Product(s)
              </div>
              <div class="sort-order" v-show="list.Product_list.length > 0">
                <div class="sort-list">
                  <div class="sort-label">
                    <span class="sort-selected-option">
                      Sort By {{ sorting }}</span
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
                    <div
                      class="list_slide"
                      v-if="singleProd.gallery.length > 0"
                    >
                      <VueSlickCarousel v-bind="productSetting">
                        <div
                          class="item"
                          v-for="(image, imgIndex) in singleProd.gallery"
                          :key="imgIndex"
                        >
                          <Nuxt-link :to="`/product/${singleProd.url_key}`">
                            <img :src="image.image" alt="img" class="w-100" />
                          </Nuxt-link>
                        </div>
                      </VueSlickCarousel>
                    </div>
                    <div class="title-body">
                      <p class="p-price">
                        <span
                          v-if="
                            singleProd.discount != '' && singleProd.discount > 0
                          "
                        >
                          ₹{{ singleProd.selling_price }}
                          <span class="line-throu"
                            >₹{{ singleProd.price }}</span
                          >
                        </span>
                        <span v-else>₹{{ singleProd.price }}</span>
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
              v-if="
                list.Product_list.length == 0 &&
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
              <button
                class="button button-load-more js_button-load-more pointer"
                v-show="
                  list.totalProduct > list.Product_list.length &&
                    list.Product_list.length != 0
                "
                @click="loadMore()"
              >
                Load more
              </button>
            </div>
          </div>

          <div class="product-carousel-padding" v-if="likeData.length > 0">
            <div class="product-carousel-container">
              <h2 class="product-carousel-title">You may also like</h2>
            </div>

            <div class="you_like_slide">
              <VueSlickCarousel v-bind="settings">
                <div
                  class="item"
                  v-for="(item, index) in likeData"
                  :key="index"
                >
                  <NuxtLink :to="`/product/${item.url_key}`">
                    <img :src="item.image" alt="img" class="w-100" />
                    <div class="title-body">
                      <NuxtLink :to="`/product/${item.url_key}`">{{
                        item.name
                      }}</NuxtLink>
                    </div>
                  </NuxtLink>
                </div>
              </VueSlickCarousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import { mapState } from "vuex";

export default {
  components: { VueSlickCarousel },
  data() {
    return {
      settings: {
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "0px",
              slidesToShow: 2.5
            }
          },
          {
            breakpoint: 767,
            settings: {
              arrows: false,
              centerMode: false,
              centerPadding: "0px",
              slidesToShow: 2.5
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: false,
              centerPadding: "20px",
              slidesToShow: 1.5
            }
          }
        ]
      },

      productSetting: {
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true
      },

      sorting: "default",
      openFiltter: false,
      openSort: false,
      likeData: []
    };
  },

  head() {
    return {
      title: this.list.meta_title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.list.meta_description
        },
        {
          hid: "keyword",
          name: "keyword",
          content: this.list.meta_keyword
        },
        {
          hid: "og:title",
          content: this.title,
          property: "og:title"
        },
        {
          hid: "og:description",
          content: this.description,
          property: "og:description"
        },
        {
          hid: "og:url",
          content: this.url,
          property: "og:url"
        }
      ]
    };
  },

  methods: {
    async getProductList(page) {
      let pageNumber;
      page != undefined ? (pageNumber = page) : (pageNumber = 1);
      try {
        await this.$store.commit("prepareState", {
          routeParam: this.$route.params.productCategory,
          pageNo: pageNumber
        });
        let {
          service,
          store,
          pass_url_key,
          page,
          count
        } = this.$store.state.list;

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
          params: form
        });

        if (response) {
          await this.$store.commit("updateState", {
            error: null,
            data: response
          });
          // // google tag manager
          // this.gtm_product_impressions = [];
          // var appliedFilter = "none";
          // if (response.query.filter) {
          //   appliedFilter = response.query.filter;
          // }
          // if (response.result.products.length > 0) {
          //   for (let [index, i] of response.result.products.entries()) {
          //     let name = i.name;
          //     let id = i.sku;
          //     let price = i.selling_price;
          //     let category = i.category;
          //     let list = "product List";
          //     let position = index + 1;
          //     this.gtm_product_impressions.push({
          //       name,
          //       id,
          //       price,
          //       category,
          //       list,
          //       position,
          //       appliedFilter,
          //     });
          //   }
          //   this.$gtm.push({
          //     event: "impressionSent",
          //     action: "Product Impression",
          //     label: "Product List page",
          //     category: response.result.products[0].category,
          //     ecommerce: {
          //       currencyCode: "INR",
          //       impressions: this.gtm_product_impressions,
          //     },
          //   });
          // }
          if (process.browser && pageNumber == 1) {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
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
    },
    async removeAllFilters() {
      this.$router.push(this.$route.path);
    },

    removeFilter(paramsData) {
      this.$store.commit("updateFilterArray", { paramsData });
    },
    openFiltterFun() {
      this.openFiltter = true;
      this.openSort = false;
    },

    // sort Product list
    sortProduct(event) {
      console.log("event", event);
      this.sorting = event.label;
      this.$router.push({
        query: {
          ...this.$route.query,
          sort: event.code,
          sort_dir: event.dir
        }
      });
    },

    async loadMore() {
      await this.$store.commit("universalListMutate", {
        data: Number(this.list.page) + 1,
        changeState: "page"
      });
      this.getProductList(this.list.page);
    },
    // render wish list class icon
    renderWishList(item) {
      let ProductId = item.id_product;
      let groupId = item.group_id;
      let wishList = this.$store.state.cartAjax.wishlist;

      if (Object.keys(wishList).length != 0) {
        const groupResult = wishList.group
          .split(",")
          .filter(word => word == groupId);
        const productResult = wishList.product
          .split(",")
          .filter(word => word == ProductId);

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
          group_id: item.group_id
        };

        if (data === "add") {
          var response = await this.$store.dispatch("cartAjax/actCartAjax", {
            method: "post",
            url: `/wishlist/add-wishlist`,
            token: this.$store.state.cartAjax.customer_token,
            params: form
          });
        } else {
          var response = await this.$store.dispatch("cartAjax/actCartAjax", {
            method: "post",
            url: `/wishlist/remove-wishlist`,
            token: this.$store.state.cartAjax.customer_token,
            params: form
          });
        }

        if (response.success) {
          this.$toast.open(response.message);
          this.$store.commit("cartAjax/updateWishList", {
            payload: response.data
          });

          this.$gtm.push({
            event: [data == "add" ? "addToWishlist" : "removeFromWishlist"],
            category: item.category,
            action: "removeFromWishlist",
            ecommerce: {
              currencyCode: "INR",
              remove: {
                product: [
                  {
                    name: item.name,
                    id: item.sku,
                    price: item.selling_price,
                    category: item.category,
                    position: 1
                  }
                ]
              }
            }
          });
        } else {
          throw "no response from api";
        }
      } catch (error) {
        this.$globalError(`error from add addRemoveWishList >>>> ${error}`);
      }
    }
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
      return "STEVE MADDEN ALL PRODUCT";
    },
    description() {
      if (this.list.meta_description !== "") return this.list.meta_description;
      return "STEVE MADDEN";
    },
    url() {
      return this.$store.state.BASE_URL + this.$route.fullPath;
    }
  },

  async fetch() {
    try {
      // fetching products from the backend
      await this.getProductList();

      let like = await this.$store.dispatch("pimAjax", {
        method: "get",
        url: `/pimresponse.php`,
        token: this.$store.state.cartAjax.customer_token,
        params: {
          service: "like",
          store: 1
        }
      });
      if (like.response) {
        this.likeData = like.result.likes;
      }
    } catch (error) {
      this.$globalError(`error from the all product page ${error}`);
    }
  },

  watch: {
    "$route.query": function() {
      this.getProductList();
    },

    "$store.state.list.sortingData": {
      deep: true,
      handler: function() {
        // this.sorting.code = this.list.sortingData.code;
        // this.sorting.dir = this.list.sortingData.dir;
      }
    }
  }
};
</script>
