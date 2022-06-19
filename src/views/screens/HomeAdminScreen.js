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
import accountApi from "../../api/accountApi";
import COLORS from "../../consts/colors";
import Button from "../components/Button";
const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;

const HomeAdminScreen = ({ navigation }) => {
  const [token, setToken] = React.useState("");
  const [idProduct, setIdProduct] = React.useState("");
  const [category, setCategory] = React.useState([]);
  const [idCategory, setIdCategory] = React.useState();
  const [filteredItemByCategory, setFilteredItemByCategory] = React.useState(
    []
  );

  React.useEffect(() => {
    const getToken = async () => {
      try {
        const result = await JSON.parse(await AsyncStorage.getItem("token"));
        setToken(result);
      } catch (error) {}
    };

    const getCategory = async () => {
      try {
        const result = await categoryApi.getAll();
        setCategory(result);
        setIdCategory(result[0].maDanhMuc);
      } catch (error) {
        // console.log(error);
      }
    };
    getCategory();
    getToken();
  }, []);

  React.useEffect(() => {
    const getProducts = async () => {
      try {
        const result = await productApi.getProductsByCategory(idCategory);
        setFilteredItemByCategory(result);
      } catch (error) {
        // console.log(error);
      }
    };
    getProducts();
  }, [idCategory]);

  const deleteProduct = async () => {
    try {
      const del = await productApi.deleteProduct(idProduct);
      alert("Xóa thành công");
      navigation.navigate("HomeAdmin");
    } catch (error) {
      console.log("Lỗi: ", error);
    }
  };

  const ListCategory = () => {
    return (
      <FlatList
        horizontal
        data={category}
        keyExtractor={(item, index) => `${item.maDanhMuc}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesListContainer}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setIdCategory(item.maDanhMuc);
            }}
          >
            <View
              style={{
                backgroundColor:
                  idCategory == item.maDanhMuc
                    ? COLORS.primary
                    : COLORS.secondary,
                ...styles.categoryBtn,
              }}
            >
              <Image
                source={require("../../assets/product.png")}
                style={styles.imageCardCategory}
              />
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontWeight: "bold",
                  color:
                    idCategory == item.maDanhMuc
                      ? COLORS.white
                      : COLORS.primary,
                }}
              >
                {item.tenDanhMuc}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      ></FlatList>
    );
  };

  const Card = ({ product }) => {
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate("DetailProduct", [product.maSanPham, token])
        }
        onLongPress={() => {
          setIdProduct(product.maSanPham);
          Alert.alert("Cảnh báo", "Bạn có muốn xóa sản phẩm này?", [
            { text: "Không", onPress: () => {} },
            {
              text: "Có",
              onPress: () => {
                deleteProduct();
              },
            },
          ]);
        }}
      >
        <View style={styles.card}>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Image
              source={{ uri: product.anhSanPham }}
              style={{ height: 120, width: 120, borderRadius: 10 }}
            />
          </View>
          <View style={{ marginTop: 10, marginBottom: 5 }}>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {product.tenSanPham}
            </Text>
          </View>
          <View
            style={{
              marginTop: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {product.giaSanPham}đ
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 18 }}>Quản lý sản phẩm</Text>
        </View>
      </View>

      <View>
        <ListCategory />
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        data={filteredItemByCategory}
        keyExtractor={(item) => item.maSanPham}
        renderItem={({ item }) => <Card product={item} />}
      ></FlatList>
      <View
        style={{
          marginBottom: 15,
          marginRight: 15,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={styles.btnAddProduct}
          onPress={() => navigation.navigate("AddProduct")}
        >
          <Icon name="add" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  inputContainer: {
    flex: 1,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 50,
  },
  sortBtn: {
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 37,
    marginRight: 7,
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 1,
    flexDirection: "row",
  },
  categoryBtnImg: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    height: 210,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
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
  imageCardCategory: {
    height: 35,
    width: 35,
    resizeMode: "cover",
    borderRadius: 35,
  },
});

export default HomeAdminScreen;
