import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    route: undefined,
    heading: undefined,
  },
  mutations: {
    startRoute(state, route) {
      state.route = route;
    },
    setHeading(state, heading) {
      state.heading = heading;
    },
  },
  actions: {
    startRoute({ commit }, route) {
      commit("startRoute", route);
    },
    setHeading({ commit }, heading) {
      commit("setHeading", heading);
    },
  },
  modules: {},
});
