import React from "react";
import { View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../../consts/colors";
import { SecondaryButton } from "../components/Button";

function SuccessScreen({ navigation }) {
  const [token, setToken] = React.useState("");
  React.useEffect(() => {
    const getToken = async () => {
      try {
        const result = await JSON.parse(await AsyncStorage.getItem("token"));
        setToken(result);
      } catch (error) {}
    };
    getToken();
  }, []);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: COLORS.primary,
        marginTop: 120,
      }}
    >
      <Icon name="check-circle-outline" size={200} color={COLORS.green} />
      <Text style={{ fontSize: 24, color: COLORS.green, marginTop: 10 }}>
        Đặt hàng thành công
      </Text>
      <SecondaryButton
        title="Trở về"
        btnContainerStyle={{
          backgroundColor: COLORS.primary,
          paddingVertical: 15,
          paddingHorizontal: 25,
          borderRadius: 20,
          marginTop: 50,
        }}
        labelStyle={{ color: COLORS.white }}
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}

export default SuccessScreen;
