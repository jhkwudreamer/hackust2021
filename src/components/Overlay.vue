<template>
  <div class="view-container">
    <div class="top-left">
      <distance-travelled-display />
      <!-- <coins-display class="ml-2" /> -->
    </div>
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
// import CoinsDisplay from "./CoinsDisplay.vue";
export default {
  components: {
    DistanceTravelledDisplay,
    RouteList,
    SmallMap,
    CheckpointDialog,
    // CoinsDisplay,
    // Compass,
  },
  data: function () {
    return {};
  },
};
</script>

<style scoped>
.view-container {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 5;
  pointer-events: none; /* Fix the overlay preventing clicks to bottom layers */
}
.view-container * {
  pointer-events: auto;
}
.top-left {
  position: absolute;
  left: 16px;
  top: 16px;
  display: flex;
}
</style>
