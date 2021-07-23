<template>
  <div>
    <!-- home page cms -->
    <div v-if="Object.keys(homePageData).length != 0">
      <span v-html="homePageData.content"></span>
    </div>

    <div class="collections_slide">
      <client-only>
        <div class="slide_content" v-if="bannerSlide.length > 0">
          <VueSlickCarousel ref="slick" v-bind="settings2">
            <template  v-for="(item, index) in bannerSlide" >
            <div class="item" v-if="item.banner_type === 'Banner'" :key="index">
              <img
                :src="item.desktop_image"
                alt="img"
                class="desktop_only w-100"
              />
              <img
                :src="item.mobile_image"
                alt="img"
                class="mobile_only w-100"
              />
              <div class="img_content">
                <div class="" v-html="item.description"></div>
              </div>
            </div>
            </template>
          </VueSlickCarousel>
        </div>
      </client-only>
    </div>

    <client-only>
      <section class="new_in" style="min-height:250px;" v-if="is_new.length > 0">
        <div class="container-fluid">
          <div class="content_new_in">
            <h2 class="swiper-header">NEW IN</h2>
            <div class="slide_new_in">
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
    </client-only>

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
        lazyLoad:"ondemand",
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
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: this.description,
          name: this.description,
          content: this.description,
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

  computed: {
    ...mapState(["homePageData", "bannerSlide", "is_new"]),

    // render seo tags
    title() {
      if (this.homePageData.meta_title != "") {
        return this.homePageData.meta_title;
      }
      return "DIESEL ALL PRODUCT";
    },
    description() {
      if (this.homePageData.meta_description !== "") {
        return this.homePageData.meta_description;
      }
      return "DIESEL";
    },
    url() {
      return this.$store.state.BASE_URL + this.$route.fullPath;
    },
  },
};
</script>
<style>
.home-benefits-section{
  margin: 50px 0;
}
.home-benefits-section .benefits-section-col{
  max-width: 290px;
  margin: 0 auto;
  padding: 15px;
}
.home-benefits-section .benefits-section-div{
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
}
.home-benefits-section .benefits-section-div img{
  max-width: 100%;
  width: 110px;
  margin-bottom: 20px;
}
.home-benefits-section .benefits-section-div h3{
  font-size: 18px;
  margin: 0 0 14px 0;
  line-height: 1;
}
.home-benefits-section .benefits-section-div p{
   margin: 0 0 14px 0;
}
.home-benefits-section .view-all-link{
  font-weight: bold;
  text-decoration: underline;
}
@media(max-width:991px){
  .home-benefits-section .benefits-section-col{
    max-width: 290px;
    margin: 0 auto;
    padding: 35px;
  }
}
</style>