<template>
  <header class="header" :class="[scrollPosition > 30 ? 'header-fixed' : '']">
    <!-- vue loader -->
    <div class="page-loader" v-if="$store.state.pageLoader">
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
          <span class="search-icon-mobile" @click="searchActive = true"></span>
        </div>
        <div
          class="collapse navbar-collapse"
          id="navbarSupportedContent"
          :class="{ active: showMobileMenu }"
        >
          <div class="menu-mobile">
            <div class="mobile-heading">
              <h2>Menu</h2>
              <div
                class="close"
                id="close-btn"
                @click="showMobileMenu = !showMobileMenu"
              ></div>
            </div>
            <client-only>
              <ul class="navbar-nav mr-auto">
                <li
                  class="nav-item nav-block"
                  v-for="(item, index) in header"
                  :key="index"
                >
                  <span class="stripeImage"></span>
                  <NuxtLink
                    :to="`/clp/${item.menu_url_key}`"
                    class="nav-link first"
                    >{{ item.name }}</NuxtLink
                  >
                  <div
                    class="dropdown_menu"
                    v-if="item.childs && item.childs.length > 0"
                  >
                    <div class="level-2">
                      <ul class="navbar-nav">
                        <li
                          class="nav-item"
                          v-for="(childItem, childIndex) in item.childs"
                          :key="childIndex"
                        >
                          <template
                            v-if="
                              childItem.childs && childItem.childs.length > 0
                            "
                          >
                            <li class="nav-item">
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
                                    <div class="col-md-12 col-lg-9">
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
                                                showMobileMenu = false
                                              "
                                              class="nav-link pl-0"
                                              :to="`/collections/${subChildItem.menu_url_key}/`"
                                              >{{ subChildItem.name }}
                                            </Nuxt-link>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div class="col-md-12 col-lg-3">
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
            </client-only>
          </div>
        </div>
        <div class="site-logo">
          <NuxtLink class="navbar-brand" to="/"
            ><img src="~/assets//img/logo.svg" alt="logo"
          /></NuxtLink>
        </div>

        <div class="search_box">
          <client-only>
            <ul>
              <li class="desktop_only" @click="searchActive = true">
                <nuxt-link to="#">Search</nuxt-link>
              </li>
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
                  <div
                    class="login login-user"
                    v-if="
                      $store.state.cartAjax.customer_id != null &&
                      $store.state.cartAjax.customer_id != '' &&
                      $store.state.cartAjax.customer_session != '' &&
                      $store.state.cartAjax.customer_session != null
                    "
                    to="/Dashboard"
                  >
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
                          $store.state.cartAjax.wishlist.product.split(",")
                            .length
                        }}
                      </span>
                    </span>
                    <span class="wishlist-icon wish-blank" v-else></span>
                  </div>
                </nuxt-link>
              </li>
              <li class="mini-cart">
                <div class="carts">
                  <a href="/cart">
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
                  </a>
                </div>
              </li>
            </ul>
          </client-only>
        </div>
      </div>
    </nav>
    <!-- search box -->
    <div class="search-box" v-if="searchActive">
      <div class="site-search">
        <div class="search_icon">
          <span class=""></span>
        </div>
        <div class="search_form">
          <form>
            <input
              type="text"
              value=""
              class="search_input"
              autocomplete="off"
              placeholder="What are you looking for?"
              autofocus="autofocus"
              v-model="searchInput"
              @keyup="stSearch"
              name="st"
            />
          </form>
        </div>
        <div class="close_icon" @click="searchActive = false">
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
      showMobileMenu: false,
      searchActive: false,
      scrollPosition: null,
      ShowhoverCart: false,
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
    stSearch(e) {
      var name = /^(?!\s*$).+/;
      if (e.target.value.match(name)) {
        this.$store.commit("st_search", e.target.value);
      } else {
        this.$store.commit("st_search", "");
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
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.updateScroll);
  },
};
</script>
<style scoped>
@import url("@/assets/css/pages-css/loader.css");
</style>
