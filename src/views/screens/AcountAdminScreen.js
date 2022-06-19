import React from "react";
import {
  Dimensions,
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import discountApi from "../../api/discountApi";
import Icon from "react-native-vector-icons/MaterialIcons";
import accountApi from "../../api/orderApi";
import COLORS from "../../consts/colors";
const { width } = Dimensions.get("screen");
const cardWidth = width / 1.15;

const AcountAdminScreen = ({ navigation }) => {
  const [token, setToken] = React.useState("");
  const [discount, setDiscount] = React.useState([]);
  const [idDiscount, setIdDiscount] = React.useState([]);

  React.useEffect(() => {
    const getAllDiscount = async () => {
      try {
        const result = await discountApi.getAllDiscounts();
        setDiscount(result);

        setIdDiscount(result[0].maPhieuGiamGia);
      } catch (error) {
        console.log(error);
      }
    };
    getAllDiscount();
  }, []);

  const deleteDiscount = async () => {
    try {
      const result = await discountApi.deleteProduct(idDiscount);
      alert("Xóa thành công");
    } catch (error) {
      console.log(error);
    }
  };

  const ListOrder = () => {
    return (
      <FlatList
        horizontal
        data={discount}
        keyExtractor={(item) => `${item.maPhieuGiamGia}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesListContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              borderWidth: 1,
              marginTop: 20,
              width: cardWidth,
              height: 100,
              borderRadius: 10,
              borderColor: COLORS.secondary,
              padding: 2,
            }}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate("DetailDiscount", [
                item.maPhieuGiamGia,
                token,
              ]);
            }}
            onLongPress={() => {
              setIdDiscount(item.maPhieuGiamGia);
              Alert.alert("Cảnh báo", "Bạn có muốn xóa phiếu giảm giá này?", [
                { text: "Không", onPress: () => {} },
                {
                  text: "Có",
                  onPress: () => {
                    deleteDiscount();
                  },
                },
              ]);
            }}
          >
            <View>
              <Text>Tên phiếu giảm giá: {item.tenPhieuGiamGia}</Text>
              <Text>
                Ngày bắt đầu: {String(item.ngayBatDau).substring(0, 10)}
              </Text>
              <Text>
                Ngày kết thúc: {String(item.ngayKetThuc).substring(0, 10)}
              </Text>
              <Text>Phần trăm giảm: {item.phanTramGiam}%</Text>
              <Text>Số lượng: {item.soLuong} cái</Text>
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
          <Text style={{ fontSize: 18 }}>Danh sách phiếu giảm giá</Text>
        </View>
      </View>

      <ScrollView>
        <View>
          <ListOrder />
        </View>
      </ScrollView>
      <View
        style={{
          marginBottom: 1,
          marginRight: 15,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={styles.btnAddProduct}
          onPress={() => navigation.navigate("AddDiscount")}
        >
          <Icon name="add" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
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

export default AcountAdminScreen;
