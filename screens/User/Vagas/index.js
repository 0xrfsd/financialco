import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Pressable,
  TouchableOpacity,
  Text,
  Platform,
  TextInput,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components/native";

const Carousel = styled.ScrollView.attrs(() => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {},
}))``;

import { useNavigation } from "@react-navigation/native";

const Vagas = ({ route }) => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 20,
          paddingHorizontal: 20,
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
          onPress={() => navigation.goBack()}
        >
          <AntDesign size={25} color="#000" name="close" />
        </TouchableOpacity>
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
        Vagas
      </Text>
      <Text
        style={{
          marginLeft: 20,
          color: "#aaa",
          fontSize: 16,
        }}
      >
        Encontre a vaga perfeita pra você
      </Text>
      <View style={{ paddingTop: 20, marginHorizontal: 20 }}>
        <View
          style={{
            height: 50,
            width: "100%",
            borderRadius: 50,
            backgroundColor: "#e9e9e9",
            display: "flex",
            paddingLeft: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <FontAwesome5 name="search" size={14} color="#777" />
          <TextInput
            placeholder="Buscar"
            style={{
              color: "#777",
              width: "100%",
              fontWeight: "bold",
              marginLeft: 10,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Vagas;
