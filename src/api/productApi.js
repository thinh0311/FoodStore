import React from "react";
import axiosClient from "./ApiConfig";

const productApi = {
  getAll: () => {
    const url = "/SanPham";
    return axiosClient.get(url);
  },
  getProductsByCategory: (idCategory) => {
    const url = `/SanPham/GetSanPhamByMaDanhMuc/${idCategory}`;
    return axiosClient.get(url);
  },
  getProductsById: (idProduct) => {
    const url = `/SanPham/${idProduct}`;
    return axiosClient.get(url);
  },
  addProduct: (data) => {
    const url = `/SanPham`;
    return axiosClient.post(url, data);
  },
  addCloudinary: () => {
    const url = `/Cloudinary`;
    return axiosClient.get(url);
  },
  updateProduct: (idProduct, data) => {
    const url = `/SanPham/${idProduct}`;
    return axiosClient.put(url, data);
  },
  deleteProduct: (idProduct) => {
    const url = `/SanPham/${idProduct}`;
    return axiosClient.delete(url);
  },
};

export default productApi;
