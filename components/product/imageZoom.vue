<template>
  <div class="main-container-img">
    <div @click="$parent.toggleZoomImg()">
      <div class="image-show" v-for="(image, index) in images" :key="index">
        <div :id="`${index}-zoomed-images`" class="zoom-img-full">
          <img :src="image.image" />
        </div>
      </div>
    </div>
    <button class="close-button" @click="$parent.toggleZoomImg()">close</button>
  </div>
</template>
<script>
export default {
  props: ["images", "scrollToId"],
  data() {
    return {};
  },

  mounted() {
    var elmnt = document.getElementById(`${this.scrollToId}-zoomed-images`);
    if (elmnt) {
      setTimeout(() => {
        elmnt.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  }
};
</script>

<style scoped>
.main-container-img {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999999;
  text-align: center;
  overflow-y: auto;
}

.zoom-img-full img {
  width: 100% !important;
  object-fit: cover !important;
}
.image-show {
  padding: 10px;
  position: relative;
}
button.close-button {
  position: fixed;
  top: 12px;
  right: 30px;
}
@media only screen and (max-width: 767px) {
  button.close-button[data-v-12cd9fde] {
    top: 15px;
    right: 15px;
  }
}
</style>
