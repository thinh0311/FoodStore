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
import accountApi from "../../api/accountApi";
import emailApi from "../../api/emailApi";

const ForgotPassword = ({ navigation }) => {
  const [account, setAccount] = React.useState("");
  const [accountError, setAccountError] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");

  // const [OTP, setOTP] = React.useState(0);

  function isEnabledSignUp() {
    return (
      account !== "" && accountError === "" && email !== "" && emailError === ""
    );
  }

  const createOTP = () => {
    let otp = Math.floor(Math.random() * 899999 + 100000);
    // setOTP(otp);
    return otp;
  };

  const checkAccount = async () => {
    try {
      const resutl = await accountApi.checkAccount(account);
      if (resutl !== "") {
        return resutl;
      }
    } catch (error) {
      setAccountError("Tài khoản không tồn tại");
      console.log(error, "checkAccount");
    }
  };

  const sendMail = async (OTP, maTK) => {
    try {
      const resutl = await emailApi.sendMail(
        `Mã xác nhận tài khoản FoodStore ${new Date()}`,
        OTP
      );
      navigation.navigate("GetAccount", [OTP, maTK]);
    } catch (error) {
      console.log(error, "sendMail");
    }
  };

  const handleBtn = () => {
    const getUser = async () => {
      try {
        const token = await accountApi.checkAccount(account);
        if (token !== "") {
          const user = await accountApi.getAccount(token);
          if (user !== {}) {
            if (email === user.email) {
              try {
                const otp = await emailApi.sendOTP(user.email);
                navigation.navigate("GetAccount", [otp, user.maTaiKhoan]);
              } catch (error) {
                console.log(error, "error");
              }
            } else {
              setEmailError("Email không đúng");
            }
          }
        }
      } catch (error) {
        console.log(error, "user");
        setAccountError("Tài khoản không đúng");
      }
    };
    getUser();
  };
  return (
    <>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.header}>
          <Icon name="arrow-back-ios" size={28} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Quên mật khẩu
          </Text>
        </View>
      </TouchableOpacity>
      <AuthLayout
        title="Nhập thông tin tài khoản"
        // subtitle="Nhập đầy đủ để lấy lại thông tin"
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
            onChange={(value) => {
              setAccount(value);
              setAccountError("");
            }}
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
          <View style={{ marginTop: 25 }}>
            <Button
              disabled={isEnabledSignUp() ? false : true}
              title="Lấy mật khẩu"
              onPress={() => handleBtn()}
            />
          </View>
        </ScrollView>
      </AuthLayout>
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
export default ForgotPassword;
