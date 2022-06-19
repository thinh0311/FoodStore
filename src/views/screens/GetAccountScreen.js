import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AuthLayout from "../Authentication/AuthLayout";
import COLORS from "../../consts/colors";
import FormInput from "../components/FormInput";
import utils from "../../utils/Ultils";
import Button, { SecondaryButton } from "../components/Button";
import accountApi from "../../api/accountApi";
import ModalComponent from "../components/ModalComponent";

function GetAccountScreen({ navigation, route }) {
  const [OTP, maTK] = route.params;
  const [otp, setOtp] = React.useState(0);
  const [errorOtp, setErrorOtp] = React.useState("");
  const [account, setAccount] = React.useState({});
  const [password, setPassword] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const [passError, setPassError] = React.useState("");
  const [confirmPassError, setConfirmPassError] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [showConfirmPass, setShowConfirmPass] = React.useState(false);

  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    const getAccount = async () => {
      const result = await accountApi.getAccount(maTK);
      setAccount(result);
    };
    getAccount();
  }, []);

  function isEnabledSignUp() {
    return (
      password !== "" &&
      confirmPass !== "" &&
      passError === "" &&
      confirmPassError === "" &&
      otp !== "" &&
      errorOtp === ""
    );
  }

  const checkPass = () => password === confirmPass;

  const handleBtn = () => {
    if (parseInt(otp) === OTP) {
      if (checkPass()) {
        const updateAccount = async () => {
          let data = { ...account, matKhau: password };
          try {
            const result = await accountApi.updateAccount(maTK, data);
            setShowModal(!showModal);
          } catch (error) {
            console.log(error, "updateAccount");
          }
        };
        updateAccount();
      } else {
        setConfirmPassError("Chưa đúng");
      }
    } else {
      setErrorOtp("Mã xác nhận không đúng");
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.header}>
          <Icon name="arrow-back-ios" size={28} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Xác nhận mật khẩu
          </Text>
        </View>
      </TouchableOpacity>
      <AuthLayout
        title="Lấy mật khẩu"
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
            errorMsg={errorOtp}
            lable="Mã xác nhận"
            containerStyle={{
              marginTop: 15,
            }}
            onChange={(value) => {
              setOtp(value);
            }}
            appendComponent={
              <View
                style={{
                  justifyContent: "center",
                }}
              >
                <Icon
                  style={{
                    color: otp !== "" ? COLORS.green : COLORS.red,
                  }}
                  name={otp !== "" ? "check-circle-outline" : "warning"}
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
          <View style={{ marginTop: 25 }}>
            <Button
              disabled={isEnabledSignUp() ? false : true}
              title="Lấy mật khẩu"
              onPress={() => handleBtn()}
            />
          </View>
        </ScrollView>
      </AuthLayout>
      <ModalComponent
        showModal={showModal}
        title="Đổi mật khẩu thành công"
        onPress={() => {
          setShowModal(!showModal);
          navigation.navigate("SignIn");
        }}
        icon="check-circle-outline"
        textBtn="Đăng nhập"
        // styleIcon
      />
    </>
  );
}
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
export default GetAccountScreen;
