import React from "react";
import { Text, View, Modal } from "react-native";
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SecondaryButton } from "./Button";

function ModalComponent({ showModal, onPress, title, icon, textBtn, color }) {
  return (
    <Modal transparent visible={showModal}>
      <View
        activeOpacity={0}
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "80%",
            // height: 400,
            backgroundColor: COLORS.white,
            borderRadius: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <View style={{}}>
            <Icon
              name={icon}
              size={200}
              style={{ color: COLORS.green, color }}
            ></Icon>
          </View>
          <View
            style={{
              marginHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontSize: 25,
                textAlign: "center",
                color: COLORS.green,
                fontWeight: "bold",
                color,
              }}
            >
              {title}
            </Text>
          </View>
          <SecondaryButton
            title={textBtn}
            btnContainerStyle={{
              paddingVertical: 15,
              paddingHorizontal: 25,
              backgroundColor: COLORS.primary,
              borderRadius: 25,
              marginTop: 20,
            }}
            labelStyle={{ color: COLORS.white }}
            onPress={onPress}
          />
        </View>
      </View>
    </Modal>
  );
}

export default ModalComponent;
