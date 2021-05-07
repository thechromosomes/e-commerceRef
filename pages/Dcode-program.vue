<template>
  <div class="cms-pages">
    <div class="dcode-program">
      <section class="img-section">
        <div class="img-box">
          <img
            src="~/assets/img/diesel-dcode-fullbleed-desktop.jpg"
            alt="img"
            class="w-100 desktop_only "
          />
          <img
            src="~/assets/img/diesel-dcode-fullbleed-mobile.jpg"
            alt="img"
            class="w-100 mobile_only "
          />
        </div>
        <div class="content-box">
          <h4>D:CODE IS A LOYALTY THING</h4>
          <p>
            BE PART OF D:CODE - DIESEL'S LOYALTY PROGRAM. GET ACCESS TO THE
            EXCLUSIVE WORLD OF OUR GLOBAL COMMUNITY. <br />
            D:CODE IT AND BE REWARDED.
          </p>
        </div>
      </section>

      <section class="benefits">
        <div class="text-columns">
          <h3 class="module-head-big">D:BENEFITS</h3>
        </div>
        <div class="text-columns">
          <div class="text-column text-center">
            <h2 class="module-head-small">
              <img src="~/assets/img/gift_black.png" /><br />
              EXCLUSIVE GIFTS
            </h2>
          </div>
          <div class="text-column text-center">
            <h2 class="module-head-small">
              <img src="~/assets/img/events_black.png" /><br />
              SPECIAL EVENT INVITES
            </h2>
          </div>
          <div class="text-column text-center">
            <h2 class="module-head-small">
              <img src="~/assets/img/collection_black.png" /><br />
              EARLY ACCESS TO COLLECTIONS
            </h2>
          </div>
          <div class="text-column text-center">
            <h2 class="module-head-small">
              <img src="~/assets/img/sale_black.png" /><br />
              SALE PREVIEWS
            </h2>
          </div>
        </div>
        <div class="text-columns">
          <a class=" transparent-btn" href="#" role="button">JOIN D:CODE NOW</a>
        </div>
      </section>

      <section class="slider-section">
        <div class="slide-item">
          <VueSlickCarousel ref="slick" v-bind="settings2">
            <div class="item">
              <img
                src="~/assets/img/diesel-dcode-slider2.jpg"
                alt="img"
                class="w-100 "
              />
            </div>
            <div class="item">
              <img
                src="~/assets/img/diesel-dcode-slider2.jpg"
                alt="img"
                class="w-100 "
              />
            </div>
            <div class="item">
              <img
                src="~/assets/img/diesel-dcode-slider2.jpg"
                alt="img"
                class="w-100 "
              />
            </div>
            <div class="item">
              <img
                src="~/assets/img/diesel-dcode-slider2.jpg"
                alt="img"
                class="w-100 "
              />
            </div>
            <div class="item">
              <img
                src="~/assets/img/diesel-dcode-slider2.jpg"
                alt="img"
                class="w-100 "
              />
            </div>
          </VueSlickCarousel>
        </div>
      </section>
      <div class="text-content">
        <div class="text-columns">
          <div class="text-column" style="text-align: center">
            <p class="module-text">
              The benefits are available on Diesel.com or in the stores in
              Austria, Belgium, Canada, China, Denmark, Finland, France,
              Germany, Greece, Hong Kong, Ireland, Italy, Monaco, Netherlands,
              Norway, Portugal, Spain, Switzerland, United Kingdom, United
              States. Department stores are excluded from the D:CODE Program.
            </p>
            <p class="module-text">
              For further information consult our
              <a
                class="link-underline"
                href="https://global.diesel.com/help-show?content=privacypolicy"
                >Privacy Policy</a
              >
              and our
              <u
                ><a
                  href="https://video.diesel.com/Content/Regolamento_ DCode_CRM_EN.pdf"
                  >regulations</a
                ></u
              >.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueSlickCarousel from "vue-slick-carousel";

export default {
  components: { VueSlickCarousel },
  data() {
    return {
      settings2: {
        // focusOnSelect: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        centerMode: true,
        centerPadding: "200px",
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1,
              autoplay: true,
              slidesToScroll: 1,
              centerMode: true,
              centerPadding: "200px"
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              autoplay: true,
              slidesToScroll: 1,
              centerMode: true,
              centerPadding: "50px"
            }
          }
        ]
      }
    };
  }
};
</script>

<style scoped>
@import url("@/assets/css/pages-css/cms.css");
</style>
