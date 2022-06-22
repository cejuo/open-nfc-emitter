import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StatusBar, SafeAreaView, StyleSheet, Text, View, NativeModules, TextInput, FlatList } from "react-native";
import LinearGradient from "react-native-linear-gradient";
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
  const [currentToken, setCurrentToken] = useState<any>({});

  useEffect(() => {
    dispatch(reload(navigation));
  }, []);

  useEffect(() => {
    console.log("data refreshed");
    setRefresh(!refreshData);
  }, [accountStore]);

  useEffect(() => {
    navigation.addListener("beforeRemove", (e: any) => {
      if (e.data.action.type == "GO_BACK") e.preventDefault();
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#71a5de"}></StatusBar>

      <View
        style={{
          backgroundColor: "white",
          alignItems: "center",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <Text style={{ fontSize: 23, fontWeight: "600" }}>Hola {capitalizeFirstLetter(email.split("@")[0])}! 👋</Text>
        <Button
          title="cerrar sesión"
          onPress={() => {
            AsyncStorage.clear();
            navigation.navigate("Login");
          }}
          color={"red"}
        />
      </View>

      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ width: "100%", justifyContent: "center", alignItems: "center" }}
        colors={["#d6eaff", "#add6ff", "#84c1ff"]}
      >
        <View
          style={{
            backgroundColor: "white",
            width: "83%",
            padding: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            borderRadius: 5,
            borderWidth: 0.2,
            borderColor: "gray",
            marginBottom: 45,
            marginTop: 45,
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          {currentToken.item == null ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 18, paddingBottom: 30, paddingTop: 30 }}>
                Elige un token para ver los detalles
              </Text>
            </View>
          ) : (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "600" }}>{currentToken.item.title}</Text>
                <View
                  style={{
                    borderColor: "#b7b7b7",
                    borderRadius: 4,
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: "600", color: "#b7b7b7" }}> {currentToken.index + 1} </Text>
                </View>
              </View>
              <View style={{ marginBottom: 10, width: "100%", height: 0.7, backgroundColor: "gray" }}></View>
              <Text style={{ marginBottom: 10, fontSize: 16, color: "black" }}>
                Tienes {currentToken.item.count == undefined ? "∞" : currentToken.item.count} usos restantes
              </Text>
              <Text style={{ marginBottom: 10, fontSize: 16, color: "black" }}>
                {currentToken.item.expire == undefined
                  ? "Sin fecha de expiración 😆👍"
                  : "Fecha de expiración: " + formatDate(currentToken.item.expire)}
              </Text>
            </>
          )}
        </View>
      </LinearGradient>

      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "400", marginBottom: 14, marginTop: 14, width: "80%" }}>
          👇 Elige un token: 👇
        </Text>
        <FlatList
          style={{ width: "100%" }}
          extraData={refreshData}
          data={accountStore.tokens}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <Item
                onPress={() => {
                  setCurrentToken({ item, ...{ index: index } });
                }}
                userId={accountStore.userId}
                index={index}
                {...item}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aecbeb",
    alignItems: "center",
    justifyContent: "center",
  },
});
function formatDate(date: number) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
