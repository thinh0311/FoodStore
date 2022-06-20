import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Button,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import { SecondaryButton } from "../components/Button";
import cartApi from "../../api/cartApi";
import StepperInput from "../components/StepperInput";
import sizes from "../../consts/sizes";
import productApi from "../../api/productApi";
import favoriteApi from "../../api/favoriteApi";
import FormInput from "../components/FormInput";
import discountApi from "../../api/discountApi";
import DateTime from "../components/DateTime";

const DetailDiscountScreen = ({ navigation, route }) => {
  const [maGiamGia, token] = route.params;
  const [discount, setDiscount] = React.useState("");
  const [nameDiscount, setNameDiscount] = React.useState("");
  const [idDiscount, setIdDiscount] = React.useState("");
  const [startDay, setStartDay] = React.useState("");
  const [endDay, setEndDay] = React.useState("");
  const [qtyDiscount, setQtyDiscount] = React.useState("");
  const [percentDiscount, setPercentDiscount] = React.useState("");

  React.useEffect(() => {
    const getDiscountById = async () => {
      try {
        const result = await discountApi.getDiscounts(maGiamGia);
        setDiscount(result);
      } catch (error) {
        console.log(error, "getDiscountById");
      }
    };
    getDiscountById();
  }, []);

  const updateDiscount = async () => {
    try {
      const update = await discountApi.updateDiscount(maGiamGia, {
        maPhieuGiamGia: maGiamGia,
        tenPhieuGiamGia: nameDiscount,
        maNhap: idDiscount,
        ngayBatDau: startDay,
        ngayKetThuc: endDay,
        phanTramGiam: percentDiscount,
        soLuong: qtyDiscount,
      });
      alert("Sửa thành công");
      navigation.navigate("HomeAdmin");
    } catch (error) {
      console.log(error, "EditDiscount");
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, marginTop: 30 }}>
      {/* <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}></Text>
      </View> */}
      <ScrollView>
        {/* <Text
          style={{
            marginTop: 10,
            textAlign: "center",
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Chỉnh sửa phiếu giảm giá
        </Text> */}
        <FormInput
          defaultValue={discount.tenPhieuGiamGia}
          lable="Tên phiếu"
          containerStyle={{
            marginTop: 15,
          }}
          onChange={(value) => {
            setNameDiscount(value);
          }}
        ></FormInput>
        <FormInput
          lable="Mã nhập"
          defaultValue={discount.maNhap}
          containerStyle={{
            marginTop: 15,
          }}
          onChange={(value) => {
            setIdDiscount(value);
          }}
        ></FormInput>
        <DateTime
          title="Ngày bắt đầu"
          value={String(discount.ngayBatDau).substring(0, 10)}
          setBirthday={setStartDay}
        />
        <DateTime
          title="Ngày kết thúc"
          value={String(discount.ngayKetThuc).substring(0, 10)}
          setBirthday={setEndDay}
        />
        <FormInput
          lable="Phần trăm giảm"
          defaultValue={String(discount.phanTramGiam)}
          containerStyle={{
            marginTop: 15,
          }}
          onChange={(value) => {
            setPercentDiscount(value);
          }}
        ></FormInput>
        <FormInput
          lable="Số lượng"
          defaultValue={String(discount.soLuong)}
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
            title="Sửa"
            btnContainerStyle={styles.SecondaryButton}
            labelStyle={{
              color: COLORS.white,
            }}
            onPress={updateDiscount}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  detail: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    height: 45,
    width: 45,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  SecondaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingVertical: 15,
    width: 200,
    marginBottom: 30,
  },
});
export default DetailDiscountScreen;
