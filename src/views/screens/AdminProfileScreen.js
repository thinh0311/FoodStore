import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../../consts/colors";
import accountApi from "../../api/accountApi";

const AdminProfileScreen = ({ navigation }) => {
  const [token, setToken] = React.useState("");
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    const getToken = async () => {
      try {
        const result = await JSON.parse(await AsyncStorage.getItem("token"));
        setToken(result);
      } catch (error) {
        console.log(error, "token");
      }
    };
    getToken();
  }, []);

  React.useEffect(() => {
    const getUser = async () => {
      try {
        const result = await accountApi.getAccount(token);
        setUser(result);
      } catch (error) {
        console.log(error, "user", token);
      }
    };
    getUser();
  }, [token]);
  const removeToken = async () => {
    try {
      if (token !== "") {
        await AsyncStorage.removeItem("token");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const ProfileItem = ({ title, icon, arrow, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.menuItem}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name={icon} color={COLORS.primary} size={23} />
            <Text style={{ color: COLORS.dark, marginLeft: 15, fontSize: 16 }}>
              {title}
            </Text>
          </View>
          <Icon name={arrow} color={COLORS.dark} size={25} />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.white, paddingVertical: 20 }}
    >
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate("InfoUser", token)}
        >
          <View style={styles.header}>
            <Image
              source={require("../../assets/user.png")}
              style={{ height: 50, width: 50, borderRadius: 25 }}
            />
            <View style={{ marginLeft: 30 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 18 }}>Xin chào,</Text>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}
                >
                  {user.hoVaTen}
                </Text>
              </View>
              <Text style={{ marginTop: 5, fontSize: 16, color: COLORS.grey }}>
                @{user.tenTaiKhoan}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ marginLeft: 20, marginTop: 10 }}>
          <View style={styles.row}>
            <Icon name="room" color={COLORS.grey} size={20} />
            <Text style={{ color: COLORS.grey, marginLeft: 10 }}>
              {user.diaChi}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="local-phone" color={COLORS.grey} size={20} />
            <Text style={{ color: COLORS.grey, marginLeft: 10 }}>
              {user.soDienThoai}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color={COLORS.grey} size={20} />
            <Text style={{ color: COLORS.grey, marginLeft: 10 }}>
              @id.email
            </Text>
          </View>
        </View>
        <View style={styles.menuWrap}>
          <ProfileItem
            title="Đổi mật khẩu"
            icon="edit"
            arrow="keyboard-arrow-right"
            onPress={() => navigation.navigate("Password", [token])}
          />
          <ProfileItem
            title="Đăng xuất"
            icon="logout"
            arrow=""
            onPress={() => navigation.navigate("SignIn", [token])}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  row: {
    flexDirection: "row",
    marginTop: 10,
  },

  infoBoxWrap: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
    borderTopColor: COLORS.grey,
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
    marginTop: 20,
  },

  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrap: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    backgroundColor: "#fff2e6",
    paddingVertical: 15,
    borderRadius: 20,
    paddingHorizontal: 15,
  },
});

export default AdminProfileScreen;
