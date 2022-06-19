import "react-native-gesture-handler";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import { View } from "react-native";

import CartScreen from "../screens/CartScreen";
import NotifyScreen from "../screens/NotifyScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HomeAdminScreen from "../screens/HomeAdminScreen";
import HomeScreen from "../screens/HomeScreen";

const Tab = createBottomTabNavigator();

const BottomNavigator = ({ navigation }) => {
  const [reload, setReload] = React.useState(false);
  React.useEffect(() => {
    setReload(!reload);
  }, [navigation]);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.primary,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home-filled" color={color} size={28} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Notify"
        component={NotifyScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="notifications" color={color} size={28} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Search"
        component={HomeAdminScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                height: 60,
                width: 60,
                justifyContent: "center",
                alignItems: "center",
                top: -15,
                backgroundColor: COLORS.white,
                borderColor: COLORS.primary,
                borderWidth: 2,
                borderRadius: 30,
                elevation: 5,
              }}
            >
              <Icon name="search" color={COLORS.primary} size={28} />
            </View>
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="shopping-cart" color={color} size={28} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="person" color={color} size={28} />
          ),
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
