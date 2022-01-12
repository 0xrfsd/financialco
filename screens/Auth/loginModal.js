import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  TextInput,
  Keyboard,
} from "react-native";
import { Modalize } from "react-native-modalize";

import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

import { useNavigation } from "@react-navigation/native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import AuthContext from "../../context/auth";

export function LoginModal(props) {
  const { user, signIn, setUser } = React.useContext(AuthContext);

  const [opened, setOpened] = useState(false);

  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');

  const [keyboardAvoid, setKeyboardAvoid] = useState(false);

  const modalizeRef = useRef(<Modalize />);

  const handleSignIn = async () => {
    const response = await signIn(email, senha);
    if (response) {
      setError(response);
    }
  };

  // Função executada apenas quando o componente for montado pela primeira vez
  useEffect(() => {
    let { setModal, modal, modalIndex } = props;

    modal[modalIndex] = {
      openModal: () => openModal(),
      closeModal: () => closeModal(),
    };

    setModal(modal);
  }, []);

  const handlerStateChange = (state) => {
    setOpened(state);
  };

  const openModal = () => {
    modalizeRef.current.open();
  };

  const closeModal = () => {
    modalizeRef.current.close();
  };

  const navigation = useNavigation();

  const [keyboardHeight, setKeyboardHeight] = React.useState(275);

  const [esqueceu, setEsqueceu] = React.useState(false);
  const [esqueceuEmail, setEsqueceuEmail] = React.useState("");
  const [esqueceuEnviado, setEsqueceuEnviado] = React.useState(false);

  const [error, setError] = React.useState("");

  const modalMargin = error.length > 0 ? -10 : -25;

  const format = /[ `!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;

  const cpfTextInput = React.createRef();
  const passwordTextInput = React.createRef();

  const renderHeader = useCallback(() => {
    return (
      <>
        <View style={{ padding: 20 }}>
          <Text style={{ color: "#333", fontSize: 20, fontWeight: "bold" }}>
            Entre com seu email
          </Text>
          <Text style={{ color: "#333", fontSize: 14 }}>
            Isso vai levar menos de um minuto
          </Text>
        </View>
      </>
    );
  }, [esqueceu]);

  const renderContent = useCallback(() => {
    return (
      <>
        <View style={{ marginTop: "-1%" }}>
          <TextInput
            onFocus={() => {
              setKeyboardAvoid(true);
            }}
            onSubmitEditing={() => {
              setKeyboardAvoid(false);
            }}
            ref={cpfTextInput}
            autoCorrect={false}
            style={{
              fontSize: 18,
              width: "90%",
              marginHorizontal: 20,
              marginVertical: 15,
              borderBottomColor: "#333",
              borderRadius: 10,
              color: "#333",
            }}
            value={email}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(email) => {
              setEmail(email);
              setError("");
            }}
          />
          <TextInput
            onFocus={() => {
              if (keyboardAvoid === false) {
                setKeyboardAvoid(true);
              } else {
                setKeyboardAvoid(true);
              }
            }}
            onBlur={() => {
              setKeyboardAvoid(false);
            }}
            ref={passwordTextInput}
            secureTextEntry={true}
            style={{
              fontSize: 18,
              width: "90%",
              marginHorizontal: 20,
              marginVertical: 15,
              color: "#333",
            }}
            onEndEditing={() => setKeyboardAvoid(false)}
            placeholder="Senha"
            onChangeText={(senha) => {
              setError("");
              setSenha(senha);
            }}
          />
          <View
            style={{
              marginTop: 10,
              paddingLeft: 20,
              paddingRight: 20,
              justifyContent: "space-between",
              display: "flex",
              flexDirection: "row",
            }}
          >
            {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
          </View>
          <TouchableOpacity
            onPress={handleSignIn}
            style={{
              fontSize: 18,
              width: "90%",
              marginLeft: "5%",
              marginRight: "5%",
              marginTop: "2%",
              borderRadius: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "purple",
                widht: "100%",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                margin: "0%",
                borderRadius: 5,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 16, color: "#fff" }}>
                Entrar agora
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setError("");
              setKeyboardAvoid(false);
              setEsqueceu(true);
            }}
            style={{
              fontSize: 18,
              width: "90%",
              marginLeft: "5%",
              marginRight: "5%",
              marginTop: 10,
              borderRadius: 10,
              color: "#333",
            }}
          >
            {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
            <View
              style={{
                backgroundColor: "#fff",
                widht: "100%",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                margin: "0%",
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  color: "#333",
                  fontSize: 16,
                  textDecorationLine: "underline",
                }}
              >
                Esqueceu sua senha?
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  }, [email, senha, error, esqueceu, esqueceuEnviado]);

  const modalHeight = 360 + modalMargin;
  const esqueceuMargin = Platform.OS === "ios" ? 5 : -5;
  const esqueceuMarginII = Platform.OS === "ios" ? -5 : -5;

  return (
    <>
      <Modalize
        handlePosition="inside"
        ref={modalizeRef}
        onOpened={() => handlerStateChange(true)}
        onClosed={() => {
          setError("");
          setEsqueceu(false);
          setKeyboardAvoid(false);
          handlerStateChange(false);
        }}
        modalHeight={
          error
            ? email
              ? esqueceu
                ? keyboardAvoid
                  ? modalHeight - 20 - 50 + keyboardHeight
                  : modalHeight - 30 - 50
                : keyboardAvoid
                ? modalHeight + keyboardHeight
                : modalHeight
              : esqueceu
              ? keyboardAvoid
                ? modalHeight - 20 + keyboardHeight
                : modalHeight - 20 + 10
              : keyboardAvoid
              ? modalHeight + keyboardHeight
              : modalHeight
            : email
            ? esqueceu
              ? keyboardAvoid
                ? modalHeight - 20 - 50 + keyboardHeight
                : modalHeight - 30 - 50 + esqueceuMargin
              : keyboardAvoid
              ? modalHeight + keyboardHeight
              : modalHeight
            : esqueceu
            ? keyboardAvoid
              ? modalHeight - 20 + keyboardHeight
              : modalHeight - 20 + esqueceuMarginII
            : keyboardAvoid
            ? modalHeight + keyboardHeight
            : modalHeight
        }
        HeaderComponent={() => renderHeader()}
      >
        {renderContent()}
      </Modalize>
    </>
  );
}

const s = StyleSheet.create({
  modal__header: {
    paddingVertical: 15,
    marginHorizontal: 15,

    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },

  modal__headerText: {
    fontSize: 15,
    fontWeight: "200",
  },

  content: {
    paddingHorizontal: 15,
  },

  content__row: {
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-between",

    paddingVertical: 15,

    height: 60,

    borderBottomColor: "#f9f9f9",
    borderBottomWidth: 1,
  },

  content__avatar: {
    width: 38,
    height: 38,

    marginRight: 15,

    overflow: "hidden",

    backgroundColor: "#eee",
    borderRadius: 19,
  },

  content__name: {
    fontSize: 16,
  },

  content__button: {
    alignItems: "center",
    justifyContent: "center",

    marginVertical: 20,
  },
});
