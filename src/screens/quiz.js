import React, {useState, useEffect, useContext} from 'react';
import { Button, Text, StyleSheet, View, Dimensions, Pressable, Image, Modal } from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import styles from '../styles/MyStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Tooltip from 'react-native-walkthrough-tooltip';
import { UserContext } from "../utils/fontGlobal";
import { COLORS } from '../styles';

const quizScreen = ({ history}) => {

    const [allProfiles, setAllProfiles] = useState([]);
    const [modifiedDataToggle, setModifiedDataToggle] = useState(false);
    const [blockGame, setBlockGame] = useState(false);
    const {step3, setStep3} = useContext(UserContext);

    const getData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem('profiles');
			setAllProfiles(jsonValue ? JSON.parse(jsonValue) : []);
		} catch (e) {
			console.error(e);
			// read error
		}
	}

  useEffect(()=> {
		// AsyncStorage.clear();
		getData();
	}, [modifiedDataToggle])

    console.log(allProfiles.length);
    function checkNumOfProfiles(){
        if(allProfiles.length < 4){
            setBlockGame(true);
        }else{
            history.push("/memorycard");
        }

    }

    function matchingButton(){
        setStep3(false);
    }

    return(
    <View style = {Quizstyles.container}>

        <Modal  animationType="slide" transparent={true} visible={blockGame}>
            <View style={Quizstyles.centeredView}>
                <View style={Quizstyles.modalView}>

                <Text style={Quizstyles.modalText}>Please have at least 4 profiles to play matching card game</Text>
                <Pressable
                style={[Quizstyles.button, Quizstyles.buttonClose]}
                onPress={() => history.push("/data")}
                >
                <Text style={Quizstyles.modalText}>Go to data screen</Text>
                </Pressable>
                </View>
            </View>
        </Modal>

        <View style = {{flexDirection: 'row'}}>
            <Pressable onPress = {() => history.push("/")}>
                <AntDesign name="arrowleft" size={50} color="black" />
            </Pressable>
            <Text style = {styles.backButtonText}>Go Back</Text>
        </View>

        <View style = {Quizstyles.icon}>
            <Image source = {require('../assets/images/puzzle_1.png')}/>
        </View>

        <View >
            <View style = {styles.alternativeLayoutButtonContainer}>


            <Tooltip
            isVisible={step3}
            content={<Text style = {Quizstyles.text}>Press to play matching card game!</Text>}
            placement="top"
            onClose={() => matchingButton()}
            >
                <Pressable style = {Quizstyles.Button} onPress = {() => checkNumOfProfiles()}>
                    <Text style = {Quizstyles.text} >Memory Game</Text>
                </Pressable>
            </Tooltip>
                <Pressable style = {Quizstyles.QuizButton}  onPress = {() => history.push("/multiplechoice")}>
                    <Text style = {Quizstyles.text} >Multiple Choice</Text>
                </Pressable>

            </View>
            
        </View>
    </View>
  );
}

const Quizstyles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.BACKGROUNDBLUE,
        justifyContent: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    Button: {
        backgroundColor: COLORS.BASEPURPLE,
        padding: 30,
        borderRadius: 30,
        marginVertical: 50,
        minWidth: 350,
    },
    QuizButton: {
        backgroundColor: COLORS.BASEBLUE,
        padding: 30,
        borderRadius: 30,
        marginVertical: 50,
    },
    text:{
        fontSize: 26,
        textAlign: 'center'  
    },
    icon:{
        alignItems: 'center'
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    modalText: {
      textAlign: "center",
    },
});

export default quizScreen;