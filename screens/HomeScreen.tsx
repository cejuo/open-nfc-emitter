import { useState } from "react";
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  NativeModules,
  Button,
  TextInput,
  FlatList,
} from "react-native";
import Item from "../components/Item";

// Native Modules
const { HCEEmitter } = NativeModules;

const arr = [
  { title: "Test", id: "000128", expire: Date.now(), count: 2 },
  { title: "Test", id: "000128", expire: Date.now(), count: 2 },
  { title: "Test", id: "112128", expire: Date.now(), count: 1 },
  { title: "Test", id: "000128", expire: Date.now(), count: 2 },
  { title: "Test", id: "000128", expire: undefined, count: 2 },
  { title: "Test", id: "000128", expire: Date.now(), count: 2 },
  { title: "Test", id: "000128", expire: Date.now(), count: 2 },
  { title: "Test", id: "000128", expire: Date.now(), count: undefined },
  { title: "Test", id: "000128", expire: Date.now(), count: 2 },
  { title: "Test", id: "000128", expire: Date.now(), count: 2 },
  { title: "Test", id: "112128", expire: Date.now(), count: 1 },
  { title: "Test", id: "000128", expire: Date.now(), count: 2 },
  { title: "Test", id: "000128", expire: Date.now(), count: 2 },
  { title: "Test", id: "000128", expire: Date.now(), count: 2 },
  { title: "Test", id: "000128", expire: Date.now(), count: undefined },
];

export default function HomeScreen() {
  const [text, setText] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#00b4d8"}></StatusBar>
      <Text style={{ fontSize: 23, fontWeight: "600", marginBottom: 14, marginTop: 14, width: "80%" }}>
        Select a token:
      </Text>
      <FlatList
        style={{ width: "100%" }}
        data={arr}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return <Item index={index} {...item} />;
        }}
      />
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
