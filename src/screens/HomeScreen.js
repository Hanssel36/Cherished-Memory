import React from 'react';
import { Button, Text, StyleSheet, View, Dimensions, Image, Pressable } from 'react-native';
import {useGlobal} from "../context/GlobalContext";
const firebase = require('firebase');
import { BACKGROUNDPURPLE, BASEBLUE, BASEGRAY, BASEGREEN } from '../styles/colors';

import styles from '../styles/MyStyle';

// Temporary looks for now. Setting button doesnt do anything yet.

const Home = ({ history}) => {
    const [{user}, dispatch] = useGlobal();

    const onLogoutPress = () => {
        firebase.auth().signOut().then(() => {
              // Sign-out successful.
            dispatch({
                type: "changeUser",
                newUser: null,
            });
            console.log("User logged out");
        }).catch((error) => {
            // An error happened.
        });
    }
    
    return (
        <View style = {homescreenstyles.container} >

            <View style = {homescreenstyles.icon}>
                <Image source = {require('../assets/images/Logo.png')}/>
            </View>

            <View style = {styles.alternativeLayoutButtonContainer}>

                <Pressable style = {homescreenstyles.Button} onPress = {() => history.push("/data")}>
                    <Text style = {homescreenstyles.text} >User Profile</Text>
                </Pressable>

                <Pressable style = {homescreenstyles.QuizButton} onPress = {() => history.push("/quiz")}>
                    <Text style = {homescreenstyles.text} >Quiz</Text>
                </Pressable>

                <Pressable style = {homescreenstyles.SettingsButton} onPress = {() => history.push("/settings")}>
                    <Text style = {homescreenstyles.text} >Settings</Text>
                </Pressable>

                {!user ?
                <Pressable style = {homescreenstyles.LoginButton} onPress = {() => history.push("/login")}>
                    <Text style = {homescreenstyles.text} >Login</Text>
                </Pressable> 
                :
                <Pressable style = {homescreenstyles.LoginButton} onPress = {onLogoutPress}>
                    <Text style = {homescreenstyles.text} >Logout</Text>
                </Pressable> 
                }

            </View>
        </View>
    )
};

const homescreenstyles = StyleSheet.create({
    container: {
        backgroundColor: BACKGROUNDPURPLE,
        justifyContent: 'center',
        minHeight: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        paddingVertical: 150
    },
    Button: {
        backgroundColor: BASEGREEN,
        padding: 30,
        borderRadius: 30,
        marginVertical: 30,
    },
    QuizButton: {
        backgroundColor: BASEBLUE,
        padding: 30,
        borderRadius: 30,
        marginVertical: 30
    },
    SettingsButton: {
        backgroundColor: BASEGRAY,
        padding: 30,
        borderRadius: 30,
        marginVertical: 30
    },
    LoginButton: {
        backgroundColor: BASEGRAY,
        padding: 30,
        borderRadius: 30,
    },
    text:{
        fontSize: 26,
        textAlign: 'center'  
    },
    icon:{
        alignItems: 'center'
    }
});

export default Home;