import { mediaTypeService } from '@/services';

const state = {
  mediaTypes: []
};

const mutations = {
  SET_MEDIA_TYPES(state, mediaTypes) {
    state.mediaTypes = mediaTypes;
  },
  ADD_MEDIA_TYPE(state, mediaType) {
    state.mediaTypes.push(mediaType);
  },
  UPDATE_MEDIA_TYPE(state, mediaType) {
    const index = state.mediaTypes.findIndex(mt => mt._id === mediaType._id);
    state.mediaTypes[index] = mediaType;
  },
  DELTE_MEDIA_TYPE(state, mediaType) {
    const index = state.mediaTypes.findIndex(mt => mt._id === mediaType._id);
    state.mediaTypes.splice(index, 1);
  }
};

const actions = {
  async getMediaTypes({ commit }) {
    const response = await mediaTypeService.getMediaTypes();
    commit('SET_MEDIA_TYPES', response.data);
  },
  async addMediaType({ commit }, newMediaType) {
    const response = await mediaTypeService.addMediaType(newMediaType);
    const result = response.data;
    if (!result.error) {
      commit('ADD_MEDIA_TYPE', result);
      return true;
    }
    return false;
  },
  async updateMediaType({ commit }, mediaType) {
    const response = await mediaTypeService.updateMediaType(mediaType);
    commit('UPDATE_MEDIA_TYPE', response.data);
    return true;
  },
  async deleteMediaType({ commit }, mediaType) {
    const response = await mediaTypeService.deleteMediaType(mediaType);
    const result = response.data;
    if (result.success) {
      commit('DELETE_MEDIA_TYPE', mediaType);
    }
  }
};

export default {
  state,
  mutations,
  actions
};
