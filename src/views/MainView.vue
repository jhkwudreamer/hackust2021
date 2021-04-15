<template>
  <div></div>
</template>

<script>
import { mapState } from "vuex";
export default {
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
