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

        <v-card-text>
          <p class="text-subtitle-1 mt-5 mb-2" v-html="checkpoint.text"></p>
          <v-list style="background: inherit" v-if="checkpoint.options">
            <v-list-item-group v-model="selectedOption">
              <v-list-item
                v-for="(option, i) in checkpoint.options"
                :key="i"
                :color="
                  i === checkpoint.correctOptionId ? 'success' : undefined
                "
                :class="selectedOption !== undefined ? 'disabled' : undefined"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="option"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <template v-if="checkpoint.id === this.route.checkpoints.length - 1">
            <v-container>
              <v-row justify="around">
                <v-col>
                  <p class="text-h1 text-center">
                    <v-icon size="inherit">fa-route</v-icon>
                  </p>
                  <p class="text-h5 text-center">
                    {{ distanceTravelled.toFixed(0) }} m
                  </p>
                </v-col>
                <v-col>
                  <p class="text-h1 text-center">
                    <v-icon size="inherit">fa-coins</v-icon>
                  </p>
                  <p class="text-h5 text-center">{{ score }} coins</p>
                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="nextCheckpoint" v-if="checkpoint.id === 0">
            Start Route
          </v-btn>
          <v-btn
            text
            @click="nextCheckpoint"
            v-else-if="checkpoint.id === this.route.checkpoints.length - 1"
          >
            End Route
          </v-btn>
          <template v-else>
            <v-btn
              text
              @click="nextCheckpoint"
              v-if="
                !checkpoint.options ||
                selectedOption === checkpoint.correctOptionId
              "
            >
              Next Checkpoint
            </v-btn>
            <v-btn
              text
              @click="dialog = false"
              v-if="
                selectedOption !== undefined &&
                selectedOption !== checkpoint.correctOptionId
              "
            >
              Try Again
            </v-btn>
          </template>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CheckpointDialog",
  data() {
    return { dialog: false, selectedOption: undefined };
  },
  computed: {
    ...mapState([
      "checkpoint",
      "route",
      "currentCheckpointId",
      "distanceTravelled",
      "coins",
    ]),
    score() {
      return (
        (this.distanceTravelled < 6000
          ? 110 - this.distanceTravelled / 100
          : 300000 / (this.distanceTravelled + 1)) +
        20 +
        this.coins
      ).toFixed(0);
    },
  },
  watch: {
    checkpoint() {
      if (this.checkpoint) {
        this.dialog = true;
        this.selectedOption = undefined;
      }
    },
    dialog() {
      if (!this.dialog) {
        this.$store.commit("setCheckpoint", undefined);
      }
    },
    selectedOption() {
      if (
        this.selectedOption !== undefined &&
        this.selectedOption !== this.checkpoint.correctOptionId
      ) {
        this.$store.dispatch("addCoins", -5);
      }
    },
  },
  methods: {
    nextCheckpoint() {
      this.$store.commit(
        "setCurrentCheckpointId",
        this.currentCheckpointId + 1
      );
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.disabled {
  pointer-events: none;
}
.v-card__title {
  word-break: inherit;
}
</style>
