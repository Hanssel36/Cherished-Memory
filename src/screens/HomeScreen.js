import React from 'react';
import { Button, Text, StyleSheet, View, Dimensions, Image, Pressable } from 'react-native';
import {useGlobal} from "../context/GlobalContext";
const firebase = require('firebase');
import { COLORS } from '../styles';

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
    <Image style={homescreenstyles.icon} source = {require('../assets/images/Logo.png')}/>


        <Pressable style = {homescreenstyles.ProfileButton} onPress = {() => history.push("/data")}>
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
    )
};

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
        minWidth: 200,
    },
    QuizButton: {
        backgroundColor: COLORS.BASEBLUE,
        padding: 30,
        borderRadius: 30,
        marginVertical: 30,
        width: "80%",
        minWidth: 200,
    },
    SettingsButton: {
        backgroundColor: COLORS.BASEGRAY,
        padding: 30,
        borderRadius: 30,
        marginVertical: 30,
        width: "80%",
        minWidth: 200,
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