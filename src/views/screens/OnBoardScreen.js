import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../consts/colors";
import Button from "../components/Button";

const OnBoardScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.white, alignItems: "center" }}
    >
      <View
        style={{
          height: 400,
          width: "90%",
        }}
      >
        <Image
          style={{
            width: "100%",
            resizeMode: "contain",
            top: -300,
            borderRadius: 200,
          }}
          source={require("../../assets/product.png")}
        />
      </View>
      <View style={styles.textContainer}>
        <View>
          <Text
            style={{ fontSize: 32, fontWeight: "bold", textAlign: "center" }}
          >
            Delicious Food
          </Text>
          <Text
            style={{
              marginTop: 20,
              fontSize: 18,
              textAlign: "center",
              color: COLORS.grey,
            }}
          >
            We help you to find best and delicious food
          </Text>
        </View>
        <View style={styles.indicatorContainer}>
          <View style={styles.currentIndicator}></View>
          <View style={styles.indicator}></View>
          <View style={styles.indicator}></View>
        </View>
        <Button
          title="Get Started"
          onPress={() => navigation.navigate("SignIn")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    paddingHorizontal: 50,
    justifyContent: "space-between",
    paddingBottom: 40,
  },

  indicatorContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  currentIndicator: {
    height: 12,
    width: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    marginRight: 5,
  },

  indicator: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: COLORS.grey,
    marginHorizontal: 5,
  },
});

export default OnBoardScreen;
