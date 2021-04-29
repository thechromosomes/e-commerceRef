<template>
  <div>
    <div class="container acc-page">
      <div class="row">
        <div class="span12">
          <h1 class="title clearfix">My Profile</h1>
        </div>
      </div>
      <div class="row new-ord same-table clearboth">
        <!-- side bar code -->
        <Sidebar />
        <!-- side bar code end -->
        <div class="systemForm">
          <div id="Profile">
            <div class="row">
              <div class="inputWrapper">
                <label for="Gender" class="label">Gender</label>
                <select id="Gender" title="Gender" class="halfWidth">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div class="inputWrapper">
                <label for="Birthday Date" class="label">Birthdate</label>
                <select class="quarterly" id="Month">
                  <option value="">MM</option>
                  <option
                    v-for="(item, index) in months"
                    :key="index"
                    :value="index"
                  >
                    {{ item }}
                  </option>
                </select>
                <select class="quarterly" id="Day">
                  <option value="">DD</option>
                  <option
                    :value="item"
                    v-for="(item, index) in 31"
                    :key="index"
                  >
                    {{ item }}
                  </option>
                </select>
              </div>
              <div class="inputWrapper" id="inline">
                <div class="storediv">
                  <label for="Shoes " class="label">My Shoes Size</label>
                  <select id="SSize">
                    <option value="">Choose Size</option>
                    <option
                      v-for="(size, index) in sizes"
                      :key="index"
                      :value="size"
                    >
                      {{ size }}
                    </option>
                  </select>
                </div>
                <div class="storediv">
                  <label for="StorePref" class="label"
                    >Select Store Preference</label
                  >
                  <select class="" id="RSP">
                    <option value="">- Select State -</option>
                    <option value="">Arizona</option>
                  </select>
                </div>
                <div class="storediv">
                  <label for="Shoes " class="label">&nbsp; &nbsp;</label>
                  <select class="" id="retailStore" name="retailStore">
                    <option value="" class="">-Select Store-</option>
                    <option value="" class="hideoption">
                      Glendale Tanger Outlets
                    </option>
                  </select>
                </div>
              </div>

              <div class="inputWrapper">
                <label for="Category" class="label"
                  >Select Which Categories You Would Like To Receive Information
                  About</label
                >
                <div class="row All myrow">
                  <input
                    type="checkbox"
                    id="All"
                    class="mycheckbox"
                    value="All"
                    :checked="wantAll"
                    @click="wantAllCheck"
                  />
                  &nbsp;&nbsp; <span class="mycheckSpan"> I Want It All </span>
                </div>
                <div class="row myrow">
                  <input
                    type="checkbox"
                    class="mycheckbox"
                    id="Womans"
                    value="Womans"
                    :checked="categoies.woman"
                  />
                  &nbsp; <span class="mycheckSpan">WOMEN'S </span>
                  <input
                    type="checkbox"
                    id="Mens"
                    class="mycheckbox"
                    value="Mens"
                    :checked="categoies.man"
                  />
                  &nbsp; <span class="mycheckSpan">MEN'S </span>
                  <input
                    type="checkbox"
                    id="Handbags"
                    class="mycheckbox"
                    value="Handbags"
                    :checked="categoies.handbags"
                  />
                  &nbsp; <span class="mycheckSpan">HANDBAGS</span>
                  <input
                    type="checkbox"
                    id="Accessories"
                    class="mycheckbox"
                    value="Accessories"
                    :checked="categoies.accessories"
                  />
                  &nbsp; <span class="mycheckSpan">ACCESSORIES</span>
                </div>
              </div>
              <div class="inputWrapper">
                <button type="button" class="btn saveprofile">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "@/components/my-account/Sidebar.vue";
export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      sizes: [0.5, 5.5, 0.6, 6.5, 0.7, 7.5, 0.8, 8.5, 0.9, 9.5],
      categoies: {
        man: false,
        woman: false,
        accessories: false,
        handbags: false,
      },
      wantAll: false,
    };
  },
  methods: {
    wantAllCheck: function () {
      this.wantAll = !this.wantAll;
      if (this.wantAll === true) {
        (this.categoies.man = true),
          (this.categoies.woman = true),
          (this.categoies.handbags = true),
          (this.categoies.accessories = true);
      } else {
        (this.categoies.man = false),
          (this.categoies.woman = false),
          (this.categoies.handbags = false),
          (this.categoies.accessories = false);
      }
    },
  },
  beforeMount() {
    if (
      this.$store.state.cartAjax.customer_session == "" &&
      this.$store.state.cartAjax.customer_id == ""
    ) {
      this.$router.push("/login");
    }
  },
};
</script>
<style scoped>
@import url("@/assets/css/pages-css/myAccount.css");
</style>
