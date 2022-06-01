import { useEffect, useState } from "react";
import { StyleSheet, Text, View, NativeModules, Button, TextInput, SafeAreaView } from "react-native";
import PhoneInput from "react-native-phone-number-input";

// Native Modules
const { HCEEmitter } = NativeModules;

//@ts-ignore
export default function LoginScreen({ navigation }) {
  const [text, setText] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "90%", height: "100%", alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "800", marginTop: 50, width: "100%" }}>Welcome to ONAPP!</Text>
        <View style={{ marginTop: 100 }}>
          <Text style={{ marginBottom: 10 }}>Enter your phone number to start using the app!</Text>
          <PhoneInput
            defaultValue={""}
            defaultCode="ES"
            layout="first"
            onChangeText={(text) => {
              //setValue(text);
            }}
            onChangeFormattedText={(text) => {
              //setFormattedValue(text);
            }}
            autoFocus
          />
          <View style={{ marginBottom: 10 }}></View>
          <Button title="Login" onPress={() => HCEEmitter.sendMessage(text)} />
          <Button title="Login" onPress={() => navigation.navigate("Tokens")} />
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
});
