<template>
  <div>
    <div class="contact-page">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="content">
              <h5>CLIENT SERVICE DETAILS</h5>
              <p class="text">
                Our Client Service is available by phone Monday to Saturday, or
                you can simply send us a message using the Contact Us form.
              </p>
            </div>
          </div>
        </div>
        <div class="info">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="content">
                <h5>BY PHONE</h5>
                <p class="text">
                  You can contact the customer service by calling the toll free
                  number 0 8002606687 from 9 am to 8 pm CET (8 am to 7 pm GMT),
                  Monday to Saturday, excluding national holidays. During
                  Christmas time, Client Service will be available on Sunday the
                  20th and Saturday 26th of December, from 9am to 6pm CET
                </p>
              </div>
              <div class="content">
                <h5>BY LIVE CHAT</h5>
                <p class="text">
                  You can contact us through the live chat icon on the bottom
                  right of each page, monday to saturday from 9 am to 8 pm CET
                  (8 am to 7 pm GMT) excluding national holidays , if the live
                  chat button is not available it means all our operators are
                  currently busy, we invite you in this case to contacts us by
                  any other means be it phone, form or email.
                </p>
              </div>
              <div class="content">
                <h5>BY MESSAGE</h5>
                <p class="text">
                  Have queries for us? Send us a Message. <br />
                  We will respond to every message within 1 working day, Monday
                  to Saturday, excluding national holidays
                </p>
              </div>
            </div>
            <!-- <div class="col-lg-6 col-md-12"></div> -->
          </div>
        </div>
        <Contentasset />
      </div>
    </div>
  </div>
</template>

<script>
import Contentasset from "./cms/Contentasset";
export default {
  components: {
    Contentasset
  }
};
</script>
