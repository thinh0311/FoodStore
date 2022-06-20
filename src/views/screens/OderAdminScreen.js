import React from "react";
import {
  Dimensions,
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import {
  FlatList,
  ScrollView,
  TouchableHighlight,
} from "react-native-gesture-handler";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import categoryApi from "../../api/categoryApi";
import productApi from "../../api/productApi";
import accountApi from "../../api/orderApi";
import COLORS from "../../consts/colors";
import FormInput from "../components/FormInput";
import {
  documentDirectory,
  downloadAsync,
  EncodingType,
  readAsStringAsync,
  StorageAccessFramework,
  writeAsStringAsync,
} from "expo-file-system";
import { Base64 } from "js-base64";
import { scheduleNotificationAsync } from "expo-notifications";
const { width } = Dimensions.get("screen");
const cardWidth = width / 1.15;
const buttonWidth = width / 3;

const OrderAdminScreen = ({ navigation }) => {
  const [token, setToken] = React.useState("");
  const [idProduct, setIdProduct] = React.useState("");
  const [order, setOrder] = React.useState([]);
  const [idOrder, setIdOrder] = React.useState();
  const [addressOrder, setAdressOrder] = React.useState();
  const [idAcount, setIdAcount] = React.useState();
  const [nguoiNhan, setNguoiNhan] = React.useState();
  const [maGiamGia, setMaGiamGia] = React.useState();
  const [listProduct, setListProduct] = React.useState([]);
  const [downloading, setDownloading] = React.useState(false);

  React.useEffect(() => {
    const getAllOrder = async () => {
      try {
        const result = await accountApi.getAll();
        setOrder(result);

        setIdOrder(result[0].maDonHang);
      } catch (error) {
        console.log(error);
      }
    };
    getAllOrder();
  }, []);

  const updateOrder = async () => {
    try {
      const update = await accountApi.updateOrder(idOrder, {
        maTaiKhoan: idAcount,
        nguoiNhan: nguoiNhan,
        diaChi: addressOrder,
        maGiamGia: maGiamGia,
        trangThaiDonHang: 1,
      });
      alert("Sửa thành công");
      navigation.navigate("HomeAdmin");
    } catch (error) {
      console.log(error, "EditDiscount");
    }
  };

  const submit = async () => {
    const permission =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permission) {
      alert("Bạn cần cho phép truy cập bộ nhớ ");
      return;
    }

    const downloadUri = "https://www.orimi.com/pdf-test.pdf";
    const fileName = "pdf";
    const fileUri = documentDirectory + fileName + ".pdf";
    setDownloading(true);
    try {
      const response = await downloadAsync(downloadUri, fileUri);

      const newUri = await StorageAccessFramework.createFileAsync(
        permission.directoryUri,
        fileName,
        "application/pdf"
      );

      const base64 = await readAsStringAsync(response.uri, {
        encoding: EncodingType.Base64,
      });

      const write = await writeAsStringAsync(newUri, base64, {
        encoding: EncodingType.Base64,
      });
      scheduleNotificationAsync({
        content: {
          title: fileName,
          body: "Đã tải xuống",
        },
        trigger: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const ListOrder = () => {
    return (
      <FlatList
        horizontal
        data={order}
        keyExtractor={(item, index) => `${item.maDonHang}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesListContainer}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              borderWidth: 1,
              marginTop: 20,
              width: cardWidth,
              height: 120,
              borderRadius: 10,
              borderColor: COLORS.secondary,
              padding: 2,
            }}
            activeOpacity={0.8}
            onPress={() => {
              setIdOrder(item.maDonHang);
              setAdressOrder(item.diaChi);
              setIdAcount(item.maTaiKhoan);
              setNguoiNhan(item.nguoiNhan);
              setMaGiamGia(item.maGiamGia);
              if (item.trangThaiDonHang === 0) {
                Alert.alert("Cảnh báo", "Xác nhận đã giao đơn hàng?", [
                  { text: "Không", onPress: () => {} },
                  {
                    text: "Có",
                    onPress: () => {
                      updateOrder();
                    },
                  },
                ]);
              }
            }}
          >
            <View>
              <Text>Mã đơn: {item.maDonHang}</Text>
              <Text>Người nhận: {item.nguoiNhan}</Text>
              <Text>Địa chỉ: {item.diaChi}</Text>
              <Text>Ngày lập: {String(item.ngayLap).substring(0, 10)}</Text>
              <Text>
                Trạng thái :{" "}
                {item.trangThaiDonHang === 0 ? "Chưa giao" : "Đã giao"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      ></FlatList>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Text style={{ fontSize: 18 }}>Danh sách đơn hàng</Text>
        </View>
      </View>

      <ScrollView>
        <View>
          <ListOrder />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
  },

  categoriesListContainer: {
    paddingVertical: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },

  btnAddProduct: {
    height: 40,
    width: 40,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default OrderAdminScreen;
