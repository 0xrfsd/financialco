import React, { createContext } from "react";
import { Alert } from "react-native";
import * as auth from "../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState();

  // o estado do usuario jamais deve conter o tipo do usuario, deve conter apenas o id e dados não sensiveis.
  // afim de autenticar a entidade do usuario a consulta deve ser feita no banco, pelo id

  React.useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await AsyncStorage.getItem("@Auth:user");
      const storagedToken = await AsyncStorage.getItem("@Auth:token");

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
      }
    }

    loadStoragedData();
  }, []);

  async function signIn(cpf, senha) {
    const response = await auth.signIn(cpf, senha);
    if (response.data.status === "Erro!") {
      return response.data.error;
    }
    if (response.data.status === "Usuário logado com sucesso!") {
      setUser(response.data.data.user);
      await AsyncStorage.setItem(
        "@Auth:user",
        JSON.stringify(response.data.data.user)
      );
      await AsyncStorage.setItem(
        "@Auth:token",
        JSON.stringify(response.data.data.token)
      );
    }
  }

  async function signUp(nome, email, telefone, cpf, senha) {
    const response = await auth.signUp(nome, email, telefone, cpf, senha);
    if (response.data.status === "Erro!") {
      return response.data.error;
    }
    if (response.data.status === "Usuário criado com sucesso!") {
      Alert.alert(
        `Seja muito bem-vindo(a) ${nome}`,
        "Sua conta foi registrada com sucesso!",
        [
          {
            text: "Obrigado!",
            onPress: async () => {
              setTimeout(() => {
                setUser(response.data.data.user);
              }, 1000);
              await AsyncStorage.setItem(
                "@Auth:user",
                JSON.stringify(response.data.data.user)
              );
              await AsyncStorage.setItem(
                "@Auth:token",
                JSON.stringify(response.data.data.token)
              );
            },
          },
        ]
      );
    }
  }

  async function signOut() {
    AsyncStorage.removeItem("@Auth:user").then(() => {
      setUser(null);
    });
    AsyncStorage.removeItem("@Auth:token").then(() => {
      setUser(null);
    });
    // AsyncStorage.clear().then(() => {});
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, setUser, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
