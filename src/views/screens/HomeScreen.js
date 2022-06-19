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
  FlatList,
  TouchableHighlight,
} from "react-native";
// import {
//   FlatList,
//   ScrollView,
//   TouchableHighlight,
// } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import categoryApi from "../../api/categoryApi";
import productApi from "../../api/productApi";
import accountApi from "../../api/accountApi";
import COLORS from "../../consts/colors";
const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;

const HomeScreen = ({ navigation }) => {
  const [token, setToken] = React.useState("");
  const [category, setCategory] = React.useState([]);
  const [idCategory, setIdCategory] = React.useState();
  const [filteredItemByCategory, setFilteredItemByCategory] = React.useState(
    []
  );
  const [user, setUser] = React.useState({});

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
    const getUser = async () => {
      try {
        const result = await accountApi.getAccount(token);
        setUser(result);
      } catch (error) {}
    };
    getUser();
  }, [token]);

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
          navigation.navigate("DetailsScreen", [product.maSanPham, token])
        }
      >
        <View style={styles.card}>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Image
              source={
                { uri: product.anhSanPham } ||
                require("../../assets/product.png")
              }
              style={{
                height: 120,
                width: 120,
                borderRadius: 10,
                resizeMode: "cover",
              }}
            />
          </View>
          <View style={{ marginTop: 15, height: 40 }}>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {product.tenSanPham.length > 25
                ? `${product.tenSanPham.substring(0, 25)}...`
                : product.tenSanPham}
            </Text>
            {/* <Text style={{ fontSize: 12, color: COLORS.grey }}>
              {product.moTa}
            </Text> */}
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
            <View style={styles.addToCartBtn}>
              <Icon name="add" size={20} color={COLORS.white} />
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 18 }}>Xin chào,</Text>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>
              {user.hoVaTen}
            </Text>
          </View>
          <Text style={{ marginTop: 5, fontSize: 16, color: COLORS.grey }}>
            Bạn muốn mua gì hôm nay?
          </Text>
        </View>
        <Image
          source={require("../../assets/product.png")}
          style={{ height: 50, width: 50, borderRadius: 25 }}
        />
      </View>
      <View
        style={{ marginTop: 40, flexDirection: "row", paddingHorizontal: 20 }}
      >
        <View style={styles.inputContainer}>
          <Icon name="search" style={{ fontSize: 28 }} />
          <TextInput
            style={{ flex: 1, fontSize: 16, paddingLeft: 5 }}
            placeholder="Tìm kiếm đồ uống"
            onChangeText={(value) => console.log(value)}
          />
        </View>
        <View style={styles.sortBtn}>
          <Icon name="tune" size={32} color={COLORS.white} />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
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
    height: 45,
    marginRight: 7,
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 5,
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
    height: 240,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 30,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
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

export default HomeScreen;
