import React from 'react';
import { Button, Text, StyleSheet, View, Dimensions, Pressable, Image } from 'react-native';

import { NativeRouter, Route, Link } from "react-router-native";
import { BACKGROUNDBLUE, BASEBLUE, BASEPURPLE } from '../styles/colors';
import styles from '../styles/MyStyle';

export default ({ history}) => (
    <View style = {Quizstyles.container}>
        <View>
            <Button title = "Go Back"  onPress = {() => history.push("/")}/>
        </View>

        <View style = {Quizstyles.icon}>
            <Image source = {require('../assets/images/puzzle_1.png')}/>
        </View>

        <View >
            <View style = {styles.alternativeLayoutButtonContainer}>
            
                <Pressable style = {Quizstyles.Button} onPress = {() => history.push("/memorycard")}>
                    <Text style = {Quizstyles.text} >Memory Game</Text>
                </Pressable>

                <Pressable style = {Quizstyles.QuizButton}  onPress = {() => history.push("/multiplechoice")}>
                    <Text style = {Quizstyles.text} >Multiple Choice</Text>
                </Pressable>

            </View>
            
        </View>
    </View>
);

const Quizstyles = StyleSheet.create({
    container: {
        backgroundColor: BACKGROUNDBLUE,
        justifyContent: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    Button: {
        backgroundColor: BASEPURPLE,
        padding: 30,
        borderRadius: 30,
        marginVertical: 50,
    },
    QuizButton: {
        backgroundColor: BASEBLUE,
        padding: 30,
        borderRadius: 30,
        marginVertical: 50
    },
    text:{
        fontSize: 26,
        textAlign: 'center'  
    },
    icon:{
        alignItems: 'center'
    }
});