import axios from 'axios';

export default {
  async getMediaTypes() {
    return await axios.get('/api/mediaTypes');
  },
  async updateMediaType(mediaType) {
    return await axios.put(`/api/mediaType/${mediaType._id}`, mediaType);
  },
  async addMediaType(mediaType) {
    console.log(mediaType);
    return await axios.post(`/api/mediaType`, mediaType);
  },
  async deleteMediaType(mediaType) {
    return await axios.delete(`/api/mediaType/${mediaType._id}`);
  }
};
