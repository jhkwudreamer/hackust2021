<template>
  <div class="container">
    <div id="pano"></div>
  </div>
</template>

<script>
/* global google */
import { mapState } from "vuex";
export default {
  data() {
    return {
      panoram: undefined,
    };
  },
  mounted: function () {
    const fenway = { lat: 22.3095008, lng: 114.2377189 };
    this.panorama = new google.maps.StreetViewPanorama(
      document.getElementById("pano"),
      {
        position: fenway,
        pov: {
          heading: 180,
          pitch: 10,
        },
        zoomControl: false,
        imageDateControl: false,
        linksControl: true, // ?
        fullscreenControl: false,
        addressControl: false,
      }
    );

    this.panorama.addListener("position_changed", () => {
      const pos = this.panorama.getPosition();
      console.log(pos.lat(), pos.lng());
    });
  },

  computed: {
    ...mapState(["route"]),
  },

  watch: {
    route() {
      this.panorama.setPosition({
        lat: this.route.from.lat,
        lng: this.route.from.lng,
      });
      this.panorama.setPov({
        heading: this.route.from.heading,
        pitch: this.panorama.getPov().pitch,
      });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
}

#pano {
  display: flex;
  width: 100%;
}
</style>
