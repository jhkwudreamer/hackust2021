<template>
  <div class="text-center">
    <v-btn id="coinDisplay" large>
      <v-icon left>fa-coins</v-icon>
      <span class="text-none">{{ score | toFixed(0) }}</span>
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
    score() {
      console.log(this.distanceTravelled);
      return (
        (this.distanceTravelled < 6000
          ? 110 - this.distanceTravelled / 100
          : 300000 / (this.distanceTravelled + 1)) +
        20 +
        this.coins
      );
    },
  },
};
</script>

<style scoped>
#coinDisplay {
  background-color: rgba(255, 255, 255, 0.6);
}
</style>
