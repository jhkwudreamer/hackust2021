<template>
  <div class="text-center" v-if="checkpoint">
    <v-dialog v-model="dialog" width="500">
      <v-card color="rgb(255, 255, 255, 0.8)">
        <v-card-title
          class="headline white--text"
          style="background: rgba(100, 100, 100, 0.6)"
        >
          {{ checkpoint.name }}
        </v-card-title>

        <v-card-text> Hi </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CheckpointDialog",
  data() {
    return { dialog: false };
  },
  computed: {
    ...mapState(["checkpoint"]),
  },
  watch: {
    checkpoint() {
      if (this.checkpoint) {
        this.dialog = true;
      }
    },
    dialog() {
      if (!this.dialog) {
        this.$store.commit("setCheckpoint", undefined);
      }
    },
  },
};
</script>

<style scoped></style>
