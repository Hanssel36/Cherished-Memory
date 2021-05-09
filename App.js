import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeRouter, Route, BackButton } from "react-router-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {GlobalProvider} from "./src/context/GlobalContext";
import {UserContext} from "./src/utils/fontGlobal"
import {Data, Quiz, MemoryCardGame, Home, Login, Register, MultipleChoice, Settings} from './src/screens/';
import { COLORS } from './src/styles';

const initialState = {
  user: null,
  theme: {
    backgroundColor: COLORS.BACKGROUNDGRAY,
    fontSize: "14px",
  },
  caregiverModeOn: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'changeTheme':
      return {
        ...state,
        theme: action.newTheme
      };
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

  const [myfont, setFont] = useState('default');
  const [step1,setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);


  return (
    <GlobalProvider initialState={initialState} reducer={reducer}>
    <UserContext.Provider value = {{myfont,setFont, 
                                    step1, setStep1, 
                                    step2, setStep2, 
                                    step3, setStep3}}>
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
    </UserContext.Provider>
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
