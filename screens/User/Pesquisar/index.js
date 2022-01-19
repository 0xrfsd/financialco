import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import React from "react";
import {
  View,
  Pressable,
  TouchableOpacity,
  Text,
  Platform,
  TextInput,
  Keyboard,
  Dimensions,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components/native";

const Carousel = styled.ScrollView.attrs(() => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {},
}))``;

import { Modal } from "./modal";

import { useNavigation } from "@react-navigation/native";

const Pesquisar = () => {
  const navigation = useNavigation();
  const [modal, setModal] = React.useState([]);

  const [filtering, setFiltering] = React.useState(false);

  const [filter, setFilter] = React.useState(undefined);

  const [tipo, setTipo] = React.useState(undefined);
  const [instituicao, setInstituicao] = React.useState(undefined);
  const [cargo, setCargo] = React.useState(undefined);
  const [localidade, setLocalidade] = React.useState(undefined);

  const [tipos, setTipos] = React.useState(undefined);
  const [instituicoes, setInstituicoes] = React.useState(undefined);
  const [cargos, setCargos] = React.useState(undefined);
  const [localidades, setLocalidades] = React.useState(undefined);

  const [showCargo, setShowCargo] = React.useState(undefined);
  const [showTipo, setShowTipo] = React.useState(undefined);
  const [showInstituicao, setShowInstituicao] = React.useState(undefined);
  const [showLocalidade, setShowLocalidade] = React.useState(undefined);

  const [results, setResults] = React.useState(undefined);

  React.useLayoutEffect(() => {
    FetchFilters();
  }, []);

  const FetchFilters = async () => {
    const response = await axios.get(
      "http://192.168.0.10:5555/api/v0/core/filter/filters"
    );
    setTipos(response.data.tipos);
    setInstituicoes(response.data.instituicoes);
    setCargos(response.data.cargos);
    setLocalidades(response.data.localidades);
  };

  const Filters = () => {
    const Item = ({ title, param }) => {
      return (
        <View
          style={{
            height: "auto",
            width: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10,
            borderRadius: 5,
            marginRight: 10,
            backgroundColor: "#eee",
          }}
        >
          <Text style={{ color: "#333" }}>{title}</Text>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => {
              if (param === "cargo") {
                setCargo(undefined);
                setShowCargo(false);
              } else if (param === "tipo") {
                setTipo(undefined);
                setShowTipo(false);
              } else if (param === "instituicao") {
                setInstituicao(undefined);
                setShowInstituicao(false);
              } else if (param === "localidade") {
                setLocalidade(undefined);
                setShowLocalidade(false);
              }
            }}
          >
            <AntDesign name="close" size={14} color="#333" />
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <View
        style={{
          height: tipo || cargo || instituicao || localidade ? 40 : 0,
          marginBottom: 10,
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Carousel>
          {cargo && <Item title={cargo} param="cargo" />}
          {tipo && <Item title={tipo} param="tipo" />}
          {instituicao && <Item title={instituicao} param="instituicao" />}
          {localidade && <Item title={localidade} param="localidade" />}
        </Carousel>
      </View>
    );
  };

  const Cargo = () => {
    const Item = ({ title }) => {
      return (
        <TouchableOpacity
          onPress={() => {
            if (cargo) {
              if (cargo === title) {
                setCargo(false);
              } else if (cargo !== title) {
                setCargo(title);
              }
            } else {
              setCargo(title);
            }
          }}
          style={{
            height: "auto",
            width: "auto",
            marginRight: 10,
            paddingVertical: 10,
            paddingHorizontal: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#EEE",
            borderRadius: 5,
            borderWidth: 1,
            borderColor: cargo === title ? "purple" : "#eee",
          }}
        >
          <Text>{title}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ height: "auto" }}>
        <Pressable
          onPress={() => {
            if (showTipo || showInstituicao || showLocalidade) {
              setShowTipo(false);
              setShowInstituicao(false);
              setShowLocalidade(false);
              setShowCargo(true);
            } else {
              setShowCargo(!showCargo);
            }
          }}
          style={{
            height: 40,
            display: "flex",
            flexDirection: "row",
            paddingRight: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "#000",
              fontWeight: "bold",
              fontSize: 18,
              marginVertical: 10,
            }}
          >
            Cargo
          </Text>
          <AntDesign
            size={22}
            color="#333"
            name={showCargo ? "close" : "filter"}
          />
        </Pressable>
        {showCargo && (
          <Carousel>
            {cargos.map((cargo, id) => {
              return <Item title={cargo} key={id} />;
            })}
          </Carousel>
        )}
      </View>
    );
  };

  const Tipo = () => {
    const [selected, setSelected] = React.useState(undefined);

    const Item = ({ title }) => {
      return (
        <TouchableOpacity
          onPress={() => {
            if (tipo) {
              if (tipo === title) {
                setTipo(false);
              } else if (tipo !== title) {
                setTipo(title);
              }
            } else {
              setTipo(title);
            }
          }}
          style={{
            height: "auto",
            width: "auto",
            marginRight: 10,
            paddingVertical: 10,
            paddingHorizontal: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#EEE",
            borderRadius: 5,
            borderWidth: 1,
            borderColor: tipo === title ? "purple" : "#eee",
          }}
        >
          <Text>{title}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ height: "auto", marginTop: 10 }}>
        <Pressable
          onPress={() => {
            if (showCargo || showInstituicao || showLocalidade) {
              setShowCargo(false);
              setShowInstituicao(false);
              setShowLocalidade(false);
              setShowTipo(true);
            } else {
              setShowTipo(!showTipo);
            }
          }}
          style={{
            height: 40,
            display: "flex",
            flexDirection: "row",
            paddingRight: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "#000",
              fontWeight: "bold",
              fontSize: 18,
              marginVertical: 10,
            }}
          >
            Tipo
          </Text>
          <AntDesign
            size={22}
            color="#333"
            name={showTipo ? "close" : "filter"}
          />
        </Pressable>
        {showTipo && (
          <Carousel>
            {tipos.map((tipo, id) => {
              return <Item title={tipo} key={id} />;
            })}
          </Carousel>
        )}
      </View>
    );
  };

  const Instituicao = () => {
    const [selected, setSelected] = React.useState(undefined);

    const Item = ({ title }) => {
      return (
        <TouchableOpacity
          onPress={() => {
            if (instituicao) {
              if (instituicao === title) {
                setInstituicao(false);
              } else if (instituicao !== title) {
                setInstituicao(title);
              }
            } else {
              setInstituicao(title);
            }
          }}
          style={{
            height: "auto",
            width: "auto",
            marginRight: 10,
            paddingVertical: 10,
            paddingHorizontal: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#EEE",
            borderRadius: 5,
            borderWidth: 1,
            borderColor: instituicao === title ? "purple" : "#eee",
          }}
        >
          <Text>{title}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ height: "auto", marginTop: 10 }}>
        <Pressable
          onPress={() => {
            if (showTipo || showCargo || showLocalidade) {
              setShowTipo(false);
              setShowCargo(false);
              setShowLocalidade(false);
              setShowInstituicao(true);
            } else {
              setShowInstituicao(!showInstituicao);
            }
          }}
          style={{
            height: 40,
            display: "flex",
            flexDirection: "row",
            paddingRight: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "#000",
              fontWeight: "bold",
              fontSize: 18,
              marginVertical: 10,
            }}
          >
            Instituição
          </Text>
          <AntDesign
            size={22}
            color="#333"
            name={showInstituicao ? "close" : "filter"}
          />
        </Pressable>
        {showInstituicao && (
          <Carousel>
            {instituicoes.map((instituicao, id) => {
              return <Item title={instituicao} key={id} />;
            })}
          </Carousel>
        )}
      </View>
    );
  };

  const Localidade = () => {
    const [selected, setSelected] = React.useState(undefined);

    const Item = ({ title }) => {
      return (
        <TouchableOpacity
          onPress={() => {
            if (localidade) {
              if (localidade === title) {
                setLocalidade(false);
              } else if (localidade !== title) {
                setLocalidade(title);
              }
            } else {
              setLocalidade(title);
            }
          }}
          style={{
            height: "auto",
            width: "auto",
            marginRight: 10,
            paddingVertical: 10,
            paddingHorizontal: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#EEE",
            borderRadius: 5,
            borderWidth: 1,
            borderColor: localidade === title ? "purple" : "#eee",
          }}
        >
          <Text>{title}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ height: "auto", marginTop: 10 }}>
        <Pressable
          onPress={() => {
            if (showTipo || showCargo || showInstituicao) {
              setShowTipo(false);
              setShowCargo(false);
              setShowInstituicao(false);
              setShowLocalidade(true);
            } else {
              setShowLocalidade(!showLocalidade);
            }
          }}
          style={{
            height: 40,
            display: "flex",
            flexDirection: "row",
            paddingRight: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "#000",
              fontWeight: "bold",
              fontSize: 18,
              marginVertical: 10,
            }}
          >
            Localidade
          </Text>
          <AntDesign
            size={22}
            color="#333"
            name={showLocalidade ? "close" : "filter"}
          />
        </Pressable>
        {showLocalidade && (
          <Carousel>
            {localidades.map((localidade, id) => {
              return <Item title={localidade} key={id} />;
            })}
          </Carousel>
        )}
      </View>
    );
  };

  const Divider = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 1,
          marginTop: 10,
          backgroundColor: "#eee",
        }}
      />
    );
  };

  const Filter = () => {
    return (
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#eee",
          width: "100%",
          display: "flex",
          marginTop: "auto",
          marginBottom: 50,
          marginVertical: 20,
          paddingRight: 20,
        }}
      >
        <TouchableOpacity
          onPress={async () => {
            if (tipo && instituicao && cargo && localidade) {
              const response = await axios.post(
                "http://192.168.0.10:5555/api/v0/core/filter",
                {
                  tipo,
                  instituicao,
                  cargo,
                  localidade,
                }
              );
              if (response.status === 200) {
                setResults(response.data);
              }
            } else if (!tipo && instituicao && cargo && localidade) {
              const response = await axios.post(
                "http://192.168.0.10:5555/api/v0/core/filter",
                {
                  instituicao,
                  cargo,
                  localidade,
                }
              );
              if (response.status === 200) {
                setResults(response.data);
              }
            } else if (tipo && !instituicao && cargo && localidade) {
              const response = await axios.post(
                "http://192.168.0.10:5555/api/v0/core/filter",
                {
                  tipo,
                  cargo,
                  localidade,
                }
              );
              if (response.status === 200) {
                setResults(response.data);
              }
            } else if (!tipo && !instituicao && cargo && localidade) {
              const response = await axios.post(
                "http://192.168.0.10:5555/api/v0/core/filter",
                {
                  cargo,
                  localidade,
                }
              );
              if (response.status === 200) {
                setResults(response.data);
              }
            } else if (tipo && !instituicao && cargo && !localidade) {
              const response = await axios.post(
                "http://192.168.0.10:5555/api/v0/core/filter",
                {
                  cargo,
                  tipo,
                }
              );
              if (response.status === 200) {
                setResults(response.data);
              }
            } else if (tipo && instituicao && !cargo && !localidade) {
              const response = await axios.post(
                "http://192.168.0.10:5555/api/v0/core/filter",
                {
                  tipo,
                  instituicao,
                }
              );
              if (response.status === 200) {
                setResults(response.data);
              }
            } else if (!tipo && instituicao && cargo && !localidade) {
              const response = await axios.post(
                "http://192.168.0.10:5555/api/v0/core/filter",
                {
                  cargo,
                  instituicao,
                }
              );
              if (response.status === 200) {
                setResults(response.data);
              }
            } else if (!tipo && !instituicao && !cargo && localidade) {
              const response = await axios.post(
                "http://192.168.0.10:5555/api/v0/core/filter",
                {
                  localidade,
                }
              );
              if (response.status === 200) {
                setResults(response.data);
              }
            } else if (tipo && !instituicao && !cargo && !localidade) {
              const response = await axios.post(
                "http://192.168.0.10:5555/api/v0/core/filter",
                {
                  tipo,
                }
              );
              if (response.status === 200) {
                setResults(response.data);
              }
            } else if (!tipo && instituicao && !cargo && !localidade) {
              const response = await axios.post(
                "http://192.168.0.10:5555/api/v0/core/filter",
                {
                  instituicao,
                }
              );
              if (response.status === 200) {
                setResults(response.data);
              }
            } else if (!tipo && !instituicao && cargo && !localidade) {
              const response = await axios.post(
                "http://192.168.0.10:5555/api/v0/core/filter",
                {
                  cargo,
                }
              );
              if (response.status === 200) {
                setResults(response.data);
              }
            } else if (tipo && !instituicao && !cargo && localidade) {
              const response = await axios.post(
                "http://192.168.0.10:5555/api/v0/core/filter",
                {
                  tipo,
                  localidade,
                }
              );
              if (response.status === 200) {
                setResults(response.data);
              }
            } else if (!tipo && instituicao && !cargo && localidade) {
              const response = await axios.post(
                "http://192.168.0.10:5555/api/v0/core/filter",
                {
                  instituicao,
                  localidade,
                }
              );

              if (response.status === 200) {
                setResults(response.data);
              }
            } else if (tipo && instituicao && !cargo && localidade) {
              const response = await axios.post(
                "http://192.168.0.10:5555/api/v0/core/filter",
                {
                  tipo,
                  instituicao,
                  localidade,
                }
              );
              if (response.status === 200) {
                setResults(response.data);
              }
            } else if (tipo && instituicao && cargo && !localidade) {
              const response = await axios.post(
                "http://192.168.0.10:5555/api/v0/core/filter",
                {
                  tipo,
                  instituicao,
                  cargo,
                }
              );
              if (response.status === 200) {
                setResults(response.data);
              }
            }
          }}
          style={{
            height: 50,
            width: "100%",
            marginTop: 20,
            marginBottom: 10,
            backgroundColor: "#9f52df",
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "bold" }}>
            Filtrar vagas
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const Results = () => {
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
              backgroundColor: "#eee",
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
        <View style={{ padding: 0 }}>
          {results &&
            results.map((vaga) => {
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

    return (
      <View style={{ padding: 20 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
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
            onPress={() => setResults(undefined)}
          >
            <AntDesign size={25} color="#000" name="arrowleft" />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            marginTop: 10,
            color: "#000",
            fontWeight: "bold",
            fontSize: 33,
          }}
        >
          Resultado
        </Text>
        <Text
          style={{
            color: "#aaa",
            fontSize: 16,
          }}
        >
          Essas são todas as vagas que correspondem aos seus filtros
        </Text>
        <FlatVagas />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {results ? (
        <Results />
      ) : (
        <>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: Platform.OS === "ios" ? 20 : 20,
              paddingLeft: 20,
            }}
          >
            {filtering ? (
              <>
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
                  <Text>Limpar</Text>
                </TouchableOpacity>
              </>
            ) : (
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
                onPress={() => navigation.goBack()}
              >
                <AntDesign size={25} color="#000" name="close" />
              </TouchableOpacity>
            )}
          </View>
          <Text
            style={{
              marginLeft: 20,
              marginTop: 10,
              color: "#000",
              fontWeight: "bold",
              fontSize: 33,
            }}
          >
            {filtering ? "Filtros" : "Pesquisar"}
          </Text>
          <Text
            style={{
              marginLeft: 20,
              color: "#aaa",
              fontSize: 16,
            }}
          >
            {filtering
              ? "Filtre para encontrar sua vaga"
              : "Encontre a vaga perfeita pra você"}
          </Text>
          {filtering ? (
            <View
              style={{
                paddingTop: filtering ? 10 : 20,
                paddingLeft: 20,
                height: Dimensions.get("window").height - 150,
              }}
            >
              <Filters />
              {cargos && <Cargo />}
              <Divider />
              {tipos && <Tipo />}
              <Divider />
              {instituicoes && <Instituicao />}
              <Divider />
              {localidades && <Localidade />}
              <Divider />
              <Filter />
            </View>
          ) : (
            <View
              style={{
                paddingTop: filtering ? 10 : 20,
                paddingHorizontal: 20,
                height: Dimensions.get("window").height - 150,
              }}
            >
              <View
                style={{
                  height: 50,
                  width: "100%",
                  borderRadius: 50,
                  backgroundColor: "#e9e9e9",
                  display: "flex",
                  paddingLeft: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingRight: 5,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome5 name="search" size={14} color="#777" />
                  <TextInput
                    placeholder="Buscar"
                    style={{
                      color: "#777",
                      width: "78%",
                      fontWeight: "bold",
                      marginLeft: 10,
                    }}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    Keyboard.dismiss();
                    setFiltering(true);
                  }}
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 40,
                    backgroundColor: "#FEFEFE",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome5 name="filter" size={14} color="#777" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "48%",
                    height: 150,
                    backgroundColor: "#cab1db",
                    borderRadius: 5,
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      height: "auto",
                      width: "auto",
                      padding: 10,
                      borderRadius: 50,
                      backgroundColor: "#fff",
                    }}
                  >
                    <AntDesign name="home" size={33} color="#333" />
                  </View>
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}
                  >
                    4
                  </Text>
                  <Text
                    style={{ fontSize: 12, textAlign: "center", marginTop: 5 }}
                  >
                    Vagas para trabalhar de casa
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: "48%",
                    height: 150,
                    backgroundColor: "#d3bcd0",
                    padding: 10,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      height: "auto",
                      width: "auto",
                      padding: 10,
                      borderRadius: 50,
                      backgroundColor: "#fff",
                    }}
                  >
                    <AntDesign name="notification" size={33} color="#333" />
                  </View>
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}
                  >
                    6
                  </Text>
                  <Text
                    style={{ fontSize: 12, textAlign: "center", marginTop: 5 }}
                  >
                    Estágios abertos para o ano de 2022
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "48%",
                    height: 150,
                    backgroundColor: "#b1e0c3",
                    borderRadius: 5,
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      height: "auto",
                      width: "auto",
                      padding: 10,
                      borderRadius: 50,
                      backgroundColor: "#fff",
                    }}
                  >
                    <AntDesign name="dotchart" size={33} color="#333" />
                  </View>
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}
                  >
                    1
                  </Text>
                  <Text
                    style={{ fontSize: 12, textAlign: "center", marginTop: 5 }}
                  >
                    Vagas para trabalhar com estatistica
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: "48%",
                    height: 150,
                    backgroundColor: "#add8db",
                    padding: 10,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      height: "auto",
                      width: "auto",
                      padding: 10,
                      borderRadius: 50,
                      backgroundColor: "#fff",
                    }}
                  >
                    <AntDesign name="calculator" size={33} color="#333" />
                  </View>
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}
                  >
                    4
                  </Text>
                  <Text
                    style={{ fontSize: 12, textAlign: "center", marginTop: 5 }}
                  >
                    Vagas para análistas de risco
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <Modal modal={modal} setModal={setModal} modalIndex={0} />
        </>
      )}
    </View>
  );
};

export default Pesquisar;
