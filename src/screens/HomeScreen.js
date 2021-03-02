import React from 'react';
import { Button, Text, StyleSheet, View, Dimensions, Image, Pressable } from 'react-native';

import styles from '../styles/MyStyle';

// Temporary looks for now. Setting button doesnt do anything yet.

export default ({ history}) => (
    <View style = {homescreenstyles.container} >

        <View style = {homescreenstyles.icon}>
            <Image source = {require('../images/Logo.png')}/>
        </View>

        <View style = {styles.alternativeLayoutButtonContainer}>

            <Pressable style = {homescreenstyles.Button} onPress = {() => history.push("/data")}>
                <Text style = {homescreenstyles.text} >User Profile</Text>
            </Pressable>

            <Pressable style = {homescreenstyles.QuizButton} onPress = {() => history.push("/quiz")}>
                <Text style = {homescreenstyles.text} >Quiz</Text>
            </Pressable>

            <Pressable style = {homescreenstyles.SettingsButton} >
                <Text style = {homescreenstyles.text} >Settings</Text>
            </Pressable>

        </View>
    </View>
);

const homescreenstyles = StyleSheet.create({
    container: {
        backgroundColor: '#b19cd9',
        justifyContent: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    Button: {
        backgroundColor: 'green',
        padding: 30,
        borderRadius: 30,
        marginVertical: 30,
    },
    QuizButton: {
        backgroundColor: 'cyan',
        padding: 30,
        borderRadius: 30,
        marginVertical: 30
    },
    SettingsButton: {
        backgroundColor: 'grey',
        padding: 30,
        borderRadius: 30,
        marginVertical: 30
    },
    text:{
        fontSize: 26,
        textAlign: 'center'  
    },
    icon:{
        alignItems: 'center'
    }
});