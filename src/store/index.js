import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    route: undefined,
    position: {
      lat: undefined,
      lng: undefined,
    },
    heading: undefined,
  },
  mutations: {
    startRoute(state, route) {
      state.route = route;
    },
    setPosition(state, position) {
      state.position.lat = position.lat;
      state.position.lng = position.lng;
    },
    setHeading(state, heading) {
      state.heading = heading;
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
  },
  modules: {},
});
