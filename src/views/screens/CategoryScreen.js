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
import accountApi from "../../api/accountApi";
import COLORS from "../../consts/colors";
import FormInput from "../components/FormInput";
const { width } = Dimensions.get("screen");
const cardWidth = width / 1.15;
const buttonWidth = width / 3;

const CategoryScreen = ({ navigation }) => {
  const [token, setToken] = React.useState("");
  const [idProduct, setIdProduct] = React.useState("");
  const [category, setCategory] = React.useState([]);
  const [idCategory, setIdCategory] = React.useState();
  const [nameCategory, setNameCategory] = React.useState();
  const [listProduct, setListProduct] = React.useState([]);

  React.useEffect(() => {
    const getCategory = async () => {
      try {
        const result = await categoryApi.getAll();
        setCategory(result);
        setIdCategory(result[0].maDanhMuc);
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, []);

  const addCategory = async () => {
    try {
      const add = await categoryApi.addCategory({
        tenDanhMuc: nameCategory,
      });
      alert("Thêm thành công");
      navigation.navigate("Category");
    } catch (error) {
      console.log("Lỗi: ", error);
    }
  };

  const updateCategory = async () => {
    try {
      const add = await categoryApi.updateCategory(idCategory, {
        tenDanhMuc: nameCategory,
      });
      alert("Sửa thành công");
      navigation.navigate("Category");
    } catch (error) {
      console.log("Lỗi update: ", error);
    }
  };
  const deleteCategory = async () => {
    try {
      const add = await categoryApi.deleteCategory(idCategory);
      alert("Xóa thành công");
      navigation.navigate("Category");
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
            style={{
              borderWidth: 1,
              marginTop: 20,
              width: cardWidth,
              height: 50,
              borderRadius: 10,
              borderColor: COLORS.secondary,
              padding: 2,
            }}
            activeOpacity={0.8}
            onPress={() => {
              setIdCategory(item.maDanhMuc);
              setNameCategory(item.tenDanhMuc);
            }}
          >
            <View>
              <Text style={{ marginBottom: 10 }}>{item.maDanhMuc}</Text>
              <Text>{item.tenDanhMuc}</Text>
            </View>
          </TouchableOpacity>
        )}
      ></FlatList>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <Text style={{ fontSize: 18, marginTop: 20 }}>Thông tin danh mục</Text>
      </View>
      <View>
        <FormInput
          defaultValue={nameCategory}
          lable="Tên danh mục"
          containerStyle={{
            marginTop: 15,
          }}
          onChange={(value) => {
            setNameCategory(value);
          }}
        ></FormInput>
        <View style={styles.button}>
          <Button title="Thêm" onPress={() => addCategory()} />
          <Button title="Sửa" onPress={() => updateCategory()} />
          <Button title="Xóa" onPress={() => deleteCategory()} />
        </View>
      </View>
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 18 }}>Danh sách danh mục</Text>
        </View>
      </View>

      <ScrollView>
        <View>
          <ListCategory />
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

export default CategoryScreen;
