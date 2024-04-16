import axiosClient_V1 from './axiosClient_V1';

const movieApi = {
  getAll: () => {
    const url = '/movies/getAll';
    return axiosClient_V1.get(url);
  },

  getByState: (params) => {
    const url = '/movies/getAll';
    return axiosClient_V1.get(url, { params });
  },

  getBySlug: (slug) => {
    const url = `/movies/detail/${slug}`;
    return axiosClient_V1.get(url);
  },

  getShowtimes: (id, params) => {
    const url = `/movies/${id}/showtimes`;
    return axiosClient_V1.get(url, { params });
  },
};

export default movieApi;
