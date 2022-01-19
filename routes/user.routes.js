import React from "react";
import { Platform } from "react-native";

import Home from "../screens/User/Home";
import Pesquisar from "../screens/User/Pesquisar";
import Vaga from "../screens/User/Vaga";
import Vagas from "../screens/User/Vagas";
import Perfil from "../screens/User/Profile";
import Painel from "../screens/User/Painel";

import { Ionicons, AntDesign } from "@expo/vector-icons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const UserStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const UserRoutes = () => {
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name="Root"
        component={Home}
        options={{ headerShown: false }}
      />
      <UserStack.Group screenOptions={{ presentation: "modal" }}>
        <UserStack.Screen
          name="Perfil"
          component={Perfil}
          options={{ headerShown: false }}
        />
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
          name="Vagas"
          component={Vagas}
          options={{ headerShown: false }}
        />
      </UserStack.Group>
    </UserStack.Navigator>
  );
};

export default UserRoutes;
