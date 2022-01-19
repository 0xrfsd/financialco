import React from "react";
import {
  View,
  Pressable,
  TouchableOpacity,
  Platform,
  Text,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { LoginModal } from "./loginModal";
import AuthContext from "../../context/auth";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
  const [error, setError] = React.useState(undefined);

  const navigation = useNavigation();
  const [nome, setNome] = React.useState(undefined);
  const [email, setEmail] = React.useState(undefined);
  const [telefone, setTelefone] = React.useState(undefined);
  const [cpf, setCpf] = React.useState(undefined);
  const [senha, setSenha] = React.useState(undefined);
  const [repita, setRepita] = React.useState(undefined);
  const [light, setLight] = React.useState(true);

  const [modal, setModal] = React.useState([]);

  const [focused, setFocused] = React.useState(undefined);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: light ? "#FFF" : "#000",
        padding: 20,
        paddingTop: Platform.OS === "ios" ? "15%" : 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
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

      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%", paddingRight: focused ? 10 : 0 }}
      >
        <Text
          style={{
            marginTop: 10,
            color: "#5C2DBF",
            fontSize: 50,
            fontWeight: "bold",
          }}
        >
          SignUp
        </Text>
        <Text
          style={{
            color: "#5C2DBF",
            fontSize: 18,
          }}
        >
          conecte-se e faça parte do{" "}
          <Text style={{ fontWeight: "bold" }}>Jobs</Text>
        </Text>
        <View
          style={{
            marginTop: 20,
            width: "100%",
            height: 50,
            backgroundColor: "#FFF",
            borderRadius: 5,
            paddingLeft: light ? 0 : 5,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "40%" }}>
            <Text style={{ fontWeight: "bold" }}>Nome Completo</Text>
          </View>
          <TextInput
            value={nome}
            autoCapitalize="words"
            onChangeText={(nome) => {
              setNome(nome);
            }}
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
            style={{
              borderWidth: 1,
              borderColor: "#eee",
              height: 49,
              width: "60%",
              backgroundColor: "#FFF",
              borderRadius: 5,
              padding: 10,
            }}
          />
        </View>
        <View
          style={{
            marginTop: 10,
            width: "100%",
            height: 50,
            backgroundColor: "#FFF",
            borderRadius: 5,
            paddingLeft: light ? 0 : 5,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "40%" }}>
            <Text style={{ fontWeight: "bold" }}>Celular (+55)</Text>
          </View>
          <TextInput
            value={telefone}
            maxLength={11}
            keyboardType="number-pad"
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
            onChangeText={(telefone) => setTelefone(telefone)}
            style={{
              borderWidth: 1,
              borderColor: "#eee",
              height: 49,
              width: "60%",
              backgroundColor: "#FFF",
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="Utilize somente números"
          />
        </View>
        <View
          style={{
            marginTop: 10,
            width: "100%",
            height: 50,
            backgroundColor: "#FFF",
            borderRadius: 5,
            paddingLeft: light ? 0 : 5,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "40%" }}>
            <Text style={{ fontWeight: "bold" }}>E-mail</Text>
          </View>
          <TextInput
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
            value={email}
            onChangeText={(email) => setEmail(email)}
            style={{
              borderWidth: 1,
              borderColor: "#eee",
              height: 49,
              width: "60%",
              backgroundColor: "#FFF",
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="e.g. contato@financial.co"
          />
        </View>
        <View
          style={{
            marginTop: 10,
            width: "100%",
            height: 50,
            backgroundColor: "#FFF",
            borderRadius: 5,
            paddingLeft: light ? 0 : 5,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "40%" }}>
            <Text style={{ fontWeight: "bold" }}>CPF</Text>
          </View>
          <TextInput
            value={cpf}
            keyboardType="number-pad"
            maxLength={11}
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
            onChangeText={(cpf) => setCpf(cpf)}
            style={{
              borderWidth: 1,
              borderColor: "#eee",
              height: 49,
              width: "60%",
              backgroundColor: "#FFF",
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="Utilize somente números"
          />
        </View>
        <View
          style={{
            marginTop: 10,
            width: "100%",
            height: 50,
            backgroundColor: "#FFF",
            borderRadius: 5,
            paddingLeft: light ? 0 : 5,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "40%" }}>
            <Text style={{ fontWeight: "bold" }}>Sua Senha</Text>
          </View>
          <TextInput
            value={senha}
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
            onChangeText={(senha) => setSenha(senha)}
            secureTextEntry={true}
            style={{
              borderWidth: 1,
              borderColor: "#eee",
              height: 49,
              width: "60%",
              backgroundColor: "#FFF",
              borderRadius: 5,
              padding: 10,
            }}
          />
        </View>
        <View
          style={{
            marginTop: 10,
            width: "100%",
            height: 50,
            backgroundColor: "#FFF",
            borderRadius: 5,
            paddingLeft: light ? 0 : 5,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "40%" }}>
            <Text style={{ fontWeight: "bold" }}>Repita sua Senha</Text>
          </View>
          <TextInput
            value={repita}
                        onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
            onChangeText={(repita) => {
              setRepita(repita);
            }}
            secureTextEntry={true}
            style={{
              borderWidth: 1,
              borderColor: "#eee",
              height: 49,
              width: "60%",
              backgroundColor: "#FFF",
              borderRadius: 5,
              padding: 10,
            }}
          />
        </View>
        <Text
          style={{
            marginTop: 25,
            fontSize: 12,
            color: "#777",
            textAlign: "left",
            width: "100%",
          }}
        >
          Sua senha deve conter no mínimo 6 caracteres, um número, uma letra
          maiúscula e um caractere especial (símbolo).
        </Text>
        {error ? (
          <Text style={{ fontWeight: "bold", color: "red", marginTop: 20 }}>
            {error}
          </Text>
        ) : null}
        <TouchableOpacity
          onPress={() => {
            if (!nome) {
              setError("Qual é o seu nome");
            } else if (!telefone) {
              setError("Qual é o seu telefone");
            } else if (!email) {
              setError("Qual é o seu email");
            } else if (!cpf) {
              setError("Qual é o seu cpf");
            } else if (!senha) {
              setError("Qual é a sua senha");
            } else if (!repita) {
              setError("Repita sua senha");
            } else {
              handleSignUp();
            }
          }}
          style={{
            marginTop: error ? 10 : 20,
            marginBottom: 30,
            height: 50,
            width: "100%",
            backgroundColor: "purple",
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", color: "#FFF" }}>
            Criar a sua conta
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            marginBottom: 10,
            fontSize: 14,
            color: "#aaa",
            textAlign: "center",
            width: "100%",
          }}
        >
          Ao criar sua conta você concorda com nossos{" "}
          <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>
            Termos de Uso
          </Text>{" "}
          e com a{" "}
          <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>
            Politíca de Privacidade
          </Text>
          .
        </Text>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignUp;
