import Api from '@/services/api';

export default {
  async getGenres() {
    return await Api().get('/genres');
  },
  async updateGenre(genre) {
    return await Api().put(`/genre/${genre._id}`, genre);
  },
  async addGenre(genre) {
    return await Api().post(`/genre`, genre);
  },
  async deleteGenre(genre) {
    return await Api().delete(`/genre/${genre._id}`);
  }
};
