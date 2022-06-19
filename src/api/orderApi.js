import axiosClient from "./ApiConfig";

const accountApi = {
  getAll: () => {
    const url = `/DonHang`;
    return axiosClient.get(url);
  },
  getOrder: (maTK) => {
    const url = `/DonHang/GetDonHangByMaTaiKhoan/${maTK}`;
    return axiosClient.get(url);
  },
  getDetailOrder: (maDH) => {
    const url = `/ChiTietDonHang/${maDH}`;
    return axiosClient.get(url);
  },
  addOrder: (data) => {
    const url = `/DonHang`;
    return axiosClient.post(url, data);
  },
  deleteOrder: (maDH) => {
    const url = `/DonHang/${maDH}`;
    return axiosClient.delete(url);
  },
  updateOrder: (maDH, data) => {
    const url = `/DonHang/${maDH}`;
    return axiosClient.put(url, data);
  },
};

export default accountApi;
