import { AntDesign } from "@expo/vector-icons";
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
import AuthContext from "../../../context/auth";

import { useNavigation } from "@react-navigation/native";

export function Modal(props) {
  const [opened, setOpened] = useState(false);

  const [keyboardAvoid, setKeyboardAvoid] = useState(false);

  const modalizeRef = useRef(<Modalize />);

  const { user, signOut } = React.useContext(AuthContext);

  const navigation = useNavigation();

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

  const renderHeader = useCallback(() => {
    return (
      <>
        <View style={{ padding: 20 }}>
          <Text style={{ color: "#333", fontSize: 20, fontWeight: "bold" }}>
            Menu
          </Text>
        </View>
      </>
    );
  }, []);

  const renderContent = useCallback(() => {
    const Item = ({ title, icon }) => {
      return (
        <TouchableOpacity
          onPress={() => {
            if (title === "Sair da sua conta") {
              signOut();
            } else if (title === "Sua Conta") {
              navigation.navigate("Perfil");
            }
          }}
          style={{
            height: 50,
            width: "100%",
            marginTop: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 5,
            backgroundColor: "#fff",
            paddingHorizontal: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#f3f3f3",
          }}
        >
          <AntDesign name={icon} size={22} color="#333" />
          <Text style={{ color: "#333", fontWeight: "bold", marginLeft: 5 }}>
            {title}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <>
        <View style={{ padding: 20 }}>
          <Item title="Vagas Abertas" icon="folderopen" />
          <Item title="Seu Curriculo" icon="profile" />
          <Item title="Mensagens" icon="message1" />
          <Item title="Vagas Salvas" icon="book" />
          <Item title="Sua Conta" icon="user" />
          <Item title="Sair da sua conta" icon="export" />
        </View>
      </>
    );
  }, []);

  const modalHeight = 400;

  return (
    <>
      <Modalize
        handlePosition="inside"
        ref={modalizeRef}
        onOpened={() => handlerStateChange(true)}
        onClosed={() => {}}
        modalHeight={modalHeight}
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
