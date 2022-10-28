import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function Details(props) {
  const data = props.route.params.data;
  const [weight, setWeight] = useState();
  const [reps,setReps] = useState();

  const deleteData = (data) => {
    fetch(`http:///192.168.56.1:3000/delete/excercises/${data.id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        props.navigation.navigate("Home");
      })
      .catch((error) => console.log(error));
  };

  const insertWorkingSet = () => {
    fetch("http:///192.168.56.1:3000/add/workingsets ", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        weight: weight,
        reps: reps,
        comment: " ",
        excercise_name_id: data.id,
      }),
    })
      .then((resp) => resp.json())
      .then(data => {
        props.navigation.navigate('Home');
      })
      .catch((error) => console.log(error));
  };

  const deleteAsyncData = async (id) => {
    try {
      AsyncStorage.getItem("Excercises")
        .then((excercises) => {
          excercises = JSON.parse(excercises);
          excercises = excercises.filter((excercise) => excercise.id !== id);
          AsyncStorage.setItem("Excercises", JSON.stringify(excercises));
          props.navigation.navigate("Home");
        })
        .done();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <ScrollView>
      <View style={styles.viewStyle}>
        <Text style={{ fontSize: 25 }}>{data.title}</Text>
        <Text style={{ fontSize: 20, marginTop: 10 }}>{data.category}</Text>
        <View style = {styles.inputStyle}>
          <TextInput
            label = "Weight"
            value = {weight}
            mode = "outlined"
            keyboardType= 'numeric'
            onChangeText={(text) => setWeight(text)}
          />
          <TextInput      
            label = "Reps"
            value = {reps}
            mode = "outlined"
            keyboardType= 'numeric'
            onChangeText={(text) => setReps(text)}
          />
          <Button
          style={{margin: 10}}
          icon="book-plus"
          mode="contained"
          onPress={() => insertWorkingSet()}
          >
            Add Set
          </Button>
        </View>
        <View style={styles.btnStyle}>
          <Button
            icon="update"
            mode="contained"
            onPress={() => props.navigation.navigate("Edit", { data: data })}
          >
            Edit
          </Button>

          <Button
            icon="delete"
            mode="contained"
            onPress={() => {
              deleteAsyncData(data.id);
              deleteData(data);
            }}
          >
            Delete
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    padding: 10,
    margin: 10,
  },
  btnStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 15,
    padding: 10,
  },
  inputStyle: {
    padding:20,
    marginTop: 20,
    justifyContent: "space-around",
    flexDirection: "row",
  },
});
