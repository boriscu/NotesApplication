import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home';
import Create from './components/Create';
import Details from './components/Details';
import Edit from './components/Edit';
import Login from './components/Login';

import Contants from 'expo-constants';

import 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';

const Stack = createStackNavigator()

function App() { //Imamo funkcionalne(rcf) i klasne komponente(rce), ovo je funkcionalna
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name = "Login" component={Login}/>
        <Stack.Screen 
          name = "Home" 
          component={Home} 
          options = {{
            headerRight: () => (
              <Button
                onPress = {() => {AsyncStorage.clear(); navigation.navigate('Login')}}
              >Logout</Button>
            ),
          }}
        />
        <Stack.Screen name = "Create" component={Create}/>
        <Stack.Screen name = "Details" component={Details}/>
        <Stack.Screen name = "Edit" component={Edit}/>
        </Stack.Navigator>
    </View>
  );
}

export default() => {
  return (
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eddfdf',
    marginTop:Contants.statusBarHeight
  },
});
