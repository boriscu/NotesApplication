import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Card, FAB, Button } from "react-native-paper"; 
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home(props) {
  //Props ne mozemo menjati, sta prosledimo u zagradama to uvek stoji, zbog toga mozemo koristiti state
  //Dok kod klasne komponente mozemo menjati props

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [workingsetData, setWorkingsetData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [loadingWS, setISLoadingWS] = useState(true);
  const [EandS, setEandS] = useState([]);
  const [loadingES, setIsLoadingEs] = useState(true);

  function numericDate(d) {
    let currentDay = d.getDate();
    let currentMonth = d.getMonth() + 1;
    let currentYear = d.getFullYear();
    let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
    return currentDate;
  }

  // const loadAsyncData = async () => {
  //   try {
  //     var jsonValue;
  //     value = await AsyncStorage.getItem("Excercises").then((values) => {
  //       values = JSON.parse(values);
  //       values = values.filter((value) => value.uidate == numericDate(date));
  //       jsonValue = values;
  //       setData(jsonValue);
  //       setIsLoading(false);
  //     });
  //   } catch (error) {
  //     console.log("Error: ", error);
  //   }
  //   return jsonValue;
  // };

  
  // const loadAsyncWS = async () => {
  //   try {
  //     var jsonValue;
  //     value = await AsyncStorage.getItem("WorkingSet").then((values) => {
  //       values = JSON.parse(values);
  //       jsonValue = values;
  //       setWorkingsetData(jsonValue);
  //       setISLoadingWS(false);
        
  //     });
  //   } catch (error) {
  //     console.log("Error: ", error);
  //   }
  //   return jsonValue;
  // };

  const loadAsync = async() => {
    try {
      var jsonExcercises, jsonWorkingSets;
      
      excercise = await AsyncStorage.getItem("Excercises").then((excercises) => {
        excercises = JSON.parse(excercises);
        console.log(date);
        excercises = excercises.filter((value => value.uidate == numericDate(date)));
        jsonExcercises = excercises;
        setData(jsonExcercises);
        setIsLoading(false);
      })

      workingset = await AsyncStorage.getItem("WorkingSet").then((workingsets) => {
        jsonWorkingSets = JSON.parse(workingsets);
        setWorkingsetData(jsonWorkingSets);
        setISLoadingWS(false);
      })

      const tempData = data;
      const tempWS = workingsetData;
      for(var e in tempData){
        var sets = tempWS.filter((value => value.excercise_name_id == data[e].id));
        tempData[e].sets = sets;
      }
      setEandS(tempData);
      setIsLoadingEs(false);
    }
    catch(error) {
      console.log("Error: ", error);
    }
  }
  

  const [date, setDate] = useState(new Date());

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    loadAsync();
    hideDatePicker();
  };

  const incrementDate = () => {
    let newDate = new Date(date.getTime());
    newDate.setDate(date.getDate() + 1);
    setDate(newDate);
    loadAsync();
  };

  const decrementDate = () => {
    let newDate = new Date(date.getTime());
    newDate.setDate(date.getDate() - 1);
    setDate(newDate)
    loadAsync();
  };

  function dateTostring(d) {
    let currentDay = d.getDate();
    let currentMonth = monthNames[d.getMonth()];
    let currentYear = d.getFullYear();
    let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
    return currentDate;
  }

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
    const dateString = dateTostring(date);
    fetch(`http://192.168.56.1:3000/get_by_date/excercises/${dateString}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((excercise) => {
        setData(excercise);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.message == "Network request failed") {
          console.log("Greska u mrezi: " + error.message);
        } else console.log(error);
      });
  };

  const loadSets = () => {
    fetch(`http://192.168.56.1:3000/get/workingsets`, {
      method: "GET",
      headers: {
        "Conent-Type": "application/json",
      },
    })
    .then(resp=>resp.json())
    .then((workingset) => {
      setWorkingsetData(workingset);
      setISLoadingWS(false);
    })
    .catch(error => console.log(error));
  }

  // async function setToExcercise(){
  //   const ret = data
  //   for(var d in ret){
  //     var sets = workingsetData.filter((value) => value.excercise_name_id == ret[d].id);
  //     ret[d].sets = sets;
  //   }
  //   setEandS(ret);
  //   setIsLoadingEs(false);
  // }

  useFocusEffect(
    React.useCallback(() => {
      loadAsync();
      return () => {};
    }, [])
  );

  const clickedItem = (data) => {
    props.navigation.navigate("Details", { data: data });
  };

  
if(!loadingES)
{  
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 20,
            justifyContent: "space-evenly",
          }}
        >
          <Button onPress={decrementDate}>{"<"}</Button>
          <Button onPress={showDatePicker}>{dateTostring(date)}</Button>
          <Button onPress={incrementDate}>{">"}</Button>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <FlatList
            data={EandS}
            renderItem={({ item }) => (
              <Card style={styles.cardStyle}>
                <Text style={{fontSize: 20}} onPress={()=>clickedItem(item)}>{item.title}</Text>
                <FlatList
                    data={item.sets}
                    renderItem={({ item }) => (
                    <Card styles={{margin: 10, padding: 10}}>
                        <Text style={{fontSize: 10}} onPress={()=>console.log(EandS)}>{"Weight: " + item.weight + "KG " + "Reps: " + item.reps}</Text>
                    </Card>
                    )}
                />
              </Card>
            )}
            onRefresh={()=>loadAsync()}
            refreshing={loadingES}
            keyExtractor={(item, index) => index}
          />

        <FAB
          style={styles.fab}
          small={false}
          icon="plus"
          theme={{ colors: { accent: "green" } }}
          onPress={() => {
            props.navigation.navigate("Create", { uidate: date.toJSON() })
          }
          }
        />
      </View>
    );
  }
  else
  {
    return(
      <Text>Loading...</Text>
    )
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    margin: 10,
    padding: 10,
  },

  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

//https://stackoverflow.com/questions/34687091/can-i-execute-a-function-after-setstate-is-finished-updating
