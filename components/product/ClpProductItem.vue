<template>
  <div class="product_list_item">
    <div class="list_slide" v-if="singleProd.gallery.length > 0">
      <VueSlickCarousel v-bind="productSetting">
        <div
          class="item"
          v-for="(image, imgIndex) in singleProd.gallery"
          :key="imgIndex"
        >
          <Nuxt-link :to="`/product/${singleProd.url_key}`">
            <img :src="image.image" alt="img" class="w-100" />
          </Nuxt-link>
        </div>
      </VueSlickCarousel>
    </div>
    <div class="title-body">
      <p class="p-price">
        <span v-if="singleProd.discount != '' && singleProd.discount > 0">
          ₹{{ singleProd.selling_price }}
          <span class="line-throu">₹{{ singleProd.price }}</span>
        </span>
        <span v-else>₹{{ singleProd.price }}</span>
      </p>
      <p>{{ singleProd.color }}</p>
      <Nuxt-link :to="`/product/${singleProd.url_key}`">{{
        singleProd.name
      }}</Nuxt-link>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";

export default {
  data: () => ({
    productSetting: {
      focusOnSelect: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: true
    }
  }),
  components: {
    VueSlickCarousel
  },
  props: ["singleProd"]
};
</script>
