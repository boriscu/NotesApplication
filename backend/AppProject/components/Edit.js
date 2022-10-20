import React, { useState } from "react";
import { View, Text, StyleSheet, AppState } from "react-native";
import { TextInput, Button } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Edit(props) {
  const data = props.route.params.data;
  const [title, setTitle] = useState(data.title);
  const [category, setCategory] = useState(data.category);

  const updateData = () => {
    //Kada koristimo `$` to predstavlja identifikator objekta
    fetch(`http:///192.168.56.1:3000/update/excercises/${data.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, category: category, uidate: data.uidate }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        props.navigation.navigate("Home", { data: data }); //Kada imamo ovako {data:data} to znaci da saljemo podatke
      })
      .catch((error) => console.log(error));
  };

  const updateAsyncData = async(id, title, category) => {
    try {
      AsyncStorage.getItem('Excercises').then( excercises => {
        excercises = JSON.parse(excercises);
        for(var e in excercises){
          if(excercises[e].id == id){
            excercises[e].title = title;
            excercises[e].category = category;
          }
        }
        AsyncStorage.setItem('Excercises', JSON.stringify(excercises))
        props.navigation.navigate("Home", {data: data});
      }).done()
      }catch(e){
        console.log(e)
      }
  }

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
        onPress={() => {updateAsyncData(data.id,title,category); updateData(); }}
      >
        Update article
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
