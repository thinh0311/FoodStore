import "react-native-gesture-handler";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/FontAwesome";
import COLORS from "../../consts/colors";
import { View } from "react-native";
import HomeAdminScreen from "../screens/HomeAdminScreen";
import CartScreen from "../screens/CartScreen";
import NotifyScreen from "../screens/NotifyScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CategoryScreen from "../screens/CategoryScreen";
import OrderAdminScreen from "../screens/OderAdminScreen";
import AcountAdminScreen from "../screens/AcountAdminScreen";
import AdminProfileScreen from "../screens/AdminProfileScreen";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.primary,
      }}
    >
      <Tab.Screen
        name="AdminHome"
        component={HomeAdminScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon2 name="product-hunt" color={color} size={28} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="playlist-add-check" color={color} size={28} />
          ),
          unmountOnBlur: true,
        }}
      />

      <Tab.Screen
        name="Order"
        component={OrderAdminScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="local-offer" color={color} size={28} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Acount"
        component={AcountAdminScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon2 name="percent" color={color} size={28} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={AdminProfileScreen}
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
