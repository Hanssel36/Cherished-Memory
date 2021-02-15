import React from 'react';
import { Button, Text, StyleSheet, View } from 'react-native';

import { NativeRouter, Route, Link, Switch, BackButton } from "react-router-native";

import data from './src/screens/data';
import quiz from './src/screens/quiz';
import HomeScreen from './src/screens/HomeScreen';
import memorycard from './src/screens/memorycard';

const App = () => {
  return (
    <NativeRouter>
      <View >
        <BackButton />

        <Route exact path = "/" component = {HomeScreen}/>
        <Route exact path = "/data" component = {data}/>
        <Route exact path = "/quiz" component = {quiz}/>
        <Route exact path = "/memorycard" component = {memorycard}/>
        
      </View>
    </NativeRouter>
  );
}

export default App;
