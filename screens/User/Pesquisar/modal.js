import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import React, {
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  TextInput,
  ScrollView,
  Keyboard,
} from "react-native";
import { Modalize } from "react-native-modalize";
import AuthContext from "../../../context/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";

import styled from "styled-components/native";

const Carousel = styled.ScrollView.attrs(() => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingRight: 10,
  },
}))``;

export function Modal(props) {
  const [opened, setOpened] = useState(false);

  const [keyboardAvoid, setKeyboardAvoid] = useState(false);

  const modalizeRef = useRef(<Modalize />);

  const { user, signOut } = React.useContext(AuthContext);

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

  const navigation = useNavigation();

  // Função executada apenas quando o componente for montado pela primeira vez
  useEffect(() => {
    handleFiltering();
    FetchFilters();

    let { setModal, modal, modalIndex } = props;

    modal[modalIndex] = {
      openModal: () => openModal(),
      closeModal: () => closeModal(),
    };

    setModal(modal);
  }, []);

  const handleFiltering = async () => {
    if (tipo && instituicao && cargo && localidade) {
      const filter = {
        tipo,
        instituicao,
        cargo,
        localidade,
      };
    } else if (!tipo && instituicao && cargo && localidade) {
      const filter = {
        instituicao,
        cargo,
        localidade,
      };
    } else if (!tipo && !instituicao && cargo && localidade) {
      const filter = {
        cargo,
        localidade,
      };
    } else if (!tipo && !instituicao && !cargo && localidade) {
      const filter = {
        localidade,
      };
    } else if (tipo && !instituicao && !cargo && localidade) {
      const filter = {
        tipo,
        cargo,
        localidade,
      };
    } else if (tipo && instituicao && !cargo && localidade) {
      const filter = {
        tipo,
        instituicao,
        localidade,
      };
    } else if (tipo && instituicao && cargo && !localidade) {
      const filter = {
        tipo,
        instituicao,
        cargo,
      };
    }
  };

  const handlerStateChange = (state) => {
    setOpened(state);
  };

  const openModal = () => {
    modalizeRef.current.open();
  };

  const closeModal = () => {
    modalizeRef.current.close();
  };

  const FetchFilters = async () => {
    const response = await axios.get(
      "http://192.168.0.10:5555/api/v0/core/filter/filters"
    );
    setTipos(response.data.tipos);
    setInstituicoes(response.data.instituicoes);
    setCargos(response.data.cargos);
    setLocalidades(response.data.localidades);
  };

  const renderHeader = useCallback(() => {
    return (
      <>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingTop: 20,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginVertical: 10,
              color: "#000",
              fontWeight: "bold",
              fontSize: 33,
            }}
          >
            Filtros
          </Text>
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.removeItem("@Core:filter").then(() => {
                setTipo(undefined);
                setCargo(undefined);
                setInstituicao(undefined);
                setLocalidade(undefined);
                setShowTipo(false);
                setShowCargo(false);
                setShowInstituicao(false);
                setShowLocalidade(false);
              });
            }}
          >
            <Text
              style={{
                marginVertical: 10,
                color: "blue",
                textDecorationLine: "underline",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Limpar
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }, []);

  const renderContent = useCallback(() => {
    const Categoria = () => {
      const [selected, setSelected] = React.useState(undefined);

      const Item = ({ title }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              selected ? setSelected(undefined) : setSelected(title);
            }}
            style={{
              height: "auto",
              width: "auto",
              paddingVertical: 10,
              paddingHorizontal: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#EEE",
              borderRadius: 5,
              borderWidth: selected ? 1 : 0,
              borderColor: selected ? "blue" : null,
            }}
          >
            <Text>{title}</Text>
          </TouchableOpacity>
        );
      };

      return (
        <View style={{ height: "auto" }}>
          <Text style={{ color: "#000", fontWeight: "bold", marginBottom: 10 }}>
            Categoria
          </Text>
          <Carousel>
            <Item title="Design" />
          </Carousel>
        </View>
      );
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
              borderColor: cargo === title ? "blue" : "#eee",
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
              borderColor: tipo === title ? "blue" : "#eee",
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
              borderColor: instituicao === title ? "blue" : "#eee",
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
              borderColor: localidade === title ? "blue" : "#eee",
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
            backgroundColor: "#FFF",
            borderTopWidth: 1,
            borderTopColor: "#eee",
            width: "100%",
            marginVertical: 20,
            paddingRight: 20,
          }}
        >
          <TouchableOpacity
            onPress={handleFiltering}
            style={{
              height: 50,
              width: "100%",
              marginTop: 20,
              marginBottom: 10,
              backgroundColor: "blue",
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

    return (
      <>
        <View style={{ paddingLeft: 20 }}>
          <Filters />
          {cargos && <Cargo />}
          <Divider />
          {tipos && <Tipo />}
          <Divider />
          {instituicoes && <Instituicao />}
          <Divider />
          {localidades && <Localidade />}
          <Filter />
        </View>
      </>
    );
  }, [
    tipos,
    instituicoes,
    localidades,
    cargos,
    tipo,
    instituicao,
    localidade,
    cargo,
    showCargo,
    showInstituicao,
    showTipo,
    showLocalidade,
  ]);

  const modalHeight = tipo || cargo || instituicao || localidade ? 470 : 430;

  const modalHandler =
    showCargo || showTipo || showLocalidade || showInstituicao
      ? modalHeight + 40
      : modalHeight;

  return (
    <>
      <Modalize
        handlePosition="inside"
        ref={modalizeRef}
        onOpened={() => handlerStateChange(true)}
        onClosed={() => {}}
        HeaderComponent={renderHeader}
        modalHeight={modalHandler}
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
