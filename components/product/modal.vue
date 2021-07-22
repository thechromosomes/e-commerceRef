<template>
  <div>
    <div class="tumi_modal">
      <div class="tumi_overleay"></div>

      <div class="tumi_model_body">
        <a title="close" @click.prevent="$parent.CloseModal" aria-label="close" class="close"
          ><img class="icon icon-x" src="@/assets/img/close.png"> </a>
        <div class="model-base-inner">
          <div class="modal-header">Size Chart</div>
          <div class="model-contents">
            <div class="customer-page">
              <iframe
                src="https://shop.dieselindia.com/Kids%20Size%20Chart.pdf"
                frameBorder="0"
                scrolling="auto"
                height="500px"
                width="100%"
                title="sizeChart"
                class="iframe_box"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.tumi_modal {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
}

.tumi_modal .tumi_overleay {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
}

.tumi_modal .tumi_model_body {
  max-width: 600px;
  margin: 50px auto;
  width: 100%;
  background: #fff;
  padding: 55px 25px 10px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.tumi_modal .close {
  display: block;
  position: absolute;
  line-height: 1;
  color: #ccc;
  width: 25px;
  height: 25px;
  top: 10px;
  right: 10px;
cursor: pointer;
  text-align: center;
  opacity: 1;
}
.tumi_modal .close img {
    width: 75%;
}
.tumi_modal .close .icon-x {
  vertical-align: top;
  font-size: 16px;
}
.tumi_modal .model-base-inner {
  width: 100%;
  font-family: "proxima-nova-regular";
}
.tumi_modal .model-base-inner .modal-header {
  padding: 0 0 6px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 15px;
  background-color: #fff;
  text-transform: none;
  font-weight: 400;
  font-size: 25px;
  letter-spacing: 0.025em;
  text-align: center;
  display: block;
}
.tumi_modal .model-base-inner .model-contents {
  width: 100%;
  overflow: auto;
  /* max-height: 450px; */
}
.tumi_modal .model-base-inner .model-contents .customer-page {
  margin: 20px 0;
  /* padding: 0 40px; */
}
.tumi_modal .model-base-inner .model-contents .customer-page p {
  font-weight: 400;
  font-size: 12px;
  color: #777;
  margin: 0 0 10px;
  line-height: 21px;
}
.tumi_modal .model-base-inner .model-contents .customer-page h3 {
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.45px;
  text-transform: uppercase;
  color: #777;
}

/* scroll design */
/* Scrollbar Styling */
.iframe_box::-webkit-scrollbar 
#scroller::-webkit-scrollbar
{
  width: 5px;
}

.iframe_box::-webkit-scrollbar-track,
#scroller::-webkit-scrollbar-track {
  background-color: transparent;
  -webkit-border-radius: 10px;
  border-radius: 10px;
}

.iframe_box::-webkit-scrollbar-thumb ,
#scroller::-webkit-slider-thumb{
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: #333333;
}





@media only screen and (max-width: 767px) {
  .tumi_modal .tumi_model_body {
    max-width: 99%;
    padding: 10px 15px;
  }
  .tumi_modal .model-base-inner .modal-heade {
    font-size: 16px;
  }
  .tumi_modal .model-base-inner .model-contents .customer-page h3 {
    font-size: 14px;
  }
}
</style>
