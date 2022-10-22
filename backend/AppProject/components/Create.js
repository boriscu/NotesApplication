import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";

function Create(props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const uidate = props.route.params.uidate;

  const insertData = () => {
    fetch("http:///192.168.56.1:3000/add/excercises ", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        category: category,
        uidate: uidate,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        insertAsyncData(data);
      })
      .catch((error) => console.log(error));
  };

  const insertAsyncData = async (data) => {
    try {
      AsyncStorage.getItem("Excercises")
        .then((excercises) => {
          excercises = JSON.parse(excercises);
          excercises.push(data);
          AsyncStorage.setItem("Excercises", JSON.stringify(excercises));
          props.navigation.navigate("Home");
        })
        .done();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View>
      <TextInput
        style={styles.inputStyle}
        label="Title"
        value={title}
        mode="outlined"
        onChangeText={(text) => setTitle(text)}
      />

      <TextInput
        style={{ padding: 10 }}
        label="Description"
        value={category}
        mode="outlined"
        multiline
        numberOfLines={10}
        onChangeText={(text) => setCategory(text)}
      />

      <Button
        style={{ margin: 10 }}
        icon="pencil"
        mode="contained"
        onPress={() => insertData()}
      >
        Insert article
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    padding: 10,
    marginTop: 30,
  },
});

export default Create;
