import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Button, FlatList} from 'react-native'
import {Card, FAB} from 'react-native-paper'; //FAB je Floating action button

//rfc tabtab i dobijemo funkcionalnu komponentu
export default function Home(props) { //Props ne mozemo menjati, sta prosledimo u zagradama to uvek stoji, zbog toga mozemo koristiti state
  //Dok kod klasne komponente mozemo menjati props
  
  //Postoji 3 tipa promenljivih u riektu, const var i let. Const se ne menja, var moze i ne mora, let se menja. Takodje var je globalna prom a let samo u bloku koda
  //Usestate hook koristimo za promenu variable u realnom vremenu, standard je const[promenljiva, setPromenljiva] = useState(inicijalnaVr) 
  //Da bi menjali prom ne mozemo samo reci data++ nego moramo koristiti set funkciju, npr setProm(prom+1)
  const [data, setData] = useState([])  
  const [loading, setIsLoading] = useState(true)
  
  /*REDUCE HOOK
  const [state, dispatch] = useReducer(reducer, {count: 0, showText: true}) 
  -ovo je usereducer hook, koristimo ga kada imamo vise stateova i zelimo odjednom da ih menjamo
  -state predstavlja sva nasa stanja data,loading... a dispatch ih menja. reducer je funkcija koju koristimo i u {} idu inicijalna stanja 
  const reducer = (state, action) => {
    switch(action.type) {
      case "INCREMENT":
        return {count: state.count + 1, showText: state.showText}
      case "toggleShowText":
        return {count: state.count, showText: !state.showText}
      default:
        return state
    }
  }
  I onda posle u htmlu pristupamo sa {state.count}, {state.showText} a kod onClicka kazemo dispatch({type:"INCREMENT"})
  */

  const loadData = () => {
    fetch('http://192.168.56.1:3000/get', {
      method:'GET'
    })
    .then(resp => resp.json()) //Odavde dobijemo article
    .then(article => {
      setData(article) //data = article
      setIsLoading(false)
    })
    .catch(error => console.log(error))
  }

  //Poziva se svaki put kada se stranica re-renderuje, napomena svaki put kad promenimo state stranice ona se re-renderuje(useState)
  useEffect(() => {
    loadData()
  }, []) //U [] idu sva stanja koja zelimo da pratimo, u nasem slucaju ne pratimo ni jedno posebno ali mogli smo napisati [data]
  //Preporucljivo je uvek staviti [] na kraj da se ne bi pozivalo za sve, nastane haos

  const clickedItem = (data) => {
    props.navigation.navigate('Details', {data:data})
  }

  const renderData = (item) => {
    return (
      <Card style = {styles.cardStyle}>
        <Text style = {{fontSize:20}} onPress={()=>clickedItem(item)}>{item.title}</Text>
      </Card>
    )
  }
  //Ovde je onPress realizovano funkcionalno
  return (
    <View style={{flex:1}}>
      <FlatList
        data = {data}
        renderItem = {({item}) => {return renderData(item)}}
        onRefresh = {() => loadData()}
        refreshing = {loading}
        keyExtractor = {item => item.id}
      />

      <FAB
        style = {styles.fab}
        small = {false}
        icon = "plus"
        theme = {{colors:{accent:"green"}}}
        onPress = {()=>props.navigation.navigate('Create')}
      />
   </View>
  )
}

const styles = StyleSheet.create({
    cardStyle:{
        margin:10,
        padding:10
    },

    fab:{
      position:'absolute',
      margin:16,
      right:0,
      bottom:0
    }
})