import axios from 'axios';

export default {
  async getGenres() {
    return await axios.get('/api/genres');
  }
};
