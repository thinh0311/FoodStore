function isValidEmail(value) {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(String(value).toLowerCase());
}

function validateEmail(value, setEmailError) {
  if (value == "") {
    setEmailError("");
  } else if (isValidEmail(value)) {
    setEmailError("");
  } else {
    setEmailError("Email không hợp lệ");
  }
}

function validatePassword(value, setPasswordError) {
  if (value.length < 6) {
    setPasswordError("Password phải lớn hơn 6 kí tự");
  } else {
    setPasswordError("");
  }
}

const utils = {
  isValidEmail,
  validateEmail,
  validatePassword,
};

export default utils;
