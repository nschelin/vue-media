import axios from 'axios';

export default {
  async getGenres() {
    return await axios.get('/api/genres');
  },
  async updateGenre(genre) {
    return await axios.put(`/api/genre/${genre._id}`, genre);
  }
};
