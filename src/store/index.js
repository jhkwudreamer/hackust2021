import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    route: undefined,
  },
  mutations: {
    startRoute(state, route) {
      state.route = route;
    },
  },
  actions: {
    startRoute({ commit }, route) {
      commit("startRoute", route);
    },
  },
  modules: {},
});
