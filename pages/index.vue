<template>
  <div>
    <!-- home page cms -->
    <div v-if="Object.keys(homePageData).length != 0">
      <span v-html="homePageData.content"></span>
    </div>

    <div class="collections_slide">
      <div class="slide_content" v-if="bannerSlide.length > 0">
        <VueSlickCarousel ref="slick" v-bind="settings2">
          <div class="item" v-for="(item, index) in bannerSlide" :key="index">
            <img
              :src="item.desktop_image"
              alt="img"
              class="desktop_only w-100"
            />
            <img :src="item.mobile_image" alt="img" class="mobile_only w-100" />
            <div class="img_content">
              <div class="" v-html="item.description"></div>
            </div>
          </div>
        </VueSlickCarousel>
      </div>
    </div>

    <section class="new_in">
      <div class="container-fluid">
        <div class="content_new_in">
          <h2 class="swiper-header">NEW IN</h2>
          <div class="slide_new_in" v-if="is_new.length > 0">
            <VueSlickCarousel ref="slick" v-bind="settings">
              <div class="item" v-for="(item, index) in is_new" :key="index">
                <NuxtLink :to="`product/${item.url_key}`"
                  ><img :src="item.image" alt="img" class="w-100"
                /></NuxtLink>
                <div class="tile-body">
                  <p>{{ item.color }}</p>
                  <NuxtLink :to="`product/${item.url_key}`">
                    {{ item.name }}
                  </NuxtLink>
                </div>
              </div>
            </VueSlickCarousel>
          </div>
        </div>
      </div>
    </section>

    <!-- Start of bottom images Section -->
    <span v-html="homePageData.content_1"></span>
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
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              arrows: false,
              centerMode: false,
              centerPadding: "40px",
              slidesToShow: 2.5,
            },
          },
          {
            breakpoint: 767,
            settings: {
              arrows: false,
              centerMode: false,
              centerPadding: "40px",
              slidesToShow: 1.5,
            },
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: false,
              centerPadding: "20px",
              slidesToShow: 1,
            },
          },
        ],
      },
      settings2: {
        focusOnSelect: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        centerMode: false,
        responsive: [
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 1,
              autoplay: true,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              autoplay: true,
              slidesToScroll: 1,
            },
          },
        ],
      },
    };
  },
  // head() {
  //   return {
  //     title: this.homePageData.meta_title,
  //     meta: [
  //       {
  //         hid: this.homePageData.meta_description,
  //         name: this.homePageData.meta_description,
  //         content: this.homePageData.meta_description,
  //       },
  //       {
  //         hid: "og:title",
  //         content: this.title,
  //         property: "og:title",
  //       },
  //       {
  //         hid: "og:description",
  //         content: this.description,
  //         property: "og:description",
  //       },
  //       {
  //         hid: "og:url",
  //         content: this.url,
  //         property: "og:url",
  //       },
  //     ],
  //   };
  // },

  computed: {
    ...mapState(["homePageData", "bannerSlide", "is_new"]),

    // render seo tags
    title() {
      if (this.homePageData.meta_title != "") {
        return this.homePageData.meta_title;
      }
      return "STEVE MADDEN ALL PRODUCT";
    },
    description() {
      if (this.homePageData.meta_description !== "") {
        return this.homePageData.meta_description;
      }
      return "STEVE MADDEN";
    },
    url() {
      return this.$store.state.BASE_URL + this.$route.fullPath;
    },
  },
  // async fetch() {
  //   let response = await this.$store.dispatch("pimAjax", {
  //     method: "get",
  //     url: `/pimresponse.php`,
  //     params: {
  //       service: "banner_slider",
  //       store: 1,
  //     },
  //   });
  //   if (response.response.success) {
  //     this.bannerSlide = response.result.banner;
  //   }

  //   // is new api call
  //   let bestSellerForm = {};
  //   bestSellerForm.service = "is_new";
  //   bestSellerForm.store = 1;
  //   let newInData = await this.$store.dispatch("getBestSeller", {
  //     method: "get",
  //     url: `pimresponse.php`,
  //     params: bestSellerForm,
  //   });
  //    if (newInData.response.success) {
  //     this.bannerSlide = response.result.banner;
  //   }
  // },
};
</script>
