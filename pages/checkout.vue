<template>
  <div>
    <client-only>
      <!-- vue loader -->
      <div class="page-loader" v-if="$store.state.pageLoader">
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>

      <div class="banner">
        <div class="wrap" style="display: none">
          <NuxtLink class="logo logo--left" to="/">
            <img
              alt="Steve Madden"
              class="logo__image logo__image--medium"
              src="@/assets/img/logo.svg"
            />
          </NuxtLink>
        </div>
      </div>
      <aside role="complementary">
        <button
          class="order-summary-toggle order-summary-toggle--show shown-if-js"
          @click="showcart"
        >
          <span class="wrap">
            <span class="order-summary-toggle__inner">
              <span class="order-summary-toggle__icon-wrapper">
                <font-awesome-icon icon="shopping-cart" class="icon-svg" />
              </span>
              <span
                class="
                  order-summary-toggle__text order-summary-toggle__text--show
                "
                v-if="showSummary == false"
              >
                <span>Show order summary</span>
                <font-awesome-icon icon="angle-down" class="icon-svg" />
              </span>
              <span
                class="
                  order-summary-toggle__text order-summary-toggle__text--hide
                "
                v-if="showSummary"
              >
                <span>Hide order summary</span>
                <font-awesome-icon icon="angle-up" class="icon-svg" />
              </span>
              <span class="order-summary-toggle__total-recap total-recap">
                <span class="total-recap__final-price">
                  <span class="price_icon">₹</span
                  ><span class="price">{{
                    $store.state.cartAjax.cart_total | numberWithCommas
                  }}</span>
                </span>
              </span>
            </span>
          </span>
        </button>
      </aside>

      <div>
        <div class="content">
          <div class="shipping-top">
            <div class="wrap">
              <div class="main">
                <!-- main__header -->
                <div class="checkout_page_head">
                  <div class="checkout_logo">
                    <a href="/" class="logo logo-left">
                      <img
                        src="@/assets/img/logo.svg"
                        alt="logo"
                        class="logo__image logo__image-medium"
                      />
                    </a>
                  </div>
                  <div class="checkout_link">
                    <nav>
                      <ul class="breadcrumb-box">
                        <li
                          class="breadcrumb__item breadcrumb__item--completed"
                        >
                          <NuxtLink to="/cart" class="breadcrumb__link"
                            >Cart</NuxtLink
                          >
                          <img
                            src="@/assets/img/slick-arrow-right.png"
                            alt="arrow"
                            class="arrow-img"
                          />
                        </li>
                        <li
                          class="breadcrumb__item breadcrumb__item--current"
                          :class="[
                            $route.path == '/checkout' && !showPaymentMethods
                              ? 'active-stepper'
                              : '',
                          ]"
                        >
                          <NuxtLink to="/checkout" class="breadcrumb__link"
                            >Address</NuxtLink
                          >
                          <img
                            src="@/assets/img/slick-arrow-right.png"
                            alt="arrow"
                            class="arrow-img"
                          />
                        </li>
                        <li class="breadcrumb__item breadcrumb__item--blank">
                          <a
                            :class="[
                              showPaymentMethods ? 'active-stepper' : '',
                            ]"
                            class="breadcrumb__link"
                            >Payment</a
                          >
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div class="main__header"></div>
                <!-- main__content -->
                <div
                  class="main__content"
                  v-if="
                    addNewAddress || $store.state.cartAjax.address.length == 0
                  "
                >
                  <template
                    v-if="
                      !showPaymentMethods && !$store.state.cartAjax.showLogIn
                    "
                  >
                    <div class="step__sections">
                      <div class="section section--contact-information">
                        <div class="section__content">
                          <div class="fieldset">
                            <div style="clear: both"></div>
                          </div>
                        </div>
                      </div>

                      <div class="section section--shipping-address">
                        <div class="section__header">
                          <h2
                            class="section__title con-info"
                            id="section-delivery-title"
                          >
                            Shipping address
                          </h2>
                        </div>
                        <div class="section__content floating-labels">
                          <div class="fieldset">
                            <div class="address-fields">
                              <div
                                class="field field--required field--half"
                                data-address-field="first_name"
                              >
                                <div class="field__input-wrapper">
                                  <input
                                    placeholder="First name"
                                    autocomplete="off"
                                    class="field__input"
                                    type="text"
                                    v-model="user.firstName"
                                  />
                                  <!-- an error display tags -->
                                  <span
                                    v-if="validation.hasError('user.firstName')"
                                  >
                                    <p class="input-error">
                                      {{
                                        validation.firstError("user.firstName")
                                      }}
                                    </p>
                                  </span>
                                </div>
                              </div>
                              <div
                                class="field field--required field--half"
                                data-address-field="first_name"
                              >
                                <div class="field__input-wrapper">
                                  <input
                                    placeholder="Last name"
                                    autocorrect="off"
                                    autocomplete="off"
                                    class="field__input"
                                    type="text"
                                    v-model="user.lastName"
                                  />
                                  <!-- an error display tags -->
                                  <span
                                    v-if="validation.hasError('user.lastName')"
                                  >
                                    <p class="input-error">
                                      {{
                                        validation.firstError("user.lastName")
                                      }}
                                    </p>
                                  </span>
                                </div>
                              </div>
                              <div
                                class="field field--required"
                                data-address-field="first_name"
                              >
                                <div class="field__input-wrapper">
                                  <input
                                    placeholder="Address"
                                    autocorrect="off"
                                    autocomplete="off"
                                    class="field__input"
                                    type="text"
                                    v-model="user.address"
                                  />
                                  <!-- an error display tags -->
                                  <span
                                    v-if="validation.hasError('user.address')"
                                  >
                                    <p class="input-error">
                                      {{
                                        validation.firstError("user.address")
                                      }}
                                    </p>
                                  </span>
                                </div>
                                <p
                                  class="pobox plaese-note-para input-success"
                                  id="checkoutAddressError"
                                >
                                  Please note we do not ship to PO boxes.
                                </p>
                              </div>
                              <!-- <div
                                class="field field--required"
                                data-address-field="first_name"
                              >
                                <div class="field__input-wrapper">
                                  <input
                                    placeholder="Apartment, suite, etc. (optional)"
                                    autocomplete="off"
                                    class="field__input"
                                    type="text"
                                    v-model="user.address2"
                                  />
                                </div>
                              </div> -->

                              <div class="field field--required field--third">
                                <div class="field__input-wrapper">
                                  <label
                                    class="w-100"
                                    for="checkout_shipping_address_zip"
                                    >ZIP code
                                    <input
                                      placeholder=""
                                      autocomplete="off"
                                      v-model="user.pinCode"
                                      class="
                                        field__input field__input--zip
                                        shipping-label-pb-input-st
                                      "
                                    />
                                  </label>

                                  <!-- an error display tags -->
                                  <span
                                    v-if="validation.hasError('user.pinCode')"
                                  >
                                    <p class="input-error">
                                      {{
                                        validation.firstError("user.pinCode")
                                      }}
                                    </p>
                                  </span>

                                  <!-- error or success message -->
                                  <template>
                                    <div v-if="pin_code_error !== ''">
                                      <p class="input-error">
                                        {{ pin_code_error }}
                                      </p>
                                    </div>
                                    <div v-else>
                                      <p class="input-success">
                                        {{ pin_code_success }}
                                      </p>
                                    </div>
                                  </template>
                                </div>
                              </div>
                              <!-- <div
                                class="field field--required field--third field--show-floating-label"
                              >
                                <label
                                  class=""
                                  for="checkout_shipping_address_zip"
                                  >Country/Region
                                  <input
                                    placeholder=""
                                    autocomplete="off"
                                    disabled
                                    class="field__input field__input--zip shipping-label-pb-input-st"
                                    :value="user.country"
                                  />
                                </label>
                              </div> -->

                              <div
                                class="
                                  field
                                  field--required
                                  field--show-floating-label
                                  field--third
                                "
                              >
                                <label
                                  class="w-100"
                                  for="checkout_shipping_address_zip"
                                  >State
                                  <input
                                    placeholder=""
                                    :value="user.state"
                                    autocomplete="off"
                                    disabled
                                    class="
                                      field__input field__input--zip
                                      shipping-label-pb-input-st
                                    "
                                  />
                                </label>
                                <!-- an error display tags -->
                                <span v-if="validation.hasError('user.state')">
                                  <p class="input-error">
                                    {{ validation.firstError("user.state") }}
                                  </p>
                                </span>
                              </div>
                              <div
                                class="
                                  field
                                  field--required
                                  field--show-floating-label
                                  field--third
                                "
                              >
                                <label
                                  class="w-100"
                                  for="checkout_shipping_address_zip"
                                  >City
                                  <input
                                    placeholder="City"
                                    autocorrect="off"
                                    autocomplete="off"
                                    v-model="user.city"
                                    class="
                                      field__input
                                      shipping-label-pb-input-st
                                    "
                                    type="text"
                                  />
                                </label>
                                <!-- an error display tags -->
                                <span v-if="validation.hasError('user.city')">
                                  <p class="input-error">
                                    {{ validation.firstError("user.city") }}
                                  </p>
                                </span>
                              </div>

                              <div
                                class="
                                  field
                                  field--required
                                  field--show-floating-label
                                "
                              >
                                <div
                                  class="
                                    field__input-wrapper
                                    field__input-wrapper--icon-right
                                  "
                                >
                                  <!-- <label
                                  class="field__label field__label--visible"
                                  for="checkout_shipping_address_phone"
                                  >Phoneqqq</label
                                > -->
                                  <input
                                    placeholder="Phone"
                                    autocomplete="off"
                                    class="
                                      field__input field__input--numeric
                                      shipping-label-pb-input-st
                                    "
                                    type="tel"
                                    v-model="user.mobileNo"
                                  />
                                  <!-- an error display tags -->
                                  <span
                                    v-if="validation.hasError('user.mobileNo')"
                                  >
                                    <p class="input-error">
                                      {{
                                        validation.firstError("user.mobileNo")
                                      }}
                                    </p>
                                  </span>
                                  <div
                                    id="phone_tooltip"
                                    role="tooltip"
                                    class="field__icon has-tooltip"
                                  >
                                    <span
                                      id="tooltip-for-phone"
                                      class="tooltip"
                                    >
                                      In case we need to contact you about your
                                      order
                                    </span>
                                    <div class="field__icon-svg">
                                      <font-awesome-icon
                                        icon="question-circle"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div
                                class="
                                  field
                                  field--required
                                  field--show-floating-label
                                "
                              >
                                <div
                                  class="field__input-wrapper shipping-user-pd"
                                >
                                  <input
                                    placeholder="christine@gmail.com"
                                    autocapitalize="off"
                                    autocomplete="off"
                                    class="field__input"
                                    type="email"
                                    v-model="user.email"
                                  />
                                  <!-- an error display tags -->
                                  <span
                                    v-if="validation.hasError('user.email')"
                                  >
                                    <p class="input-error">
                                      {{ validation.firstError("user.email") }}
                                    </p>
                                  </span>
                                </div>
                              </div>

                              <div
                                class="
                                  field
                                  field--required
                                  field--show-floating-label
                                "
                              >
                                <div
                                  class="
                                    field__input-wrapper
                                    field__input-wrapper--icon-right
                                  "
                                >
                                  <label
                                    class="
                                      field__label field__label--visible
                                      shipping-adress-label
                                    "
                                    for="checkout_shipping_address_phone"
                                    >Address type</label
                                  >

                                  <div class="adress-option-div">
                                    <div class="input-box-1">
                                      <input
                                        class="
                                          field__input field__input--numeric
                                          input-both
                                        "
                                        type="radio"
                                        autocomplete="off"
                                        value="home"
                                        v-model="user.address_type"
                                        id="home-radio"
                                      />
                                      <label for="home-radio">Home</label>
                                    </div>

                                    <div class="input-box-1">
                                      <input
                                        class="
                                          field__input field__input--numeric
                                          input-both
                                        "
                                        type="radio"
                                        autocomplete="off"
                                        value="office"
                                        v-model="user.address_type"
                                        id="office-radio"
                                      />
                                      <label for="office-radio">Office</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style="clear: both"></div>
                      <div class="step__footer">
                        <button
                          name="button"
                          type="submit"
                          id="continue_button"
                          class="step__footer__continue-btn btn"
                          aria-busy="false"
                        >
                          <span
                            class="btn__content"
                            data-continue-button-content="true"
                            @click="submitDetail()"
                            >Continue to shipping</span
                          >
                        </button>
                        <a
                          style="cursor: pointer"
                          @click.prevent="() => (addNewAddress = false)"
                        >
                          <span class="step__footer__previous-link-content"
                            ><font-awesome-icon
                              icon="angle-left"
                              class="icon-svg"
                            />
                            Back
                          </span>
                        </a>
                      </div>
                      <!-- end -->

                      <div style="clear: both"></div>
                    </div>
                  </template>
                  <template v-if="$store.state.cartAjax.showLogIn">
                    <Login class="regBanner_hide" />
                  </template>
                </div>
                <!-- add new add address -->
                <div
                  class="ship-adress"
                  v-if="
                    !addNewAddress &&
                    $store.state.cartAjax.address.length > 0 &&
                    !showPaymentMethods
                  "
                >
                  <h2>Shipping Address</h2>
                  <div
                    class="ship-adress-area"
                    v-for="(item, index) in $store.state.cartAjax.address.slice(
                      0,
                      this.showMoreAddress
                    )"
                    :key="index"
                    :class="[
                      selectedAddressiId == item.id ? '' : 'active-address',
                    ]"
                  >
                    <div>
                      <div>
                        <p>{{ `${item.full_name}, ${item.phone}` }}</p>
                        <p>
                          {{
                            `${item.street_address}, ${item.state}, ${item.city},  ${item.pin_code}`
                          }}
                        </p>
                        <p>{{ `Address Type: ${item.address_type}` }}</p>
                        <button
                          v-if="selectedAddressiId != item.id"
                          @click="() => (selectedAddressiId = item.id)"
                        >
                          Ship here
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    class="ship-add-new-add"
                    v-if="
                      $store.state.cartAjax.address.length > 3 &&
                      showMoreAddress != $store.state.cartAjax.address.length
                    "
                  >
                    <a
                      @click.prevent="
                        () =>
                          (showMoreAddress =
                            $store.state.cartAjax.address.length)
                      "
                    >
                      Show more
                    </a>
                  </div>
                  <div
                    class="ship-add-new-add"
                    v-if="
                      $store.state.cartAjax.address.length != 3 &&
                      showMoreAddress == $store.state.cartAjax.address.length
                    "
                  >
                    <a @click.prevent="() => (showMoreAddress = 3)"> Hide </a>
                  </div>
                  <div
                    class="ship-add-new-add"
                    @click="() => (addNewAddress = true)"
                  >
                    <a>+ Add new address</a>
                  </div>
                  <div>
                    <button @click="assignAddress()">Next</button>
                  </div>
                </div>
                <!-- end add new address -->

                <!-- add payment method -->
                <div class="shipping-payment-method" v-if="showPaymentMethods">
                  <h2>Payment Method</h2>
                  <div class="shipping-method-inner">
                    <a
                      @click.prevent="switchPayment('razorpay')"
                      class="paying-div"
                      :class="[
                        selectedPaymentMethods === 'razorpay'
                          ? ''
                          : 'paying-div-disable',
                      ]"
                    >
                      <img src="@/assets/img/prepaid.png" />
                      <span>Pay Online With Razorpay</span></a
                    >
                    <button
                      v-if="selectedPaymentMethods === 'razorpay'"
                      @click="placeOrder('razorpay')"
                    >
                      Continue checkout
                    </button>
                  </div>

                  <div class="shipping-method-inner">
                    <a
                      @click.prevent="switchPayment('cod')"
                      class="paying-div"
                      :class="[
                        selectedPaymentMethods === 'cod'
                          ? ''
                          : 'paying-div-disable',
                      ]"
                    >
                      <img src="@/assets/img/COD.png" />
                      <span>Cash On Delivery</span>
                    </a>
                    <button
                      @click="placeOrder('cod')"
                      v-if="selectedPaymentMethods === 'cod'"
                    >
                      Place order
                    </button>
                  </div>
                  <div class="shipping-back-link" style="cursor: pointer">
                    <a
                      @click="() => (showPaymentMethods = false)"
                      class="back-link"
                      >Back</a
                    >
                  </div>
                </div>
                <!-- end add payement method -->
                <!-- <div class="main__footer">
                  <p class="copyright-text">All rights reserved Steve Madden</p>
                </div> -->
              </div>
              <div class="sidebar" v-if="showSummary">
                <div class="sidebar__content">
                  <div class="order-summary">
                    <div class="order-summary__sections">
                      <div
                        class="
                          order-summary__section
                          order-summary__section--product-list
                        "
                      >
                        <div
                          class="order-summary__section__content"
                          v-if="$store.state.cartAjax.cart_product.length != 0"
                        >
                          <table
                            class="product-table"
                            v-for="(item, index) in $store.state.cartAjax
                              .cart_product"
                            :key="index"
                          >
                            <tbody>
                              <tr class="product">
                                <td class="product__image">
                                  <div class="product-thumbnail">
                                    <div class="product-thumbnail__wrapper">
                                      <img
                                        alt="BSEDUCE MULTI - MULTI / ONESZ / 183"
                                        class="product-thumbnail__image"
                                        :src="item.image"
                                      />
                                    </div>
                                    <span
                                      class="product-thumbnail__quantity"
                                      aria-hidden="true"
                                      >{{ item.qty }}</span
                                    >
                                  </div>
                                </td>
                                <th class="product__description" scope="row">
                                  <span
                                    class="
                                      product__description__name
                                      order-summary__emphasis
                                    "
                                    >{{ item.name }}
                                  </span>
                                  <span
                                    class="
                                      product__description__variant
                                      order-summary__small-text
                                    "
                                    v-if="
                                      JSON.parse(item.size).color &&
                                      JSON.parse(item.size).size
                                    "
                                    >{{ JSON.parse(item.size).color }} /
                                    {{ JSON.parse(item.size).size }}</span
                                  >
                                  
                                </th>
                                <td class="product__quantity visually-hidden">
                                  2
                                </td>
                                <td class="product__price small_price">
                                  <span class="order-summary__emphasis"> </span>
                                  <span class="price price_icon">₹</span
                                  ><span class="price">{{
                                    item.selling_price | numberWithCommas
                                  }}</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div
                            class="order-summary__scroll-indicator"
                            aria-hidden="true"
                            tabindex="-1"
                          >
                            Scroll for more items
                            <font-awesome-icon
                              icon="arrow-down"
                              class="icon-svg"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        class="
                          order-summary__section
                          order-summary__section--discount
                        "
                      >
                        <div class="fieldset">
                          <div class="field">
                            <div
                              class="field__input-btn-wrapper"
                              v-if="
                                $store.state.cartAjax.discount_code == '' ||
                                $store.state.cartAjax.discount_code == null
                              "
                            >
                              <div class="field__input-wrapper">
                                <input
                                  placeholder="Discount code"
                                  class="field__input dis-code"
                                  id="checkout_reduction_code "
                                  v-model="applied_coupon"
                                  autocomplete="off"
                                  ref="applied_coupon"
                                />
                              </div>
                              <button
                                name="button"
                                class="field__input-btn"
                                @click="addRemoveCoupon('add')"
                              >
                                <span
                                  class="btn__content visually-hidden-on-mobile"
                                  aria-hidden="true"
                                >
                                  Apply
                                </span>
                              </button>
                            </div>
                            <div class="field__input-btn-wrapper" v-else>
                              <div class="field__input-wrapper">
                                <input
                                  placeholder="Discount code"
                                  class="field__input dis-code"
                                  id="checkout_reduction_code "
                                  v-model="$store.state.cartAjax.discount_code"
                                  autocomplete="off"
                                  ref="applied_coupon"
                                />
                              </div>
                              <button
                                name="button"
                                class="field__input-btn"
                                @click="addRemoveCoupon('remove')"
                              >
                                <span
                                  class="btn__content visually-hidden-on-mobile"
                                  aria-hidden="true"
                                >
                                  Remove code
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        class="
                          order-summary__section
                          order-summary__section--total-lines
                        "
                      >
                        <table class="total-line-table">
                          <tbody class="total-line-table__tbody">
                            <tr class="total-line total-line--subtotal">
                              <th class="total-line__name" scope="row">
                                Subtotal
                              </th>
                              <td class="total-line__price">
                                <span
                                  class="order-summary__emphasis small_price"
                                >
                                  <span class="price price_icon">₹</span
                                  ><span class="price">{{
                                    $store.state.cartAjax.cart_total
                                      | numberWithCommas
                                  }}</span>
                                </span>
                              </td>
                            </tr>
                            <tr
                              class="total-line total-line--shipping"
                              v-if="
                                $store.state.cartAjax.shipping_charge != '' &&
                                $store.state.cartAjax.shipping_charge != null
                              "
                            >
                              <th class="total-line__name" scope="row">
                                <span> Shipping </span>
                              </th>
                              <td class="total-line__price">
                                <span class="order-summary__small-text">
                                  <span class="price price_icon">₹</span
                                  ><span class="price">{{
                                    $store.state.cartAjax.shipping_charge
                                      | numberWithCommas
                                  }}</span>
                                </span>
                              </td>
                            </tr>
                            <tr
                              class="total-line total-line--shipping"
                              v-if="
                                $store.state.cartAjax.cod_charge != '' &&
                                $store.state.cartAjax.cod_charge != null
                              "
                            >
                              <th class="total-line__name" scope="row">
                                <span> COD </span>
                              </th>
                              <td class="total-line__price">
                                <span class="order-summary__small-text">
                                  <span class="price price_icon">₹</span
                                  ><span class="price">
                                    {{
                                      $store.state.cartAjax.cod_charge
                                        | numberWithCommas
                                    }}</span
                                  >
                                </span>
                              </td>
                            </tr>
                            <tr
                              class="total-line total-line--shipping"
                              v-if="
                                $store.state.cartAjax.discount_amount != '' &&
                                $store.state.cartAjax.discount_amount != null
                              "
                            >
                              <th class="total-line__name" scope="row">
                                <span> Discount </span>
                              </th>
                              <td class="total-line__price">
                                <span class="order-summary__small-text">
                                  <span class="price price_icon">₹</span
                                  ><span class="price">{{
                                    $store.state.cartAjax.discount_amount
                                      | numberWithCommas
                                  }}</span>
                                </span>
                              </td>
                            </tr>
                            <tr
                              class="total-line total-line--shipping"
                              v-if="
                                $store.state.cartAjax.discount_amount != '' &&
                                $store.state.cartAjax.discount_amount != null
                              "
                            >
                              <th class="total-line__name" scope="row">
                                <span> Discount </span>
                              </th>
                              <td class="total-line__price">
                                <span class="order-summary__small-text">
                                  <span class="price price_icon">₹</span
                                  ><span class="price">{{
                                    $store.state.cartAjax.discount_amount
                                  }}</span>
                                </span>
                              </td>
                            </tr>
                          </tbody>
                          <tfoot class="total-line-table__footer">
                            <tr class="total-line">
                              <th
                                class="total-line__name payment-due-label"
                                scope="row"
                              >
                                <span class="payment-due-label__total"
                                  >Total</span
                                >
                              </th>
                              <td class="total-line__price payment-due">
                                <span
                                  class="payment-due__price"
                                  data-checkout-payment-due-target="22995"
                                >
                                  <span class="price price_icon">₹</span
                                  ><span class="price">{{
                                    $store.state.cartAjax.cart_total
                                      | numberWithCommas
                                  }}</span>
                                </span>
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>
<script>
import { Validator } from "simple-vue-validator";
import Login from "./Login.vue";
export default {
  components: { Login },
  layout: "EmptyLayout",
  data() {
    return {
      showSummary: false,
      showMoreAddress: 3,
      pin_code_error: "",
      user: {
        state: "",
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        country: "India",
        pinCode: "",
        mobileNo: "",
        email: "",
        city: "",
        address_type: "home",
      },
      pin_code_success: "",
      cod_msg: "",
      addNewAddress: false,
      showPaymentMethods: false,
      selectedAddressiId: this.$store.state.cartAjax.address_id,
      selectedPaymentMethods: "",
      applied_coupon: "",

      razorpay_form: {
        key: "",
        id: "",
        amount: "",
        name: "",
        description: "",
        image: "",
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        notes: {
          address: "",
          id: "",
        },
        theme: {
          color: "",
        },
      },
    };
  },

  // form validatiors
  validators: {
    "user.email": function (value) {
      return Validator.value(value).required().email();
    },
    "user.firstName": function (value) {
      return Validator.value(value).required();
    },
    "user.lastName": function (value) {
      return Validator.value(value).required();
    },
    "user.address": function (value) {
      return Validator.value(value).required();
    },
    "user.pinCode": function (value) {
      return Validator.value(value)
        .required()
        .integer()
        .minLength(6)
        .maxLength(6);
    },
    "user.mobileNo": function (value) {
      return Validator.value(value)
        .required()
        .integer()
        .minLength(10)
        .maxLength(10);
    },
    "user.city": function (value) {
      return Validator.value(value).required();
    },
  },

  methods: {
    showcart() {
      this.showSummary = !this.showSummary;
    },

    // get detil via pin code
    fetchUserDetail: function () {
      var pin_code = /^([0-9]{6,})+$/;
      if (
        this.user.pinCode != null &&
        this.user.pinCode.match(pin_code) &&
        this.user.pinCode != "" &&
        this.user.pinCode.length &&
        this.user.pinCode != undefined
      ) {
        var form = {};
        form.service = "pincheck";
        form.store = this.$store.state.cartAjax.store;
        form.pincode = this.user.pinCode;
        this.$store
          .dispatch("pimAjax", {
            method: "post",
            url: `/pimresponse.php`,
            params: form,
          })
          .then((response) => {
            if (response.result == "") {
              this.pin_code_error = "Sorry this pincode is not serviceable.";
              this.pin_code_success = "";
            } else {
              if (response.result.cod === "N") {
                this.cod_msg =
                  "Due to regulatory & operational restrictions, we are unable to offer Cash on delivery in the selected Pin code. <span class='green'>Free delivery on PREPAID orders.</span>";
              } else {
                this.cod_msg = "";
              }

              this.user.city = response.result.city;
              this.user.state = response.result.state;
              this.pin_code_success = response.response.success_message_sort;
              this.pin_code_error = "";
            }
          })
          .catch((error) => {
            this.$globalError(
              `error from the shipping page (fetchUserDetail) >>>> ${error}`
            );
            console.log("error from the shipping page >>> ", error);
            if (error.message === "Network Error") {
              this.$toast.error(
                "Oops there seems to be some Network issue, please try again."
              );
            }
            this.pin_code_success = "";
          });
      } else {
        this.pin_code_error = "Please enter valid Pin code";
        this.pin_code_success = "";
      }
    },

    // submit the user address
    async submitDetail() {
      try {
        var validation = await this.$validate();
        let {
          state,
          firstName,
          lastName,
          address,
          pinCode,
          mobileNo,
          city,
          email,
          address2,
          address_type,
        } = this.user;
        if (
          state &&
          firstName &&
          lastName &&
          address &&
          pinCode &&
          mobileNo &&
          city &&
          email &&
          validation
        ) {
          var form = {};
          form.customer_id = this.$store.state.cartAjax.customer_id;
          form.customer_session = this.$store.state.cartAjax.customer_session;
          form.cart_id = this.$store.state.cartAjax.cart_id;
          form.cart_session = this.$store.state.cartAjax.cart_session;
          form.full_name = `${firstName} ${lastName}`;
          form.street_address = `${address} ${address2}`;
          form.pin_code = pinCode;
          form.city = city;
          form.state_name = state;
          form.phone = mobileNo;
          form.email = email;
          form.address_type = address_type;

          let response = await this.$store.dispatch("cartAjax/actCartAjax", {
            method: "post",
            url: `/customer/add-address`,
            token: this.$store.state.cartAjax.customer_token,
            params: form,
          });
          if (response.success) {
            this.$store.commit("cartAjax/updateAddress", {
              payload: response,
              vm: this,
            });
            this.showPaymentMethods = true;
            this.$gtm.push({
              event: "checkout",
              action: "Checkout",
              ecommerce: {
                checkout: {
                  actionField: { step: 4, option: "Address selected" },
                  products: this.$store.state.cartAjax.gtm_product,
                },
              },
            });
          } else {
             this.$toast.error(
               response.message
              );
            throw response.message;
          }
        } else {
          throw "please fill the form data first";
        }
      } catch (error) {
        this.$globalError(
          `error form the shipping page (submitDetail) >>>> ${error}`
        );
        console.log("error form the shipping page >>> ", error);
      }
    },
    // assign address
    async assignAddress() {
      try {
        var form = {};
        form.customer_id = this.$store.state.cartAjax.customer_id;
        form.customer_session = this.$store.state.cartAjax.customer_session;
        form.cart_id = this.$store.state.cartAjax.cart_id;
        form.address_id = this.selectedAddressiId;

        let response = await this.$store.dispatch("cartAjax/actCartAjax", {
          method: "post",
          url: `/customer/assign-address`,
          token: this.$store.state.cartAjax.cart_token,
          params: form,
        });

        if (response.success === true) {
          this.$store.commit("cartAjax/updateCartDetail", {
            error: null,
            data: response,
          });
          this.showPaymentMethods = true;
          this.$gtm.push({
            event: "checkout",
            action: "Checkout",
            ecommerce: {
              checkout: {
                actionField: {
                  step: 4,
                  option: "Address selected",
                },
                products: this.$store.state.cartAjax.gtm_product,
              },
            },
          });
        } else {
          this.$toast.error(response.message);
          throw response.message;
        }
      } catch (error) {
        this.$globalError(`error from the assign address >>>> ${error}`);
        console.log("error from the assign address >>>", error);
      }
    },

    // switch between the payments
    async switchPayment(value) {
      try {
        if (value != "") {
          var form = {};
          form.cart_id = this.$store.state.cartAjax.cart_id;
          form.cart_session = this.$store.state.cartAjax.cart_session;
          form.customer_id = this.$store.state.cartAjax.customer_id;
          form.customer_session = this.$store.state.cartAjax.customer_session;
          form.payment_method = value;
          let response = await this.$store.dispatch("cartAjax/actCartAjax", {
            method: "post",
            url: `/cart/switch-payment-method`,
            token: this.$store.state.cartAjax.cart_token,
            params: form,
          });

          if (response.success === true) {
            this.$store.commit("cartAjax/updatePaymentMethod", {
              payload: response,
              vm: this,
            });
            this.selectedPaymentMethods = value;
            this.$gtm.push({
              event: "checkout",
              action: "Checkout",
              ecommerce: {
                checkout: {
                  actionField: { step: 5, option: value },
                  products: this.$store.state.cartAjax.gtm_product,
                },
              },
            });
          }
        } else {
          this.$toast.error("please select the payment method");
          throw "payment method not selected";
        }
      } catch (error) {
        this.$globalError(`error from the switch payment foo >>>> ${error}`);
        console.log("error from the switch payment foo >>>", error);
      }
    },

    // place order
    async placeOrder(value) {
      try {
        if (value == "") return;
        $cookies.set(
          window.location.hostname.substring(10, 4) + "_thank",
          "true"
        );
        var form = {};
        form.cart_id = this.$store.state.cartAjax.cart_id;
        form.cart_session = this.$store.state.cartAjax.cart_session;
        form.customer_id = this.$store.state.cartAjax.customer_id;
        form.customer_session = this.$store.state.cartAjax.customer_session;
        form.payment_method = this.selectedPaymentMethods;

        let response = await this.$store.dispatch("cartAjax/actCartAjax", {
          method: "post",
          token: this.$store.state.cart_token,
          url: `/order/add-order`,
          params: form,
        });
        if (response.success) {
          this.$gtm.push({
            event: "checkout",
            category: "Ecommerce",
            action: "Checkout",
            label: "5",
            ecommerce: {
              checkout: {
                actionField: { step: 5, option: value },
                products: this.$store.state.cartAjax.gtm_product,
              },
            },
          });

          if (value == "cod") {
            this.$router.push("thankyou");
            return;
          }
          if (value == "razorpay") {
            this.razorpay_form.key = response.data.razor_key;
            this.razorpay_form.id = response.data.razor_order_id;
            this.razorpay_form.amount = response.data.grand_total * 100;
            this.razorpay_form.prefill.contact = response.data.maddress.phone;
            this.razorpay_form.prefill.name = response.data.maddress.full_name;
            this.razorpay_form.prefill.email = response.data.customer.email;
            this.razorpay_form.notes.id = response.data.fynd_order_id;
            setTimeout(() => this.razorpayFunction(), 100);
          }
        } else {
          this.$toast.error(response.message);
          $cookies.set(
            window.location.hostname.substring(10, 4) + "_thank",
            ""
          );
          throw response.message;
        }
      } catch (error) {
        this.$globalError(`this is from cart placeOrder >>>> ${error}`);
        if (error.message === "Network Error") {
          this.$toast.error(
            "Oops there seems to be some Network issue, please try again."
          );
        }
        console.log("error from the place order page", error);
      }
    },

    razorpayFunction() {
      const options = {
        key: this.razorpay_form.key,
        id: this.razorpay_form.id,
        amount: this.razorpay_form.amount,
        name: this.razorpay_form.name,
        description: this.razorpay_form.description,
        image: this.razorpay_form.image,
        order_id: this.razorpay_form.id,
        handler: (response) => {
          var form = {};
          form.cart_id = this.$store.state.cartAjax.cart_id;
          form.cart_session = this.$store.state.cartAjax.cart_session;
          form.customer_id = this.$store.state.cartAjax.customer_id;
          form.customer_session = this.$store.state.cartAjax.customer_session;
          form.razor_id = response.razorpay_payment_id;
          this.$store
            .dispatch("cartAjax/actCartAjax", {
              method: "post",
              url: `/order/razorpay-order`,
              token: this.$store.state.cartAjax.cart_token,
              params: form,
            })
            .then((response) => {
              if (response.success === true) {
                this.$router.push("thankyou");
              } else {
                this.$toast.error(response.message);
              }
            })
            .catch((error) => {
              this.$globalError(`this is from razorpayFunction >>>> ${error}`);
              if (error.message === "Network Error") {
                this.$toast.error(
                  "Oops there seems to be some Network issue, please try again."
                );
              }
            });
        },
        prefill: {
          name: this.razorpay_form.prefill.name,
          email: this.razorpay_form.prefill.email,
          contact: this.razorpay_form.prefill.contact,
        },
        notes: {
          order_id: this.razorpay_form.notes.id,
        },
        theme: {
          color: this.razorpay_form.theme.color,
        },
      };
      const rzp = new Razorpay(options);
      rzp.open();
    },

    // add coupon to the cart
    async addRemoveCoupon(behave) {
      try {
        var url;
        if (behave == "add" && this.applied_coupon == "") {
          this.$refs.applied_coupon.focus();
          return;
        }

        if (behave == "remove") {
          url = `/cart/remove-coupon`;
        }
        var form = {};
        form.cart_id = this.$store.state.cartAjax.cart_id;
        form.cart_session = this.$store.state.cartAjax.cart_session;
        if (behave == "add") {
          url = `/cart/assign-coupon`;
          form.coupon = this.applied_coupon;
        }
        if (
          this.$store.state.cartAjax.customer_id != null &&
          this.$store.state.cartAjax.customer_id != ""
        ) {
          form.customer_id = this.$store.state.cartAjax.customer_id;
          form.customer_session = this.$store.state.cartAjax.customer_session;
        }

        let response = await this.$store.dispatch("cartAjax/actCartAjax", {
          method: "post",
          url,
          token: this.$store.state.cartAjax.cart_token,
          params: form,
        });

        if (response.success) {
          this.$store.commit("cartAjax/updateCartDetail", {
            error: null,
            data: response,
          });
          this.$toast.open(response.message);
        } else {
          this.$toast.error(response.message);
        }
      } catch (error) {
        console.log("error form the add coupon foo >>", error);
      }
    },
  },
  mounted() {
    if (!this.$device.isMobile) {
      this.showSummary = true;
    }

    if (this.$store.state.cartAjax.cart_product.length == 0) {
      this.$router.push("/");
      return;
    }

    if (
      this.$store.state.cartAjax.customer_session == "" ||
      this.$store.state.cartAjax.customer_id == ""
    ) {
      this.$router.push("/login");
      this.$gtm.push({
        event: "checkout",
        action: "Checkout",
        ecommerce: {
          checkout: {
            actionField: { step: 1, option: "Login" },
            products: this.$store.state.cartAjax.gtm_product,
          },
        },
      });
      return;
    }

    if (
      this.$store.state.cartAjax.customer_id == "" &&
      this.$store.state.cartAjax.customer_session == ""
    ) {
      this.$store.commit("cartAjax/toggleLogin", { display: true });
    } else {
      this.$store.commit("cartAjax/toggleLogin", { display: false });
    }

    this.$gtm.push({
      event: "checkout",
      action: "Checkout",
      ecommerce: {
        checkout: {
          actionField: { step: 3, option: "shipping address" },
          products: this.$store.state.cartAjax.gtm_product,
        },
      },
    });
  },

  watch: {
    "user.pinCode": function () {
      if (this.user.pinCode >= 1000) {
        this.fetchUserDetail();
      }
    },
  },
};
</script>
<style scoped>
@import url("@/assets/css/pages-css/shipping.css");
@import url("@/assets/css/pages-css/loader.css");
</style>
