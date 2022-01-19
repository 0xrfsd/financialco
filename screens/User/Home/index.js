import React from "react";
import {
  View,
  Pressable,
  TouchableOpacity,
  Text,
  Platform,
  RefreshControl,
  Dimensions,
  Keyboard,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import axios from "axios";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components/native";

import { useNavigation } from "@react-navigation/native";
import { Modal } from "./modal";
import { Touchable } from "react-native-web";

import AuthContext from "../../../context/auth";

const Carousel = styled.ScrollView.attrs(() => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingRight: 10,
  },
}))``;

const images = [
  {
    image:
      "https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    desc: "Silent Waters in the mountains in midst of Himilayas",
  },
  {
    image:
      "https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80",
    desc: "Red fort in India New Delhi is a magnificient masterpeiece of humans",
  },
  {
    image:
      "https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80",
    desc: "Red fort in India New Delhi is a magnificient masterpeiece of humans",
  },
  {
    image:
      "https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80",
    desc: "Red fort in India New Delhi is a magnificient masterpeiece of humans",
  },
  {
    image:
      "https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80",
    desc: "Red fort in India New Delhi is a magnificient masterpeiece of humans",
  },
  {
    image:
      "https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80",
    desc: "Red fort in India New Delhi is a magnificient masterpeiece of humans",
  },
];

const Home = () => {
  const navigation = useNavigation();

  const { user, fetchId } = React.useContext(AuthContext);

  const [modal, setModal] = React.useState([]);
  const [search, setSearch] = React.useState(false);

  const [refreshing, setRefreshing] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  const [vagas, setVagas] = React.useState(undefined);
  const [vagasLength, setVagasLength] = React.useState(undefined);

  const [name, setName] = React.useState(undefined);

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
          width: "100%",
          paddingTop: Platform.OS === "ios" ? 50 : 10,
          paddingHorizontal: 20,
          paddingBottom: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            height: 40,
            marginRight: 10,
            width: 40,
            borderRadius: 35,
            backgroundColor: "#EAEAEA",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => modal[0].openModal()}
        >
          <FontAwesome5 size={20} color="purple" name="bars" />
        </TouchableOpacity>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Pesquisar")}
            style={{
              height: 40,
              marginRight: 10,
              width: 40,
              borderRadius: 35,
              backgroundColor: "#EAEAEA",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome5 size={20} color="#333" name="search" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
            <Image
              source={{ uri: "https://github.com/0xrfsd.png" }}
              style={{ height: 40, width: 40, borderRadius: 35 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const Dashboard = () => {
    return (
      <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
        <Text style={{ fontSize: 26, color: "purple" }}>Olá,</Text>
        <Text style={{ fontWeight: "bold", fontSize: 22, color: "purple" }}>
          {user.nome}
        </Text>
        <TouchableOpacity
          style={{
            paddingLeft: 20,
            paddingRight: 10,
            paddingTop: 20,
            marginTop: 10,
            width: "100%",
            height: Platform.OS === "web" ? 190 : 100,
            borderRadius: 5,
            backgroundColor: "pink",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "70%",
            }}
          >
            <Text
              style={{
                color: "purple",
                fontWeight: "bold",
                fontSize: 22,
                marginTop: -20,
              }}
            >
              30% OFF
            </Text>
            <Text
              style={{
                color: "purple",
                width: "100%",
                fontSize: 14,
              }}
            >
              Tenha acesso a todas vagas do{" "}
              <Text style={{ fontWeight: "bold" }}>Jobs</Text> por apenas
              <Text style={{ fontWeight: "bold" }}> R$17,90</Text>/mês
            </Text>
          </View>
          <Image
            style={{
              width: "30%",
              height: Platform.OS === "web" ? 170 : 80,
            }}
            source={{
              uri: "https://purepng.com/public/uploads/large/businessman-bow.png",
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            marginTop: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              padding: 20,
              height: "auto",
              width: "49%",
              backgroundColor: "#9f52df",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
              {vagasLength + 10}
            </Text>
            <Text style={{ color: "#eee", fontSize: 11 }}>Vagas abertas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 20,
              height: "auto",
              width: "49%",
              backgroundColor: "#816f91",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
              02
            </Text>
            <Text style={{ color: "#eee", fontSize: 11 }}>
              Instituições registradas
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const Dictionary = () => {
    // logica de artigo lido igual unity learn

    const Item = ({ title, tipo }) => {
      return (
        <TouchableOpacity
          style={{
            marginRight: 10,
            height: 130,
            width: 130,
            borderRadius: 5,
            padding: 10,
            justifyContent: "space-between",
            backgroundColor: "#9f52df",
          }}
        >
          <Text style={{ color: "#FFF", fontSize: 12 }}></Text>
          <Text style={{ color: "#EEE", fontSize: 14, fontWeight: "bold" }}>
            {title}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ paddingTop: 20 }}>
        <Text
          style={{
            marginLeft: 20,
            fontSize: 22,
            color: "purple",
          }}
        >
          Para você se preparar
        </Text>
        <View
          style={{
            height: "auto",
            paddingLeft: 20,
            paddingTop: 10,
          }}
        >
          <Carousel>
            <Item title="O que preciso saber ao me ingressar" tipo="13:16" />
            <Item title="Como me preparar para uma entrevista" tipo="09:53" />
            <Item title="Como se destacar em uma entrevista" tipo="08:48" />
          </Carousel>
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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 22, color: "purple" }}>Novas vagas</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Vagas")}>
            <Text
              style={{
                fontSize: 16,
                color: "purple",
              }}
            >
              Ver todas
            </Text>
          </TouchableOpacity>
        </View>
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
        <Dictionary />
        {loaded ? <FlatVagas /> : <LoadingFlat />}
      </ScrollView>
      <Modal modal={modal} setModal={setModal} modalIndex={0} />
    </View>
  );
};

export default Home;
