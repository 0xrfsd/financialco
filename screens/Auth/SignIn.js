import React from "react";
import {
  View,
  Pressable,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";

import AuthContext from "../../context/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SignIn = () => {
  const [email, setEmail] = React.useState(undefined);
  const [senha, setSenha] = React.useState(undefined);

  const [error, setError] = React.useState(undefined);

  const { signed, user, signIn } = React.useContext(AuthContext);

  const handleSignIn = async () => {
    const response = await signIn(cpf, senha);
    if (response) {
      setError(response);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <Text
        style={{ color: "#fff", fontSize: 26, marginTop: 20, marginLeft: 20 }}
      >
        Seja bem-vindo de volta!
      </Text>
      <Text style={{ color: "#dddd", fontSize: 18, marginLeft: 20 }}>
        Faça seu login
      </Text>
      <TextInput
        style={{ height: 50, fontSize: 22, width: "100%" }}
        placeholder="Digite seu email"
        onChangeText={(e) => setEmail(e)}
      />
      <TextInput
        style={{ height: 50, fontSize: 22, width: "100%" }}
        placeholder="Digite sua senha"
        secureTextEntry={true}
        onChangeText={(e) => setSenha(e)}
      />
      <TouchableOpacity
        onPress={() => handleSignIn()}
        style={{
          height: 50,
          width: "100%",
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000" }}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
