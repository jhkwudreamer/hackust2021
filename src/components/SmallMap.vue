<template>
  <div id="SmallMap">
    <v-btn
      id="SmallMapOpenBtn"
      v-show="!showMap"
      color="rgba(255, 255, 255, 0.6)"
      fab
      large
      @click="showMap = true"
    >
      <v-icon>fa-map-marked</v-icon>
    </v-btn>

    <div id="SmallMapDiv" v-show="showMap">
      <div id="SmallMapContainer"></div>
      <v-btn id="SmallMapCloseBtn" icon @click="showMap = false">
        <v-icon>fa-times-circle</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
/* global google */
import { mapState } from "vuex";
export default {
  data() {
    return {
      showMap: false,
      map: undefined,
      marker: undefined,
      /**  @type { google.maps.Marker } */
      startPointMarker: undefined,
      /**  @type { google.maps.Marker } */
      toPointMarker: undefined,
    };
  },
  computed: {
    ...mapState(["route", "position", "heading"]),
  },
  mounted() {
    this.map = new google.maps.Map(
      document.getElementById("SmallMapContainer"),
      {
        center: { lat: 22.3193, lng: 114.1694 },
        zoom: 18,
        zoomControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
      }
    );

    this.marker = new google.maps.Marker({
      map: this.map,
      icon: {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 4,
      },
      visible: true,
    });

    this.startPointMarker = new google.maps.Marker({
      label: "S",
      title: "Start",
      map: this.map,
      visible: false,
    });

    this.toPointMarker = new google.maps.Marker({
      label: "E",
      title: "End",
      map: this.map,
      visible: false,
    });
  },
  watch: {
    route() {
      if (this.route) {
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
      } else {
        this.startPointMarker.setVisible(false);
        this.toPointMarker.setVisible(false);
      }
    },
    position: {
      handler() {
        if (this.map) {
          this.map.setCenter(this.position);
          this.marker.setPosition(this.position);
        }
      },
      deep: true,
    },
    heading() {
      if (this.marker) {
        this.marker.setIcon({
          ...this.marker.getIcon(),
          rotation: this.heading,
        });
      }
    },
  },
};
</script>

<style scoped>
#SmallMapOpenBtn,
#SmallMapDiv {
  position: absolute;
}
#SmallMapOpenBtn {
  left: 24px;
  bottom: 36px;
}
#SmallMapDiv {
  left: 24px;
  bottom: 24px;
  width: 250px;
  height: 250px;
}
#SmallMapCloseBtn {
  position: absolute;
  right: 0;
  top: 0;
}
#SmallMapContainer {
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
