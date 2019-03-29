import Vue from 'vue';
import Vuex from 'vuex';
import { genreService, mediaTypeService } from '@/services';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    genres: [],
    mediaTypes: []
  },
  mutations: {
    SET_GENRES(state, genres) {
      state.genres = genres;
    },
    ADD_GENRE(state, newGenre) {
      state.genres.push(newGenre);
    },
    DELETE_GENRE(state, genre) {
      const index = state.genres.findIndex(g => g._id === genre._id);
      state.genres.splice(index, 1);
    },
    UPDATE_GENRE(state, genre) {
      const index = state.genres.findIndex(g => g._id === genre._id);
      state.genres[index] = genre;
    },
    SET_MEDIA_TYPES(state, mediaTypes) {
      state.mediaTypes = mediaTypes;
    }
  },
  actions: {
    async getGenres({ commit }) {
      const response = await genreService.getGenres();
      commit('SET_GENRES', response.data);
    },
    async addGenre({ commit }, newGenre) {
      const response = await genreService.addGenre(newGenre);
      const result = response.data;
      if (!result.error) {
        commit('ADD_GENRE', result);
        return true;
      }
      return false;
    },
    async updateGenre({ commit }, genre) {
      const response = await genreService.updateGenre(genre);
      commit('UPDATE_GENRE', response.data);
      return true;
    },
    async deleteGenre({ commit }, genre) {
      const response = await genreService.deleteGenre(genre);
      const result = response.data;
      if (result.success) {
        commit('DELETE_GENRE', genre);
      }
    },
    async getMediaTypes({ commit }) {
      const response = await mediaTypeService.getMediaTypes();
      commit('SET_MEDIA_TYPES', response.data);
    }
  }
});
