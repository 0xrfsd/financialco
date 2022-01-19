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

export function Add(props) {
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
      "http://192.168.0.14:5555/api/v0/core/vaga",
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

  const Selector = () => {
    return (
      <>
        <View
          style={{
            borderRadius: 5,
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#e0e0e0",
            height: "auto",
            padding: 5,
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (presencial) {
                //
              } else {
                setPresencial(!presencial);
              }
            }}
            style={{
              height: 35,
              width: "49%",
              backgroundColor: presencial ? "#fff" : "#e0e0e0",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: presencial ? "purple" : "#333" }}>
              Presencial
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (!presencial) {
                //
              } else {
                setPresencial(!presencial);
              }
            }}
            style={{
              height: 35,
              width: "49%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: !presencial ? "#fff" : "#e0e0e0",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: !presencial ? "purple" : "#333" }}>
              Remoto
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
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
              Adicionar vaga
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
    return (
      <>
        {a ? (
          <View style={{ paddingHorizontal: 20, paddingTop: 0 }}>
            <Text style={{ color: "#000", fontSize: 14 }}>Instituição</Text>
            <View
              style={{
                height: 40,
                marginTop: 5,
                borderWidth: 1,
                borderColor: "#eee",
                paddingRight: 10,
                borderRadius: 5,
                paddingHorizontal: 10,
                width: "100%",
                backgroundColor: "#FFF",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AntDesign
                size={22}
                name="folder1"
                color="#999"
                style={{ width: 30 }}
              />
              <TextInput
                onFocus={() => {
                  setKeyboardAvoid(true);
                }}
                onBlur={() => {
                  setKeyboardAvoid(false);
                }}
                value={instituicao}
                onChangeText={(instituicao) => {
                  setInstituicao(instituicao);
                }}
                placeholder="e.g. BTG Pactual "
                style={{
                  width: "90%",
                }}
              />
            </View>
            <Text style={{ color: "#000", fontSize: 14, marginTop: 10 }}>
              Cargo
            </Text>
            <View
              style={{
                height: 40,
                marginTop: 5,
                borderWidth: 1,
                borderColor: "#eee",
                paddingRight: 10,
                borderRadius: 5,
                paddingHorizontal: 10,
                width: "100%",
                backgroundColor: "#FFF",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AntDesign
                size={22}
                name="folder1"
                color="#999"
                style={{ width: 30 }}
              />
              <TextInput
                onFocus={() => {
                  setKeyboardAvoid(true);
                }}
                onBlur={() => {
                  setKeyboardAvoid(false);
                }}
                value={cargo}
                onChangeText={(cargo) => {
                  setCargo(cargo);
                }}
                placeholder="e.g. Gestor de Investimentos"
                style={{
                  width: "90%",
                }}
              />
            </View>
            <Text style={{ color: "#000", fontSize: 14, marginTop: 10 }}>
              Tipo de vaga
            </Text>
            <View
              style={{
                height: 40,
                marginTop: 5,
                borderWidth: 1,
                borderColor: "#eee",
                paddingRight: 10,
                borderRadius: 5,
                paddingHorizontal: 10,
                width: "100%",
                backgroundColor: "#FFF",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AntDesign
                size={22}
                name="folder1"
                color="#999"
                style={{ width: 30 }}
              />
              <TextInput
                onFocus={() => {
                  setKeyboardAvoid(true);
                }}
                onBlur={() => {
                  setKeyboardAvoid(false);
                }}
                value={tipo}
                onChangeText={(tipo) => {
                  setTipo(tipo);
                }}
                placeholder="e.g. Estágio"
                style={{
                  width: "90%",
                }}
              />
            </View>
            <Text style={{ color: "#000", fontSize: 14, marginTop: 10 }}>
              Descrição
            </Text>
            <View
              style={{
                height: 40,
                marginTop: 5,
                borderWidth: 1,
                borderColor: "#eee",
                paddingRight: 10,
                borderRadius: 5,
                paddingHorizontal: 10,
                width: "100%",
                backgroundColor: "#FFF",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AntDesign
                size={22}
                name="folder1"
                color="#999"
                style={{ width: 30 }}
              />
              <TextInput
                onFocus={() => {
                  setKeyboardAvoid(true);
                }}
                onBlur={() => {
                  setKeyboardAvoid(false);
                }}
                value={descricao}
                onChangeText={(descricao) => {
                  setDescricao(descricao);
                }}
                placeholder="e.g. Atuar na elaboração de quadros indicativos..."
                style={{
                  width: "90%",
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                instituicao && cargo && tipo && descricao
                  ? setA(false)
                  : alert("Você precisa inserir todos os dados para continuar");
              }}
              style={{
                height: 50,
                marginTop: 20,
                marginBottom: 10,
                width: "100%",
                borderRadius: 5,
                backgroundColor: "purple",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "bold" }}>
                Próximo
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 0,
              height: modalHeight - 80,
            }}
          >
            <Selector />
            {presencial && (
              <>
                <Text style={{ color: "#000", fontSize: 14, marginTop: 10 }}>
                  Localização
                </Text>
                <View
                  style={{
                    height: 40,
                    marginTop: 5,
                    borderWidth: 1,
                    borderColor: "#eee",
                    paddingRight: 10,
                    borderRadius: 5,
                    paddingHorizontal: 10,
                    width: "100%",
                    backgroundColor: "#FFF",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <AntDesign
                    size={22}
                    name="folder1"
                    color="#333"
                    style={{ width: 30 }}
                  />
                  <TextInput
                    onFocus={() => {
                      setKeyboardAvoid(true);
                    }}
                    onBlur={() => {
                      setKeyboardAvoid(false);
                    }}
                    value={localidade}
                    onChangeText={(localidade) => {
                      setLocalidade(localidade);
                    }}
                    placeholder="e.g. São Paulo, SP"
                    style={{
                      width: "90%",
                    }}
                  />
                </View>
              </>
            )}
            <TouchableOpacity
              onPress={AddVaga}
              style={{
                height: 50,
                marginTop: "auto",
                marginBottom: 10,
                width: "100%",
                borderRadius: 5,
                backgroundColor: "purple",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "bold" }}>
                Adicionar
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  }, [a, presencial, instituicao, cargo, tipo, descricao]);

  const modalHeight = a ? 440 : 422;

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
