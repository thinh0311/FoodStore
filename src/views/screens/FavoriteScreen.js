import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import favoriteApi from "../../api/favoriteApi";
import COLORS from "../../consts/colors";
const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;

const FavoriteScreen = ({ navigation, route }) => {
  const [favoritesList, setFavoritesList] = React.useState([]);
  const token = route.params;

  React.useEffect(() => {
    const getFavoritesList = async (favorites) => {
      try {
        const result = await favoriteApi.getFavorite(token);
        setFavoritesList(result);
      } catch (error) {
        console.log(error, "getFavoritesList");
      }
    };
    getFavoritesList();
  }, []);

  const Card = ({ product }) => {
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate("DetailsScreen", [product.maSanPham, ...token])
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
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.white, marginTop: 30 }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.header}>
          <Icon name="arrow-back-ios" size={28} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Ưa thích</Text>
        </View>
      </TouchableOpacity>
      <FlatList
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        numColumns={2}
        data={favoritesList}
        renderItem={({ item }) => <Card product={item} />}
      ></FlatList>
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
});

export default FavoriteScreen;
