import React from 'react'
import {View, ScrollView, Text, StyleSheet} from 'react-native'
import { Button } from 'react-native-paper';
//Dugme u poseban view jer je view kao labela 
export default function Details(props) {
  const data = props.route.params.data;

  const deleteData = (data) => {
    fetch(`http:///192.168.56.1:3000/delete/${data.id}/`, {
      method:'DELETE',
      headers: {
        'Content-Type' : 'application/json'
      }

    })
    .then(data => {
      props.navigation.navigate("Home")
    })
    .catch(error => console.log(error))
  }
  return (
    <ScrollView>
        <View style = {styles.viewStyle}>
          <Text style = {{fontSize:25}}>
            {data.title}
          </Text>
          <Text style = {{fontSize:20, marginTop:10}}>
            {data.body}
          </Text>
          <Text style = {{fontSize:15}}>
            {data.date}
          </Text>
          
          <View style = {styles.btnStyle}>
            <Button
              icon = "update"
              mode = "contained"
              onPress={()=>props.navigation.navigate("Edit", {data:data})}
            >Edit</Button>

            <Button
              icon = "delete"
              mode = "contained"
              onPress={()=>deleteData(data)}
            >Delete</Button>
          
          </View>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  viewStyle: {
    padding:10,
    margin:10
  },
  btnStyle: {
    flexDirection:"row",
    justifyContent:"space-around",
    margin:15,
    padding:10

  }
})