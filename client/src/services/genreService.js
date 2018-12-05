import axios from 'axios';

export default {
  async getGenres() {
    return await axios.get('/api/genres');
  },
  async updateGenre(genre) {
    return await axios.put(`/api/genre/${genre._id}`, genre);
  },
  async addGenre(genreTitle) {
    return await axios.post(`/api/genre`, { genreTitle });
  },
  async deleteGenre(genre) {
    return await axios.delete(`/api/genre/${genre._id}`);
  }
};
