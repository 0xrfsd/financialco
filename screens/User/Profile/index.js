import React from "react";
import {
  View,
  Text,
  Pressable,
  Platform,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { FontAwesome5 } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";

import AuthContext from "../../../context/auth";

const Perfil = () => {
  const navigation = useNavigation();

  const [hideCurriculum, setHideCurriculum] = React.useState(false);

  const { user, signOut } = React.useContext(AuthContext);

  const Header = () => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 10,
          paddingTop: Platform.OS === "ios" ? 20 : 20,
          paddingLeft: 20,
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
          onPress={() => setFiltering(false)}
        >
          <AntDesign size={25} color="#000" name="arrowleft" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 40,
            marginRight: 20,
            width: "auto",
            paddingHorizontal: 10,
            borderRadius: 4,
            backgroundColor: "#EAEAEA",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setCargo(undefined);
            setTipo(undefined);
            setInstituicao(undefined);
            setLocalidade(undefined);
          }}
        >
          <Text>Ajuda</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const Avatar = () => {
    return (
      <View
        style={{ padding: 20, justifyContent: "center", alignItems: "center" }}
      >
        <Image
          source={{ uri: "https://github.com/0xrfsd.png" }}
          style={{ height: 100, width: 100, borderRadius: 65 }}
        />
        <View
          style={{
            height: "auto",
            width: "auto",
            padding: 10,
            marginTop: -20,
            backgroundColor: "#e0e0e0",
            borderRadius: 50,
          }}
        >
          <AntDesign name="edit" size={16} color="#333" />
        </View>
      </View>
    );
  };

  const Banners = () => {
    const Banner = ({ title, icon, data }) => {
      const Curriculum = () => {
        return (
          <>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>
              Sobre mim
            </Text>
            <Text style={{ fontSize: 14, marginTop: 5 }}>
              Me chamo <Text style={{ fontWeight: "bold" }}>{user.nome}</Text> e
              atualmente moro na cidade de{" "}
              <Text style={{ fontWeight: "bold" }}>Anápolis, GO</Text>.
            </Text>
            <Text style={{ fontSize: 14, marginTop: 5 }}>
              Ah... e esse app também fui eu que fiz!
            </Text>
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#e0e0e0",
                marginTop: 10,
              }}
            />
            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>
              Habilidades
            </Text>
            <Text style={{ fontSize: 14, color: "purple", marginTop: 5 }}>
              • Linux
            </Text>
            <Text style={{ fontSize: 14, color: "purple", marginTop: 5 }}>
              • Shell Scripting
            </Text>
            <Text style={{ fontSize: 14, color: "purple", marginTop: 5 }}>
              • Python
            </Text>
            <Text style={{ fontSize: 14, color: "purple", marginTop: 5 }}>
              • Django
            </Text>
            <Text style={{ fontSize: 14, color: "purple", marginTop: 5 }}>
              • Javascript
            </Text>
            <Text style={{ fontSize: 14, color: "purple", marginTop: 5 }}>
              • Node.js
            </Text>
            <Text style={{ fontSize: 14, color: "purple", marginTop: 5 }}>
              • MongoDB
            </Text>
            <Text style={{ fontSize: 14, color: "purple", marginTop: 5 }}>
              • Express
            </Text>
            <Text style={{ fontSize: 14, color: "purple", marginTop: 5 }}>
              • QA Testing
            </Text>
            <Text style={{ fontSize: 14, color: "purple", marginTop: 5 }}>
              • Security Testing
            </Text>
            <Text style={{ fontSize: 14, color: "purple", marginTop: 5 }}>
              • React
            </Text>
            <Text style={{ fontSize: 14, color: "purple", marginTop: 5 }}>
              • React-Native
            </Text>
            <Text style={{ fontSize: 14, color: "purple", marginTop: 5 }}>
              • styled-components
            </Text>
            <Text style={{ fontSize: 14, color: "purple", marginTop: 5 }}>
              • API Architecture
            </Text>
            <Text style={{ fontSize: 14, color: "purple", marginTop: 5 }}>
              • Data Modeling
            </Text>
            <Text style={{ fontSize: 14, color: "purple", marginTop: 5 }}>
              • Project Management
            </Text>
            <Text style={{ fontSize: 14, color: "purple", marginTop: 5 }}>
              • Communication
            </Text>
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#e0e0e0",
                marginTop: 10,
              }}
            />
            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>
              Formação
            </Text>
            <Text style={{ fontSize: 14, marginTop: 5 }}>
              Cursei por <Text style={{ fontWeight: "bold" }}>3 anos</Text> a
              Platafforma Online{" "}
              <Text style={{ fontWeight: "bold" }}>OpenCourseWare M.I.T</Text>.
            </Text>
            <Text style={{ fontSize: 14, marginTop: 5 }}>
              Cursei por <Text style={{ fontWeight: "bold" }}>6 anos</Text> a
              Escola Fundamental 2{" "}
              <Text style={{ fontWeight: "bold" }}>Colégio Crescer</Text>.
            </Text>
            <Text style={{ fontSize: 14, marginTop: 5 }}>
              Cursei por <Text style={{ fontWeight: "bold" }}>5 anos</Text> a
              Escola Fundamental I{" "}
              <Text style={{ fontWeight: "bold" }}>Gente Miúda</Text>.
            </Text>
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#e0e0e0",
                marginTop: 10,
              }}
            />
            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>
              Destaques
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "purple",
                textDecorationLine: "underline",
                marginTop: 5,
              }}
            >
              Github.com | 0xrfsd | Modal+
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "purple",
                textDecorationLine: "underline",
                marginTop: 5,
              }}
            >
              Github.com | 0xrfsd | Entrega+
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "purple",
                textDecorationLine: "underline",
                marginTop: 5,
              }}
            >
              Github.com | 0xrfsd | The Wellness
            </Text>
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#e0e0e0",
                marginTop: 20,
              }}
            />
            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>
              Idiomas
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#333",
                marginTop: 5,
              }}
            >
              Portugues
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#333",
                marginTop: 5,
              }}
            >
              Inglês
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#333",
                marginTop: 5,
              }}
            >
              Espanhol
            </Text>
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#e0e0e0",
                marginTop: 10,
              }}
            />
          </>
        );
      };

      const Item = ({ title }) => {
        return (
          <TouchableOpacity
            style={{
              height: "auto",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 12,
            }}
          >
            <Text style={{ fontSize: 18, color: "#000" }}>{title}</Text>
            <AntDesign name="right" color="#333" size={12} />
          </TouchableOpacity>
        );
      };

      return (
        <View
          style={{
            height: "auto",
            width: "100%",
            borderRadius: 5,
            backgroundColor: "#eee",
            padding: 20,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              backgroundColor:
                title === "Seu curriculum"
                  ? "#0090ff"
                  : title === "Recomendar"
                  ? "red"
                  : "#efbc64",
              justifyContent: "center",
              alignItems: "center",
              height: 30,
              width: 30,
              borderRadius: 50,
            }}
          >
            <AntDesign color="#FFF" name={icon} size={14} />
          </View>
          <Text style={{ marginTop: 10, fontSize: 22 }}>{title}</Text>
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#e0e0e0",
              marginTop: 10,
            }}
          />
          {title === "Seu curriculum" && (
            <>
              {!hideCurriculum && <Curriculum />}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 20,
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 70,
                    width: "33%",
                    borderRadius: 5,
                    backgroundColor: "#e0e0e0",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="plussquare" size={22} color="#333" />
                  <Text
                    style={{ color: "#333", marginTop: 10, fontWeight: "bold" }}
                  >
                    Add
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 70,
                    width: "33%",
                    borderRadius: 5,
                    backgroundColor: "#e0e0e0",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="edit" size={22} color="#333" />
                  <Text
                    style={{ color: "#333", marginTop: 10, fontWeight: "bold" }}
                  >
                    Editar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setHideCurriculum(!hideCurriculum);
                  }}
                  style={{
                    height: 70,
                    width: "33%",
                    borderRadius: 5,
                    backgroundColor: "#e0e0e0",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome5
                    name={hideCurriculum ? "eye" : "eye-slash"}
                    size={22}
                    color="#333"
                  />
                  <Text
                    style={{ color: "#333", marginTop: 10, fontWeight: "bold" }}
                  >
                    Visualizar
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          {title === "Ajuda & Dicas" && (
            <View style={{ marginTop: 10 }}>
              <Item title="Mostrar Introdução" />
              <Item title="Perguntas Frequntes" />
            </View>
          )}
          {title === "Recomendar" && (
            <View style={{ marginTop: 10 }}>
              <Item title="Recomende o Jobs a um amigo" />
              <Item title="Avalie-nos na App Store" />
            </View>
          )}
        </View>
      );
    };

    return (
      <View style={{ paddingHorizontal: 10 }}>
        <Banner title={"Seu curriculum"} icon="book" />
        <Banner title={"Ajuda & Dicas"} icon="question" />
        <Banner title="Recomendar" icon="heart" />
      </View>
    );
  };

  const Span = ({ color, title, subtitle, image }) => {
    return (
      <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
        <TouchableOpacity
          style={{
            paddingLeft: 20,
            paddingRight: 10,
            paddingTop: 20,
            width: "100%",
            height: Platform.OS === "web" ? 190 : 100,
            borderRadius: 5,
            backgroundColor: color,
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
                color: color !== "pink" ? "#fff" : "purple",
                fontWeight: "bold",
                fontSize: 22,
                marginTop: -20,
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                color: color !== "pink" ? "#eee" : "purple",
                width: "100%",
                fontSize: 14,
              }}
            >
              {subtitle}
            </Text>
            {/* <Text
              style={{
                color: "purple",
                width: "100%",
                fontSize: 14,
              }}
            >
              Tenha acesso a todas vagas do{" "}
              <Text style={{ fontWeight: "bold" }}>Jobs</Text> por apenas
              <Text style={{ fontWeight: "bold" }}> R$17,90</Text>/mês
            </Text> */}
          </View>
          <Image
            style={{
              width: "30%",
              height: Platform.OS === "web" ? 170 : 80,
            }}
            source={{
              uri: image,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <Header />
      <ScrollView style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 33,
            color: "purple",
            marginLeft: 20,
            marginTop: 20,
          }}
        >
          Oi, <Text style={{ fontWeight: "bold" }}>{user.nome}</Text>
        </Text>
        <Avatar />
        <Span
          title="BTG Pactual"
          color="#001864"
          subtitle="É uma honra para nós anunciar nossa mais nova parceria"
          image="https://s3-sa-east-1.amazonaws.com/prod-jobsite-files.kenoby.com/uploads/btgpactual-1600022271-btg-pactual-kenoby-552x368png.png"
        />
        <Span
          title="30% Off"
          color="pink"
          subtitle="Tenha acesso a todas vagas do Jobs por apenas R$17,90/mês"
          image="https://purepng.com/public/uploads/large/businessman-bow.png"
        />
        <Banners />
        <View
          style={{ paddingHorizontal: 20, paddingTop: 10, paddingBottom: 30 }}
        >
          <TouchableOpacity onPress={() => {
            signOut();
          }}
            style={{
              display: "flex",
              padding: 20,
              flexDirection: "row",
              borderRadius: 5,
              backgroundColor: "#e0e0e0",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#555"
              }}
            >
              Sair da sua conta
            </Text>
            <AntDesign name="logout" size={18} color="#555" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default Perfil;
