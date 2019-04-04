import { musicService } from '@/services';

const state = {
  albums: []
};

const mutations = {
  SET_ALBUMS(state, albums) {
    state.albums = albums;
  }
};

const actions = {
  async getAlbums({ commit }) {
    const response = await musicService.getAlbums();
    commit('SET_ALBUMS', response.data);
  }
};

export default {
  state,
  mutations,
  actions
};
