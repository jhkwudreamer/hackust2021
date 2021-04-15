<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn id="routeListBtn" large v-bind="attrs" v-on="on">
          <v-icon left>fa-map-marker-alt</v-icon>
          <span
            >{{ currentCheckpointId }} /
            {{ route ? route.checkpoints.length : 0 }}</span
          >
        </v-btn>
      </template>

      <v-card color="rgb(255, 255, 255, 0.8)">
        <v-card-title
          class="headline white--text"
          style="background: rgba(100, 100, 100, 0.6)"
        >
          Route List
        </v-card-title>

        <v-card-text>
          <v-list style="background: inherit">
            <v-list-item class="my-2" v-for="route in routes" :key="route.id">
              <v-list-item-avatar>
                <v-icon class="purple accent-1" dark>fa-route</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  <span class="routeTitle">
                    {{ route.title }}
                  </span>
                </v-list-item-title>
                <!--<v-list-item-subtitle>Subtitle {{ i }}</v-list-item-subtitle>-->
              </v-list-item-content>

              <v-list-item-action>
                <v-btn
                  outlined
                  rounded
                  color="grey darken-1"
                  @click="startRoute(route)"
                >
                  <v-icon left>fa-play</v-icon>
                  Start
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "RouteList",
  data() {
    return {
      dialog: true,
      routes: [
        {
          id: 1,
          title: "Lam Tin blah",
          checkpoints: [
            {
              id: 0,
              name: "Lam Tin somewhere",
              lat: 22.30859618762706,
              lng: 114.2357238009161,
              heading: 250,
              pitch: -13.5,
              text:
                "Welcome to the Lam Tin route, where you can re-experience how Sing Yin Jais went to school by MTR",
            },
            {
              id: 1,
              name: "St Paul",
              lat: 22.30881038662973,
              lng: 114.2377198899602,
              text: "What is the acronym of St Paul?",
              options: ["SYSS", "SPSLT", "SPC", "SPCC"],
              correctOptionId: 1,
            },
            {
              id: 2,
              name: "Lam Tin HKPL",
              lat: 22.309813703963147,
              lng: 114.23769249060987,
              text: "This is the end of our route",
            },
          ],
        },
        {
          id: 2,
          title: "Tsim Sha Tsui blah",
          checkpoints: [
            {
              id: 0,
              name: "Tsim Sha Tsui MTR B2",
              lat: 22.298752346044566,
              lng: 114.1724924661573,
              heading: 90,
            },
            {
              id: 1,
              name: "Tsim Sha Tsui Tom Lee",
              lat: 22.2990763328982,
              lng: 114.17292513978508,
              heading: 0,
            },
          ],
        },
        {
          id: 3,
          title: "Wan Chai blah",
          checkpoints: [
            {
              id: 0,
              name: "Wan Chai MTR",
              lat: 22.277506466668182,
              lng: 114.17308811625979,
              heading: 90,
            },
            {
              id: 1,
              name: "Hong Kong Convention and Exhibition Centre",
              lat: 22.282829334596418,
              lng: 114.17406227826402,
              heading: 90,
            },
            {
              id: 2,
              name: "Golden Bauhinia Square",
              lat: 22.284638898354917,
              lng: 114.1738756841809,
              heading: 90,
            },
            {
              id: 3,
              name: "Legislative Council Complex",
              lat: 22.28117047030273,
              lng: 114.16664353987531,
              heading: 90,
            },
            {
              id: 4,
              name: "Hong Kong Observation Wheel",
              lat: 22.28562580434138,
              lng: 114.16176303497572,
              heading: 90,
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapState(["currentCheckpointId", "route"]),
  },
  methods: {
    startRoute(route) {
      window.alert("Welcome to route_id=" + route.id);
      this.dialog = false;
      this.$store.dispatch("startRoute", route);
    },
  },
};
</script>

<style scoped>
#routeListBtn {
  position: absolute;
  right: 16px;
  top: 16px;

  background-color: rgba(255, 255, 255, 0.6);
}
#routeListBtn span {
  font-size: 120%;
}

.routeTitle {
  font-weight: 500;
}
</style>
