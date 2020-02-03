import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tweetDialog: false,
  },
  mutations: {
    SET_TWEET_DIALOG(state, payload) {
      state.tweetDialog = payload;
    },
  },
  actions: {},
  modules: {},
});
