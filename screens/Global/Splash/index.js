import React from "react";
import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";

import Logo from "../../../assets/financial.png";

const Splash = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
      }}
    >
      <Image
        source={Logo}
        style={{ height: 130, width: 80, marginTop: "20%" }}
      />
    </View>
  );
};

export default Splash;
