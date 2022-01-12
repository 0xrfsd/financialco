import React from "react";
import { Platform } from "react-native";

import Home from "../screens/User/Home";
import Pesquisar from "../screens/User/Pesquisar";
import Vaga from "../screens/User/Vaga";
import Perfil from "../screens/User/Profile";
import Painel from "../screens/User/Painel";

import { Ionicons, AntDesign } from "@expo/vector-icons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const UserStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "Painel") {
            iconName = focused
              ? "ios-file-tray-stacked"
              : "ios-file-tray-stacked-outline";
          } else if (route.name === "Perfil") {
            iconName = focused ? "person" : "person-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={30} color={color} />;
        },
        tabBarActiveTintColor: "purple",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 65,
          paddingVertical: 10,
          paddingBottom: Platform.OS === "ios" ? 20 : 10,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={Home}
      />
      <Tab.Screen
        name="Painel"
        options={{ headerShown: false }}
        component={Painel}
      />
      <Tab.Screen
        name="Perfil"
        options={{ headerShown: false }}
        component={Perfil}
      />
    </Tab.Navigator>
  );
};

const UserRoutes = () => {
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name="Root"
        component={HomeTab}
        options={{ headerShown: false }}
      />
      <UserStack.Group screenOptions={{ presentation: "modal" }}>
        <UserStack.Screen
          name="Pesquisar"
          component={Pesquisar}
          options={{ headerShown: false }}
        />

        <UserStack.Screen
          name="Vaga"
          component={Vaga}
          options={{ headerShown: false }}
        />
        <UserStack.Screen
          name="Perfil"
          component={Perfil}
          options={{ headerShown: false }}
        />
      </UserStack.Group>
    </UserStack.Navigator>
  );
};

export default UserRoutes;
