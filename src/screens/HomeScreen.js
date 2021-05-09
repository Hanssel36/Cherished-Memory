import React, {useState, useContext} from 'react';
import { Button, Text, StyleSheet, View, Dimensions, Image, Pressable } from 'react-native';
import { COLORS } from '../styles';
import Tooltip from 'react-native-walkthrough-tooltip';
import { UserContext } from "../utils/fontGlobal";

import styles from '../styles/MyStyle';

// Temporary looks for now. Setting button doesnt do anything yet.

const homeScreen = ({ history}) => {

    const [toolTipVisible,setToolTipVisible] = useState(true);
    const {myfont,setFont} = useContext(UserContext);
    const {myFontSize, setMyFontSize} = useContext(UserContext);

    const {step1, setStep1} = useContext(UserContext);
    const {step2, setStep2} = useContext(UserContext);
    const {step3, setStep3} = useContext(UserContext);

    function userProfile(){
        setStep1(false);
        setStep2(true);
    }

    function quizButton(){
        setStep2(false);
        setStep3(true);
        
    }

    var mystyles = {
        text:{
          fontSize: myFontSize,
          textAlign: 'center',
          fontFamily : myfont
      }
      };

    return(
    
    <View style = {homescreenstyles.container} >

        <Image style={homescreenstyles.icon} source = {require('../assets/images/Logo.png')}/>

        <Tooltip
            isVisible={step1}
            content={<Text style = {homescreenstyles.text}>Press me First to add data</Text>}
            placement="top"
            onClose={() => userProfile()}
            >
            <Pressable style = {homescreenstyles.ProfileButton} onPress = {() => history.push("/data")}>
                <Text style = {mystyles.text} >User Profile</Text>
            </Pressable>
        </Tooltip>
        
        
        <Tooltip
            isVisible={step2}
            content={<Text style = {mystyles.text}>Press me to go to quizzes</Text>}
            placement="top"
            onClose={() => quizButton()}
            >
            <Pressable style = {homescreenstyles.QuizButton} onPress = {() => history.push("/quiz")}>
                <Text style = {mystyles.text} >Quiz</Text>
            </Pressable>
        </Tooltip>

        <Pressable style = {homescreenstyles.SettingsButton} onPress = {() => history.push("/settings")}>
            <Text style = {mystyles.text} >Settings</Text>
        </Pressable>

    </View>
);
}
const homescreenstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUNDPURPLE,
        minHeight: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        paddingVertical: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ProfileButton: {
        backgroundColor: COLORS.BASEGREEN,
        padding: 30,
        borderRadius: 30,
        marginVertical: 30,
        width: "80%",
        minWidth: 350,
    },
    QuizButton: {
        backgroundColor: COLORS.BASEBLUE,
        padding: 30,
        borderRadius: 30,
        marginVertical: 30,
        width: "80%",
        minWidth: 350,
    },
    SettingsButton: {
        backgroundColor: COLORS.BASEGRAY,
        padding: 30,
        borderRadius: 30,
        marginVertical: 30,
        width: "80%",
        minWidth: 200,
    },
    text:{
        fontSize: 26,
        textAlign: 'center',
        fontFamily: 'default' 
    },
    icon:{
        alignItems: 'center'
    }
});

export default homeScreen;