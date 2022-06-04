import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StatusBar, SafeAreaView, StyleSheet, Text, View, NativeModules, TextInput, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import Item from "../components/Item";
import { reload } from "../store/actions/account";

// Native Modules
const { HCEEmitter } = NativeModules;

const jun13 = 1655108693000;
const arr = [
  { title: "Test", id: "000128", expire: jun13, count: 2 },
  { title: "Test", id: "000128", expire: 1654244693000, count: 2 },
  { title: "Test", id: "112128", expire: jun13, count: 1 },
  { title: "Test", id: "000128", expire: jun13, count: 2 },
  { title: "Test", id: "000128", expire: undefined, count: undefined },
  { title: "Test", id: "000128", expire: undefined, count: 2 },
  { title: "Test", id: "000128", expire: jun13, count: 2 },
  { title: "Test", id: "000128", expire: jun13, count: 2 },
  { title: "Test", id: "000128", expire: jun13, count: undefined },
  { title: "Test", id: "000128", expire: jun13, count: 2 },
  { title: "Test", id: "000128", expire: jun13, count: 2 },
  { title: "Test", id: "112128", expire: jun13, count: 1 },
  { title: "Test", id: "000128", expire: jun13, count: 2 },
  { title: "Test", id: "000128", expire: jun13, count: 2 },
  { title: "Test", id: "000128", expire: jun13, count: 2 },
  { title: "Test", id: "000128", expire: undefined, count: undefined },
];

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//@ts-ignore
export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const accountStore = useSelector((state: any) => state.accountStore);
  const [email, setEmail] = useState(accountStore.email);
  const [refreshData, setRefresh] = useState(true);

  useEffect(() => {
    dispatch(reload(navigation));
  }, []);

  useEffect(() => {
    console.log("data refreshed");
    setRefresh(!refreshData);
  }, [accountStore]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#00b4d8"}></StatusBar>

      <View
        style={{
          marginTop: 13,
          alignItems: "center",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <Text style={{ fontSize: 23, fontWeight: "600" }}>Hi {capitalizeFirstLetter(email.split("@")[0])}! 👋</Text>
        <Button
          title="LOGOUT"
          onPress={() => {
            AsyncStorage.clear();
            navigation.navigate("Login");
          }}
          color={"red"}
        />
      </View>
      <Text style={{ fontSize: 20, fontWeight: "400", marginBottom: 14, marginTop: 14, width: "80%" }}>
        👇 Select a token: 👇
      </Text>
      <FlatList
        style={{ width: "100%" }}
        extraData={refreshData}
        data={accountStore.tokens}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return <Item userId={accountStore.userId} index={index} {...item} />;
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
