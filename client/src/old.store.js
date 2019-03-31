// import Vue from 'vue';
// import Vuex from 'vuex';
// import { genreService, mediaTypeService } from '@/services';

// Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {
//     genres: [],
//     mediaTypes: []
//   },
//   mutations: {
//     SET_GENRES(state, genres) {
//       state.genres = genres;
//     },
//     ADD_GENRE(state, newGenre) {
//       state.genres.push(newGenre);
//     },
//     DELETE_GENRE(state, genre) {
//       const index = state.genres.findIndex(g => g._id === genre._id);
//       state.genres.splice(index, 1);
//     },
//     UPDATE_GENRE(state, genre) {
//       const index = state.genres.findIndex(g => g._id === genre._id);
//       state.genres[index] = genre;
//     },
//     SET_MEDIA_TYPES(state, mediaTypes) {
//       state.mediaTypes = mediaTypes;
//     },
//     ADD_MEDIA_TYPE(state, mediaType) {
//       state.mediaTypes.push(mediaType);
//     },
//     UPDATE_MEDIA_TYPE(state, mediaType) {
//       const index = state.mediaTypes.findIndex(mt => mt._id === mediaType._id);
//       state.mediaTypes[index] = mediaType;
//     },
//     DELTE_MEDIA_TYPE(state, mediaType) {
//       const index = state.mediaTypes.findIndex(mt => mt._id === mediaType._id);
//       state.mediaTypes.splice(index, 1);
//     }
//   },
//   actions: {
//     async getGenres({ commit }) {
//       const response = await genreService.getGenres();
//       commit('SET_GENRES', response.data);
//     },
//     async addGenre({ commit }, newGenre) {
//       const response = await genreService.addGenre(newGenre);
//       const result = response.data;
//       if (!result.error) {
//         commit('ADD_GENRE', result);
//         return true;
//       }
//       return false;
//     },
//     async updateGenre({ commit }, genre) {
//       const response = await genreService.updateGenre(genre);
//       commit('UPDATE_GENRE', response.data);
//       return true;
//     },
//     async deleteGenre({ commit }, genre) {
//       const response = await genreService.deleteGenre(genre);
//       const result = response.data;
//       if (result.success) {
//         commit('DELETE_GENRE', genre);
//       }
//     },
//     async getMediaTypes({ commit }) {
//       const response = await mediaTypeService.getMediaTypes();
//       commit('SET_MEDIA_TYPES', response.data);
//     },
//     async addMediaType({ commit }, newMediaType) {
//       const response = await mediaTypeService.addMediaType(newMediaType);
//       const result = response.data;
//       if (!result.error) {
//         commit('ADD_MEDIA_TYPE', result);
//         return true;
//       }
//       return false;
//     },
//     async updateMediaType({ commit }, mediaType) {
//       const response = await mediaTypeService.updateMediaType(mediaType);
//       commit('UPDATE_MEDIA_TYPE', response.data);
//       return true;
//     },
//     async deleteMediaType({ commit }, mediaType) {
//       const response = await mediaTypeService.deleteMediaType(mediaType);
//       const result = response.data;
//       if (result.success) {
//         commit('DELETE_MEDIA_TYPE', mediaType);
//       }
//     }
//   }
// });
