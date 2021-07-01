<template>
  <div>
    <div
      class="product-carousel-padding"
      v-if="likeData && likeData.length > 0"
    >
      <div class="product-carousel-container">
        <h2 class="product-carousel-title">You may also like</h2>
      </div>
      <client-only>
        <div class="you_like_slide">
          <VueSlickCarousel v-bind="settings">
            <div class="item" v-for="(item, index) in likeData" :key="index">
              <NuxtLink
                :to="`/product/${item.url_key}`"
                @click.native="gtm_product_click(item, index)"
              >
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
      </client-only>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
export default {
  components: { VueSlickCarousel },
  props: ["likeData"],
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
              slidesToShow: 2.5,
            },
          },
          {
            breakpoint: 767,
            settings: {
              arrows: false,
              centerMode: false,
              centerPadding: "0px",
              slidesToShow: 2.5,
            },
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: false,
              centerPadding: "20px",
              slidesToShow: 1.5,
            },
          },
        ],
      },
    };
  },
  methods: {
    gtm_product_click(singleProd, prodIndex) {
      this.$gtm.push({
        event: "Product Click",
        action: "productClick",
        category: singleProd.category,
        label: "You may also like",
        ecommerce: {
          click: {
            actionField: {
              action: "click",
              list: "You may also like list",
            },
            products: [
              {
                name: singleProd.name,
                id: singleProd.sku,
                price: singleProd.price,
                category: "You may also like",
                position: prodIndex,
              },
            ],
          },
        },
      });
    },
  },
};
</script>
