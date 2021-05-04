import React, {useState} from 'react';
import { Button, Text, StyleSheet, View } from 'react-native';

import { NativeRouter, Route, Link, Switch, BackButton } from "react-router-native";

import {Data, Quiz, MemoryCardGame, Home} from './src/screens/';
import MultipleChoice from  './src/screens/multiplechoice';
import settings from './src/screens/settings';
import {UserContext} from "./src/utils/fontGlobal"

const App = () => {

  const [myfont, setFont] = useState('default');
  const [step1,setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);


  return (
    <UserContext.Provider value = {{myfont,setFont, 
                                    step1, setStep1, 
                                    step2, setStep2, 
                                    step3, setStep3}}>
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
    </UserContext.Provider>
  );
}

export default App;
