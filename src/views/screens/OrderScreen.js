import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SwipeListView } from "react-native-swipe-list-view";
import COLORS from "../../consts/colors";
import orderApi from "../../api/orderApi";
import { SecondaryButton } from "../components/Button";
import discountApi from "../../api/discountApi";
import ModalComponent from "../components/ModalComponent";

const OrderScreen = ({ navigation, route }) => {
  const token = route.params;
  const [listOrder, setListOrder] = React.useState([]);

  const [showModal, setShowModal] = React.useState(false);
  const [modal, setModal] = React.useState({
    title: "Xóa đơn hàng thành công",
    icon: "check-circle-outline",
    textBtn: "Đóng",
    color: COLORS.green,
  });

  React.useEffect(() => {
    const getOrder = async () => {
      try {
        const result = await orderApi.getOrder(token);
        setListOrder(result);
      } catch (error) {
        console.log(error, "Cart");
      }
    };
    getOrder();
  }, [token, showModal]);

  const handleRemoveOrder = async (order) => {
    if (order.trangThaiDonHang === 0) {
      try {
        const deleteOrder = await orderApi.deleteOrder(order.maDonHang);
        setShowModal(!showModal);
      } catch (error) {
        console.log(error, "remove order");
      }
    }
  };

  const OrderCard = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate("DetailOrder", [item.maDonHang, item.maGiamGia])
        }
      >
        <View style={styles.orderCard}>
          <View style={{}}>
            <Text
              style={{ marginBottom: 10, fontSize: 18, fontWeight: "bold" }}
            >
              Mã đơn hàng:
            </Text>
            <Text
              style={{ marginBottom: 10, fontSize: 18, fontWeight: "bold" }}
            >
              Ngày lập:
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Trạng thái:
            </Text>
          </View>
          <View style={{ display: "flex", alignItems: "flex-end" }}>
            <Text
              style={{ marginBottom: 10, fontSize: 18, fontWeight: "bold" }}
            >
              {item.maDonHang.length > 10
                ? `${item.maDonHang.substring(0, 10)}...`
                : item.maDonHang}
            </Text>
            <Text
              style={{ marginBottom: 10, fontSize: 18, fontWeight: "bold" }}
            >
              {item.ngayLap.substring(0, 10)}
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.trangThaiDonHang === 0
                ? "Đang chờ xử lý"
                : item.trangThaiDonHang === 1
                ? "Đang giao"
                : "Hoàn thành"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  function RenderCartList() {
    return (
      <SwipeListView
        data={listOrder}
        keyExtractor={(item, index) => index}
        contentContainerStyle={{
          marginTop: 10,
        }}
        disableRightSwipe={true}
        rightOpenValue={-75}
        renderItem={({ item }) => <OrderCard item={item} />}
        renderHiddenItem={({ item }) => (
          <View
            style={{
              ...styles.orderCard,
              backgroundColor: COLORS.primary,
              elevation: 0,
            }}
          >
            <Icon
              name="delete"
              size={40}
              style={{
                flex: 1,
                justifyContent: "flex-end",
                position: "absolute",
                top: 45,
                right: 20,
                color: COLORS.white,
              }}
              onPress={() => handleRemoveOrder(item)}
            />
          </View>
        )}
      />
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
      <View style={styles.header}>
        <Icon
          name="arrow-back-ios"
          size={28}
          onPress={() => navigation.navigate("Home")}
        />
        <Text
          style={{ fontSize: 20, fontWeight: "bold" }}
          onPress={() => navigation.navigate("Home")}
        >
          Đơn hàng
        </Text>
      </View>
      {/* Cart List */}
      <RenderCartList />
      <ModalComponent
        showModal={showModal}
        onPress={() => {
          setShowModal(!showModal);
        }}
        title={modal.title}
        icon={modal.icon}
        textBtn={modal.textBtn}
        color={modal.color}
        // styleIcon
      />
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
  orderCard: {
    height: 130,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
});

export default OrderScreen;
