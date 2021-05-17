import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeRouter, Route, BackButton } from "react-router-native";
import {GlobalProvider} from "./src/context/GlobalContext";
import {FontProvider} from "./src/context/FontContext"
import {TutorialProvider} from "./src/context/TutorialContext"
import {Data, Quiz, MemoryCardGame, Home, Login, Register, MultipleChoice, Settings} from './src/screens/';
import selection from './src/screens/selection';
import { AllProfilesProvider } from './src/context/AllProfilesContext';

const initialState = {
  user: null,
  caregiverModeOn: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case "changeUser": 
      return {
        ...state,
        user: action.newUser,
      };
    case "changeCaregiverModeOn": 
      return {
        ...state,
        caregiverModeOn: action.caregiverModeOn
      };
      
    default:
      return state;
  }
};

const App = () => {

  return (
    <GlobalProvider initialState={initialState} reducer={reducer}>
    <FontProvider>
    <TutorialProvider>
    <AllProfilesProvider>
    <NativeRouter>
        <View style={STYLES.container}>
  
          <BackButton />

          <Route exact path = "/" component = {Home}/>
          <Route exact path = "/data" component = {Data}/>
          <Route exact path = "/quiz" component = {Quiz}/>
          <Route exact path = "/memorycard" component = {MemoryCardGame}/>
          <Route exact path = "/multiplechoice" component = {MultipleChoice}/>
          <Route exact path = "/settings" component = {Settings}/>
          <Route exact path = "/login" component = {Login}/>
          <Route exact path = "/register" component = {Register}/>
          <Route exact path = "/selection" component = {selection}/>
        </View>
    </NativeRouter>
    </AllProfilesProvider>
    </TutorialProvider>
    </FontProvider>
    </GlobalProvider>
  );
}

const STYLES = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContainer: {
		flex: 1,
		width: '100%',
	},
	imageContainer: {
    marginVertical: 20,
    // borderWidth: 5,
    // borderColor: '#ff5555'
  },
  imageBox: {
    width: 256,
    height: 256
  }
});

export default App;
