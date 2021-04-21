<template>
  <div>
    <section class="slide-img">
      <div class="content content-desk">
        <img
          src="~/assets/img/2-DXD-full-bleed-desk.png"
          alt="img"
          class="w-100"
        />
        <div class="content-text">
          <h4>
            'FAKE SMILES' , THE NEW CAMPAIGN THAT ACCOMPANIES THE LAUNCH <br />
            OF DIESEL X DIESEL COLLECTION.
          </h4>
          <a class="button primary-btn" href="#" role="button">DISCOVER NOW</a>
        </div>
      </div>
      <div class="content content-mobile">
        <img
          src="~/assets/img/2-DXD-full-bleed-mobile.jpg"
          alt="img"
          class="w-100"
        />
        <div class="content-text">
          <h4>
            'FAKE SMILES' , THE NEW CAMPAIGN THAT ACCOMPANIES THE LAUNCH <br />
            OF DIESEL X DIESEL COLLECTION.
          </h4>
          <a class="button primary-btn" href="#" role="button">DISCOVER NOW</a>
        </div>
      </div>
    </section>

    <div class="collections_slide">
      <div class="slide_content">
        <VueSlickCarousel ref="slick" v-bind="settings2">
          <div class="item">
            <img
              src="~/assets/img/collections_slide_HP1.jpg"
              alt="img"
              class="desktop_only w-100"
            />
            <img
              src="~/assets/img/collections_slide_MP1.jpg"
              alt="img"
              class="mobile_only w-100"
            />
            <div class="img_content">
              <h4>READY-TO-WEAR</h4>
              <h5>SUMMER 2021</h5>
              <p class="module-text">
                We've got all sorts of influences in our bold new collections,
                <br />
                featuring military styles with 90s vibes and cyber-punk prints.
              </p>
              <a class="button secondary-white-btn" href="#" role="button"
                >FOR HIM</a
              >
              <a class="button secondary-white-btn" href="#" role="button"
                >FOR HER</a
              >
            </div>
          </div>
          <div class="item">
            <img
              src="~/assets/img/collections_slide_HP2.jpg"
              alt="img"
              class="desktop_only w-100"
            />
            <img
              src="~/assets/img/collections_slide_MP2.jpg"
              alt="img"
              class="mobile_only w-100"
            />
            <div class="img_content">
              <h4>READY-TO-WEAR</h4>
              <h5>SUMMER 2021</h5>
              <p class="module-text">
                We've got all sorts of influences in our bold new collections,
                <br />
                featuring military styles with 90s vibes and cyber-punk prints.
              </p>
              <a class="button secondary-white-btn" href="#" role="button"
                >FOR HIM</a
              >
              <a class="button secondary-white-btn" href="#" role="button"
                >FOR HER</a
              >
            </div>
          </div>
          <div class="item">
            <img
              src="~/assets/img/collections_slide_HP2.jpg"
              alt="img"
              class="desktop_only w-100"
            />
            <img
              src="~/assets/img/collections_slide_MP3.jpg"
              alt="img"
              class="mobile_only w-100"
            />
            <div class="img_content">
              <h4>READY-TO-WEAR</h4>
              <h5>SUMMER 2021</h5>
              <p class="module-text">
                We've got all sorts of influences in our bold new collections,
                <br />
                featuring military styles with 90s vibes and cyber-punk prints.
              </p>
              <a class="button secondary-white-btn" href="#" role="button"
                >FOR HIM</a
              >
              <a class="button secondary-white-btn" href="#" role="button"
                >FOR HER</a
              >
            </div>
          </div>
        </VueSlickCarousel>
      </div>
    </div>

    <section class="new_in">
      <div class="container-fluid">
        <div class="content_new_in">
          <h2 class="swiper-header">NEW IN</h2>
          <div class="slide_new_in">
            <VueSlickCarousel
              ref="slick"
              v-bind="settings"
            >
              <div class="item">
                <a href="#"
                  ><img
                    src="~/assets/img/new_slide_1.jpg"
                    alt="img"
                    class="w-100"
                /></a>
                <div class="tile-body">
                  <p>Light Blue</p>
                  <a href="#"> Super skinny - Slandy</a>
                </div>
              </div>
              <div class="item">
                <a href="#"
                  ><img
                    src="~/assets/img/new_slide_2.jpg"
                    alt="img"
                    class="w-100"
                /></a>
                <div class="tile-body">
                  <p>Black</p>
                  <a href="#"> Super skinny - Slandy</a>
                </div>
              </div>
              <div class="item">
                <a href="#"
                  ><img
                    src="~/assets/img/new_slide_3.jpg"
                    alt="img"
                    class="w-100"
                /></a>
                <div class="tile-body">
                  <p>Blue</p>
                  <a href="#"> High-heel ankle boots in denim</a>
                </div>
              </div>
              <div class="item">
                <a href="#"
                  ><img
                    src="~/assets/img/new_slide_4.jpg"
                    alt="img"
                    class="w-100"
                /></a>
                <div class="tile-body">
                  <p>Light Blue</p>
                  <a href="#"> Super skinny - Slandy</a>
                </div>
              </div>
              <div class="item">
                <a href="#"
                  ><img
                    src="~/assets/img/new_slide_5.jpg"
                    alt="img"
                    class="w-100"
                /></a>
                <div class="tile-body">
                  <p>Light Blue</p>
                  <a href="#"> Super skinny - Slandy</a>
                </div>
              </div>
              <div class="item">
                <a href="#"
                  ><img
                    src="~/assets/img/new_slide_6.jpg"
                    alt="img"
                    class="w-100"
                /></a>
                <div class="tile-body">
                  <p>Light Blue</p>
                  <a href="#"> Super skinny - Slandy</a>
                </div>
              </div>
            </VueSlickCarousel>
          </div>
        </div>
      </div>
    </section>

    <section class="fullbleed">
      <div class="content-box">
        <img
          src="~/assets/img/living-hp-banner-5.jpg"
          alt="img"
          class="desktop_only w-100"
        />
        <img
          src="~/assets/img/living-hp-banner-mobile.jpg"
          alt="img"
          class="mobile_only w-100"
        />
      </div>
      <div class="text-content">
        <div class="fullbleed-center">
          <h2 class="module-head">FOR RESPONSIBLE LIVING</h2>
          <p class="module-text">
            Diesel commits to implement a responsible business that is
            respectful of people and the environment. Building upon our
            philosophy and positively disruptive outlook, our sustainability
            strategy is called Diesel For Responsible Living.
          </p>
          <a class="button secondary-white-btn" href="#">DISCOVER NOW</a>
          <a class="button secondary-white-btn" href="#">SHOP GREEN LABEL</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
export default {
  components: { VueSlickCarousel },

  data() {
    return {
      settings: {
        focusOnSelect: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        touchThreshold: 5,
        arrows: true,
        autoplay: true,
        centerMode: true,
        responsive: [
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 2,
              autoplay: true,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              autoplay: true,
              slidesToScroll: 2,
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
};
</script>