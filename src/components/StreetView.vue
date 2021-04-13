<template>
  <div class="container">
    <div id="pano"></div>
  </div>
</template>

<script>
/* global google */
import { mapState } from "vuex";

const MARKER_ICON = {
  path:
    "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z",
  // map-marker-alt-solid
  // The SVG has viewport 384×512
  fillColor: "#EA4335",
  fillOpacity: 0.9,
  scale: 0.7,
  anchor: new google.maps.Point(192, 512), // Bottom middle. Default (0, 0)
  labelOrigin: new google.maps.Point(192, 50), // Near top middle. Default (0, 0)
};

export default {
  data() {
    return {
      /**  @type { google.maps.StreetViewPanorama } */
      panorama: undefined,
      /**  @type { google.maps.LatLng } */
      position: undefined,
      /**  @type { google.maps.Marker[] } */
      markers: [],
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
      this.markers.forEach((marker) => {
        marker.setMap(null);
      });

      this.markers = this.route.checkpoints.map((checkpoint) => {
        const marker = new google.maps.Marker({
          title: "Start",
          icon: MARKER_ICON,
          animation: google.maps.Animation.BOUNCE,
          map: this.panorama,
          visible: false,
          clickable: true,
          position: {
            lat: checkpoint.lat,
            lng: checkpoint.lng,
          },
        });

        marker.addListener("click", () => {
          this.$store.commit("setCheckpoint", checkpoint);
        });
        return marker;
      });

      this.panorama.setPosition({
        lat: this.route.checkpoints[0].lat,
        lng: this.route.checkpoints[0].lng,
      });

      this.panorama.setPov({
        heading: this.route.checkpoints[0].heading,
        pitch: this.panorama.getPov().pitch,
      });
    },
    position(newVal, oldVal) {
      this.markers.forEach((marker) => {
        if (!marker.getPosition()) {
          return;
        }

        const DISTANCE_FROM_CENTER = 0.0005;
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

      console.log(JSON.stringify(this.position));

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
