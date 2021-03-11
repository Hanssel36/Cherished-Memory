import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeRouter, Route, Link, Switch, BackButton } from "react-router-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {GlobalProvider} from "./src/context/GlobalContext";
import {Data, Quiz, MemoryCardGame, Home, Login, Register, MultipleChoice, Settings} from './src/screens/';
import { COLORS } from './src/styles';

const initialState = {
  user: null,
  theme: {
    backgroundColor: COLORS.BACKGROUNDGRAY,
    fontSize: "14px",
  }
}

const App = () => {
  return (
    <GlobalProvider initialState={initialState} reducer={reducer}>
      <NativeRouter>
        <View style={STYLES.container}>
          <KeyboardAwareScrollView style={STYLES.scrollContainer}>
          <BackButton />

          <Route exact path = "/" component = {Home}/>
          <Route exact path = "/data" component = {Data}/>
          <Route exact path = "/quiz" component = {Quiz}/>
          <Route exact path = "/memorycard" component = {MemoryCardGame}/>
          <Route exact path = "/multiplechoice" component = {MultipleChoice}/>
          <Route exact path = "/settings" component = {Settings}/>
          <Route exact path = "/login" component = {Login}/>
          <Route exact path = "/register" component = {Register}/>
          </KeyboardAwareScrollView>
        </View>
      </NativeRouter>
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
