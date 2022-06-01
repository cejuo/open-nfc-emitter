import { useState } from "react";
import { StyleSheet, Text, View, Pressable, Alert } from "react-native";

export default function Item(props: any) {
  const [background, setBackground] = useState("#fff");
  return (
    <Pressable
      onPress={() => {
        console.log("sending info: " + props.id);
        Alert.alert("Approach the NFC reader", `Sending info for "${props.title}"...`);
      }}
      onPressIn={() => {
        setBackground("#cecece");
      }}
      onPressOut={() => {
        setBackground("#fff");
      }}
    >
      <View style={[styles.itemContainer, { backgroundColor: background }]}>
        <View style={styles.indexContainer}>
          <Text style={styles.indexText}>{props.index + 1}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.titleText}>{props.title}</Text>
          {props.expire != undefined ? <Text style={styles.dateText}>{formatDate(props.expire)}</Text> : null}
        </View>
        <View
          style={[
            styles.countContainer,
            { borderColor: props.count <= 1 ? "#e63946" : props.count == undefined ? "#2a9d8f" : "#e5e5e5" },
          ]}
        >
          <Text
            style={[
              styles.countText,
              {
                color: props.count <= 1 ? "#e63946" : props.count == undefined ? "#2a9d8f" : "black",
              },
            ]}
          >
            {props.count || "∞"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
