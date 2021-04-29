import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast, {
    position: 'top',
    queue: true
});


import SimpleVueValidation from 'simple-vue-validator';
Vue.use(SimpleVueValidation);


import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyB_w48EfCO6yaYhPsrbKiQ-8yBUcJVTUpw",
    libraries: "places,geometry",
  },
});
