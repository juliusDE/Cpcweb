import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", state.token);
    },
    clearToken(state) {
      state.token = null;
      localStorage.clear();
    },
  },
  actions: {
    login({ commit }, token) {
      commit("setToken", token);
    },
    logout({ commit }) {
      commit("clearToken");
    },
  },
  getters: {
    isAuthenticated: (state) => {
      state.token = localStorage.getItem("token");
      return !!state.token;
    },
  },
});
