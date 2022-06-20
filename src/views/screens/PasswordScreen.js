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

function PasswordScreen({ navigation, route }) {
  const token = route.params;
  const [account, setAccount] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const [passError, setPassError] = React.useState("");
  const [newPassError, setNewPassError] = React.useState("");
  const [confirmPassError, setConfirmPassError] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [showNewPass, setShowNewPass] = React.useState(false);
  const [showConfirmPass, setShowConfirmPass] = React.useState(false);

  const [showModal, setShowModal] = React.useState(false);
  const [modal, setModal] = React.useState({
    title: "Đổi mật khẩu thành công",
    icon: "check-circle-outline",
    textBtn: "Đóng",
    color: COLORS.green,
  });

  React.useEffect(() => {
    const getAccount = async () => {
      const result = await accountApi.getAccount(token);
      setAccount(result);
    };
    getAccount();
  }, []);

  function isEnabledSignUp() {
    return (
      password !== "" &&
      newPassword !== "" &&
      confirmPass !== "" &&
      passError === "" &&
      newPassError === "" &&
      confirmPassError === ""
    );
  }

  const checkPass = () => newPassword === confirmPass;

  const handleBtn = () => {
    if (password === account.matKhau) {
      if (checkPass()) {
        const updateAccount = async () => {
          let data = { ...account, matKhau: newPassword };
          try {
            const result = await accountApi.updateAccount(token, data);
            setShowModal(!showModal);
          } catch (error) {
            console.log(error, "updateAccount");
          }
        };
        updateAccount();
      } else {
        setConfirmPassError("Mật khẩu xác nhận không đúng");
      }
    } else {
      setPassError("Mật khẩu sai");
    }
  };

  return (
    <>
      {/* <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.header}>
          <Icon name="arrow-back-ios" size={28} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Đổi mật khẩu</Text>
        </View>
      </TouchableOpacity> */}

      {/* Form Input and SignUp */}
      <ScrollView
        style={{
          flex: 1,
          marginTop: 30,
          paddingHorizontal: 20,
        }}
      >
        <FormInput
          lable="Mật khẩu cũ"
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
          lable="Mật khẩu mới"
          autoCompleteType="password"
          secureTextEntry={!showNewPass}
          containerStyle={{
            marginTop: 20,
          }}
          onChange={(value) => {
            utils.validatePassword(value, setNewPassError);
            setNewPassword(value);
          }}
          errorMsg={newPassError}
          appendComponent={
            <TouchableOpacity
              style={{
                width: 40,
                alignItems: "flex-end",
                justifyContent: "center",
              }}
              onPress={() => {
                setShowNewPass(!showNewPass);
              }}
            >
              <Icon
                style={{
                  color: showNewPass ? COLORS.dark : COLORS.grey,
                }}
                name="remove-red-eye"
                size={20}
              />
            </TouchableOpacity>
          }
        />
        <FormInput
          lable="Nhập lại mật khẩu mới"
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
            title="Đổi mật khẩu"
            onPress={() => handleBtn()}
          />
        </View>
      </ScrollView>
      <ModalComponent
        showModal={showModal}
        onPress={() => {
          setShowModal(!showModal);
          navigation.navigate("Home");
        }}
        title={modal.title}
        icon={modal.icon}
        textBtn={modal.textBtn}
        color={modal.color}
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
export default PasswordScreen;
