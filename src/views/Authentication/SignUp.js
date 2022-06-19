import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AuthLayout from "./AuthLayout";
import COLORS from "../../consts/colors";
import FormInput from "../components/FormInput";
import utils from "../../utils/Ultils";
import Button, { SecondaryButton } from "../components/Button";
import DateTime from "../components/DateTime";
import accountApi from "../../api/accountApi";
import ModalComponent from "../components/ModalComponent";

const SignUp = ({ navigation }) => {
  const [account, setAccount] = React.useState("");
  const [accountError, setAccountError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const [passError, setPassError] = React.useState("");
  const [confirmPassError, setConfirmPassError] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [showConfirmPass, setShowConfirmPass] = React.useState(false);
  // const [emailError, setEmailError] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [birthday, setBirthday] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");

  const [showModal, setShowModal] = React.useState(false);

  function isEnabledSignUp() {
    return (
      account !== "" &&
      accountError === "" &&
      password !== "" &&
      email !== "" &&
      emailError === "" &&
      confirmPass !== "" &&
      passError === "" &&
      confirmPassError === "" &&
      username !== "" &&
      birthday !== "" &&
      address !== "" &&
      phone !== ""
    );
  }

  const checkPass = () => password === confirmPass;

  const checkAccount = async () => {
    try {
      const resutl = await accountApi.checkAccount(account);
      if (resutl !== "") {
        return resutl;
      }
    } catch (error) {
      console.log(error, "checkAccount");
    }
  };

  const handleBtnSignUp = async () => {
    const maTK = await checkAccount();
    console.log(maTK);
    if (maTK === undefined) {
      if (checkPass()) {
        let data = {
          tenTaiKhoan: account,
          matKhau: password,
          trangThai: 0,
          hoVaTen: username,
          quyenTaiKhoan: 1,
          anhDaiDien: "",
          diaChi: address,
          ngaySinh: birthday,
          soDienThoai: phone,
          email: email,
        };
        try {
          const result = await accountApi.addAccount(data);
          setShowModal(!showModal);
        } catch (error) {
          console.log(error, "addAccount");
        }
      } else {
        setConfirmPassError("Mật khẩu xác nhận sai");
      }
    }
  };
  return (
    <>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.header}>
          <Icon name="arrow-back-ios" size={28} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Đăng ký</Text>
        </View>
      </TouchableOpacity>
      <AuthLayout
        title="Đăng ký tài khoản"
        subtitle="Tạo một tài khoản để tiếp tục"
        titleContainerStyle={{
          marginTop: 20,
        }}
      >
        {/* Form Input and SignUp */}
        <ScrollView
          style={{
            flex: 1,
            marginTop: 15,
          }}
        >
          <FormInput
            lable="Tài khoản"
            containerStyle={{
              marginTop: 15,
            }}
            onChange={(value) => setAccount(value)}
            errorMsg={accountError}
            appendComponent={
              <View
                style={{
                  justifyContent: "center",
                }}
              >
                <Icon
                  style={{
                    color:
                      account == "" || (account != "" && accountError == "")
                        ? COLORS.green
                        : COLORS.red,
                  }}
                  name={
                    account == "" || (account != "" && accountError == "")
                      ? "check-circle-outline"
                      : "warning"
                  }
                  size={20}
                />
              </View>
            }
          />
          <FormInput
            lable="Mật khẩu"
            autoCompleteType="password"
            secureTextEntry={!showPass}
            containerStyle={{
              marginTop: 20,
            }}
            onChange={(value) => {
              utils.validatePassword(value, setPassError);
              setPassword(value);
            }}
            errorMsg={passError}
            appendComponent={
              <TouchableOpacity
                style={{
                  width: 40,
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
                onPress={() => {
                  setShowPass(!showPass);
                }}
              >
                <Icon
                  style={{
                    color: showPass ? COLORS.dark : COLORS.grey,
                  }}
                  name="remove-red-eye"
                  size={20}
                />
              </TouchableOpacity>
            }
          />
          <FormInput
            lable="Nhập lại mật khẩu"
            autoCompleteType="password"
            secureTextEntry={!showConfirmPass}
            containerStyle={{
              marginTop: 20,
            }}
            onChange={(value) => {
              utils.validatePassword(value, setConfirmPassError);
              setConfirmPass(value);
            }}
            errorMsg={confirmPassError}
            appendComponent={
              <TouchableOpacity
                style={{
                  width: 40,
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
                onPress={() => {
                  setShowConfirmPass(!showConfirmPass);
                }}
              >
                <Icon
                  style={{
                    color: showConfirmPass ? COLORS.dark : COLORS.grey,
                  }}
                  name="remove-red-eye"
                  size={20}
                />
              </TouchableOpacity>
            }
          />
          <FormInput
            lable="Họ và tên"
            containerStyle={{
              marginTop: 15,
            }}
            onChange={(value) => setUsername(value)}
            appendComponent={
              <View
                style={{
                  justifyContent: "center",
                }}
              >
                <Icon
                  style={{
                    color: username !== "" ? COLORS.green : COLORS.red,
                  }}
                  name={username !== "" ? "check-circle-outline" : "warning"}
                  size={20}
                />
              </View>
            }
          />
          <FormInput
            lable="Email"
            placeholder="nguyenvana@gmail.com"
            keyboardType="email-address"
            autoCompleteType="email"
            onChange={(value) => {
              utils.validateEmail(value, setEmailError);
              setEmail(value);
            }}
            errorMsg={emailError}
            appendComponent={
              <View
                style={{
                  justifyContent: "center",
                }}
              >
                <Icon
                  style={{
                    color:
                      email == "" || (email != "" && emailError == "")
                        ? COLORS.green
                        : COLORS.red,
                  }}
                  name={
                    email == "" || (email != "" && emailError == "")
                      ? "check-circle-outline"
                      : "warning"
                  }
                  size={20}
                />
              </View>
            }
          />
          <DateTime
            title="Ngày sinh"
            value={birthday}
            setBirthday={setBirthday}
          />
          <FormInput
            lable="Địa chỉ"
            containerStyle={{
              marginTop: 15,
            }}
            onChange={(value) => setAddress(value)}
            appendComponent={
              <View
                style={{
                  justifyContent: "center",
                }}
              >
                <Icon
                  style={{
                    color: address !== "" ? COLORS.green : COLORS.red,
                  }}
                  name={address !== "" ? "check-circle-outline" : "warning"}
                  size={20}
                />
              </View>
            }
          />
          <FormInput
            lable="Số điện thoại"
            containerStyle={{
              marginTop: 15,
            }}
            onChange={(value) => setPhone(value)}
            appendComponent={
              <View
                style={{
                  justifyContent: "center",
                }}
              >
                <Icon
                  style={{
                    color: phone !== "" ? COLORS.green : COLORS.red,
                  }}
                  name={phone !== "" ? "check-circle-outline" : "warning"}
                  size={20}
                />
              </View>
            }
          />

          <View style={{ marginTop: 20 }}>
            <Button
              disabled={isEnabledSignUp() ? false : true}
              title="Đăng Ký"
              onPress={() => handleBtnSignUp()}
            />
          </View>
        </ScrollView>
      </AuthLayout>
      <ModalComponent
        showModal={showModal}
        title="Tạo tài khoản thành công"
        onPress={() => {
          setShowModal(!showModal);
          navigation.navigate("SignIn");
        }}
        icon="check-circle-outline"
        textBtn="Đăng nhập"
        // styleIcon
      />
      <View style={{ marginBottom: 20 }}></View>
    </>
  );
};
const styles = StyleSheet.create({
  header: {
    // paddingHorizontal: 20,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 30,
  },
});
export default SignUp;
