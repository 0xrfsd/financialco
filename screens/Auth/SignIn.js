import React from "react";
import {
  View,
  Pressable,
  TouchableOpacity,
  Text,
  Platform,
  TextInput,
} from "react-native";

import { LoginModal } from "./loginModal";
import AuthContext from "../../context/auth";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SignIn = () => {
  const [error, setError] = React.useState(undefined);

  const navigation = useNavigation();

  const [light, setLight] = React.useState(true);

  const [modal, setModal] = React.useState([]);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: light ? "#FFF" : "#000",
          paddingHorizontal: 20,
          paddingTop: Platform.OS === "ios" ? "15%" : 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            // borderBottomWidth: 1,
            // borderBottomColor: "#eee",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              display: "flex",
              height: 40,
              width: "auto",
              padding: 7,
              backgroundColor: "#EEE",
              borderRadius: 10,
              flexDirection: "row",
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign
              name="arrowleft"
              size={24}
              color={light ? "#333" : "#FFF"}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            marginTop: 10,
            color: "#5C2DBF",
            fontSize: 50,
            fontWeight: "bold",
          }}
        >
          SignIn
        </Text>
        <Text
          style={{
            color: "#5C2DBF",
            fontSize: 18,
          }}
        >
          conecte-se agora mesmo ao{" "}
          <Text style={{ fontWeight: "bold" }}>Jobs</Text>
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: Platform.OS === "ios" ? 30 : 20,
          }}
        >
          <TouchableOpacity
            onPress={() => modal[0].openModal()}
            style={{
              marginTop: 10,
              height: "auto",
              display: "flex",
              flexDirection: "row",
              padding: 15,
              width: "100%",
              borderRadius: 5,
              borderBottomWidth: 1,
              borderBottomColor: "#eee",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#EEE",
            }}
          >
            <Text style={{ fontSize: 18, color: "#000" }}>
              Login com o seu email
            </Text>
            <MaterialIcons name="mail" size={20} color="#5c2dbf" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 10,
              height: "auto",
              display: "flex",
              flexDirection: "row",
              padding: 15,
              width: "100%",
              borderRadius: 5,
              borderBottomWidth: 1,
              borderBottomColor: "#eee",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#EEE",
            }}
          >
            <Text style={{ fontSize: 18, color: "#000" }}>
              Login com o seu telefone
            </Text>
            <MaterialIcons name="phone" size={20} color="#5c2dbf" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 10,
              height: "auto",
              display: "flex",
              flexDirection: "row",
              padding: 15,
              width: "100%",
              borderRadius: 5,
              borderBottomWidth: 1,
              borderBottomColor: "#eee",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#EEE",
            }}
          >
            <Text style={{ fontSize: 18, color: "#000" }}>
              Login com o Google
            </Text>
            <AntDesign name="google" size={20} color="#5c2dbf" />
          </TouchableOpacity>
        </View>
      </View>
      <LoginModal modal={modal} setModal={setModal} modalIndex={0} />
    </>
  );
};

export default SignIn;
