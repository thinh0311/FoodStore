import axiosClient from "./ApiConfig";

const discountApi = {
  getAllDiscounts: () => {
    const url = `/PhieuGiamGia`;
    return axiosClient.get(url);
  },
  getDiscounts: (maGiamGia) => {
    const url = `/PhieuGiamGia/find/${maGiamGia}`;
    return axiosClient.get(url);
  },
  addDiscount: (data) => {
    const url = `/PhieuGiamGia`;
    return axiosClient.post(url, data);
  },
  updateDiscount: (idPhieuGiamGia, data) => {
    const url = `/PhieuGiamGia?maPhieuGiamGia=${idPhieuGiamGia}`;
    return axiosClient.put(url, data);
  },
  deleteProduct: (idPhieuGiamGia) => {
    const url = `/PhieuGiamGia?maPhieuGiamGia=${idPhieuGiamGia}`;
    return axiosClient.delete(url);
  },
};

export default discountApi;
