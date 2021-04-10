<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn id="routeListBtn" large v-bind="attrs" v-on="on">
          <v-icon left>fa-map-marker-alt</v-icon>
          <span>0 / {{ routes.length }}</span>
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
            <v-list-item v-for="route in routes" :key="route.id">
              <v-list-item-avatar>
                <v-icon class="purple accent-1" dark>fa-route</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  <span class="routeTitle">
                    {{ route.from }} to {{ route.to }}
                  </span>
                </v-list-item-title>
                <!--<v-list-item-subtitle>Subtitle {{ i }}</v-list-item-subtitle>-->
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text>
                  1<sup>st</sup>: {{ Math.floor(Math.random() * 500) }}km
                </v-list-item-action-text>
                <v-btn
                  outlined
                  rounded
                  color="grey darken-1"
                  @click="startRoute(route.id)"
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
export default {
  name: "RouteList",
  data() {
    return {
      dialog: true,
      routes: [
        { id: 1, from: "HKUST", to: "CUHK" },
        { id: 2, from: "CUHK", to: "HKU" },
        { id: 3, from: "HKU", to: "HKUST" },
      ],
    };
  },

  methods: {
    startRoute(route_id) {
      window.alert("Welcome to route_id=" + route_id);
      this.dialog = false;
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
