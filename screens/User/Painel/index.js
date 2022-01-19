import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";

import { Modal } from "./modal";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

import AuthContext from "../../../context/auth";

const Painel = () => {
  const [applied, setApplied] = React.useState(false);
  const [modal, setModal] = React.useState([]);

  const navigation = useNavigation();

  const { user, signOut } = React.useContext(AuthContext);

  const Header = () => {
    return (
      <View
        style={{
          paddingTop: Platform.OS === "ios" ? 50 : 10,
          paddingHorizontal: 20,
          paddingBottom: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Image
            source={{ uri: "https://github.com/0xrfsd.png" }}
            style={{ height: 40, width: 40, borderRadius: 10, marginRight: 10 }}
          />
          <View>
            <Text style={{ fontWeight: "bold", color: "#333", fontSize: 20 }}>
              {user.nome}
            </Text>
            <Text style={{ color: "#bbb", fontSize: 12, marginTop: 2 }}>
              powered by{" "}
              <Text style={{ fontWeight: "bold", color: "#aaa" }}>
                Financial Co.
              </Text>
            </Text>
          </View>
        </View>
        {/* <TouchableOpacity onPress={() => modal[0].openModal()}>
          <FontAwesome5 size={33} color="purple" name="bars" />
        </TouchableOpacity> */}
      </View>
    );
  };

  const Selector = () => {
    return (
      <>
        <View
          style={{
            marginTop: 10,
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
              if (applied) {
                //
              } else {
                setApplied(!applied);
              }
            }}
            style={{
              height: 40,
              width: "49%",
              backgroundColor: applied ? "#fff" : "#e0e0e0",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: applied ? "purple" : "#333" }}>
              Aplicadas ({aplicadas.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (!applied) {
                //
              } else {
                setApplied(!applied);
              }
            }}
            style={{
              height: 40,
              width: "49%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: !applied ? "#fff" : "#e0e0e0",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: !applied ? "purple" : "#333" }}>
              Entrevistas ({entrevistas.length})
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const FlatVagas = () => {
    const Vaga = ({ perfil, cargo, atributo, remoto, instituicao }) => {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate("Vaga")}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
            padding: 20,
            height: "auto",
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: 5,
          }}
        >
          <View>
            <Text style={{ fontWeight: "bold" }}>{instituicao}</Text>
            <Text style={{ marginTop: 5 }}>{perfil}</Text>
            <Text style={{ fontSize: 12, marginTop: 5 }}>
              {cargo} | {atributo}
            </Text>
            <View
              style={{
                marginTop: 10,
                height: "auto",
                width: "auto",
                borderRadius: 50,
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: "#eee",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{}}>{remoto ? "Remoto" : "Presencial"}</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={{
                height: 60,
                width: 60,
                borderRadius: 60,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 2,
                borderColor: "#000",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>ver +</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    };

    const renderItem = ({ item }) => (
      <Vaga
        perfil={item.perfil}
        instituicao={item.instituicao}
        cargo={item.cargo}
        atributo={item.atributo}
      />
    );

    return (
      <View style={{ marginTop: 20 }}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 20 }}
          data={applied ? aplicadas : entrevistas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  const aplicadas = [
    {
      id: 0,
      instituicao: "BTG Pactual",
      cargo: "Estágio",
      perfil: "Banco de Investimento",
      atributo: "Private Banking",
      remoto: true,
    },
    {
      id: 1,
      instituicao: "Evcred",
      cargo: "Análista de Crédito",
      perfil: "Fundo de Investimento",
      atributo: "Private Banking",
      remoto: false,
    },
    {
      id: 2,
      instituicao: "Credit Suisse",
      cargo: "Estágio",
      perfil: "Banco de Investimento",
      atributo: "Private Banking",
      remoto: false,
    },
  ];

  const entrevistas = [
    {
      id: 0,
      instituicao: "XP Inc.",
      cargo: "Estágio",
      perfil: "Banco de Investimento",
      atributo: "Private Banking",
      remoto: true,
    },
    {
      id: 1,
      instituicao: "Credit Suisse",
      cargo: "Estágio",
      perfil: "Banco de Investimento",
      atributo: "Private Banking",
      remoto: false,
    },
    {
      id: 2,
      instituicao: "Credit Suisse",
      cargo: "Estágio",
      perfil: "Banco de Investimento",
      atributo: "Private Banking",
      remoto: false,
    },
    {
      id: 3,
      instituicao: "Credit Suisse",
      cargo: "Estágio",
      perfil: "Banco de Investimento",
      atributo: "Private Banking",
      remoto: false,
    },
  ];

  return (
    <>
      <Header />
      <View
        style={{
          flex: 1,
          paddingTop: 10,
        }}
      >
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 26, color: "purple" }}>Painel de vagas</Text>
          <Selector />
        </View>
        <View style={{ flex: 1 }}>
          <FlatVagas />
        </View>
      </View>
      <Modal modal={modal} setModal={setModal} modalIndex={0} />
    </>
  );
};

export default Painel;
