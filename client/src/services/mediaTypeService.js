import Api from '@/services/api';

export default {
  async getMediaTypes() {
    return await Api().get('/mediaTypes');
  },
  async updateMediaType(mediaType) {
    return await Api().put(`/mediaType/${mediaType._id}`, mediaType);
  },
  async addMediaType(mediaType) {
    return await Api().post(`/mediaType`, mediaType);
  },
  async deleteMediaType(mediaType) {
    return await Api().delete(`/mediaType/${mediaType._id}`);
  }
};
