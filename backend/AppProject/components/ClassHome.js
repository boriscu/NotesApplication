import React, { Component } from 'react'
import { View,Text, Button } from 'react-native'
export class ClassHome extends Component { //Ne moramo da stavimo props u render, vec su ugradjeni i mozemo da im pristupimo preko this
  
  state = {   //Pravilnije je da korisstimo state umesto props, inace izbaci warning
    name:"Boris"
  }
  //Ovde je onPress realizovano klasno
  render() {
    return (
        <View>
            <Text style = {{fontSize:20, color:'purple'}}>Hello from class</Text>
            <Text style = {{paddingTop:20, fontSize:20}}>{this.state.name}</Text>
            <Button title='Click Me' onPress = {()=> this.setState({name:"This is changed"})}/>
        </View>
    )
  }
}

export default ClassHome