<template>
  <div>
    <StreetView />
    <Overlay class="overlay" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import StreetView from "@/components/StreetView";
import Overlay from "@/components/Overlay";
export default {
  components: {
    StreetView,
    Overlay,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["route", "currentCheckpointId", "distanceTravelled"]),
  },

  watch: {
    currentCheckpointId() {
      if (this.currentCheckpointId === this.route.checkpoints.length) {
        alert(
          `Congratulations! Total distance = ${this.distanceTravelled.toFixed()}`
        );
      }
    },
  },
};
</script>

<style></style>
