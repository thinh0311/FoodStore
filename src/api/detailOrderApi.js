import axiosClient from "./ApiConfig";

const detailOrderApi = {
  addDetailOrder: (maDH, maSP, data) => {
    const url = `/ChiTietDonHang/${maDH}/${maSP}`;
    return axiosClient.post(url, data);
  },
  // updateCart: (maTK, maSP, data) => {
  //   const url = `/GioHang/${maTK}/${maSP}`;
  //   return axiosClient.put(url, data);
  // },
  // deleteCart: (maTK) => {
  //   const url = `/GioHang/${maTK}`;
  //   return axiosClient.delete(url);
  // },
  // deleteCartItem: (maTK, maSP) => {
  //   const url = `/GioHang/${maTK}/${maSP}`;
  //   return axiosClient.delete(url);
  // },
  // getProductCart: (maTK) => {
  //   const url = `/SanPham/GetSanPhamTrongGioHang/${maTK}`;
  //   return axiosClient.get(url);
  // },
  // getCart: (maTK) => {
  //   const url = `/GioHang/${maTK}`;
  //   return axiosClient.get(url);
  // },
};

export default detailOrderApi;
