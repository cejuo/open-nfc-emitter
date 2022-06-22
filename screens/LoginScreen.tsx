import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StatusBar,
  Image,
  StyleSheet,
  Text,
  View,
  NativeModules,
  TextInput,
  SafeAreaView,
  ScrollView,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import Button from "../components/Button";
import { useHeaderHeight } from "@react-navigation/elements";
import { useDispatch } from "react-redux";
import { login } from "../store/actions/account";

// Native Modules
const { HCEEmitter } = NativeModules;

//@ts-ignore
export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("johndoe@example.com");
  const [password, setPassword] = useState("hola");
  const [passwordConfirm, setPasswordConfirm] = useState("hola");
  const [error, setError] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [isSignup, setIsSignup] = useState<any>(false);

  const [padding, setPadding] = useState(0);

  Keyboard.addListener("keyboardDidHide", () => {
    setPadding(0);
  });

  useEffect(() => {
    navigation.addListener("beforeRemove", (e: any) => {
      e.preventDefault();
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#71a5de"}></StatusBar>
      <View style={{ width: "90%", height: "100%", alignItems: "center", marginTop: padding * -1 }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 30,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "800" }}>¡Bienvenido a ONAPP!</Text>
          <Button
            color="darkBlue"
            title={!isSignup ? "Registrar" : "Iniciar sesión"}
            onPress={() => {
              setIsSignup(!isSignup);
            }}
          />
        </View>
        <View style={{ marginTop: 60 }}>
          <Image
            style={{ marginLeft: "auto", marginRight: "auto", marginBottom: 17, width: 140, height: 140 }}
            source={require("../assets/icon.png")}
          />
          <Text style={{ marginBottom: 10, textAlign: "center" }}>
            ¡Introduce tus credenciales para empezar a usar la aplicación!
          </Text>
          <View style={{ marginBottom: 10 }}></View>
          <TextInput
            onChangeText={(text) => {
              setEmail(text);
            }}
            onFocus={() => {
              setPadding(300);
            }}
            autoCapitalize="none"
            placeholder="Email"
            style={styles.textInputContainer}
            defaultValue={email}
          />
          <TextInput
            defaultValue={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            onFocus={() => {
              setPadding(300);
            }}
            autoCapitalize="none"
            placeholder="Contraseña"
            secureTextEntry
            style={styles.textInputContainer}
          />
          {isSignup ? (
            <TextInput
              defaultValue={password}
              onChangeText={(text) => {
                setPasswordConfirm(text);
              }}
              onFocus={() => {
                setPadding(300);
              }}
              autoCapitalize="none"
              placeholder="Confirmar contraseña"
              secureTextEntry
              style={styles.textInputContainer}
            />
          ) : null}
          <Text style={{ color: "red" }}>{error}</Text>

          <Button
            color="darkBlue"
            title={isSignup ? "Sign up" : "Login"}
            onPress={() => {
              const aFunction = async () => {
                setError("");
                setShowSpinner(true);
                const response = await dispatch(login(email, password, null, isSignup));
                //@ts-ignore
                if (!response.ok) setError(response.reason);
                else navigation.navigate("Tokens");
                setShowSpinner(false);
              };
              aFunction();
            }}
          />
          <ActivityIndicator animating={showSpinner} size={"large"} />
        </View>
      </View>

      <View style={{ position: "absolute", bottom: 0, width: "85%", marginBottom: 5 }}>
        <Text style={{ textAlign: "right", color: "gray" }}>Juan Francisco Vilas Correa</Text>
        <Text style={{ textAlign: "right", color: "gray" }}>Universidad de Málaga</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInputContainer: {
    borderWidth: 0.2,
    padding: 13,
    borderRadius: 5,
    marginBottom: 10,
  },
});
