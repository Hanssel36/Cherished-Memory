import React from 'react';
import { Button, Text, StyleSheet, View } from 'react-native';

import { NativeRouter, Route, Link, Switch, BackButton } from "react-router-native";

import {Data, Quiz, MemoryCardGame, Home} from './src/screens/';

const App = () => {
  return (
    <NativeRouter>
      <View >
        <BackButton />

        <Route exact path = "/" component = {Home}/>
        <Route exact path = "/data" component = {Data}/>
        <Route exact path = "/quiz" component = {Quiz}/>
        <Route exact path = "/memorycard" component = {MemoryCardGame}/>
        
      </View>
    </NativeRouter>
  );
}

export default App;
