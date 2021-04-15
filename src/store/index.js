import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    route: undefined,
    checkpoint: undefined,
    currentCheckpointId: 0,
    position: {
      lat: undefined,
      lng: undefined,
    },
    heading: undefined,
    distanceTravelled: 0,
    hasStarted: false,
    user: {
      isSignedIn: true,
      userData: {
        displayName: "JW",
        photoURL: require("@/assets/userPhoto.png"),
      },
    },
  },
  mutations: {
    startRoute(state, route) {
      state.route = route;
      state.distanceTravelled = 0;
      state.hasStarted = false;
      state.checkpoint = route.checkpoints[0];
      state.currentCheckpointId = 0;
    },
    setPosition(state, position) {
      state.position.lat = position.lat;
      state.position.lng = position.lng;
    },
    setHeading(state, heading) {
      state.heading = heading;
    },
    setDistanceTravelled(state, distanceTravelled) {
      if (state.hasStarted) {
        state.distanceTravelled = distanceTravelled;
      } else if (
        state.position.lat === state.route.checkpoints[0].lat &&
        state.position.lng === state.route.checkpoints[0].lng
      ) {
        // Add small timeout to fix paranoma may not be available at exactly the start point
        // In that case, paranoma may move a little away from the designed from point coordinate
        // That should not be counted as user movement
        setTimeout(() => {
          state.hasStarted = true;
        }, 250);
      }
    },
    addDistanceTravelled(state, distanceTravelledToAdd) {
      if (state.hasStarted) {
        state.distanceTravelled += distanceTravelledToAdd;
      } else if (
        state.position.lat === state.route.checkpoints[0].lat &&
        state.position.lng === state.route.checkpoints[0].lng
      ) {
        // Add small timeout to fix paranoma may not be available at exactly the start point
        // In that case, paranoma may move a little away from the designed from point coordinate
        // That should not be counted as user movement
        setTimeout(() => {
          state.hasStarted = true;
        }, 250);
      }
    },
    setCheckpoint(state, checkpoint) {
      state.checkpoint = checkpoint;
    },
    setCurrentCheckpointId(state, currentCheckpointId) {
      state.currentCheckpointId = currentCheckpointId;
    },
  },
  actions: {
    startRoute({ commit }, route) {
      commit("startRoute", route);
    },
    setPosition({ commit }, position) {
      commit("setPosition", position);
    },
    setHeading({ commit }, heading) {
      commit("setHeading", heading);
    },
    setDistanceTravelled({ commit }, distanceTravelled) {
      commit("setDistanceTravelled", distanceTravelled);
    },
    addDistanceTravelled({ commit }, distanceTravelledToAdd) {
      commit("addDistanceTravelled", distanceTravelledToAdd);
    },
    setCheckpoint({ commit }, checkpoint) {
      commit("setCheckpoint", checkpoint);
    },
    setCurrentCheckpointId({ commit }, checkpointId) {
      commit("setCurrentCheckpointId", checkpointId);
    },
  },
  modules: {},
});
