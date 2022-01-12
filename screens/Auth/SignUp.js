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

const SignUp = () => {
  const [nome, setNome] = React.useState(undefined);
  const [telefone, setTelefone] = React.useState(undefined);
  const [email, setEmail] = React.useState(undefined);
  const [senha, setSenha] = React.useState(undefined);

  const [error, setError] = React.useState(undefined);

  const { user, signUp } = React.useContext(AuthContext);

  const handleSignUp = async () => {
    const response = await signUp(nome, telefone, email, senha);
    if (response) {
      setError(response);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <Text
        style={{ color: "#fff", fontSize: 26, marginTop: 20, marginLeft: 20 }}
      >
        Seja bem-vindo!
      </Text>
      <Text style={{ color: "#dddd", fontSize: 18, marginLeft: 20 }}>
        Faça seu cadastro
      </Text>
      <TextInput
        style={{ height: 50, fontSize: 22, width: "100%" }}
        placeholder="Digite seu nome"
        onChangeText={(e) => setNome(e)}
      />
      <TextInput
        style={{ height: 50, fontSize: 22, width: "100%" }}
        placeholder="Digite seu telefone"
        onChangeText={(e) => setTelefone(e)}
      />
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
        onPress={() => handleSignUp()}
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
          Regsitrar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
