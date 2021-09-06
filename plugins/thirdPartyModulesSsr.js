import Vue from "vue";

import SimpleVueValidation from "simple-vue-validator";
import NuxtJsonld from "nuxt-jsonld";

Vue.use(NuxtJsonld);
Vue.use(SimpleVueValidation);

Vue.filter("numberWithCommas", (num) => {
  if (num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
});

Vue.filter("renderSlideToShow", (type, defaultSlide = 3) => {
  if (type.isMobile) {
    return 1.5;
  }
  if (type.isTablet) {
    return 2.5;
  } else {
    return defaultSlide;
  }
});

Vue.filter("renderArrows", (type) => {
  if (type.isMobile) {
    return false;
  }
  if (type.isTablet) {
    return false;
  } else {
    return true;
  }
});
