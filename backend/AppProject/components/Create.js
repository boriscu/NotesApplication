import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";

function Create(props) {
  const [title, setTitle] = useState(""); //Use state je tip hook-a, on nam sluzi da pratimo stanje neke komponente. Prima inicijalno stanje i funkciju koja ga menja
  //Mozemo napisati i tipa useState("red") pa ce samo javiti kada se promeni stanje od red
  const [body, setBody] = useState("");
  const uidate = props.route.params.uidate;

  const insertData = () => {
    fetch("http:///192.168.56.1:3000/add ", {
      method: "POST", //Metode npr get,pot,put,delete... get je default ako nista ne stavimo
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, body: body, uidate: uidate }), //Kazemo da saljemo objekat u kome imamo title i body
    })
      .then((resp) => resp.json()) //.then je promise i on se izvrsava samo ako se ovaj kod pre njega izvrsio
      //Arrow funkcije su u sustini skraceni zapis obicnih funkcija (parametar) => {funkcija}
      .then((data) => {
        props.navigation.navigate("Home");
      })
      .catch((error) => console.log(error)); //Ako imamo eror samo ispisemo
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
        value={body}
        mode="outlined"
        multiline
        numberOfLines={10}
        onChangeText={(text) => setBody(text)}
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
