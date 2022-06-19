import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SwipeListView } from "react-native-swipe-list-view";
import COLORS from "../../consts/colors";
import cartApi from "../../api/cartApi";
import StepperInput from "../components/StepperInput";
import { SecondaryButton } from "../components/Button";
import CONSTANTS from "../../consts/const";

const CartScreen = ({ navigation }) => {
  const [token, setToken] = React.useState("");
  const [cart, setCart] = React.useState([]);

  const [subtotal, setSubtotal] = React.useState(0);
  const [total, setTotal] = React.useState(0);

  const [isDelete, setIsDelete] = React.useState(false);

  React.useEffect(() => {
    const getToken = async () => {
      try {
        const result = await JSON.parse(await AsyncStorage.getItem("token"));
        setToken(result);
      } catch (error) {
        console.log(error, "token");
      }
    };
    getToken();
  }, []);

  React.useEffect(() => {
    const getMyCart = async () => {
      try {
        const result = await cartApi.getProductCart(token);
        setCart(result);
      } catch (error) {
        console.log(error, "Cart");
      }
    };
    getMyCart();
  }, [token, isDelete]);

  React.useEffect(() => {
    const totalFee = async () => {
      const total = cart
        ? cart.reduce(
            (total, crr) => total + crr.sanPham.giaSanPham * crr.soLuong,
            0
          )
        : 0;
      setSubtotal(total);
      setTotal(total + CONSTANTS.SHIPPING_FEE);
    };
    totalFee();
    const updateProductCart = async () => {
      if (cart === []) {
        setProductCart([]);
      } else {
        cart.forEach(async (product, index) => {
          try {
            const updateCart = await cartApi.updateCart(
              token,
              product.sanPham.maSanPham,
              { soLuong: product.soLuong }
            );
          } catch (error) {
            console.log(error, "update");
          }
        });
      }
    };
    updateProductCart();
  }, [cart]);

  function updateQuantityHandler(qty, id) {
    const newCartList = cart.map((item) =>
      item.sanPham.maSanPham === id ? { ...item, soLuong: qty } : item
    );
    setCart(newCartList);
  }

  const removeMyCartHandler = async (id) => {
    try {
      const result = await cartApi.deleteCartItem(token, id);
    } catch (error) {
      console.log(error, "delete");
    }
    setIsDelete(!isDelete);
  };

  const CartCard = ({ item }) => {
    return (
      <View style={styles.cartCard}>
        <Image
          source={
            { uri: item.sanPham.anhSanPham } ||
            require("../../assets/product.png")
          }
          style={{
            height: 80,
            width: 80,
            borderRadius: 40,
            resizeMode: "cover",
          }}
        />
        <View style={{ marginLeft: 15, paddingVertical: 20, flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              height: 45,
              marginBottom: 5,
            }}
          >
            {item.sanPham.tenSanPham.length > 22
              ? `${item.sanPham.tenSanPham.substring(0, 22)}...`
              : item.sanPham.tenSanPham}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {item.sanPham.giaSanPham}đ
          </Text>
        </View>
        <StepperInput
          value={item.soLuong}
          containerStyle={{
            width: 100,
          }}
          onAdd={() => {
            updateQuantityHandler(item.soLuong + 1, item.sanPham.maSanPham);
          }}
          onMinus={() => {
            if (item.soLuong > 1) {
              updateQuantityHandler(item.soLuong - 1, item.sanPham.maSanPham);
            }
          }}
        />
      </View>
    );
  };

  function RenderCartList() {
    return (
      <SwipeListView
        data={cart}
        keyExtractor={(item, index) => index}
        contentContainerStyle={
          {
            // paddingBottom:60
          }
        }
        disableRightSwipe={true}
        rightOpenValue={-75}
        renderItem={({ item }) => <CartCard item={item} />}
        renderHiddenItem={({ item }) => (
          <View
            style={{
              ...styles.cartCard,
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
              onPress={() => removeMyCartHandler(item.sanPham.maSanPham)}
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
          Giỏ hàng
        </Text>
      </View>
      {/* Cart List */}
      <RenderCartList />

      {/* Order Details */}
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
          <Text style={{ fontSize: 18 }}>Tổng</Text>
          <Text style={{ fontSize: 18 }}>{subtotal}đ</Text>
        </View>

        {/* Shipping Fee */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18 }}>Phí vận chuyển</Text>
          <Text style={{ fontSize: 18 }}>{CONSTANTS.SHIPPING_FEE}đ</Text>
        </View>

        {/* Total */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Tổng cộng</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{total}</Text>
        </View>

        {/* Button */}
        <SecondaryButton
          title="Thanh toán"
          btnContainerStyle={{
            backgroundColor: COLORS.primary,
            borderRadius: 30,
            paddingVertical: 10,
            marginVertical: 15,
          }}
          labelStyle={{
            color: COLORS.white,
          }}
          onPress={() => {
            if (cart.length === 0) {
            } else {
              navigation.navigate("Deliver", [token]);
            }
          }}
        />
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
  cartCard: {
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

export default CartScreen;
