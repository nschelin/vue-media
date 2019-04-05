import Api from '@/services/api';

export default {
  async getAlbums() {
    return await Api().get('/albums');
  },
  async updateAlbum(album) {
    return await Api().put(`/album/${album._id}`, album);
  },
  async addAlbum(album) {
    return await Api().post(`/album`, album);
  },
  async deleteAlbum(album) {
    return await Api().delete(`/album/${album._id}`);
  }
};
