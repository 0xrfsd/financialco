import React from "react";
import axios from "axios";
import {
  View,
  Pressable,
  Text,
  Platform,
  Dimensions,
  TouchableOpacity,
  Image,
  RefreshControl,
  ScrollView,
} from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components/native";

import { useNavigation } from "@react-navigation/native";

import { Modal } from "./modal";
import { Add } from "./add";

import { Touchable } from "react-native-web";

import AuthContext from "../../../context/auth";

const Carousel = styled.ScrollView.attrs(() => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingRight: 10,
  },
}))``;

const Home = () => {
  const navigation = useNavigation();

  const [loaded, setLoaded] = React.useState(false);

  const { user } = React.useContext(AuthContext);

  const [modal, setModal] = React.useState([]);
  const [search, setSearch] = React.useState(false);

  const [vagas, setVagas] = React.useState(undefined);
  const [vagasLength, setVagasLength] = React.useState(undefined);

  const [refreshing, setRefreshing] = React.useState(false);

  React.useLayoutEffect(() => {
    FetchVagasAdicionadas();
    navigation.addListener("focus", () => {
      FetchVagasAdicionadas();
    });
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    FetchVagasAdicionadas();
  }, []);

  const FetchVagasAdicionadas = async () => {
    const response = await axios.get(
      "http://192.168.0.10:5555/api/v0/core/vagas"
    );
    if (response.data) {
      setLoaded(true);
      setRefreshing(false);
    }
    setVagas(response.data);
    setVagasLength(response.data.length);
  };

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
        <View style={{ display: "flex", flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.navigate("AddVaga")}>
            <AntDesign
              size={33}
              color="purple"
              name="plussquareo"
              style={{ marginRight: 25 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => modal[0].openModal()}>
            <FontAwesome5 size={33} color="purple" name="bars" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const Dashboard = () => {
    return (
      <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
        <Text style={{ fontSize: 26, color: "purple" }}>Dashboard</Text>
        <View
          style={{
            marginTop: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {loaded ? (
            <Pressable
              style={{
                padding: 20,
                height: 80,
                width: "49%",
                backgroundColor: "purple",
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
                {vagasLength}
              </Text>
              <Text style={{ color: "#eee", fontSize: 12 }}>
                Vagas adicionadas
              </Text>
            </Pressable>
          ) : (
            <Pressable
              style={{
                padding: 20,
                height: 80,
                width: "49%",
                backgroundColor: "#eee",
                borderRadius: 5,
              }}
            ></Pressable>
          )}
          {/* <TouchableOpacity
            style={{
              padding: 20,
              height: "auto",
              width: "49%",
              backgroundColor: "#c8a2c8",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
              02
            </Text>
            <Text style={{ color: "#eee", fontSize: 12 }}>
              Players cadastrados
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  };

  const FlatVagas = () => {
    const Vaga = ({
      _id,
      instituicao,
      descricao,
      cargo,
      tipo,
      presencial,
      localidade,
    }) => {
      return (
        <Pressable
          onPress={() =>
            navigation.navigate("Vaga", {
              _id,
              cargo,
              descricao,
              instituicao,
              presencial,
              tipo,
              localidade,
            })
          }
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
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
            <Text style={{}}>{tipo}</Text>
            <Text style={{}}>{cargo}</Text>
            <Text style={{}}>{presencial ? "Presencial" : "Remoto"}</Text>
          </View>
          <View>
            <View
              iew
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
            </View>
          </View>
        </Pressable>
      );
    };

    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 26, color: "purple" }}>Vagas abertas</Text>
        {vagas &&
          vagas.map((vaga) => {
            return (
              <Vaga
                key={vaga._id}
                _id={vaga._id}
                cargo={vaga.cargo}
                descricao={vaga.descricao}
                instituicao={vaga.instituicao}
                presencial={vaga.presencial}
                tipo={vaga.tipo}
                localidade={vaga.localidade}
              />
            );
          })}
      </View>
    );
  };

  const LoadingFlat = () => {
    const Vaga = () => {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Vaga", {
              id,
              instituicao,
              cargo,
              tipo,
              presencial,
              localidade,
            })
          }
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            padding: 20,
            height: 100,
            width: "100%",
            backgroundColor: "#eee",
            borderRadius: 5,
          }}
        ></TouchableOpacity>
      );
    };

    return (
      <View
        style={{
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 26, color: "purple" }}>Vagas abertas</Text>
        <Vaga />
        <Vaga />
        <Vaga />
        <Vaga />
      </View>
    );
  };

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Dashboard />
        {loaded ? <FlatVagas /> : <LoadingFlat />}
      </ScrollView>
      <Modal modal={modal} setModal={setModal} modalIndex={0} />
      <Add modal={modal} setModal={setModal} modalIndex={1} />
    </View>
  );
};

export default Home;
