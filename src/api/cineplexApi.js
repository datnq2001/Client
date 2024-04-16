import axiosClient from './axiosClient_V1';

const cineplexApi = {
  getAll: () => {
    const url = '/cineplexs';
    return axiosClient.get(url);
  },
};

export default cineplexApi;
