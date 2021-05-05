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
          <span class="search-icon-mobile"></span>
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
                        <Nuxt-link
                          @click.native="showMobileMenu = false"
                          class="nav-link pl-0"
                          :to="`/collections/${childItem.menu_url_key}/`"
                          >{{ childItem.name }}</Nuxt-link
                        >
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
        <div class="search_box">
          <span @click="searchActive = true" class="desktop_only">
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
            to="/account"
          >
            <span class="carts"
              ><img src="~/assets//img/user.png" alt="cart" />
            </span>
          </NuxtLink>
          <NuxtLink
            v-show="
              this.$store.state.cartAjax.customer_id == null ||
              this.$store.state.cartAjax.customer_id == '' ||
              this.$store.state.cartAjax.customer_session == '' ||
              this.$store.state.cartAjax.customer_session == null
            "
            to="/account"
          >
            <span class="carts"
              ><img src="~/assets//img/user.png" alt="cart" />
            </span>
          </NuxtLink>
          <NuxtLink to="/wishlist">
            <span class="carts" style="margin-right: 10px"
              ><img src="~/assets//img/heart.png" alt="cart" />
              <span
                class="cart_val"
                v-if="Object.keys($store.state.cartAjax.wishlist).length != 0"
              >
                {{ $store.state.cartAjax.wishlist.product.split(",").length }}
              </span>
              <span class="cart_val" v-else> 0 </span>
            </span>
          </NuxtLink>

          <NuxtLink to="/cart">
            <span class="carts"
              ><img src="~/assets//img/cart.png" alt="cart" />
              <span class="cart_val">
                {{ $store.state.cartAjax.cart_product.length }}
              </span>
            </span>
          </NuxtLink>
          <!-- <button class="btn">Search</button> -->
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
      scrollPosition: null,
    };
  },
  async mounted() {
    // for sticky header
    window.addEventListener("scroll", this.updateScroll);
  },

  computed: {
    ...mapState(["header"]),
  },

  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
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
