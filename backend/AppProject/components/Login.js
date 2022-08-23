import React, {useState, useEffect, useContext} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Button, TextInput} from 'react-native-paper'; 
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login() { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const token = AsyncStorage.getItem("token")

  const Login = () => {
    fetch('http://192.168.56.1:3000/token', {
      method:'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({email:email, password:password})
    })
    .then(resp => {
      if(resp.status == 200) return resp.json();
      else alert("There has been some error")
    })
    .then(data => {
      console.log("this came from the backend", data)
      AsyncStorage.setItem("token", data.access_token)
    })
    .catch(error=>console.log(error))
  }

  console.log(token)
  return (
    <View>
      {(token && token!="[object Object]" && token!=undefined) ? <Text>You are logged in with this token</Text> + token :
        <View>
          <TextInput 
            label = "Email"
            mode = "outlined"
            onChangeText={email => setEmail(email)}
          />

          <TextInput
            label = "Password"
            mode = "outlined"
            onChangeText={password => setPassword(password)}
          />

          <Button
            style = {styles.buttonStyle}
            mode = "contained"
            icon = "check"
            onPress = {()=>Login()}
          />
        </View>
    }
   </View>
  )
}

const styles = StyleSheet.create({
  cardStyle:{
      flex: 1,
      margin:10,
      padding:10
  },
  buttonStyle:{
    marginTop:10,
    margin:10
  }
})

//43:30