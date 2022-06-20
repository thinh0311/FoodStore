import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

// function _getColorFromStatus(status) {
//   /*
//     if(status.toLowerCase().trim() == 'opening now') {
//         return colors.success
//     } else if(status.toLowerCase().trim() == 'closing soon') {
//         return colors.alert
//     } else if(status.toLowerCase().trim() == 'comming soon') {
//         return colors.warning
//     }
//     return colors.success
//     */
//   return status.toLowerCase().trim() == "opening now"
//     ? colors.success
//     : status.toLowerCase().trim() == "closing soon"
//     ? colors.alert
//     : status.toLowerCase().trim() == "comming soon"
//     ? colors.warning
//     : colors.success;
// }
const ProductItem = ({
  name,
  price,
  status,
  qty,
  image,
  describe,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 150,
        paddingTop: 20,
        paddingStart: 10,
        flexDirection: "row",
      }}
    >
      <Image
        style={{
          width: 100,
          height: 100,
          resizeMode: "cover",
          borderRadius: 10,
          marginRight: 15,
        }}
        source={
          image == ""
            ? require("../../assets/product.png")
            : {
                uri: image,
              }
        }
      />
      <View
        style={{
          flex: 1,
          marginRight: 10,
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {name}
        </Text>
        <View
          style={{
            height: 1,
            backgroundColor: "black",
          }}
        />

        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              color: "black",
              fontSize: 14,
            }}
          >
            Trạng thái:{" "}
          </Text>
          <Text
            style={{
              //color: _getColorFromStatus(status),
              fontSize: 14,
            }}
          >
            {status}
          </Text>
        </View>
        <Text
          style={{
            color: "black",
            fontSize: 14,
          }}
        >
          Giá: {price}đ
        </Text>

        <Text
          style={{
            color: "black",
            fontSize: 14,
          }}
        >
          Số lượng: {qty}
        </Text>
        <Text
          style={{
            color: "black",
            fontSize: 14,
          }}
        >
          Mô tả: {describe}
        </Text>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Icon style={{ paddingEnd: 5 }} name="facebook" size={18} />

          <Icon name="twitter" style={{ paddingEnd: 5 }} size={18} />

          <Icon name="instagram" size={18} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ProductItem;
