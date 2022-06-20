import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AuthLayout from "../Authentication/AuthLayout";
import COLORS from "../../consts/colors";
import FormInput from "../components/FormInput";
import utils from "../../utils/Ultils";
import Button, { SecondaryButton } from "../components/Button";
import DateTime from "../components/DateTime";
import accountApi from "../../api/accountApi";
import { get } from "react-native/Libraries/Utilities/PixelRatio";

const InfoUserScreen = ({ navigation, route }) => {
  const token = route.params;
  const [account, setAccount] = React.useState("");
  const [accountError, setAccountError] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const [emailError, setEmailError] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [birthday, setBirthday] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");

  React.useEffect(() => {
    const getAccount = async () => {
      try {
        const result = await accountApi.getAccount(token);
        setAccount(result);
      } catch (error) {
        console.log(error, "getAccount");
      }
    };
    getAccount();
  }, [token]);

  React.useEffect(() => {
    const setInfo = () => {
      setUsername(account.hoVaTen);
      setBirthday(account.ngaySinh);
      setAddress(account.diaChi);
      setPhone(account.soDienThoai);
    };
    setInfo();
  }, [account]);

  function isEnabledSignUp() {
    return username !== "" && birthday !== "" && address !== "" && phone !== "";
  }

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

  const handleBtn = async () => {
    console.log(username, birthday, address, phone);
    let data = {
      ...account,
      hoVaTen: username,
      diaChi: address,
      ngaySinh: birthday,
      soDienThoai: phone,
    };
    console.log(data);
    try {
      const result = await accountApi.updateAccount(token, data);
      console.log("Thanh cong");
      alert("Cập nhật thành công");
    } catch (error) {
      console.log(error, "addAccount");
    }
  };
  return (
    <>
      {/* <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.header}>
          <Icon name="arrow-back-ios" size={28} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Thông tin người dùng
          </Text>
        </View>
      </TouchableOpacity> */}
      {/* Form Input and SignUp */}
      <ScrollView
        style={{
          flex: 1,
          marginTop: 15,
          paddingHorizontal: 20,
        }}
      >
        <FormInput
          lable="Họ và tên"
          defaultValue={username}
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
        <DateTime
          title="Ngày sinh"
          value={birthday}
          setBirthday={setBirthday}
        />
        <FormInput
          lable="Địa chỉ"
          defaultValue={address}
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
          defaultValue={phone}
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
            title="Cập nhật"
            onPress={() => handleBtn()}
          />
        </View>
      </ScrollView>
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
export default InfoUserScreen;
