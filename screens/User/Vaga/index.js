import React from "react";
import {
  View,
  Alert,
  Text,
  Pressable,
  Platform,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import axios from "axios";
import { Edit } from "./edit";
import { useNavigation } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";

const Vaga = ({ route }) => {
  const navigation = useNavigation();
  const [liked, setLiked] = React.useState(false);
  const [locked, setLocked] = React.useState(false);
  const [modal, setModal] = React.useState([]);

  const { _id, instituicao, descricao, cargo, tipo, presencial, localidade } =
    route.params;

  const Curtir = async () => {
    setLiked(true);
    alert("Vaga salva com sucesso!");
  };

  const Header = () => {
    return (
      <>
        <View
          style={{
            display: "flex",
            backgroundColor: "#F8FAFD",
            flexDirection: "row",
            paddingTop: 20,
            paddingHorizontal: 20,
            paddingBottom: 10,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="close" size={30} color="#000" />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 22,
              color: "#000",
              textAlign: "center",
            }}
          >
            {instituicao}
          </Text>
          <TouchableOpacity onPress={Curtir}>
            <AntDesign
              name={liked ? "heart" : "hearto"}
              size={26}
              color="#000"
            />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView style={{ height: "auto", backgroundColor: "#fff" }}>
        <View
          style={{
            height: "auto",
            backgroundColor: "#F8FAFD",
            width: "100%",
            paddingHorizontal: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri:
                instituicao === "BTG Pactual"
                  ? "https://media.glassdoor.com/sqll/411540/btg-pactual-squarelogo-1600791787542.png"
                  : instituicao === "XP Inc"
                  ? "https://s2-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/935/100/original/LOGO_01.png?1610126508"
                  : instituicao === "Credit Suisse" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN-2HfGo84OUtXkkXTq0O_8r0JUNrmTYuGzDjO8jQdQ-zA0Rqt5C9GuoGQ_MUlaKe29uY&usqp=CAU" : null,
            }}
            style={{
              height: 100,
              borderWidth: 1,
              borderColor: "#eee",
              width: 100,
              borderRadius: 5,
            }}
          />
          <Text
            style={{
              fontSize: 16,
              color: "#555",
              marginTop: 10,
              textAlign: "center",
            }}
          >
            {localidade ? localidade : "Home Office"}
          </Text>
          <View
            style={{
              height: 50,
              display: "flex",
              flexDirection: "row",
              marginTop: 10,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                height: 30,
                borderRadius: 5,
                width: "49%",
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
                marginRight: 10,
              }}
            >
              <Text>{cargo}</Text>
            </View>
            <View
              style={{
                height: 30,
                borderRadius: 5,
                width: "49%",
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
              }}
            >
              <Text>{tipo}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            height: "auto",
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
            width: "100%",
            padding: 20,
          }}
        >
          <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>
            🎨 Descrição da vaga
          </Text>
          <Text style={{ color: "#000", fontSize: 16, marginTop: 10 }}>
            {cargo} em {instituicao}
          </Text>
        </View>
        {/* <View
          style={{
            height: "auto",
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
            width: "100%",
            padding: 20,
          }}
        >
          <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>
            📝 Responsabilidades
          </Text>
          <Text style={{ color: "#000", fontSize: 16, marginTop: 10 }}>
            •Apresentação de resultados semanal (PowerBI, Excel e PowerPoint)
          </Text>
          <Text style={{ color: "#000", fontSize: 16 }}>
            •Acompanhamento da carteira
          </Text>
          <Text style={{ color: "#000", fontSize: 16 }}>
            •Consolidação de exposição setorial do portfólio
          </Text>
          <Text style={{ color: "#000", fontSize: 16 }}>
            •Controle de liquidez dos fundos
          </Text>
          <Text style={{ color: "#000", fontSize: 16 }}>
            •Análise de crédito
          </Text>
          <Text style={{ color: "#000", fontSize: 16 }}>
            •Elaboração de White Papers sobre temas de interesse
          </Text>
          <Text style={{ color: "#000", fontSize: 16 }}>
            •Acompanhamento macroeconômico
          </Text>
        </View>
        <View
          style={{
            height: "auto",
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
            width: "100%",
            padding: 20,
          }}
        >
          <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>
            💡 Requisitos
          </Text>
          <Text style={{ color: "#000", fontSize: 16, marginTop: 10 }}>
            •Conhecimento de Excel avançado (VBA)
          </Text>
          <Text style={{ color: "#000", fontSize: 16 }}>
            •Conhecimento de Power BI
          </Text>
          <Text style={{ color: "#000", fontSize: 16 }}>
            •Conhecimento da língua inglesa
          </Text>
          <Text style={{ color: "#000", fontSize: 16 }}>
            •Conhecimento prévio de mercado financeiro
          </Text>
        </View>
        <View
          style={{
            height: "auto",
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
            width: "100%",
            padding: 20,
          }}
        >
          <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>
            💰 Média de salário
          </Text>
          <Text style={{ color: "#000", fontSize: 16, marginTop: 10 }}>
            De R$1500,00 até R$1990,00
          </Text>
        </View>
        <View
          style={{
            height: "auto",
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
            width: "100%",
            padding: 20,
          }}
        >
          <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>
            Informações adicionais
          </Text>
          <Text style={{ marginTop: 10, color: "#000", fontSize: 16 }}>
            •Trabalho remoto ou presêncial
          </Text>
          <Text style={{ marginTop: 10, color: "#000", fontSize: 16 }}>
            •Tempo integral (full time)
          </Text>
          <Text style={{ marginTop: 10, color: "#000", fontSize: 16 }}>
            •Ajuda de custo para despesas do trabalho remoto
          </Text>
          <Text style={{ marginTop: 10, color: "#000", fontSize: 16 }}>
            •FlexFood: você escolhe como utilizar - refeição ou alimentação
          </Text>
        </View> */}
      </ScrollView>
      <View
        style={{
          bottom: 0,
          width: "100%",
          padding: 10,
          paddingBottom: Platform.OS === "ios" ? 25 : 10,
          height: "auto",
          backgroundColor: "#F8FAFD",
        }}
      >
        <TouchableOpacity
          onPress={() => modal[0].openModal()}
          style={{
            height: 50,
            width: "100%",
            borderRadius: 5,
            backgroundColor: "#5078E1",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            Aplicar para essa vaga
          </Text>
        </TouchableOpacity>
      </View>
      <Edit modal={modal} setModal={setModal} modalIndex={0} />
    </View>
  );
};

export default Vaga;
