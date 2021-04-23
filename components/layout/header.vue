<template>
  <header class="header">
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
        <div class="search_box" @click="searchActive = true">
          <button class="btn">Search</button>
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
      searchActive: false
    };
  },

  computed: {
    ...mapState(["header"])
  }
};
</script>
