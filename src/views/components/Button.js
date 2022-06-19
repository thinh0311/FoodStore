import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import COLORS from "../../consts/colors";

const Button = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={disabled}>
      <View style={styles.btnContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const SecondaryButton = ({
  title,
  onPress,
  btnContainerStyle,
  labelStyle,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View
        style={{
          backgroundColor: COLORS.white,
          justifyContent: "center",
          alignItems: "center",
          ...btnContainerStyle,
        }}
      >
        <Text
          style={{
            color: COLORS.primary,
            fontWeight: "bold",
            fontSize: 16,
            ...labelStyle,
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  btnSecondaryContainer: {
    backgroundColor: COLORS.white,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Button;
