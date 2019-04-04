import axios from 'axios';

export default {
  async getAlbums() {
    return await axios.get('/api/albums');
  },
  async updateAlbum(album) {
    return await axios.put(`/api/album/${album._id}`, album);
  },
  async addAlbum(album) {
    return await axios.post(`/api/album`, album);
  },
  async deleteAlbum(album) {
    return await axios.delete(`/api/album/${album._id}`);
  }
};
