<template>
  <client-only>
    <div id="searchModalContainer" v-cloak>
      <div class="some-error" v-if="errorEncountered === true">
        <div class="container">
          <div class="error-div">Oops!!! Something Went Wrong</div>
          <p>
            Please, try
            <a href="" onclick="location.reload()" class="highlight-text"
              >Reloading</a
            >
            page or go back to
            <a class="highlight-text" :href="getHomePageUrl">Home</a> page
          </p>
        </div>
      </div>
      <div id="searchModal" v-show="isOpen && !errorEncountered">
        <div :class="{ 'st-loading': loader }">
          <div v-show="!loader">
            <div id="search-content">
              <div class="st-col-md-12 st-pl-sm-0">
                <div
                  class="st-horizontal-filter hidden-mobile-only"
                  :class="{ 'st-filter-outer-open': isFilterOpen }"
                >
                  <div class="filter-column st-pl-sm-0">
                    <div class="st-filter-header-title">
                      <span>Filter BY</span>
                    </div>
                    <div
                      class="filter-col"
                      v-for="f in filters"
                      v-show="
                        f.values.length > 0 ||
                        f.selected.length > 0 ||
                        f.type === 'singleStatic'
                      "
                      :key="f.field"
                    >
                      <div class="st-filter-menu">
                        <div
                          class="st-filter-button"
                          :class="{ 'st-open-tile': f.isOpen }"
                          @click="toggleCurrentFilter(f.title)"
                        >
                          <div class="st-filter-title">
                            {{ f.title }}
                          </div>
                          <DesktopFilter
                            v-bind:filter="f"
                            v-on:applyFilter="applyFilter"
                            v-on:clear-filter="clearFilters"
                          ></DesktopFilter>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="st-filter-bar"
                  v-show="allSelectedFilters.length > 0"
                >
                  <div
                    class="tag-item st-last-clear-tag"
                    @click="clearFilters()"
                  >
                    <div class="tag-content">Clear All</div>
                  </div>
                  <div class="filter-tag-column st-width">
                    <div class="st-filter-tags">
                      <div class="st-filter-inner">
                        <div
                          class="tag-item"
                          v-for="filter in allSelectedFilters"
                          :key="filter.field"
                        >
                          <div
                            class="tag-close"
                            @click="
                              clearSingleFilter(filter.selected, filter.field)
                            "
                          ></div>
                          <div
                            class="tag-content"
                            v-if="filter.type !== 'numericFacet'"
                          >
                            {{ filter.title }}~{{ filter.selected }}
                          </div>
                          <div class="tag-content" v-else>
                            {{ filter.title }}~{{ currSymbol
                            }}{{ filter.selected[0] }}
                            <span v-if="filter.selected[0] !== '60000'">
                              - {{ currSymbol }}{{ filter.selected[1] }}</span
                            >
                            <span v-else>&nbsp;And Above</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="st-col-md-12 col-sm-12 col-xs-12">
                <div class="st-row">
                  <div class="st-col-md-12">
                    <div class="st-toolbar st-container">
                      <div
                        class="st-row resut-summary-t"
                        v-show="totalHits > 0"
                      >
                        <div
                          class="st-result-inner"
                          :class="{ 'st-filter-outer-open': showSort }"
                        >
                          <div class="st-col-md-6 pl0">
                            <div class="st-item-result">
                              <span class="st-pr2"
                                >Showing: {{ totalHits }}</span
                              >
                              <span>
                                Product<span v-show="totalHits > 1"
                                  >s</span
                                ></span
                              >
                            </div>
                            <span class="st-brand-outer hidden-desktop-only">
                              <a
                                href="https://www.searchtap.io/?utm_source=diesel&amp;utm_medium=website"
                                target="_blank"
                                aria-describedby="a11y-new-window-external-message"
                                rel="noopener"
                              >
                                <div class="st-brand-txt">
                                  Powered by SearchTap
                                </div>
                                <div class="st-brand"></div>
                              </a>
                            </span>
                          </div>

                          <div class="st-col-md-6 hidden-mobile-only">
                            <div class="st-fil-sorting">
                              <div class="filter-col st-flex-right">
                                <div class="st-filter-menu">
                                  <div
                                    class="st-filter-button"
                                    :class="{ 'st-sort-open': showSort }"
                                    @click="showSort = !showSort"
                                  >
                                    <span class="st-sort-label">Sort By</span>

                                    <div class="st-filter-title">
                                      <span> {{ sortLabel }}</span>
                                    </div>
                                    <div
                                      class="st-dropdown-wrapper st-transition"
                                      v-show="showSort"
                                    >
                                      <div class="st-dropdown-area">
                                        <div class="st-dynamic-filters">
                                          <div>
                                            <div
                                              v-for="s in sorts"
                                              :key="s.label"
                                            >
                                              <div class="st-checkbox">
                                                <label>
                                                  <span
                                                    :class="{
                                                      activeColor:
                                                        s.active === true,
                                                    }"
                                                    class="sort-filter-name"
                                                    @click="sorting(s.label)"
                                                    >{{ s.label }}</span
                                                  >
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="st-product st-container">
                <div class="st-col-md-12">
                  <div class="st-row">
                    <Products
                      v-for="item in response"
                      v-bind:item="item"
                      :key="item.id"
                      v-show="totalHits > 0"
                    />
                  </div>
                </div>
              </div>
              <div v-show="!resultsEnd && totalHits > 0">
                <span class="result-loader"
                  ><i class="fa fa-circle-o-notch fa-spin"></i
                ></span>
              </div>
              <div id="noResults" class="st-results-end" v-show="resultsEnd">
                No more results
              </div>

              <div class="filter-bar hidden-desktop-only">
                <div class="st-overlay-active" v-show="showMobileSort === true">
                  <div class="st-sorting-wrapper">
                    <div class="st-sorting-inner">
                      <ul class="list">
                        <li class="sortby">
                          <div
                            class="st-sort-cross"
                            @click="showMobileSort = false"
                          >
                            <svg
                              role="presentation"
                              viewBox="0 0 16 14"
                              class="Icon Icon--close"
                            >
                              <path
                                d="M15 0L1 14m14 0L1 0"
                                stroke="currentColor"
                                fill="none"
                                fill-rule="evenodd"
                              ></path>
                            </svg>
                          </div>
                          Sort by
                        </li>
                        <li>
                          <div
                            class="ripple-container"
                            v-for="s in sorts"
                            v-bind:key="s.field"
                          >
                            <button
                              :value="s.label"
                              @click="sorting(s.label)"
                              :class="{ activeColor: s.active === true }"
                            >
                              <span class="sortByValues"> {{ s.label }}</span>
                            </button>
                          </div>
                        </li>
                      </ul>
                      <div class="apply-all" @click="showMobileSort = false">
                        <div class="st-close">Close</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="sortFilter"
                  class="sortFilterCon"
                  v-show="filterCount > 0 || totalHits > 0"
                >
                  <div class="sort_h" @click="showMobileSort = !showMobileSort">
                    <span
                      class="filter-applied-ellip"
                      v-show="sortLabel !== 'Relevance'"
                    ></span>
                    <span class="disInBlock">Sort by</span>
                  </div>
                  <div class="filter_h" @click="showMobileFilter = true">
                    <span
                      class="filter-applied-ellip"
                      v-show="filterCount > 0"
                    ></span>
                    <span class="disInBlock">Filter</span>
                  </div>
                </div>
              </div>

              <div id="st-back-top" @click="jumpToTop()" v-show="backToTop">
                <a href="#" rel="tooltip" title="Top"></a>
              </div>

              <div
                id="searchFilterMobile"
                class="hidden-desktop"
                v-show="showMobileFilter"
              >
                <div id="mobile-filter">
                  <div :class="{ 'mobile-filter-popup': showMobileFilter }">
                    <div class="filter-list">
                      <div class="filterHeader">
                        <span class="st-filter-title">Filter By </span>
                        <span class="pull-right">
                          <span
                            class="st-reset-all-mobile"
                            v-show="filterCount > 0"
                            @click="clearFilters()"
                            >Reset all</span
                          >
                          <div
                            class="st-close-div"
                            @click="(showMobileFilter = false), jumpToTop()"
                          >
                            <div class="st-mobile-cross"></div>
                          </div>
                        </span>
                      </div>
                      <div class="row">
                        <div class="filter-body">
                          <div
                            class="mobileFilters"
                            v-for="f in filters"
                            :key="f.title"
                            v-show="
                              f.values.length > 0 ||
                              f.selected.length > 0 ||
                              f.type === 'singleStatic'
                            "
                          >
                            <a>
                              <div class="panel-heading">
                                <h4
                                  class="panel-title"
                                  @click="f.isOpen = !f.isOpen"
                                >
                                  <span
                                    class="st-mobile-filter-clear"
                                    style="text-align: right"
                                    v-show="f.selected.length > 0"
                                    @click.stop="clearFilters(f.field)"
                                    >Clear</span
                                  >
                                  <i
                                    :class="[
                                      f.isOpen
                                        ? 'fa-angle-up'
                                        : 'fa-angle-down',
                                      'fa',
                                      'indicator',
                                    ]"
                                  ></i>
                                  {{ f.title }}
                                </h4>
                              </div>
                            </a>
                            <DesktopFilter
                              v-bind:filter="f"
                              v-on:applyFilter="applyFilter"
                              v-on:clear-filter="clearFilters"
                            ></DesktopFilter>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="apply-all"
                      @click="jumpToTop(), (showMobileFilter = false)"
                    >
                      <a class="apply-btn">Apply Filter</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="overlay">
              <div class="container" v-show="totalHits === 0 && !loader">
                <h2 class="page-heading">
                  No Results found
                  <span v-show="searchQuery.trim().length > 0"
                    >for '{{ searchQuery | truncate(20) }}'</span
                  >
                </h2>
                <div class="search-pform">
                  <p>
                    Try searching some other keywords
                    <span v-show="filterCount > 0"
                      >or apply different set of filters</span
                    >
                  </p>
                  <p>Look for other items at our store</p>
                </div>
                <div class="p-0">
                  <div class="row"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="clear: both"></div>
    </div>
  </client-only>
</template>

<script>
import "~/assets/st_assets/st/st.css";
import Products from "../components/st-components/Products";
import UrlManager from "@/utils/UrlManager";
// import stAnalytics from "./utils/analytics";
import DesktopFilter from "../components/st-components/DesktopFilter";
import { config } from "@/utils/globalVariables";
import "~/assets/st_assets/st/st.css";

const SearchClient = require("@searchtap/search-client");
// let ga = new stAnalytics("ga", "prod");
let searchClient = new SearchClient(config.applicationId, config.appReadToken); //update these in the config file
// const jump = require('jump.js').default;
// const UrlManager = require("@/utils/URLManager");
export default {
  name: "SearchPage",
  components: { Products, DesktopFilter },
  props: ["isSearchPage"],
  watch: {
    // go back when input empty
    "$store.state.list.search_input": {
      handler: function (after, before) {
        if (after == "") {
          if (this.path != "") {
            this.$router.push(this.path);
          }
          if (this.path == "/searchpage") {
            this.$router.push("/");
          }
        }
        if (before == "") {
          this.path = this.$route.path;
          this.$router.push(
            `/searchpage?q=${this.$store.state.list.search_input}`
          );
        }
      },
    },
    $route(to) {
      // react to route changes...
      if (this.isOpen)
        document.querySelector("body").classList.add("searchtap");
      if (this.searchQuery !== to.query.q) {
        this.searchQuery = to.query.q;
        this.updateQuery();
      }
    },
  },
  mounted() {
    // update base url
    this.baseUrl = `${window.location.protocol}//${window.location.host}`;
    this.um = new UrlManager(this.baseUrl);
    this.main = document.querySelector("#maincontent");
    this.beforeSearchPage = window.location.href;
    let url = window.location.href;
    // update path
    this.path = this.$store.state.intialSearchPath;

    /*eslint-disable */
    try {
      // if(document.querySelector('#reset'))document.querySelector('#reset').style.display = 'none';
      // document.querySelector("input[name='q']").addEventListener('keyup', this.updateQuery);
      window.addEventListener("scroll", this.handleScroll);
      window.onpopstate = async (e) => {
        // if (this.isOpen) {
        let res = this.um.parseUrl(location.search);
        // add query
        let q = this.$route.query.q;
        if (q !== null && q !== undefined) {
          this.searchQuery = q;
          this.pushQuery();
          // document.querySelector("input[name='st']").value = q;
          // this.um.withQuery(q);
        }

        // add filters
        this.um.clear();
        let urlFilter = res.filters;
        if (
          urlFilter !== null &&
          urlFilter !== undefined &&
          JSON.stringify(urlFilter) !== "{}"
        ) {
          this.emptyPushedFilters();
          let fld = Object.keys(urlFilter);
          this.filters.forEach((o) => {
            fld.forEach((f) => {
              if (o.title === f) {
                if (o.field !== "discounted_price") {
                  o.selected = urlFilter[f].map((x) => {
                    return decodeURIComponent(
                      x.replace(/%(?![0-9][0-9a-fA-F]+)/g, "%25")
                    );
                  });
                } else if (o.field === "discounted_price") {
                  urlFilter[f].forEach((x) => {
                    o.selected.push(x.replace(/ /g, "").split("-"));
                  });
                }
              }
            });
          });
        } else {
          this.emptyPushedFilters();
        }
        // add sort
        let sort = res.sort;
        if (sort) {
          this.sortLabel = this.sorts.find((x) => x.field === sort).label;
        } else {
          this.sortLabel = "Relevance";
        }

        await this.searchProducts(0);
        // }
      };
      if (url.includes("/searchpage")) {
        this.pageReload = true;
        document.querySelector("body").classList.add("searchtap");
        this.isMainPage = true;
        // this.isSearchPage = true;
        this.isOpen = true;
        if (process.env.NODE_ENV === "development") {
          url = url.replace("#/", "");
        }
        let res = this.um.parseUrl(url);
        // add query
        let q = res.query;
        if (q) {
          this.searchQuery = q;
          document.title = this.searchQuery + "-diesel";
          // ga.recordSearchStartEvent("direct");
          // document.querySelector("input[name='st']").value = this.searchQuery;
          this.pushQuery();
        }

        // add filters
        let urlFilter = res.filters;
        if (
          urlFilter !== null &&
          urlFilter !== undefined &&
          JSON.stringify(urlFilter) !== "{}"
        ) {
          let fields = Object.keys(urlFilter);
          this.filters.forEach((o) => {
            fields.forEach((f) => {
              if (o.title === f) {
                if (o.field !== "discounted_price") {
                  o.selected = urlFilter[f].map((x) => {
                    return decodeURIComponent(
                      x.replace(/%(?![0-9][0-9a-fA-F]+)/g, "%25")
                    );
                  });
                } else if (o.field === "discounted_price") {
                  for (let val of urlFilter[f]) {
                    o.selected.push(val.replace(/ /g, "").split("-"));
                  }
                }
              }
            });
          });
          this.pushFilter();
        }
        // add sort
        let sort = res.sort;
        if (sort) {
          this.sortLabel = this.sorts.find((x) => x.field === sort).label;
          this.sorting(this.sortLabel);
        }
        this.searchProducts(0);
        this.jumpToTop();
      }
      window.addEventListener("click", this.clickHandler);
      window.addEventListener("touchstart", this.clickHandler);
    } catch (e) {
      console.error(`SearchTap Error: `, e.message);
    }
  },
  methods: {
    toggleCurrentFilter: function (filter_title) {
      this.filters.forEach((f) => {
        if (filter_title === f.title) f.isOpen = !f.isOpen;
        else f.isOpen = false;
      });
    },

    getEachFilterCount: function (filter) {
      if (filter.selected.length > 0) return filter.selected.length;
    },
    clickHandler: function (e) {
      if (this.showMobileSort) {
        if (
          document.querySelector(".st-sorting-wrapper").contains(e.target) ||
          document.querySelector(".sort_h").contains(e.target)
        ) {
          // Clicked in box
          return;
        } else {
          this.showMobileSort = false;
          // Clicked outside the box
        }
      }
    },
    pushQuery: function () {
      let res = this.um.withQuery(this.searchQuery);
      // ga.recordQuery(this.searchQuery);
    },
    jumpToTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    pushSort: function () {
      let res = this.um.withSort(this.sortField);
      let stateObj = res.currentUrl;
      history.pushState(stateObj, "sort", stateObj);
      if (this.filterCount > 0) this.pushFilter();
    },
    updateQuery: async function () {
      if (this.searchQuery) {
        if (this.searchQuery.trim().length > 0) {
          this.$emit("query-changed", this.searchQuery.trim());
          document.title = this.searchQuery + "-diesel";
          this.onFocusScroll = window.scrollY;
          document.querySelector("body").classList.add("searchtap");
          this.emptyPushedFilters();
          this.sortLabel = "Relevance";
          this.sorts.forEach((x) => {
            x.active = false;
          });
          this.sorts[0].active = true;
          this.um.clearSort();
          await this.searchProducts(0);
          this.pushQuery();
        }
      } else {
        this.clearQuery();
      }
      this.jumpToTop();
    },
    emptyPushedFilters: function () {
      this.filters.forEach((f) => {
        f.selected = [];
      });
      this.um.clear();
    },
    clearQuery: function () {
      // if(this.isMainPage === false) {
      this.response = [];
      this.isOpen = false;
      this.emptyPushedFilters();
      this.filterCount = 0;
      this.sortLabel = "Relevance";
      this.sorts.forEach((x) => {
        x.active = false;
      });
      this.sorts[0].active = true;
      this.response.length = 0;
      this.loader = true;
      this.um.clear();
      this.jumpToTop();
      this.um.clearSort();
    },
    searchProducts: async function (offset) {
      try {
        this.createSearchTapRequest(offset);
        this.isOpen = true;
        this.errorEncountered = false;
        this.currOffset = offset;
        let response = await searchClient.search(
          this.searchQuery,
          config.productsCollectionId
        );
        this.totalHits = response.totalHits;
        this.loader = false;
        if (offset === 0) {
          this.scrollVal = 0;
          this.results = [];
          let list = document.getElementsByClassName("st-sub-dropdown");
          let desktop_filter = document.querySelector(".sidebar__inner");
          let mobile_list = document.querySelectorAll("ul.filter-list-desktop");
          let mobile_filter = document.querySelector(".mobile-filter-popup");
          try {
            if (list) {
              for (let i = 0; i < list.length; i++) {
                list[i].scroll({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                });
              }
            }
            if (desktop_filter)
              desktop_filter.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            if (mobile_list) {
              for (let i = 0; i < mobile_list.length; i++) {
                mobile_list[i].scroll({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                });
              }
            }
            if (mobile_filter) {
              mobile_filter.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }
          } catch (e) {
            console.error(e);
          }
          this.response = response.results;
          if (window.scrollY > 250) {
            setTimeout(() => {
              this.jumpToTop();
            }, 200);
            setTimeout(() => {
              this.onFocusScroll = window.scrollY;
            }, 500);
          }
        } else {
          this.response = this.response.concat(response.results);
        }

        this.resultsEnd =
          this.response.length > 0 && this.response.length === this.totalHits;
        this.filters
          .filter((x) => !x.isStatic)
          .forEach((f) => {
            if (f.type !== "singleStatic") {
              f.values.length = 0;

              let textFacetValues = response.textFacets[f.field];
              if (
                textFacetValues !== undefined &&
                textFacetValues !== null &&
                textFacetValues.length > 0
              ) {
                textFacetValues.forEach((v) => {
                  f.values.push({
                    name: v.label,
                    count: v.value,
                  });
                });
                f.values.sort(function (a, b) {
                  if (a.name < b.name) return -1;
                  else if (a.name > b.name) return 1;
                  else return 0;
                });
              }

              let numericFacetValues = response.numericFacets[f.field];
              if (
                numericFacetValues !== undefined &&
                numericFacetValues !== null &&
                numericFacetValues.length > 0
              ) {
                numericFacetValues.forEach((v) => {
                  if (v.count > 0) {
                    f.values.push({
                      min: v.min.toString(),
                      max: v.max.toString(),
                      count: v.count,
                    });
                  }
                });
              }
            }
          });
      } catch (e) {
        console.log("error >>> ", e);
        this.errorEncountered = true;
        this.loader = false;
      }
    },
    clearSingleFilter: function (filter_val, field) {
      if (field !== undefined) {
        this.filters
          .filter((x) => x.field === field)
          .forEach((x) => {
            x.selected.splice(x.selected.indexOf(filter_val), 1);
          });

        this.pushFilter();
      }
    },
    clearFilters: function (field) {
      if (field !== undefined) {
        this.filters
          .filter((x) => x.field === field)
          .forEach((x) => {
            x.selected = [];
          });
        this.pushFilter(field);
      } else {
        this.filters.forEach((f) => {
          f.selected = [];
        });
        this.filterCount = 0;
        this.um.clear();
        let stateObj = this.um.getCurrentUrl();
        history.pushState(stateObj, "filter", stateObj);
      }
      this.searchProducts(0);
    },

    createSearchTapRequest(offset) {
      if (this.searchQuery) {
        this.filterCount = 0;
        this.allSelectedFilters = [];
        this.filters.forEach((f) => {
          if (f.field !== "discounted_price" && f.selected.length > 0) {
            searchClient.textFacetFilters(f.field, f.selected);
            this.filterCount += f.selected.length;
            f.selected.forEach((s) => {
              this.allSelectedFilters.push({
                field: f.field,
                type: f.type,
                title: f.title,
                selected: s,
              });
            });
          } else if (f.field === "discounted_price" && f.selected.length > 0) {
            f.selected.forEach((s) => {
              searchClient.numericFacetFilters(f.field, s[0], s[1]);
            });
            this.filterCount += f.selected.length;
            f.selected.forEach((s) => {
              this.allSelectedFilters.push({
                field: f.field,
                type: f.type,
                title: f.title,
                selected: s,
              });
            });
          }
        });
        if (this.resultsFilter.trim().length > 0) {
          searchClient.filter(this.resultsFilter);
          if (
            this.searchQuery.toLocaleLowerCase().includes("shir") &&
            !(
              this.searchQuery.toLocaleLowerCase().includes("t-shir") ||
              this.searchQuery.toLocaleLowerCase().includes("tshir") ||
              this.searchQuery.toLocaleLowerCase().includes("t shir") ||
              this.searchQuery.toLocaleLowerCase().includes("polo") ||
              this.searchQuery.toLocaleLowerCase().includes("polo shir")
            )
          )
            searchClient.filter(
              this.resultsFilter +
                ' AND NOT name="T Shirt" AND NOT name="T-Shirt" AND NOT name="T-Shirts" AND NOT name="TShirt" AND NOT name="Polo Shirt"  AND NOT (_category="T Shirts" OR _category="T-Shirts")'
            );
          else if (
            this.searchQuery.toLocaleLowerCase().includes("t-shir") ||
            this.searchQuery.toLocaleLowerCase().includes("tshir") ||
            this.searchQuery.toLocaleLowerCase().includes("t shir") ||
            this.searchQuery.toLocaleLowerCase().includes("t shirts") ||
            this.searchQuery.toLocaleLowerCase().includes("t-shirts") ||
            this.searchQuery.toLocaleLowerCase().includes("tshirts") ||
            this.searchQuery.toLocaleLowerCase().includes("polo") ||
            this.searchQuery.toLocaleLowerCase().includes("polo shir")
          )
            searchClient.filter(
              this.resultsFilter +
                ' OR name="T Shirt" OR name="T-Shirt" OR name="T-Shirts" OR name="TShirt" OR name="Polo" OR neck="Polo"'
            );
          else searchClient.filter(this.resultsFilter);
        }
        if (this.sortField !== "") searchClient.sort(this.sortField);

        searchClient
          .fields(
            "colour",
            "url_key",
            "gallery",
            "discount_percentage",
            "brand",
            "name",
            "price",
            "discounted_price",
            "image",
            "url",
            "_size_search",
            "color_options",
            "group_id",
            "id"
          )
          .skip(offset)
          .count(this.pageSize)
          .textFacets(
            "_category",
            "_size_search",
            "discount_filter",
            "pattern",
            "colour",
            "neck",
            "length",
            "sleeve",
            "fit"
          )
          .facetCount(99)
          .numericFacets("discounted_price", [
            {
              min: 0,
              max: 5000,
              minInclusive: true, //default true
              maxInclusive: true, //default false
            },
            {
              min: 5001,
              max: 10000,
              minInclusive: true, //default true
              maxInclusive: true, //default false
            },
            {
              min: 10001,
              max: 15000,
              minInclusive: true, //default true
              maxInclusive: true, //default false
            },
            {
              min: 15001,
              max: 20000,
              minInclusive: true, //default true
              maxInclusive: true, //default false
            },
            {
              min: 20001,
              max: 25000,
              minInclusive: true, //default true
              maxInclusive: true, //default false
            },
            {
              min: 25001,
              max: 30000,
              minInclusive: true, //default true
              maxInclusive: true, //default false
            },
            {
              min: 30001,
              max: 40000,
              minInclusive: true, //default true
              maxInclusive: true, //default false
            },
            {
              min: 40001,
              max: 50000,
              minInclusive: true, //default true
              maxInclusive: true, //default false
            },
            {
              min: 50001,
              max: 60000,
              minInclusive: true, //default true
              maxInclusive: true, //default false
            },
            {
              min: 60000,
              max: 10000000,
              minInclusive: true, //default true
              maxInclusive: true, //default false
            },
          ]);
      }
    },
    loadMore: function (offset) {
      if (this.isOpen) {
        this.searchProducts(offset);
      }
    },
    handleScroll: function () {
      this.backToTop = window.scrollY > 250;
      if (window.scrollY > 400 + this.scrollVal) {
        if (this.totalHits > this.currOffset + this.pageSize) {
          this.loadMore(this.currOffset + this.pageSize);
        }
        this.scrollVal = window.scrollY;
      }
      if (window.scrollY > this.onFocusScroll + 100 && this.isDeviceMobile) {
        document.querySelector("input[name='st']").blur();
        this.onFocusScroll = window.scrollY;
      }
    },
    pushFilter: function (field) {
      let selectedFilter = [];

      //to append filter
      if (field === undefined) {
        selectedFilter = this.filters.filter((x) => x.selected.length > 0);
      }
      //to clear filter
      else {
        selectedFilter = this.filters.filter(
          (x) => x.selected.length > 0 && x.field !== field
        );
      }

      this.um.clear();
      let res;

      let stateObj = "";
      if (selectedFilter.length > 0) {
        selectedFilter.forEach((f) => {
          if (f.field === "discounted_price") {
            res = this.um.withNumericFilters(f.title, f.selected);
          } else if (f.field !== "discounted_price") {
            res = this.um.withFilters(
              f.title,
              f.selected.map((x) => {
                // return encodeURIComponent(x.replaceAll(",","$"));
                return encodeURIComponent(x.replace(/,/g, "@"));
              })
            );
          }
          stateObj = res.currentUrl;
        });
      } else {
        this.um.clear();
        stateObj = this.um.getCurrentUrl();
      }

      stateObj = stateObj.replace(/%20/g, "+");
      stateObj = stateObj.replace(/%2C/g, ",");
      this.searchProducts(0);
      history.pushState(stateObj, "filter", stateObj);
      // this.pushSort();
    },

    sorting: function (label, flag = true) {
      this.sortLabel = label;
      for (let i = 0; i < this.sorts.length; i++) {
        this.sorts[i].active = this.sorts[i].label === this.sortLabel;
      }
      this.jumpToTop();
      if (this.sortLabel !== "Relevance") {
        // ga.recordSortEvent(this.sortLabel);
      }
      this.searchProducts(0);
      if (flag) this.pushSort();
      this.showMobileSort = false;
    },
    async applyFilter() {
      this.jumpToTop();
      this.pushFilter();
    },

    productViewed: function (itemName) {
      if (itemName) {
        // ga.recordProductViewedEvent(itemName);
      }
    },
  },
  filters: {
    truncate: function (text, length) {
      const clamp = "...";
      length = length || 30;
      if (text.length <= length) return text;
      let tcText = text.slice(0, length - clamp.length);
      return tcText + clamp;
    },
  },
  computed: {
    selectedFilters: function () {
      let selected = [];
      for (let i = 0; i < this.filters.length; i++) {
        this.filters[i].selected.forEach((x) => {
          selected.push(x);
        });
      }
      return selected;
    },
    isFilterOpen: function () {
      return this.filters.find((f) => f.isOpen);
    },
    getHomePageUrl: function () {
      return this.baseUrl;
    },
    topFilter: function () {
      return this.filters.find((x) => x.onTop);
    },
    isDeviceMobile: function () {
      return window.matchMedia("only screen and (max-width: 834px)").matches;
    },
    sortField: function () {
      return this.sorts.find((x) => x.label === this.sortLabel).field;
    },
    mainDivId: function () {
      if (this.isSearchPage) return "search-content";
    },
  },
  data() {
    return {
      baseUrl: "/",
      path:"",
      allSelectedFilters: [],
      showSort: false,
      showFilter: false,
      selectedField: "_size_search",
      currSymbol: "Rs.",
      sortMobileDisplay: false,
      htmlContent: "",
      onFocusScroll: 0,
      activeDiscount: undefined,
      activeSize: undefined,
      activeFlavor: undefined,
      activeVariant: undefined,
      activeImage: undefined,
      isMainPage: false,
      pageReload: false,
      isVegOnly: false,
      um: "",
      main: "",
      errorEncountered: false,
      loader: true,
      isOpen: false,
      beforeSearchPage: "",
      response: [],
      searchQuery: "",
      currOffset: 0,
      pageSize: 12,
      scrollVal: 0,
      totalHits: -1,
      filterCount: 0,
      showMobileSort: false,
      showMobileFilter: false,
      backToTop: false,
      resultsEnd: false,
      resultsFilter: "in_stock = 1 AND status = 1",
      sorts: [
        {
          label: "Relevance",
          field: "",
          active: true,
        },
        {
          label: "Price (Low to High)",
          field: "discounted_price",
          active: false,
        },
        {
          label: "Price (High to Low)",
          field: "-discounted_price",
          active: false,
        },
        {
          label: "Discount",
          field: "-discount_percentage",
          class: "discount",
        },
      ],
      sortLabel: "Relevance",
      filters: [
        {
          title: "Category",
          field: "_category",
          type: "textFacet",
          isOpen: false,
          values: [],
          selected: [],
          onTop: false,
          isStatic: false,
        },
        {
          title: "Size",
          field: "_size_search",
          type: "textFacet",
          isOpen: false,
          values: [],
          selected: [],
          onTop: false,
          isStatic: false,
        },
        {
          title: "Color",
          field: "colour",
          type: "textFacet",
          isOpen: false,
          values: [],
          selected: [],
          onTop: false,
          isStatic: false,
        },
        {
          title: "Fit",
          field: "fit",
          type: "textFacet",
          isOpen: false,
          values: [],
          selected: [],
          onTop: false,
          isStatic: false,
        },
        {
          title: "Sleeve",
          field: "sleeve",
          type: "textFacet",
          isOpen: false,
          values: [],
          selected: [],
          onTop: false,
          isStatic: false,
        },
        {
          title: "Length",
          field: "length",
          type: "textFacet",
          isOpen: false,
          values: [],
          selected: [],
          onTop: false,
          isStatic: false,
        },
        {
          title: "Neck",
          field: "neck",
          type: "textFacet",
          isOpen: false,
          values: [],
          selected: [],
          onTop: false,
          isStatic: false,
        },
        {
          title: "Price",
          field: "discounted_price",
          type: "numericFacet",
          isOpen: false,
          values: [],
          selected: [],
          onTop: false,
          isStatic: false,
        },
        {
          title: "Discount",
          field: "discount_filter",
          type: "textFacet",
          isOpen: false,
          values: [],
          selected: [],
          onTop: false,
          isStatic: false,
        },
      ],
    };
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    this.$store.commit("st_search");
  },
};
</script>