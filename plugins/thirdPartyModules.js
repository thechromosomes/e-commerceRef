import Vue from "vue";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import vueDebounce from "vue-debounce";
import * as VueGoogleMaps from "vue2-google-maps";
import SimpleVueValidation from "simple-vue-validator";

Vue.use(vueDebounce);
Vue.use(SimpleVueValidation);
Vue.use(VueToast, {
  position: "top",
  queue: true,
});
Vue.use(VueGoogleMaps, {
  load: {
    // key: "AIzaSyB_w48EfCO6yaYhPsrbKiQ-8yBUcJVTUpw",
    key: "AIzaSyADIZXv1w1AVnkacfh3AzL1VZLMgFWqTCE",
    libraries: "places,geometry",
  },
});
