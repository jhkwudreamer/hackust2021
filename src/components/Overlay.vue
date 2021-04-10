<template>
  <div class="container">
    <route-list />
    <compass />
  </div>
</template>

<script>
import Compass from "./Compass.vue";
import RouteList from "./RouteList.vue";
export default {
  components: {
    RouteList,
    Compass,
  },
  data: function () {
    return {
      test: 214,
    };
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
