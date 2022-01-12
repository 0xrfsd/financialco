import React from "react";
import Home from "../screens/Staff/Home";
import Vaga from "../screens/Staff/Vaga";
import AddVaga from "../screens/Staff/Vaga/add";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const StaffStack = createNativeStackNavigator();

const StaffRoutes = () => {
  return (
    <StaffStack.Navigator>
      <StaffStack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={Home}
      />
      <StaffStack.Group screenOptions={{ presentation: "modal" }}>
        <StaffStack.Screen
          name="AddVaga"
          options={{ headerShown: false }}
          component={AddVaga}
        />
        <StaffStack.Screen
          name="Vaga"
          options={{ headerShown: false }}
          component={Vaga}
        />
      </StaffStack.Group>
    </StaffStack.Navigator>
  );
};

export default StaffRoutes;
