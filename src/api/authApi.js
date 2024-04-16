import axiosClient_V1 from './axiosClient_V1';

const authApi = {
  login: (data) => {
    const url = '/auth/login';
    return axiosClient_V1.post(url, data);
  },

  register: (data) => {
    const url = '/auth/register';
    return axiosClient_V1.post(url, data);
  },

  verifyEmail: (data) => {
    const url = '/auth/verifyEmail';
    return axiosClient_V1.post(url, data);
  },

  forgotPassword: (data) => {
    const url = '/auth/forgotPassword';
    return axiosClient_V1.post(url, data);
  },

  verifyCodeResetPassword: (data) => {
    const url = '/auth/verifyCodeResetPassword';
    return axiosClient_V1.post(url, data);
  },

  resetPassword: (data) => {
    const url = '/auth/resetPassword';
    return axiosClient_V1.post(url, data);
  },

  changePassword: (data, token) => {
    const url = '/auth/changePassword';
    return axiosClient_V1.post(url, data, { headers: { Authorization: 'Bearer ' + token } });
  },

  getUserInfo: (token) => {
    const url = '/user/profile';
    return axiosClient_V1.get(url, { headers: { Authorization: 'Bearer ' + token } });
  },

  updateUserInfo: (formData, token) => {
    const url = '/user/profile';
    return axiosClient_V1.put(url, formData, { headers: { Authorization: 'Bearer ' + token } });
  },
};

export default authApi;
