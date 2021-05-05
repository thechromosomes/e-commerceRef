<template>
  <div class="mainSections">
    <div class="container">
      <div class="content-pages">
        <h2 class="mainTitle">Sitemap</h2>
        <div class="sitemap-p">
          <div
            class="sitemap-inner"
            v-for="(item, index) in header"
            :key="index"
          >
            <h4>
              <NuxtLink
                :to="`/cms/${item.landing_page}`"
                v-if="item.landing_page != ''"
                >{{ item.name }}</NuxtLink
              >
              <a v-if="item.landing_page == ''" class="sa">{{ item.name }}</a>
            </h4>
            <ul
              v-if="item.childs && item.childs.length > 0"
              :class="[item.childs.length >= 7 ? 'menu-format' : '']"
            >
              <li
                v-for="(childItem, childIndex) in item.childs"
                :key="childIndex"
              >
                <Nuxt-link
                  :to="`/collections/${childItem.menu_url_key}/`"
                  v-if="childItem.landing_page == ''"
                  >{{ childItem.name }}</Nuxt-link
                >
                <Nuxt-link
                  :to="`/cms/${childItem.landing_page}`"
                  v-if="childItem.landing_page != ''"
                  >{{ childItem.name }}</Nuxt-link
                >
              </li>

              
            </ul>
            
          </div>
            <div class="sitemap-inner">
              <h4>
                <a href="#" class="">CUSTOMER SERVICE</a>
              </h4>
                <ul>
                  <li>
                    <NuxtLink no-prefetch to="/Dashboard"
                          >My Account</NuxtLink
                        >
                  </li>
                   <li>
                        <NuxtLink to="/trackorder">Order Tracking</NuxtLink>
                      </li>

                      <li>
                        <NuxtLink to="/cms/return-policy"
                          >Return Policy</NuxtLink
                        >
                      </li>

                      <li>
                        <NuxtLink to="/cms/shipping-policy"
                          >Shipping Policy</NuxtLink
                        >
                      </li>

                      <li>
                        <NuxtLink to="/cms/shoe-size-chart"
                          >Shoe Size Chart</NuxtLink
                        >
                      </li>

                      <li>
                        <NuxtLink to="/cms/care-and-cleaning"
                          >Cleaning &amp; Care</NuxtLink
                        >
                      </li>

                      <li>
                        <NuxtLink to="/cms/contact-us">Contact Us</NuxtLink>
                      </li>
                </ul>
            </div>
              <div class="sitemap-inner">
                <h4>
                  <a href="#" class="">SITE TERMS</a>
                </h4>
                  <ul>
                    <li><NuxtLink to="#">Site Map</NuxtLink></li>

                      <li>
                        <NuxtLink to="/cms/terms-of-use">Terms Of Use</NuxtLink>
                      </li>

                      <li>
                        <NuxtLink to="/cms/gift-card-terms-of-use"
                          >Gift Card Terms Of Use</NuxtLink
                        >
                      </li>

                      <li><NuxtLink to="#">Terms Of Sale</NuxtLink></li>

                      <li>
                        <NuxtLink to="/cms/privacy-policy"
                          >Privacy Policy</NuxtLink
                        >
                      </li>

                      <li>
                        <NuxtLink to="/ShoeGlossary">Shoe Glossary</NuxtLink>
                      </li>
                      <li>
                        <NuxtLink to="/cms/terms-and-conditions"
                          >Terms & Conditions</NuxtLink
                        >
                      </li>
                      <li>
                        <NuxtLink to="/cms/shoe-care">Shoe Care</NuxtLink>
                      </li>
                    
                  </ul>
            </div>
              <div class="sitemap-inner">
                <h4>
                  <a href="#" class="">ABOUT THE COMPANY</a>
                </h4>
                  <ul>
                     <li>
                        <NuxtLink to="/cms/about-steve-madden">About Steve Madden</NuxtLink>
                      </li>
                  </ul>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["header"])
  }
};
</script>
