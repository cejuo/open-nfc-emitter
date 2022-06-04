import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
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
  const [error, setError] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

  const [padding, setPadding] = useState(0);

  Keyboard.addListener("keyboardDidHide", () => {
    setPadding(0);
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "90%", height: "100%", alignItems: "center", marginTop: padding * -1 }}>
        <Text style={{ fontSize: 20, fontWeight: "800", marginTop: 50, width: "100%" }}>Welcome to ONAPP!</Text>
        <View style={{ marginTop: 60 }}>
          <Image
            style={{ marginLeft: "auto", marginRight: "auto", marginBottom: 17, width: 140, height: 140 }}
            source={require("../assets/icon.png")}
          />
          <Text style={{ marginBottom: 10 }}>Enter your phone number to start using the app!</Text>
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
            placeholder="Password"
            secureTextEntry
            style={styles.textInputContainer}
          />
          <Text style={{ color: "red" }}>{error}</Text>

          <Button
            color="darkBlue"
            title="Login"
            onPress={() => {
              const aFunction = async () => {
                setError("");
                setShowSpinner(true);
                const response = await dispatch(login(email, password, null));
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
