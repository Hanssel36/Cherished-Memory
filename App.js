import React from 'react';
import { Button, Text, StyleSheet, View } from 'react-native';

import { NativeRouter, Route, Link, Switch, BackButton } from "react-router-native";

import {Data, Quiz, MemoryCardGame, Home} from './src/screens/';
import MultipleChoice from  './src/screens/multiplechoice';
import settings from './src/screens/settings';

const App = () => {
  return (
    <NativeRouter>
      <View >
        <BackButton />

        <Route exact path = "/" component = {Home}/>
        <Route exact path = "/data" component = {Data}/>
        <Route exact path = "/quiz" component = {Quiz}/>
        <Route exact path = "/memorycard" component = {MemoryCardGame}/>
        <Route exact path = "/multiplechoice" component = {MultipleChoice}/>
        <Route exact path = "/settings" component = {settings}/>
        
      </View>
    </NativeRouter>
  );
}

export default App;
