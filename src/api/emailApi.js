import axiosClient from "./ApiConfig";

const emailApi = {
  sendMail: (subject, content) => {
    const url = `/Email/SendMail?subject=${subject}&content=${content}`;
    return axiosClient.post(url);
  },
  sendOTP: (email) => {
    const url = `/Email/SendOTP?email=${email}`;
    return axiosClient.post(url);
  },
};

export default emailApi;
