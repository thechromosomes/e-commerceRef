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
            <ul class="navbar-nav mr-auto">
              <li class="nav-item" v-for="(item, index) in header" :key="index">
                <span class="stripeImage"></span>
                <a class="nav-link first">{{ item.name }}</a>
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
                        <client-only>
                          <template
                            v-if="
                              childItem.childs && childItem.childs.length > 0
                            "
                          >
                            <li class="nav-item">
                              <span class="stripeImage"></span>
                              <a href="#" class="nav-link">{{
                                childItem.name
                              }}</a>
                              <div class="dropdown_menu_level-3">
                                <div class="level-3">
                                  <div class="row">
                                    <div class="col-md-12 col-lg-9">
                                      <div class="levelthreemenu">
                                        <ul>
                                          <li
                                            v-for="(subChildItem,
                                            subCgildIndex) in childItem.childs"
                                            :key="subCgildIndex"
                                          >
                                            <Nuxt-link
                                              @click.native="
                                                showMobileMenu = false
                                              "
                                              class="nav-link pl-0"
                                              :to="
                                                `/collections/${subChildItem.menu_url_key}/`
                                              "
                                              >{{
                                                subChildItem.name
                                              }}</Nuxt-link
                                            >
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div class="col-md-12 col-lg-3">
                                      <div class="menu_img-section">
                                        <img
                                          src="@/assets/img/new_arrivals-menu.jpg"
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
                        </client-only>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="site-logo">
          <NuxtLink class="navbar-brand" to="/"
            ><img src="~/assets//img/logo.svg" alt="logo"
          /></NuxtLink>
        </div>
        <!-- <div class="search_box">
          <div
            class="searchbox desktop_only"
            :class="[scrollPosition > 30 ? 'hidden' : '']"
          >
            <span class="carts"
              ><img src="~/assets//img/search.png" alt="cart"
            /></span>
            <input
              type="search"
              placeholder="What are you looking for?"
              autocomplete="off"
            />
          </div>

          <span
            @click="searchActive = true"
            class="desktop_only"
            :class="[scrollPosition > 30 ? '' : 'hidden']"
          >
            <span class="carts"
              ><img src="~/assets//img/search.png" alt="cart" />
            </span>
          </span>
          <NuxtLink
            v-show="
              this.$store.state.cartAjax.customer_id != null &&
              this.$store.state.cartAjax.customer_id != '' &&
              this.$store.state.cartAjax.customer_session != '' &&
              this.$store.state.cartAjax.customer_session != null
            "
            to="/Dashboard"
          >
            <span class="carts"
              ><img src="~/assets//img/user.png" alt="user" />
            </span>
          </NuxtLink>
          <NuxtLink
            v-show="
              this.$store.state.cartAjax.customer_id == null ||
              this.$store.state.cartAjax.customer_id == '' ||
              this.$store.state.cartAjax.customer_session == '' ||
              this.$store.state.cartAjax.customer_session == null
            "
            to="/Dashboard"
          >
            <span class="carts"
              ><img src="~/assets//img/user.png" alt="user" />
            </span>
          </NuxtLink>
          <NuxtLink to="/wishlist">
            <span class="carts"
              ><img src="~/assets//img/heart.png" alt="cart" />
              <span
                class="cart_val"
                v-if="Object.keys($store.state.cartAjax.wishlist).length != 0"
              >
                {{ $store.state.cartAjax.wishlist.product.split(",").length }}  {{ $store.state.cartAjax.wishlist.product.split(",").length }}
              </span>
              <span class="cart_val" v-else> 0 </span>
            </span>
          </NuxtLink>

          <NuxtLink to="/cart">

            <span class="carts">
              <span class="cart-empty-icon cart-icon"></span>

              <span class="cart_val">
                {{ $store.state.cartAjax.cart_product.length }}
            </span>
            </span>
          </NuxtLink>
          <button class="btn">Search</button>
        </div> -->

        <div class="search_box new_search_box">
          <div class="search-text desktop_only">
            <button class="btn" @click="searchActive = true">Search</button>
          </div>
          <div class="login-text accout-dropdown">
            <client-only>
              <NuxtLink
                v-if="
                  $store.state.cartAjax.customer_id != null &&
                    $store.state.cartAjax.customer_id != '' &&
                    $store.state.cartAjax.customer_session != '' &&
                    $store.state.cartAjax.customer_session != null
                "
                to="/Dashboard"
              >
                <button class="btn desktop_only">Account</button>
                <button class="btn mobile_only">
                  <span class="user-icon"></span>
                </button>
                <div class="dropdown-menu-account">
                  <ul>
                    <ul>
                      <li>
                        <nuxt-link
                          :class="[
                            $route.path == '/Dashboard'
                              ? 'active-account-sidebar'
                              : ''
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
                              : ''
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
                              : ''
                          ]"
                          to="/myorder"
                          >My Orders</nuxt-link
                        >
                      </li>
                      <li>
                        <a @click.prevent="logOut">Logout</a>
                      </li>
                    </ul>
                  </ul>
                </div>
              </NuxtLink>
              <NuxtLink v-else to="/login">
                <button class="btn desktop_only">Login</button>
                <button class="btn mobile_only">
                  <span class="user-icon"></span>
                </button>
              </NuxtLink>
            </client-only>
          </div>

          <div class="cart">
            <NuxtLink to="/wishlist" class="btn">
              <span
                class="carts carts-value wishlist "
                v-if="Object.keys($store.state.cartAjax.wishlist).length != 0"
              >
                <span class="wislist-file-icon wislist-icon"></span>
                <span class="minicart-quantity">
                  {{ $store.state.cartAjax.wishlist.product.split(",").length }}
                </span>
              </span>
              <span class="carts" v-else>
                <span class="cart-empty-icon wislist-icon"></span>
              </span>
            </NuxtLink>
          </div>
          <div class="cart">
            <client-only>
              <NuxtLink to="/cart" class="btn">
                <span
                  class="carts carts-value"
                  v-if="$store.state.cartAjax.cart_product.length > 0"
                >
                  <span class="cart-file-icon cart-icon"></span>
                  <span class="minicart-quantity">
                    {{ $store.state.cartAjax.cart_product.length }}
                  </span>
                </span>
                <span class="carts" v-else>
                  <span class="cart-empty-icon cart-icon"></span>
                </span>
              </NuxtLink>
            </client-only>
          </div>
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
              class="search_input"
              autocomplete="off"
              placeholder="What are you looking for?"
              autofocus="autofocus"
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

export default {
  data() {
    return {
      showMobileMenu: false,
      searchActive: false,
      scrollPosition: null
    };
  },
  async mounted() {
    // for sticky header
    window.addEventListener("scroll", this.updateScroll);
  },

  computed: {
    ...mapState(["header"])
  },

  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
    logOut: async function() {
      var form = {};
      form.customer_id = this.$store.state.cartAjax.customer_id;
      form.customer_session = this.$store.state.cartAjax.customer_session;
      this.$store
        .dispatch("cartAjax/actCartAjax", {
          method: "post",
          url: `/customer/logout`,
          token: this.$store.state.cartAjax.customer_token,
          params: form
        })
        .then(async response => {
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
        .catch(error => {
          console.log("error from the log out page", error);
        });
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.updateScroll);
  }
};
</script>
<style scoped>
@import url("@/assets/css/pages-css/loader.css");
</style>
