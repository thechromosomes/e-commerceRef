<template>
  <div>
    <client-only>
      <div class="container">
        <div class="storelocater">
          <h4>STORE LOCATOR</h4>
          <div class="store-search_box">
            <p>Find stores near this location</p>
            <div class="input-box">
              <form>
                <input
                  type="text"
                  placeholder="Start searching here"
                  autocomplete="off"
                  v-model="search"
                />
              </form>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4 col-12">
              <div class="map-cont">
                <ul>
                  <li
                    v-for="(addressList, index) in filteredList"
                    :key="index"
                    @click="toggleInfoWindow(addressList, index)"
                    style="cursor: pointer"
                  >
                    <img src="@/assets/img/map-pin-black2.png" />
                    <a click.prevent class="name">
                      {{ addressList.infoText.name }}</a
                    >
                    <p>
                      {{ addressList.infoText.address }}
                    </p>
                    <p>
                      <font-awesome-icon :icon="['fas', 'phone-alt']" />
                      {{ addressList.infoText.phone }}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-8 col-12">
              <div class="map-div">
                <GmapMap
                  :options="infoOptions"
                  :center="center"
                  :zoom="zoom"
                  map-type-id="terrain"
                  ref="map"
                  style="width: 100%; height: 580px"
                >
                  <gmap-info-window
                    :options="infoOptions"
                    :position="infoWindowPos"
                    :opened="infoWinOpen"
                    @closeclick="
                      timingPopup = false;
                      zoom = 4;
                      infoWinOpen = false;
                    "
                  >
                    <div class="info-window">
                      <p class="font-bold">{{ infoContent.name }}</p>
                      <p>{{ infoContent.address }}</p>
                      <p>
                        <span class="font-bold">Phone:</span>:
                        {{ infoContent.phone }}
                      </p>
                      <p>
                        <span class="font-bold">Email:</span>:
                        {{ infoContent.email }}
                      </p>
                      <a
                        :href="
                          `https://maps.google.com/maps?daddr=${infoContent.address}`
                        "
                        target="blank"
                      >
                        Get Directions</a
                      >
                    </div>
                  </gmap-info-window>
                  <GmapMarker
                    :key="index"
                    v-for="(m, index) in filteredList"
                    :position="m.position"
                    :clickable="true"
                    @click="toggleInfoWindow(m, index)"
                  />
                </GmapMap>
              </div>
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  head: {
    title: "Sites-DieselGB-Site"
  },
  data() {
    return {
      search: "",
      serviceCenters: [],
      center: { lat: 23.232681, lng: 77.4285496 },
      zoom: 4,
      infoContent: {},
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      timingPopup: false,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      markers: [],
      place: null,
      radius: 100
    };
  },

  methods: {
    toggleInfoWindow(marker, idx) {
      this.timingPopup = true;

      this.infoWindowPos = marker.position;
      this.infoContent = marker.infoText;

      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen;
      } else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
        this.zoom = 18;
        this.center.lat = this.infoWindowPos.lat;
        this.center.lng = this.infoWindowPos.lng;
      }
    },

    getStore() {
      var form = {};
      form.service = "storelocator";
      form.store = this.$store.state.list.store;
      this.$store
        .dispatch("pimAjax", {
          method: "post",
          url: `/pimresponse.php`,
          params: form
        })
        .then(response => {
          if (response.response.success) {
            this.serviceCenters = response.result;
            this.serviceCenters.map(element => {
              if (element.lat != "") {
                this.markers.push({
                  position: {
                    lat: Number(element.lat),
                    lng: Number(element.lng)
                  },
                  infoText: {
                    search:
                      element.name +
                      " " +
                      element.address +
                      " " +
                      element.city +
                      " " +
                      element.email +
                      " " +
                      element.phone,
                    name: element.name,
                    address: element.address,
                    city: element.city,
                    state: element.state,
                    zip: element.postcode,
                    phone: element.phone,
                    email: element.email
                  }
                });
              }
            });
          } else {
            throw `No response from the API`;
          }
        })
        .catch(error => {
          if (error.message === "Network Error") {
            this.$globalError(error.message);
          } else {
            this.$globalError(`error form the store locator >> ${error}`);
          }
        });
    }
  },

  computed: {
    filteredList() {
      return this.markers.filter(post => {
        return post.infoText.search
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    }
  },

  mounted() {
    this.getStore();
  }
};
</script>
<style scoped>
@import url("@/assets/css/pages-css/storelocator.css");
</style>
