<template>
  <div class="product_details main_section">
    <div class="product-images product_images_slide mobile_only">
      <div class="item">
        <img
          src="~/assets/img/00ST1N_0AAZR_900_F.jpg"
          alt="img"
          class="w-100"
        />
      </div>
      <div class="item">
        <img
          src="~/assets/img/00ST1N_0AAZR_900_A.jpg"
          alt="img"
          class="w-100"
        />
      </div>
      <div class="item">
        <img
          src="~/assets/img/00ST1N_0AAZR_900_E.jpg"
          alt="img"
          class="w-100"
        />
      </div>
      <div class="item">
        <img
          src="~/assets/img/00ST1N_0AAZR_900_F.jpg"
          alt="img"
          class="w-100"
        />
      </div>
      <div class="item">
        <img
          src="~/assets/img/00ST1N_0AAZR_900_R.jpg"
          alt="img"
          class="w-100"
        />
      </div>
    </div>

    <div class="container-fluid">
      <div class="row desktop_only">
        <div class="col-12">
          <div class="back-to-container">
            <a href="#" class="back-to"> Back to Loungewear </a>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12 col-lg-8 col-12">
          <div class="product-images desktop_only">
            <div class="desk-img">
              <div class="image-box">
                <img
                  src="~/assets/img/00ST1N_0AAZR_900_F.jpg"
                  alt="img"
                  class="w-100"
                />
              </div>
              <div class="image-box">
                <img
                  src="~/assets/img/00ST1N_0AAZR_900_A.jpg"
                  alt="img"
                  class="w-100"
                />
              </div>
              <div class="image-box">
                <img
                  src="~/assets/img/00ST1N_0AAZR_900_E.jpg"
                  alt="img"
                  class="w-100"
                />
              </div>
              <div class="image-box">
                <img
                  src="~/assets/img/00ST1N_0AAZR_900_R.jpg"
                  alt="img"
                  class="w-100"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 col-lg-4 col-12">
          <div class="product-content">
            <h1 class="product-title">UMLB-PETER</h1>
            <h2 class="product-short-description">
              Sweatpants with Mohawk logo
            </h2>
            <ul class="product-attributes">
              <li class="variation-attribute">
                <span class="attribute-label color"> Choose COLOR: </span>
                <span class="attribute-label-value"> Black</span>
                <ul class="swatch-attribute-values color">
                  <li class="swatch-attribute-values-img">
                    <a href="#"
                      ><img
                        src="~/assets/img/00ST1N_0AAZR_5FR_F.jpg"
                        alt="img"
                        class=""
                    /></a>
                  </li>
                  <li class="swatch-attribute-values-img">
                    <a href="#"
                      ><img
                        src="~/assets/img/00ST1N_0AAZR_900_F_2.jpg"
                        alt="img"
                        class="active"
                    /></a>
                  </li>
                  <li class="swatch-attribute-values-img">
                    <a href="#"
                      ><img
                        src="~/assets/img/00ST1N_0AAZR_8AT_F.jpg"
                        alt="img"
                        class=""
                    /></a>
                  </li>
                  <li class="swatch-attribute-values-img">
                    <a href="#"
                      ><img
                        src="~/assets/img/00ST1N_0AAZR_96X_F.jpg"
                        alt="img"
                        class=""
                    /></a>
                  </li>
                  <li class="swatch-attribute-values-img">
                    <a href="#"
                      ><img
                        src="~/assets/img/00ST1N_0AAZR_129_F.jpg"
                        alt="img"
                        class=""
                    /></a>
                  </li>
                </ul>
              </li>
              <li class="variation-attribute">
                <span class="attribute-label color"> CHOOSE SIZE </span>
                <!-- <span class="attribute-label-value"> Black</span> -->
                <ul class="swatch-attribute-values color">
                  <li class="attribute-value js_attribute-value unavailable">
                    XS
                  </li>
                  <li class="attribute-value js_attribute-value">S</li>
                  <li class="attribute-value js_attribute-value unavailable">
                    M
                  </li>
                  <li class="attribute-value js_attribute-value">L</li>
                  <li class="attribute-value js_attribute-value">XL</li>
                  <li class="attribute-value js_attribute-value">XXL</li>
                </ul>
              </li>
            </ul>

            <div class="print_btn">
              <button id="btn-print" class="primary-btn full-with-btn">
                Add to cart
              </button>
            </div>

            <div class="product_info">
              <div class="content-asset">
                <div
                  class="product-additional-promo-asset"
                  :class="[pickup ? 'expand-open' : 'expand-close']"
                  @click="toggleDropDown('pickup')"
                >
                  <h3 class="product-desc-title">
                    <span class="promo-title">
                      <img
                        alt="curbside-pickup"
                        height="26"
                        src="~/assets/img/car.jpg"
                      />
                      <span>CURBSIDE PICKUP IS NOW AVAILABLE!</span>
                    </span>
                  </h3>
                  <div class="product-expand-block promo-content">
                    <span
                      >Complete your pickup in store order. Wait for the
                      confirmation email that your order is ready, drive up and
                      once at your local store call to have someone from our
                      staff bring your Diesel order straight to you.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="product-collapsible-sections">
              <div
                class="product-care-instructions"
                :class="[CareInstructions ? 'expand-open' : 'expand-close']"
                @click="toggleDropDown('CareInstructions')"
              >
                <h2>Care instructions <span class="title"></span></h2>

                <div class="care-instructions product-expand-block">
                  <div class="care-instruction">
                    <img
                      class="care-instruction-image"
                      src="~/assets/img/12.svg"
                      alt="Washing"
                      aria-label="Washing"
                      title="Washing"
                    />
                    <span class="care-instruction-text"
                      >Machine wash at 30 °C</span
                    >
                  </div>
                  <div class="care-instruction">
                    <img
                      class="care-instruction-image"
                      src="~/assets/img/17.svg"
                      alt="Washing"
                      aria-label="Washing"
                      title="Washing"
                    />
                    <span class="care-instruction-text">Do not bleach</span>
                  </div>
                  <div class="care-instruction">
                    <img
                      class="care-instruction-image"
                      src="~/assets/img/28.svg"
                      alt="Washing"
                      aria-label="Washing"
                      title="Washing"
                    />
                    <span class="care-instruction-text">Do not tumble dry</span>
                  </div>
                  <div class="care-instruction">
                    <img
                      class="care-instruction-image"
                      src="~/assets/img/31.svg"
                      alt="Washing"
                      aria-label="Washing"
                      title="Washing"
                    />
                    <span class="care-instruction-text"
                      >Iron at max 110 °C</span
                    >
                  </div>
                </div>
              </div>
              <!-- expand-open for open class -->
              <div
                class="product-care-instructions"
                :class="[size ? 'expand-open' : 'expand-close']"
                @click="toggleDropDown('size')"
              >
                <h2>SIZE & FIT <span class="title"></span></h2>
                <div class="care-instructions product-expand-block">
                  <ul class="product-information-list">
                    <li class="product-information-element">
                      Model is wearing a size S and is 177 cm / 5'9"
                    </li>
                    <li class="product-information-element">
                      <a
                        href="/on/demandware.store/Sites-DieselNonEcommerce-Site/en_TR/Product-SizeChart?cid=sizechart-dsl-bottom-women-25"
                        data-toggle="modal"
                        data-target="#sizeChartModal"
                        ><u>Size Info</u></a
                      >
                    </li>
                  </ul>
                </div>
              </div>

              <div class="product-tags">
                <h2 class="product-tag-title">
                  <span class="title">Tags</span>
                </h2>
                <div class="product-tags-wrapper">
                  <a class="product-tag" href="#"> WOMAN </a>
                  ,
                  <a class="product-tag" href="#"> APPAREL </a>
                  ,
                  <a class="product-tag" href="#"> Loungewear </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      CareInstructions: false,
      pickup: false,
      size: false,
    };
  },

  methods: {
    toggleDropDown(state) {
      this[state] = !this[state];
    },
  },
};
</script>