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

    <div id="SmallMapDiv" v-show="showMap" :class="large ? 'large' : 'small'">
      <div id="SmallMapContainer"></div>
      <div id="SmallMapOverlay">
        <v-btn-toggle>
          <v-btn @click="map.panTo(position)">
            <v-icon>fa-location-arrow</v-icon>
          </v-btn>
          <v-btn
            @click="
              currentCheckpointId < markers.length &&
                map.panTo(markers[currentCheckpointId].getPosition())
            "
          >
            <v-icon>fa-map-marker-alt</v-icon>
          </v-btn>
          <v-btn v-show="!large" @click="large = true">
            <v-icon>fa-search-plus</v-icon>
          </v-btn>
          <v-btn v-show="large" @click="large = false">
            <v-icon>fa-search-minus</v-icon>
          </v-btn>
        </v-btn-toggle>
      </div>
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
      large: false,
      /**  @type { google.maps.Map } */
      map: undefined,
      /**  @type { google.maps.Marker } */
      marker: undefined,
      /**  @type { google.maps.Marker[] } */
      markers: [],
    };
  },
  computed: {
    ...mapState(["route", "position", "heading", "currentCheckpointId"]),
  },
  mounted() {
    this.map = new google.maps.Map(
      document.getElementById("SmallMapContainer"),
      {
        center: { lat: 22.3193, lng: 114.1694 },
        zoom: 17,
        minZoom: 17,
        maxZoom: 17,

        disableDefaultUI: true,
        clickableIcons: false,
      }
    );

    this.marker = new google.maps.Marker({
      map: this.map,
      icon: {
        path:
          "M444.52 3.52L28.74 195.42c-47.97 22.39-31.98 92.75 19.19 92.75h175.91v175.91c0 51.17 70.36 67.17 92.75 19.19l191.9-415.78c15.99-38.39-25.59-79.97-63.97-63.97z",
        // location-arrow
        // The SVG has viewport 512×512
        fillColor: this.$vuetify.theme.themes.light.primary,
        fillOpacity: 1.0,
        strokeColor: "#fff",
        strokeWeight: 2.5,
        scale: 0.05,
        anchor: new google.maps.Point(224, 287), // End point of arrow
      },
      visible: true,
    });
  },
  watch: {
    currentCheckpointId() {
      this.markers.forEach((marker, id) => {
        if (id === this.currentCheckpointId) {
          marker.setVisible(true);
        } else {
          marker.setVisible(false);
        }
      });
    },
    route() {
      if (this.route) {
        this.markers.forEach((marker) => {
          marker.setMap(null);
        });

        this.markers = this.route.checkpoints.map((checkpoint) => {
          const marker = new google.maps.Marker({
            title: checkpoint.name,
            map: this.map,
            visible: true,
            position: {
              lat: checkpoint.lat,
              lng: checkpoint.lng,
            },
          });
          return marker;
        });
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
          rotation: this.heading - 45, // fa-location-arrow is 45° clockwise
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
}
.small {
  width: 250px;
  height: 250px;
}
.large {
  width: 500px;
  height: 500px;
}
#SmallMapCloseBtn {
  position: absolute;
  right: 0;
  top: 0;
}
#SmallMapContainer {
  width: 100%;
  height: 100%;
}
#SmallMapOverlay {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  opacity: 80%;
}
</style>
