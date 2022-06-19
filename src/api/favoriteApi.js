import axiosClient from "./ApiConfig";

const accountApi = {
  getFavorite: (maTK) => {
    const url = `/SanPham/GetSanPhamYeuThich/${maTK}`;
    return axiosClient.get(url);
  },
  getFavoriteByMaSP: (maTK, maSP) => {
    const url = `/SanPhamYeuThich/${maTK}/${maSP}`;
    return axiosClient.get(url);
  },
  addFavorite: (maTK, maSP) => {
    const url = `/SanPhamYeuThich/${maTK}/${maSP}`;
    return axiosClient.post(url);
  },
  deleteFavorite: (maTK, maSP) => {
    const url = `/SanPhamYeuThich/${maTK}/${maSP}`;
    return axiosClient.delete(url);
  },
};

export default accountApi;
