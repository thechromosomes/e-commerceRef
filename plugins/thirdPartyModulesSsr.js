import Vue from 'vue';

import SimpleVueValidation from 'simple-vue-validator';
import NuxtJsonld from 'nuxt-jsonld';

Vue.use(NuxtJsonld);
Vue.use(SimpleVueValidation);

Vue.filter("numberWithCommas", (num) => {
  if (num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
});