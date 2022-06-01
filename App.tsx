import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, NativeModules, Button, TextInput } from "react-native";
const { HCEEmitter } = NativeModules;

export default function App() {
  const [text, setText] = useState("");
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text>Current text: "{text}"</Text>
      <TextInput
        placeholder="set text"
        style={{ padding: 10, backgroundColor: "grey" }}
        onChangeText={(text) => setText(text)}
      />
      <Button title="Send message" onPress={() => HCEEmitter.sendMessage(text)} />
      <StatusBar style="auto" />
    </View>
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
