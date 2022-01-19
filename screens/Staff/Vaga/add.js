import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  TextInput,
  Dimensions,
  Keyboard,
} from "react-native";

import axios from "axios";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { AntDesign } from "@expo/vector-icons";

import AuthContext from "../../../context/auth";

import { useNavigation } from "@react-navigation/native";

const Add = () => {
  const [a, setA] = React.useState(true);

  const [instituicao, setInstituicao] = React.useState(undefined);
  const [cargo, setCargo] = React.useState(undefined);
  const [tipo, setTipo] = React.useState(undefined);
  const [descricao, setDescricao] = React.useState(undefined);

  const [presencial, setPresencial] = React.useState(false);
  const [localidade, setLocalidade] = React.useState(undefined);

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
            navigation.goBack();
          },
        },
      ]);
    }
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFF",
        paddingTop: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 26, fontWeight: "bold" }}>Adicionar vaga</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              fontSize: 22,
              textDecorationLine: "underline",
              marginLeft: 20,
              color: "#aaa",
              fontWeight: "bold",
            }}
          >
            Voltar
          </Text>
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView
        style={{
          paddingHorizontal: 20,
          paddingTop: 20,
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
        <Text style={{ color: "#000", marginTop: 10, fontSize: 14 }}>
          Instituição
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
            height: 100,
            marginTop: 5,
            borderWidth: 1,
            borderColor: "#eee",
            paddingRight: 10,
            borderRadius: 5,
            paddingHorizontal: 10,
            width: "100%",
            backgroundColor: "#FFF",
            display: "flex",
            paddingTop: 10,
            flexDirection: "row",
          }}
        >
          <TextInput
            multiline={true}
            value={descricao}
            onChangeText={(descricao) => {
              setDescricao(descricao);
            }}
            placeholder="e.g. Atuar na elaboração de quadros indicativos..."
            style={{
              width: "90%",
              height: "auto",
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            instituicao && cargo && tipo && descricao
              ? AddVaga()
              : alert("Você precisa inserir todos os dados para continuar");
          }}
          style={{
            height: 50,
            marginTop: 20,
            marginBottom: 40,
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
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Add;
