import React from 'react';
import { Button, Text, StyleSheet, View } from 'react-native';

import { NativeRouter, Route, Link, Switch, BackButton } from "react-router-native";

import data from './src/screens/data';
import quiz from './src/screens/quiz';
import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  return (
    <NativeRouter>
      <View >
        <BackButton />

        <Route exact path = "/" component = {HomeScreen}/>
        <Route exact path = "/data" component = {data}/>
        <Route exact path = "/quiz" component = {quiz}/>  
        
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default App;
