import React from "react";
import {
  View,
  Image,
  ImageBackground,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  TextInput,
  ScrollView,
} from "react-native";

import AppIntroSlider from "react-native-app-intro-slider";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Logo from "../../assets/financial-black.jpeg";
import LogoCircle from "../../assets/financial-icon.png";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";

import { LoginModal } from "./loginModal";
import AuthContext from "../../context/auth";

const Auth = () => {
  const navigation = useNavigation();

  const { user, setUser, signUp } = React.useContext(AuthContext);

  const [error, setError] = React.useState(undefined);

  const [modal, setModal] = React.useState([]);

  const [showIntro, setShowIntro] = React.useState(true);

  const [login, setLogin] = React.useState(false);
  const [register, setRegister] = React.useState(false);
  const [otp, setOtp] = React.useState(false);

  const [nome, setNome] = React.useState(undefined);
  const [email, setEmail] = React.useState(undefined);
  const [telefone, setTelefone] = React.useState(undefined);
  const [cpf, setCpf] = React.useState(undefined);
  const [senha, setSenha] = React.useState(undefined);
  const [repita, setRepita] = React.useState(undefined);

  const [keyboardAvoid, setKeyboardAvoid] = React.useState(false);

  React.useLayoutEffect(() => {
    getIntroShow();
    if (repita !== senha) {
      setError("As senhas não se coencidem");
    } else {
      setError(undefined);
    }
  }, [senha, repita]);

  const handleSignUp = async () => {
    const response = await signUp(nome, email, telefone, cpf, senha);
    if (response) {
      setError(response);
    }
  };

  const storeIntroShow = async () => {
    try {
      await AsyncStorage.setItem("@introShow", "false");
    } catch (e) {
      // saving error
    }
  };

  const getIntroShow = async () => {
    try {
      await AsyncStorage.getItem("@introShow").then((value) => {
        if (value === "true") {
          setShowIntro(true);
        }
        if (value === "false") {
          setShowIntro(false);
        }
      });
    } catch (e) {
      // error reading value
    }
  };

  const onSkip = () => {
    storeIntroShow(false);
    setShowIntro(false);
  };

  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={{ color: "#fff" }}>Próximo</Text>
      </View>
    );
  };

  const _renderDoneButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          storeIntroShow();
          setShowIntro(false);
        }}
        style={styles.buttonCircleDone}
      >
        <Text style={{ color: "#000" }}>Pronto!</Text>
      </TouchableOpacity>
    );
  };

  const RenderItem = ({ item }) => {
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    return (
      <View style={{ backgroundColor: "#000", flex: 1, paddingHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 26,
            color: "#fff",
            marginTop: Dimensions.get("window").height / 1.75,
            fontWeight: "bold",
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: "#aaa",
            textAlign: "left",
            marginBottom: "20%",
          }}
        >
          {item.text}
        </Text>
      </View>
    );
  };

  const Dev = () => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          marginTop: 350,
          justifyContent: "space-between",
          marginLeft: 30,
          position: "absolute",
          zIndex: 3,
        }}
      >
        <View>
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.setItem("@introShow", "true");
              setShowIntro(true);
            }}
            style={{
              height: 50,
              width: 50,
              backgroundColor: "purple",
            }}
          ></TouchableOpacity>
          <Text style={{ color: "#fff" }}>Show Intro</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              setUser({
                nome: "Esse é Usuário",
                tipo: "User",
                id: 2,
              });
            }}
            style={{
              marginLeft: 10,
              height: 50,
              width: 50,
              backgroundColor: "pink",
            }}
          ></TouchableOpacity>
          <Text style={{ color: "#fff" }}>Set User</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              setUser({
                nome: "Esse é da Staff",
                tipo: "Staff",
                id: 3,
              });
            }}
            style={{
              marginLeft: 10,
              height: 50,
              width: 50,
              backgroundColor: "#c8a2c8",
            }}
          ></TouchableOpacity>
          <Text style={{ color: "#fff" }}>Set Staff</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              storeIntroShow(true);
              setShowIntro(true);
            }}
            style={{
              marginLeft: 10,
              height: 50,
              width: 50,
              backgroundColor: "#aaf2c8",
            }}
          ></TouchableOpacity>
          <Text style={{ color: "#fff" }}>Light/Dark</Text>
        </View>
      </View>
    );
  };

  const Login = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
          paddingHorizontal: 20,
          paddingTop: Platform.OS === "ios" ? 40 : 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: 10,
          }}
        >
          <TouchableOpacity
            style={{ display: "flex", flexDirection: "row" }}
            onPress={() => {
              setError(undefined);
              setLogin(false);
            }}
          >
            <AntDesign name="arrowleft" size={24} color="#fff" />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 24,
                color: "#FFF",
              }}
            >
              Voltar
            </Text>
          </TouchableOpacity>
          {/* <Entypo name="help-with-circle" size={24} color="#FFF" /> */}
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: Platform.OS === "ios" ? 30 : 20,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => modal[0].openModal()}
            style={{
              marginTop: 10,
              height: 50,
              display: "flex",
              flexDirection: "row",
              paddingHorizontal: 20,
              width: "100%",
              borderRadius: 5,
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#FFF",
            }}
          >
            <Text style={{ fontSize: 18, color: "#000" }}>
              Login com o seu email
            </Text>
            <AntDesign name="mail" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 10,
              height: 50,
              display: "flex",
              flexDirection: "row",
              paddingHorizontal: 20,
              width: "100%",
              borderRadius: 5,
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#FFF",
            }}
          >
            <Text style={{ fontSize: 18, color: "#000" }}>
              Login com o seu telefone
            </Text>
            <AntDesign name="phone" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 10,
              height: 50,
              display: "flex",
              flexDirection: "row",
              paddingHorizontal: 20,
              width: "100%",
              borderRadius: 5,
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#FFF",
            }}
          >
            <Text style={{ fontSize: 18, color: "#000" }}>
              Login com o Google
            </Text>
            <AntDesign name="google" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const Authentication = () => {
    const [dev, setDev] = React.useState(false);

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
          paddingTop: "56%",
          paddingHorizontal: 30,
        }}
      >
        <Dev />
        {/* <TouchableOpacity
          onPress={() => setDev(!dev)}
          style={{
            marginTop: -190,
            height: 50,
            width: 50,
            backgroundColor: "purple",
            borderRadius: 5,
          }}
        /> */}
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            marginTop: "120%",
            width: "100%",
            textAlign: "left",
          }}
        >
          Selecione para continuar
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: Platform.OS === "ios" ? 30 : 20,
            marginTop: "auto",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setRegister(true);
            }}
            style={{
              height: 150,
              width: "49%",
              padding: 15,
              backgroundColor: "#fff",
              justifyContent: "flex-end",
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                textAlign: "left",
              }}
            >
              Quero me ingressar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setLogin(true);
            }}
            style={{
              height: 150,
              width: "49%",
              padding: 15,
              backgroundColor: "#fff",
              justifyContent: "flex-end",
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                textAlign: "left",
              }}
            >
              Já sou ingressado
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const Otp = () => {
    const [pin1, setPin1] = React.useState(undefined);
    const [pin2, setPin2] = React.useState(undefined);
    const [pin3, setPin3] = React.useState(undefined);
    const [pin4, setPin4] = React.useState(undefined);

    const pin1ref = React.useRef();
    const pin2ref = React.useRef();
    const pin3ref = React.useRef();
    const pin4ref = React.useRef();

    React.useEffect(() => {
      pin1ref.current.focus();
    }, []);

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
          padding: 20,
          paddingTop: Platform.OS === "ios" ? 40 : 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: 10,
          }}
        >
          <TouchableOpacity
            style={{ display: "flex", flexDirection: "row" }}
            onPress={() => {
              setOtp(false);
              setRegister(true);
            }}
          >
            <AntDesign name="arrowleft" size={24} color="#fff" />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 24,
                color: "#FFF",
              }}
            >
              Voltar
            </Text>
          </TouchableOpacity>
          <Entypo name="help-with-circle" size={24} color="#FFF" />
        </View>
        <Text
          style={{
            color: "#FFF",
            fontSize: 33,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          Verificação OTP
        </Text>
        <Text style={{ color: "#AAA", fontSize: 16, marginTop: 10 }}>
          {`Verifique suas mensagens (SMS).\nNós enviamos seu CÓDIGO de verificação para o celular cadastrado`}
        </Text>
        <View
          style={{
            marginTop: 30,
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <TextInput
            ref={pin1ref}
            value={pin1}
            onChangeText={(pin1) => {
              setPin1(pin1);
              if (pin1.length !== "") {
                pin2ref.current.focus();
              }
            }}
            maxLength={1}
            style={{
              marginRight: 20,
              padding: 10,
              fontSize: 33,
              justifyContent: "center",
              alignItems: "center",
              height: 45,
              width: 40,
              borderRadius: 5,
              backgroundColor: "#FFF",
            }}
          />
          <TextInput
            ref={pin2ref}
            maxLength={1}
            value={pin2}
            onChangeText={(pin2) => {
              setPin2(pin2);
              if (pin2.length !== "") {
                pin3ref.current.focus();
              }
            }}
            style={{
              marginRight: 20,
              padding: 10,
              fontSize: 33,
              justifyContent: "center",
              alignItems: "center",
              height: 45,
              width: 40,
              borderRadius: 5,
              backgroundColor: "#FFF",
            }}
          />
          <TextInput
            ref={pin3ref}
            maxLength={1}
            value={pin3}
            onChangeText={(pin3) => {
              setPin3(pin3);
              if (pin3.length !== "") {
                pin4ref.current.focus();
              }
            }}
            style={{
              marginRight: 20,
              padding: 10,
              fontSize: 33,
              justifyContent: "center",
              alignItems: "center",
              height: 45,
              width: 40,
              borderRadius: 5,
              backgroundColor: "#FFF",
            }}
          />
          <TextInput
            ref={pin4ref}
            value={pin4}
            onChangeText={(pin4) => {
              setPin4(pin4);
              if (pin4.length !== "") {
                //
              }
            }}
            maxLength={1}
            style={{
              marginRight: 20,
              padding: 10,
              fontSize: 33,
              justifyContent: "center",
              alignItems: "center",
              height: 45,
              width: 40,
              borderRadius: 5,
              backgroundColor: "#FFF",
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setRegister(false);
            setOtp(true);
          }}
          style={{
            marginTop: 30,
            marginVertical: 30,
            height: 50,
            width: "100%",
            backgroundColor: "purple",
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", color: "#FFF" }}>
            Verificar agora
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: "#AAA",
            fontSize: 16,
            width: "100%",
            textAlign: "center",
          }}
        >
          Não recebeu o código via SMS?
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              marginTop: 10,
              color: "#FFF",
              fontSize: 16,
              width: "100%",
              textDecorationLine: "underline",
              textAlign: "center",
            }}
          >
            Reenviar código
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View
        style={{
          justifyContent: "center",
          width: "100%",
          position: "absolute",
          zIndex: 1,
          marginTop: "20%",
        }}
      >
        {!register && !otp ? (
          <Image source={Logo} style={{ height: 120, width: 120 }} />
        ) : null}

        {!showIntro && !register && !otp ? (
          <>
            <Text
              style={{
                color: "#FFF",
                fontSize: 33,
                marginLeft: 30,
                fontWeight: "bold",
                width: "90%",
                textAlign: "left",
              }}
            >
              Da Universidade ao Mercado Financeiro
            </Text>
            <Text
              style={{
                color: "#777",
                fontSize: 16,
                marginLeft: 30,
                width: "90%",
                textAlign: "left",
              }}
            >
              A forma mais inteligente de ingressar no mercado financeiro
            </Text>
          </>
        ) : null}
      </View>
      {/* <Text
        style={{
          position: "absolute",
          zIndex: 1,
          textAlign: "center",
          width: "100%",
          color: "#fff",
          display: "flex",
          marginTop: Platform.OS === "ios" ? "15%" : "5%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 10,
          fontSize: 32,
        }}
      >
        Financial Co.
      </Text> */}
      {showIntro ? (
        <>
          <AppIntroSlider
            activeDotStyle={{ width: 30, backgroundColor: "#fff" }}
            data={slides}
            renderItem={RenderItem}
            showDoneButton={true}
            showSkipButton={false}
            showNextButton={true}
            dotStyle={{ backgroundColor: "#333" }}
            onSkip={onSkip}
            bottomButton={true}
            renderNextButton={_renderNextButton}
            renderDoneButton={_renderDoneButton}
          />
        </>
      ) : login ? (
        <Login />
      ) : register ? (
        <View
          style={{
            flex: 1,
            backgroundColor: "#000",
            padding: 20,
            paddingTop: Platform.OS === "ios" ? 40 : 20,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 10,
            }}
          >
            <TouchableOpacity
              style={{ display: "flex", flexDirection: "row" }}
              onPress={() => setRegister(false)}
            >
              <AntDesign name="arrowleft" size={24} color="#fff" />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 24,
                  color: "#FFF",
                }}
              >
                Voltar
              </Text>
            </TouchableOpacity>
            {/* <Entypo name="help-with-circle" size={24} color="#FFF" /> */}
          </View>

          <KeyboardAwareScrollView style={{ flex: 1, width: "100%" }}>
            <Text
              style={{
                fontSize: 30,
                color: "#FFF",
                textAlign: "left",
                width: "100%",
              }}
            >
              Ingresse agora!
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#aaa",
                textAlign: "left",
                width: "100%",
              }}
            >
              Crie a sua conta para conhecer as melhores vagas do mercado
              financeiro
            </Text>
            <View
              style={{
                marginTop: 20,
                width: "100%",
                height: 50,
                backgroundColor: "#FFF",
                borderRadius: 5,
                paddingLeft: 10,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "40%" }}>
                <Text style={{ fontWeight: "bold" }}>Nome Completo</Text>
              </View>
              <TextInput
                value={nome}
                autoCapitalize="words"
                onChangeText={(nome) => {
                  setNome(nome);
                }}
                style={{
                  height: 50,
                  width: "60%",
                  backgroundColor: "#FFF",
                  borderRadius: 5,
                  padding: 10,
                }}
              />
            </View>
            <View
              style={{
                marginTop: 10,
                width: "100%",
                height: 50,
                backgroundColor: "#FFF",
                borderRadius: 5,
                paddingLeft: 10,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "40%" }}>
                <Text style={{ fontWeight: "bold" }}>Celular (+55)</Text>
              </View>
              <TextInput
                value={telefone}
                maxLength={11}
                keyboardType="number-pad"
                onChangeText={(telefone) => setTelefone(telefone)}
                style={{
                  height: 50,
                  width: "60%",
                  backgroundColor: "#FFF",
                  borderRadius: 5,
                  padding: 10,
                }}
                placeholder="Utilize somente números"
              />
            </View>
            <View
              style={{
                marginTop: 10,
                width: "100%",
                height: 50,
                backgroundColor: "#FFF",
                borderRadius: 5,
                paddingLeft: 10,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "40%" }}>
                <Text style={{ fontWeight: "bold" }}>E-mail</Text>
              </View>
              <TextInput
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={{
                  height: 50,
                  width: "60%",
                  backgroundColor: "#FFF",
                  borderRadius: 5,
                  padding: 10,
                }}
                placeholder="e.g. contato@financial.co"
              />
            </View>
            <View
              style={{
                marginTop: 10,
                width: "100%",
                height: 50,
                backgroundColor: "#FFF",
                borderRadius: 5,
                paddingLeft: 10,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "40%" }}>
                <Text style={{ fontWeight: "bold" }}>CPF</Text>
              </View>
              <TextInput
                value={cpf}
                keyboardType="number-pad"
                maxLength={11}
                onChangeText={(cpf) => setCpf(cpf)}
                style={{
                  height: 50,
                  width: "60%",
                  backgroundColor: "#FFF",
                  borderRadius: 5,
                  padding: 10,
                }}
                placeholder="Utilize somente números"
              />
            </View>
            <View
              style={{
                marginTop: 10,
                width: "100%",
                height: 50,
                backgroundColor: "#FFF",
                borderRadius: 5,
                paddingLeft: 10,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "40%" }}>
                <Text style={{ fontWeight: "bold" }}>Senha</Text>
              </View>
              <TextInput
                value={senha}
                onChangeText={(senha) => setSenha(senha)}
                secureTextEntry={true}
                style={{
                  height: 50,
                  width: "60%",
                  backgroundColor: "#FFF",
                  borderRadius: 5,
                  padding: 10,
                }}
              />
            </View>
            <View
              style={{
                marginTop: 10,
                width: "100%",
                height: 50,
                backgroundColor: "#FFF",
                borderRadius: 5,
                paddingLeft: 10,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "40%" }}>
                <Text style={{ fontWeight: "bold" }}>Repita a Senha</Text>
              </View>
              <TextInput
                value={repita}
                onChangeText={(repita) => {
                  setRepita(repita);
                }}
                secureTextEntry={true}
                style={{
                  height: 50,
                  width: "60%",
                  backgroundColor: "#FFF",
                  borderRadius: 5,
                  padding: 10,
                }}
              />
            </View>
            <Text
              style={{
                marginTop: 5,
                fontSize: 14,
                color: "#777",
                textAlign: "left",
                width: "100%",
              }}
            >
              Sua senha deve conter no mínimo 6 caracteres, um número, uma letra
              maiúscula e um caractere especial (símbolo).
            </Text>
            {error ? (
              <Text style={{ fontWeight: "bold", color: "red", marginTop: 20 }}>
                {error}
              </Text>
            ) : null}
            <TouchableOpacity
              onPress={() => {
                if (!nome) {
                  setError("Qual é o seu nome");
                } else if (!telefone) {
                  setError("Qual é o seu telefone");
                } else if (!email) {
                  setError("Qual é o seu email");
                } else if (!cpf) {
                  setError("Qual é o seu cpf");
                } else if (!senha) {
                  setError("Qual é a sua senha");
                } else if (!repita) {
                  setError("Repita sua senha");
                } else {
                  handleSignUp();
                }
              }}
              style={{
                marginTop: error ? 10 : 30,
                marginBottom: 30,
                height: 50,
                width: "100%",
                backgroundColor: "purple",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold", color: "#FFF" }}>
                Criar a sua conta
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                marginTop: 5,
                marginBottom: 10,
                fontSize: 14,
                color: "#eee",
                textAlign: "center",
                width: "100%",
              }}
            >
              Ao criar sua conta você concorda com nossos{" "}
              <Text style={{ fontWeight: "bold" }}>Termos de Uso</Text> e com a{" "}
              <Text style={{ fontWeight: "bold" }}>
                Politíca de Privacidade
              </Text>
            </Text>
          </KeyboardAwareScrollView>
        </View>
      ) : otp ? (
        <Otp />
      ) : (
        <Authentication />
      )}
      <LoginModal modal={modal} setModal={setModal} modalIndex={0} />
    </>
  );
};

const slides = [
  {
    key: "s1",

    title: "Para melhorar a sua vida",
    text: "Somos a primeira plataforma especializada na conexão dos universitários com o mercado financeiro",
    image: {
      uri: "https://images.pexels.com/photos/4391479/pexels-photo-4391479.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    },
    backgroundColor: "#febe29",
  },
  {
    key: "s2",
    title: "Tudo em um só lugar",
    text: "Conecte-se com os melhores players do mercado financeiro e conte conosco para mudar o seu futuro profissional",
    image: {
      uri: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    backgroundColor: "#22bcb5",
  },
  {
    key: "s3",
    title: "Contamos com você",
    text: "Encontre todas as vagas organizadas de forma setorial e não se preocupe mais em buscar vagas em diversas outras plataformas ao mesmo tempo",
    image: {
      uri: "https://images.pexels.com/photos/4350099/pexels-photo-4350099.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    },
    backgroundColor: "#20d2bb",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
  },
  titleStyle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  paragraphStyle: {
    padding: 20,
    textAlign: "center",
    fontSize: 16,
  },
  introImageStyle: {
    width: 200,
    height: 200,
  },
  introTextStyle: {
    marginTop: "auto",
    display: "flex",
    width: "50%",
    fontSize: 18,
    color: "white",
    textAlign: "center",
    paddingVertical: 30,
  },
  introTitleStyle: {
    marginTop: "auto",
    width: "40%",
    fontSize: 35,
    color: "white",
    textAlign: "left",
    fontWeight: "bold",
  },
  buttonCircle: {
    width: "100%",
    height: 50,
    backgroundColor: "#333",
    opacity: 0.6,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonCircleDone: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Auth;
