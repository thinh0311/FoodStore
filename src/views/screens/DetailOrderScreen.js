import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import orderApi from "../../api/orderApi";
import CONSTANTS from "../../consts/const";
import discountApi from "../../api/discountApi";

const DetailOrderScreen = ({ navigation, route }) => {
  const [maDonHang, maGiamGia] = route.params;
  const [detailOrder, setDetailOrder] = React.useState([]);
  const [discount, setDiscount] = React.useState({});
  const [subtotal, setSubtotal] = React.useState(0);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    const getDetailOrder = async () => {
      try {
        const result = await orderApi.getDetailOrder(maDonHang);
        console.log(result);
        setDetailOrder(result);
      } catch (error) {
        console.log(error, "token");
      }
    };
    getDetailOrder();
  }, []);

  React.useEffect(() => {
    const getDetailOrder = async () => {
      try {
        const result = await orderApi.getDetailOrder(maDonHang);
        console.log(result);
        setDetailOrder(result);
      } catch (error) {
        console.log(error, "token");
      }
    };
    getDetailOrder();
    const getDiscount = async () => {
      try {
        const result = await discountApi.getDiscounts(maGiamGia);
        console.log(result);
        setDiscount(result);
      } catch (error) {
        console.log(error, "token");
      }
    };
    getDiscount();
  }, []);

  React.useEffect(() => {
    const totalFee = async () => {
      const total = detailOrder
        ? detailOrder.reduce(
            (total, crr) => total + crr.sanPham.giaSanPham * crr.soLuong,
            0
          )
        : 0;
      setSubtotal(total);
      setTotal(
        ((total + CONSTANTS.SHIPPING_FEE) * (100 - discount.phanTramGiam)) / 100
      );
    };
    totalFee();
  }, [detailOrder, discount]);

  const DetailCard = ({ item }) => {
    return (
      <View style={styles.detailCard}>
        <Image
          source={
            { uri: item.sanPham.anhSanPham } ||
            require("../../assets/product.png")
          }
          style={{ height: 80, width: 80, borderRadius: 40 }}
        />
        <View style={{ marginLeft: 20, paddingVertical: 20, flex: 1 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 5,
            }}
          >
            {item.sanPham.tenSanPham}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>
            {item.sanPham.giaSanPham}đ
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Số lượng: {item.soLuong}
          </Text>
        </View>
      </View>
    );
  };

  function RenderProductList() {
    return (
      <FlatList
        horizontal={false}
        data={detailOrder}
        keyExtractor={(item, index) => index}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 10,
          // alignItems: "center",
          paddingHorizontal: 10,
        }}
        renderItem={({ item }) => <DetailCard item={item} />}
      ></FlatList>
    );
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.white,
        flex: 1,
        marginTop: 30,
      }}
    >
      {/* <View style={styles.header}>
        <Icon
          name="arrow-back-ios"
          size={28}
          onPress={() => navigation.navigate("Order")}
        />
        <Text
          style={{ fontSize: 20, fontWeight: "bold" }}
          onPress={() => navigation.navigate("Order")}
        >
          Chi tiết đơn hàng
        </Text>
      </View> */}
      {/* Cart List */}
      <RenderProductList />
      <View
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: COLORS.secondary,
          // elevation: ,
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
      >
        {/* Subtotal */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 24 }}>Tổng:</Text>
          <Text style={{ fontSize: 24 }}>{subtotal}đ</Text>
        </View>

        {/* Shipping Fee */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 24 }}>Phí vận chuyển:</Text>
          <Text style={{ fontSize: 24 }}>{CONSTANTS.SHIPPING_FEE}đ</Text>
        </View>

        {/*discount*/}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 24 }}>Giảm giá</Text>
          <Text style={{ fontSize: 24 }}>{discount.phanTramGiam}%</Text>
        </View>

        {/* Total */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Tổng cộng:</Text>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>{total}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    // paddingHorizontal: 20,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  detailCard: {
    height: 130,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});

export default DetailOrderScreen;
