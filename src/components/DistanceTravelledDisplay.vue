<template>
  <div class="text-center">
    <v-btn id="distanceTravelledDisplay" large>
      <v-icon left>fa-route</v-icon>
      <span class="text-none">{{ distanceTravelled | toFixed(0) }} m</span>
    </v-btn>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  filters: {
    toFixed: function (number, digits) {
      return number.toFixed(digits);
    },
  },

  computed: {
    ...mapState(["distanceTravelled"]),
  },
};
</script>

<style scoped>
#distanceTravelledDisplay {
  position: absolute;
  left: 16px;
  top: 16px;

  background-color: rgba(255, 255, 255, 0.6);
}
#distanceTravelledDisplay span {
  font-size: 120%;
}
</style>
