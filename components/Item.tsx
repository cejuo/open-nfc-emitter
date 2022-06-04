import { useEffect, useState } from "react";
import { Modal, NativeModules, StyleSheet, Text, View, Pressable, Alert, ToastAndroid } from "react-native";
import { useSelector } from "react-redux";
import Button from "./Button";

const { HCEEmitter } = NativeModules;

export default function Item(props: any) {
  const accountStore = useSelector((state: any) => state.accountStore);
  const [background, setBackground] = useState("#fff");
  const [expired, setExpired] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    ToastAndroid.show("Token updated", 1000);
    setShowModal(false);
  }, [accountStore]);

  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (props.expire != undefined) {
      if (Date.now() > props.expire) {
        setExpired(true);
      }
    }
  });

  return (
    <Pressable
      onPress={() => {
        if (expired) {
          ToastAndroid.show("You can't use a expired token", 1000);
          return;
        }
        console.log("sending info: " + JSON.stringify(props));
        const token = { userId: props.userId, id: props.id };

        setShowModal(true);
        HCEEmitter.sendMessage(JSON.stringify(token));
      }}
      onPressIn={() => {
        setBackground("#cecece");
      }}
      onPressOut={() => {
        setBackground("#fff");
      }}
    >
      {/* Modals */}

      <Modal style={{ position: "absolute", zIndex: -99 }} transparent={true} animationType="fade" visible={showModal}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.3)" }}></View>
      </Modal>

      <Modal transparent={true} animationType="slide" visible={showModal}>
        <View style={{ flex: 2, backgroundColor: "rgba(0,0,0,0.0)" }}></View>
        <View style={styles.topModalContainer}>
          <Text style={{ fontWeight: "600", fontSize: 20, marginBottom: 10 }}>Approach the NFC reader</Text>
          <Text style={{ fontSize: 16, marginBottom: 30 }}>Sending info for "{props.title}"...</Text>
          <Button
            title="cancel"
            onPress={() => {
              setShowModal(false);
            }}
          />
        </View>
      </Modal>
      <View style={[styles.itemContainer, { backgroundColor: background }]}>
        <View style={styles.indexContainer}>
          <Text style={styles.indexText}>{props.index + 1}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.titleText}>{props.title}</Text>
          <View style={{ flexDirection: "row" }}>
            {props.expire != undefined ? <Text style={styles.dateText}>{formatDate(props.expire)}</Text> : null}
            {expired ? <Text style={[styles.dateText, { marginLeft: 10, color: "#f4acb7" }]}>{"Expired"}</Text> : null}
          </View>
        </View>
        <View
          style={[
            styles.countContainer,
            {
              borderColor:
                props.count == undefined
                  ? "#2a9d8f"
                  : props.count <= 1
                  ? "#e63946"
                  : props.count == undefined
                  ? "#2a9d8f"
                  : "#e5e5e5",
            },
          ]}
        >
          <Text
            style={[
              styles.countText,
              {
                color:
                  props.count == undefined
                    ? "#2a9d8f"
                    : props.count <= 1
                    ? "#e63946"
                    : props.count == undefined
                    ? "#2a9d8f"
                    : "black",
              },
            ]}
          >
            {props.count || (props.count == 0 ? "0" : "∞")}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  topModalContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    width: "85%",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    marginBottom: 13,
  },
  dataContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  titleText: {
    fontSize: 18,
  },
  dateText: {
    fontSize: 16,
    color: "#a1a1a1",
  },
  countContainer: {
    borderWidth: 2,
    borderColor: "#e5e5e5",
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 17,
    paddingRight: 17,
    borderRadius: 10,
  },
  countText: {
    fontSize: 20,
    fontWeight: "600",
  },
  indexContainer: {
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 17,
    paddingRight: 17,
    borderRadius: 10,
  },
  indexText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#b7b7b7",
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
