<template>
  <div class="text-center">
    <v-btn id="coinDisplay" large>
      <v-icon left>fa-coins</v-icon>
      <span class="text-none">{{
        ((distanceTravelled && 300000 / distanceTravelled) + coins) | toFixed(0)
      }}</span>
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
    ...mapState(["distanceTravelled", "coins"]),
  },
};
</script>

<style scoped>
#coinDisplay {
  background-color: rgba(255, 255, 255, 0.6);
}
</style>
