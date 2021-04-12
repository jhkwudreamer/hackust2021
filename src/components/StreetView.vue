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
      /**  @type { google.maps.StreetViewPanorama } */
      panorama: undefined,
      /**  @type { google.maps.LatLng } */
      position: undefined,
      /**  @type { google.maps.Marker } */
      startPointMarker: undefined,
      /**  @type { google.maps.Marker } */
      toPointMarker: undefined,
    };
  },
  mounted() {
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

    this.startPointMarker = new google.maps.Marker({
      label: "S",
      title: "Start",
      map: this.panorama,
      visible: false,
    });

    this.toPointMarker = new google.maps.Marker({
      label: "E",
      title: "End",
      map: this.panorama,
      visible: false,
    });
    this.toPointMarker.addListener("click", () => {
      window.alert("Congratulations! Destination reached!");
    });

    this.panorama.addListener("position_changed", () => {
      const pos = this.panorama.getPosition();
      this.position = pos;
      this.$store.dispatch("setPosition", { lat: pos.lat(), lng: pos.lng() });
    });

    this.panorama.addListener("pov_changed", () => {
      const heading = this.panorama.getPov().heading;
      this.$store.dispatch("setHeading", heading);
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

      this.startPointMarker.setPosition({
        lat: this.route.from.lat,
        lng: this.route.from.lng,
      });
      this.startPointMarker.setVisible(true);
      this.toPointMarker.setPosition({
        lat: this.route.to.lat,
        lng: this.route.to.lng,
      });
      this.toPointMarker.setVisible(true);
    },
    position(newVal, oldVal) {
      [this.toPointMarker, this.startPointMarker].forEach((marker) => {
        if (!marker.getPosition()) {
          return;
        }

        const DISTANCE_FROM_CENTER = 0.0001;
        const bounds = new google.maps.LatLngBounds(
          {
            lat: marker.getPosition().lat() - DISTANCE_FROM_CENTER,
            lng: marker.getPosition().lng() - DISTANCE_FROM_CENTER,
          },
          {
            lat: marker.getPosition().lat() + DISTANCE_FROM_CENTER,
            lng: marker.getPosition().lng() + DISTANCE_FROM_CENTER,
          }
        );

        if (bounds.contains(this.position)) {
          marker.setVisible(true);
        } else {
          marker.setVisible(false);
        }
      });

      if (newVal && oldVal) {
        const distanceTravelledToAdd = google.maps.geometry.spherical.computeDistanceBetween(
          newVal,
          oldVal
        );
        this.$store.dispatch("addDistanceTravelled", distanceTravelledToAdd);
      }
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
