import React from "react";
import { View, Text, TextInput } from "react-native";
import COLORS from "../../consts/colors";

const FormInput = ({
  lable,
  containerStyle,
  placeholder,
  inputStyle,
  prependComponent,
  appendComponent,
  onChange,
  secureTextEntry,
  keyboardType = "default",
  autoCompleteType = "off",
  autoCapitalize = "none",
  errorMsg = "",
  defaultValue,
  value,
}) => {
  return (
    <View
      style={{
        marginBottom: 15,
      }}
    >
      {/* Lable & Error msg */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: -10,
        }}
      >
        <Text style={{ color: COLORS.grey, fontSize: 18 }}>{lable}</Text>
        <Text style={{ color: COLORS.red, fontSize: 18 }}>{errorMsg}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          height: 55,
          paddingHorizontal: 15,
          marginTop: 15,
          borderRadius: 15,
          backgroundColor: COLORS.light,
        }}
      >
        {prependComponent}
        <TextInput
          defaultValue={defaultValue}
          style={{
            flex: 1,
            paddingHorizontal: 5,
            fontSize: 18,
          }}
          placeholder={placeholder}
          placeholderTextColor={COLORS.grey}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCompleteType={autoCompleteType}
          autoCapitalize={autoCapitalize}
          onChangeText={(text) => onChange(text)}
        />
        {appendComponent}
      </View>
    </View>
  );
};

export default FormInput;
