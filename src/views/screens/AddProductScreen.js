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
import DropDownPicker from "react-native-dropdown-picker";
import { SecondaryButton } from "../components/Button";
import productApi from "../../api/productApi";

const AddProductScreen = ({ navigation }) => {
  const [nameProduct, setNameProduct] = React.useState("");
  const [priceProduct, setPriceProduct] = React.useState("");
  const [imageProduct, setImageProduct] = React.useState("");
  const [category, setCategory] = React.useState([]);
  const [qtyProduct, setQtyProduct] = React.useState("");
  const [detailProduct, setDetail] = React.useState("");
  const [idCategory, setIdCategory] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [photo, setPhoto] = React.useState(null);
  let [result, setResult] = React.useState(null);

  React.useEffect(() => {
    const getCategory = async () => {
      try {
        const result = await categoryApi.getAll();

        setIdCategory(result[0].maDanhMuc);
        setCategory(
          result.map((item) => ({
            label: item.tenDanhMuc,
            value: item.maDanhMuc,
          }))
        );

        console.log(result);
      } catch (error) {}
    };
    getCategory();
  }, []);

  const addProduct = async () => {
    try {
      const add = await productApi.addProduct({
        maDanhMuc: value,
        tenSanPham: nameProduct,
        giaSanPham: priceProduct,
        soLuongTonKho: qtyProduct,
        anhSanPham: imageProduct,
        moTa: detailProduct,
      });
      alert("Thêm thành công");
      navigation.navigate("HomeAdmin");
    } catch (error) {
      console.log("Lỗi: ", error);
    }
  };

  const addCloudinary = async () => {};

  const pickImage = async () => {
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      let newFile = {
        uri: result.uri,
        type: `test/${result.uri.split(".")[1]}`,
        name: `test.${result.uri.split(".")[1]}`,
      };
      const formData = new FormData();
      formData.append("file", newFile);
      try {
        let res = await fetch(
          "http://thuan6420foodstore.somee.com/api/Cloudinary",
          {
            method: "post",
            body: formData,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        let resJson = await res.json();
        console.log(resJson.data);
        setPhoto(resJson.data);
        setImageProduct(resJson.data);
        console.log(imageProduct);
      } catch (error) {
        console.log("Lỗi: ", error.response);
      }
    }
  };

  return (
    <ScrollView>
      {/* <View style={styles.header}>
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
        Thêm sản phẩm
      </Text> */}

      <Text style={{ color: COLORS.grey, fontSize: 18, marginBottom: 10 }}>
        Loại sản phẩm
      </Text>
      <View>
        <DropDownPicker
          open={open}
          value={value}
          items={category}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setCategory}
        />
      </View>

      <FormInput
        lable="Tên sản phẩm"
        containerStyle={{
          marginTop: 15,
        }}
        onChange={(value) => {
          setNameProduct(value);
        }}
      ></FormInput>
      <FormInput
        lable="Giá sản phẩm"
        containerStyle={{
          marginTop: 15,
        }}
        onChange={(value) => {
          setPriceProduct(value);
        }}
      ></FormInput>
      <FormInput
        lable="Số lượng tồn"
        containerStyle={{
          marginTop: 15,
        }}
        onChange={(value) => {
          setQtyProduct(value);
        }}
      ></FormInput>
      <FormInput
        lable="Mô tả"
        containerStyle={{
          marginTop: 15,
        }}
        onChange={(value) => {
          setDetail(value);
        }}
      ></FormInput>
      <Text style={{ color: COLORS.grey, fontSize: 18, marginBottom: 20 }}>
        Hình ảnh
      </Text>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Chọn hình ảnh" onPress={pickImage} />
        {photo && (
          <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />
        )}
      </View>
      <View></View>
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
          onPress={addProduct}
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
});

export default AddProductScreen;
