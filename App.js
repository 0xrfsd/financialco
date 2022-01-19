import "react-native-gesture-handler";
import * as React from "react";
import { StatusBar, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/auth";

import Routes from "./routes";

const App = () => {
  return (
    <>
      <StatusBar
        barStyle={Platform.OS === "android" ? "dark-content" : "dark-content"}
      />
      <NavigationContainer>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
