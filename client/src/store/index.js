import Vue from 'vue';
import Vuex from 'vuex';

import genres from './modules/genre.store';
import mediaTypes from './modules/mediaType.store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    mediaTypes,
    genres
  }
});
