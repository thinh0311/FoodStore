import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Picker,
  Platform,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import * as ImagePicker from "expo-image-picker";
import FormInput from "../components/FormInput";
import categoryApi from "../../api/categoryApi";
import COLORS from "../../consts/colors";
import { SecondaryButton } from "../components/Button";
import productApi from "../../api/productApi";
import DateTime from "../components/DateTime";
import discountApi from "../../api/discountApi";

const AddDiscountScreen = ({ navigation }) => {
  const [nameDiscount, setNameDiscount] = React.useState("");
  const [idDiscount, setIdDiscount] = React.useState("");
  const [startDay, setStartDay] = React.useState("");
  const [endDay, setEndDay] = React.useState("");
  const [qtyDiscount, setQtyDiscount] = React.useState("");
  const [percentDiscount, setPercentDiscount] = React.useState("");

  const addDiscount = async () => {
    try {
      const add = await discountApi.addDiscount({
        tenPhieuGiamGia: nameDiscount,
        maNhap: idDiscount,
        ngayBatDau: startDay,
        ngayKetThuc: endDay,
        phanTramGiam: percentDiscount,
        soLuong: qtyDiscount,
      });
      alert("Thêm thành công");
      navigation.navigate("HomeAdmin");
    } catch (error) {
      console.log(error, "AddDiscount");
    }
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
      </View>
      <Text
        style={{
          marginTop: 10,
          textAlign: "center",
          fontSize: 20,
          marginBottom: 20,
        }}
      >
        Thêm phiếu giảm giá
      </Text>

      <FormInput
        lable="Tên phiếu giảm giá"
        containerStyle={{
          marginTop: 15,
        }}
        onChange={(value) => {
          setNameDiscount(value);
        }}
      ></FormInput>
      <FormInput
        lable="Mã nhập"
        containerStyle={{
          marginTop: 15,
        }}
        onChange={(value) => {
          setIdDiscount(value);
        }}
      ></FormInput>
      <DateTime
        title="Ngày bắt đầu"
        value={startDay}
        setBirthday={setStartDay}
      />
      <DateTime title="Ngày kết thúc" value={endDay} setBirthday={setEndDay} />
      <FormInput
        lable="Phần trăm giảm"
        containerStyle={{
          marginTop: 15,
        }}
        onChange={(value) => {
          setPercentDiscount(value);
        }}
      ></FormInput>
      <FormInput
        lable="Số lượng"
        containerStyle={{
          marginTop: 15,
        }}
        onChange={(value) => {
          setQtyDiscount(value);
        }}
      ></FormInput>

      <View
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <SecondaryButton
          title="Thêm"
          btnContainerStyle={styles.SecondaryButton}
          labelStyle={{
            color: COLORS.white,
          }}
          onPress={addDiscount}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  SecondaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingVertical: 15,
    width: 200,
    marginBottom: 30,
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: { color: COLORS.grey },
});

export default AddDiscountScreen;
