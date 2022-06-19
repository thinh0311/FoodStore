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
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import { SecondaryButton } from "../components/Button";
import cartApi from "../../api/cartApi";
import StepperInput from "../components/StepperInput";
import sizes from "../../consts/sizes";
import productApi from "../../api/productApi";
import favoriteApi from "../../api/favoriteApi";
import FormInput from "../components/FormInput";

const DetailsScreen = ({ navigation, route }) => {
  const [idProduct, token] = route.params;
  const [product, setProduct] = React.useState({});
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
    const getProductById = async () => {
      try {
        const result = await productApi.getProductsById(idProduct);
        setProduct(result);
      } catch (error) {
        console.log(error, "getProductById");
      }
    };
    getProductById();
  }, []);

  const updateProduct = async () => {
    try {
      const update = await productApi.updateProduct(idProduct, {
        tenSanPham: nameProduct,
        giaSanPham: priceProduct,
        trangThaiSanPham: 1,
        soLuongTonKho: qtyProduct,
        anhSanPham: imageProduct,
        moTa: detailProduct,
      });
      alert("Sửa thành công");
      navigation.navigate("HomeAdmin");
    } catch (error) {
      console.log("Lỗi: ", error);
    }
  };

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
          Chỉnh sửa sản phẩm
        </Text> */}
        <FormInput
          defaultValue={product.tenSanPham}
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
          defaultValue={String(product.giaSanPham)}
          containerStyle={{
            marginTop: 15,
          }}
          onChange={(value) => {
            setPriceProduct(value);
          }}
        ></FormInput>
        <FormInput
          lable="Số lượng tồn"
          defaultValue={String(product.soLuongTonKho)}
          containerStyle={{
            marginTop: 15,
          }}
          onChange={(value) => {
            setQtyProduct(value);
          }}
        ></FormInput>
        <FormInput
          lable="Mô tả"
          defaultValue={product.moTa}
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
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button title="Chọn hình ảnh" onPress={pickImage} />
          {photo && (
            <Image
              source={{ uri: photo }}
              style={{ width: 200, height: 200 }}
            />
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
            title="Sửa"
            btnContainerStyle={styles.SecondaryButton}
            labelStyle={{
              color: COLORS.white,
            }}
            onPress={updateProduct}
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

export default DetailsScreen;
