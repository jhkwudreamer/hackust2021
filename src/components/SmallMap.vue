<template>
  <div id="SmallMap">
    <v-btn
      id="SmallMapOpenBtn"
      v-show="!showMap"
      color="red"
      icon
      large
      @click="showMap = true"
    >
      <v-icon>fa-map-marked</v-icon>
    </v-btn>

    <div id="SmallMapDiv" v-show="showMap">
      <v-btn id="SmallMapCloseBtn" icon @click="showMap = false">
        <v-icon>fa-times-circle</v-icon>
      </v-btn>
      <div id="SmallMapContainer"></div>
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
    };
  },
  computed: {
    ...mapState(["position", "heading"]),
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
  },
  watch: {
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
  left: 36px;
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
  z-index: 101;
}
#SmallMapContainer {
  width: 100%;
  height: 100%;
}
</style>
