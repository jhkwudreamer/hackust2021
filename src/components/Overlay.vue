<template>
  <div class="container">
    <distance-travelled-display />
    <route-list />
    <small-map />
    <checkpoint-dialog />
    <!-- <compass /> -->
  </div>
</template>

<script>
// import Compass from "./Compass.vue";
import DistanceTravelledDisplay from "./DistanceTravelledDisplay.vue";
import RouteList from "./RouteList.vue";
import SmallMap from "./SmallMap.vue";
import CheckpointDialog from "./CheckpointDialog.vue";
export default {
  components: {
    DistanceTravelledDisplay,
    RouteList,
    SmallMap,
    CheckpointDialog,
    // Compass,
  },
  data: function () {
    return {};
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 100;
  pointer-events: none; /* Fix the overlay preventing clicks to bottom layers */
}
.container * {
  pointer-events: auto;
}
</style>
