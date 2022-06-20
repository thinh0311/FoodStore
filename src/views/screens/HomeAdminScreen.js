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
import Icon2 from "react-native-vector-icons/FontAwesome5";
import categoryApi from "../../api/categoryApi";
import productApi from "../../api/productApi";
import accountApi from "../../api/accountApi";
import COLORS from "../../consts/colors";
import Button from "../components/Button";
import ProductItem from "./ProductItem";
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
        <ProductItem
          onPress={() => {}}
          name={product.tenSanPham}
          image={product.anhSanPham}
          price={product.giaSanPham}
          status={product.trangThaiSanPham == 1 ? "Đang bán" : "Nghỉ bán"}
          qty={product.soLuongTonKho}
          describe={product.moTa}
          key={product.maSanPham}
        />
      </TouchableHighlight>
    );
  };
  const [searchText, setSearchText] = React.useState("");
  const filteredProduct = () =>
    filteredItemByCategory.filter((eachProduct) =>
      searchText === ""
        ? eachProduct.tenSanPham
            .toLowerCase()
            .includes(searchText.toLowerCase())
        : eachProduct.tenSanPham.toLowerCase() === searchText.toLowerCase()
    );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 18 }}>Quản lý sản phẩm</Text>
        </View>
      </View>
      <View>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 10,
            marginVertical: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon
            name="search"
            size={15}
            color={"black"}
            style={{
              position: "absolute",
              top: 12,
              left: 10,
            }}
          />
          <TextInput
            autoCorrect={false}
            onChangeText={(text) => {
              setSearchText(text);
            }}
            style={{
              backgroundColor: "#C0C0C0",
              height: 40,
              flex: 1,
              marginEnd: 8,
              borderRadius: 5,
              opacity: 0.8,
              paddingStart: 30,
            }}
          />
          <Icon2 name="bars" size={30} color={"black"} />
        </View>
        <View
          style={{
            height: 100,
          }}
        >
          <View
            style={{
              height: 1,
              backgroundColor: "grey",
            }}
          />
          <ListCategory />
          <View style={{ height: 1, backgroundColor: "grey" }} />
        </View>
      </View>
      {filteredProduct().length > 0 ? (
        <FlatList
          data={filteredProduct()}
          renderItem={({ item }) => <Card product={item} />}
          keyExtractor={(eachProduct) => eachProduct.maSanPham}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 12,
            }}
          >
            No product found
          </Text>
        </View>
      )}
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
