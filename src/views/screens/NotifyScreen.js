import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SwipeListView } from "react-native-swipe-list-view";
import COLORS from "../../consts/colors";
import orderApi from "../../api/orderApi";

const NotifyScreen = ({ navigation }) => {
  const NotifyCard = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.notifyCard}>
        <Icon name="local-shipping" style={{ marginRight: 20 }} size={60} />
        <View style={{ flex: 1 }}>
          <Text style={{ textTransform: "uppercase", fontWeight: "bold" }}>
            voucher 50k free ship
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  function RenderCartList() {
    return (
      <ScrollView>
        <NotifyCard />
      </ScrollView>
    );
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.white,
        flex: 1,
        marginTop: 30,
      }}
    >
      <View style={styles.header}>
        <Text
          style={{ fontSize: 24, fontWeight: "bold" }}
          onPress={() => navigation.navigate("Home")}
        >
          Thông báo
        </Text>
      </View>
      {/* Cart List */}
      <RenderCartList />
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
    marginBottom: 10,
  },
  notifyCard: {
    height: 120,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
});

export default NotifyScreen;
