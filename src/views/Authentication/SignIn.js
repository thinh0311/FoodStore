import React from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import AuthLayout from "./AuthLayout";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormInput from "../components/FormInput";
import COLORS from "../../consts/colors";
import utils from "../../utils/Ultils";
import Button, { SecondaryButton } from "../components/Button";
import accountApi from "../../api/accountApi";
import { useEffect } from "react/cjs/react.production.min";

const SignIn = ({ navigation }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [userError, setUserError] = React.useState("");
  const [passError, setPassError] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [showModal, setShowModal] = React.useState(true);

  function isEnabledSignIn() {
    return username != "" && password != "" && userError == "";
  }

  const handlePressSignIn = async () => {
    try {
      const result = await accountApi.getLogin(username, password);
      console.log(result);
      if (
        result.matKhau === password &&
        result.trangThai === 0 &&
        result.quyenTaiKhoan === 1
      ) {
        const token = JSON.parse(await AsyncStorage.getItem("token")) || "";
        if (token === "") {
          await AsyncStorage.setItem(
            "token",
            JSON.stringify(result.maTaiKhoan)
          );
        }
        navigation.navigate("Home");
      } else if (
        result.matKhau === password &&
        result.trangThai === 0 &&
        result.quyenTaiKhoan === 0
      ) {
        const token = JSON.parse(await AsyncStorage.getItem("token")) || "";
        if (token === "") {
          await AsyncStorage.setItem(
            "token",
            JSON.stringify(result.maTaiKhoan)
          );
        }
        navigation.navigate("HomeAdmin");
      }
    } catch (error) {
      setError("Thông tin không chính xác!");
      await AsyncStorage.removeItem("token");
    }
  };

  React.useEffect(() => {
    const removeToken = async () => {
      await AsyncStorage.removeItem("token");
      const token = JSON.parse(await AsyncStorage.getItem("token")) || "";
      console.log(token);
    };
    removeToken();
  }, []);

  return (
    <AuthLayout
      title="Let's Sign You In"
      subtitle="Welcome back, You've been missed"
    >
      <View
        style={{
          flex: 1,
          marginTop: 30,
        }}
      >
        <FormInput
          lable="Username"
          placeholder=""
          onChange={(value) => {
            setUsername(value);
            setError("");
          }}
          errorMsg={userError}
          appendComponent={
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <Icon
                style={{
                  color:
                    username == "" || (username != "" && userError == "")
                      ? COLORS.green
                      : COLORS.red,
                }}
                name={
                  username == "" || (username != "" && userError == "")
                    ? "check-circle-outline"
                    : "warning"
                }
                size={20}
              />
            </View>
          }
        />
        <FormInput
          lable="Password"
          autoCompleteType="password"
          secureTextEntry={!showPass}
          containerStyle={{
            marginTop: 20,
          }}
          onChange={(value) => {
            utils.validatePassword(value, setPassError);
            setPassword(value);
            setError("");
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
        {/* forgot Password */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            marginBottom: 25,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: COLORS.red, fontSize: 16 }}>{error}</Text>
          <TouchableOpacity activeOpacity={0.5}>
            <Text
              style={{
                color: COLORS.dark,
                fontSize: 16,
                fontWeight: "bold",
              }}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              Quên mật khẩu?
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          disabled={isEnabledSignIn() ? false : true}
          title="Đăng nhập"
          onPress={handlePressSignIn}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.dark,
              fontSize: 14,
              marginRight: 5,
            }}
          >
            Bạn chưa có tài khoản?
          </Text>
          <SecondaryButton
            title="Đăng ký"
            onPress={() => navigation.navigate("SignUp")}
          />
        </View>
      </View>
    </AuthLayout>
  );
};

export default SignIn;
