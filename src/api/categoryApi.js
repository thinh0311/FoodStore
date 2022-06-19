import React from "react";
import axiosClient from "./ApiConfig";

const categoryApi = {
  getAll: () => {
    const url = "/DanhMuc";
    return axiosClient.get(url);
  },
  addCategory: (data) => {
    const url = `/DanhMuc`;
    return axiosClient.post(url, data);
  },
  updateCategory: (idCategory, data) => {
    const url = `/DanhMuc/${idCategory}`;
    return axiosClient.put(url, data);
  },
  deleteCategory: (idCategory) => {
    const url = `/DanhMuc/${idCategory}`;
    return axiosClient.delete(url);
  },
};

export default categoryApi;
