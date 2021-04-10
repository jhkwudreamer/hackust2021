<template>
  <div id="compass" :style="{ transform: 'rotate(' + cssTransform + 'deg)' }">
    <v-icon size="50">fa-compass</v-icon>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["heading"]),
    cssTransform() {
      return -1 * this.heading - 45;
    },
  },
};
</script>

<style scoped>
#compass {
  position: absolute;
  right: 72px;
  bottom: 24px;
}
</style>
