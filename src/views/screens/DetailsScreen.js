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
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import { SecondaryButton } from "../components/Button";
import cartApi from "../../api/cartApi";
import StepperInput from "../components/StepperInput";
import sizes from "../../consts/sizes";
import productApi from "../../api/productApi";
import favoriteApi from "../../api/favoriteApi";
import ModalComponent from "../components/ModalComponent";

const DetailsScreen = ({ navigation, route }) => {
  const [idProduct, token] = route.params;
  const [product, setProduct] = React.useState({});
  const [myCart, setMyCart] = React.useState([]);
  const [selectedSize, setSelectedSize] = React.useState(0);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [qty, setQty] = React.useState(1);
  const [sizeCart, setSizeCart] = React.useState(0);

  const [showModal, setShowModal] = React.useState(false);
  const [modal, setModal] = React.useState({
    title: "Thêm sản phẩm vào giỏ hàng thành công",
    icon: "check-circle-outline",
    textBtn: "Đóng",
    color: COLORS.green,
  });

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
    const getFavorite = async () => {
      try {
        const result = await favoriteApi.getFavoriteByMaSP(token, idProduct);
        if (result.length !== 0) {
          setIsFavorite(true);
        }
      } catch (error) {
        setIsFavorite(false);
        console.log(error, "getFavorite");
      }
    };
    getFavorite();
  }, []);

  React.useEffect(() => {
    const getMyCart = async () => {
      try {
        const result = await cartApi.getProductCart(token);
        setMyCart(result);
      } catch (error) {
        console.log(error, "getMyCart");
      }
    };
    getMyCart();
  }, [showModal]);

  const handleFavorite = async () => {
    try {
      console.log(token, idProduct);
      console.log(isFavorite);
      if (!isFavorite) {
        const addFavorite = await favoriteApi.addFavorite(token, idProduct);
      } else {
        const addFavorite = await favoriteApi.deleteFavorite(token, idProduct);
      }
    } catch (error) {
      console.log(error, "getFavorite");
    }
  };

  const addToCart = async () => {
    try {
      // const add = await cartApi.updateCart(token, idProduct, {
      //   soLuong: qty + sl,
      // });
      const add = await cartApi.addCart(token, idProduct, {
        soLuong: qty,
      });

      // else {
      //   const add = await cartApi.addCart(token, idProduct, {
      //     soLuong: qty,
      //   });
      // }
      setShowModal(!showModal);
    } catch (error) {
      console.log(error, "addProduct");
      setModal({
        title: "Sản phẩm đã có trong giỏ hàng",
        icon: "warning",
        textBtn: "Đóng",
        color: COLORS.red,
      });
      setShowModal(!showModal);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, marginTop: 30 }}>
      <View style={styles.header}>
        {/* <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Chi tiết sản phẩm
        </Text> */}
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            BackgroundColor: COLORS.primary,
          }}
          onPress={() => {
            navigation.navigate("Cart");
          }}
        >
          <Icon name="shopping-bag" size={28} />
          <View
            style={{
              position: "absolute",
              top: 4,
              right: 2,
              height: 15,
              width: 15,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              backgroundColor: COLORS.primary,
            }}
          >
            <Text
              style={{
                position: "absolute",
                color: COLORS.white,
                fontSize: 10,
              }}
            >
              {myCart.length}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 280,
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.primary,
              width: 50,
              height: 50,
              borderRadius: 25,
              position: "absolute",
              zIndex: 1,
              top: 15,
              right: 85,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: COLORS.white, fontSize: 15, fontWeight: "bold" }}
            >
              {product.giamGia}%
            </Text>
          </View>
          <Image
            source={
              { uri: product.anhSanPham } || require("../../assets/product.png")
            }
            style={{ height: 220, width: 220, resizeMode: "cover" }}
          />
        </View>
        <View style={styles.detail}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                flex: 1,
                fontSize: 20,
                fontWeight: "bold",
                color: COLORS.white,
                marginRight: 20,
              }}
            >
              {product.tenSanPham}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsFavorite(!isFavorite);
                handleFavorite();
              }}
              activeOpacity={0.8}
              style={{
                ...styles.iconContainer,
                backgroundColor: isFavorite ? COLORS.red : COLORS.white,
              }}
            >
              <Icon
                name="favorite-border"
                size={28}
                style={{
                  color: isFavorite ? COLORS.white : COLORS.primary,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 16, color: COLORS.light }}>
              {product.moTa || "Trà sữa được làm từ sữa và trà"}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: 16,
              }}
            >
              Sizes:
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              {sizes.map((item, index) => {
                return (
                  <SecondaryButton
                    key={index}
                    title={item}
                    btnContainerStyle={{
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderRadius: 5,
                      marginLeft: 30,
                      backgroundColor:
                        selectedSize === index ? COLORS.red : COLORS.white,
                    }}
                    labelStyle={{
                      color:
                        selectedSize === index ? COLORS.white : COLORS.primary,
                    }}
                    onPress={() => setSelectedSize(index)}
                  />
                );
              })}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            <StepperInput
              value={qty}
              onAdd={() => {
                setQty(qty + 1);
              }}
              onMinus={() => {
                if (qty > 1) {
                  setQty(qty - 1);
                }
              }}
            />
            <View
              style={{
                backgroundColor: COLORS.white,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: COLORS.primary,
                }}
              >
                + {product.giaSanPham * qty}đ
              </Text>
            </View>
          </View>
          <SecondaryButton
            title="Thêm vào giỏ hàng"
            btnContainerStyle={{
              paddingVertical: 10,
              paddingHorizontal: 30,
              borderRadius: 30,
              backgroundColor: COLORS.white,
              marginVertical: 20,
            }}
            onPress={() => {
              // ToastAndroid.show(
              //   "Thêm sản phẩm thành công",
              //   ToastAndroid.BOTTOM
              // );
              addToCart();
              // navigation.navigate("Home")
            }}
          />
        </View>
      </ScrollView>
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
    paddingHorizontal: 20,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  detail: {
    paddingHorizontal: 20,
    paddingTop: 20,
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
});

export default DetailsScreen;
