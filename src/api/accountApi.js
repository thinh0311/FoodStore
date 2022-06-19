import axiosClient from "./ApiConfig";

const accountApi = {
  getAll: () => {
    const url = "/TaiKhoan";
    return axiosClient.get(url);
  },
  getAccount: (token) => {
    const url = `/TaiKhoan/${token}`;
    return axiosClient.get(url);
  },
  getLogin: (username, password) => {
    const url = `/TaiKhoan/GetTaiKhoanByLogin/${username}/${password}`;
    return axiosClient.get(url);
  },
  checkAccount: (account) => {
    const url = `/TaiKhoan/CheckTaiKhoan/${account}`;
    return axiosClient.get(url);
  },
  updateAccount: (token, data) => {
    const url = `/TaiKhoan/${token}`;
    return axiosClient.put(url, data);
  },
  addAccount: (data) => {
    const url = `/TaiKhoan`;
    return axiosClient.post(url, data);
  },
};

export default accountApi;
