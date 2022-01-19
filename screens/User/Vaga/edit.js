import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
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

export function Edit(props) {
  const [opened, setOpened] = useState(false);
  const [keyboardAvoid, setKeyboardAvoid] = useState(false);

  const [a, setA] = React.useState(true);

  const [instituicao, setInstituicao] = React.useState(undefined);
  const [cargo, setCargo] = React.useState(undefined);
  const [tipo, setTipo] = React.useState(undefined);
  const [descricao, setDescricao] = React.useState(undefined);

  const [presencial, setPresencial] = React.useState(false);
  const [localidade, setLocalidade] = React.useState(undefined);

  const modalizeRef = useRef(<Modalize />);

  const { user, signOut } = React.useContext(AuthContext);

  const navigation = useNavigation();

  const AddVaga = async () => {
    const response = await axios.post(
      "http://192.168.0.20:5555/api/v0/core/vaga",
      {
        instituicao,
        cargo,
        tipo,
        descricao,
        presencial,
        localidade,
      }
    );
    if (response.status === 200) {
      Alert.alert("Operação realizada", "Vaga adicionada com sucesso!", [
        {
          text: "Show!",
          onPress: () => {
            closeModal();
          },
        },
      ]);
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

  const renderHeader = useCallback(() => {
    return (
      <>
        <View
          style={{
            paddingTop: 20,
            paddingHorizontal: 20,
            paddingBottom: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "#333", fontSize: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 26 }}>
              Editar vaga
            </Text>
            {a ? "(1/2)" : "(2/2)"}
          </Text>
          {!a && (
            <TouchableOpacity onPress={() => setA(!a)}>
              <Text
                style={{
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                  fontSize: 16,
                  color: "#777",
                }}
              >
                Voltar
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </>
    );
  }, [a]);

  const renderContent = useCallback(() => {
    return <></>;
  }, []);

  const modalHeight = a ? 340 : 300;

  return (
    <>
      <Modalize
        handlePosition="inside"
        ref={modalizeRef}
        onOpened={() => handlerStateChange(true)}
        onClosed={() => {}}
        modalHeight={keyboardAvoid ? modalHeight + 320 : modalHeight}
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
