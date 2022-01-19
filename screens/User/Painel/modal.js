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

export function Modal(props) {
  const [opened, setOpened] = useState(false);

  const [keyboardAvoid, setKeyboardAvoid] = useState(false);

  const modalizeRef = useRef(<Modalize />);

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
            Frase do dia
          </Text>
          <Text style={{ color: "#333", fontSize: 14 }}>...</Text>
        </View>
      </>
    );
  }, []);

  const renderContent = useCallback(() => {
    return (
      <>
        <View style={{ padding: 20 }}>
          <Text style={{ color: "#333", fontSize: 14 }}>
            {`A única certeza que temos é do momento que estamos vivendo. Por isso, viva intensamente!\nHoje, o vento te abraçará, o sol estará mais atraente e a paz vai invadir seu coração!`}
          </Text>
        </View>
      </>
    );
  }, []);

  const modalHeight = 340;

  return (
    <>
      <Modalize
        handlePosition="inside"
        ref={modalizeRef}
        onOpened={() => handlerStateChange(true)}
        onClosed={() => {}}
        modalHeight={modalHeight}
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
