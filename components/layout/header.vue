<template>
  <header class="header" :class="[scrollPosition > 30 ? 'header-fixed' : '']">
    <!-- vue loader -->
    <div class="page-loader" v-show="$store.state.pageLoader">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
        <div class="mobile-screen-icon">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle=""
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            @click="showMobileMenu = !showMobileMenu"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <span class="search-icon-mobile" @click="toogleSearch(true)"></span>
        </div>
        <div
          class="collapse navbar-collapse"
          id="navbarSupportedContent"
          :class="{ active: showMobileMenu || showHelpSidebar }"
        >
          <div class="menu-mobile" @click="showMobileMenu = false">
            <div class="menu-mobile-sidebar" @click="$event.stopPropagation()">
              <div class="mobile-heading">
                <h2>Menu</h2>
                <div
                  class="close"
                  id="close-btn"
                  @click="showMobileMenu = !showMobileMenu"
                ></div>
              </div>
              <ul class="navbar-nav mr-auto">
                <li
                  class="nav-item"
                  v-for="(item, index) in header"
                  :key="index"
                  :class="{
                    'active-nav':
                      $store.state.activeUrlKey.split('-')[0].toUpperCase() ==
                      item.name.toUpperCase(),
                    'show-dropdown': levelOneActiveItemIndex === index,
                  }"
                >
                  <span
                    class="stripeImage"
                    @click="onmenuhover(item.name, index)"
                  ></span>
                  <NuxtLink
                    @click.native="showMobileMenu = false"
                    :to="`/clp/${item.menu_url_key}`"
                    @mouseover.native="onmenuhover(item.name)"
                    class="nav-link first"
                    :class="{
                      'active-nav-link':
                        $store.state.activeUrlKey.split('-')[0].toUpperCase() ==
                        item.name.toUpperCase(),
                    }"
                    >{{ item.name }}</NuxtLink
                  >
                  <div
                    class="dropdown_menu"
                    v-if="
                      item.childs &&
                      item.childs.length > 0 &&
                      menuhover == item.name
                    "
                  >
                    <div class="level-2">
                      <ul class="navbar-nav">
                        <li
                          class="nav-item"
                          v-for="(childItem, childIndex) in item.childs"
                          :key="childIndex"
                          :class="{
                            'show-inner-dropdown':
                              levelTwoActiveItemIndex === childIndex,
                          }"
                        >
                          <template
                            v-if="
                              childItem.childs && childItem.childs.length > 0
                            "
                          >
                            <li
                              class="nav-item"
                              @click="toggleInnerMenu(childIndex)"
                            >
                              <span class="stripeImage"></span>
                              <a
                                :class="{
                                  'active-sub-nav':
                                    $store.state.activeUrlKey
                                      .split('-')[1]
                                      .toUpperCase() ==
                                    childItem.name.toUpperCase(),
                                }"
                                class="nav-link"
                                >{{ childItem.name }}
                              </a>
                              <div class="dropdown_menu_level-3">
                                <div class="level-3">
                                  <div class="row">
                                    <div
                                      class="col-md-12"
                                      :class="childItem.image ? 'col-lg-9' : ''"
                                    >
                                      <div class="levelthreemenu">
                                        <ul>
                                          <li
                                            v-for="(
                                              subChildItem, subCgildIndex
                                            ) in childItem.childs"
                                            :key="subCgildIndex"
                                          >
                                            <Nuxt-link
                                              @click.native="
                                                handleHamClose(
                                                  subChildItem.menu_url_key
                                                )
                                              "
                                              class="nav-link pl-0"
                                              :class="{
                                                haslevel4: subChildItem.childs,
                                              }"
                                              :to="`/collections/${subChildItem.menu_url_key}/`"
                                              >{{ subChildItem.name }}
                                            </Nuxt-link>
                                            <div
                                              class="level-4"
                                              v-show="subChildItem.childs"
                                            >
                                              <ul class="ul-level-4">
                                                <li
                                                  v-for="(
                                                    subChildItemfor,
                                                    subCgildIndexfor
                                                  ) in subChildItem.childs"
                                                  :key="subCgildIndexfor"
                                                >
                                                  <Nuxt-link
                                                    @click.native="
                                                      showMobileMenu = false
                                                    "
                                                    class="nav-link pl-0"
                                                    :to="`/collections/${subChildItemfor.menu_url_key}/`"
                                                    >{{ subChildItemfor.name }}
                                                  </Nuxt-link>
                                                </li>
                                              </ul>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div
                                      class="col-md-12 col-lg-3"
                                      v-show="childItem.image"
                                    >
                                      <div class="menu_img-section">
                                        <img
                                          :src="childItem.image"
                                          alt="img"
                                          class="w-100"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </template>
                          <template v-else>
                            <Nuxt-link
                              @click.native="showMobileMenu = false"
                              class="nav-link pl-0"
                              :class="{
                                'active-sub-nav':
                                  $store.state.activeUrlKey
                                    .split('-')[1]
                                    .toUpperCase() ==
                                  childItem.name.toUpperCase(),
                              }"
                              :to="`/collections/${childItem.menu_url_key}/`"
                              >{{ childItem.name }}</Nuxt-link
                            >
                          </template>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
              <!-- <client-only> -->
              <ul class="account-nav">
                <li
                  class="nav-item help-link"
                  v-if="
                    $store.state.cartAjax.customer_id != null &&
                    $store.state.cartAjax.customer_id != '' &&
                    $store.state.cartAjax.customer_session != '' &&
                    $store.state.cartAjax.customer_session != null
                  "
                  @click="showMobileMenu = false"
                >
                  <Nuxt-link to="/Dashboard">Account</Nuxt-link>
                </li>
                <li
                  class="nav-item help-link"
                  v-else
                  @click="showMobileMenu = false"
                >
                  <Nuxt-link to="/login">Login</Nuxt-link>
                </li>
                <li class="nav-item help-link">
                  <span @click="toggleHelpPopup()">Help</span>
                </li>
              </ul>
              <!-- </client-only> -->
            </div>
          </div>
          <div
            class="menu-mobile help-mobile-sidebar"
            v-if="showHelpSidebar"
            @click="showHelpSidebar = false"
          >
            <div class="menu-mobile-sidebar" @click="$event.stopPropagation()">
              <div class="mobile-heading">
                <h2>Help</h2>
                <div
                  class="close"
                  id="close-btn"
                  @click="showHelpSidebar = !showHelpSidebar"
                ></div>
              </div>
              <ul class="hover-menu navbar-nav mr-auto">
                <li class="hover-item" @click="showHelpSidebar = false">
                  <Nuxt-link
                    class="hover-link"
                    to="/trackorder"
                    title="Order Status"
                    >Check your order
                  </Nuxt-link>
                </li>
                <li class="hover-item" @click="showHelpSidebar = false">
                  <Nuxt-link
                    class="hover-link"
                    to="/cms/return-your-order"
                    title="Returns"
                    >Return your order</Nuxt-link
                  >
                </li>
                <li class="hover-item" @click="showHelpSidebar = false">
                  <Nuxt-link
                    class="hover-link"
                    to="/cms/legal-area/?for=delivery-and-shipping-policy"
                    >Delivery
                  </Nuxt-link>
                </li>
                <li class="hover-item" @click="showHelpSidebar = false">
                  <Nuxt-link class="hover-link" to="/cms/size-conversion"
                    >Size Conversion
                  </Nuxt-link>
                </li>
                <li>
                  <Nuxt-link class="hover-link" to="/cms/contact-us"
                    >Send us a Message
                  </Nuxt-link>
                </li>
                <li class="hover-item" @click="showHelpSidebar = false">
                  <Nuxt-link class="hover-link" to="/cms/allCmsView"
                    >View All
                  </Nuxt-link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="site-logo">
          <NuxtLink class="navbar-brand" to="/"
            ><img src="~/assets//img/logo.svg" alt="logo"
          /></NuxtLink>
        </div>

        <div class="search_box">
          <ul>
            <li class="desktop_only" @click="toogleSearch(true)">
              <a style="cursor: pointer">Search</a>
            </li>
            <li
              class="nav-item help-link dropdown desktop_only"
              role="menuitem"
              aria-label="Open Help"
            >
              <a
                href="#"
                class=""
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span id="open-help-span">Help</span>
              </a>
              <ul class="hover-menu">
                <li class="hover-item">
                  <Nuxt-link
                    class="hover-link"
                    to="/trackorder"
                    title="Order Status"
                    >Check your order
                  </Nuxt-link>
                </li>
                <li class="hover-item">
                  <Nuxt-link
                    class="hover-link"
                    to="/cms/return-your-order"
                    title="Returns"
                    >Return your order</Nuxt-link
                  >
                </li>
                <li class="hover-item">
                  <Nuxt-link
                    class="hover-link"
                    to="/cms/legal-area/?for=delivery-and-shipping-policy"
                    >Delivery
                  </Nuxt-link>
                </li>
                <li class="hover-item">
                  <Nuxt-link class="hover-link" to="/cms/size-conversion"
                    >Size Conversion
                  </Nuxt-link>
                </li>
                <li class="hover-item">
                  <Nuxt-link class="hover-link" to="/cms/contact-us"
                    >Send us a Message
                  </Nuxt-link>
                </li>
                <li class="hover-item">
                  <Nuxt-link class="hover-link" to="/cms/allCmsView"
                    >View All
                  </Nuxt-link>
                </li>
              </ul>
            </li>
            <client-only>
              <li>
                <nuxt-link
                  v-if="
                    $store.state.cartAjax.customer_id != null &&
                    $store.state.cartAjax.customer_id != '' &&
                    $store.state.cartAjax.customer_session != '' &&
                    $store.state.cartAjax.customer_session != null
                  "
                  to="/Dashboard"
                >
                  <div class="login login-user">
                    <span class="desktop_only"> account </span>
                    <span class="mobile_only user-icon"></span>
                    <div class="dropdown-menu-account">
                      <ul>
                        <li>
                          <nuxt-link
                            :class="[
                              $route.path == '/Dashboard'
                                ? 'active-account-sidebar'
                                : '',
                            ]"
                            to="/Dashboard"
                            >Account Dashboard</nuxt-link
                          >
                        </li>
                        <li>
                          <nuxt-link
                            :class="[
                              $route.path == '/addresses'
                                ? 'active-account-sidebar'
                                : '',
                            ]"
                            to="/addresses"
                            >My Address Book</nuxt-link
                          >
                        </li>
                        <li>
                          <nuxt-link
                            :class="[
                              $route.path == '/myorder'
                                ? 'active-account-sidebar'
                                : '',
                            ]"
                            to="/myorder"
                            >My Orders</nuxt-link
                          >
                        </li>
                        <li>
                          <a @click.prevent="logOut">Logout</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nuxt-link>
                <nuxt-link v-else to="/login">
                  <div class="login">
                    <span class="desktop_only">Login</span>
                    <span class="mobile_only user-icon"></span>
                  </div>
                </nuxt-link>
              </li>
            </client-only>
            <li>
              <nuxt-link to="/wishlist">
                <div class="wishlist">
                  <span
                    class="wishlist-full-count"
                    v-if="
                      Object.keys($store.state.cartAjax.wishlist).length != 0
                    "
                  >
                    <span class="wishlist-icon wish-full"></span>
                    <span class="wishlist-count">
                      {{
                        $store.state.cartAjax.wishlist.product.split(",").length
                      }}
                    </span>
                  </span>
                  <span class="wishlist-icon wish-blank" v-else></span>
                </div>
              </nuxt-link>
            </li>
            <li class="mini-cart">
              <div class="carts">
                <nuxt-link to="/cart">
                  <span
                    class="cart-full-count"
                    v-if="$store.state.cartAjax.cart_product.length != 0"
                  >
                    <span class="cart-icon cart-full"></span>
                    <span class="cart-count">
                      {{ $store.state.cartAjax.cart_product.length }}
                    </span>

                    <div class="minicart-wrapper">
                      <Hovercart v-if="true" :handleClick="showhoverCart" />
                    </div>
                  </span>
                  <span class="cart-icon cart-blank" v-else></span>
                </nuxt-link>
              </div>
            </li>
            <!-- </client-only> -->
          </ul>
        </div>
      </div>
    </nav>
    <!-- search box -->
    <div
      class="search-box"
      v-if="$store.state.searchActive"
      @click="toogleSearch(false)"
    >
      <div class="site-search" @click="$event.stopPropagation()">
        <div class="search_icon">
          <span class=""></span>
        </div>
        <div class="search_form">
          <input
            type="text"
            ref="headerSearchBar"
            class="search_input"
            autocomplete="off"
            placeholder="What are you looking for?"
            autofocus="autofocus"
            v-model="searchInput"
            v-debounce:500ms="stSearch"
            @keyup="searchClose"
            name="st"
          />
        </div>
        <div class="close_icon" @click="toogleSearch(false)">
          <span class=""></span>
        </div>
      </div>
    </div>
    <!-- search box end-->
  </header>
</template>

<script>
import { mapState } from "vuex";
import Hovercart from "./Hovercart";

export default {
  components: {
    Hovercart,
  },
  data() {
    return {
      menuhover: "",
      showMobileMenu: false,
      scrollPosition: null,
      ShowhoverCart: false,
      showHelpSidebar: false,
      levelOneActiveItemIndex: -1,
      levelTwoActiveItemIndex: -1,
    };
  },
  head() {
    return {
      bodyAttrs: {
        class: this.showMobileMenu ? "overflow-hidden" : "",
      },
    };
  },
  async mounted() {
    // for sticky header
    window.addEventListener("scroll", this.updateScroll);
  },

  computed: {
    ...mapState(["header"]),
    searchInput: {
      get() {
        // to update search input on page refresh
        if (this.$route.query.q != this.$store.state.list.search_input) {
          return this.$route.query.q;
        } else {
          return this.$store.state.list.search_input;
        }
      },
      set(value) {
        return;
      },
    },
  },

  methods: {
    handleHamClose(url) {
      this.showMobileMenu = false;
    },
    searchClose(event) {
      if (event.keyCode === 13) {
        this.toogleSearch(false);
      }
    },
    toggleInnerMenu(index) {
      // toggle inner dropdown menu
      if (this.levelTwoActiveItemIndex === index) {
        this.levelTwoActiveItemIndex = -1;
      } else {
        this.levelTwoActiveItemIndex = index;
      }
    },
    onmenuhover(menu, index) {
      this.menuhover = menu;
      // toggle dropdown menu
      if (this.levelOneActiveItemIndex === index) {
        this.levelOneActiveItemIndex = -1;
      } else {
        this.levelOneActiveItemIndex = index;
        this.levelTwoActiveItemIndex = -1;
      }
    },

    stSearch(val, e) {
      var name = /^(?!\s*$).+/;
      if (e.target.value.match(name)) {
        this.$store.commit("st_search", e.target.value);
      } else {
        this.$store.commit("st_search", "");
      }
    },

    toogleSearch(event) {
      this.$store.commit("activeSearchToggle", {
        payload: event,
      });
      if (this.$store.state.searchActive) {
        this.$nextTick(() => {
          this.$refs.headerSearchBar.focus();
        });
      }
    },
    showhoverCart() {
      this.ShowhoverCart = false;
    },
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
    logOut: async function () {
      var form = {};
      form.customer_id = this.$store.state.cartAjax.customer_id;
      form.customer_session = this.$store.state.cartAjax.customer_session;
      this.$store
        .dispatch("cartAjax/actCartAjax", {
          method: "post",
          url: `/customer/logout`,
          token: this.$store.state.cartAjax.customer_token,
          params: form,
        })
        .then(async (response) => {
          if (response.data.success === true) {
            $cookies.remove(
              window.location.hostname.substring(10, 4) + "_cart_token"
            );
            $cookies.remove(
              window.location.hostname.substring(10, 4) + "_cart_session"
            );
            $cookies.remove(
              window.location.hostname.substring(10, 4) + "_cart_id"
            );
            $cookies.remove(
              window.location.hostname.substring(10, 4) + "_customer_session"
            );
            $cookies.remove(
              window.location.hostname.substring(10, 4) + "_customer_id"
            );

            $cookies.remove(
              window.location.hostname.substring(10, 4) + "_customer_token"
            );
            this.$toast.success(
              "You have been successfully logout. See you soon!"
            );
            location.reload();
          } else {
            this.$router.push("/");
          }
        })
        .catch((error) => {
          console.log("error from the log out page", error);
        });
    },
    toggleHelpPopup() {
      this.showMobileMenu = false;
      this.showHelpSidebar = !this.showHelpSidebar;
    },
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.updateScroll);
  },
};
</script>
<style scoped>
@import url("@/assets/css/pages-css/loader.css");
</style>
